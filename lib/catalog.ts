import type { IconName } from '@/components/ui/Icons';

/**
 * Catalogue des produits. Pour ajouter un produit plus tard (autre console, accessoire),
 * ajoutez un objet à PRODUCTS : la landing lit FEATURED_PRODUCT, les autres pages pourront
 * lister PRODUCTS sans refonte.
 *
 * TODO = affirmation commerciale qui doit être VRAIE le jour où les publicités démarrent.
 */

export type Availability = 'PreOrder' | 'OnDemand' | 'OnQuote' | 'AtRelease' | 'InStock';

export type PackItem = { icon: IconName; title: string; body: string };

export type Product = {
  slug: string;
  name: string;
  shortName: string;
  /** null = prix non affiché ("communiqué lors de l'appel"). */
  priceFromDzd: number | null;
  availability: Availability;
  warrantyMonths: number;
  game?: { name: string; releaseNote: string; deliveryNote: string };
  pack: PackItem[];
};

export const PS5_SLIM: Product = {
  slug: 'ps5-slim-1to-gta6',
  name: 'Pack PS5 Slim 1 To + GTA VI',
  shortName: 'PS5 Slim 1 To',
  priceFromDzd: null,
  availability: 'PreOrder',
  warrantyMonths: 12,
  game: {
    name: 'GTA VI',
    releaseNote: 'Sortie officielle annoncée le 19 novembre 2026.',
    deliveryNote: 'L’édition et le mode de remise du jeu (voucher, code ou disque) vous sont confirmés lors de l’appel.',
  },
  pack: [
    { icon: 'console', title: 'Console PS5 Slim 1 To', body: 'Neuve, avec lecteur de disques.' },
    { icon: 'gamepad', title: 'Manettes sans fil', body: 'Nombre confirmé lors de l’appel. Prêt à jouer dès le déballage.' },
    { icon: 'disc', title: 'GTA VI', body: 'Édition et remise confirmées lors de l’appel.' },
    { icon: 'receipt', title: 'Facture et garantie vendeur', body: 'Facture remise avec le pack.' },
  ],
};

export const PRODUCTS: Product[] = [
  PS5_SLIM,
  {
    slug: 'ps5-edition-speciale',
    name: 'PS5 Édition spéciale',
    shortName: 'PS5 Édition Spéciale',
    priceFromDzd: null,
    availability: 'OnDemand',
    warrantyMonths: 12,
    pack: [
      { icon: 'console', title: 'Console Édition Spéciale', body: 'Design exclusif, neuve.' },
      { icon: 'gamepad', title: 'Manette assortie', body: 'DualSense aux couleurs de l’édition.' },
      { icon: 'receipt', title: 'Facture et garantie', body: 'Garantie vendeur incluse.' },
    ],
  },
  {
    slug: 'manette-dualsense',
    name: 'Manette DualSense',
    shortName: 'Manette DualSense',
    priceFromDzd: null,
    availability: 'OnDemand',
    warrantyMonths: 6,
    pack: [
      { icon: 'gamepad', title: 'Manette sans fil DualSense', body: 'Retex haptique et gâchettes adaptatives.' },
      { icon: 'receipt', title: 'Garantie vendeur', body: 'Garantie standard.' },
    ],
  },
  {
    slug: 'casque-vr',
    name: 'Casque VR (Meta Quest)',
    shortName: 'Casque VR',
    priceFromDzd: null,
    availability: 'OnDemand',
    warrantyMonths: 12,
    pack: [
      { icon: 'headset', title: 'Casque VR haute définition', body: 'Immersion totale, neuf.' },
      { icon: 'receipt', title: 'Garantie vendeur', body: 'Facture officielle.' },
    ],
  },
  {
    slug: 'lunettes-vr-mixte',
    name: 'Lunettes VR / réalité mixte',
    shortName: 'Lunettes VR / Mixte',
    priceFromDzd: null,
    availability: 'OnDemand',
    warrantyMonths: 12,
    pack: [
      { icon: 'glasses', title: 'Lunettes réalité mixte', body: 'Modèle derniere génération.' },
      { icon: 'receipt', title: 'Garantie vendeur', body: 'Facture incluse.' },
    ],
  },
  {
    slug: 'pc-gaming',
    name: 'PC gaming',
    shortName: 'PC Gaming sur mesure',
    priceFromDzd: null,
    availability: 'OnQuote',
    warrantyMonths: 24,
    pack: [
      { icon: 'pc', title: 'Configuration sur devis', body: 'Composants haute performance choisis avec vous.' },
      { icon: 'shield', title: 'Garantie pièces et main-d’œuvre', body: 'Jusqu’à 24 mois.' },
    ],
  },
  {
    slug: 'gta-vi-seul',
    name: 'GTA VI seul',
    shortName: 'GTA VI',
    priceFromDzd: null,
    availability: 'AtRelease',
    warrantyMonths: 0,
    game: {
      name: 'GTA VI',
      releaseNote: 'Sortie officielle annoncée le 19 novembre 2026.',
      deliveryNote: 'Disponible dès le jour de la sortie.',
    },
    pack: [
      { icon: 'disc', title: 'Jeu GTA VI', body: 'Format physique ou dématérialisé selon disponibilité.' },
    ],
  },
];

export const FEATURED_PRODUCT: Product = PS5_SLIM;

export const AVAILABILITY_LABEL: Record<Availability, string> = {
  PreOrder: 'Disponible sur réservation',
  OnDemand: 'Sur commande',
  OnQuote: 'Sur devis',
  AtRelease: 'Disponible à la sortie',
  InStock: 'En stock',
};

/** Délais annoncés. Ne rien promettre de plus précis que ce que vous tenez. */
export const DELIVERY = {
  callbackDelay: 'dans la journée',
  note: 'Le délai de livraison exact vous est annoncé lors de l’appel de confirmation.',
} as const;

