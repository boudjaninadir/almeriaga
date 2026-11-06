/**
 * i18n spec V4 §6 : locale déduite de l'IP (header Vercel x-vercel-ip-country).
 * DZ → fr-DZ (français + tournures algériennes naturelles, drapeau 🇩) ;
 * FR → fr ; ES → es ; autres → en. Aucun contenu arabe.
 */
export type Locale = 'fr-DZ' | 'fr' | 'es' | 'en';

export const LOCALES: readonly Locale[] = ['fr-DZ', 'fr', 'es', 'en'];

export function localeFromCountry(country: string | null): Locale {
  const c = (country ?? '').toUpperCase();
  if (c === 'DZ') return 'fr-DZ';
  if (c === 'FR') return 'fr';
  if (c === 'ES') return 'es';
  return 'en';
}

type Entry = { fr: string; dz: string; es: string; en: string };
const D: Record<string, Entry> = {
  nav_products: { fr: 'Produits', dz: 'Produits', es: 'Productos', en: 'Products' },
  nav_legal: { fr: 'Cadre légal', dz: 'Cadre légal', es: 'Marco legal', en: 'Legal framework' },
  nav_contact: { fr: 'Contact', dz: 'Contact', es: 'Contacto', en: 'Contact' },
  nav_home: { fr: 'Accueil', dz: 'Accueil', es: 'Inicio', en: 'Home' },
  nav_suppliers_eu: { fr: 'Fournisseur EU', dz: 'Fournisseur EU', es: 'Proveedor EU', en: 'EU Supplier' },
  nav_suppliers_dz: { fr: 'Fournisseur DZ', dz: 'Fournisseur DZ', es: 'Proveedor DZ', en: 'DZ Supplier' },
  nav_procedure: { fr: 'Procédure ANAE', dz: 'Procédure ANAE', es: 'Procedimiento ANAE', en: 'ANAE procedure' },
  cta_start: { fr: 'Commencer gratuitement', dz: 'Commencer gratuitement', es: 'Empezar gratis', en: 'Start for free' },
  cta_signin: { fr: 'Sign In', dz: 'Sign In', es: 'Sign In', en: 'Sign In' },
  hero_eyebrow: {
    fr: 'Europe → toutes les wilayas d’Algérie',
    dz: 'Europe → chez vous, dans toutes les wilayas 🇩🇿',
    es: 'Europa → todas las wilayas de Argelia',
    en: 'Europe → every wilaya of Algeria',
  },
  hero_title: {
    fr: 'Des produits choisis en Europe, livrés près de vous.',
    dz: 'Des produits khoya, choisis en Europe et livrés jusqu’à votre porte.',
    es: 'Productos seleccionados en Europa, entregados cerca de usted.',
    en: 'Products selected in Europe, delivered near you.',
  },
  hero_lead: {
    fr: 'Micro-importation en règle : vous choisissez, nous confirmons par téléphone, vous payez à la remise. Aucun paiement en ligne, prix en dinars.',
    dz: 'Micro-importation déclarée, sans stress : vous choisissez, on vous appelle pour confirmer, et vous payez à la remise. Zéro paiement en ligne, prix en dinars.',
    es: 'Microimportación declarada: usted elige, confirmamos por teléfono y paga en la entrega. Sin pago en línea, precios en dinares.',
    en: 'Compliant micro-import: you choose, we confirm by phone, you pay on delivery. No online payment, prices in dinars.',
  },
  badge_legal: { fr: 'Cadre ANAE', dz: 'Cadre ANAE', es: 'Marco ANAE', en: 'ANAE framework' },
  badge_delivery: { fr: 'Livraison toutes wilayas', dz: 'Livraison 68 wilayas, tranquille', es: 'Entrega en todas las wilayas', en: 'Delivery to all wilayas' },
  badge_dzd: { fr: 'Prix en DZD', dz: 'Prix en DZD', es: 'Precios en DZD', en: 'Prices in DZD' },
  products_title: { fr: 'Nos produits', dz: 'Nos produits', es: 'Nuestros productos', en: 'Our products' },
  products_lead: {
    fr: 'Chaque fiche indique le statut et le prix en dinars. Livraison dans toutes les wilayas d’Algérie.',
    dz: 'Chaque fiche vous donne le statut et le prix en dinars. On livre partout en Algérie, 68 wilayas.',
    es: 'Cada ficha indica estado y precio en dinares. Entrega en todas las wilayas de Argelia.',
    en: 'Each listing shows status and price in dinars. Delivery across all wilayas of Algeria.',
  },
  price_gros: { fr: 'Prix Gros', dz: 'Prix Gros', es: 'Precio mayorista', en: 'Wholesale price' },
  price_gros_note: {
    fr: 'Le prix gros n’est pas public : laissez vos coordonnées, nous vous rappelons.',
    dz: 'Le prix gros ne s’affiche pas : laissez votre numéro, on vous appelle direct.',
    es: 'El precio mayorista no es público: deje sus datos y le llamamos.',
    en: 'Wholesale price is not public: leave your details and we call you back.',
  },
  offers_title: { fr: 'Abonnements fournisseurs', dz: 'Abonnements fournisseurs', es: 'Suscripciones proveedores', en: 'Supplier subscriptions' },
  offers_lead: {
    fr: 'Accédez à la base de fournisseurs vérifiés et à l’accompagnement complet.',
    dz: 'Accédez à la base de fournisseurs vérifiés et à l’accompagnement complet, step by step.',
    es: 'Acceda a la base de proveedores verificados y al acompañamiento completo.',
    en: 'Access the verified supplier database and full guidance.',
  },
  form_nom: { fr: 'Nom', dz: 'Nom', es: 'Apellido', en: 'Surname' },
  form_prenom: { fr: 'Prénom', dz: 'Prénom', es: 'Nombre', en: 'First name' },
  form_phone: { fr: 'Téléphone', dz: 'Téléphone', es: 'Teléfono', en: 'Phone' },
  form_submit: { fr: 'Être rappelé(e)', dz: 'Être rappelé(e)', es: 'Ser llamado(a)', en: 'Get a call back' },
  form_consent: {
    fr: 'J’accepte d’être contacté(e) au numéro indiqué pour traiter ma demande.',
    dz: 'J’accepte qu’on me contacte sur ce numéro pour ma demande.',
    es: 'Acepto ser contactado(a) en este número para gestionar mi solicitud.',
    en: 'I agree to be contacted on this number about my request.',
  },
  procedure_title: { fr: 'Procédure ANAE de A à Z', dz: 'Procédure ANAE de A à Z', es: 'Procedimiento ANAE de la A a la Z', en: 'ANAE procedure from A to Z' },
  procedure_lead: {
    fr: 'Toutes les étapes officielles : carte auto-entrepreneur, autorisation, douane, visa et documents.',
    dz: 'Toutes les étapes officielles, expliquées clair : carte, autorisation, douane, visa et papiers.',
    es: 'Todos los pasos oficiales: tarjeta, autorización, aduana, visado y documentos.',
    en: 'All official steps: card, authorization, customs, visa and documents.',
  },
  footer_tagline: {
    fr: 'Micro-importation depuis l’Europe vers toutes les wilayas d’Algérie. Commande sans paiement en ligne, confirmation par téléphone.',
    dz: 'Micro-importation depuis l’Europe vers les 68 wilayas. Vous commandez sans payer en ligne, on confirme par téléphone.',
    es: 'Microimportación desde Europa a todas las wilayas de Argelia. Pedido sin pago en línea, confirmación por teléfono.',
    en: 'Micro-import from Europe to every wilaya of Algeria. Order with no online payment, phone confirmation.',
  },
};

export type TKey = keyof typeof D;

export function t(locale: Locale, key: TKey): string {
  const entry = D[key];
  if (locale === 'fr-DZ') return entry.dz;
  if (locale === 'es') return entry.es;
  if (locale === 'en') return entry.en;
  return entry.fr;
}
