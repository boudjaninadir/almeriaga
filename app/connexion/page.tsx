import type { Metadata } from 'next';
import { AuthPanel } from '@/components/auth/AuthPanel';
import { getLocaleContext } from '@/lib/i18n/server';

export const metadata: Metadata = { title: 'Connexion', robots: { index: false, follow: false } };

export default function ConnexionPage() {
  const { dict } = getLocaleContext();
  const page = dict.authPage;

  return (
    <div className="container-page pb-20 pt-6 lg:pb-24 lg:pt-8">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-6 display-1">
            {page.title}
            <br />
            {page.titleSecond}
          </h1>
          <p className="mt-6 max-w-[560px] font-sans text-[16px] leading-[1.65] text-ink">{page.lead}</p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div>
              <p className="eyebrow">{page.panelLead}</p>
              <p className="mt-4 font-sans text-[16px] leading-[1.6] text-ink">{page.google} · {page.phone} · {page.email}</p>
            </div>
            <div>
              <p className="eyebrow">{page.privacy}</p>
              <p className="mt-4 font-sans text-[13px] leading-[1.6] text-stone">{page.note}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <AuthPanel />
        </div>
      </div>
    </div>
  );
}
