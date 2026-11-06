import { MOCK_PRODUCTS } from '@/lib/mock-products';
import { PRODUCT_CATEGORIES } from '@/types/product';
import type { Product, ProductCategory } from '@/types/product';

/**
 * Accès Supabase via l'API REST (aucune dépendance npm).
 * Variables : NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY (lecture seule, RLS activé).
 * Sans ces variables, ou si l'appel échoue, les données de secours sont renvoyées.
 */
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim().replace(/\/$/, '');
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();

function isProductRow(row: unknown): row is Product {
  if (typeof row !== 'object' || row === null) return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.title_fr === 'string' &&
    typeof r.title_ar === 'string' &&
    PRODUCT_CATEGORIES.includes(r.category as ProductCategory) &&
    typeof r.price_spain_eur === 'number' &&
    typeof r.est_landed_dzd === 'number' &&
    typeof r.min_qty === 'number' &&
    (r.image_url === null || typeof r.image_url === 'string') &&
    typeof r.in_stock === 'boolean'
  );
}

export async function getProducts(): Promise<{ products: Product[]; source: 'supabase' | 'mock' }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return { products: MOCK_PRODUCTS, source: 'mock' };
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/products?select=id,title_fr,title_ar,category,price_spain_eur,est_landed_dzd,min_qty,image_url,in_stock`,
      {
        headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        next: { revalidate: 300 },
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Réponse inattendue');
    const products = rows.filter(isProductRow);
    if (products.length === 0) return { products: MOCK_PRODUCTS, source: 'mock' };
    return { products, source: 'supabase' };
  } catch (error) {
    console.error('[supabase] lecture impossible, données de secours utilisées:', error instanceof Error ? error.message : 'erreur');
    return { products: MOCK_PRODUCTS, source: 'mock' };
  }
}
