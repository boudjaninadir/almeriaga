import type { Metadata } from 'next';
import { SupplierOffers } from '@/components/SupplierOffers';
import { Reveal } from '@/components/ui/Reveal';
import { t } from '@/lib/i18n';
import { currentLocale } from '@/lib/locale-server';

export const metadata: Metadata = {
  title: 'Fournisseur EU — base européenne & abonnements',
  description:
    'Base de fournisseurs européens vérifiés (Espagne, France, Allemagne…), guidance ANAE et visa. Abonnements via rappel téléphonique.',
  alternates: { canonical: '/fournisseur-eu' },
};

export default function FournisseurEuPage() {
  const locale = currentLocale();
  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <span className="eyebrow">{t(locale, 'nav_suppliers_eu')}</span>
        <h1 className="section-title mt-3">{t(locale, 'offers_title')} — Europe</h1>
        <p className="section-lead">{t(locale, 'offers_lead')}</p>
      </Reveal>
      <div className="mt-10">
        <SupplierOffers locale={locale} market="eu" />
      </div>
    </div>
  );
}
