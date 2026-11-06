'use client';

import { useMemo, useState } from 'react';
import { ProfitModal } from '@/components/catalog/ProfitModal';
import { useI18n } from '@/lib/i18n/context';
import { interpolate } from '@/lib/i18n/format';
import { formatDzd, formatEur } from '@/lib/format';
import { PRODUCT_CATEGORIES } from '@/types/product';
import type { Product, ProductCategory } from '@/types/product';

const ALL = '*' as const;
type Filter = typeof ALL | ProductCategory;

export function CatalogGrid({ products, source }: { products: Product[]; source: 'supabase' | 'mock' }) {
  const { locale, dict } = useI18n();
  const t = dict.catalogGrid;
  const [filter, setFilter] = useState<Filter>(ALL);
  const [selected, setSelected] = useState<Product | null>(null);

  const visible = useMemo(
    () => (filter === ALL ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  const filters: Filter[] = [ALL, ...PRODUCT_CATEGORIES];
  const categoryLabel = (category: ProductCategory) => t.categories[category] ?? category;

  return (
    <div className="space-y-8">
      <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist" aria-label={t.filterLabel}>
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
              {f === ALL ? t.all : categoryLabel(f)}
            </button>
          );
        })}
      </div>

      {source === 'mock' && (
        <p className="rounded-2xl border border-amber-500/30 bg-amber-50 px-4 py-3 text-xs text-slate-700">
          {t.mockNote}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const primaryTitle = locale === 'ar' ? p.title_ar : p.title_fr;
          const secondaryTitle = locale === 'ar' ? p.title_fr : p.title_ar;
          return (
            <article
              key={p.id}
              className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lift motion-reduce:transform-none motion-reduce:transition-none"
            >
              <div className="flex aspect-[4/3] items-center justify-center rounded-2xl bg-[#F8FAFC] text-xs text-slate-400">
                {p.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image_url} alt={primaryTitle} loading="lazy" className="h-full w-full rounded-2xl object-contain" />
                ) : (
                  <span>{t.visualSoon}</span>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">{categoryLabel(p.category)}</span>
                {!p.in_stock && <span className="text-[11px] text-slate-500">{t.onOrder}</span>}
              </div>

              <h3 className="mt-2 text-base font-semibold text-slate-900">{primaryTitle}</h3>
              <p
                dir={locale === 'ar' ? 'ltr' : 'rtl'}
                lang={locale === 'ar' ? 'fr' : 'ar'}
                className={`mt-1 text-sm text-slate-500 ${locale === 'ar' ? 'text-right' : ''}`}
              >
                {secondaryTitle}
              </p>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-slate-500">{t.spain}</dt>
                  <dd className="font-semibold text-slate-900">{formatEur(p.price_spain_eur, 2)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">{t.delivered}</dt>
                  <dd className="font-semibold text-emerald-800">{formatDzd(p.est_landed_dzd)}</dd>
                </div>
              </dl>
              <p className="mt-2 text-xs text-slate-500">{interpolate(t.minimum, { n: p.min_qty })}</p>

              <button
                type="button"
                onClick={() => setSelected(p)}
                className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-800 px-5 text-sm font-medium text-white transition hover:bg-emerald-900 active:translate-y-px"
              >
                {t.cta}
              </button>
            </article>
          );
        })}
      </div>

      {visible.length === 0 && <p className="text-center text-sm text-slate-500">{t.empty}</p>}

      <ProfitModal product={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
