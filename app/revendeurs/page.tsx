import type { Metadata } from 'next';
import { RequestForm } from '@/components/forms/RequestForm';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Revendeurs',
  description: 'Présentez votre commerce à Oran, Tlemcen ou Sidi Bel Abbès et ouvrez un échange dédié à la revente.',
};

export default function RevendeursPage() {
  const { dict } = getLocaleContext();
  const page = dict.trade.revendeurs;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-6 display-1">
            {page.title}
            <br />
            {page.titleSecond}
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.65] text-ink">{page.lead}</p>

          <div className="mt-16 max-w-[560px]">
            <p className="eyebrow">{page.blockEyebrow}</p>
            <ol className="mt-8 divide-y divide-chalk border-y border-chalk">
              {page.steps.map((step) => (
                <li key={step.number} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr] sm:items-baseline">
                  <span className="font-sans text-[12px] text-stone">{step.number}</span>
                  <span className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[34px]">
                    {step.title}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 font-sans text-[16px] leading-[1.65] text-ink">{page.blockLead}</p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
            {page.formTitle}
          </h2>
          <p className="mt-2 font-sans text-[13px] leading-[1.6] text-ink">{dict.shop.product.requestLead}</p>
          <div className="mt-6">
            <RequestForm type="revendeur" submitLabel={page.submit} reseller />
          </div>
          <p className="mt-5 font-sans text-[13px] leading-[1.6] text-stone">{dict.shop.product.formNote}</p>
        </div>
      </div>

      <div className="mt-14 border border-chalk px-5 py-4">
        <p className="max-w-[960px] font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
      </div>
    </div>
  );
}
