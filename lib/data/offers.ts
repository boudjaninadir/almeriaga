/**
 * Offres d'abonnement (bannières /fournisseur-eu et /fournisseur-dz, spec V4 §3).
 * Libellés et prix = données business : à ajuster par l'exploitant (env ou ce fichier).
 * Conversion exclusivement par lead form (Nom, Prénom, Téléphone) → leads_abonnement ;
 * communication paiement via WhatsApp ou e-mail.
 */
export type Offer = { id: string; name: string; price_dzd_month: number; perks: readonly string[]; highlight?: boolean };

export const OFFERS_EU: readonly Offer[] = [
  { id: 'eu-start', name: 'Start', price_dzd_month: 2900, perks: ['Base fournisseurs EU (Espagne, France)', 'Filtres par catégorie', 'Support WhatsApp'] },
  { id: 'eu-pro', name: 'Pro', price_dzd_month: 5900, highlight: true, perks: ['Base fournisseurs EU multi-pays (ES, FR, DE…)', 'Guidance ANAE + visa Espagne + documents', 'Support WhatsApp & e-mail prioritaire'] },
  { id: 'eu-business', name: 'Business', price_dzd_month: 9900, perks: ['Tout Pro', 'Accompagnement dossier personnalisé', 'Mises à jour fournisseurs hebdomadaires'] },
];

export const OFFERS_DZ: readonly Offer[] = [
  { id: 'dz-start', name: 'Start', price_dzd_month: 1900, perks: ['Annuaire fournisseurs DZ', 'Filtres par wilaya et catégorie'] },
  { id: 'dz-pro', name: 'Pro', price_dzd_month: 3900, highlight: true, perks: ['Annuaire DZ complet', 'Mise en relation directe', 'Support WhatsApp'] },
  { id: 'dz-business', name: 'Business', price_dzd_month: 6900, perks: ['Tout Pro', 'Fournisseurs pouvant devenir clients', 'Suivi dédié'] },
];
