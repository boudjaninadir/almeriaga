import type { Config } from 'tailwindcss';

/**
 * Thème ALMERÍAGA — identité Figma « papier & encre ».
 * Toutes les couleurs passent par des variables CSS (app/globals.css).
 * Papier #FAF8F4, encre #141414, pierre #8A8680, craie #E7E4DE, accent #E88923.
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: rgb('paper'),
        canvas: rgb('canvas'),
        surface: rgb('surface'),
        'surface-2': rgb('surface-2'),
        chalk: rgb('chalk'),
        line: rgb('line'),
        ink: rgb('ink'),
        'ink-soft': rgb('ink-soft'),
        'ink-faint': rgb('ink-faint'),
        stone: rgb('stone'),
        accent: rgb('accent'),
        'accent-soft': rgb('accent-soft'),
        danger: rgb('danger'),
        ok: rgb('ok'),
        warn: rgb('warn'),
        brand: rgb('brand'),
        'brand-strong': rgb('brand-strong'),
        'brand-soft': rgb('brand-soft'),
        'brand-ring': rgb('brand-ring'),
        gold: rgb('gold'),
        'gold-light': rgb('gold-light'),
        'gold-ink': rgb('gold-ink'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['var(--font-manrope)', 'var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-arabic)'],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        xl2: '2px',
        '2xl': '2px',
        '3xl': '2px',
        full: '9999px',
      },
      boxShadow: {
        soft: 'none',
        lift: 'none',
      },
      letterSpacing: { tightish: '-0.02em' },
    },
  },
  plugins: [],
};

export default config;
