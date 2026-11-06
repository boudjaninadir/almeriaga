import type { Dictionary, DeepOverrides } from '@/lib/i18n/types';

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Fusionne une base complète avec des surcharges partielles.
 * Les tableaux sont REMPLACÉS (jamais fusionnés index par index) pour éviter
 * qu'une traduction hybride ne mélange deux langues dans une même liste.
 */
function mergeValue(base: unknown, override: unknown): unknown {
  if (override === undefined) return base;
  if (Array.isArray(override)) return override;
  if (isPlainObject(base) && isPlainObject(override)) {
    const result: Record<string, unknown> = { ...base };
    for (const key of Object.keys(override)) {
      result[key] = mergeValue(base[key], override[key]);
    }
    return result;
  }
  return override;
}

export function mergeDictionary(base: Dictionary, overrides: DeepOverrides<Dictionary>): Dictionary {
  return mergeValue(base, overrides) as Dictionary;
}
