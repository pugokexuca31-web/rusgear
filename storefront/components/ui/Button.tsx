import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-heading uppercase tracking-wide font-semibold transition-colors rounded-card disabled:opacity-40 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  primary: 'bg-accent-red text-white hover:bg-[#b52f28]',
  outline: 'border border-ink-300 text-ink-900 hover:border-ink-900',
  ghost: 'text-ink-700 hover:text-accent-red',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-xs',
  lg: 'h-14 px-8 text-sm',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
    </Link>
  );
}
