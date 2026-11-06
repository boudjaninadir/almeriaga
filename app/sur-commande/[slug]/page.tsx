import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';
import { ProductGallery } from '@/components/produit/ProductGallery';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { getFallbackSlugs, getProductForQuote } from '@/lib/products';
import { priceLabel, STATUS_LABEL } from '@/lib/product-display';
import { BRAND_NAME, absoluteUrl, whatsappLink } from '@/lib/site-config';

type PageProps = { params: { slug: string } };

export const revalidate = 300;
export const dynamicParams = true;

export function generateStaticParams(): Array<{ slug: string }> {
  return getFallbackSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductForQuote(params.slug);

  if (!product) {
    return { title: 'Produit introuvable', robots: { index: false, follow: false } };
  }

  // Gabarit de devis : contenu proche d'une fiche, donc noindex pour éviter la duplication.
  return {
    title: `${product.name} — sur devis`,
    description: (product.description || `Demander un devis pour ${product.name}.`).slice(0, 160),
    alternates: { canonical: `/sur-commande/${product.slug}` },
    robots: { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: 'fr_DZ',
      url: absoluteUrl(`/sur-commande/${product.slug}`),
      siteName: BRAND_NAME,
      title: `${product.name} — sur devis`,
      description: `Demandez un devis pour ${product.name}. Prix en dinars, sans engagement.`,
    },
  };
}

export default async function SurCommandePage({ params }: PageProps) {
  const product = await getProductForQuote(params.slug);
  if (!product) notFound();

  const whatsapp = whatsappLink(`Bonjour, je souhaite un devis pour ${product.name}.`);

  return (
    <div className="container-page py-10 md:py-16">
      <nav aria-label="Fil d’Ariane" className="mb-6 text-xs text-ink-faint">
        <Link href="/produits" className="transition-colors hover:text-[#8A6D1F]">
          Produits        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink-soft">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <ProductGallery product={product} />
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="accent">Sur devis</Badge>
              <Badge tone="neutral">{STATUS_LABEL[product.status]}</Badge>
              {product.category && <Badge tone="neutral">{product.category}</Badge>}
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-display text-[#1B1F1D] sm:text-4xl">{product.name}</h1>
              <p className="font-display text-2xl font-semibold text-[#8A6D1F]">{priceLabel(product)}</p>
              <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
            </div>

            <div className="surface-card p-6 sm:p-7">
              <h2 className="text-lg font-semibold tracking-tightish text-[#1B1F1D]">Demander un devis</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Précisez le modèle et la quantité souhaités : le devis est établi après échange, en dinars.
              </p>
              <div className="mt-5">
                <LeadCaptureForm type="devis" productSlug={product.slug} productName={product.name} />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-ink-faint">
              Chaque demande est rattachée à ce produit : cela permet de comparer la demande produit par produit dans
              le suivi interne.
            </p>

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8A6D1F] transition-colors hover:text-[#8A6D1F]"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Demander un devis sur WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
