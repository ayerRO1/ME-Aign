import { useEffect, useMemo, useState } from 'react';
import { TodayView } from '../features/today/TodayView';
import { CalendarView } from '../features/calendar/CalendarView';
import { PlanView } from '../features/plan/PlanView';
import { SettingsView } from '../features/settings/SettingsView';
import { useAppStore } from '../store/useAppStore';
import { ToastHost } from '../components/ui/Toast';
import { Icon } from '../components/ui/Icon';
import { scheduleDailyNotifications } from '../lib/notifications';
import { addDays, toDateISO } from '../lib/date';

const tabs = [
  { id: 'today', label: 'Azi', icon: 'today' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'plan', label: 'Plan', icon: 'plan' },
  { id: 'settings', label: 'Setări', icon: 'settings' }
] as const;

type TabId = (typeof tabs)[number]['id'];

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('today');
  const { hydrate, hydrated, settings, setSelectedDate, initAuth } = useAppStore();

  useEffect(() => {
    void hydrate();
  }, [hydrate]);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    if (!hydrated) return;
    scheduleDailyNotifications(settings, toDateISO(new Date()));
  }, [hydrated, settings]);

  useEffect(() => {
    if (!hydrated) return;
    const now = new Date();
    const nextMidnight = addDays(new Date(now.getFullYear(), now.getMonth(), now.getDate()), 1);
    const delay = nextMidnight.getTime() - now.getTime();
    const timer = window.setTimeout(() => {
      setSelectedDate(toDateISO(new Date()));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [hydrated, setSelectedDate]);

  const content = useMemo(() => {
    switch (activeTab) {
      case 'today':
        return <TodayView />;
      case 'calendar':
        return <CalendarView />;
      case 'plan':
        return <PlanView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="app-shell min-h-screen pb-24">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-4 pb-6 pt-6">
        {hydrated ? content : <p className="text-sm text-[color:var(--color-muted)]">Se încarcă...</p>}
      </div>
      <nav className="fixed bottom-0 left-0 right-0 border-t border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              aria-current={activeTab === tab.id ? 'page' : undefined}
              className={`flex flex-1 flex-col items-center gap-1 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'text-[color:var(--color-accent)]'
                  : 'text-[color:var(--color-muted)]'
              }`}
            >
              <Icon name={tab.icon} className="h-5 w-5" aria-hidden="true" />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>
      <ToastHost />
    </div>
  );
}
