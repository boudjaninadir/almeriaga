import { formatDzd } from '@/lib/format';
import type { Product, ProductStatus } from '@/types/product';

/**
 * Affichage public d'un produit : aucun montant en euros, aucun prix inventé.
 * Un `price_dzd` vide donne « Sur devis ».
 */

export const STATUS_LABEL: Record<ProductStatus, string> = {
  disponible: 'Disponible',
  sur_commande: 'Sur commande',
};

export function hasPrice(product: Pick<Product, 'price_dzd'>): boolean {
  return typeof product.price_dzd === 'number' && Number.isFinite(product.price_dzd) && product.price_dzd > 0;
}

/** "12 500 DA" ou "Sur devis". */
export function priceLabel(product: Pick<Product, 'price_dzd'>): string {
  return hasPrice(product) ? formatDzd(product.price_dzd as number) : 'Sur devis';
}

/**
 * Lien public d'un produit.
 * - disponible      → fiche de commande /produit/[slug]
 * - sur_commande    → page de devis /sur-commande/[slug]
 */
export function productHref(product: Pick<Product, 'slug' | 'status'>): string {
  return product.status === 'disponible' ? `/produit/${product.slug}` : `/sur-commande/${product.slug}`;
}

/** Deux lettres pour le visuel de remplacement, sans image inventée. */
export function productInitials(name: string): string {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return '··';
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return `${words[0]![0]}${words[1]![0]}`.toUpperCase();
}
