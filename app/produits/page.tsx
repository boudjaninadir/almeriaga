import type { Metadata } from 'next';
import { CatalogueGrid } from '@/components/catalogue/CatalogueGrid';
import { Reveal } from '@/components/ui/Reveal';
import { currentLocale } from '@/lib/locale-server';
import { t } from '@/lib/i18n';
import { getPublishedProducts } from '@/lib/products';
import { BRAND_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Produits',
  description:
    'Produits disponibles et sur commande, prix affichés en dinars algériens. Livraison dans toutes les wilayas d’Algérie.',
  alternates: { canonical: '/produits' },
};

export const revalidate = 300;

export default async function ProduitsPage() {
  const locale = currentLocale();
  const { products } = await getPublishedProducts();

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <span className="eyebrow">{t(locale, 'nav_products')}</span>
        <h1 className="section-title mt-3">{t(locale, 'products_title')}</h1>
        <p className="section-lead">{t(locale, 'products_lead')}</p>
      </Reveal>

      <div className="mt-10">
        <CatalogueGrid products={products} />
      </div>

      <p className="mt-10 text-xs text-ink-faint">
        {BRAND_NAME} — prix en dinars algériens (DZD). Aucun paiement n’est demandé en ligne.
      </p>
    </div>
  );
}
