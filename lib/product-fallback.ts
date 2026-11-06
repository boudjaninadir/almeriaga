import type { Product } from '@/types/product';

/**
 * Produits publiés par défaut (spec V4 §5) : 3 références à forte conversion
 * sourcées via recherche web + tendances micro-importation/ANAE 2025-2026,
 * filtrées par la matrice légale (lib/data/anae-legal.ts).
 * Prix retail DZD = données business de l'exploitant (à ajuster).
 * Emplacement Image 1 réservé : à ajouter dès réception du visuel de marque.
 * Utilisés UNIQUEMENT quand Supabase n'est pas configuré ou vide.
 */
const STAMP = '2026-01-05T09:00:00.000Z';

export const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 'pub-friteuse-air',
    slug: 'friteuse-a-air-5l',
    name: 'Friteuse à air 5 L',
    description:
      'Friteuse sans huile 5 L, panier antiadhésif et minuterie digitale. Cuisson rapide et homogène, idéale pour les familles. Garantie vérifiée à la remise.',
    category: 'Électroménager compact',
    price_dzd: 18900,
    status: 'disponible',
    images: [],
    is_published: true,
    created_at: STAMP,
  },
  {
    id: 'pub-pack-gaming',
    slug: 'pack-gaming-rgb',
    name: 'Pack Gaming RGB (casque + clavier mécanique)',
    description:
      'Casque gaming surround et clavier mécanique rétroéclairé RGB, compatibles PC et consoles. Le setup complet des joueurs exigeants, testé avant remise.',
    category: 'Audio & charge',
    price_dzd: 24500,
    status: 'disponible',
    images: [],
    is_published: true,
    created_at: STAMP,
  },
  {
    id: 'pub-kit-led-usbc',
    slug: 'kit-led-charge-usbc',
    name: 'Kit LED d’ambiance + charge USB-C',
    description:
      'Ruban LED d’ambiance télécommandé et station de charge USB-C multi-ports parasurtenseur. Ambiance et énergie propre pour bureau ou chambre.',
    category: 'Audio & charge',
    price_dzd: 6900,
    status: 'disponible',
    images: [],
    is_published: true,
    created_at: STAMP,
  },
];

/** Toutes les fiches connues, publiées ou non, pour le gabarit « sur devis ». */
export const FALLBACK_ALL: readonly Product[] = FALLBACK_PRODUCTS;

