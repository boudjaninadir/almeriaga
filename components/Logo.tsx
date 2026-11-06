import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/site-config';

/**
 * Logo ALMERÍAGA : « A » souligné d'un arc et surmonté d'une étincelle,
 * dessiné en SVG, sur une pastille pêche du thème clair (aucun fond sombre).
 */
export function LogoMark({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`Logo ${BRAND_NAME}`}>
      <rect width="48" height="48" rx="13" fill="rgb(255 236 227)" />
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="46.5"
        rx="12.25"
        fill="none"
        stroke="rgb(240 82 26 / 0.35)"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 38 L24 15 L35.5 38"
        fill="none"
        stroke="rgb(205 56 10)"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 31 C18 28 29 23.5 39.5 16"
        fill="none"
        stroke="rgb(240 82 26 / 0.55)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M24 5 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4z"
        fill="rgb(240 82 26)"
      />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark className={compact ? 'h-9 w-9' : 'h-10 w-10'} />
      <span className="leading-none">
        <span className="block text-[15px] font-semibold uppercase tracking-[0.22em] text-ink">{BRAND_NAME}</span>
        {!compact && (
          <span className="mt-1 hidden text-[10px] uppercase tracking-[0.16em] text-ink-faint sm:block">
            {BRAND_TAGLINE}
          </span>
        )}
      </span>
    </span>
  );
}

