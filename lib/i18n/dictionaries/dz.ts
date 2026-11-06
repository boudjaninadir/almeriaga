import { fr } from '@/lib/i18n/dictionaries/fr';
import { mergeDictionary } from '@/lib/i18n/merge';
import type { Dictionary, DeepOverrides } from '@/lib/i18n/types';

/**
 * Mode hybride Algérie (DZ) : base française (usage professionnel local) enrichie
 * d'environ 10 % d'arabe algérien sur les points de contact clés (titres, CTA, champs).
 * La mise en page reste LTR : les fragments arabes sont des îlots RTL rendus par le
 * navigateur, sans casser la grille Figma.
 */
const overrides: DeepOverrides<Dictionary> = {
  home: {
    hero: {
      eyebrow: 'Espagne → Algérie · إسبانيا ← الجزائر',
      note: 'Pas de paiement en ligne. Une confirmation humaine. · بدون دفع إلكتروني',
    },
    faq: {
      eyebrow: 'Avant de vous lancer · قبل أن تبدأ',
    },
    steps: {
      titleSecond: 'Rien de superflu. · لا شيء زائد.',
    },
  },
  hero: {
    titleAccent: 'من إسبانيا إلى باب دارك',
    ctaCallback: 'Demander un rappel',
    whatsapp: 'WhatsApp direct',
  },
  shop: {
    catalogue: {
      title: 'À chaque besoin, son produit. · لكل حاجة منتجها.',
    },
  },
  request: {
    name: 'Nom / الاسم',
    phone: 'Téléphone / الهاتف',
  },
  products: {
    badge: 'Catalogue · الكتالوج',
  },
  pack: {
    badge: 'Le pack phare · العرض الرئيسي',
  },
  reserve: {
    badge: 'Réservation · حجز',
  },
  how: {
    badge: 'Processus · الخطوات',
  },
  faq: {
    badge: 'FAQ · أسئلة شائعة',
  },
  about: {
    badge: 'À propos de nous · من نحن',
  },
  tracking: {
    badge: 'Informations administratives · معلومات إدارية',
  },
  suppliers: {
    badge: 'Espace fournisseurs (démo) · فضاء الموردين',
  },
  simulatorPreview: {
    badge: 'Outil revendeur · أداة التاجر',
  },
  form: {
    name: 'Nom complet / الاسم الكامل',
    phone: 'Téléphone mobile / رقم الهاتف',
    wilayaRetail: 'Wilaya de livraison / ولاية التسليم',
    wilayaWholesale: 'Wilaya / الولاية',
    message: 'Message / produit souhaité · رسالتك',
    copy: {
      retail: {
        submit: 'Réserver mon pack',
        sending: 'Envoi en cours…',
        footnote: 'Sans paiement en ligne. Vous réglez à la livraison.',
        success: 'votre réservation est enregistrée.',
        consent:
          'J’accepte d’être rappelé(e) au numéro indiqué pour cette réservation. Mes données ne servent qu’à traiter ma demande.',
      },
      wholesale: {
        submit: 'Demander un rappel',
        sending: 'Envoi en cours…',
        footnote: 'Aucun engagement. Nous vous rappelons pour parler volumes et conditions.',
        success: 'votre demande de rappel est enregistrée.',
        consent:
          'J’accepte d’être rappelé(e) au numéro indiqué pour cette demande. Mes données ne servent qu’à traiter ma demande.',
      },
      waitlist: {
        submit: 'Me prévenir',
        sending: 'Envoi en cours…',
        footnote: 'Aucun engagement.',
        success: 'vous êtes sur la liste.',
        consent:
          'J’accepte d’être contacté(e) au numéro indiqué. Mes données ne servent qu’à traiter ma demande.',
      },
    },
    thanks: 'Merci · شكرًا',
    errors: {
      nameRequired: 'Indiquez votre nom.',
      nameInvalid: 'Entrez un nom valide (lettres uniquement).',
      phoneInvalid: 'Entrez un numéro mobile algérien valide (ex : 0550 12 34 56).',
      wilayaRequired: 'Choisissez votre wilaya.',
      wilayaUnavailable: 'Cette wilaya n’est pas desservie pour le moment.',
      quantity: 'Choisissez une quantité entre 1 et {max}.',
      volume: 'Choisissez un volume.',
      shop: 'Entrez un nom de boutique valide.',
      consent: 'Votre accord est nécessaire pour être rappelé(e).',
    },
  },
  pages: {
    gros: {
      badge: 'Espace B2B / Revendeurs · فضاء المهنيين',
      formBadge: 'Rappel B2B · اتصال',
    },
    suppliers: {
      formBadge: 'Liste d’attente · قائمة الانتظار',
    },
    catalogue: {
      eyebrow: 'Catalogue · الكتالوج',
    },
  },
};

export const dz: Dictionary = mergeDictionary(fr, overrides);
