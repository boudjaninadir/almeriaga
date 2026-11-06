import {
  BRAND_NAME,
  BRAND_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  PILOT_PRODUCT_SLUG,
  SITE_URL,
  TODO_MARK,
  absoluteUrl,
  displayPhone,
  whatsappLink,
} from '@/lib/site-config';

/**
 * Compatibilité : anciens imports (`SITE`, `CONTACT`) toujours valables.
 * Aucune donnée personnelle ici : le nom du vendeur, le NIF, le numéro ANAE et
 * le RIB ne doivent jamais être codés en dur ni affichés publiquement.
 */
export const SITE = {
  name: BRAND_NAME,
  tagline: BRAND_TAGLINE,
  url: SITE_URL,
  locale: 'fr_DZ',
  title: 'Micro-importation Espagne → Algérie',
  description:
    'Produits sélectionnés en Espagne, livrés à Oran, Tlemcen et Sidi Bel Abbès. Commande sans paiement en ligne, confirmation par téléphone.',
} as const;

export const CONTACT = {
  whatsappNumber: CONTACT_WHATSAPP,
  email: CONTACT_EMAIL,
} as const;

/**
 * @deprecated Constantes conservées uniquement pour les composants hérités non routés
 * (voir la liste des fichiers à supprimer dans PLAN.md). Aucune page publique du nouveau
 * parcours ne les utilise : les volumes sont désormais gérés par lib/validation.ts.
 */
export const MAX_RETAIL_QUANTITY = 10;

/** @deprecated Voir ci-dessus. */
export const UNAVAILABLE_WILAYA_CODES: readonly string[] = [];

/** @deprecated Voir ci-dessus. */
export const WHOLESALE_VOLUMES = [
  { value: '5-9', label: '5 à 9 unités' },
  { value: '10-24', label: '10 à 24 unités' },
  { value: '25-49', label: '25 à 49 unités' },
  { value: '50+', label: '50 unités et plus' },
] as const;


export {
  BRAND_NAME,
  BRAND_TAGLINE,
  CONTACT_EMAIL,
  CONTACT_WHATSAPP,
  PILOT_PRODUCT_SLUG,
  SITE_URL,
  TODO_MARK,
  absoluteUrl,
  displayPhone,
  whatsappLink,
};

