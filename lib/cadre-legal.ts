/**
 * Étapes publiques du cadre légal de la micro-importation.
 *
 * RÈGLES DE CONTENU :
 *  - aucune date, aucun coût, aucun plafond, aucun taux de douane ;
 *  - aucun identifiant personnel (NIF, ANAE, CASNOS, RIB, autorisation) ;
 *  - la page invite à vérifier chaque point auprès de l'ANAE et des Douanes.
 *
 * Source de structure : feuille « Suivi administratif » du classeur maître
 * (décret exécutif n° 25-170). Les montants et échéances vivent uniquement
 * dans le module privé /admin/suivi.
 */

export type LegalStep = { label: string; note?: string };

export type LegalPhase = {
  id: string;
  title: string;
  summary: string;
  steps: readonly LegalStep[];
};

export const LEGAL_PHASES: readonly LegalPhase[] = [
  {
    id: 'cadre-legal',
    title: '1. Cadre légal',
    summary: 'Constituer l’activité et réunir les pièces administratives avant toute importation.',
    steps: [
      { label: 'Non-affiliation CNAS', note: 'Justificatif à obtenir en amont.' },
      {
        label: 'Inscription ANAE et carte auto-entrepreneur',
        note: 'Code activité 080101, domaine micro-importation.',
      },
      { label: 'NIF et attestation d’immatriculation fiscale' },
      { label: 'Authentification du NIF' },
      { label: 'Cachet professionnel' },
      { label: 'Attestation C20' },
      { label: 'G12 bis (IFU)' },
      { label: 'Affiliation CASNOS' },
      { label: 'Compte devises BEA' },
      { label: 'Autorisation générale du Ministère du Commerce Extérieur' },
    ],
  },
  {
    id: 'mobilite',
    title: '2. Mobilité',
    summary: 'Préparer les déplacements professionnels vers l’Espagne.',
    steps: [
      { label: 'Visa Schengen Espagne' },
      { label: 'Assurance voyage' },
      { label: 'Réservation du ferry' },
      { label: 'Mise à jour du statut du véhicule' },
    ],
  },
  {
    id: 'terrain',
    title: '3. Terrain',
    summary: 'Sourcer, négocier et déclarer, voyage par voyage.',
    steps: [
      { label: 'Prospection des fournisseurs en Espagne' },
      { label: 'Négociation des lots' },
      {
        label: 'Déclaration d’importation sur la plateforme ANAE',
        note: 'À effectuer avant chaque voyage.',
      },
    ],
  },
];

export const LEGAL_DISCLAIMER =
  'Ces informations présentent une démarche administrative générale. Elles ne constituent pas un conseil juridique et ne remplacent pas les textes officiels : vérifiez chaque point auprès de l’ANAE et des Douanes avant publication.';
