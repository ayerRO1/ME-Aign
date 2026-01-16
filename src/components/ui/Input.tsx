import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-2 text-sm">
      {label ? <span className="text-[color:var(--color-muted)]">{label}</span> : null}
      <input
        className={`w-full rounded-[var(--radius-card)] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-2 text-sm shadow-sm focus:border-[color:var(--color-accent)] focus:outline-none ${className}`}
        {...props}
      />
    </label>
  );
}
