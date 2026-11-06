'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/analytics';

/**
 * Déclenche ViewContent à l'ouverture d'une fiche produit.
 * Sans pixel configuré, l'appel est simplement ignoré.
 */
export function MetaViewContent({ slug, name }: { slug: string; name: string }) {
  useEffect(() => {
    trackViewContent(slug, name);
  }, [slug, name]);

  return null;
}
