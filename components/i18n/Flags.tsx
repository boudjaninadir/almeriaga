import type { SVGProps } from 'react';
import type { FlagCode } from '@/lib/i18n/config';

/**
 * Drapeaux dessinés en SVG (pas d'emoji : ils ne s'affichent pas sous Windows).
 * Tracés simplifiés, reconnaissables à petite taille, sans dépendance externe.
 */
const BASE = {
  viewBox: '0 0 24 16',
  role: 'presentation' as const,
  focusable: 'false' as const,
};

type FlagProps = SVGProps<SVGSVGElement>;

export function FlagFr(props: FlagProps) {
  return (
    <svg {...BASE} {...props}>
      <rect width="24" height="16" fill="#ffffff" />
      <rect width="8" height="16" fill="#002395" />
      <rect x="16" width="8" height="16" fill="#ED2939" />
    </svg>
  );
}

export function FlagEs(props: FlagProps) {
  return (
    <svg {...BASE} {...props}>
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
    </svg>
  );
}

export function FlagEn(props: FlagProps) {
  return (
    <svg {...BASE} {...props}>
      <rect width="24" height="16" fill="#012169" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#ffffff" strokeWidth="3.2" />
      <path d="M0 0 24 16M24 0 0 16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M12 0v16M0 8h24" stroke="#ffffff" strokeWidth="5.2" />
      <path d="M12 0v16M0 8h24" stroke="#C8102E" strokeWidth="3" />
    </svg>
  );
}

export function FlagAr(props: FlagProps) {
  return (
    <svg {...BASE} {...props}>
      <rect width="24" height="16" fill="#006C35" />
      <path d="M5 5.2h14M5 7.4h11M8 9.6h11" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M4.5 12.4h15" stroke="#ffffff" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M17.6 12.4l1.5-1.4v1.4" fill="#ffffff" />
    </svg>
  );
}

export function FlagDz(props: FlagProps) {
  return (
    <svg {...BASE} {...props}>
      <rect width="12" height="16" fill="#006233" />
      <rect x="12" width="12" height="16" fill="#ffffff" />
      <path
        d="M14.9 8a4.1 4.1 0 1 1-4.6-4.08 3.3 3.3 0 1 0 4.6 4.08Z"
        fill="#D21034"
      />
      <path d="M15.15 8l1.85-.6-1.15 1.58v-1.96l1.15 1.58Z" fill="#D21034" />
    </svg>
  );
}

const FLAGS = {
  fr: FlagFr,
  es: FlagEs,
  en: FlagEn,
  ar: FlagAr,
  dz: FlagDz,
} as const;

export function Flag({ code, className }: { code: FlagCode; className?: string }) {
  const Component = FLAGS[code];
  return <Component aria-hidden="true" className={className} />;
}
