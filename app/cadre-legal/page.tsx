import type { Metadata } from 'next';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Cadre légal',
  description: 'Les démarches à vérifier pour une activité de micro-importation déclarée : ANAE, CASNOS, NIF, autorisation et remise.',
};

const PHASES = [
  {
    number: 'Phase 01',
    title: 'Légal',
    subtitle: 'Établir le cadre.',
    body: 'Identifier le statut applicable à la micro-importation et les démarches nécessaires avant de présenter l’activité comme autorisée.',
    rows: [
      { title: 'ANAE', body: 'Vérifier l’inscription et le périmètre d’activité applicable.' },
      { title: 'CASNOS', body: 'Vérifier l’affiliation et les justificatifs correspondant à la situation de l’exploitant.' },
      { title: 'NIF', body: 'Vérifier l’identification fiscale de l’exploitant.' },
      { title: 'Ministère du Commerce Extérieur', body: 'Vérifier l’autorisation requise, sa validité et son périmètre.' },
    ],
  },
  {
    number: 'Phase 02',
    title: 'Mobilité',
    subtitle: 'Préparer le passage.',
    body: 'Étudier les conditions applicables à l’achat en Espagne et à l’entrée des produits en Algérie, selon les règles en vigueur.',
    rows: [
      { title: 'Produits autorisés', body: 'Contrôler l’éligibilité des produits envisagés. Ne pas présumer qu’un produit est importable.' },
      { title: 'Documents et formalités', body: 'Faire vérifier les pièces et les obligations liées au transport et à la déclaration.' },
    ],
  },
  {
    number: 'Phase 03',
    title: 'Terrain',
    subtitle: 'Organiser la remise.',
    body: 'Relier le cadre administratif à une expérience client claire, à Oran, Tlemcen et Sidi Bel Abbès.',
    rows: [
      { title: 'Confirmation humaine', body: 'Confirmer par téléphone le produit, le prix en DZD et les modalités avant l’accord du client.' },
      { title: 'Remise et règlement', body: 'Préciser le lieu et les conditions de remise. Paiement à la remise, sans paiement en ligne.' },
    ],
  },
];

export default function CadreLegalPage() {
  const { dict, locale } = getLocaleContext();
  const page = dict.legalPage;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1 className="mt-6 display-1">{page.title}</h1>
      <p className="mt-6 max-w-[760px] font-sans text-[16px] leading-[1.65] text-ink">{page.lead}</p>

      <div className="mt-8 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">i</span>
        <div className="space-y-2">
          <p className="font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
          {locale !== 'fr' && (
            <p className="font-sans text-[12px] leading-[1.6] text-gold-ink">{dict.pages.legal.notice}</p>
          )}
        </div>
      </div>

      {PHASES.map((phase) => (
        <section key={phase.number} className="mt-14 border-t border-chalk pt-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">{phase.number}</p>
              <h2 className="mt-6 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] text-ink lg:text-[48px]">
                {phase.title}
              </h2>
              <h3 className="mt-5 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                {phase.subtitle}
              </h3>
              <p className="mt-4 max-w-[360px] font-sans text-[16px] leading-[1.6] text-ink">{phase.body}</p>
            </div>
            <div className="lg:col-span-8">
              <dl className="divide-y divide-chalk border-t border-chalk">
                {phase.rows.map((row) => (
                  <div key={row.title} className="grid gap-3 py-5 sm:grid-cols-[220px_1fr]">
                    <dt className="font-display text-[22px] font-bold leading-[1.2] tracking-[-0.02em] text-ink">{row.title}</dt>
                    <dd>
                      <p className="font-sans text-[16px] leading-[1.6] text-ink">{row.body}</p>
                      <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.12em] text-stone">
                        Justificatif / conditions à vérifier
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      ))}

      <section className="mt-14 border-t border-chalk bg-[#EFECE5] px-6 py-12 lg:px-10">
        <p className="eyebrow">Distinguer l’intention de la preuve</p>
        <h2 className="mt-6 font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink lg:text-[48px]">
          La transparence, avant tout.
        </h2>
        <p className="mt-5 max-w-[860px] font-sans text-[16px] leading-[1.65] text-ink">
          Les justificatifs doivent être contrôlés et les champs des mentions légales complétés avant mise en ligne. Les règles et les obligations applicables sont à confirmer avec un professionnel compétent. Aucun délai, seuil ni référence légale non fournis ne sont avancés ici.
        </p>
      </section>
    </div>
  );
}
