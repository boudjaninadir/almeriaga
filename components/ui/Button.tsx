import Link from 'next/link';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tightish transition duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-canvas disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white shadow-soft hover:bg-brand-strong hover:shadow-lift active:translate-y-px',
  secondary: 'border border-line bg-canvas text-ink hover:bg-surface',
  ghost: 'text-ink-soft hover:bg-surface hover:text-ink',
  // Bouton or : à utiliser sur fond vert profond uniquement (texte vert sur or = 5,5:1).
  gold: 'bg-gold-light text-brand-strong hover:bg-gold active:translate-y-px',
};

const SIZES: Record<Size, string> = {
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

/** Lien stylé comme un bouton. Les chemins internes ("/gros") utilisent next/link, les ancres ("#reserver") un <a>. */
export function ButtonLink({ href, variant, size, className, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  if (href.startsWith('/')) return <Link href={href} className={classes} {...rest} />;
  return <a href={href} className={classes} {...rest} />;
}
