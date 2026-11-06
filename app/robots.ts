import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Modules internes et routes techniques : jamais indexés.
      disallow: ['/api/', '/admin/', '/admin', '/simulateur', '/merci'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

