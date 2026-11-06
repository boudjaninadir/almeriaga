import { getLocaleContext } from '@/lib/i18n/server';

export function HomeSteps() {
  const { dict } = getLocaleContext();
  const steps = dict.home.steps;

  return (
    <section className="container-page border-t border-chalk pt-16 lg:pt-20">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <p className="eyebrow lg:col-span-4 lg:pt-3">{steps.eyebrow}</p>
        <h2 className="display-2 lg:col-span-8">
          {steps.title}
          <br />
          {steps.titleSecond}
        </h2>
      </div>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
        {steps.items.map((item) => (
          <div key={item.number} className="max-w-[360px]">
            <p className="font-sans text-[12px] leading-none text-stone">{item.number}</p>
            <h3 className="mt-5 font-display text-[26px] font-bold leading-[1.12] tracking-[-0.02em] text-ink">
              {item.title}
            </h3>
            <p className="mt-4 font-sans text-[16px] leading-[1.6] text-ink">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
