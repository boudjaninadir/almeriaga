import { findWilaya } from '@/lib/wilayas';

/**
 * Validation partagée entre le formulaire (navigateur) et l'API (serveur).
 * Le serveur revalide TOUJOURS : ne jamais faire confiance au navigateur.
 * Aucune dépendance externe.
 */

export const LEAD_TYPES = ['consommateur', 'devis', 'revendeur', 'gros', 'gros_price', 'abonnement'] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Types de demandes des professionnels : la société et le volume sont obligatoires. */
const BUSINESS_TYPES: readonly LeadType[] = ['gros', 'revendeur'];

/** Types sans wilaya obligatoire (spec V4 : Nom, Prénom, Téléphone suffisent). */
const NO_WILAYA_TYPES: readonly LeadType[] = ['abonnement', 'gros_price'];

/** Mobile algérien : préfixe 0, +213 ou 00213, puis 5/6/7 et 8 chiffres. */
export const DZ_PHONE_PATTERN = '^(0|\\+213|00213)[567]\\d{8}$';
const DZ_PHONE_RE = new RegExp(DZ_PHONE_PATTERN);

/** Tranches de volume proposées aux professionnels. */
export const VOLUME_RANGES = ['1 à 9 unités', '10 à 49 unités', '50 à 199 unités', '200 unités et plus'] as const;

export type LeadFieldName =
  | 'type'
  | 'name'
  | 'prenom'
  | 'phone'
  | 'wilaya'
  | 'business_name'
  | 'volume'
  | 'message'
  | 'product_slug'
  | 'consent'
  // Clés conservées uniquement pour les composants hérités non routés (voir PLAN.md) :
  // validateLead ne les produit jamais.
  | 'kind'
  | 'quantity'
  | 'shop';


export type LeadFieldErrors = Partial<Record<LeadFieldName, string>>;

/** Données nettoyées, prêtes pour l'insertion dans la table `leads`. */
export type LeadPayload = {
  type: LeadType;
  product_slug: string;
  name: string;
  /** Prénom (types gros_price / abonnement, spec V4 §3-§5). */
  prenom: string;
  /** Format international : +213XXXXXXXXX */
  phone: string;
  wilaya: string;
  business_name: string;
  volume: string;
  message: string;
  utm_source: string;
  utm_campaign: string;
};

export type LeadValidationResult = { ok: true; lead: LeadPayload } | { ok: false; errors: LeadFieldErrors };

export const ATTRIBUTION_KEYS = ['utm_source', 'utm_campaign'] as const;

const NAME_RE = new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M} '’.-]*$", 'u');
const LETTER_RE = new RegExp('\\p{L}', 'gu');
const FORMULA_START_RE = /^[=+\-@\t\r]/;
const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const CONTROL_CHARS_RE = /[\u0000-\u001F\u007F]/g;

export function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') return '';
  return value
    .replace(CONTROL_CHARS_RE, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/**
 * Normalise un numéro saisi ("0550 12 34 56", "+213 661 23 45 67", "00213770123456")
 * et retourne sa forme internationale +213XXXXXXXXX, ou null si invalide.
 */
export function normalizeDzPhone(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  const compact = input.replace(/[\s.\-()]/g, '');
  if (!DZ_PHONE_RE.test(compact)) return null;
  const national = compact.replace(/^(\+213|00213|0)/, '');
  return `+213${national}`;
}

/**
 * @deprecated Ancien nom, conservé pour les composants hérités non routés
 * (liste des fichiers à supprimer dans PLAN.md).
 */
export const normalizeDzMobile = normalizeDzPhone;

/** @deprecated Anciens types de demandes, remplacés par `LeadType`. */
export type LeadKind = 'retail' | 'wholesale' | 'waitlist';

/** @deprecated Voir `LeadKind`. */
export const LEAD_KINDS: readonly LeadKind[] = ['retail', 'wholesale', 'waitlist'];


function isLeadType(value: unknown): value is LeadType {
  return typeof value === 'string' && (LEAD_TYPES as readonly string[]).includes(value);
}

export function validateLead(raw: unknown): LeadValidationResult {
  const input = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const errors: LeadFieldErrors = {};

  const type = isLeadType(input.type) ? input.type : null;
  if (!type) errors.type = 'Type de demande inconnu.';

  const name = cleanText(input.name, 80);
  const letterCount = (name.match(LETTER_RE) ?? []).length;
  if (!name) {
    errors.name = 'Indiquez votre nom.';
  } else if (letterCount < 2 || !NAME_RE.test(name)) {
    errors.name = 'Entrez un nom valide (lettres uniquement).';
  }

  const phone = normalizeDzPhone(input.phone);
  if (!phone) errors.phone = 'Entrez un numéro mobile algérien valide (ex : 0550 12 34 56).';

  const wilayaCode = cleanText(input.wilaya, 2);
  const wilaya = findWilaya(wilayaCode);
  const typeKnown = type !== null && NO_WILAYA_TYPES.includes(type);
  if (!wilaya && !typeKnown) errors.wilaya = 'Choisissez votre wilaya.';

  const prenom = cleanText(input.prenom, 60);
  if ((type === 'abonnement' || type === 'gros_price') && prenom.length < 2) {
    errors.prenom = 'Indiquez votre prénom.';
  }

  const productSlug = cleanText(input.product_slug, 80).toLowerCase();
  if (productSlug && !SLUG_RE.test(productSlug)) errors.product_slug = 'Référence produit invalide.';

  const isBusiness = type !== null && BUSINESS_TYPES.includes(type);

  let businessName = '';
  if (isBusiness) {
    businessName = cleanText(input.business_name, 120);
    if (businessName.length < 2) errors.business_name = 'Indiquez le nom de la société ou du magasin.';
    else if (FORMULA_START_RE.test(businessName)) errors.business_name = 'Nom invalide.';
  }

  let volume = '';
  if (isBusiness) {
    const candidate = cleanText(input.volume, 40);
    if ((VOLUME_RANGES as readonly string[]).includes(candidate)) volume = candidate;
    else errors.volume = 'Choisissez un volume estimé.';
  }

  let message = cleanText(input.message, 1000);
  if (type === 'revendeur' && message.length < 2) {
    errors.message = 'Précisez votre type de commerce.';
  }

  const consent = input.consent === true || input.consent === 'true' || input.consent === 'on';
  if (!consent) errors.consent = 'Votre accord est nécessaire pour être rappelé(e).';

  if (!type || Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      type,
      product_slug: productSlug,
      name,
      prenom,
      phone: phone as string,
      wilaya: wilaya ? `${wilaya.code} – ${wilaya.name}` : '',
      business_name: businessName,
      volume,
      message: isBusiness ? message : message.slice(0, 1000),
      utm_source: cleanText(input.utm_source, 100),
      utm_campaign: cleanText(input.utm_campaign, 100),
    },
  };
}


/* Ancienne validation (retail / wholesale / waitlist) supprimée :
   elle est remplacée par la validation par `type` ci-dessus. */


/* Constantes de l'ancienne validation supprimées. */


/* Ancienne fonction validateLead (kind) supprimée. */

