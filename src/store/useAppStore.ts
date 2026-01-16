import { create } from 'zustand';
import { loadFromStorage, saveToStorage } from '../lib/storage';
import { auth } from '../lib/firebase';
import { loadCloudState, saveCloudState } from '../lib/cloud';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defaultPlan } from '../data/defaultPlan';
import { toDateISO } from '../lib/date';

export type Unit = 'g' | 'buc' | 'ml';

export interface Ingredient {
  id: string;
  nume: string;
  cantitate: number;
  unitate: Unit;
  note?: string;
}

export interface Recipe {
  pasi: string[];
  prepMinute: number;
  cookMinute: number;
  tips?: string[];
}

export interface Meal {
  id: string;
  titlu: string;
  oraImplicita: string;
  ingrediente: Ingredient[];
  reteta: Recipe;
  caloriiEstimate: number;
}

export interface PlanDay {
  index: number;
  masa1: Meal;
  masa2: Meal;
}

export interface UserPlan {
  startDateISO: string;
  days: PlanDay[];
  repeats: true;
}

export interface SupplementsDone {
  magneziu: boolean;
  vitaminaD: boolean;
  omega3: boolean;
}

export interface DailyLog {
  dateISO: string;
  masa1Done: boolean;
  masa2Done: boolean;
  suplimente: SupplementsDone;
  miscareDone: boolean;
  miscarePreset?: string;
  notes?: string;
  snoozedReminders?: Record<string, string>;
  updatedAtISO: string;
}

export interface Settings {
  eatingWindowStart: string;
  eatingWindowEnd: string;
  meal2OffsetMinutesFromEnd: number;
  notificationsEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
  snoozeMinutes: number;
  reminders: {
    masa1: string;
    masa2: string;
    suplimente: string;
    miscare: string;
  };
  theme: 'light' | 'dark';
}

export interface AuthUser {
  uid: string;
  email: string | null;
}

interface AppState {
  plan: UserPlan;
  settings: Settings;
  logs: Record<string, DailyLog>;
  selectedDateISO: string;
  hydrated: boolean;
  user: AuthUser | null;
  syncStatus: 'offline' | 'syncing' | 'synced' | 'error';
  lastSyncAtISO?: string;
  hydrate: () => Promise<void>;
  initAuth: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  syncFromCloud: () => Promise<void>;
  pushToCloud: () => Promise<void>;
  setSelectedDate: (dateISO: string) => void;
  updateSettings: (partial: Partial<Settings>) => void;
  updatePlan: (plan: UserPlan) => void;
  updateLog: (dateISO: string, partial: Partial<DailyLog>) => void;
  removeLog: (dateISO: string) => void;
  resetPlan: () => void;
  resetLogs: () => void;
}

const defaultSettings: Settings = {
  eatingWindowStart: '12:00',
  eatingWindowEnd: '20:00',
  meal2OffsetMinutesFromEnd: 60,
  notificationsEnabled: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00',
  snoozeMinutes: 10,
  reminders: {
    masa1: '12:00',
    masa2: '19:00',
    suplimente: '10:00',
    miscare: '17:00'
  },
  theme: 'dark'
};

const STORAGE_PLAN = 'plan';
const STORAGE_SETTINGS = 'settings';
const STORAGE_LOGS = 'logs';

export const useAppStore = create<AppState>((set, get) => ({
  plan: defaultPlan,
  settings: defaultSettings,
  logs: {},
  selectedDateISO: toDateISO(new Date()),
  hydrated: false,
  user: null,
  syncStatus: 'offline',
  hydrate: async () => {
    const [plan, settings, logs] = await Promise.all([
      loadFromStorage<UserPlan>(STORAGE_PLAN, defaultPlan),
      loadFromStorage<Settings>(STORAGE_SETTINGS, defaultSettings),
      loadFromStorage<Record<string, DailyLog>>(STORAGE_LOGS, {})
    ]);
    set({ plan, settings, logs, hydrated: true });
  },
  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ user: { uid: user.uid, email: user.email }, syncStatus: 'syncing' });
        await get().syncFromCloud();
      } else {
        set({ user: null, syncStatus: 'offline' });
      }
    });
  },
  signIn: async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
  signUp: async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
  signOutUser: async () => {
    await signOut(auth);
    set({ user: null, syncStatus: 'offline' });
  },
  syncFromCloud: async () => {
    const user = get().user;
    if (!user) return;
    set({ syncStatus: 'syncing' });
    try {
      const cloud = await loadCloudState(user.uid);
      if (cloud) {
        set({
          plan: cloud.plan,
          settings: cloud.settings,
          logs: cloud.logs,
          selectedDateISO: cloud.plan.startDateISO,
          syncStatus: 'synced',
          lastSyncAtISO: cloud.updatedAtISO
        });
        await Promise.all([
          saveToStorage(STORAGE_PLAN, cloud.plan),
          saveToStorage(STORAGE_SETTINGS, cloud.settings),
          saveToStorage(STORAGE_LOGS, cloud.logs)
        ]);
      } else {
        await get().pushToCloud();
      }
    } catch {
      set({ syncStatus: 'error' });
    }
  },
  pushToCloud: async () => {
    const user = get().user;
    if (!user) return;
    set({ syncStatus: 'syncing' });
    try {
      await saveCloudState(user.uid, {
        plan: get().plan,
        settings: get().settings,
        logs: get().logs
      });
      set({ syncStatus: 'synced', lastSyncAtISO: new Date().toISOString() });
    } catch {
      set({ syncStatus: 'error' });
    }
  },
  setSelectedDate: (dateISO) => set({ selectedDateISO: dateISO }),
  updateSettings: (partial) => {
    const next = { ...get().settings, ...partial };
    set({ settings: next });
    void saveToStorage(STORAGE_SETTINGS, next);
    void get().pushToCloud();
  },
  updatePlan: (plan) => {
    set({ plan });
    void saveToStorage(STORAGE_PLAN, plan);
    void get().pushToCloud();
  },
  updateLog: (dateISO, partial) => {
    const current = get().logs[dateISO];
    const next: DailyLog = {
      dateISO,
      masa1Done: current?.masa1Done ?? false,
      masa2Done: current?.masa2Done ?? false,
      suplimente: current?.suplimente ?? { magneziu: false, vitaminaD: false, omega3: false },
      miscareDone: current?.miscareDone ?? false,
      miscarePreset: current?.miscarePreset ?? undefined,
      notes: current?.notes ?? '',
      snoozedReminders: current?.snoozedReminders ?? {},
      updatedAtISO: new Date().toISOString(),
      ...partial
    };
    const nextLogs = { ...get().logs, [dateISO]: next };
    set({ logs: nextLogs });
    void saveToStorage(STORAGE_LOGS, nextLogs);
    void get().pushToCloud();
  },
  removeLog: (dateISO) => {
    const nextLogs = { ...get().logs };
    delete nextLogs[dateISO];
    set({ logs: nextLogs });
    void saveToStorage(STORAGE_LOGS, nextLogs);
    void get().pushToCloud();
  },
  resetPlan: () => {
    set({ plan: defaultPlan });
    void saveToStorage(STORAGE_PLAN, defaultPlan);
    void get().pushToCloud();
  },
  resetLogs: () => {
    set({ logs: {}, selectedDateISO: get().plan.startDateISO });
    void saveToStorage(STORAGE_LOGS, {});
    void get().pushToCloud();
  }
}));
