import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export function Select({ label, className = '', children, ...props }: SelectProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="text-[color:var(--color-muted)]">{label}</span> : null}
      <select
        className={`w-full rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-accent)] focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  );
}
