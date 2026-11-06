import Image from 'next/image';

type Ps5ArtProps = {
  src?: string;
  className?: string;
};

export function Ps5Art({ src, className }: Ps5ArtProps) {
  // If a real image src or path is provided (e.g. /images/ps5-slim.webp)
  if (src) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface p-4 ${className ?? ''}`}>
        <Image src={src} alt="PS5 Slim" width={400} height={400} className="object-contain h-auto w-full max-h-[320px]" />
      </div>
    );
  }

  // Original SVG illustration of PS5 Slim (white & black silhouette, front view, original art, no Sony/PlayStation logos)
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-dark-block p-8 shadow-lift ${className ?? ''}`}>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-strong/80 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center">
        <svg viewBox="0 0 200 240" fill="none" className="h-48 w-40 drop-shadow-2xl">
          {/* Console base / stand */}
          <rect x="70" y="220" width="60" height="10" rx="3" fill="#1B1F1D" stroke="#E3C766" strokeWidth="1.5" />
          
          {/* Outer white plates (curved silhouette) */}
          <path d="M55 20 C55 20 40 80 45 140 C48 180 65 210 75 220 L85 220 C75 200 65 170 63 130 C60 80 70 35 75 20 Z" fill="#FAFAF7" stroke="#E3C766" strokeWidth="1" />
          <path d="M145 20 C145 20 160 80 155 140 C152 180 135 210 125 220 L115 220 C125 200 135 170 137 130 C140 80 130 35 125 20 Z" fill="#FAFAF7" stroke="#E3C766" strokeWidth="1" />

          {/* Inner dark body core */}
          <rect x="75" y="25" width="50" height="190" rx="6" fill="#1B1F1D" stroke="#B8962E" strokeWidth="1.5" />

          {/* Glowing power accent / LED stripe (gold/brand touch) */}
          <line x1="100" y1="35" x2="100" y2="55" stroke="#E3C766" strokeWidth="2.5" strokeLinecap="round" />

          {/* Disc slot & USB ports indicator lines */}
          <rect x="88" y="75" width="24" height="3" rx="1.5" fill="#444C48" />
          <circle cx="93" cy="95" r="2" fill="#E3C766" />
          <rect x="101" y="94" width="6" height="2" rx="1" fill="#88928D" />
        </svg>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-strong/90 px-3 py-1 text-xs font-semibold text-gold-light border border-gold/40">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-light animate-pulse" />
          Illustration originale PS5 Slim
        </span>
      </div>
    </div>
  );
}
