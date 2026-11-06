import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'available' | 'order' | 'neutral' | 'brand';

const TONES: Record<Tone, string> = {
  available: 'border-chalk bg-transparent text-ink',
  order: 'border-chalk bg-transparent text-ink',
  neutral: 'border-chalk bg-transparent text-ink',
  brand: 'border-chalk bg-transparent text-ink',
};

const DOTS: Record<Tone, string> = {
  available: 'bg-accent',
  order: 'bg-stone',
  neutral: 'bg-stone',
  brand: 'bg-accent',
};

export function Badge({
  tone = 'neutral',
  dot = true,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-[5px] font-sans text-[11px] font-normal leading-none text-ink',
        TONES[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span className={cn('h-1 w-1 rounded-full', DOTS[tone])} aria-hidden="true" />}
      {children}
    </span>
  );
}
