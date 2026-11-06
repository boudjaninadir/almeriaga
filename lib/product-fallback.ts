import { PILOT_PRODUCT_SLUG } from '@/lib/site-config';
import type { Product } from '@/types/product';

/**
 * Données de démonstration utilisées UNIQUEMENT quand Supabase n'est pas configuré
 * (build local, aperçu) ou quand aucun produit n'est publié.
 *
 * Aucun prix, aucune photo, aucun identifiant n'est inventé : les contenus sont
 * marqués TODO et l'utilisateur les complète depuis la table `products`.
 * Les 12 fiches ci-dessous correspondent aux catégories autorisées de la matrice
 * légale (micro-importation). Elles restent `is_published = false`.
 */

const STAMP = '1970-01-01T00:00:00.000Z';
const TODO_NOTE = 'TODO : modèle exact, photos et prix en DZD à renseigner dans la table products.';

type Seed = { slug: string; name: string; category: string };

const SEEDS: readonly Seed[] = [
  { slug: 'lisseur-ceramique', name: 'Lisseur céramique', category: 'Beauté & soins' },
  { slug: 'tondeuse-barbe', name: 'Tondeuse barbe', category: 'Beauté & soins' },
  { slug: 'seche-cheveux-compact', name: 'Sèche-cheveux compact', category: 'Beauté & soins' },
  { slug: 'mixeur-compact', name: 'Mixeur compact', category: 'Électroménager compact' },
  { slug: 'bouilloire-electrique', name: 'Bouilloire électrique', category: 'Électroménager compact' },
  { slug: 'capsules-cafe-compatibles', name: 'Capsules café compatibles', category: 'Café' },
  { slug: 'soin-visage', name: 'Soin visage', category: 'Beauté & soins' },
  { slug: 'maquillage', name: 'Maquillage', category: 'Maquillage' },
  { slug: 'ecouteurs-sans-fil', name: 'Écouteurs sans fil', category: 'Audio & charge' },
  { slug: 'chargeurs-rapides', name: 'Chargeurs rapides', category: 'Audio & charge' },
  { slug: 'montre-connectee', name: 'Montre connectée', category: 'Montres & bijoux' },
  { slug: 'jouets-normes-ce', name: 'Jouets aux normes CE', category: 'Jouets' },
];

export const FALLBACK_PRODUCTS: Product[] = SEEDS.map((seed) => ({
  id: `fallback-${seed.slug}`,
  slug: seed.slug,
  name: seed.name,
  description: `${seed.name} — fiche générique sur commande. ${TODO_NOTE}`,
  category: seed.category,
  price_dzd: null,
  status: 'sur_commande',
  images: [],
  is_published: false,
  created_at: STAMP,
}));

/** Fiche pilote : première page réelle, lien stable utilisable dans Meta Ads. */
export const FALLBACK_PILOT: Product = {
  id: 'fallback-produit-pilote',
  slug: PILOT_PRODUCT_SLUG,
  name: 'Produit pilote',
  description: `Fiche pilote générique, publiée pour occuper l'URL stable /produit/${PILOT_PRODUCT_SLUG}. ${TODO_NOTE}`,
  category: 'Beauté & soins',
  price_dzd: null,
  status: 'sur_commande',
  images: [],
  is_published: true,
  created_at: STAMP,
};

/** Recherche locale (repli) par slug, pilote inclus. */
export const FALLBACK_ALL: readonly Product[] = [FALLBACK_PILOT, ...FALLBACK_PRODUCTS];
