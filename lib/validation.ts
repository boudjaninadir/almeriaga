import { MAX_RETAIL_QUANTITY, UNAVAILABLE_WILAYA_CODES, WHOLESALE_VOLUMES } from '@/lib/site';
import { findWilaya } from '@/lib/wilayas';

/**
 * Validation partagée client + serveur (aucune dépendance externe).
 * Le serveur revalide TOUJOURS : ne faites jamais confiance au navigateur.
 */

export type LeadKind = 'retail' | 'wholesale' | 'waitlist';
export const LEAD_KINDS: readonly LeadKind[] = ['retail', 'wholesale', 'waitlist'];

export type LeadFieldName = 'kind' | 'name' | 'phone' | 'wilaya' | 'quantity' | 'volume' | 'shop' | 'consent';
export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

export type Attribution = Partial<
  Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content' | 'utm_term' | 'fbclid' | 'ttclid', string>
>;

export const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'ttclid'] as const;

export type ValidatedLead = {
  kind: LeadKind;
  product: string;
  name: string;
  /** Format international : +213XXXXXXXXX */
  phone: string;
  wilayaCode: string;
  wilayaName: string;
  /** Détail uniquement. */
  quantity: number | null;
  /** Gros uniquement : '5-9' | '10-24' | '25-49' | '50+'. */
  volume: string;
  /** Gros uniquement : nom de la boutique (facultatif). */
  shop: string;
  eventId: string | null;
  attribution: Attribution;
};

export type LeadValidationResult = { ok: true; lead: ValidatedLead } | { ok: false; errors: LeadFieldErrors };

// Construits via RegExp() pour ne pas dépendre de la cible de compilation (\p{L} exige 'u').
const NAME_RE = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} '’.-]*$", 'u');
const LETTER_RE = new RegExp('\\p{L}', 'gu');
const LETTER_OR_DIGIT_RE = new RegExp('[\\p{L}\\p{N}]', 'u');
const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/g;
const EVENT_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;
const FORMULA_START_RE = /^[=+\-@\t\r]/;
// +213 / 00213 / 0 suivi d'un mobile algérien : 5 (Ooredoo), 6 (Mobilis), 7 (Djezzy) + 8 chiffres.
const DZ_MOBILE_RE = /^(?:\+213|00213|0)([567]\d{8})$/;

export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(CONTROL_CHARS_RE, '').replace(/\s+/g, ' ').trim().slice(0, maxLength);
}

/** Retourne le numéro au format +213XXXXXXXXX, ou null s'il n'est pas un mobile algérien valide. */
export function normalizeDzMobile(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const compact = input.replace(/[\s.\-()]/g, '');
  const match = DZ_MOBILE_RE.exec(compact);
  return match ? `+213${match[1]}` : null;
}

function toBoolean(value: unknown): boolean {
  return value === true || value === 'true' || value === 'on';
}

export function validateLead(raw: unknown): LeadValidationResult {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const errors: LeadFieldErrors = {};

  const kind = LEAD_KINDS.find((k) => k === input.kind);
  if (!kind) errors.kind = 'Formulaire inconnu.';

  // Nom : lettres (latines ou arabes), espaces, apostrophes, points, tirets. Doit commencer par une lettre
  // (bloque aussi les débuts "=", "+", "-", "@" utilisés pour l'injection de formules dans un tableur).
  const name = cleanText(input.name, 80);
  const letterCount = (name.match(LETTER_RE) ?? []).length;
  if (!name) errors.name = 'Indiquez votre nom.';
  else if (letterCount < 2 || !NAME_RE.test(name)) errors.name = 'Entrez un nom valide (lettres uniquement).';

  const phone = normalizeDzMobile(input.phone);
  if (!phone) errors.phone = 'Entrez un numéro mobile algérien valide (ex : 0550 12 34 56).';

  // Wilaya : obligatoire pour une livraison (détail) ou une zone (gros) ; facultative pour la liste d'attente.
  const wilayaCode = cleanText(input.wilaya, 3);
  const wilaya = findWilaya(wilayaCode);
  if (!wilaya) {
    if (kind !== 'waitlist' || wilayaCode) errors.wilaya = 'Choisissez votre wilaya.';
  } else if (UNAVAILABLE_WILAYA_CODES.includes(wilaya.code)) {
    errors.wilaya = 'Cette wilaya n’est pas desservie pour le moment.';
  }

  let quantity: number | null = null;
  if (kind === 'retail') {
    const q = typeof input.quantity === 'string' ? input.quantity.trim() : input.quantity;
    const parsed = typeof q === 'number' ? q : /^\d{1,2}$/.test(String(q)) ? Number(q) : NaN;
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > MAX_RETAIL_QUANTITY) {
      errors.quantity = `Choisissez une quantité entre 1 et ${MAX_RETAIL_QUANTITY}.`;
    } else {
      quantity = parsed;
    }
  }

  let volume = '';
  if (kind === 'wholesale') {
    const v = cleanText(input.volume, 10);
    if (WHOLESALE_VOLUMES.some((option) => option.value === v)) volume = v;
    else errors.volume = 'Choisissez un volume.';
  }

  let shop = '';
  if (kind === 'wholesale') {
    shop = cleanText(input.shop, 80);
    if (shop && (FORMULA_START_RE.test(shop) || !LETTER_OR_DIGIT_RE.test(shop))) {
      errors.shop = 'Entrez un nom de boutique valide.';
    }
  }

  if (!toBoolean(input.consent)) errors.consent = 'Votre accord est nécessaire pour être rappelé(e).';

  if (Object.keys(errors).length > 0 || !kind || !phone) return { ok: false, errors };

  const eventIdRaw = cleanText(input.eventId, 64);
  const attributionInput =
    typeof input.attribution === 'object' && input.attribution !== null ? (input.attribution as Record<string, unknown>) : {};
  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = cleanText(attributionInput[key], 200);
    if (value) attribution[key] = value;
  }

  const product = cleanText(input.product, 60);

  return {
    ok: true,
    lead: {
      kind,
      product,
      name,
      phone,
      wilayaCode: wilaya?.code ?? '',
      wilayaName: wilaya?.name ?? '',
      quantity,
      volume,
      shop,
      eventId: EVENT_ID_RE.test(eventIdRaw) ? eventIdRaw : null,
      attribution,
    },
  };
}
