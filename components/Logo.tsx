import { SITE } from '@/lib/site';

/**
 * Logo ALMERÍAGA : un « A » doré avec un trait en arc et une étincelle au-dessus,
 * sur un carré vert profond. Dessin original (SVG), repris de l'esprit des cartes de visite.
 * gradientId doit être différent si le logo apparaît deux fois sur la même page.
 */
export function LogoMark({ className = 'h-9 w-9', gradientId = 'almeriaga-gold' }: { className?: string; gradientId?: string }) {
  const gold = `url(#${gradientId})`;
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label={`Logo ${SITE.name}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3D77A" />
          <stop offset="0.55" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#A67C00" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="11" className="fill-brand" />
      <path d="M12.5 38 L24 16 L35.5 38" fill="none" stroke={gold} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 31 C18 28 29 23.5 39.5 16" fill="none" stroke={gold} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M24 4 l1.4 3.4 3.4 1.4 -3.4 1.4 -1.4 3.4 -1.4 -3.4 -3.4 -1.4 3.4 -1.4z" fill={gold} />
    </svg>
  );
}

export function Logo({ light = false, gradientId }: { light?: boolean; gradientId?: string }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark gradientId={gradientId} />
      <span className="leading-none">
        <span className={`block text-[15px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-white' : 'text-brand'}`}>
          {SITE.name}
        </span>
        <span className={`mt-1 hidden text-[10px] uppercase tracking-[0.16em] sm:block ${light ? 'text-gold-light' : 'text-gold-ink'}`}>
          Sourcing &amp; micro-importation
        </span>
      </span>
    </span>
  );
}
