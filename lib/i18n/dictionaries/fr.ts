import type { Dictionary } from '@/lib/i18n/types';

/**
 * Dictionnaire de référence (français). C'est lui qui définit le contrat de type
 * `Dictionary` : toute clé ajoutée ici doit être traduite dans les autres langues.
 */
export const fr = {
  nav: {
    home: 'Accueil',
    homeLabel: 'accueil',
    products: 'Produits',
    catalogue: 'Catalogue',
    simulator: 'Simulateur',
    suppliers: 'Fournisseurs',
    tracking: 'Suivi',
    about: 'À propos',
    legal: 'Cadre légal',
    contact: 'Contact',
    wholesale: 'Achat en gros / revendeurs',
    supplierSpace: 'Espace fournisseurs',
    login: 'Connexion',
    reserve: 'Commander',
    reservePack: 'Réserver mon pack',
    whatsapp: 'Discuter sur WhatsApp',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    mainNav: 'Navigation principale',
    mobileNav: 'Navigation mobile',
    whatsappMessage: 'Bonjour ALMERÍAGA, j’ai une question.',
  },

  language: {
    label: 'Langue',
    choose: 'Choisir la langue',
    current: 'Langue actuelle',
    hybridNote: 'Français + arabe algérien',
    switching: 'Changement de langue…',
  },

  common: {
    brandTagline: 'Global sourcing & micro-importation',
    priceOnRequest: 'Prix sur demande',
    warranty: 'Garantie {months} mois',
    warrantyShort: 'Garantie {months}m',
    callback: 'Demander un rappel',
    close: 'Fermer',
    all: 'Tous',
    whatsapp: 'WhatsApp',
    required: 'Champ obligatoire',
    noOnlinePayment: 'Sans paiement en ligne',
  },

  hero: {
    badge: 'Disponible sur réservation — Sourcing direct Espagne',
    title: 'De l’Espagne à votre porte.',
    titleAccent: 'من إسبانيا إلى باب منزلك',
    subtitle:
      'Global sourcing et micro-importation de haute précision. Commandez votre Pack PS5 Slim + GTA VI en toute sérénité avec paiement à la livraison dans votre wilaya.',
    ctaProducts: 'Voir les produits',
    ctaCallback: 'Demander un rappel',
    whatsapp: 'WhatsApp direct',
    trust: ['Importation déclarée', 'Facture & garantie', 'Paiement à la livraison'],
    route: {
      eyebrow: 'Sourcing international & logistique',
      corridor: 'Almería → Oran → Alger',
      spain: 'ESPAGNE',
      algeria: 'ALGÉRIE',
      almeria: 'Almería',
      oran: 'Oran',
      alger: 'Alger',
      bullets: ['Sourcing direct Almería', 'Traversée maritime sécurisée', 'Livraison à domicile (wilaya)'],
    },
    whatsappMessage: 'Bonjour ALMERÍAGA, je souhaite réserver le Pack PS5 Slim + GTA VI.',
  },

  products: {
    badge: 'Catalogue',
    title: 'Nos produits & équipements',
    lead:
      'Sélection rigoureuse de consoles, casques VR, PC gaming et accessoires. Disponibilité transparente et prix sur demande.',
    availability: {
      PreOrder: 'Disponible sur réservation',
      OnDemand: 'Sur commande',
      OnQuote: 'Sur devis',
      AtRelease: 'Disponible à la sortie',
      InStock: 'En stock',
    },
    items: {
      'ps5-slim-1to-gta6': {
        name: 'Pack PS5 Slim 1 To + GTA VI',
        bullets: ['Console PS5 Slim 1 To', 'Manettes sans fil', 'GTA VI', 'Facture et garantie vendeur'],
      },
      'ps5-edition-speciale': {
        name: 'PS5 Édition spéciale',
        bullets: ['Console Édition Spéciale', 'Manette assortie', 'Facture et garantie'],
      },
      'manette-dualsense': {
        name: 'Manette DualSense',
        bullets: ['Manette sans fil DualSense', 'Garantie vendeur'],
      },
      'casque-vr': {
        name: 'Casque VR (Meta Quest)',
        bullets: ['Casque VR haute définition', 'Facture et garantie'],
      },
      'lunettes-vr-mixte': {
        name: 'Lunettes VR / réalité mixte',
        bullets: ['Lunettes réalité mixte', 'Facture et garantie'],
      },
      'pc-gaming': {
        name: 'PC gaming',
        bullets: ['Configuration sur devis', 'Garantie pièces et main-d’œuvre'],
      },
      'gta-vi-seul': {
        name: 'GTA VI seul',
        bullets: ['Jeu GTA VI'],
      },
    },
  },

  pack: {
    badge: 'Le pack phare',
    title: 'Ce que contient votre pack PS5 + GTA VI',
    lead: 'Conçu pour les passionnés exigeants, sans compromis sur l’authenticité et la sécurité.',
    items: [
      { title: 'Console PS5 Slim 1 To', body: 'Neuve, avec lecteur de disques.' },
      { title: 'Manettes sans fil', body: 'Nombre confirmé lors de l’appel. Prêt à jouer dès le déballage.' },
      { title: 'GTA VI', body: 'Édition et remise confirmées lors de l’appel.' },
      { title: 'Facture et garantie vendeur', body: 'Facture remise avec le pack.' },
    ],
    banner: {
      badge: 'Ambiance exclusive',
      title: 'GTA VI — Sortie annoncée le 19/11/2026',
      body:
        'Imprégnez-vous de l’expérience ultime next-gen. Le pack officiel PS5 Slim 1 To + GTA VI vous garantit d’être prêt le jour J, avec confirmation téléphonique et paiement à la livraison dans votre wilaya.',
      eventLabel: 'Événement majeur',
      date: '19 NOVEMBRE 2026',
      note: 'Réservez dès maintenant pour sécuriser votre pack.',
    },
  },

  reserve: {
    badge: 'Réservation',
    title: 'Réserver votre pack',
    callbackDelay: 'dans la journée',
    note: 'Le délai de livraison exact vous est annoncé lors de l’appel de confirmation.',
    lead: 'Rappel sous {delay}. {note}',
    whatsapp: 'WhatsApp',
    whatsappMessage: 'Bonjour ALMERÍAGA, info PS5.',
    fallback: 'Le formulaire ne fonctionne pas ? Écrivez-nous, nous enregistrons votre demande à la main.',
  },

  how: {
    badge: 'Processus',
    title: 'Comment ça marche ?',
    lead: 'Quatre étapes simples, sécurisées et sans paiement en ligne.',
    steps: [
      { title: 'Réservation', body: 'Remplissez le formulaire en quelques secondes.' },
      { title: 'Appel de confirmation', body: 'Nous vous appelons dans la journée pour valider les détails.' },
      { title: 'Acheminement', body: 'Préparation soignée de votre pack et transport sécurisé.' },
      { title: 'Paiement à la livraison', body: 'Vous inspectez votre colis et payez à réception dans votre wilaya.' },
    ],
  },

  simulatorPreview: {
    badge: 'Outil revendeur',
    title: 'Simulateur de rentabilité & plafonds',
    lead:
      'Calculez instantanément vos coûts de revient, marges nettes, seuil de rentabilité et le respect du plafond légal de 1 800 000 DA par voyage.',
    stats: [
      { label: 'Plafond légal', value: '1,8M DA' },
      { label: 'Scénarios', value: '3 modes' },
      { label: 'Taux change', value: 'Réel / Banque' },
    ],
    cta: 'Ouvrir le simulateur complet',
    panelLabel: 'Aperçu direct',
    panelTitle: 'Maîtrisez votre micro-importation',
    panelBody:
      'Le simulateur intègre les frais de transport, ferry, douane et taux de change pour vous offrir une vision claire et sécurisée de votre activité.',
  },

  suppliers: {
    badge: 'Espace fournisseurs (démo)',
    title: 'Annuaire test de partenaires',
    lead:
      'L’annuaire réel de fournisseurs vérifiés arrive prochainement. Découvrez ci-dessous un aperçu fictif de démonstration.',
    all: 'Tous',
    categories: {
      'Consoles & Jeux': 'Consoles & Jeux',
      'Accessoires VR': 'Accessoires VR',
      'Composants PC': 'Composants PC',
      'Électronique générale': 'Électronique générale',
    },
    statuses: {
      'À vérifier': 'À vérifier',
      'En attente d’audit': 'En attente d’audit',
    },
    countries: { Espagne: 'Espagne' },
    notes: {
      'sup-1': 'Fiche d’exemple — aucun contact réel. Destinée aux tests de structure d’annuaire B2B.',
      'sup-2': 'Fiche d’exemple — aucun contact réel. Vérification des licences d’export en cours.',
      'sup-3': 'Fiche d’exemple — aucun contact réel. Partenaire potentiel pour les stations de jeu.',
      'sup-4': 'Fiche d’exemple — aucun contact réel. Sourcing de périphériques et accessoires.',
    },
    footerNote: 'Restez informé du lancement de l’annuaire vérifié.',
    cta: 'S’inscrire à la liste d’attente',
  },

  tracking: {
    badge: 'Informations administratives',
    title: 'Parcours & suivi de dossier micro-importateur',
    lead: 'Les 5 étapes clés réglementaires pour structurer votre activité en toute légalité en Algérie.',
    step: 'Étape {n}',
    steps: [
      { title: 'ANAE', body: 'Carte d’artisan / micro-entrepreneur.' },
      { title: 'CASNOS', body: 'Affiliation sécurité sociale non-salariés.' },
      { title: 'NIF / Registre', body: 'Identification fiscale et légale.' },
      { title: 'Préparation dossier', body: 'Justificatifs de voyage et factures.' },
      { title: 'Orientation visa', body: 'Démarches consulaires de sourcing.' },
    ],
    verifyTitle: 'Vérification de dossier',
    placeholder: 'Numéro de suivi (ex : ALM-2026-XXXX)',
    soon: 'Bientôt disponible',
    disclaimer:
      '* Aucune garantie d’obtention d’un visa ou d’un rendez-vous. ALMERÍAGA n’est pas un organisme officiel.',
  },

  about: {
    badge: 'À propos de nous',
    title: 'ALMERÍAGA — Sourcing & micro-importation',
    body:
      'Inspiré par les hubs de sourcing d’Almería, {brand} connecte les passionnés et revendeurs algériens aux équipements next-gen les plus recherchés. Fondé par {seller}, auto-entrepreneur micro-importateur ({city}, Algérie), nous défendons des valeurs de transparence totale, d’importation déclarée et de paiement à la livraison.',
    anae: 'N° ANAE',
    nif: 'NIF',
    hq: 'Siège',
  },

  faq: {
    badge: 'FAQ',
    title: 'Questions fréquentes',
    items: [
      {
        q: 'Le paiement se fait-il en ligne ?',
        a: 'Non. Aucun paiement en ligne n’est demandé. Vous réglez directement à la livraison lors de la réception de votre pack dans votre wilaya.',
      },
      {
        q: 'Quand serai-je rappelé après ma réservation ?',
        a: 'Notre équipe vous contacte dans la journée pour confirmer les détails de votre commande et planifier l’acheminement.',
      },
      {
        q: 'Les consoles sont-elles garanties ?',
        a: 'Oui, chaque console neuve bénéficie d’une garantie vendeur de 12 mois avec facture officielle.',
      },
    ],
  },

  home: {
    hero: {
      eyebrow: 'Espagne → Algérie',
      title: 'L’autre rive.',
      titleSecond: 'À votre portée.',
      lead:
        'Vos produits achetés en Espagne, remis en Algérie. Vous choisissez, un conseiller vous rappelle, vous payez à la remise.',
      cta: 'Découvrir le catalogue',
      note: 'Pas de paiement en ligne. Une confirmation humaine.',
    },
    map: {
      label: 'Itinéraire schématique',
      spain: 'Espagne',
      mediterranean: 'Méditerranée',
      algeria: 'Algérie',
      almeria: 'Almería',
      alicante: 'Alicante',
      oran: 'Oran',
      tlemcen: 'Tlemcen',
      sidi: 'Sidi Bel Abbès',
      caption: 'Almería / Alicante → Oran et l’ouest algérien',
    },
    trust: [
      {
        kicker: '01 / Cadre visé',
        title: 'Micro-importation déclarée',
        body: 'ANAE · NIF · CASNOS · autorisation à vérifier.',
      },
      {
        kicker: '02 / Remise',
        title: 'Oran et sa région',
        body: 'Oran, Tlemcen et Sidi Bel Abbès. Modalités à confirmer.',
      },
      {
        kicker: '03 / Transparence',
        title: 'Des prix en DZD',
        body: 'Prix et disponibilité confirmés par téléphone.',
      },
    ],
    steps: {
      eyebrow: 'Simple, du début à la remise.',
      title: 'Trois étapes.',
      titleSecond: 'Rien de superflu.',
      items: [
        { number: '01', title: 'Choisissez.', body: 'Parcourez les produits autorisés et envoyez votre demande.' },
        {
          number: '02',
          title: 'On vous rappelle.',
          body: 'Un conseiller confirme le produit, le prix et les modalités de remise.',
        },
        {
          number: '03',
          title: 'Payez à la remise.',
          body: 'Réglez lors de la remise de votre produit. Aucune carte bancaire en ligne.',
        },
      ],
    },
    faq: {
      eyebrow: 'Avant de vous lancer',
      title: 'Tout simplement,',
      titleSecond: 'en toute clarté.',
      lead: 'Les réponses utiles pour une première demande sereine.',
      items: [
        {
          q: 'Comment passer commande ?',
          a: "Choisissez un produit et laissez vos coordonnées. Un conseiller vous appelle pour confirmer votre demande avant toute remise.",
        },
        {
          q: 'Quand et comment payer ?',
          a: "Le paiement se fait à la remise. Aucun paiement en ligne, aucun numéro de carte bancaire ne vous est demandé.",
        },
        {
          q: 'Où la remise est-elle possible ?',
          a: "Les zones prévues sont Oran, Tlemcen et Sidi Bel Abbès. Le lieu, le délai et les modalités sont à confirmer avec le conseiller.",
        },
        {
          q: 'Les prix et disponibilités sont-ils définitifs ?',
          a: "Non. Les montants présentés sont des exemples à remplacer. Le conseiller confirme le prix en DZD et la disponibilité avant votre accord.",
        },
        {
          q: 'Quels produits peuvent être demandés ?',
          a: "Almeríaga est une plateforme multiproduits. Seuls les produits autorisés et compatibles avec le cadre applicable peuvent être proposés.",
        },
      ],
    },
    cta: {
      eyebrow: 'Votre prochaine demande commence ici.',
      title: 'À vous de choisir.',
      lead: 'Découvrez les produits, nous nous occupons de la confirmation.',
      button: 'Découvrir le catalogue',
    },
  },

  shop: {
    catalogue: {
      eyebrow: 'La sélection · Espagne → Algérie',
      title: 'À chaque besoin, son produit.',
      lead:
        'Soin, accessoires ou quotidien : une sélection multiproduits, sans détour. Entrez dans une fiche pour préparer votre demande.',
      notice:
        'Les prix affichés sont des exemples à remplacer. La disponibilité et le prix en DZD seront confirmés par un conseiller.',
      categoryLabel: 'Catégorie',
      count: '4 produits exemples',
      all: 'Tout voir',
      categories: { personal: 'Soin personnel', accessories: 'Accessoires', daily: 'Quotidien' },
      available: 'Disponible',
      order: 'Sur commande',
      priceNote: 'Prix d’exemple · à remplacer',
      availableNote: 'Disponible : demande de confirmation possible. Sur commande : devis préalable, sans prix ferme.',
      legalNote: 'Seuls les produits autorisés peuvent être proposés.',
      items: {
        lisseur: { name: 'Lisseur', price: '6 500 DZD', category: 'personal', status: 'available' },
        tondeuse: { name: 'Tondeuse', price: '9 000 DZD', category: 'personal', status: 'order' },
        ecouteurs: { name: 'Pack écouteurs', price: '3 500 DZD', category: 'accessories', status: 'available' },
        capsules: { name: 'Capsules café · lot de 50', price: '4 000 DZD', category: 'daily', status: 'order' },
      },
    },
    product: {
      breadcrumb: 'Catalogue / Soin personnel / Lisseur',
      title: 'Lisseur',
      price: '6 500 DZD',
      estimate:
        'Estimation · prix d’exemple à remplacer. Prix et disponibilité à confirmer par téléphone.',
      sectionEyebrow: 'Un essentiel du quotidien',
      body:
        'Un lisseur pour votre routine de soin personnel, acheté en Espagne. Le modèle, les caractéristiques exactes et le contenu du produit sont à vérifier et à préciser avant publication.',
      genericBody:
        'Un accessoire du quotidien, acheté en Espagne. Le modèle, les caractéristiques exactes et le contenu du produit sont à vérifier et à préciser avant publication.',
      originLabel: 'Origine d’achat',
      origin: 'Espagne · Almería / Alicante',
      handoverLabel: 'Remise prévue',
      handover: 'Oran, Tlemcen, Sidi Bel Abbès',
      paymentLabel: 'Règlement',
      payment: 'À la remise, après confirmation',
      gallery: ['Vue principale', 'Détail', 'Vue d’ensemble'],
      requestTitle: 'Votre demande, simplement.',
      requestLead: 'Aucun paiement en ligne. Un conseiller vous rappelle pour confirmer les détails.',
      submit: 'Confirmer ma demande',
      formNote:
        'Vos informations servent uniquement au suivi de cette demande. Aucun envoi n’est effectué dans cette maquette.',
      whatsapp: 'Ou via WhatsApp · numéro à renseigner',
      security:
        'Aucune saisie de carte bancaire. La demande ne vaut pas confirmation : un conseiller valide les détails avec vous avant la remise.',
    },
    quote: {
      breadcrumb: 'Catalogue / Sur commande / Produit exemple',
      eyebrow: 'Sélection à définir · Espagne',
      title: 'Votre besoin.',
      titleSecond: 'Une recherche dédiée.',
      lead:
        'Produit générique d’exemple, sans modèle ni marque définis. Le visuel et la référence seront ajoutés après vérification.',
      badge: 'Sur commande / sans prix ferme',
      stepsEyebrow: 'Comment cela se passe',
      steps: [
        {
          title: 'Décrivez le produit',
          body: 'Précisez la référence recherchée, les quantités et les détails utiles.',
        },
        {
          title: 'Nous vérifions la faisabilité',
          body: 'Le produit doit être autorisé. La disponibilité et les modalités restent à confirmer.',
        },
        {
          title: 'Vous validez le devis',
          body: 'Un conseiller vous rappelle. Aucun prix ferme ni délai garanti n’est affiché ici.',
        },
      ],
      panelTitle: 'Produit sur commande',
      panelLead:
        'Prix sur devis. Décrivez votre besoin : nous vous recontactons pour en vérifier les possibilités, sans engagement de disponibilité.',
      requestTitle: 'Votre demande de devis.',
      submit: 'Demander un devis',
      whatsapp: 'WhatsApp · numéro à renseigner',
      security:
        'Pas de paiement en ligne. En cas de confirmation, le règlement se fait à la remise selon les modalités convenues avec le conseiller.',
    },
  },

  request: {
    name: 'Nom',
    namePlaceholder: 'Votre nom complet',
    phone: 'Téléphone',
    phoneHint: 'Numéro mobile algérien. Nous vous rappelons pour confirmer.',
    wilaya: 'Wilaya',
    wilayaPlaceholder: 'Sélectionner une wilaya',
    wilayaHint: 'Oran, Tlemcen ou Sidi Bel Abbès.',
    message: 'Message (facultatif)',
    messagePlaceholder: 'Une précision à partager ?',
    messageRequired: 'Votre besoin',
    messageRequiredPlaceholder: 'Produit, quantité et précisions utiles…',
    store: 'Nom du magasin',
    storePlaceholder: 'Votre enseigne',
    shopType: 'Type de commerce',
    shopTypePlaceholder: 'Choisir votre activité',
    volume: 'Volume envisagé',
    volumePlaceholder: 'Quantités ou fréquence estimées',
    consent:
      'J’accepte que mes informations soient utilisées pour traiter ma demande et me recontacter. Voir les mentions légales.',
    sending: 'Envoi en cours',
    error: 'Une erreur est survenue. Réessayez dans un instant.',
    errors: {
      name: 'Indiquez votre nom.',
      phone: 'Entrez un numéro mobile algérien valide (ex : 0550 12 34 56).',
      wilaya: 'Choisissez votre wilaya.',
      message: 'Indiquez votre besoin.',
      consent: 'Votre accord est nécessaire pour traiter la demande.',
      store: 'Indiquez le nom de votre magasin.',
      volume: 'Précisez le volume envisagé.',
    },
  },

  trade: {
    gros: {
      eyebrow: 'Professionnels / Gros',
      title: 'Un besoin en quantité.',
      titleSecond: 'Un échange dédié.',
      lead:
        'Faites-nous part de votre recherche en gros. Nous étudions le besoin et la possibilité d’approvisionnement en Espagne, uniquement pour les produits autorisés.',
      blockEyebrow: 'Une proposition, après échange.',
      blockTitle: 'Pas de tarif public.',
      blockSecond: 'Un besoin d’abord.',
      blockLead:
        'Indiquez les produits, les quantités et la wilaya de remise souhaitée. Le conseiller vous rappelle pour préciser votre demande et vérifier sa faisabilité.',
      bullets: [
        'Produits et volumes à étudier au cas par cas.',
        'Prix, disponibilité et modalités soumis à confirmation.',
        'Aucun délai garanti et aucun paiement en ligne.',
      ],
      notice:
        'Ce formulaire ouvre un échange commercial. Il ne constitue ni une commande confirmée ni un engagement d’approvisionnement.',
      whatsapp: 'Préférer WhatsApp · numéro à renseigner',
      formTitle: 'Décrivez votre besoin.',
      submit: 'Envoyer ma demande gros',
    },
    revendeurs: {
      eyebrow: 'Professionnels / Revendeurs',
      title: 'Votre commerce.',
      titleSecond: 'Notre point de départ.',
      lead:
        'Vous avez un magasin à Oran, Tlemcen ou Sidi Bel Abbès ? Présentez votre activité pour ouvrir un échange adapté à votre besoin de revente.',
      blockEyebrow: 'Un parcours pour votre activité',
      steps: [
        { number: '01', title: 'Présentez votre magasin.' },
        { number: '02', title: 'Précisez votre activité et vos volumes.' },
        { number: '03', title: 'Échangez avec un conseiller.' },
      ],
      blockLead:
        'Ce parcours est distinct d’une demande d’achat en gros ponctuelle. Il sert à comprendre votre commerce et ses besoins de revente, sans engagement automatique de partenariat.',
      notice:
        'Produits autorisés uniquement. Tarifs, volumes, disponibilité et conditions seront étudiés lors de l’échange. Aucune condition commerciale n’est présumée acquise.',
      formTitle: 'Parlons de votre commerce.',
      submit: 'Envoyer ma demande revendeur',
    },
  },

  contactPage: {
    eyebrow: 'Le contact reste humain.',
    title: 'Une question ? Parlons-en.',
    lead:
      'Pour un produit, une demande en cours ou une précision sur la remise, préparez votre question et votre wilaya. Aucun paiement ne vous sera demandé en ligne.',
    whatsappEyebrow: 'Le canal privilégié',
    whatsappTitle: 'WhatsApp',
    whatsappBody: 'Échangez avec un conseiller pour préciser votre besoin.',
    whatsappCta: 'Écrire sur WhatsApp',
    whatsappNote: 'Numéro officiel affiché ci-dessous.',
    emailEyebrow: 'Si vous préférez écrire',
    emailTitle: 'E-mail',
    emailBody:
      'Décrivez votre demande et indiquez vos coordonnées de rappel. Évitez de transmettre des documents sensibles par défaut.',
    emailCta: 'Contacter par e-mail',
    emailNote: 'Adresse officielle affichée ci-dessous.',
    algeriaEyebrow: 'Côté Algérie',
    algeriaTitle: 'Oran · Tlemcen · Sidi Bel Abbès',
    algeriaBody: 'Le lieu, les modalités et la disponibilité sont à confirmer avec le conseiller.',
    hoursEyebrow: 'Disponibilités',
    hoursBody: 'Un conseiller vous rappelle selon les demandes en cours.',
    hoursNote: 'Aucun délai de réponse garanti n’est annoncé.',
    notice:
      'Aucun paiement en ligne. Les coordonnées affichées sont celles de l’exploitant et peuvent être vérifiées avant mise en ligne.',
  },

  thanks: {
    eyebrow: 'C’est bien reçu.',
    title: 'Merci.',
    titleSecond: 'La suite est humaine.',
    body1:
      'Votre demande a bien été reçue. Un conseiller vous rappelle pour confirmer le produit, le prix et les modalités de remise.',
    body2:
      'Gardez votre téléphone à portée de main. Aucun paiement n’est demandé maintenant : vous payez à la remise.',
    cta: 'Retour au catalogue',
    stepsEyebrow: 'Et maintenant ?',
    notice: 'Aucun paiement en ligne. Le conseiller confirme prix, disponibilité et lieu avant tout accord.',
  },

  legalPage: {
    eyebrow: 'Un cadre à vérifier, pas une promesse.',
    title: 'Déclarer. Vérifier. Puis avancer.',
    lead:
      'Almeríaga vise une activité de micro-importation déclarée. Cette page présente les démarches à vérifier ; elle n’atteste ni d’une inscription obtenue ni d’une autorisation délivrée.',
    notice:
      'Avant publication : faire contrôler les justificatifs ANAE, CASNOS, NIF et l’autorisation du Ministère du Commerce Extérieur. Aucun numéro ni agrément n’est fourni dans cette maquette.',
  },

  authPage: {
    eyebrow: 'Almeríaga / votre espace',
    title: 'Bienvenue,',
    titleSecond: 'tout simplement.',
    lead:
      'Connectez-vous ou créez votre compte pour retrouver votre espace Almeríaga. Aucun paiement en ligne, ici non plus.',
    panelTitle: 'Ravi de vous retrouver.',
    panelLead: 'Choisissez une méthode pour continuer.',
    google: 'Continuer avec Google',
    or: 'ou',
    phone: 'Téléphone',
    phonePlaceholder: 'Votre numéro',
    phoneHint: 'Indicatif international requis. Le code sera envoyé après validation.',
    email: 'E-mail',
    emailPlaceholder: 'Votre adresse e-mail',
    submit: 'Recevoir un code',
    signup: 'Créer mon compte',
    note: 'Le code n’est jamais envoyé par cette maquette.',
    privacy: 'Les informations personnelles et leurs usages sont à documenter avant mise en ligne.',
  },

  form: {
    name: 'Nom complet',
    namePlaceholder: 'Ex : Karim Benali',
    phone: 'Téléphone mobile',
    phonePlaceholder: '0550 12 34 56',
    phoneHint: 'Nous vous appelons sur ce numéro pour confirmer.',
    wilayaRetail: 'Wilaya de livraison',
    wilayaWholesale: 'Wilaya',
    wilayaWaitlist: 'Wilaya (facultatif)',
    choose: 'Choisir…',
    unavailable: ' (non desservie)',
    quantity: 'Quantité',
    packOne: '{n} pack',
    packMany: '{n} packs',
    volume: 'Volume souhaité',
    shop: 'Nom de la boutique (facultatif)',
    message: 'Message / produit souhaité',
    messagePlaceholder: 'Précisez le modèle, la quantité ou votre question…',
    messageHint: 'Facultatif — 500 caractères maximum.',
    volumes: {
      '5-9': '5 à 9 consoles',
      '10-24': '10 à 24 consoles',
      '25-49': '25 à 49 consoles',
      '50+': '50 consoles ou plus',
    },
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
    thanks: 'Merci',
    thanksWithName: 'Merci {name}',
    thanksSeparator: ', ',
    successBody: 'Nous vous appelons au {phone} dans la journée. Gardez votre téléphone à portée.',
    successNoPayment: 'Aucun paiement n’est demandé avant la livraison.',
    errorGeneral: 'Une erreur est survenue. Réessayez dans un instant.',
    errorNetwork: 'La connexion a échoué. Vérifiez votre réseau puis réessayez.',
    errorWhatsapp: 'Nous écrire sur WhatsApp',
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
    whatsappRetailMessage: 'Bonjour ALMERÍAGA, je souhaite réserver le {product}.',
    whatsappWholesaleMessage: 'Bonjour ALMERÍAGA, je souhaite acheter en gros.',
  },

  footer: {
    role: 'Auto-entrepreneur · Micro-importateur',
    anae: 'N° ANAE',
    nif: 'NIF',
    city: 'Algérie',
    navTitle: 'Navigation',
    contactTitle: 'Contact par pôle',
    poles: {
      general: 'Général',
      orders: 'Commandes',
      wholesale: 'Revendeurs',
      suppliers: 'Fournisseurs',
      support: 'Support',
    },
    whatsappMessage: 'Bonjour ALMERÍAGA, j’ai une question.',
    rights: 'Tous droits réservés.',
    legal: 'Mentions légales',
    tagline:
      'Un lien simple entre l’Espagne et l’Algérie. Des produits autorisés, une confirmation humaine, un paiement à la remise.',
    twoShores: 'Deux rives, un lien.',
    route: 'Almería · Alicante → Oran',
    routeCities: 'Tlemcen · Sidi Bel Abbès',
    noPayment: 'Aucun paiement en ligne.',
    copyright: '© Almeríaga — Espagne → Algérie',
    legalNote: 'Micro-importation · Algérie',
    trademarks:
      'PlayStation et PS5 sont des marques de Sony Interactive Entertainment ; ALMERÍAGA n’est pas affilié à Sony. Grand Theft Auto est une marque de Take-Two Interactive.',
  },

  pages: {
    gros: {
      badge: 'Espace B2B / Revendeurs',
      title: 'Approvisionnement en gros',
      titleAccent: 'البيع بالجملة',
      lead:
        'Vous possédez une boutique de jeux vidéo ou êtes revendeur ? Bénéficiez de conditions privilégiées et d’un approvisionnement direct et régulier.',
      features: [
        {
          title: 'Tarifs dégressifs',
          body: 'Marges attractives pour les boutiques partenaires selon les volumes commandés (à partir de 5 unités).',
        },
        {
          title: 'Produits vérifiés',
          body: 'Consoles neuves d’origine, emballées et garanties. Traçabilité et conformité assurées.',
        },
        {
          title: 'Suivi dédié',
          body: 'Un interlocuteur unique pour vos commandes, vos plannings de livraison et vos questions logistiques.',
        },
      ],
      formBadge: 'Rappel B2B',
      formTitle: 'Demander un rappel',
      formAccent: 'طلب اتصال',
      formLead: 'Indiquez vos coordonnées et votre volume prévisionnel.',
      contactLabel: 'Contact direct',
      whatsappMessage: 'Bonjour ALMERÍAGA, je suis revendeur et souhaite des informations sur l’achat en gros.',
    },
    suppliers: {
      badge: 'Bientôt disponible',
      title: 'Espace fournisseurs & micro-importateurs',
      titleAccent: 'فضاء الموردين',
      lead:
        'Guides pratiques (ANAE, CASNOS, douanes), annuaire de sourcing et bonnes pratiques pour réussir votre micro-importation en toute légalité.',
      cards: [
        {
          title: 'Guides ANAE / CASNOS',
          body: 'Toutes les démarches administratives pour déclarer votre activité d’auto-entrepreneur sans ambiguïté.',
        },
        {
          title: 'Annuaire vérifié',
          body: 'Répertoire de contacts et grossistes de confiance testés sur le terrain.',
        },
        {
          title: 'Modèles de messages',
          body: 'Scripts professionnels pour négocier et communiquer efficacement avec vos fournisseurs à l’étranger.',
        },
        {
          title: 'Check-list voyage & visa',
          body: 'Conseils logistiques et préparation de voyage. (Aucune vente de rendez-vous visa ou fausse invitation).',
        },
      ],
      formBadge: 'Liste d’attente',
      formTitle: 'Être prévenu(e) du lancement',
      formAccent: 'سجل الآن',
      formLead: 'Inscrivez-vous pour recevoir l’accès dès l’ouverture des ressources.',
      contactLabel: 'Contact',
      whatsappMessage: 'Bonjour ALMERÍAGA, je souhaite en savoir plus sur l’espace fournisseurs.',
    },
    catalogue: {
      eyebrow: 'Catalogue',
      title: 'Sourcing Espagne, livraison Algérie',
      subtitle: 'شريكك الموثوق في الاستيراد والخدمات اللوجستية إسبانيا-الجزائر',
    },
    legal: {
      badge: 'Conformité',
      intro: 'Informations obligatoires conformément à la législation en vigueur.',
      eyebrow: 'Transparence / document de travail',
      title: 'Mentions légales.',
      lead: 'Une structure de lecture complète, à renseigner et à faire vérifier avant publication. Les champs entre crochets ne constituent pas des informations légales vérifiées.',
      notice: 'Document incomplet pour une mise en ligne. Aucune conformité n’est affirmée : les informations de l’exploitant et ses justificatifs n’ont pas été fournis.',
    },
  },

  catalogGrid: {
    filterLabel: 'Filtrer par catégorie',
    all: 'Tous',
    categories: {
      'High-Tech': 'High-Tech',
      'Beauté & Soins': 'Beauté & Soins',
      'Café & Épicerie': 'Café & Épicerie',
      Parfums: 'Parfums',
      Accessoires: 'Accessoires',
    },
    mockNote: 'Tarifs indicatifs à confirmer lors de l’appel. Les produits affichés sont des exemples.',
    visualSoon: 'Visuel à venir',
    onOrder: 'Sur commande',
    spain: 'Espagne',
    delivered: 'Livré Algérie (est.)',
    minimum: 'Minimum {n} unités',
    cta: 'Simuler la marge & commander en gros',
    empty: 'Aucun produit dans cette catégorie pour le moment.',
    profit: {
      eyebrow: 'Simulation indicative',
      quantity: 'Quantité',
      minHint: 'Minimum {n} unités',
      sellPrice: 'Prix de vente visé (DZD / unité)',
      belowMin: 'Quantité inférieure au minimum de commande.',
      capOver: 'Dépassement du plafond de 1 800 000 DA',
      capNear: 'Proche du plafond (plus de 90 %)',
      capUnder: 'Sous le plafond de 1 800 000 DA',
      declared: 'Valeur déclarée estimée : {value} (taux {rate} DA/€, indicatif).',
      totalCost: 'Coût total livré',
      totalRevenue: 'Recette totale',
      netMargin: 'Marge nette',
      margin: 'Marge',
      disclaimer: 'Estimation indicative, non contractuelle. Hors frais de livraison, retours et publicité.',
      cta: 'Commander en gros',
    },
  },

  simulator: {
    badge: 'Simulateur officiel',
    title: 'Simulateur de rentabilité',
    titleAccent: 'محاكي الربحية',
    lead: 'Estimez vos coûts et marges par voyage (plafond légal 1 800 000 DA).',
    reset: 'Réinitialiser',
    paramsTitle: 'Paramètres principaux',
    labels: {
      bankRate: 'Taux bancaire (DZD/€)',
      realRate: 'Taux réel (DZD/€)',
      unitPrice: 'Prix unitaire d’achat (€)',
      quantity: 'Quantité',
      sellDetail: 'Prix de vente détail (DZD)',
      ferry: 'Ferry & voyage (€)',
      packGame: 'Coût jeu / GTA VI (DZD)',
      packControllers: 'Coût manettes supp. (DZD)',
      packOther: 'Autres accessoires (DZD)',
    },
    packTitle: 'Coûts du pack détail (DZD)',
    summary: 'Synthèse',
    overCap: '⚠️ Dépassement 1.8M DA',
    compliant: '✓ Conforme 1.8M DA',
    declaredValue: 'Valeur déclarée',
    unitCost: 'Coût de revient',
    fixedCosts: 'Frais fixes totaux',
    chartTitle: 'Comparatif coûts vs recettes (scénario détail)',
    chartHandmade: 'SVG fait main',
    costsTotal: 'Coûts totaux',
    revenue: 'Recettes',
    scenarios: 'Scénarios',
    roi: 'ROI : {value}',
    threshold: 'Seuil : {value}',
    unitShort: '{n} u',
    disclaimer:
      '* Estimation indicative, non contractuelle. Marges avant frais de livraison, retours, publicité, et coût du jeu/manettes du pack.',
    scenarioLabels: { superGros: 'Super gros', gros: 'Gros', detail: 'Détail' },
  },

  api: {
    forbidden: 'Origine non autorisée.',
    invalidFormat: 'Format de requête invalide.',
    invalidRequest: 'Requête invalide.',
    unreadable: 'Requête illisible.',
    tooLarge: 'Requête trop volumineuse.',
    rateLimited: 'Trop de tentatives. Réessayez dans quelques minutes.',
    tooFast: 'Merci de réessayer dans un instant.',
    validationSummary: 'Certains champs sont invalides.',
    misconfigured: 'Service momentanément indisponible.',
    upstream: 'Nous n’avons pas pu enregistrer votre demande. Écrivez-nous sur WhatsApp.',
  },
};
