import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import type { IconName } from '@/components/ui/Icons';

const STEPS: ReadonlyArray<{ icon: IconName; title: string; body: string }> = [
  {
    icon: 'tag',
    title: 'Vous choisissez',
    body: 'Parcourez les produits et ouvrez la fiche du produit qui vous intéresse. Le prix est affiché en dinars ; sans prix, la mention « sur devis » s’applique.',
  },
  {
    icon: 'phone',
    title: 'Nous confirmons',
    body: 'Vous laissez votre nom, votre téléphone et votre wilaya. Nous vous appelons pour confirmer le produit, le délai et le lieu de remise.',
  },
  {
    icon: 'truck',
    title: 'Vous recevez',
    body: 'La remise se fait dans l’une des wilayas desservies, après confirmation. Aucun paiement n’est demandé en ligne.',
  },
];

/** « Comment ça marche » en trois étapes, révélées l'une après l'autre (80 ms d'écart). */
export function HowItWorks() {
  return (
    <section className="container-page py-16 md:py-20">
      <Reveal>
        <span className="eyebrow">Comment ça marche</span>
        <h2 className="section-title mt-3">Trois étapes, aucune surprise</h2>
        <p className="section-lead">
          Le parcours est volontairement simple : pas de compte à créer, pas de paiement en ligne, une confirmation
          humaine avant chaque remise.
        </p>
      </Reveal>

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 80} className="h-full">
              <div className="surface-card flex h-full flex-col gap-4 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#F1EDE3] text-[#8A6D1F]">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-semibold tracking-display text-[#8A6D1F]/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold tracking-tightish text-[#1B1F1D]">{step.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
