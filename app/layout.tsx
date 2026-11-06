import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
import { t } from '@/lib/i18n';
import { currentLocale } from '@/lib/locale-server';
import { getFeaturedProduct } from '@/lib/products';
import { BRAND_NAME, SITE_URL } from '@/lib/site-config';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} — Micro-importation Europe-Algérie`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'Produits sélectionnés en Europe, livrés à toutes les wilayas d’Algérie. Commande sans paiement en ligne, confirmation par téléphone, prix en dinars.',
  alternates: { canonical: '/' },
  // Favicon vectoriel (app/icon.svg) + repli .ico pour les navigateurs qui le demandent d'office.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_DZ',
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: `${BRAND_NAME} — Micro-importation Europe-Algérie`,
    description: 'Produits sélectionnés en Europe, livrés en Algérie. Commande sans paiement en ligne, prix en dinars.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0B3D2E',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Le CTA « Commencer gratuitement » pointe vers la première fiche publiée.
  const pilot = await getFeaturedProduct();
  const locale = currentLocale();
  const labels: Record<string, string> = {
    nav_home: t(locale, 'nav_home'),
    nav_products: t(locale, 'nav_products'),
    nav_procedure: t(locale, 'nav_procedure'),
    nav_suppliers_eu: t(locale, 'nav_suppliers_eu'),
    nav_suppliers_dz: t(locale, 'nav_suppliers_dz'),
    nav_legal: t(locale, 'nav_legal'),
    nav_contact: t(locale, 'nav_contact'),
    cta_start: t(locale, 'cta_start'),
  };

  return (
    <html lang={locale === 'fr-DZ' ? 'fr' : locale} className={`${GeistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0B3D2E] font-sans text-[#F7F5EF]">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-[#D4AF37]/40 focus:bg-[#0E4635] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#F7F5EF] focus:shadow-soft"
        >
          Aller au contenu
        </a>
        <Analytics />
        <Navbar ctaHref={`/produit/${pilot.slug}`} labels={labels} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

