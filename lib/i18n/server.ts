import 'server-only';

import { cookies } from 'next/headers';
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  localeDirection,
  localeHtmlLang,
} from '@/lib/i18n/config';
import type { Direction, Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/index';
import type { Dictionary } from '@/lib/i18n/types';

/**
 * Langue active lue dans le cookie. Le serveur rend ainsi le HTML dans la bonne
 * langue (SEO + pas de clignotement), et le sélecteur n'a plus qu'à poser le cookie.
 */
export function getLocale(): Locale {
  const value = cookies().get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function getLocaleContext(): {
  locale: Locale;
  dict: Dictionary;
  dir: Direction;
  htmlLang: string;
} {
  const locale = getLocale();
  return {
    locale,
    dict: getDictionary(locale),
    dir: localeDirection(locale),
    htmlLang: localeHtmlLang(locale),
  };
}
