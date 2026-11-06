import { Icon } from '@/components/ui/Icons';
import { Parallax } from '@/components/ui/Parallax';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { whatsappLink } from '@/lib/site-config';
import { t, type Locale } from '@/lib/i18n';
import type { Product } from '@/types/product';

/**
 * Hero de la landing consommateur : promesse courte, objet 3D décoratif en CSS pur
 * (6 faces translucides, rotation lente) et bouton principal vers la fiche pilote.
 */
export function Hero({ pilot, locale }: { pilot: Product; locale: Locale }) {
  const whatsapp = whatsappLink(`Bonjour, je souhaite commander ${pilot.name}.`);

  return (
    <section className="relative overflow-hidden">
      {/* Texture de vagues de la carte de visite, très discrète. */}
      <div aria-hidden="true" className="brand-waves" />
      {/* Halos décoratifs : aucune image, uniquement des dégradés or doux. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#D4AF37]/10 blur-3xl"
      />

      <div className="container-page relative grid items-center gap-14 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <Reveal>
            <span className="eyebrow">
              <Icon name="route" className="h-4 w-4" />
              {t(locale, 'hero_eyebrow')}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.05] tracking-display text-[#1B1F1D] sm:text-5xl md:text-6xl">
              {t(locale, 'hero_title')}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="section-lead">{t(locale, 'hero_lead')}</p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={`/produit/${pilot.slug}`} size="lg">
                {t(locale, 'cta_start')}
                <Icon name="arrow" className="h-4 w-4" />
              </ButtonLink>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#FCFBF7] px-6 text-base font-semibold text-[#8A6D1F] transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1B1F1D] active:translate-y-0"
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
                {t(locale, 'badge_legal')}
              </Badge>
              <Badge tone="neutral">
                <Icon name="truck" className="h-3.5 w-3.5" />
                {t(locale, 'badge_delivery')}
              </Badge>
              <Badge tone="neutral">
                <Icon name="tag" className="h-3.5 w-3.5" />
                {t(locale, 'badge_dzd')}
              </Badge>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="relative">
          <div className="flex items-center justify-center py-6">
            <Parallax speed={0.05}>
              <div className="animate-float-y relative flex items-center justify-center">
                <span className="object-3d__halo" aria-hidden="true" />
                {/* Emblème de marque : fermoir doré (public/brand/latch.svg). */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/latch.svg"
                  alt=""
                  aria-hidden="true"
                  className="relative h-64 w-auto drop-shadow-[0_28px_56px_rgb(27_31_29/0.35)]"
                />
              </div>
            </Parallax>
          </div>

          {/* Anneaux décoratifs en SVG, animés en CSS (transform/opacity uniquement). */}
          <svg
            aria-hidden="true"
            viewBox="0 0 320 320"
            className="pointer-events-none absolute inset-0 mx-auto h-full w-full max-w-sm opacity-70"
          >
            <circle cx="160" cy="160" r="132" fill="none" stroke="rgb(212 175 55 / 0.22)" strokeWidth="1" />
            <circle
              cx="160"
              cy="160"
              r="104"
              fill="none"
              stroke="rgb(212 175 55 / 0.14)"
              strokeWidth="1"
              strokeDasharray="6 10"
            />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
