import { Reveal } from '@/components/ui/Reveal';

const FAQ: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Comment se passe le paiement ?',
    answer:
      'Aucun paiement n’est demandé en ligne. La commande est confirmée par téléphone, puis réglée à la remise du produit.',
  },
  {
    question: 'Dans quelles wilayas livrez-vous ?',
    answer: 'Oran, Tlemcen et Sidi Bel Abbès. Le lieu exact et le créneau sont fixés lors de l’appel de confirmation.',
  },
  {
    question: 'Les prix sont-ils en euros ou en dinars ?',
    answer:
      'Les prix publics sont uniquement en dinars algériens (DZD). Quand un prix n’est pas encore fixé, la fiche affiche « sur devis ».',
  },
  {
    question: 'Comment savoir si un produit est disponible ?',
    answer:
      'Chaque fiche indique son statut : « disponible » ou « sur commande ». Une fiche « sur commande » dispose d’un formulaire de devis dédié.',
  },
  {
    question: 'L’activité est-elle encadrée ?',
    answer:
      'Oui : le régime de l’auto-entrepreneur et le décret exécutif n° 25-170 encadrent la micro-importation. La page « Cadre légal » détaille les étapes et renvoie vers l’ANAE et les Douanes.',
  },
];

/** FAQ courte, en accordéon natif <details> : aucun JavaScript nécessaire. */
export function Faq() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="section-title mt-3">Ce que les clients demandent le plus</h2>
          <p className="section-lead">
            Une question qui n’est pas ici ? Le bouton WhatsApp reste accessible en bas de chaque page.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="divide-y divide-line overflow-hidden rounded-xl3 border border-line bg-surface">
            {FAQ.map((item) => (
              <details key={item.question} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-ink">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
