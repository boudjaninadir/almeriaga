import { getLocaleContext } from '@/lib/i18n/server';

export function TrustStrip() {
  const { dict } = getLocaleContext();
  const items = dict.home.trust;

  return (
    <section className="container-page">
      <div className="grid gap-10 border-t border-chalk pt-8 md:grid-cols-3 md:gap-12">
        {items.map((item) => (
          <div key={item.kicker} className="max-w-[360px]">
            <p className="eyebrow">{item.kicker}</p>
            <h2 className="mt-4 font-display text-[23px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
              {item.title}
            </h2>
            <p className="mt-3 font-sans text-[13px] leading-[1.6] text-ink">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
