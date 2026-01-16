import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { DailyLog, Settings, UserPlan } from '../store/useAppStore';

export interface CloudState {
  plan: UserPlan;
  settings: Settings;
  logs: Record<string, DailyLog>;
  updatedAtISO: string;
}

const STATE_DOC = 'state';

export async function loadCloudState(uid: string): Promise<CloudState | null> {
  const ref = doc(db, 'users', uid, 'data', STATE_DOC);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as CloudState;
}

export async function saveCloudState(
  uid: string,
  payload: Omit<CloudState, 'updatedAtISO'>
): Promise<void> {
  const ref = doc(db, 'users', uid, 'data', STATE_DOC);
  await setDoc(ref, { ...payload, updatedAtISO: new Date().toISOString() }, { merge: true });
}
