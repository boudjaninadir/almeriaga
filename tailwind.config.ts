import type { Config } from 'tailwindcss';

/**
 * Thème ALMERÍAGA — « Rich Minimalist » (Luxe-Tech), charte claire.
 * Fond blanc cassé (#F7F5EF), accents or (#D4AF37), texte anthracite
 * (#1B1F1D), cartes épurées à liseré doré.
 *
 * Toutes les couleurs sémantiques passent par des variables CSS
 * (voir app/globals.css) : pour changer la charte, modifiez uniquement
 * les variables --canvas / --surface / --line / --ink* / --accent* / --mint*.
 *
 * La palette explicite (`offwhite`, `gold`, `cream`) permet d'écrire directement
 * les valeurs de la charte validée, et les alias hérités (`brand`, `dark-block`)
 * maintiennent les composants historiques dans la même identité visuelle.
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

/** Blanc cassé — fonds principaux et sections (ex-fond vert émeraude). */
const BLANC_CASSE = '#F7F5EF';
/** Or / jaune luxe — bordures fines, filets, accents décoratifs. */
const GOLD = '#D4AF37';
/** Or discret — texte doré lisible sur blanc cassé (contraste AA). */
const GOLD_INK = '#8A6D1F';

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

        /* ── Charte validée : valeurs explicites ── */
        offwhite: {
          DEFAULT: BLANC_CASSE,
          deep: '#EDE9DF',
          soft: '#FCFBF7',
          mute: '#F1EDE3',
        },
        gold: {
          DEFAULT: GOLD,
          light: '#F3D77A',
          deep: GOLD_INK,
        },
        cream: {
          DEFAULT: '#F7F5EF',
          soft: '#E6E0D2',
          mute: '#B0A790',
        },

        /* ── Alias hérités (composants historiques) : même identité ── */
        brand: {
          DEFAULT: GOLD,
          soft: '#F1EDE3',
          strong: BLANC_CASSE,
        },
        'dark-block': '#FCFBF7',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(27 31 29 / 0.08), 0 14px 30px -22px rgb(27 31 29 / 0.3)',
        lift: '0 2px 6px rgb(27 31 29 / 0.1), 0 26px 50px -28px rgb(27 31 29 / 0.38)',
        accent: '0 18px 38px -20px rgb(212 175 55 / 0.35)',
        gold: '0 0 0 1px rgb(212 175 55 / 0.28), 0 20px 45px -30px rgb(212 175 55 / 0.45)',
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

