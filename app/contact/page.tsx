import type { Metadata } from 'next';
import { ButtonLink } from '@/components/ui/Button';
import { getLocaleContext } from '@/lib/i18n/server';
import { CONTACT, displayPhone, whatsappLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact humain pour une question produit, une demande en cours ou les modalités de remise à Oran, Tlemcen et Sidi Bel Abbès.',
};

export default function ContactPage() {
  const { dict } = getLocaleContext();
  const page = dict.contactPage;
  const whatsapp = whatsappLink('Bonjour Almeríaga, j’ai une question.');

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <p className="eyebrow">{page.eyebrow}</p>
      <h1 className="mt-6 display-1">{page.title}</h1>
      <p className="mt-6 max-w-[720px] font-sans text-[16px] leading-[1.65] text-ink">{page.lead}</p>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <div className="border border-chalk p-8 lg:p-10">
          <p className="eyebrow">{page.whatsappEyebrow}</p>
          <h2 className="mt-5 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] text-ink lg:text-[48px]">
            {page.whatsappTitle}
          </h2>
          <p className="mt-5 max-w-[440px] font-sans text-[16px] leading-[1.6] text-ink">{page.whatsappBody}</p>
          <p className="mt-8 font-sans text-[14px] leading-none text-ink">
            {displayPhone(CONTACT.whatsappNumber)}
          </p>
          {whatsapp && (
            <ButtonLink href={whatsapp} size="lg" arrow className="mt-6 w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
              {page.whatsappCta}
            </ButtonLink>
          )}
          <p className="mt-4 font-sans text-[13px] leading-[1.6] text-stone">{page.whatsappNote}</p>
        </div>

        <div className="border border-chalk p-8 lg:p-10">
          <p className="eyebrow">{page.emailEyebrow}</p>
          <h2 className="mt-5 font-display text-[40px] font-extrabold leading-none tracking-[-0.03em] text-ink lg:text-[48px]">
            {page.emailTitle}
          </h2>
          <p className="mt-5 max-w-[440px] font-sans text-[16px] leading-[1.6] text-ink">{page.emailBody}</p>
          <a href={`mailto:${CONTACT.email}`} className="mt-8 block font-sans text-[14px] leading-none text-ink link-underline">
            {CONTACT.email}
          </a>
          <ButtonLink href={`mailto:${CONTACT.email}`} size="lg" arrow className="mt-6 w-full sm:w-auto">
            {page.emailCta}
          </ButtonLink>
          <p className="mt-4 font-sans text-[13px] leading-[1.6] text-stone">{page.emailNote}</p>
        </div>
      </div>

      <div className="mt-14 grid gap-10 border-t border-chalk pt-8 lg:grid-cols-2">
        <div>
          <p className="eyebrow">{page.algeriaEyebrow}</p>
          <h2 className="mt-5 font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink lg:text-[28px]">
            {page.algeriaTitle}
          </h2>
          <p className="mt-4 max-w-[480px] font-sans text-[16px] leading-[1.6] text-ink">{page.algeriaBody}</p>
        </div>
        <div>
          <p className="eyebrow">{page.hoursEyebrow}</p>
          <p className="mt-5 max-w-[480px] font-sans text-[16px] leading-[1.6] text-ink">{page.hoursBody}</p>
          <p className="mt-3 font-sans text-[13px] leading-[1.6] text-stone">{page.hoursNote}</p>
        </div>
      </div>

      <div className="mt-12 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">
          i
        </span>
        <p className="font-sans text-[13px] leading-[1.6] text-ink">{page.notice}</p>
      </div>
    </div>
  );
}
