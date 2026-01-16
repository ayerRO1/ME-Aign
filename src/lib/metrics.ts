import { DailyLog, UserPlan } from '../store/useAppStore';
import { diffInDays, fromDateISO, toDateISO } from './date';

export function mapDateToPlanDayIndex(dateISO: string, plan: UserPlan) {
  const start = fromDateISO(plan.startDateISO);
  const date = fromDateISO(dateISO);
  const totalDays = plan.days.length || 14;
  const diff = diffInDays(date, start);
  const index = ((diff % totalDays) + totalDays) % totalDays;
  return index + 1;
}

export function getPlanDayForDate(dateISO: string, plan: UserPlan) {
  const index = mapDateToPlanDayIndex(dateISO, plan);
  return plan.days.find((day) => day.index === index) ?? plan.days[0];
}

export function calcDailyCompletion(log?: DailyLog) {
  if (!log) return { done: 0, total: 6 };
  const supplements = log.suplimente;
  const done =
    Number(log.masa1Done) +
    Number(log.masa2Done) +
    Number(supplements.magneziu) +
    Number(supplements.vitaminaD) +
    Number(supplements.omega3) +
    Number(log.miscareDone);
  return { done, total: 6 };
}

export function isDayComplete(log?: DailyLog) {
  const { done, total } = calcDailyCompletion(log);
  return done === total;
}

export function calcStreaks(logs: Record<string, DailyLog>, startDateISO = toDateISO(new Date())) {
  const todayISO = startDateISO;
  let current = 0;
  let best = 0;
  let cursor = fromDateISO(todayISO);

  while (isDayComplete(logs[toDateISO(cursor)])) {
    current += 1;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
  }

  const sortedDates = Object.keys(logs).sort();
  let streak = 0;
  let lastDate: string | null = null;

  sortedDates.forEach((dateISO) => {
    if (!isDayComplete(logs[dateISO])) {
      streak = 0;
      lastDate = dateISO;
      return;
    }
    if (lastDate) {
      const diff = diffInDays(fromDateISO(dateISO), fromDateISO(lastDate));
      if (diff === 1) {
        streak += 1;
      } else {
        streak = 1;
      }
    } else {
      streak = 1;
    }
    best = Math.max(best, streak);
    lastDate = dateISO;
  });

  return { current, best };
}

export function calcCompletionPercent(logs: Record<string, DailyLog>, days: number) {
  const today = new Date();
  let done = 0;
  const total = days * 6;

  for (let i = 0; i < days; i += 1) {
    const dateISO = toDateISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
    const log = logs[dateISO];
    done += calcDailyCompletion(log).done;
  }

  return Math.round((done / total) * 100);
}

export function countCompleteDays(logs: Record<string, DailyLog>, days: number) {
  const today = new Date();
  let count = 0;
  for (let i = 0; i < days; i += 1) {
    const dateISO = toDateISO(new Date(today.getFullYear(), today.getMonth(), today.getDate() - i));
    if (isDayComplete(logs[dateISO])) count += 1;
  }
  return count;
}
