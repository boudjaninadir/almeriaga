import { cn } from '@/lib/cn';
import { productInitials } from '@/lib/product-display';
import type { Product } from '@/types/product';

/**
 * Visuel d'un produit.
 * - Si `images` contient une URL, on l'affiche.
 * - Sinon, une pastille typographique : aucune image d'exemple n'est inventée.
 */
export function ProductVisual({
  product,
  className,
  size = 'md',
}: {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const image = product.images.find((source) => typeof source === 'string' && source.trim() !== '');

  if (image) {
    return (
      <div className={cn('relative h-full w-full overflow-hidden', className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }

  const box =
    size === 'lg' ? 'h-32 w-32 text-3xl' : size === 'sm' ? 'h-12 w-12 text-sm' : 'h-20 w-20 text-xl';

  return (
    <div className={cn('flex h-full w-full items-center justify-center', className)}>
      <div
        className={cn(
          'flex items-center justify-center rounded-2xl border border-[#D4AF37]/30 bg-[#F7F5EF]/70 font-semibold text-[#8A6D1F] shadow-soft',
          box,
        )}
        aria-hidden="true"
      >
        {productInitials(product.name)}
      </div>
    </div>
  );
}
