export type SupplierDemo = {
  id: string;
  name: string;
  city: string;
  country: string;
  category: 'Consoles & Jeux' | 'Accessoires VR' | 'Composants PC' | 'Électronique générale';
  status: 'À vérifier' | 'En attente d’audit';
  notes: string;
};

export const DEMO_SUPPLIERS: SupplierDemo[] = [
  {
    id: 'sup-1',
    name: 'Exemple Sourcing Logistique S.L.',
    city: 'Madrid',
    country: 'Espagne',
    category: 'Consoles & Jeux',
    status: 'À vérifier',
    notes: 'Fiche d’exemple — aucun contact réel. Destinée aux tests de structure d’annuaire B2B.',
  },
  {
    id: 'sup-2',
    name: 'Exemple Gaming Distrib S.A.',
    city: 'Valence',
    country: 'Espagne',
    category: 'Accessoires VR',
    status: 'À vérifier',
    notes: 'Fiche d’exemple — aucun contact réel. Vérification des licences d’export en cours.',
  },
  {
    id: 'sup-3',
    name: 'Exemple Hardware Import Hub',
    city: 'Barcelone',
    country: 'Espagne',
    category: 'Composants PC',
    status: 'En attente d’audit',
    notes: 'Fiche d’exemple — aucun contact réel. Partenaire potentiel pour les stations de jeu.',
  },
  {
    id: 'sup-4',
    name: 'Exemple Multimedia Trade Group',
    city: 'Alicante',
    country: 'Espagne',
    category: 'Électronique générale',
    status: 'À vérifier',
    notes: 'Fiche d’exemple — aucun contact réel. Sourcing de périphériques et accessoires.',
  },
];
