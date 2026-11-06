import type { Product } from '@/types/product';

/**
 * Données de secours : affichées tant que Supabase n'est pas configuré.
 * Tarifs INDICATIFS à confirmer lors de l'appel. Aucune disponibilité n'est garantie.
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'lisseur-pro-exemple',
    title_fr: 'Lisseur cheveux professionnel (exemple)',
    title_ar: 'مقوّم شعر احترافي (مثال)',
    category: 'Beauté & Soins',
    price_spain_eur: 32,
    est_landed_dzd: 9500,
    min_qty: 5,
    image_url: null,
    in_stock: false,
  },
  {
    id: 'capsules-cafe-exemple',
    title_fr: 'Capsules de café compatibles (exemple)',
    title_ar: 'كبسولات قهوة متوافقة (مثال)',
    category: 'Café & Épicerie',
    price_spain_eur: 4.5,
    est_landed_dzd: 1600,
    min_qty: 10,
    image_url: null,
    in_stock: false,
  },
  {
    id: 'chocolat-espagnol-exemple',
    title_fr: 'Chocolat noir espagnol (exemple)',
    title_ar: 'شوكولاتة داكنة إسبانية (مثال)',
    category: 'Café & Épicerie',
    price_spain_eur: 3,
    est_landed_dzd: 1100,
    min_qty: 12,
    image_url: null,
    in_stock: false,
  },
  {
    id: 'parfum-eau-de-toilette-exemple',
    title_fr: 'Eau de toilette 100 ml (exemple)',
    title_ar: 'ماء تواليت 100 مل (مثال)',
    category: 'Parfums',
    price_spain_eur: 28,
    est_landed_dzd: 8200,
    min_qty: 3,
    image_url: null,
    in_stock: false,
  },
  {
    id: 'ecouteurs-bluetooth-exemple',
    title_fr: 'Écouteurs sans fil (exemple)',
    title_ar: 'سماعات لاسلكية (مثال)',
    category: 'High-Tech',
    price_spain_eur: 18,
    est_landed_dzd: 5600,
    min_qty: 5,
    image_url: null,
    in_stock: false,
  },
  {
    id: 'sac-accessoire-exemple',
    title_fr: 'Sac de transport (exemple)',
    title_ar: 'حقيبة نقل (مثال)',
    category: 'Accessoires',
    price_spain_eur: 12,
    est_landed_dzd: 3900,
    min_qty: 5,
    image_url: null,
    in_stock: false,
  },
];
