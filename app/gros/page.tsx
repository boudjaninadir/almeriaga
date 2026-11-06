import type { Metadata } from 'next';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { BRAND_NAME, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Gros — approvisionnement professionnel',
  description:
    'Approvisionnement pour les commerces : conditions étudiées au cas par cas, en dinars. Aucun prix public, aucun catalogue en ligne.',
  alternates: { canonical: '/gros' },
};

const POINTS = [
  {
    icon: 'layers' as const,
    title: 'Lots constitués sur demande',
    body: 'Nous partons de vos besoins : familles de produits, quantités et rythme de réassort. Aucun catalogue public n’est publié.',
  },
  {
    icon: 'route' as const,
    title: 'Circuit Europe → Algérie',
    body: 'Les produits sont achetés en Europe puis importés dans le cadre de la micro-importation déclarée.',
  },
  {
    icon: 'receipt' as const,
    title: 'Conditions écrites, en dinars',
    body: 'Les conditions commerciales sont communiquées après échange, en dinars, et confirmées avant tout engagement.',
  },
];

/** Page grossiste : aucun prix public, aucun catalogue. Deux canaux : WhatsApp ou formulaire. */
export default function GrosPage() {
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, je souhaite des informations sur l’achat en gros.`);

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <Badge tone="mint">Professionnels</Badge>
        <h1 className="section-title mt-4">Achat en gros</h1>
        <p className="section-lead">
          Vous gérez une boutique et souhaitez un approvisionnement régulier ? Décrivez votre besoin : nous revenons
          vers vous avec une proposition adaptée, en dinars.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {POINTS.map((point, index) => (
          <Reveal key={point.title} delay={index * 80}>
            <Card className="h-full">
              <CardBody className="space-y-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#F1EDE3] text-[#8A6D1F]">
                  <Icon name={point.icon} className="h-5 w-5" />
                </span>
                <h2 className="text-base font-semibold tracking-tightish text-[#1B1F1D]">{point.title}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{point.body}</p>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tightish text-[#1B1F1D]">Deux façons de nous joindre</h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              Le plus rapide reste WhatsApp. Si vous préférez poser votre besoin par écrit, le formulaire ci-contre
              enregistre votre demande avec votre société, votre wilaya, votre volume et les produits visés.
            </p>
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/45 bg-[#FCFBF7] px-6 text-base font-semibold text-[#8A6D1F] transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-[#D4AF37] hover:text-[#1B1F1D] active:translate-y-0"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                WhatsApp direct
              </a>
            ) : (
              <p className="rounded-xl border border-[#D4AF37]/25 bg-[#F1EDE3] p-4 text-xs text-ink-faint">
                WhatsApp non configuré (TODO) : renseignez NEXT_PUBLIC_CONTACT_WHATSAPP pour activer ce bouton.
              </p>
            )}
            <p className="text-xs leading-relaxed text-ink-faint">
              Aucun prix n’est affiché sur cette page : les conditions dépendent des volumes et de la disponibilité au
              moment de la commande.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <Card>
            <CardBody className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tightish text-[#1B1F1D]">Demande gros</h2>
                <p className="text-sm text-ink-soft">Sans engagement. Réponse par téléphone.</p>
              </div>
              <LeadCaptureForm type="gros" />
            </CardBody>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

