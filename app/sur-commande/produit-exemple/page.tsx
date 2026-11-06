import type { Metadata } from 'next';
import Link from 'next/link';
import { RequestForm } from '@/components/forms/RequestForm';
import { Badge } from '@/components/ui/Badge';
import { getLocaleContext } from '@/lib/i18n/server';
import { whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Produit sur commande',
  description: 'Demande de devis pour un produit sur commande, acheté en Espagne et remis en Algérie.',
};

export default function QuotePage() {
  const { dict } = getLocaleContext();
  const quote = dict.shop.quote;
  const form = dict.shop.product;
  const whatsapp = whatsappLink('Bonjour Almeríaga, demande de devis.');

  return (
    <div className="container-page pb-20 pt-8 lg:pb-24">
      <nav aria-label="Fil d’Ariane" className="font-sans text-[12px] text-stone">
        <Link href="/catalogue" className="transition-colors hover:text-ink">
          {dict.nav.catalogue}
        </Link>{' '}
        / {quote.breadcrumb.split(' / ').slice(1).join(' / ')}
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="border border-chalk p-8 lg:p-12">
            <p className="eyebrow">{quote.eyebrow}</p>
            <h1 className="mt-6 font-display text-[48px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[64px]">
              {quote.title}
              <br />
              {quote.titleSecond}
            </h1>
            <p className="mt-6 max-w-[520px] font-sans text-[16px] leading-[1.65] text-ink">{quote.lead}</p>
            <div className="mt-8">
              <Badge tone="order">{quote.badge}</Badge>
            </div>
          </div>

          <div className="mt-12">
            <p className="eyebrow">{quote.stepsEyebrow}</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-3">
              {quote.steps.map((step, index) => (
                <div key={step.title}>
                  <p className="font-sans text-[12px] leading-none text-stone">{`0${index + 1}`}</p>
                  <h2 className="mt-4 font-display text-[23px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
                    {step.title}
                  </h2>
                  <p className="mt-3 font-sans text-[16px] leading-[1.6] text-ink">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Badge tone="order">{quote.panelTitle}</Badge>
          <h2 className="mt-6 font-display text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink">
            {quote.requestTitle}
          </h2>
          <p className="mt-4 font-sans text-[16px] leading-[1.65] text-ink">{quote.panelLead}</p>

          <div className="mt-8 border-t border-chalk pt-8">
            <p className="mb-6 font-sans text-[13px] leading-[1.6] text-ink">{form.requestLead}</p>
            <RequestForm
              type="devis"
              productSlug="produit-exemple"
              submitLabel={quote.submit}
              messageRequired
            />
            <p className="mt-5 font-sans text-[13px] leading-[1.6] text-stone">{form.formNote}</p>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex font-sans text-[13px] text-ink link-underline">
                {quote.whatsapp}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">
          i
        </span>
        <p className="font-sans text-[13px] leading-[1.6] text-ink">{quote.security}</p>
      </div>
    </div>
  );
}
