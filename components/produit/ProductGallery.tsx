'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ProductVisual } from '@/components/produit/ProductVisual';
import type { Product } from '@/types/product';

/**
 * Galerie de la fiche produit : vignette principale légèrement inclinée au survol
 * (3D CSS), vignettes secondaires si le produit possède plusieurs photos.
 * Sans photo, le visuel de remplacement est affiché : aucune URL n'est inventée.
 */
export function ProductGallery({ product }: { product: Product }) {
  const images = product.images.filter((source) => typeof source === 'string' && source.trim() !== '');
  const [active, setActive] = useState(0);
  const current = images[active] ?? null;

  return (
    <div className="space-y-4">
      <div className="scene-3d">
        <div className="group relative overflow-hidden rounded-xl3 border border-[#D4AF37]/25 bg-gradient-to-br from-[#12513D] via-[#0E4635] to-[#0B3D2E] shadow-soft transition-transform duration-500 ease-out-soft [transform:rotateX(0deg)_rotateY(0deg)] hover:[transform:rotateX(2deg)_rotateY(-3deg)]">
          <div className="aspect-square w-full">
            {current ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <ProductVisual product={product} size="lg" className="p-8" />
            )}
          </div>
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#0B3D2E]/85 px-3 py-1 text-[11px] font-medium text-ink-faint">
            {current ? 'Photo du produit' : 'Visuel de remplacement (photo à ajouter)'}
          </span>
        </div>
      </div>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((source, index) => (
            <li key={`${source}-${index}`}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Voir la photo ${index + 1}`}
                aria-pressed={index === active}
                className={cn(
                  'block aspect-square w-full overflow-hidden rounded-xl border bg-[#0E4635] transition',
                  index === active
                    ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                    : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/55',
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={source} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
