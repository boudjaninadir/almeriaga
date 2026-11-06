import type { Metadata } from 'next';
import { RequestForm } from '@/components/forms/RequestForm';
import { getLocaleContext } from '@/lib/i18n/server';
import { whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Gros & professionnels',
  description: 'Demande d’approvisionnement en gros, étudiée au cas par cas. Produits autorisés, paiement à la remise.',
};

export default function GrosPage() {
  const { dict } = getLocaleContext();
  const page = dict.trade.gros;
  const whatsapp = whatsappLink('Bonjour Almeríaga, demande en gros.');

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
            <h2 className="mt-6 font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink lg:text-[40px]">
              {page.blockTitle}
              <br />
              {page.blockSecond}
            </h2>
            <p className="mt-6 font-sans text-[16px] leading-[1.65] text-ink">{page.blockLead}</p>
            <ul className="mt-8 divide-y divide-chalk border-t border-chalk">
              {page.bullets.map((bullet) => (
                <li key={bullet} className="py-3 font-sans text-[16px] leading-[1.6] text-ink">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <h2 className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
            {page.formTitle}
          </h2>
          <p className="mt-2 font-sans text-[13px] leading-[1.6] text-ink">{dict.shop.product.requestLead}</p>
          <div className="mt-6">
            <RequestForm type="gros" submitLabel={page.submit} messageRequired />
          </div>
          <p className="mt-5 font-sans text-[13px] leading-[1.6] text-stone">{dict.shop.product.formNote}</p>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border border-chalk px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[760px] font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
        {whatsapp && (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-ink link-underline whitespace-nowrap">
            {page.whatsapp}
          </a>
        )}
      </div>
    </div>
  );
}
