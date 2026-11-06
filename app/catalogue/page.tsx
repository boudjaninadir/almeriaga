import type { Metadata } from 'next';
import { CatalogueGrid } from '@/components/catalogue/CatalogueGrid';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'Sélection multiproduits achetée en Espagne, remise en Algérie. Prix en DZD et disponibilité confirmés par un conseiller.',
};

export default function CataloguePage() {
  const { dict } = getLocaleContext();
  const catalogue = dict.shop.catalogue;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <p className="eyebrow">{catalogue.eyebrow}</p>
      <h1 className="mt-6 display-1">{catalogue.title}</h1>
      <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.65] text-ink">{catalogue.lead}</p>

      <div className="mt-8 flex items-start gap-4 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">
          i
        </span>
        <p className="font-sans text-[13px] leading-[1.6] text-ink">{catalogue.notice}</p>
      </div>

      <CatalogueGrid />
    </div>
  );
}
