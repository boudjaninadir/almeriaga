import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/site-config';

/**
 * Logo ALMERÍAGA : monogramme « A » doré fourni par la charte de marque
 * (public/brand/monogram.svg), décliné en SVG vectoriel.
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/monogram.svg"
      alt=""
      role="img"
      aria-label={`Logo ${BRAND_NAME}`}
      className={`${className} object-contain`}
    />
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={compact ? 'h-9 w-9' : 'h-10 w-10'} />
      <span className="leading-none">
        <span className="block text-[15px] font-semibold uppercase tracking-[0.22em] text-[#8A6D1F]">
          {BRAND_NAME}
        </span>
        {!compact && (
          <span className="mt-1 hidden text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:block">
            {BRAND_TAGLINE}
          </span>
        )}
      </span>
    </span>
  );
}

