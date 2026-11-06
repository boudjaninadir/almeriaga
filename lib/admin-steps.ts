/**
 * Suivi administratif interne (module PRIVÉ, protégé par middleware Basic Auth).
 *
 * Reproduit les colonnes de la feuille « Suivi administratif » du classeur maître :
 * phase, tâche, statut, établissement, date de dépôt, terminé, durée, notes, coût.
 * Aucun identifiant personnel (NIF, ANAE, CASNOS, RIB) n'est stocké ici.
 *
 * Les valeurs inconnues restent à null et sont affichées « — » : rien n'est inventé.
 */

export type AdminPhase = '1. Cadre légal' | '2. Mobilité' | '3. Terrain';

export type AdminStatus = 'à faire' | 'en cours' | 'à vérifier' | 'terminé';

export type AdminStep = {
  id: string;
  phase: AdminPhase;
  task: string;
  status: AdminStatus;
  /** Établissement ou organisme compétent. */
  establishment: string;
  /** Date de dépôt au format AAAA-MM-JJ (null = inconnue). */
  filedAt: string | null;
  /** Case « terminé » de la feuille. */
  done: boolean;
  /** Durée constatée, en jours (null = inconnue). */
  durationDays: number | null;
  notes: string;
  /** Coût en dinars (null = inconnu). */
  costDzd: number | null;
};

const PHASE_LEGAL: AdminPhase = '1. Cadre légal';
const PHASE_MOBILITE: AdminPhase = '2. Mobilité';
const PHASE_TERRAIN: AdminPhase = '3. Terrain';

const TODO_DATE = 'TODO : date de dépôt à renseigner';
const TODO_COST = 'TODO : coût réel à renseigner (en DZD)';

function step(
  id: string,
  phase: AdminPhase,
  task: string,
  establishment: string,
  notes = '',
): AdminStep {
  return {
    id,
    phase,
    task,
    status: 'à faire',
    establishment,
    filedAt: null,
    done: false,
    durationDays: null,
    notes: [notes, TODO_DATE, TODO_COST].filter(Boolean).join(' · '),
    costDzd: null,
  };
}

export const ADMIN_STEPS: readonly AdminStep[] = [
  step('cnas-non-affiliation', PHASE_LEGAL, 'Non-affiliation CNAS', 'CNAS', 'Justificatif à obtenir en amont.'),
  step('anae-inscription', PHASE_LEGAL, 'Inscription ANAE et carte auto-entrepreneur', 'ANAE', 'Code activité 080101, domaine micro-importation.'),
  step('nif-attestation', PHASE_LEGAL, 'NIF et attestation d’immatriculation fiscale', 'Direction des impôts'),
  step('nif-authentification', PHASE_LEGAL, 'Authentification du NIF', 'Direction des impôts'),
  step('cachet', PHASE_LEGAL, 'Cachet professionnel', 'Prestataire (fabrication de cachet)'),
  step('c20', PHASE_LEGAL, 'Attestation C20', 'Direction des impôts'),
  step('g12-bis', PHASE_LEGAL, 'G12 bis (IFU)', 'Direction des impôts'),
  step('casnos', PHASE_LEGAL, 'Affiliation CASNOS', 'CASNOS'),
  step('compte-devises-bea', PHASE_LEGAL, 'Compte devises BEA', 'BEA'),
  step('autorisation-commerce-exterieur', PHASE_LEGAL, 'Autorisation générale du Ministère du Commerce Extérieur', 'Ministère du Commerce Extérieur'),
  step('visa-schengen', PHASE_MOBILITE, 'Visa Schengen Espagne', 'Consulat d’Espagne'),
  step('assurance-voyage', PHASE_MOBILITE, 'Assurance voyage', 'Assureur'),
  step('ferry', PHASE_MOBILITE, 'Réservation du ferry', 'Transporteur maritime'),
  step('statut-vehicule', PHASE_MOBILITE, 'Mise à jour du statut du véhicule', 'Administration des douanes'),
  step('prospection-fournisseurs', PHASE_TERRAIN, 'Prospection des fournisseurs en Espagne', 'Terrain'),
  step('negociation-lots', PHASE_TERRAIN, 'Négociation des lots', 'Terrain'),
  step('declaration-importation', PHASE_TERRAIN, 'Déclaration d’importation sur la plateforme ANAE', 'ANAE', 'À effectuer avant chaque voyage.'),
];

export const ADMIN_STATUSES: readonly AdminStatus[] = ['à faire', 'en cours', 'à vérifier', 'terminé'];
