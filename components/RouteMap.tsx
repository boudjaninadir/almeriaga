'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/context';

/**
 * Carte schématique Almería / Alicante → Oran, puis Tlemcen et Sidi Bel Abbès.
 * Tracés vectoriels originaux, papier & encre, route orange. Les étincelles
 * (6,2 s) ne sont montées qu'après hydratation et jamais en mode « mouvement réduit ».
 */
export function RouteMap() {
  const { dict } = useI18n();
  const map = dict.home.map;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAnimate(!query.matches);
    function onChange(event: MediaQueryListEvent) {
      setAnimate(!event.matches);
    }
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <figure className="w-full">
      <div className="relative w-full">
        <svg
          viewBox="0 0 640 720"
          role="img"
          aria-label={`${map.caption}. ${map.label}.`}
          className="h-[430px] w-full overflow-visible sm:h-[520px] lg:h-[560px]" preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <pattern id="map-grid" width="64" height="64" patternUnits="userSpaceOnUse">
              <path d="M64 0H0V64" fill="none" stroke="#E7E4DE" strokeWidth="0.8" />
            </pattern>
            <marker id="route-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0L8 4L0 8Z" fill="#E88923" />
            </marker>
          </defs>

          <rect width="640" height="720" fill="#FAF8F4" />
          <rect width="640" height="720" fill="url(#map-grid)" opacity="0.55" />

          {/* Espagne */}
          <path
            d="M0 150C58 138 104 148 156 132C214 114 262 128 320 114C378 100 424 116 482 102C536 89 590 96 640 82V0H0Z"
            fill="#F3F0EA"
            stroke="#8A8680"
            strokeWidth="0.9"
          />
          {/* Algérie */}
          <path
            d="M0 476C72 458 132 470 202 452C278 432 338 458 414 442C492 426 566 448 640 432V720H0Z"
            fill="#F3F0EA"
            stroke="#8A8680"
            strokeWidth="0.9"
          />

          <text x="380" y="58" fill="#8A8680" fontSize="11" letterSpacing="2.2" fontFamily="Inter, sans-serif" textAnchor="middle">
            {map.spain.toUpperCase()}
          </text>
          <text x="320" y="300" fill="#8A8680" fontSize="20" letterSpacing="5" fontFamily="Manrope, sans-serif" textAnchor="middle">
            {map.mediterranean.toUpperCase()}
          </text>
          <text x="360" y="682" fill="#8A8680" fontSize="11" letterSpacing="2.2" fontFamily="Inter, sans-serif" textAnchor="middle">
            {map.algeria.toUpperCase()}
          </text>
          <text x="24" y="236" fill="#8A8680" fontSize="9" letterSpacing="1.8" fontFamily="Inter, sans-serif">
            {map.label.toUpperCase()}
          </text>

          {/* Routes */}
          <path d="M420 112C444 210 430 320 348 428" fill="none" stroke="#E88923" strokeWidth="2.2" markerEnd="url(#route-arrow)" />
          <path d="M182 162C212 246 262 348 346 426" fill="none" stroke="#E88923" strokeWidth="1.2" strokeDasharray="3 6" />
          <path d="M344 440C312 476 280 500 252 528" fill="none" stroke="#8A8680" strokeWidth="1" strokeDasharray="2 5" />
          <path d="M356 440C396 466 438 488 470 516" fill="none" stroke="#8A8680" strokeWidth="1" strokeDasharray="2 5" />

          {/* Villes */}
          <City x={420} y={112} label={map.alicante} anchor="middle" labelY={-14} />
          <City x={182} y={162} label={map.almeria} anchor="middle" labelY={-14} />
          <City x={348} y={432} label={map.oran} anchor="middle" labelY={-16} />
          <City x={252} y={532} label={map.tlemcen} anchor="middle" labelY={22} />
          <City x={470} y={520} label={map.sidi} anchor="middle" labelY={22} />

          {animate && (
            <g aria-hidden="true">
              <circle r="3" fill="#E88923">
                <animateMotion dur="6.2s" repeatCount="indefinite" path="M420 112C444 210 430 320 348 428" />
              </circle>
              <circle r="2.4" fill="#E88923">
                <animateMotion dur="6.2s" begin="2.1s" repeatCount="indefinite" path="M182 162C212 246 262 348 346 426" />
              </circle>
              <circle r="2" fill="#E88923">
                <animateMotion dur="6.2s" begin="4.2s" repeatCount="indefinite" path="M344 440C312 476 280 500 252 528" />
              </circle>
            </g>
          )}
        </svg>
      </div>
      <figcaption className="mt-4 flex items-start gap-3 font-sans text-[13px] leading-snug text-ink">
        <span className="mt-2 h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
        <span>{map.caption}</span>
      </figcaption>
    </figure>
  );
}

function City({
  x,
  y,
  label,
  anchor,
  labelY,
}: {
  x: number;
  y: number;
  label: string;
  anchor: 'middle' | 'start' | 'end';
  labelY: number;
}) {
  return (
    <g>
      <circle cx={x} cy={y} r="3.2" fill="#FAF8F4" stroke="#141414" strokeWidth="1" />
      <text x={x} y={y + labelY} fill="#141414" fontSize="11" fontFamily="Inter, sans-serif" textAnchor={anchor}>
        {label}
      </text>
    </g>
  );
}
