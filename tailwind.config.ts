import type { Config } from 'tailwindcss';

/**
 * Toutes les couleurs passent par des variables CSS (voir app/globals.css).
 * Marque : vert profond + or, repris des cartes de visite ALMERÍAGA.
 * Pour changer la marque, modifiez uniquement les variables --brand* et --gold* dans globals.css.
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
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
        brand: rgb('brand'),
        'brand-strong': rgb('brand-strong'),
        'brand-soft': rgb('brand-soft'),
        'brand-ring': rgb('brand-ring'),
        gold: rgb('gold'),
        'gold-light': rgb('gold-light'),
        'gold-ink': rgb('gold-ink'),
        danger: rgb('danger'),
        ok: rgb('ok'),
        warn: rgb('warn'),
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgb(30 41 59 / 0.05), 0 8px 24px -12px rgb(30 41 59 / 0.12)',
        lift: '0 2px 4px rgb(30 41 59 / 0.05), 0 18px 44px -18px rgb(15 81 50 / 0.35)',
      },
      borderRadius: { xl2: '1.25rem' },
      letterSpacing: { tightish: '-0.02em' },
    },
  },
  plugins: [],
};

export default config;
