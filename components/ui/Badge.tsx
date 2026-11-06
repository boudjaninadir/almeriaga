import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'accent' | 'brand' | 'mint' | 'neutral';

/** Pastilles sur fond émeraude : contour or fin, texte doré ou or plein. */
const TONES: Record<Tone, string> = {
  accent: 'border-[#D4AF37]/40 bg-[#12513D] text-[#F3D77A]',
  brand: 'border-[#D4AF37] bg-[#D4AF37] text-[#0B3D2E]',
  mint: 'border-[#D4AF37] bg-[#D4AF37] text-[#0B3D2E]',
  neutral: 'border-[#D4AF37]/25 bg-[#12513D] text-ink-soft',
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

