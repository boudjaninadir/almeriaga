import Link from 'next/link';
import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'gold';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[2px] font-sans text-[14px] font-medium tracking-[0.01em] ' +
  'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
  'disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-[#2b2b2b] active:bg-[#000]',
  secondary: 'border border-chalk bg-transparent text-ink hover:border-ink',
  ghost: 'bg-transparent text-ink hover:bg-chalk/50',
  gold: 'bg-ink text-paper hover:bg-[#2b2b2b]',
};

const SIZES: Record<Size, string> = {
  md: 'h-12 px-5',
  lg: 'h-[56px] px-6',
};

export function buttonClasses(opts: { variant?: Variant; size?: Size; className?: string } = {}): string {
  const { variant = 'primary', size = 'md', className } = opts;
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={cn('h-3.5 w-3.5 icon-directional', className)} fill="none" aria-hidden="true">
      <path d="M4 12L12 4M12 4H5.5M12 4v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  arrow?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, loading = false, arrow = false, className, children, disabled, type = 'button', ...rest },
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
      {arrow && !loading && <ArrowUpRight />}
    </button>
  );
});

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
};

/** Lien stylé comme un bouton. Chemins internes via next/link, ancres via <a>. */
export function ButtonLink({ href, variant, size, arrow = false, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <ArrowUpRight />}
    </>
  );
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
