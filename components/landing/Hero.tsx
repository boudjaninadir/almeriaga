import { Icon } from '@/components/ui/Icons';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { whatsappLink } from '@/lib/site-config';
import type { Product } from '@/types/product';

/**
 * Hero de la landing consommateur : promesse courte, objet 3D décoratif en CSS pur
 * (6 faces translucides, rotation lente) et bouton principal vers la fiche pilote.
 */
export function Hero({ pilot }: { pilot: Product }) {
  const whatsapp = whatsappLink(`Bonjour, je souhaite commander ${pilot.name}.`);

  return (
    <section className="relative overflow-hidden">
      {/* Halos décoratifs : aucune image, uniquement des dégradés doux. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-soft blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-mint blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <Reveal>
            <span className="eyebrow">
              <Icon name="route" className="h-4 w-4" />
              Espagne → Oran · Tlemcen · Sidi Bel Abbès
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-display text-ink sm:text-5xl md:text-6xl">
              Des produits choisis en Espagne,
              <span className="text-accent-ink"> livrés près de vous.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="section-lead">
              Micro-importation en règle : vous choisissez un produit, nous confirmons par téléphone, vous payez à la
              remise. Aucun paiement en ligne, prix affichés en dinars.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={`/produit/${pilot.slug}`} size="lg">
                Commander
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-surface px-6 text-base font-semibold text-mint-ink transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-mint active:translate-y-0"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  WhatsApp
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge tone="mint">
                <Icon name="shield" className="h-3.5 w-3.5" />
                Cadre ANAE
              </Badge>
              <Badge tone="neutral">
                <Icon name="truck" className="h-3.5 w-3.5" />
                Livraison 3 wilayas
              </Badge>
              <Badge tone="neutral">
                <Icon name="tag" className="h-3.5 w-3.5" />
                Prix en DZD
              </Badge>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative">
          <div className="scene-3d flex items-center justify-center py-6">
            <Parallax speed={0.05}>
              <div className="animate-float-y">
                <div className="object-3d animate-spin-3d">
                  <span className="object-3d__halo" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--front" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--back" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--right" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--left" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--top" aria-hidden="true" />
                  <span className="object-3d__face object-3d__face--bottom" aria-hidden="true" />
                </div>
              </div>
            </Parallax>
          </div>

          {/* Anneaux décoratifs en SVG, animés en CSS (transform/opacity uniquement). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 320"
            className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-sm opacity-70"
          >
            <circle cx="160" cy="160" r="132" fill="none" stroke="rgb(240 82 26 / 0.18)" strokeWidth="1" />
            <circle
              cx="160"
              cy="160"
              r="104"
              fill="none"
              stroke="rgb(21 92 76 / 0.16)"
              strokeWidth="1"
              strokeDasharray="6 10"
            />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
