import { ButtonLink } from '@/components/ui/Button';
import { RouteMap } from '@/components/RouteMap';
import { getLocaleContext } from '@/lib/i18n/server';
import { whatsappLink } from '@/lib/site';

export function HeroBrandSection() {
  const { dict } = getLocaleContext();
  const hero = dict.hero;
  const whatsapp = whatsappLink(hero.whatsappMessage);

  return (
    <section className="relative overflow-hidden bg-canvas pt-16 pb-20 md:pt-24 md:pb-28 text-ink border-b border-line">
      {/* 8-branched star watermark / filigrane in background */}
      <div className="absolute right-[-10%] top-[10%] opacity-[0.06] pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 0 L115 70 L185 85 L115 100 L100 170 L85 100 L15 85 L85 70 Z" fill="#E3C766" />
          <path d="M100 0 L115 70 L185 85 L115 100 L100 170 L85 100 L15 85 L85 70 Z" transform="rotate(45 100 100)" fill="#E3C766" />
        </svg>
      </div>

      <div className="container-page relative z-10 space-y-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gold-ink border border-gold/40 shadow-soft">
              <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span>{hero.badge}</span>
            </div>

            <h1 className="text-4xl font-semibold tracking-tightish text-ink sm:text-6xl text-balance">
              {hero.title}{' '}
              <span className="text-brand" dir="rtl" lang="ar">{hero.titleAccent}</span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-pretty text-lg text-ink-soft leading-relaxed font-sans">
              {hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:justify-start pt-2">
              <ButtonLink href="#produits" variant="gold" size="lg" className="w-full sm:w-auto">
                {hero.ctaProducts}
              </ButtonLink>
              <ButtonLink href="#reserver" variant="secondary" size="lg" className="w-full sm:w-auto">
                {hero.ctaCallback}
              </ButtonLink>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-brand hover:underline pt-2 sm:pt-0"
                >
                  <span>💬 {hero.whatsapp}</span>
                </a>
              )}
            </div>

            {/* Trust Bullets / Puces de confiance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-line text-xs font-mono text-ink-soft">
              {hero.trust.map((item) => (
                <div key={item} className="flex items-center justify-center lg:justify-start gap-2">
                  <span className="text-gold">✓</span> {item}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <RouteMap />
          </div>
        </div>
      </div>
    </section>
  );
}