import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Checkbox } from '../../components/ui/Checkbox';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Icon } from '../../components/ui/Icon';
import { useAppStore } from '../../store/useAppStore';
import { addDays, formatLongDate, fromDateISO, getWeekdayIndex, toDateISO } from '../../lib/date';
import { calcDailyCompletion, calcStreaks, getPlanDayForDate } from '../../lib/metrics';
import { getReminderStatus, scheduleOneOffNotification } from '../../lib/notifications';
import { useToastStore } from '../../store/useToastStore';

const movementPresets = [
  '20 min mers',
  '30–45 min mers alert',
  'HIIT ușor 15–20 min'
];

export function TodayView() {
  const { plan, settings, logs, selectedDateISO, setSelectedDate, updateLog, resetLogs } = useAppStore();
  const pushToast = useToastStore((state) => state.push);
  const log = logs[selectedDateISO];
  const planDay = useMemo(() => getPlanDayForDate(selectedDateISO, plan), [selectedDateISO, plan]);
  const date = new Date(selectedDateISO);
  const completion = calcDailyCompletion(log);
  const streaks = calcStreaks(logs, selectedDateISO);
  const reminders = getReminderStatus(settings, selectedDateISO, log?.snoozedReminders);
  const supplements = log?.suplimente ?? { magneziu: false, vitaminaD: false, omega3: false };
  const todayISO = toDateISO(new Date());
  const [showShopping, setShowShopping] = useState(false);

  const shoppingData = useMemo(() => {
    const baseDate = fromDateISO(selectedDateISO);
    const weekdayIndex = getWeekdayIndex(baseDate);
    const weekStart = addDays(baseDate, -(weekdayIndex - 1));
    const items = new Map<string, { nume: string; unitate: string; cantitate: number }>();

    for (let i = 0; i < 7; i += 1) {
      const dayISO = toDateISO(addDays(weekStart, i));
      const dayPlan = getPlanDayForDate(dayISO, plan);
      [dayPlan.masa1, dayPlan.masa2].forEach((meal) => {
        meal.ingrediente.forEach((ingredient) => {
          const key = `${ingredient.nume.trim().toLowerCase()}-${ingredient.unitate}`;
          const current = items.get(key);
          const nextAmount = (current?.cantitate ?? 0) + ingredient.cantitate;
          items.set(key, {
            nume: ingredient.nume,
            unitate: ingredient.unitate,
            cantitate: nextAmount
          });
        });
      });
    }

    const list = Array.from(items.values()).sort((a, b) => a.nume.localeCompare(b.nume, 'ro'));
    return { list, weekStart, weekEnd: addDays(weekStart, 6) };
  }, [plan, selectedDateISO]);

  const [notes, setNotes] = useState(log?.notes ?? '');

  useEffect(() => {
    setNotes(log?.notes ?? '');
  }, [log?.notes, selectedDateISO]);

  const handleQuickComplete = () => {
    updateLog(selectedDateISO, {
      masa1Done: true,
      masa2Done: true,
      suplimente: { magneziu: true, vitaminaD: true, omega3: true },
      miscareDone: true
    });
    pushToast('Salvat');
  };

  const handleQuickReset = () => {
    resetLogs();
    pushToast('Resetat');
  };

  const handleSnooze = (key: string) => {
    const minutes = settings.snoozeMinutes;
    const target = new Date(Date.now() + minutes * 60 * 1000);
    updateLog(selectedDateISO, {
      snoozedReminders: { ...(log?.snoozedReminders ?? {}), [key]: target.toISOString() }
    });
    scheduleOneOffNotification(key, `Reminder amânat cu ${minutes} minute.`, target, settings);
    pushToast(`Amânat ${minutes}m`);
  };

  const formatQty = (value: number) => {
    if (Number.isInteger(value)) return String(value);
    return value.toFixed(1);
  };

  const categorizeIngredient = (name: string) => {
    const value = name.toLowerCase();
    const proteine = [
      'pui',
      'curcan',
      'porc',
      'vită',
      'vita',
      'ou',
      'iaurt',
      'brânză',
      'branza',
      'cașcaval',
      'cascaval'
    ];
    const legume = [
      'roș',
      'ros',
      'ceap',
      'ardei',
      'castrav',
      'dovle',
      'salat',
      'conopid',
      'fasole',
      'broccoli',
      'sfecl',
      'ciuperc',
      'varz',
      'țelin',
      'telin',
      'lămâ',
      'lamâ',
      'lama'
    ];
    if (proteine.some((term) => value.includes(term))) return 'Proteine';
    if (legume.some((term) => value.includes(term))) return 'Legume';
    return 'Restul';
  };

  return (
    <div className="space-y-4">
      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-[color:var(--color-muted)]">{formatLongDate(date)}</p>
            <h1 className="font-display text-2xl font-helvetica">ME-Align</h1>
          </div>
          <div className="flex items-center rounded-[var(--radius-chip)] border border-[color:var(--color-border)] px-3 py-2 text-xs font-semibold text-[color:var(--color-muted)]">
            Ziua {planDay.index} din {plan.days.length}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <Input
            type="date"
            value={selectedDateISO}
            onChange={(event) => setSelectedDate(event.target.value)}
          />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        <Card>
          <p className="text-xs text-[color:var(--color-muted)]">Progres azi</p>
          <p className="mt-2 text-2xl font-semibold">{completion.done}/{completion.total}</p>
          <div className="mt-3 h-2 w-full rounded-full bg-[color:var(--color-border)]">
            <div
              className="h-2 rounded-full bg-[color:var(--color-accent)]"
              style={{ width: `${(completion.done / completion.total) * 100}%` }}
            />
          </div>
        </Card>
        <Card>
          <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
            <Icon name="clock" className="h-4 w-4" aria-hidden="true" />
            Interval mese
          </p>
          <p className="mt-2 text-2xl font-semibold">
            {settings.eatingWindowStart}–{settings.eatingWindowEnd}
          </p>
          <p className="text-xs text-[color:var(--color-muted)]">2 mese / zi</p>
        </Card>
      </div>

      <Card className="bg-[linear-gradient(180deg,rgba(34,197,94,0.18),rgba(27,31,42,0.9))]">
        <p className="text-xs text-[color:var(--color-muted)]">Streak curent</p>
        <div className="mt-3 flex flex-wrap items-center gap-6">
          <div
            className="grid h-24 w-24 place-items-center rounded-full"
            style={{
              background: `conic-gradient(var(--color-accent) ${Math.min(streaks.current, 7) / 7 * 360}deg, rgba(255,255,255,0.08) 0deg)`
            }}
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[color:var(--color-surface)] text-xl font-semibold text-[color:var(--color-text)]">
              {streaks.current}
            </div>
          </div>
          <div className="text-sm text-[color:var(--color-muted)]">
            Zile consecutive
            <div className="mt-1 text-xs">Cel mai bun: {streaks.best}</div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
        <Card className="bg-[linear-gradient(180deg,rgba(236,72,153,0.18),rgba(27,31,42,0.9))]">
          <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
            <Icon name="pill" className="h-4 w-4" aria-hidden="true" />
            Suplimente
          </p>
          <div className="mt-3 space-y-2">
            <Checkbox
              label="Magneziu"
              checked={supplements.magneziu}
              onChange={(event) =>
                updateLog(selectedDateISO, {
                  suplimente: { ...supplements, magneziu: event.target.checked }
                })
              }
            />
            <Checkbox
              label="Vitamina D"
              checked={supplements.vitaminaD}
              onChange={(event) =>
                updateLog(selectedDateISO, {
                  suplimente: { ...supplements, vitaminaD: event.target.checked }
                })
              }
            />
            <Checkbox
              label="Omega 3"
              checked={supplements.omega3}
              onChange={(event) =>
                updateLog(selectedDateISO, {
                  suplimente: { ...supplements, omega3: event.target.checked }
                })
              }
            />
          </div>
        </Card>
        <Card className="bg-[linear-gradient(180deg,rgba(249,115,22,0.18),rgba(27,31,42,0.9))]">
          <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
            <Icon name="walk" className="h-4 w-4" aria-hidden="true" />
            Mișcare
          </p>
          <div className="mt-3 space-y-3">
            <Checkbox
              label="Mișcare făcută"
              checked={log?.miscareDone ?? false}
              onChange={(event) => updateLog(selectedDateISO, { miscareDone: event.target.checked })}
            />
            <Select
              label="Preset"
              value={log?.miscarePreset ?? ''}
              onChange={(event) => updateLog(selectedDateISO, { miscarePreset: event.target.value })}
            >
              <option value="">Alege preset</option>
              {movementPresets.map((preset) => (
                <option key={preset} value={preset}>
                  {preset}
                </option>
              ))}
            </Select>
          </div>
        </Card>
      </div>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
              <Icon name="check" className="h-4 w-4" aria-hidden="true" />
              Completare rapidă
            </p>
            <p className="text-xs text-[color:var(--color-muted)]">Bifează totul într-un singur tap.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={handleQuickComplete}>
              Completare zi
            </Button>
            <Button variant="ghost" onClick={handleQuickReset}>
              Resetează
            </Button>
          </div>
        </div>
      </Card>

      <Button variant="secondary" fullWidth onClick={() => setShowShopping(true)}>
        Listă de cumpărături (săptămâna curentă)
      </Button>

      <MealCard
        title="Masa 1"
        checked={log?.masa1Done ?? false}
        onToggle={(checked) => updateLog(selectedDateISO, { masa1Done: checked })}
        meal={planDay.masa1}
      />
      <MealCard
        title="Masa 2"
        checked={log?.masa2Done ?? false}
        onToggle={(checked) => updateLog(selectedDateISO, { masa2Done: checked })}
        meal={planDay.masa2}
      />

      <Card>
        <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
          <Icon name="notes" className="h-4 w-4" aria-hidden="true" />
          Notițe scurte
        </p>
        <textarea
          className="mt-2 h-24 w-full rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-transparent p-3 text-sm"
          maxLength={280}
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          onBlur={() => updateLog(selectedDateISO, { notes })}
          placeholder="Scrie un gând rapid..."
        />
      </Card>

      <Card>
        <p className="flex items-center gap-2 text-sm text-[color:var(--color-muted)]">
          <Icon name="bell" className="h-4 w-4" aria-hidden="true" />
          Remindere în aplicație
        </p>
        <div className="mt-3 space-y-2">
          {reminders.map((reminder) => (
            <div key={reminder.key} className="flex items-center justify-between text-sm">
              <span>
                {reminder.key} · {reminder.time}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[color:var(--color-muted)]">{reminder.status}</span>
                <Button
                  variant="ghost"
                  onClick={() => handleSnooze(reminder.key)}
                  disabled={todayISO !== selectedDateISO || reminder.withinQuiet || reminder.status === 'Trecut'}
                >
                  Amână {settings.snoozeMinutes}m
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={showShopping}
        title={`Listă cumpărături ${shoppingData.weekStart.toLocaleDateString('ro-RO')} - ${shoppingData.weekEnd.toLocaleDateString('ro-RO')}`}
        onClose={() => setShowShopping(false)}
        size="sm"
        footer={
          <div className="flex justify-end">
            <Button variant="ghost" onClick={() => setShowShopping(false)}>
              Închide
            </Button>
          </div>
        }
      >
        {shoppingData.list.length === 0 ? (
          <p className="text-sm text-[color:var(--color-muted)]">Nu există ingrediente pentru această săptămână.</p>
        ) : (
          <div className="max-h-[50vh] overflow-y-auto pr-2">
            {['Proteine', 'Legume', 'Restul'].map((section) => {
              const items = shoppingData.list.filter(
                (item) => categorizeIngredient(item.nume) === section
              );
              if (items.length === 0) return null;
              return (
                <div key={section} className="mb-4">
                  <p className="text-xs font-semibold uppercase text-[color:var(--color-muted)]">{section}</p>
                  <ul className="mt-2 space-y-2 text-sm">
                    {items.map((item) => (
                      <li key={`${item.nume}-${item.unitate}`} className="flex items-center justify-between">
                        <span>{item.nume}</span>
                        <span className="text-[color:var(--color-muted)]">
                          {formatQty(item.cantitate)} {item.unitate}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

function MealCard({
  title,
  checked,
  onToggle,
  meal
}: {
  title: string;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  meal: {
    titlu: string;
    oraImplicita: string;
    caloriiEstimate: number;
    ingrediente: { id: string; nume: string; cantitate: number; unitate: string; note?: string }[];
    reteta: { pasi: string[]; prepMinute: number; cookMinute: number };
  };
}) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-xs uppercase text-[color:var(--color-muted)]">
            <Icon name="meal" className="h-4 w-4" aria-hidden="true" />
            {title}
          </p>
          <h3 className="text-lg font-semibold">{meal.titlu}</h3>
          <p className="text-sm text-[color:var(--color-muted)]">Ora: {meal.oraImplicita}</p>
        </div>
        <Checkbox label="Făcut" checked={checked} onChange={(event) => onToggle(event.target.checked)} />
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold">Ingrediente</p>
        <ul className="mt-2 space-y-1 text-sm text-[color:var(--color-muted)]">
          {meal.ingrediente.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.nume} · {ingredient.cantitate} {ingredient.unitate}
              {ingredient.note ? ` (${ingredient.note})` : ''}
            </li>
          ))}
        </ul>
      </div>
      <details className="mt-3">
        <summary className="cursor-pointer text-sm font-semibold">Rețetă și pași</summary>
        <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-[color:var(--color-muted)]">
          {meal.reteta.pasi.map((pas, index) => (
            <li key={`${meal.titlu}-${index}`}>{pas}</li>
          ))}
        </ol>
        <p className="mt-2 text-xs text-[color:var(--color-muted)]">
          Prep: {meal.reteta.prepMinute}m · Gătit: {meal.reteta.cookMinute}m · {meal.caloriiEstimate} kcal
        </p>
      </details>
    </Card>
  );
}
