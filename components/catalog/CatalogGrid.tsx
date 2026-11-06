'use client';

import { useMemo, useState } from 'react';
import { ProfitModal } from '@/components/catalog/ProfitModal';
import { formatDzd, formatEur } from '@/lib/format';
import { PRODUCT_CATEGORIES } from '@/types/product';
import type { Product, ProductCategory } from '@/types/product';

const ALL = 'Tous' as const;
type Filter = typeof ALL | ProductCategory;

export function CatalogGrid({ products, source }: { products: Product[]; source: 'supabase' | 'mock' }) {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(
    () => (filter === ALL ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  const filters: Filter[] = [ALL, ...PRODUCT_CATEGORIES];

  return (
    <div className="space-y-8">
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label="Filtrer par catégorie">
        {filters.map((f) => {
          const active = f === filter;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(f)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                active
                  ? 'border-emerald-800 bg-emerald-800 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-800/40 hover:text-emerald-800'
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {source === 'mock' && (
        <p className="rounded-2xl border border-amber-500/30 bg-amber-50 px-4 py-3 text-xs text-slate-700">
          Tarifs indicatifs à confirmer lors de l’appel. Les produits affichés sont des exemples.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <article
            key={p.id}
            className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-emerald-800/30 hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-[#F8FAFC] text-xs text-slate-400">
              {p.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image_url} alt={p.title_fr} loading="lazy" className="h-full w-full rounded-2xl object-contain" />
              ) : (
                <span>Visuel à venir</span>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">{p.category}</span>
              {!p.in_stock && <span className="text-[11px] text-slate-500">Sur commande</span>}
            </div>

            <h3 className="mt-2 text-base font-semibold text-slate-900">{p.title_fr}</h3>
            <p dir="rtl" lang="ar" className="mt-1 text-sm text-slate-500">{p.title_ar}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-xs text-slate-500">Espagne</dt>
                <dd className="font-semibold text-slate-900">{formatEur(p.price_spain_eur, 2)}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-500">Livré Algérie (est.)</dt>
                <dd className="font-semibold text-emerald-800">{formatDzd(p.est_landed_dzd)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-xs text-slate-500">Minimum {p.min_qty} unités</p>

            <button
              type="button"
              onClick={() => setSelected(p)}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-800 px-5 text-sm font-medium text-white transition hover:bg-emerald-900 active:translate-y-px"
            >
              Simuler la marge &amp; commander en gros
            </button>
          </article>
        ))}
      </div>

      {visible.length === 0 && <p className="text-center text-sm text-slate-500">Aucun produit dans cette catégorie pour le moment.</p>}

      <ProfitModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
