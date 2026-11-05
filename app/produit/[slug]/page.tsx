import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';
import { MetaViewContent } from '@/components/MetaViewContent';
import { ProductGallery } from '@/components/produit/ProductGallery';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { getFallbackSlugs, getProductBySlug } from '@/lib/products';
import { priceLabel, STATUS_LABEL } from '@/lib/product-display';
import { BRAND_NAME, absoluteUrl, whatsappLink } from '@/lib/site-config';

type PageProps = { params: { slug: string } };

export const revalidate = 300;
export const dynamicParams = true;

/** Pré-génère les slugs connus ; les autres sont rendus à la demande. */
export function generateStaticParams(): Array<{ slug: string }> {
  return getFallbackSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return { title: 'Produit introuvable', robots: { index: false, follow: false } };
  }

  const description = (product.description || `Fiche produit ${product.name}.`).slice(0, 160);
  const images = product.images.filter(Boolean).map((source) => absoluteUrl(source));

  return {
    title: product.name,
    description,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: {
      type: 'website',
      locale: 'fr_DZ',
      url: absoluteUrl(`/produit/${product.slug}`),
      siteName: BRAND_NAME,
      title: `${product.name} — ${BRAND_NAME}`,
      description,
      images: images.length > 0 ? images : undefined,
    },
    twitter: { card: 'summary_large_image', title: product.name, description },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const whatsapp = whatsappLink(`Bonjour, je souhaite commander ${product.name}.`);

  return (
    <div className="container-page py-10 md:py-16">
      <MetaViewContent slug={product.slug} name={product.name} />

      <nav aria-label="Fil d’Ariane" className="mb-6 text-xs text-ink-faint">
        <Link href="/catalogue" className="transition-colors hover:text-accent-ink">
          Catalogue
        </Link>
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
              <Badge tone={product.status === 'disponible' ? 'mint' : 'accent'}>{STATUS_LABEL[product.status]}</Badge>
              {product.category && <Badge tone="neutral">{product.category}</Badge>}
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-display text-ink sm:text-4xl">{product.name}</h1>
              <p className="font-display text-2xl font-semibold text-accent-ink">{priceLabel(product)}</p>
              <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
            </div>

            <ul className="grid gap-2 text-sm text-ink-soft">
              {[
                'Confirmation par téléphone avant la remise.',
                'Paiement à la remise, jamais en ligne.',
                'Livraison à Oran, Tlemcen et Sidi Bel Abbès.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-mint-ink" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="surface-card p-6 sm:p-7">
              <h2 className="text-lg font-semibold tracking-tightish text-ink">Commander</h2>
              <p className="mt-1 text-sm text-ink-soft">Nom, téléphone et wilaya suffisent : nous faisons le reste.</p>
              <div className="mt-5">
                <LeadCaptureForm
                  type="consommateur"
                  productSlug={product.slug}
                  productName={product.name}
                />
              </div>
            </div>

            {product.status === 'sur_commande' && (
              <p className="text-sm leading-relaxed text-ink-soft">
                Ce produit est sur commande. Pour un modèle précis ou un volume, utilisez{' '}
                <Link href={`/sur-commande/${product.slug}`} className="font-semibold text-accent-ink underline">
                  la page de devis
                </Link>
                .
              </p>
            )}

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mint-ink transition-colors hover:text-accent-ink"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Poser une question sur WhatsApp
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
