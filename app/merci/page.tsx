import type { Metadata } from 'next';
import Link from 'next/link';
import { ThankYouTracker } from '@/components/ThankYouTracker';
import { ButtonLink } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icons';
import { BRAND_NAME, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Demande envoyée',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams?: { type?: string; slug?: string; nom?: string; eid?: string };
};

const MESSAGE: Record<string, string> = {
  consommateur: 'Votre commande est enregistrée.',
  devis: 'Votre demande de devis est enregistrée.',
  gros: 'Votre demande professionnelle est enregistrée.',
  revendeur: 'Votre demande de partenariat est enregistrée.',
};

/** Confirmation après envoi : c'est ici que l'événement Meta « Lead » est déclenché. */
export default function MerciPage({ searchParams }: PageProps) {
  const type = searchParams?.type ?? '';
  const productName = searchParams?.nom ?? '';
  const eventId = searchParams?.eid ?? '';
  const title = MESSAGE[type] ?? 'Votre demande est enregistrée.';
  const whatsapp = whatsappLink(
    productName
      ? `Bonjour ${BRAND_NAME}, je viens d’envoyer une demande pour ${productName}.`
      : `Bonjour ${BRAND_NAME}, je viens d’envoyer une demande.`,
  );

  return (
    <div className="container-page py-16 md:py-24">
      <ThankYouTracker eventId={eventId} contentName={productName || type || 'demande'} />

      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#F1EDE3] text-[#8A6D1F]">
          <Icon name="check" className="h-8 w-8" />
        </span>

        <h1 className="mt-6 text-3xl font-semibold tracking-display text-[#1B1F1D] sm:text-4xl">{title}</h1>

        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          Nous vous rappelons au numéro indiqué pour confirmer
          {productName ? ` ${productName}` : ' votre demande'}. Aucun paiement n’est demandé en ligne.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#FCFBF7] px-6 text-base font-semibold text-[#8A6D1F] transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1B1F1D] active:translate-y-0"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              Continuer sur WhatsApp
            </a>
          )}
          <ButtonLink href="/produits" variant="secondary" size="lg">
            Retour aux produits
          </ButtonLink>
        </div>

        <p className="mt-8 text-xs text-ink-faint">
          Vous pouvez fermer cette page.{' '}
          <Link href="/" className="underline underline-offset-2 hover:text-[#8A6D1F]">
            Revenir à l’accueil
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
