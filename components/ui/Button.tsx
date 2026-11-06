import Link from 'next/link';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'mint';
type Size = 'sm' | 'md' | 'lg';

/**
 * Boutons du thème « Rich Minimalist » : ils se soulèvent au survol et
 * s'enfoncent au clic. Seules transform et box-shadow sont animées.
 * - primary : or plein #D4AF37, texte émeraude #0B3D2E (contraste maximal).
 * - secondary : carte émeraude, liseré or fin.
 * - ghost : texte discret qui se dore au survol.
 * - mint : contour or qui se remplit au survol.
 */
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold tracking-tightish transition duration-200 ease-out-soft ' +
  'hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B3D2E] ' +
  'disabled:pointer-events-none disabled:opacity-60';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-[#D4AF37] text-[#0B3D2E] shadow-soft hover:bg-[#F3D77A] hover:shadow-accent',
  secondary:
    'border border-[#D4AF37]/30 bg-[#0E4635] text-[#F7F5EF] hover:border-[#D4AF37]/60 hover:bg-[#12513D] hover:text-[#D4AF37]',
  ghost: 'text-ink-soft hover:bg-[#12513D] hover:text-[#D4AF37]',
  mint: 'border border-[#D4AF37]/45 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0B3D2E]',
};

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function buttonClasses(opts: { variant?: Variant; size?: Size; className?: string } = {}): string {
  const { variant = 'primary', size = 'md', className } = opts;
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading = false, className, children, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses({ variant, size, className })}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
});

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  variant?: Variant;
  size?: Size;
};

/**
 * Lien stylé comme un bouton.
 * Chemins internes → next/link (navigation client, jamais une ancre seule).
 * Liens externes (WhatsApp, mailto, tel) → <a>.
 */
export function ButtonLink({ href, variant, size, className, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (href.startsWith('/')) {
    return <Link href={href} className={classes} {...rest} />;
  }
  return <a href={href} className={classes} {...rest} />;
}

