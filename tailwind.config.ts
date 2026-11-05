import type { Config } from 'tailwindcss';

/**
 * Thème clair ALMERÍAGA : blanc chaud, surfaces blanches, texte anthracite,
 * un accent vif (orange) et une couleur secondaire douce (menthe).
 * Aucun fond noir, aucun mode sombre.
 *
 * Toutes les couleurs passent par des variables CSS (voir app/globals.css) :
 * pour changer la charte, modifiez uniquement les variables --accent* et --mint*.
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: rgb('canvas'),
        surface: rgb('surface'),
        'surface-2': rgb('surface-2'),
        line: rgb('line'),
        ink: rgb('ink'),
        'ink-soft': rgb('ink-soft'),
        'ink-faint': rgb('ink-faint'),
        accent: rgb('accent'),
        'accent-vivid': rgb('accent-vivid'),
        'accent-soft': rgb('accent-soft'),
        'accent-ink': rgb('accent-ink'),
        mint: rgb('mint'),
        'mint-ink': rgb('mint-ink'),
        ok: rgb('ok'),
        warn: rgb('warn'),
        danger: rgb('danger'),
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(34 36 41 / 0.04), 0 12px 28px -20px rgb(34 36 41 / 0.28)',
        lift: '0 2px 6px rgb(34 36 41 / 0.05), 0 22px 44px -26px rgb(34 36 41 / 0.32)',
        accent: '0 18px 38px -22px rgb(205 56 10 / 0.45)',
      },
      borderRadius: { xl2: '1.25rem', xl3: '1.75rem' },
      letterSpacing: { tightish: '-0.02em', display: '-0.035em' },
      transitionTimingFunction: { 'out-soft': 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        'float-y': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' },
        },
        'spin-3d': {
          '0%': { transform: 'rotateX(-18deg) rotateY(0deg)' },
          '100%': { transform: 'rotateX(-18deg) rotateY(360deg)' },
        },
        'rise-in': {
          '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0) scale(1)' },
        },
        'halo-pulse': {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
      },
      animation: {
        'float-y': 'float-y 7s ease-in-out infinite',
        'float-y-slow': 'float-y 11s ease-in-out infinite',
        'spin-3d': 'spin-3d 26s linear infinite',
        'rise-in': 'rise-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
        'halo-pulse': 'halo-pulse 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;

