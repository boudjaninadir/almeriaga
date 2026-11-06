/**
 * Sheet 5 (référence) : produits légaux vs illégaux au regard de l'ANAE
 * (décret exécutif 25-170, art. 9 ; guide ANAE 30/08/2025).
 * Sert de filtre de publication des produits et de référence publique (/cadre-legal).
 */
export type LegalRow = { category: string; status: 'legal' | 'illegal' | 'licence'; detail: string };

export const ANAE_LEGAL_MATRIX: readonly LegalRow[] = [
  { category: 'Électroménager compact (friteuses à air, mixeurs, bouilloires)', status: 'legal', detail: 'Autorisé ; durée de vie restante > 50 % à l’import (art. 6).' },
  { category: 'Électronique grand public (audio, chargeurs, gaming, LED)', status: 'legal', detail: 'Autorisé hors équipements sensibles du décret 09-410.' },
  { category: 'Maison & déco (éclairage, rangement, textiles neufs)', status: 'legal', detail: 'Autorisé ; emballages et étiquetages d’origine exigés.' },
  { category: 'Sport & bien-être (fitness, accessoires non médicaux)', status: 'legal', detail: 'Autorisé ; dispositifs médicaux exclus.' },
  { category: 'Jouets normés CE', status: 'legal', detail: 'Autorisé ; conformité et marquage exigés.' },
  { category: 'Cosmétiques & parfums', status: 'licence', detail: 'Licence spéciale requise : exclu du régime auto-entrepreneur sans agrément (guide ANAE).' },
  { category: 'Smartphones & équipements de télécommunication', status: 'illegal', detail: 'Équipements sensibles (décret 09-410) : exclus (art. 9).' },
  { category: 'Produits pharmaceutiques & dispositifs médicaux', status: 'illegal', detail: 'Exclus (art. 9) : réservés aux entreprises agréées.' },
  { category: 'Alimentaire (viandes, lait, denrées animales/végétales)', status: 'illegal', detail: 'Exclus (art. 9) : chaîne du froid et sécurité sanitaire.' },
  { category: 'Armes, munitions, drones, produits chimiques/explosifs', status: 'illegal', detail: 'Marchandises prohibées (art. 9).' },
  { category: 'Alcool, tabac, cigarettes électroniques et liquides', status: 'illegal', detail: 'Exclus (art. 9).' },
  { category: 'Friperie, pièces détachées, contrefaçons, déchets', status: 'illegal', detail: 'Exclus (art. 9).' },
];
