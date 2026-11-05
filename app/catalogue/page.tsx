import type { Metadata } from 'next';
import { CatalogGrid } from '@/components/catalog/CatalogGrid';
import { getProducts } from '@/lib/supabase';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: `Catalogue — ${SITE.name}`,
  description: 'Sourcing et micro-importation Espagne-Algérie. Prix Espagne et estimation livrée en Algérie.',
};

export default async function CataloguePage() {
  const { products, source } = await getProducts();

  return (
    <div className="bg-white py-12 md:py-20">
      <div className="container-page space-y-10">
        <header className="space-y-4 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-ink">Catalogue</p>
          <h1 className="text-3xl font-semibold tracking-tightish text-ink sm:text-5xl">Sourcing Espagne, livraison Algérie</h1>
          <p dir="rtl" lang="ar" className="text-sm text-slate-500">شريكك الموثوق في الاستيراد والخدمات اللوجستية إسبانيا-الجزائر</p>
        </header>
        <CatalogGrid products={products} source={source} />
      </div>
    </div>
  );
}
