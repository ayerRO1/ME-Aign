import { useToastStore } from '../../store/useToastStore';

export function ToastHost() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div
      className="fixed bottom-24 left-1/2 z-50 flex w-full max-w-md -translate-x-1/2 flex-col gap-2 px-4"
      role="status"
      aria-live="polite"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-sm shadow-[var(--shadow-soft)]"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
