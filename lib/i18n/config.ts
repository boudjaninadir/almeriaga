/**
 * Réglages de l'internationalisation ALMERÍAGA.
 * Module volontairement sans dépendance : il est importé aussi bien par le serveur
 * (layout, sections) que par le navigateur (sélecteur de drapeaux).
 */

export const LOCALES = ['fr', 'ar', 'es', 'en', 'dz'] as const;

export type Locale = (typeof LOCALES)[number];
export type Direction = 'ltr' | 'rtl';
export type FlagCode = 'fr' | 'ar' | 'es' | 'en' | 'dz';

export type LocaleMeta = {
  code: Locale;
  /** Code BCP 47 utilisé pour l'attribut `lang` (et les lecteurs d'écran). */
  htmlLang: string;
  direction: Direction;
  /** Nom affiché dans le sélecteur (dans la langue du site quand c'est possible). */
  label: string;
  /** Nom natif, affiché en second dans le menu. */
  nativeLabel: string;
  flag: FlagCode;
  /** true = mode hybride 90 % français + 10 % arabe (Algérie). */
  hybrid?: boolean;
};

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  fr: { code: 'fr', htmlLang: 'fr', direction: 'ltr', label: 'Français', nativeLabel: 'Français', flag: 'fr' },
  ar: { code: 'ar', htmlLang: 'ar', direction: 'rtl', label: 'Arabe', nativeLabel: 'العربية', flag: 'ar' },
  es: { code: 'es', htmlLang: 'es', direction: 'ltr', label: 'Espagnol', nativeLabel: 'Español', flag: 'es' },
  en: { code: 'en', htmlLang: 'en', direction: 'ltr', label: 'Anglais', nativeLabel: 'English', flag: 'en' },
  dz: {
    code: 'dz',
    htmlLang: 'fr-DZ',
    direction: 'ltr',
    label: 'Algérie',
    nativeLabel: 'الجزائر · FR + AR',
    flag: 'dz',
    hybrid: true,
  },
};

export const DEFAULT_LOCALE: Locale = 'fr';

/** Cookie lu côté serveur : la langue survit aux navigations et au rafraîchissement. */
export const LOCALE_COOKIE = 'almeriaga_locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 an

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

export function localeDirection(locale: Locale): Direction {
  return LOCALE_META[locale].direction;
}

export function localeHtmlLang(locale: Locale): string {
  return LOCALE_META[locale].htmlLang;
}

/** Locales proposées dans le sélecteur, dans l'ordre d'affichage demandé. */
export const LOCALE_ORDER: readonly Locale[] = ['fr', 'ar', 'es', 'en', 'dz'];
