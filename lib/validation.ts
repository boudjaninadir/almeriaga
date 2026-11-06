import type { LeadErrorMessages } from '@/lib/i18n/types';

/**
 * Contrat exact de la table `leads` (handoff Figma 5:39731) :
 * type, product_slug, nom, telephone, wilaya, message, utm_source, utm_campaign.
 * Aucune clé supplémentaire n'est envoyée au webhook.
 */

export const LEAD_TYPES = ['consommateur', 'devis', 'gros', 'revendeur'] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

export const SERVICE_WILAYAS = [
  { code: '31', name: 'Oran' },
  { code: '13', name: 'Tlemcen' },
  { code: '22', name: 'Sidi Bel Abbès' },
] as const;

export type ServiceWilayaCode = (typeof SERVICE_WILAYAS)[number]['code'];

export type LeadFieldName = 'type' | 'product_slug' | 'nom' | 'telephone' | 'wilaya' | 'message' | 'consent' | 'store' | 'volume';
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

export type ValidatedLead = {
  type: LeadType;
  product_slug: string;
  nom: string;
  /** Format international : +213XXXXXXXXX */
  telephone: string;
  /** Code de wilaya desservie (13, 22 ou 31). */
  wilaya: string;
  message: string;
  utm_source: string;
  utm_campaign: string;
};

export type LeadValidationResult = { ok: true; lead: ValidatedLead } | { ok: false; errors: LeadFieldErrors };

export const DEFAULT_LEAD_ERRORS: LeadErrorMessages = {
  name: 'Indiquez votre nom.',
  phone: 'Indiquez un numéro international valide avec son indicatif.',
  wilaya: 'Choisissez votre wilaya.',
  message: 'Indiquez votre besoin.',
  consent: 'Votre accord est nécessaire pour traiter la demande.',
  store: 'Indiquez le nom de votre magasin.',
  volume: 'Précisez le volume envisagé.',
};

const NAME_RE = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} '’.-]*$", 'u');
const LETTER_RE = new RegExp('\\p{L}', 'gu');
const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/g;
const SLUG_RE = /^[a-z0-9-]{0,60}$/;
const DZ_MOBILE_RE = /^(?:\+213|00213|0)([567]\d{8})$/;
const WILAYA_CODES = new Set<string>(SERVICE_WILAYAS.map((w) => w.code));

export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS_RE, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/** Convertit les chiffres arabo-indiens (٠-٩) et persans (۰-۹) en chiffres ASCII. */
export function toAsciiDigits(input: string): string {
  return input
    .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
}

/** Prépare un numéro saisi avec l'indicatif visuel +213 : accepte 550123456, 0550123456 ou +213550123456. */
export function normalizePhoneInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  const compact = toAsciiDigits(input).replace(/[^\d+]/g, '');
  if (/^[567]\d{8}$/.test(compact)) return `0${compact}`;
  return input;
}

export function normalizeDzMobile(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const compact = toAsciiDigits(input).replace(/[^\d+]/g, '');
  const match = DZ_MOBILE_RE.exec(compact);
  return match ? `+213${match[1]}` : null;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on';
}

export function validateLead(raw: unknown, messages: LeadErrorMessages = DEFAULT_LEAD_ERRORS): LeadValidationResult {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const errors: LeadFieldErrors = {};

  const type = LEAD_TYPES.find((value) => value === input.type);
  if (!type) errors.type = 'Type de demande inconnu.';

  const productSlug = cleanText(input.product_slug, 60);
  if (productSlug && !SLUG_RE.test(productSlug)) errors.product_slug = 'Produit inconnu.';

  const nom = cleanText(input.nom, 80);
  const letterCount = (nom.match(LETTER_RE) ?? []).length;
  if (!nom) errors.nom = messages.name;
  else if (letterCount < 2 || !NAME_RE.test(nom)) errors.nom = messages.name;

  const telephone = normalizeDzMobile(input.telephone);
  if (!telephone) errors.telephone = messages.phone;

  const wilaya = cleanText(input.wilaya, 3);
  if (!WILAYA_CODES.has(wilaya)) errors.wilaya = messages.wilaya;

  const message = cleanText(input.message, 1000);
  const messageRequired = type === 'devis' || type === 'gros' || type === 'revendeur';
  if (messageRequired && message.length < 2) errors.message = messages.message;

  if (!toBoolean(input.consent)) errors.consent = messages.consent;

  if (Object.keys(errors).length > 0 || !type || !telephone) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      type,
      product_slug: productSlug,
      nom,
      telephone,
      wilaya,
      message,
      utm_source: cleanText(input.utm_source, 200),
      utm_campaign: cleanText(input.utm_campaign, 200),
    },
  };
}

/** Conservé pour les écrans hérités : nombre maximum d'articles par demande. */
export const MAX_RETAIL_QUANTITY = 10;
