import Link from 'next/link';
import { Icon } from '@/components/ui/Icons';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import type { IconName } from '@/components/ui/Icons';

const PILLARS: ReadonlyArray<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'shield',
    title: 'Cadre légal de la micro-importation',
    body: 'L’activité est déclarée selon le régime de l’auto-entrepreneur et le décret exécutif n° 25-170. Le détail des étapes est expliqué publiquement.',
  },
  {
    icon: 'truck',
    title: 'Livraison dans trois wilayas',
    body: 'Oran, Tlemcen et Sidi Bel Abbès. Le lieu et le créneau exacts sont confirmés par téléphone avant la remise.',
  },
  {
    icon: 'receipt',
    title: 'Produit vérifié avant remise',
    body: 'Chaque produit est contrôlé à la réception du lot. La garantie applicable est précisée lors de la confirmation.',
  },
];

const STATS: ReadonlyArray<{ value: number; suffix?: string; label: string }> = [
  { value: 3, label: 'wilayas desservies' },
  { value: 3, label: 'étapes pour commander' },
  { value: 12, label: 'familles de produits autorisées' },
];

/** Bloc de réassurance : cadre légal, livraison, garantie + chiffres animés. */
export function Trust() {
  return (
    <section className="container-page py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <span className="eyebrow">Confiance</span>
          <h2 className="section-title mt-3">Une activité déclarée, un interlocuteur unique</h2>
          <p className="section-lead">
            La micro-importation obéit à un cadre administratif précis. Nous l’expliquons sans le simplifier, et nous
            vous invitons à vérifier chaque point auprès de l’ANAE et des Douanes.
          </p>
          <Link
            href="/cadre-legal"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-ink transition-colors hover:text-accent"
          >
            Voir les étapes du cadre légal
            <Icon name="arrow" className="h-4 w-4" />
          </Link>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {STATS.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 80}>
                <div>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-display text-ink">
                    <Counter value={stat.value} suffix={stat.suffix ?? ''} />
                  </dd>
                  <p className="mt-1 text-xs leading-snug text-ink-faint">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 80}>
              <div className="surface-card flex gap-4 p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-mint-ink">
                  <Icon name={pillar.icon} className="h-5 w-5" />
                </span>
                <div className="space-y-1.5">
                  <h3 className="text-base font-semibold tracking-tightish text-ink">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-soft">{pillar.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
