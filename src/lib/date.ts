export function toDateISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function fromDateISO(dateISO: string) {
  const [year, month, day] = dateISO.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat('ro-RO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

export function formatShortDate(date: Date) {
  return new Intl.DateTimeFormat('ro-RO', {
    day: 'numeric',
    month: 'short'
  }).format(date);
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function diffInDays(a: Date, b: Date) {
  const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.floor((utcA - utcB) / (24 * 60 * 60 * 1000));
}

export function getMonthDays(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return { start, end, total: end.getDate() };
}

export function getWeekdayIndex(date: Date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}
