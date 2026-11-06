/**
 * Table Supabase `products`.
 * Un prix absent (null) n'est jamais remplacé par une valeur inventée :
 * la fiche affiche « Sur devis ».
 */

export const PRODUCT_STATUSES = ['disponible', 'sur_commande'] as const;

export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export type Product = {
  id: string;
  /** Alimente l'URL de la fiche : /produit/[slug] et /sur-commande/[slug]. */
  slug: string;
  name: string;
  description: string;
  category: string;
  /** Prix public en dinars. null = sur devis. */
  price_dzd: number | null;
  status: ProductStatus;
  /** URL des photos. Tableau vide = visuel de remplacement (aucune URL inventée). */
  images: string[];
  /** Lecture publique uniquement si vrai. */
  is_published: boolean;
  created_at: string;
};

/** Catégories autorisées par la matrice légale (micro-importation). */
export const PRODUCT_CATEGORIES = [
  'Beauté & soins',
  'Maquillage',
  'Électroménager compact',
  'Café',
  'Audio & charge',
  'Montres & bijoux',
  'Jouets',
] as const;

