import { formatNumber } from '@/lib/format';

/**
 * Formatage réservé aux MODULES PRIVÉS (/simulateur, /admin/suivi).
 * Aucun composant public ne doit importer ce fichier : les prix publics sont en DZD
 * (lib/format.ts → formatDzd).
 */

const NBSP = '\u00A0';

export const formatEur = (amount: number, decimals = 0): string => `${formatNumber(amount, decimals)}${NBSP}€`;

export const formatPct = (value: number, decimals = 1): string => `${formatNumber(value, decimals)}${NBSP}%`;
