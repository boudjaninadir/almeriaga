'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowUpRight } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useI18n } from '@/lib/i18n/context';
import type { Dictionary } from '@/lib/i18n/types';

type ItemKey = keyof Dictionary['shop']['catalogue']['items'];
type CategoryKey = keyof Dictionary['shop']['catalogue']['categories'];

const IMAGES: Record<ItemKey, string> = {
  lisseur: '/images/catalogue-lisseur.jpg',
  tondeuse: '/images/catalogue-tondeuse.jpg',
  ecouteurs: '/images/catalogue-ecouteurs.jpg',
  capsules: '/images/catalogue-capsules.jpg',
};

const HREFS: Record<ItemKey, string> = {
  lisseur: '/produit/lisseur',
  tondeuse: '/sur-commande/produit-exemple',
  ecouteurs: '/produit/pack-ecouteurs',
  capsules: '/sur-commande/produit-exemple',
};

const ORDER: ItemKey[] = ['lisseur', 'tondeuse', 'ecouteurs', 'capsules'];

export function CatalogueGrid() {
  const { dict } = useI18n();
  const catalogue = dict.shop.catalogue;
  const [filter, setFilter] = useState<'all' | CategoryKey>('all');

  const visible = useMemo(
    () => ORDER.filter((key) => filter === 'all' || catalogue.items[key].category === filter),
    [filter, catalogue.items],
  );

  const categories: Array<{ key: 'all' | CategoryKey; label: string }> = [
    { key: 'all', label: catalogue.all },
    ...(Object.keys(catalogue.categories) as CategoryKey[]).map((key) => ({
      key,
      label: catalogue.categories[key],
    })),
  ];

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-sans text-[13px] font-medium text-ink">{catalogue.categoryLabel}</p>
        <p className="font-sans text-[13px] text-stone">{catalogue.count}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label={catalogue.categoryLabel}>
        {categories.map((category) => {
          const active = filter === category.key;
          return (
            <button
              key={category.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(category.key)}
              className={
                active
                  ? 'h-10 border border-ink bg-ink px-4 font-sans text-[13px] text-paper'
                  : 'h-10 border border-chalk bg-transparent px-4 font-sans text-[13px] text-ink transition-colors hover:border-ink'
              }
            >
              {active && <span className="me-2 text-accent" aria-hidden="true">•</span>}
              {category.label}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-2">
        {visible.map((key) => {
          const item = catalogue.items[key];
          const status = item.status === 'available' ? catalogue.available : catalogue.order;
          return (
            <article key={key} className="group">
              <Link href={HREFS[key]} className="block overflow-hidden bg-surface" aria-label={item.name}>
                <div className="relative aspect-[1584/672] w-full">
                  <Image
                    src={IMAGES[key]}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transform-none"
                  />
                </div>
              </Link>

              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="font-sans text-[11px] text-stone">{catalogue.categories[item.category as CategoryKey]}</span>
                <Badge tone={item.status === 'available' ? 'available' : 'order'}>{status}</Badge>
              </div>

              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-[22px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                    <Link href={HREFS[key]} className="transition-colors hover:text-stone">
                      {item.name}
                    </Link>
                  </h2>
                  <p className="mt-2 font-sans text-[15px] leading-none text-ink">{item.price}</p>
                </div>
                <Link
                  href={HREFS[key]}
                  aria-label={item.name}
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center border border-chalk text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <ArrowUpRight />
                </Link>
              </div>
              <p className="mt-2 font-sans text-[13px] leading-none text-stone">{catalogue.priceNote}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-chalk pt-5 font-sans text-[13px] leading-relaxed text-ink sm:flex-row sm:items-start sm:justify-between">
        <p className="max-w-[720px]">{catalogue.availableNote}</p>
        <p className="text-stone">{catalogue.legalNote}</p>
      </div>
    </div>
  );
}
