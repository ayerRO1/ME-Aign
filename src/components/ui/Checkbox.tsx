import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Checkbox({ label, className = '', ...props }: CheckboxProps) {
  return (
    <label className={`flex items-center gap-3 text-sm ${className}`}>
      <input
        type="checkbox"
        className="h-5 w-5 rounded border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-accent)] focus:ring-[color:var(--color-accent)]"
        {...props}
      />
      <span>{label}</span>
    </label>
  );
}
