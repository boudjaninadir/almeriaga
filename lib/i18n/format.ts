/**
 * Utilitaires de texte partagés (serveur + navigateur).
 * Aucune dépendance React : ce module reste testable avec `node:test`.
 */

/** Remplace `{clé}` par la valeur fournie. Les clés absentes restent visibles (facilite les tests). */
export function interpolate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match,
  );
}

/** Nettoie un fragment de texte traduit (espaces multiples, ponctuation en tête). */
export function tidy(text: string): string {
  return text.replace(/\s{2,}/g, ' ').replace(/\s+([,.;:!?،؛])/g, '$1').trim();
}
