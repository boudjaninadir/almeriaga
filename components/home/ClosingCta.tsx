import { ButtonLink } from '@/components/ui/Button';
import { getLocaleContext } from '@/lib/i18n/server';

export function ClosingCta() {
  const { dict } = getLocaleContext();
  const cta = dict.home.cta;

  return (
    <section className="mt-16 bg-[#EFECE5] lg:mt-24">
      <div className="container-page grid gap-8 py-14 lg:grid-cols-12 lg:items-end lg:gap-10 lg:py-16">
        <div className="lg:col-span-8">
          <p className="eyebrow">{cta.eyebrow}</p>
          <h2 className="mt-6 font-display text-[34px] font-extrabold leading-[1.08] tracking-[-0.03em] text-ink lg:text-[48px]">
            {cta.title}
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-[1.6] text-ink">{cta.lead}</p>
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <ButtonLink href="/catalogue" size="lg" arrow className="w-full sm:w-auto">
            {cta.button}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
