import type { Metadata } from 'next';
import { Faq } from '@/components/landing/Faq';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Trust } from '@/components/landing/Trust';
import { ProductCard } from '@/components/produit/ProductCard';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { getFeaturedProduct } from '@/lib/products';
import { currentLocale } from '@/lib/locale-server';
import { BRAND_NAME, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Micro-importation Europe-Algérie, livrée chez vous',
  description:
    'Produits sélectionnés en Europe et livrés à toutes les wilayas d’Algérie. Commande sans paiement en ligne, confirmation par téléphone, prix en dinars.',
  alternates: { canonical: '/' },
};

/** Landing consommateur (spec V4 §2). */
export default async function HomePage() {
  const pilot = await getFeaturedProduct();
  const locale = currentLocale();
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, je souhaite des informations sur vos produits.`);

  return (
    <>
      <Hero pilot={pilot} locale={locale} />
      <HowItWorks />

      <section className="container-page py-16 md:py-20">
        <Reveal>
          <span className="eyebrow">À la une</span>
          <h2 className="section-title mt-3">La sélection du moment</h2>
          <p className="section-lead">
            Une sélection courte et vérifiée : chaque produit est contrôlé avant la remise et livré dans toutes les
            wilayas d’Algérie.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <Reveal>
            <ProductCard product={pilot} />
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-5">
              <h3 className="text-2xl font-semibold tracking-tightish text-[#1B1F1D]">Démarrer en trois minutes</h3>
              <p className="text-sm leading-relaxed text-ink-soft">
                Vous laissez votre nom, votre téléphone et votre wilaya. Nous vous rappelons pour confirmer la
                disponibilité, le délai et le lieu de remise. Le paiement se fait à la remise, jamais en ligne.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={`/produit/${pilot.slug}`} size="lg">
                  Voir la fiche
                  <Icon name="arrow" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/produits" variant="secondary" size="lg">
                  Parcourir les produits
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Trust />
      <Faq />

      <section className="container-page pb-4">
        <Reveal>
          <div className="surface-card flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tightish text-[#1B1F1D]">Une question avant de commander ?</h2>
              <p className="text-sm leading-relaxed text-ink-soft">
                Écrivez-nous : nous répondons sur WhatsApp, ou par e-mail depuis la page contact.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#FCFBF7] px-6 text-base font-semibold text-[#8A6D1F] transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1B1F1D] active:translate-y-0"
                >
                  <Icon name="whatsapp" className="h-5 w-5" />
                  WhatsApp
                </a>
              )}
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Contact
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}


