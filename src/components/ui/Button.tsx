import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'warning';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-[color:var(--color-accent)] text-white border border-transparent shadow-[var(--shadow-soft)]',
  secondary: 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)] border border-[color:var(--color-border)]',
  ghost: 'bg-transparent text-[color:var(--color-text)] border border-[color:var(--color-border)]',
  warning: 'bg-[color:var(--color-warning)] text-white border border-transparent shadow-[var(--shadow-soft)]'
};

export function Button({ variant = 'primary', fullWidth, className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-[var(--radius-chip)] px-4 py-2 text-sm font-semibold transition active:scale-[0.98] hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-accent)] ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    />
  );
}
