import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { WhatsAppFab } from '@/components/ui/WhatsAppFab';
import { getPilotProduct } from '@/lib/products';
import { BRAND_NAME, SITE_URL } from '@/lib/site-config';
import '@/app/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND_NAME} — Micro-importation Espagne → Algérie`,
    template: `%s | ${BRAND_NAME}`,
  },
  description:
    'Produits sélectionnés en Espagne, livrés à Oran, Tlemcen et Sidi Bel Abbès. Commande sans paiement en ligne, confirmation par téléphone, prix en dinars.',
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
    title: `${BRAND_NAME} — Micro-importation Espagne → Algérie`,
    description: 'Produits sélectionnés en Espagne, livrés en Algérie. Commande sans paiement en ligne, prix en dinars.',
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
  // Le bouton « Commander » pointe toujours vers une fiche réelle (produit pilote publié).
  const pilot = await getPilotProduct();

  return (
    <html lang="fr" className={`${GeistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-[#0B3D2E] font-sans text-[#F7F5EF]">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:border focus:border-[#D4AF37]/40 focus:bg-[#0E4635] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#F7F5EF] focus:shadow-soft"
        >
          Aller au contenu
        </a>
        <Analytics />
        <Navbar ctaHref={`/produit/${pilot.slug}`} />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

