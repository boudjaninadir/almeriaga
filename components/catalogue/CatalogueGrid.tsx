'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/produit/ProductCard';
import { cn } from '@/lib/cn';
import type { Product } from '@/types/product';

const ALL = 'Tous';

/**
 * Grille du catalogue avec filtres par catégorie.
 * Les catégories sont déduites des produits publiés : aucune liste codée en dur.
 */
export function CatalogueGrid({ products }: { products: Product[] }) {
  const categories = useMemo(() => {
    const unique = new Set<string>();
    for (const product of products) {
      if (product.category) unique.add(product.category);
    }
    return [ALL, ...Array.from(unique).sort((a, b) => a.localeCompare(b, 'fr'))];
  }, [products]);

  const [filter, setFilter] = useState<string>(ALL);
  const visible = filter === ALL ? products : products.filter((product) => product.category === filter);

  return (
    <div className="space-y-8">
      {categories.length > 2 && (
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {categories.map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={active}
                className={cn(
                  'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200',
                  active
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#0B3D2E]'
                    : 'border-[#D4AF37]/25 bg-[#0E4635] text-ink-soft hover:border-[#D4AF37]/60 hover:text-[#F7F5EF]',
                )}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      {visible.length === 0 ? (
        <p className="rounded-xl3 border border-[#D4AF37]/25 bg-[#0E4635] p-8 text-center text-sm text-ink-soft">
          Aucun produit publié dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
