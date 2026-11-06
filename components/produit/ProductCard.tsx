import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icons';
import { TiltCard } from '@/components/ui/TiltCard';
import { ProductVisual } from '@/components/produit/ProductVisual';
import { priceLabel, productHref, STATUS_LABEL } from '@/lib/product-display';
import type { Product } from '@/types/product';

/**
 * Carte produit : fond blanc cassé, liseré or discret, prix mis en avant en doré.
 * S'incline au survol (perspective CSS) et renvoie vers la fiche.
 * Aucun prix inventé : « Sur devis » quand `price_dzd` est vide.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <TiltCard className="rounded-xl3">
      <Link
        href={productHref(product)}
        className="group flex h-full flex-col overflow-hidden rounded-xl3 border border-[#D4AF37]/25 bg-[#FCFBF7] shadow-soft transition duration-300 hover:border-[#D4AF37]/60 hover:shadow-gold"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-[#F1EDE3] via-[#FCFBF7] to-[#F7F5EF]">
          <span className="absolute left-3 top-3">
            <Badge tone={product.status === 'disponible' ? 'mint' : 'accent'}>{STATUS_LABEL[product.status]}</Badge>
          </span>
          <ProductVisual product={product} className="p-6" />
        </div>

        <div className="flex flex-1 flex-col gap-2 border-t border-[#D4AF37]/15 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8A6D1F]/80">
            {product.category || 'Catégorie à définir'}
          </p>
          <h3 className="text-lg font-semibold tracking-tightish text-[#1B1F1D]">{product.name}</h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-auto flex items-center justify-between gap-3 pt-4">
            <span className="text-base font-semibold text-[#8A6D1F]">{priceLabel(product)}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B1F1D] transition-colors duration-200 group-hover:text-[#8A6D1F]">
              Voir la fiche
              <Icon name="arrow" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
