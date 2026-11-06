import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'accent' | 'brand' | 'mint' | 'neutral';

/** Pastilles sur fond blanc cassé : contour or fin, texte doré ou or plein. */
const TONES: Record<Tone, string> = {
  accent: 'border-[#D4AF37]/40 bg-[#F1EDE3] text-[#8A6D1F]',
  brand: 'border-[#D4AF37] bg-[#D4AF37] text-[#1B1F1D]',
  mint: 'border-[#D4AF37] bg-[#D4AF37] text-[#1B1F1D]',
  neutral: 'border-[#D4AF37]/25 bg-[#F1EDE3] text-ink-soft',
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

