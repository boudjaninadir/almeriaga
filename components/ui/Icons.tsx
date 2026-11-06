import type { SVGProps } from 'react';

/** Icônes en trait, 24×24, héritent de la couleur du texte (currentColor). */
const PATHS = {
  check: <path d="M5 13l4 4L19 7" />,
  shield: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />,
  box: (
    <>
      <path d="M3 7.5L12 3l9 4.5v9L12 21l-9-4.5v-9z" />
      <path d="M3 7.5l9 4.5 9-4.5M12 12v9" />
    </>
  ),
  gamepad: (
    <>
      <path d="M7 8h10a4 4 0 014 4v2a3 3 0 01-5.2 2L14 14h-4l-1.8 2A3 3 0 013 14v-2a4 4 0 014-4z" />
      <path d="M8 10.5v3M6.5 12h3" />
    </>
  ),
  disc: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  console: (
    <>
      <rect x="9" y="3" width="6" height="18" rx="3" />
      <path d="M12 7v3" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.5a3 3 0 010 5.5M18 14.5c1.8.8 3 2.6 3 5.5" />
    </>
  ),
  book: (
    <>
      <path d="M5 4h10a3 3 0 013 3v13H8a3 3 0 01-3-3V4z" />
      <path d="M5 17a3 3 0 013-3h10" />
    </>
  ),
  store: (
    <>
      <path d="M4 9l1.5-5h13L20 9" />
      <path d="M4 9a2.5 2.5 0 005 0 2.5 2.5 0 005 0 2.5 2.5 0 005 0" />
      <path d="M5 12v8h14v-8M10 20v-5h4v5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </>
  ),
  headset: (
    <>
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
    </>
  ),
  glasses: (
    <>
      <circle cx="7" cy="14" r="4" />
      <circle cx="17" cy="14" r="4" />
      <path d="M11 14h2M3 12l2-4h14l2 4" />
    </>
  ),
  pc: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 10v5M12 18h.01" />
    </>
  ),
  arrow: (
    <>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4.5 19.5l1.2-3.4a7.5 7.5 0 1112.6 1.2 7.5 7.5 0 01-10.4 1.9z" />
      <path d="M9.2 9.1c.3 1.7 2 3.4 3.7 3.7l1-1 1.7.8c-.2 1.2-1.2 1.9-2.4 1.7-2.8-.5-5-2.7-5.5-5.5-.2-1.2.5-2.2 1.7-2.4l.8 1.7z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6 8.5-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  tag: (
    <>
      <path d="M4 11V5a1 1 0 011-1h6l9 9-7 7-9-9z" />
      <path d="M8.5 8.5h.01" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3z" />
      <path d="M4 12l8 4.5 8-4.5" />
      <path d="M4 16.5L12 21l8-4.5" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M8.5 18h5a3 3 0 003-3V8.5" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V6M17 20v-9" />
    </>
  ),
  star: <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.7l5.9-.8z" />,
} as const;


export type IconName = keyof typeof PATHS;

export function Icon({ name, className, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className ?? 'h-5 w-5'}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
