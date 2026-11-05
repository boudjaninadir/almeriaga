import type { MetadataRoute } from 'next';
import { getPublishedProducts } from '@/lib/products';
import { SITE_URL } from '@/lib/site-config';

/**
 * Sitemap public uniquement.
 * Exclus volontairement : /simulateur, /admin/suivi (modules privés),
 * /merci (confirmation) et /sur-commande/* (gabarit de devis en noindex).
 * /gros et /revendeurs figurent ici : ils sont publics, mais non liés depuis la landing.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/catalogue`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/cadre-legal`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/gros`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/revendeurs`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const { products } = await getPublishedProducts();
    productRoutes = products.map((product) => ({
      url: `${SITE_URL}/produit/${product.slug}`,
      lastModified: product.created_at ? new Date(product.created_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    productRoutes = [];
  }

  return [...staticRoutes, ...productRoutes];
}

