import { InputHTMLAttributes } from 'react';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Toggle({ label, className = '', ...props }: ToggleProps) {
  return (
    <label className={`flex items-center justify-between gap-3 text-sm ${className}`}>
      <span>{label}</span>
      <span className="relative inline-flex h-6 w-11 items-center">
        <input type="checkbox" className="peer sr-only" {...props} />
        <span className="absolute inset-0 rounded-full bg-[color:var(--color-border)] transition peer-checked:bg-[color:var(--color-accent)]" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}
