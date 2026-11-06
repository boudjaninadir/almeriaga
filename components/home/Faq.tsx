import { Accordion } from '@/components/ui/Accordion';
import { getLocaleContext } from '@/lib/i18n/server';

export function HomeFaq() {
  const { dict } = getLocaleContext();
  const faq = dict.home.faq;

  return (
    <section className="container-page border-t border-chalk pt-16 lg:pt-20">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow">{faq.eyebrow}</p>
          <h2 className="mt-6 display-2">
            {faq.title}
            <br />
            {faq.titleSecond}
          </h2>
          <p className="mt-6 max-w-[360px] font-sans text-[16px] leading-[1.6] text-ink">{faq.lead}</p>
        </div>
        <div className="lg:col-span-7">
          <Accordion items={faq.items} defaultOpen="all" />
        </div>
      </div>
    </section>
  );
}
