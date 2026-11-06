/**
 * Identité de marque et contacts publics.
 *
 * Toutes les valeurs viennent de variables NEXT_PUBLIC_* : rien n'est codé en dur.
 * Une variable absente reste vide et l'interface masque le canal correspondant :
 * aucun numéro, aucun e-mail, aucun prix n'est inventé.
 *
 * TODO (actions manuelles, voir rapport final) :
 *  - NEXT_PUBLIC_CONTACT_WHATSAPP : numéro international sans "+" (ex. 213XXXXXXXXX).
 *  - NEXT_PUBLIC_CONTACT_EMAIL    : adresse e-mail de contact.
 *  - NEXT_PUBLIC_META_PIXEL_ID    : identifiant numérique du pixel Meta.
 */

const env = (value: string | undefined): string => (value ?? '').trim();

/** Nom de marque affiché partout (logo texte, titres, pied de page). */
export const BRAND_NAME = env(process.env.NEXT_PUBLIC_BRAND_NAME) || 'ALMERÍAGA';

/** Accroche courte de la marque. */
export const BRAND_TAGLINE = 'Micro-importation Espagne → Algérie';

/**
 * Numéro WhatsApp au format international, sans "+" ni espaces (ex. 213XXXXXXXXX).
 * Vide = tous les liens WhatsApp sont masqués.
 */
export const CONTACT_WHATSAPP = env(process.env.NEXT_PUBLIC_CONTACT_WHATSAPP).replace(/\D/g, '');

/** Adresse e-mail de contact. Vide = les liens e-mail sont masqués. */
export const CONTACT_EMAIL = env(process.env.NEXT_PUBLIC_CONTACT_EMAIL);

/**
 * URL publique de production. Sert de base aux balises OpenGraph, au sitemap
 * et aux URL canoniques. Ne jamais mettre localhost ici.
 */
export const SITE_URL = (env(process.env.NEXT_PUBLIC_SITE_URL) || 'https://almeriaga.vercel.app').replace(/\/+$/, '');

/**
 * Slug du produit pilote : première fiche publiée et lien envoyé dans Meta Ads.
 * TODO : le remplacer par le slug réellement publié dans la table products.
 */

/** Marqueur visuel des informations encore manquantes. */
export const TODO_MARK = 'TODO';

/** URL absolue d'un chemin interne ("/catalogue" → "https://…/catalogue"). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Lien WhatsApp pré-rempli, ou null si le numéro n'est pas configuré. */
export function whatsappLink(message: string): string | null {
  if (!CONTACT_WHATSAPP) return null;
  return `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

/** "213660122439" → "+213 660 12 24 39" (affichage). */
export function displayPhone(international: string): string {
  if (!/^213\d{9}$/.test(international)) return international ? `+${international}` : '';
  const n = international.slice(3);
  return `+213 ${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7)}`;
}
