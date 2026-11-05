import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'accent' | 'brand' | 'mint' | 'neutral';

const TONES: Record<Tone, string> = {
  accent: 'border-accent/25 bg-accent-soft text-accent-ink',
  brand: 'border-accent/25 bg-accent-soft text-accent-ink',
  mint: 'border-mint-ink/15 bg-mint text-mint-ink',
  neutral: 'border-line bg-surface-2 text-ink-soft',
};

export function Badge({
  tone = 'accent',
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold',
        TONES[tone],
        className,
      )}
      {...rest}
    />
  );
}

