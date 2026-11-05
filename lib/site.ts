/**
 * Identité du site, contact, mentions légales et réglages communs.
 * Les valeurs viennent de .env.local (préfixe NEXT_PUBLIC_ : elles sont affichées publiquement).
 */

const env = (value: string | undefined, fallback = ''): string => (value && value.trim() ? value.trim() : fallback);

export const SITE = {
  name: 'ALMERÍAGA',
  tagline: 'Global sourcing & micro-importation',
  url: env(process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'),
  locale: 'fr_DZ',
  title: 'PS5 Slim 1 To + GTA VI, paiement à la livraison',
  description:
    'PS5 Slim 1 To neuve avec GTA VI. Réservez en ligne, confirmation par téléphone, paiement à la livraison dans votre wilaya.',
} as const;

export const CONTACT = {
  /** Format international sans + ni espaces, ex : 213660122439 */
  whatsappNumber: env(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, ''),
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, 'hello@almeriaga.com'),
  emails: {
    hello: env(process.env.NEXT_PUBLIC_EMAIL_HELLO, 'hello@almeriaga.com'),
    commandes: env(process.env.NEXT_PUBLIC_EMAIL_COMMANDES, 'commandes@almeriaga.com'),
    gros: env(process.env.NEXT_PUBLIC_EMAIL_GROS, 'gros@almeriaga.com'),
    fournisseurs: env(process.env.NEXT_PUBLIC_EMAIL_FOURNISSEURS, 'fournisseurs@almeriaga.com'),
    support: env(process.env.NEXT_PUBLIC_EMAIL_SUPPORT, 'support@almeriaga.com'),
  },
} as const;

/**
 * Identité du vendeur affichée en bas de page et dans les mentions légales.
 * Faites valider la liste exacte des mentions obligatoires (loi 18-05 sur le commerce électronique).
 */
export const LEGAL = {
  sellerName: env(process.env.NEXT_PUBLIC_SELLER_NAME, 'Nadir Boudjani'),
  anae: env(process.env.NEXT_PUBLIC_SELLER_ANAE, 'ANAE-00000000'),
  nif: env(process.env.NEXT_PUBLIC_SELLER_NIF, '000000000000000'),
  city: env(process.env.NEXT_PUBLIC_SELLER_CITY, 'Alger'),
} as const;

/** Quantité maximale par demande de particulier. */
export const MAX_RETAIL_QUANTITY = 10;

/** Codes de wilaya (ex : '37') que votre transporteur ne dessert pas : affichés grisés. */
export const UNAVAILABLE_WILAYA_CODES: readonly string[] = [];

/** Tranches de volume pour les revendeurs. */
export const WHOLESALE_VOLUMES = [
  { value: '5-9', label: '5 à 9 consoles' },
  { value: '10-24', label: '10 à 24 consoles' },
  { value: '25-49', label: '25 à 49 consoles' },
  { value: '50+', label: '50 consoles ou plus' },
] as const;

export function whatsappLink(message: string): string | null {
  if (!CONTACT.whatsappNumber) return null;
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** "213660122439" -> "+213 660 12 24 39" (affichage). */
export function displayPhone(international: string): string {
  if (!/^213\d{9}$/.test(international)) return international ? `+${international}` : '';
  const n = international.slice(3);
  return `+213 ${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
}
