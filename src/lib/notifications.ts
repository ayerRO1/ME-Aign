import { Settings } from '../store/useAppStore';
import { formatShortDate, fromDateISO, toDateISO } from './date';

let activeTimers: number[] = [];

function clearTimers() {
  activeTimers.forEach((id) => window.clearTimeout(id));
  activeTimers = [];
}

function scheduleNotification(title: string, body: string, date: Date) {
  const delay = date.getTime() - Date.now();
  if (delay <= 0) return;
  const id = window.setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body });
    }
  }, delay);
  activeTimers.push(id);
}

export function requestNotificationPermission() {
  if (!('Notification' in window)) return Promise.resolve('denied');
  return Notification.requestPermission();
}

function timeToMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function isWithinQuietHours(settings: Settings, time: string) {
  const start = timeToMinutes(settings.quietHoursStart);
  const end = timeToMinutes(settings.quietHoursEnd);
  const current = timeToMinutes(time);
  if (start === end) return false;
  if (start < end) {
    return current >= start && current < end;
  }
  return current >= start || current < end;
}

export function scheduleDailyNotifications(settings: Settings, dateISO: string) {
  // Web Notifications are best-effort: they only fire while the app is open,
  // and background behavior depends on the browser/PWA. We provide in-app reminders as fallback.
  clearTimers();
  if (!settings.notificationsEnabled) return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;

  const baseDate = fromDateISO(dateISO);
  const reminders = [
    { key: 'Masa 1', time: settings.reminders.masa1, body: 'E timpul pentru Masa 1.' },
    { key: 'Masa 2', time: settings.reminders.masa2, body: 'E timpul pentru Masa 2.' },
    { key: 'Suplimente', time: settings.reminders.suplimente, body: 'Suplimentele de azi.' },
    { key: 'Mișcare', time: settings.reminders.miscare, body: 'Sesiunea de mișcare planificată.' }
  ];

  reminders.forEach((reminder) => {
    if (isWithinQuietHours(settings, reminder.time)) return;
    const [hours, minutes] = reminder.time.split(':').map(Number);
    const target = new Date(baseDate);
    target.setHours(hours, minutes, 0, 0);
    scheduleNotification(reminder.key, reminder.body, target);
  });
}

export function scheduleOneOffNotification(title: string, body: string, target: Date, settings: Settings) {
  if (!settings.notificationsEnabled) return;
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  const time = `${String(target.getHours()).padStart(2, '0')}:${String(target.getMinutes()).padStart(2, '0')}`;
  if (isWithinQuietHours(settings, time)) return;
  scheduleNotification(title, body, target);
}

export function getReminderStatus(
  settings: Settings,
  dateISO: string,
  snoozes: Record<string, string> = {}
) {
  const now = new Date();
  const date = fromDateISO(dateISO);
  const todayISO = toDateISO(now);
  const isToday = todayISO === dateISO;

  const reminders = [
    { key: 'Masa 1', time: settings.reminders.masa1 },
    { key: 'Masa 2', time: settings.reminders.masa2 },
    { key: 'Suplimente', time: settings.reminders.suplimente },
    { key: 'Mișcare', time: settings.reminders.miscare }
  ];

  return reminders.map((reminder) => {
    const [hours, minutes] = reminder.time.split(':').map(Number);
    const target = new Date(date);
    target.setHours(hours, minutes, 0, 0);
    const snoozeISO = snoozes[reminder.key];
    const snoozeTarget = snoozeISO ? new Date(snoozeISO) : null;
    const withinQuiet = isWithinQuietHours(settings, reminder.time);
    const status = !isToday
      ? 'Programat'
      : snoozeTarget && snoozeTarget > now
        ? `Amânat până la ${formatShortDate(snoozeTarget)} ${snoozeTarget
            .toTimeString()
            .slice(0, 5)}`
        : now >= target
          ? 'Trecut'
          : withinQuiet
            ? 'În pauză (quiet hours)'
            : 'În așteptare';
    return { ...reminder, status, target, withinQuiet };
  });
}
