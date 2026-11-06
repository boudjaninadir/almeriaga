/**
 * Sheet 2 (référence) : procédure ANAE de A à Z + visa + documents obligatoires.
 * Contenu réglementaire vérifié (décret 25-170, guide ANAE 30/08/2025, bizalgeria 28/10/2026).
 * Synchronisable avec l'onglet Google Sheets `anne_procedure` (voir lib/sheets.ts).
 */
export type ProcedureStep = {
  id: string;
  phase: 'legal' | 'mobilite' | 'terrain';
  title: string;
  organism: string;
  documents: string;
  note: string;
};

export const ANAE_PROCEDURE: readonly ProcedureStep[] = [
  { id: 'p1', phase: 'legal', title: 'Carte d’auto-entrepreneur (activité micro-importation, code 080101)', organism: 'ANAE (anae.dz)', documents: 'Pièce d’identité, justificatif de domicile, photo.', note: 'Nationalité algérienne et résidence en Algérie ; aucune autre activité rémunérée.' },
  { id: 'p2', phase: 'legal', title: 'Affiliation CASNOS', organism: 'CASNOS', documents: 'Carte auto-entrepreneur, pièce d’identité.', note: 'Obligatoire avant l’autorisation générale.' },
  { id: 'p3', phase: 'legal', title: 'NIF et validation fiscale', organism: 'Direction Générale des Impôts', documents: 'Formulaire d’immatriculation, carte auto-entrepreneur.', note: 'NIF validé par les impôts exigé par l’ANAE.' },
  { id: 'p4', phase: 'legal', title: 'Compte en devises + carte bancaire internationale', organism: 'Banque Extérieure d’Algérie (BEA)', documents: 'Carte auto-entrepreneur, NIF.', note: 'Financement exclusivement par cette carte (guide ANAE).' },
  { id: 'p5', phase: 'legal', title: 'Autorisation générale annuelle', organism: 'ANAE (compte anae.dz)', documents: 'Demande en ligne depuis le compte.', note: 'Délivrée en 5 jours ouvrables, valable 1 an renouvelable, personnelle et incessible (art. 12).' },
  { id: 'p6', phase: 'mobilite', title: 'Visa Schengen (Espagne / Europe)', organism: 'Consulat du pays de destination', documents: 'Passeport valide, justificatifs de séjour, assurance voyage, moyens de paiement.', note: 'Rendez-vous et délais propres à chaque consulat : à vérifier auprès du consulat.' },
  { id: 'p7', phase: 'mobilite', title: 'Déclaration préalable des marchandises', organism: 'Plateforme numérique (ministère des start-up / ANAE)', documents: 'Liste des marchandises avant leur arrivée sur le territoire.', note: 'Art. 13 : déclaration avant chaque voyage ; contre-valeur au taux du jour de la déclaration.' },
  { id: 'p8', phase: 'terrain', title: 'Sourcing et achat fournisseurs Europe', organism: 'Fournisseurs (Espagne, France, Allemagne…)', documents: 'Factures proforma, bon de commande.', note: 'Plafond 1 800 000 DA par déplacement, 2 déplacements/mois, non cumulables.' },
  { id: 'p9', phase: 'terrain', title: 'Passage en douane', organism: 'Direction Générale des Douanes', documents: 'Déclaration, factures, carte auto-entrepreneur.', note: '5 % de droit de douane + 0,5 % d’IFU (base : valeur + droits + marge forfaitaire 30 %).' },
  { id: 'p10', phase: 'terrain', title: 'Contrôle de conformité des marchandises', organism: 'Douanes / contrôles sanitaires', documents: 'Emballages et étiquetages d’origine.', note: 'Durée de vie restante > 50 % à l’import (art. 6) ; produits exclus : art. 9.' },
  { id: 'p11', phase: 'terrain', title: 'Mise en vente et livraison', organism: 'Votre activité', documents: 'Registre des ventes, factures clients.', note: 'Livraison dans toutes les wilayas d’Algérie ; paiement à la remise, jamais en ligne.' },
];

export const PROCEDURE_DISCLAIMER =
  'Ces informations présentent une démarche administrative générale. Elles ne constituent pas un conseil juridique : vérifiez chaque point auprès de l’ANAE, des Douanes et du consulat concerné.';
