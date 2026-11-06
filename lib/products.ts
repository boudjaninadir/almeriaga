import { FALLBACK_ALL, FALLBACK_PRODUCTS } from '@/lib/product-fallback';
import { PRODUCT_STATUSES } from '@/types/product';
import type { Product, ProductStatus } from '@/types/product';

/**
 * Lecture publique du catalogue via l'API REST Supabase.
 * Aucune dépendance npm, aucune clé privilégiée : la clé anonyme ne peut lire
 * que les lignes `is_published = true` (politique RLS fournie dans
 * lib/supabase-sql-products.sql).
 *
 * Sans variables d'environnement, ou en cas d'erreur réseau, on retombe sur les
 * données de démonstration marquées TODO.
 */

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim().replace(/\/$/, '');
const SUPABASE_ANON_KEY = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim();
const COLUMNS = 'id,slug,name,description,category,price_dzd,status,images,is_published,created_at';
const REVALIDATE_SECONDS = 300;

export type ProductsSource = 'supabase' | 'fallback';

function isStatus(value: unknown): value is ProductStatus {
  return typeof value === 'string' && (PRODUCT_STATUSES as readonly string[]).includes(value);
}

function isProductRow(row: unknown): row is Product {
  if (typeof row !== 'object' || row === null) return false;
  const r = row as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.slug === 'string' &&
    r.slug.length > 0 &&
    typeof r.name === 'string' &&
    (r.price_dzd === null || typeof r.price_dzd === 'number') &&
    isStatus(r.status) &&
    Array.isArray(r.images) &&
    r.images.every((image) => typeof image === 'string') &&
    r.is_published === true
  );
}

function normalize(row: Product): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: typeof row.description === 'string' ? row.description : '',
    category: typeof row.category === 'string' ? row.category : '',
    price_dzd: typeof row.price_dzd === 'number' ? row.price_dzd : null,
    status: row.status,
    images: row.images,
    is_published: row.is_published,
    created_at: typeof row.created_at === 'string' ? row.created_at : '',
  };
}

function isConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

async function queryProducts(filter: string): Promise<Product[] | null> {
  if (!isConfigured()) return null;
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=${COLUMNS}&${filter}`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Réponse inattendue');
    return rows.filter(isProductRow).map(normalize);
  } catch (error) {
    console.error('[products] lecture impossible, repli local utilisé:', error instanceof Error ? error.message : 'erreur');
    return null;
  }
}

/** Produits publiés, du plus récent au plus ancien. */
export async function getPublishedProducts(): Promise<{ products: Product[]; source: ProductsSource }> {
  const rows = await queryProducts('is_published=eq.true&order=created_at.desc');
  if (rows === null || rows.length === 0) {
    return { products: [...FALLBACK_PRODUCTS], source: 'fallback' };
  }
  return { products: rows, source: 'supabase' };
}

/** Fiche publiée par slug (null si inconnue ou non publiée). */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const clean = slug.trim().toLowerCase();
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(clean)) return null;

  const rows = await queryProducts(`slug=eq.${encodeURIComponent(clean)}&is_published=eq.true&limit=1`);
  if (rows && rows.length > 0) return rows[0]!;
  if (rows !== null) return null;

  return FALLBACK_ALL.find((product) => product.slug === clean) ?? null;
}

/** Produit mis en avant (landing, CTA) : premier produit publié. */
export async function getFeaturedProduct(): Promise<Product> {
  const { products } = await getPublishedProducts();
  return products[0] ?? FALLBACK_PRODUCTS[0]!;
}

/** Toutes les fiches connues, publiées ou non, pour le gabarit « sur devis ». */
export async function getProductForQuote(slug: string): Promise<Product | null> {
  const published = await getProductBySlug(slug);
  if (published) return published;
  const clean = slug.trim().toLowerCase();
  return FALLBACK_ALL.find((product) => product.slug === clean) ?? null;
}

/** Slugs connus sans accès base (utilisé par generateStaticParams). */
export function getFallbackSlugs(): string[] {
  return FALLBACK_ALL.map((product) => product.slug);
}

/** Produits de démonstration non publiés : sert uniquement à la prévisualisation locale. */
export function getFallbackSurCommande(): Product[] {
  return FALLBACK_PRODUCTS;
}
