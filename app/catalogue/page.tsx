import type { Metadata } from 'next';
import { CatalogueGrid } from '@/components/catalogue/CatalogueGrid';
import { Reveal } from '@/components/ui/Reveal';
import { getPublishedProducts } from '@/lib/products';
import { BRAND_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    'Produits disponibles et sur commande, prix affichés en dinars algériens. Chaque produit renvoie vers sa fiche dédiée.',
  alternates: { canonical: '/catalogue' },
};

export const revalidate = 300;

export default async function CataloguePage() {
  const { products, source } = await getPublishedProducts();

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <span className="eyebrow">Catalogue</span>
        <h1 className="section-title mt-3">Les produits Almeríaga</h1>
        <p className="section-lead">
          Chaque fiche indique le statut du produit et son prix en dinars. Quand le prix n’est pas encore fixé, la
          mention « sur devis » s’applique et un formulaire dédié permet de demander une offre.
        </p>
      </Reveal>

      {source === 'fallback' && (
        <p className="mt-6 rounded-xl border border-warn/25 bg-warn/5 p-4 text-xs leading-relaxed text-warn">
          Catalogue de démonstration (TODO) : la base Supabase n’est pas configurée ou aucun produit n’est publié.
          Publiez vos fiches depuis la table products pour les voir apparaître ici.
        </p>
      )}

      <div className="mt-10">
        <CatalogueGrid products={products} />
      </div>

      <p className="mt-10 text-xs text-ink-faint">
        {BRAND_NAME} — prix en dinars algériens (DZD). Aucun paiement n’est demandé en ligne.
      </p>
    </div>
  );
}

