import { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { Select } from '../../components/ui/Select';
import { Icon } from '../../components/ui/Icon';
import { useAppStore } from '../../store/useAppStore';
import { useToastStore } from '../../store/useToastStore';

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function isValidTime(value: string) {
  return /^([01]\\d|2[0-3]):([0-5]\\d)$/.test(value);
}

function minutesToTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function SettingsView() {
  const {
    settings,
    updateSettings,
    plan,
    updatePlan,
    logs,
    user,
    syncStatus,
    signIn,
    signUp,
    signInWithGoogle,
    signOutUser,
    pushToCloud
  } = useAppStore();
  const pushToast = useToastStore((state) => state.push);
  const [error, setError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mealTimes = useMemo(() => {
    const masa1 = plan.days[0]?.masa1.oraImplicita ?? settings.eatingWindowStart;
    const masa2 = plan.days[0]?.masa2.oraImplicita ?? settings.eatingWindowEnd;
    return { masa1, masa2 };
  }, [plan.days, settings.eatingWindowEnd, settings.eatingWindowStart]);

  const handleWindowChange = (start: string, end: string) => {
    if (!isValidTime(start) || !isValidTime(end)) {
      setError('Orele trebuie să fie în format HH:mm.');
      return;
    }
    const diff = timeToMinutes(end) - timeToMinutes(start);
    if (diff > 480 || diff <= 0) {
      setError('Fereastra nu poate depăși 8 ore și trebuie să fie pozitivă.');
      return;
    }
    setError(null);
    updateSettings({ eatingWindowStart: start, eatingWindowEnd: end });
  };

  const handleMealTimesChange = (masa1: string, masa2: string) => {
    if (!isValidTime(masa1) || !isValidTime(masa2)) {
      setError('Orele trebuie să fie în format HH:mm.');
      return;
    }
    const start = timeToMinutes(settings.eatingWindowStart);
    const end = timeToMinutes(settings.eatingWindowEnd);
    const m1 = timeToMinutes(masa1);
    const m2 = timeToMinutes(masa2);

    if (m1 < start || m2 > end || m1 >= m2) {
      setError('Orele meselor trebuie să fie în interiorul ferestrei și în ordine.');
      return;
    }
    setError(null);

    const updatedDays = plan.days.map((day) => ({
      ...day,
      masa1: { ...day.masa1, oraImplicita: masa1 },
      masa2: { ...day.masa2, oraImplicita: masa2 }
    }));
    updatePlan({ ...plan, days: updatedDays });
    updateSettings({ reminders: { ...settings.reminders, masa1, masa2 } });
    pushToast('Salvat');
  };

  const handleOffsetChange = (offset: number) => {
    if (offset < 30 || offset > 90) return;
    updateSettings({ meal2OffsetMinutesFromEnd: offset });
    const masa2 = minutesToTime(timeToMinutes(settings.eatingWindowEnd) - offset);
    handleMealTimesChange(mealTimes.masa1, masa2);
  };

  const handleQuietHoursChange = (start: string, end: string) => {
    if (!isValidTime(start) || !isValidTime(end)) {
      setError('Orele trebuie să fie în format HH:mm.');
      return;
    }
    setError(null);
    updateSettings({ quietHoursStart: start, quietHoursEnd: end });
  };

  const exportData = () => {
    const payload = JSON.stringify({ plan, settings }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tracker-meniu-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportCsv = () => {
    const headers = [
      'data',
      'masa1',
      'masa2',
      'magneziu',
      'vitaminaD',
      'omega3',
      'miscare',
      'preset',
      'notes'
    ];
    const rows = Object.values(logs).map((log) => [
      log.dateISO,
      String(log.masa1Done),
      String(log.masa2Done),
      String(log.suplimente.magneziu),
      String(log.suplimente.vitaminaD),
      String(log.suplimente.omega3),
      String(log.miscareDone),
      log.miscarePreset ?? '',
      (log.notes ?? '').replace(/\\n/g, ' ')
    ]);
    const csv = [headers.join(','), ...rows.map((row) => row.map((cell) => `\"${cell}\"`).join(','))].join('\\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tracker-meniu-export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text) as { plan: typeof plan; settings: typeof settings };
      if (data.plan) updatePlan(data.plan);
      if (data.settings) updateSettings(data.settings);
      pushToast('Salvat');
    } catch {
      setError('Fișierul nu este valid.');
    }
  };

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signIn(email, password);
      pushToast('Autentificat');
    } catch {
      setAuthError('Autentificare eșuată.');
    }
  };

  const handleSignUp = async () => {
    setAuthError(null);
    try {
      await signUp(email, password);
      pushToast('Cont creat');
    } catch {
      setAuthError('Înregistrare eșuată.');
    }
  };

  return (
    <div className="space-y-4">
      <header>
        <p className="text-sm text-[color:var(--color-muted)]">Setări generale</p>
        <h2 className="flex items-center gap-2 font-display text-2xl">
          <Icon name="settings" className="h-6 w-6 text-[color:var(--color-accent)]" aria-hidden="true" />
          Setări
        </h2>
      </header>

      <Card>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Data de start"
            type="date"
            value={plan.startDateISO}
            onChange={(event) => updatePlan({ ...plan, startDateISO: event.target.value })}
          />
          <Select
            label="Tema"
            value={settings.theme}
            onChange={(event) =>
              updateSettings({ theme: event.target.value === 'dark' ? 'dark' : 'light' })
            }
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </Select>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Fereastră de mâncat (max 8 ore)</p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Input
            label="Ora început"
            value={settings.eatingWindowStart}
            onChange={(event) => handleWindowChange(event.target.value, settings.eatingWindowEnd)}
          />
          <Input
            label="Ora sfârșit"
            value={settings.eatingWindowEnd}
            onChange={(event) => handleWindowChange(settings.eatingWindowStart, event.target.value)}
          />
          <Input
            label="Offset Masa 2 (minute)"
            type="number"
            value={settings.meal2OffsetMinutesFromEnd}
            onChange={(event) => handleOffsetChange(Number(event.target.value))}
          />
        </div>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <Input
            label="Ora Masa 1"
            value={mealTimes.masa1}
            onChange={(event) => handleMealTimesChange(event.target.value, mealTimes.masa2)}
          />
          <Input
            label="Ora Masa 2"
            value={mealTimes.masa2}
            onChange={(event) => handleMealTimesChange(mealTimes.masa1, event.target.value)}
          />
        </div>
        {error ? <p className="mt-2 text-xs text-[color:var(--color-warning)]">{error}</p> : null}
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Sincronizare cloud</p>
        {user ? (
          <div className="mt-3 space-y-3">
            <p className="text-sm">
              Conectat ca <span className="font-semibold">{user.email ?? 'utilizator'}</span>
            </p>
            <p className="text-xs text-[color:var(--color-muted)]">Status: {syncStatus}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void pushToCloud()}>
                Sincronizează acum
              </Button>
              <Button variant="ghost" onClick={() => void signOutUser()}>
                Deconectează
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-3 space-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <Input label="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <Input
                label="Parolă"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {authError ? <p className="text-xs text-[color:var(--color-warning)]">{authError}</p> : null}
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => void handleSignIn()}>
                Autentificare
              </Button>
              <Button variant="ghost" onClick={() => void handleSignUp()}>
                Înregistrare
              </Button>
              <Button variant="secondary" onClick={() => void signInWithGoogle()}>
                Continuă cu Google
              </Button>
            </div>
          </div>
        )}
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Notificări și remindere</p>
        <div className="mt-3 space-y-3">
          <Checkbox
            label="Notificări activate"
            checked={settings.notificationsEnabled}
            onChange={(event) => updateSettings({ notificationsEnabled: event.target.checked })}
          />
          <div className="grid gap-3 md:grid-cols-2">
            <Input
              label="Reminder Masa 1"
              value={settings.reminders.masa1}
              onChange={(event) =>
                updateSettings({ reminders: { ...settings.reminders, masa1: event.target.value } })
              }
            />
            <Input
              label="Reminder Masa 2"
              value={settings.reminders.masa2}
              onChange={(event) =>
                updateSettings({ reminders: { ...settings.reminders, masa2: event.target.value } })
              }
            />
            <Input
              label="Reminder Suplimente"
              value={settings.reminders.suplimente}
              onChange={(event) =>
                updateSettings({ reminders: { ...settings.reminders, suplimente: event.target.value } })
              }
            />
            <Input
              label="Reminder Mișcare"
              value={settings.reminders.miscare}
              onChange={(event) =>
                updateSettings({ reminders: { ...settings.reminders, miscare: event.target.value } })
              }
            />
            <Input
              label="Interval silențios start"
              value={settings.quietHoursStart}
              onChange={(event) => handleQuietHoursChange(event.target.value, settings.quietHoursEnd)}
            />
            <Input
              label="Interval silențios end"
              value={settings.quietHoursEnd}
              onChange={(event) => handleQuietHoursChange(settings.quietHoursStart, event.target.value)}
            />
            <Select
              label="Amână remindere (minute)"
              value={String(settings.snoozeMinutes)}
              onChange={(event) => updateSettings({ snoozeMinutes: Number(event.target.value) })}
            >
              {[5, 10, 15, 20].map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes} minute
                </option>
              ))}
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Export / Import</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="secondary" onClick={exportData}>
            Export JSON
          </Button>
          <Button variant="secondary" onClick={exportCsv}>
            Export CSV
          </Button>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-[var(--radius-chip)] border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold">
            Import JSON
            <input type="file" accept="application/json" className="hidden" onChange={importData} />
          </label>
        </div>
      </Card>
    </div>
  );
}
