export const PRODUCT_CATEGORIES = [
  'High-Tech',
  'Beauté & Soins',
  'Café & Épicerie',
  'Parfums',
  'Accessoires',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

/** Ligne de la table Supabase `products`. */
export type Product = {
  id: string;
  title_fr: string;
  title_ar: string;
  category: ProductCategory;
  /** Prix unitaire en Espagne, en euros. */
  price_spain_eur: number;
  /** Estimation livré Algérie, en dinars (DZD). */
  est_landed_dzd: number;
  min_qty: number;
  image_url: string | null;
  in_stock: boolean;
};
