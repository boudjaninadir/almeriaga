import type { Metadata } from 'next';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Structure des mentions légales d’Almeríaga, à compléter et vérifier avant publication.',
};

const SECTIONS = [
  {
    number: 'Document / 01',
    title: 'Identité de l’exploitant',
    fields: [
      '[Nom ou dénomination de l’exploitant]',
      '[Statut et forme juridique, si applicable]',
      '[Adresse professionnelle]',
      '[Responsable de publication]',
    ],
    body: 'Almeríaga est le nom présenté dans cette maquette. L’identité juridique de l’exploitant reste à documenter.',
  },
  {
    number: 'Document / 02',
    title: 'Coordonnées',
    fields: ['[Adresse e-mail de contact]', '[Numéro de téléphone international]', '[Adresse de correspondance]'],
    body: 'Remplacer ces champs par des coordonnées vérifiées et actives avant publication.',
  },
  {
    number: 'Document / 03',
    title: 'Cadre administratif',
    fields: [
      '[ANAE : inscription et justificatif à vérifier]',
      '[NIF : identifiant à renseigner et vérifier]',
      '[CASNOS : affiliation à renseigner et vérifier]',
      '[Autorisation du Ministère du Commerce Extérieur : référence, validité et périmètre à vérifier]',
    ],
    body: 'Aucun justificatif n’a été fourni. Cette maquette ne permet pas d’affirmer la conformité ni l’autorisation de l’entreprise.',
  },
  {
    number: 'Document / 04',
    title: 'Hébergement',
    fields: ['[Dénomination de l’hébergeur]', '[Adresse et coordonnées de l’hébergeur]', '[Pays et localisation des données à préciser]'],
    body: 'Les informations doivent correspondre au prestataire retenu pour la mise en production.',
  },
  {
    number: 'Document / 05',
    title: 'Demandes et règlement',
    fields: ['[Conditions de demande, de confirmation et de remise à compléter]'],
    body: 'La demande est soumise à confirmation téléphonique par un conseiller. Le paiement est prévu à la remise, sans paiement en ligne. Prix, disponibilité, lieu et modalités doivent être confirmés avant accord.',
  },
  {
    number: 'Document / 06',
    title: 'Données personnelles',
    fields: [
      '[Responsable du traitement et contact dédié]',
      '[Destinataires et éventuels prestataires]',
      '[Durée de conservation à définir]',
      '[Lieu de stockage et transferts éventuels à préciser]',
    ],
    body: 'Les formulaires prévoient de recueillir le nom, le téléphone, la wilaya et le message, ainsi que les métadonnées de la demande. Finalité prévue : traiter la demande et recontacter la personne. Le consentement doit être explicite et non précoché. Aucun envoi effectif n’est réalisé par la maquette.',
  },
  {
    number: 'Document / 07',
    title: 'Vos droits et demandes',
    fields: ['[Adresse de contact pour exercer vos droits]', '[Procédure de traitement et délais applicables à préciser]'],
    body: 'Les droits d’accès, de rectification, de suppression et les modalités de retrait du consentement sont à documenter selon les règles applicables. Faites vérifier cette information avant publication.',
  },
  {
    number: 'Document / 08',
    title: 'Cookies et mesure d’audience',
    fields: ['[Outils effectivement utilisés à inventorier]', '[Gestion du consentement à définir si nécessaire]'],
    body: 'Aucun dispositif de suivi n’est mis en œuvre par ce design. Documenter les outils, leurs finalités et leur fonctionnement avant toute mise en production.',
  },
  {
    number: 'Document / 09',
    title: 'Contenus et mise à jour',
    fields: ['[Crédits, droits sur les visuels et contenus à renseigner]', '[Date de dernière mise à jour à compléter]'],
    body: 'Les visuels et les prix sont des exemples de maquette. Les caractéristiques des produits, les contenus et les présentes mentions sont à vérifier avant publication.',
  },
];

export default function MentionsLegalesPage() {
  const { dict, locale } = getLocaleContext();
  const page = dict.pages.legal;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1 className="mt-6 display-1">{page.title}</h1>
      <p className="mt-6 max-w-[820px] font-sans text-[16px] leading-[1.65] text-ink">{page.lead}</p>

      <div className="mt-8 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">i</span>
        <div className="space-y-2">
          <p className="font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
          {locale !== 'fr' && (
            <p className="font-sans text-[12px] leading-[1.6] text-gold-ink">
              Version française de référence — les informations juridiques doivent être validées avant publication.
            </p>
          )}
        </div>
      </div>

      <div className="mt-12 divide-y divide-chalk border-t border-chalk">
        {SECTIONS.map((section) => (
          <section key={section.number} className="grid gap-6 py-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">{section.number}</p>
              <h2 className="mt-5 font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[32px]">
                {section.title}
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-1 font-sans text-[14px] leading-[1.7] text-ink">
                {section.fields.map((field) => (
                  <p key={field}>{field}</p>
                ))}
              </div>
              <p className="mt-4 font-sans text-[16px] leading-[1.65] text-ink">{section.body}</p>
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 max-w-[860px] font-sans text-[13px] leading-[1.6] text-stone">
        Cette maquette ne remplace pas un examen juridique du projet et des obligations applicables à l’activité.
      </p>
    </div>
  );
}
