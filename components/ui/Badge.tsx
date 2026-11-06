import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'brand' | 'neutral';

const TONES: Record<Tone, string> = {
  brand: 'border-brand/20 bg-brand-soft text-brand-strong',
  neutral: 'border-line bg-surface text-ink-soft',
};

export function Badge({
  tone = 'brand',
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        TONES[tone],
        className,
      )}
      {...rest}
    />
  );
}
