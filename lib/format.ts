/**
 * Formatage déterministe (identique sur le serveur et dans le navigateur).
 * On évite Intl.NumberFormat : le séparateur de milliers diffère selon les moteurs,
 * ce qui provoque des erreurs d'hydratation React.
 */

const NBSP = ' ';

export function formatNumber(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return '—';
  const fixed = Math.abs(value).toFixed(decimals);
  const [int = '0', dec] = fixed.split('.');
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  const sign = value < 0 && Number(fixed) !== 0 ? '-' : '';
  return `${sign}${grouped}${dec ? `,${dec}` : ''}`;
}

export const formatDzd = (amount: number): string => `${formatNumber(Math.round(amount))}${NBSP}DA`;
/**
 * Les conversions euro et pourcentage vivent dans lib/format-private.ts :
 * le symbole « € » ne doit jamais apparaître dans un rendu public.
 */


/** Lit "151,67" ou "151.67" ou "1 800 000". Retourne 0 si illisible. */
export function parseNumber(input: string): number {
  const cleaned = input.replace(/[\s  ]/g, '').replace(',', '.');
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return 0;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** "0550123456" -> "05•• •• •• 56" (confirmation à l'écran, sans exposer le numéro). */
export function maskNationalPhone(national: string): string {
  const digits = national.replace(/\D/g, '');
  if (digits.length !== 10) return '••••••••••';
  return `${digits.slice(0, 2)}•• •• •• ${digits.slice(8)}`;
}
