import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = { title: 'Merci', robots: { index: false, follow: false } };

export default function MerciPage() {
  const { dict } = getLocaleContext();
  const page = dict.thanks;
  const steps = dict.home.steps.items;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1 className="mt-6 display-1">
        {page.title}
        <br />
        {page.titleSecond}
      </h1>
      <p className="mt-8 max-w-[640px] font-sans text-[16px] leading-[1.65] text-ink">{page.body1}</p>
      <p className="mt-4 max-w-[640px] font-sans text-[16px] leading-[1.65] text-ink">{page.body2}</p>
      <div className="mt-8">
        <ButtonLink href="/catalogue" size="lg" arrow>
          {page.cta}
        </ButtonLink>
      </div>

      <div className="mt-16 border-t border-chalk pt-12">
        <p className="eyebrow">{page.stepsEyebrow}</p>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="max-w-[360px]">
              <p className="font-sans text-[12px] text-stone">{step.number}</p>
              <h2 className="mt-4 font-display text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-ink">{step.title}</h2>
              <p className="mt-3 font-sans text-[16px] leading-[1.6] text-ink">{step.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">
          i
        </span>
        <p className="font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
      </div>
    </div>
  );
}
