import type { IconName } from '@/components/ui/Icons';

/**
 * @deprecated Catalogue statique hérité, conservé uniquement parce que
 * components/LeadForm.tsx (non routé) l'importe encore.
 *
 * Le catalogue public vient désormais de la table `products` via lib/products.ts.
 * Il n'y a plus aucun produit vedette ici : PS5 et GTA VI sont sortis de la structure.
 * À retirer avec `git rm lib/catalog.ts` et `git rm components/LeadForm.tsx`.
 */

export type Availability = 'Disponible' | 'SurCommande' | 'SurDevis';

export type PackItem = { icon: IconName; title: string; body: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  /** null = prix non affiché (sur devis). */
  priceFromDzd: number | null;
  availability: Availability;
  warrantyMonths: number;
  pack: PackItem[];
};

/** Fiche neutre : aucun modèle, aucun prix, aucune promesse inventée. */
export const GENERIC_PRODUCT: Product = {
  slug: 'produit-pilote',
  name: 'Produit pilote',
  shortName: 'Produit pilote',
  priceFromDzd: null,
  availability: 'SurDevis',
  warrantyMonths: 0,
  pack: [
    {
      icon: 'box',
      title: 'Contenu à définir (TODO)',
      body: 'Les caractéristiques réelles du produit seront publiées depuis la table products.',
    },
  ],
};


/** Aucun produit vedette : la fiche pilote neutre sert de repli. */
export const PRODUCTS: Product[] = [GENERIC_PRODUCT];

export const FEATURED_PRODUCT: Product = GENERIC_PRODUCT;


export const AVAILABILITY_LABEL: Record<Availability, string> = {
  Disponible: 'Disponible',
  SurCommande: 'Sur commande',
  SurDevis: 'Sur devis',
};

/** Délais annoncés. Ne rien promettre de plus précis que ce que vous tenez. */
export const DELIVERY = {
  callbackDelay: 'dans la journée',
  note: 'Le délai de livraison exact vous est annoncé lors de l’appel de confirmation.',
} as const;


