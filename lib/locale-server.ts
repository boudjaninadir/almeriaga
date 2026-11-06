import { headers } from 'next/headers';
import { LOCALES, type Locale } from '@/lib/i18n';

/** Locale courante (header x-locale posé par le middleware, spec V4 §6). */
export function currentLocale(): Locale {
  const value = headers().get('x-locale') ?? 'fr';
  return (LOCALES as readonly string[]).includes(value) ? (value as Locale) : 'fr';
}
