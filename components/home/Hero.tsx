import { RouteMap } from '@/components/RouteMap';
import { ButtonLink } from '@/components/ui/Button';
import { getLocaleContext } from '@/lib/i18n/server';

export function HomeHero() {
  const { dict } = getLocaleContext();
  const hero = dict.home.hero;

  return (
    <section className="container-page pb-16 pt-10 lg:pb-20 lg:pt-10">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {hero.eyebrow}
          </p>
          <h1 className="mt-6 display-1">
            {hero.title}
            <br />
            {hero.titleSecond}
          </h1>
          <p className="mt-6 max-w-[520px] font-sans text-[16px] leading-[1.65] text-ink">{hero.lead}</p>
          <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <ButtonLink href="/catalogue" size="lg" arrow className="w-full sm:w-auto">
              {hero.cta}
            </ButtonLink>
          </div>
          <p className="mt-5 font-sans text-[13px] leading-relaxed text-stone">{hero.note}</p>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <RouteMap />
        </div>
      </div>
    </section>
  );
}
