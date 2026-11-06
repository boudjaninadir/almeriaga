import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProductGallery } from '@/components/product/ProductGallery';
import { RequestForm } from '@/components/forms/RequestForm';
import { Badge } from '@/components/ui/Badge';
import { getLocaleContext } from '@/lib/i18n/server';
import { SHOP_PRODUCTS, isShopProductSlug } from '@/lib/shop-products';
import { whatsappLink } from '@/lib/site';

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params): Metadata {
  if (!isShopProductSlug(params.slug)) return { title: 'Produit' };
  const { dict } = getLocaleContext();
  const product = SHOP_PRODUCTS[params.slug];
  return { title: dict.shop.catalogue.items[product.itemKey].name };
}

export default function ProductPage({ params }: Params) {
  if (!isShopProductSlug(params.slug)) notFound();

  const { dict } = getLocaleContext();
  const entry = SHOP_PRODUCTS[params.slug];
  const item = dict.shop.catalogue.items[entry.itemKey];
  const t = dict.shop.product;
  const category = dict.shop.catalogue.categories[item.category as keyof typeof dict.shop.catalogue.categories];
  const isLisseur = params.slug === 'lisseur';
  const images = entry.images.map((image) => ({ src: image.src, label: t.gallery[image.labelIndex] ?? t.gallery[0] }));
  const whatsapp = whatsappLink(`Bonjour Almeríaga, ${item.name}.`);

  return (
    <div className="container-page pb-20 pt-8 lg:pb-24">
      <nav aria-label="Fil d’Ariane" className="font-sans text-[12px] text-stone">
        <Link href="/catalogue" className="transition-colors hover:text-ink">
          {dict.nav.catalogue}
        </Link>{' '}
        / {category} / <span className="text-ink">{item.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <ProductGallery images={images} />

          <div className="mt-12 max-w-[620px]">
            <p className="eyebrow">{isLisseur ? t.sectionEyebrow : category}</p>
            <p className="mt-5 font-sans text-[16px] leading-[1.7] text-ink">{isLisseur ? t.body : t.genericBody}</p>

            <dl className="mt-8 divide-y divide-chalk border-t border-chalk">
              {[
                { label: t.originLabel, value: t.origin },
                { label: t.handoverLabel, value: t.handover },
                { label: t.paymentLabel, value: t.payment },
              ].map((row) => (
                <div key={row.label} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr]">
                  <dt className="font-sans text-[12px] uppercase tracking-[0.12em] text-stone">{row.label}</dt>
                  <dd className="font-sans text-[16px] leading-snug text-ink">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-5">
          <Badge tone={item.status === 'available' ? 'available' : 'order'}>
            {item.status === 'available' ? dict.shop.catalogue.available : dict.shop.catalogue.order}
          </Badge>
          <h1 className="mt-6 font-display text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-ink lg:text-[48px]">
            {item.name}
          </h1>
          <p className="mt-6 font-display text-[34px] font-extrabold leading-none tracking-[-0.03em] text-ink lg:text-[38px]">
            {item.price}
          </p>
          <p className="mt-4 max-w-[460px] font-sans text-[13px] leading-[1.6] text-stone">{t.estimate}</p>

          <div className="mt-8 border-t border-chalk pt-8">
            <h2 className="font-display text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-ink">
              {t.requestTitle}
            </h2>
            <p className="mt-2 font-sans text-[13px] leading-[1.6] text-ink">{t.requestLead}</p>
            <div className="mt-6">
              <RequestForm
                type="consommateur"
                productSlug={params.slug}
                productName={item.name}
                submitLabel={t.submit}
              />
            </div>
            <p className="mt-5 font-sans text-[13px] leading-[1.6] text-stone">{t.formNote}</p>
            {whatsapp && (
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 font-sans text-[13px] text-ink link-underline">
                <WhatsAppIcon />
                {t.whatsapp}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex items-start gap-3 border border-chalk px-5 py-4">
        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-stone font-sans text-[10px] text-stone" aria-hidden="true">
          i
        </span>
        <p className="font-sans text-[13px] leading-[1.6] text-ink">{t.security}</p>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M21 11.5a8.5 8.5 0 01-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1121 11.5Z" />
    </svg>
  );
}
