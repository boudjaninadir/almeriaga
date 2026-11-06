import { ar } from '@/lib/i18n/dictionaries/ar';
import { dz } from '@/lib/i18n/dictionaries/dz';
import { en } from '@/lib/i18n/dictionaries/en';
import { es } from '@/lib/i18n/dictionaries/es';
import { fr } from '@/lib/i18n/dictionaries/fr';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/types';

/** Tous les dictionnaires, résolus une seule fois. */
export const DICTIONARIES: Record<Locale, Dictionary> = { fr, ar, es, en, dz };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale] ?? fr;
}

export { fr, ar, es, en, dz };
export type { Dictionary };
