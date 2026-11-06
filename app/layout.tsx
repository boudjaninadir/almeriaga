import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { Analytics } from '@/components/Analytics';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { I18nProvider } from '@/lib/i18n/context';
import { getLocaleContext } from '@/lib/i18n/server';
import { SITE } from '@/lib/site';
import '@/app/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Deux rives. Un lien.`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF8F4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dict, dir, htmlLang } = getLocaleContext();

  return (
    <html
      lang={htmlLang}
      dir={dir}
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink selection:bg-accent/20">
        <I18nProvider locale={locale} dictionary={dict}>
          <Analytics />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
