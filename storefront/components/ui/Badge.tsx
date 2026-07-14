import type { ReactNode } from 'react';

type Tone = 'sale' | 'new' | 'neutral' | 'out';

const tones: Record<Tone, string> = {
  sale: 'bg-accent-red text-white',
  new: 'bg-accent-blue text-white',
  neutral: 'bg-ink-900 text-white',
  out: 'bg-ink-200 text-ink-600',
};

export function Badge({
  tone = 'neutral',
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-[10px] font-heading font-bold uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
