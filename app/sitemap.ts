import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url;
  const now = new Date();
  const routes: Array<{ path: string; priority: number; frequency: 'daily' | 'weekly' | 'monthly' }> = [
    { path: '', priority: 1, frequency: 'daily' },
    { path: '/catalogue', priority: 0.9, frequency: 'weekly' },
    { path: '/produit/lisseur', priority: 0.8, frequency: 'weekly' },
    { path: '/sur-commande/produit-exemple', priority: 0.6, frequency: 'monthly' },
    { path: '/gros', priority: 0.8, frequency: 'weekly' },
    { path: '/revendeurs', priority: 0.7, frequency: 'weekly' },
    { path: '/cadre-legal', priority: 0.5, frequency: 'monthly' },
    { path: '/contact', priority: 0.6, frequency: 'monthly' },
    { path: '/mentions-legales', priority: 0.3, frequency: 'monthly' },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
