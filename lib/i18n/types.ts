import type { fr } from '@/lib/i18n/dictionaries/fr';

/**
 * Contrat de traduction : dérivé du dictionnaire français.
 * Chaque autre langue est vérifiée avec `satisfies Dictionary`, ce qui provoque
 * une erreur TypeScript dès qu'une clé manque ou est mal orthographiée.
 */
export type Dictionary = typeof fr;

/** Version partielle récursive utilisée par le mode hybride DZ (surcharges uniquement). */
export type DeepOverrides<T> = T extends readonly (infer U)[]
  ? U[]
  : T extends object
    ? { [K in keyof T]?: DeepOverrides<T[K]> }
    : T;

/** Messages d'erreur de validation partagés entre le navigateur et l'API. */
export type LeadErrorMessages = Dictionary['request']['errors'];
