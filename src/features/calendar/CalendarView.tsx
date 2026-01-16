import { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Checkbox } from '../../components/ui/Checkbox';
import { Icon } from '../../components/ui/Icon';
import { DailyLog, useAppStore } from '../../store/useAppStore';
import { addDays, formatShortDate, fromDateISO, getMonthDays, getWeekdayIndex, toDateISO } from '../../lib/date';
import { calcCompletionPercent, calcDailyCompletion, calcStreaks, countCompleteDays, getPlanDayForDate, isDayComplete } from '../../lib/metrics';

export function CalendarView() {
  const { logs, setSelectedDate } = useAppStore();
  const [cursor, setCursor] = useState(new Date());
  const [modalDate, setModalDate] = useState<string | null>(null);
  const streaks = useMemo(() => calcStreaks(logs), [logs]);
  const completion7 = useMemo(() => calcCompletionPercent(logs, 7), [logs]);
  const complete14 = useMemo(() => countCompleteDays(logs, 14), [logs]);
  const heatmap = useMemo(() => buildHeatmap(logs, 28), [logs]);

  const { start, total } = getMonthDays(cursor);
  const startWeekday = getWeekdayIndex(start);

  const days = useMemo(() => {
    const entries = [] as Date[];
    for (let i = 0; i < total; i += 1) {
      entries.push(addDays(start, i));
    }
    return entries;
  }, [start, total]);

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[color:var(--color-muted)]">Calendar lunar</p>
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Icon name="calendar" className="h-6 w-6 text-[color:var(--color-accent)]" aria-hidden="true" />
            {new Intl.DateTimeFormat('ro-RO', { month: 'long', year: 'numeric' }).format(cursor)}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setCursor(addDays(start, -1))}>
            Luna trecută
          </Button>
          <Button variant="ghost" onClick={() => setCursor(addDays(start, total))}>
            Luna viitoare
          </Button>
        </div>
      </header>

      <Card>
        <div className="grid grid-cols-7 gap-2 text-center text-xs text-[color:var(--color-muted)]">
          {['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du'].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-7 gap-2">
          {Array.from({ length: startWeekday - 1 }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {days.map((day) => {
            const dateISO = toDateISO(day);
            const log = logs[dateISO];
            const complete = isDayComplete(log);
            const partial = log && !complete;

            return (
              <button
                key={dateISO}
                onClick={() => setModalDate(dateISO)}
                aria-label={`Ziua ${dateISO} ${complete ? 'completă' : partial ? 'parțială' : 'neîncepută'}`}
                className="flex flex-col items-center gap-2 rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-2 text-xs transition hover:border-[color:var(--color-accent)]"
              >
                <span>{day.getDate()}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    complete
                      ? 'bg-[color:var(--color-success)]'
                      : partial
                        ? 'bg-[color:var(--color-warning)]'
                        : 'bg-[color:var(--color-border)]'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <p className="text-sm font-semibold">Legendă</p>
        <div className="mt-3 flex flex-wrap gap-4 text-xs text-[color:var(--color-muted)]">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-success)]" />
            Zi completă
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-warning)]" />
            Parțial
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[color:var(--color-border)]" />
            Neînceput
          </span>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Streak & statistici</p>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3">
            <p className="text-xs text-[color:var(--color-muted)]">Streak curent</p>
            <p className="text-lg font-semibold">{streaks.current} zile</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3">
            <p className="text-xs text-[color:var(--color-muted)]">Cel mai bun streak</p>
            <p className="text-lg font-semibold">{streaks.best} zile</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3">
            <p className="text-xs text-[color:var(--color-muted)]">Completare 7 zile</p>
            <p className="text-lg font-semibold">{completion7}%</p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3 md:col-span-3">
            <p className="text-xs text-[color:var(--color-muted)]">Zile complete ultimele 14</p>
            <p className="text-lg font-semibold">{complete14} zile</p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="text-sm text-[color:var(--color-muted)]">Heatmap ultimele 4 săptămâni</p>
        <div className="mt-3 grid grid-cols-7 gap-2 text-[10px] text-[color:var(--color-muted)]">
          {['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sa', 'Du'].map((label) => (
            <span key={label} className="text-center">
              {label}
            </span>
          ))}
          {heatmap.map((cell) => (
            <div
              key={cell.dateISO}
              className="h-6 rounded-[var(--radius-card)] border border-[color:var(--color-border)]"
              style={{ backgroundColor: cell.background }}
              title={`${cell.dateISO} · ${cell.percent}%`}
            />
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(modalDate)}
        title={modalDate ? formatShortDate(fromDateISO(modalDate)) : ''}
        onClose={() => setModalDate(null)}
        footer={
          <Button
            fullWidth
            onClick={() => {
              if (modalDate) {
                setSelectedDate(modalDate);
              }
              setModalDate(null);
            }}
          >
            Deschide ziua
          </Button>
        }
      >
        {modalDate ? <DayDetail dateISO={modalDate} /> : null}
      </Modal>
    </div>
  );
}

function buildHeatmap(logs: Record<string, DailyLog | undefined>, days: number) {
  const today = new Date();
  const entries = [] as { dateISO: string; percent: number; background: string }[];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateISO = toDateISO(date);
    const log = logs[dateISO];
    const completion = calcDailyCompletion(log);
    const percent = Math.round((completion.done / completion.total) * 100);
    const background =
      percent === 0
        ? 'transparent'
        : percent < 50
          ? 'rgba(180, 83, 9, 0.2)'
          : percent < 100
            ? 'rgba(15, 118, 110, 0.25)'
            : 'rgba(15, 118, 110, 0.6)';
    entries.push({ dateISO, percent, background });
  }
  return entries;
}

function DayDetail({ dateISO }: { dateISO: string }) {
  const { logs, updateLog, removeLog, plan } = useAppStore();
  const log = logs[dateISO];
  const completion = calcDailyCompletion(log);
  const planDay = getPlanDayForDate(dateISO, plan);

  return (
    <div className="space-y-3">
      <div className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3">
        <p className="text-sm text-[color:var(--color-muted)]">Progres</p>
        <p className="text-lg font-semibold">
          {completion.done}/{completion.total} completate
        </p>
      </div>
      <div className="space-y-2">
        <Checkbox
          label={`Masa 1 · ${planDay.masa1.titlu}`}
          checked={log?.masa1Done ?? false}
          onChange={(event) => updateLog(dateISO, { masa1Done: event.target.checked })}
        />
        <Checkbox
          label={`Masa 2 · ${planDay.masa2.titlu}`}
          checked={log?.masa2Done ?? false}
          onChange={(event) => updateLog(dateISO, { masa2Done: event.target.checked })}
        />
        <Checkbox
          label="Suplimente complete"
          checked={
            (log?.suplimente.magneziu ?? false) &&
            (log?.suplimente.vitaminaD ?? false) &&
            (log?.suplimente.omega3 ?? false)
          }
          onChange={(event) =>
            updateLog(dateISO, {
              suplimente: {
                magneziu: event.target.checked,
                vitaminaD: event.target.checked,
                omega3: event.target.checked
              }
            })
          }
        />
        <Checkbox
          label="Mișcare făcută"
          checked={log?.miscareDone ?? false}
          onChange={(event) => updateLog(dateISO, { miscareDone: event.target.checked })}
        />
      </div>
      <Button variant="ghost" onClick={() => removeLog(dateISO)}>
        Resetează ziua
      </Button>
    </div>
  );
}
