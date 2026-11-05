import type { Metadata } from 'next';
import { LeadCaptureForm } from '@/components/lead/LeadCaptureForm';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { BRAND_NAME, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Programme revendeur',
  description:
    'Programme revendeur Almeríaga : magasins et commerces en Algérie. Conditions étudiées selon la zone, le type de commerce et le volume.',
  alternates: { canonical: '/revendeurs' },
};

const STEPS = [
  {
    icon: 'store' as const,
    title: 'Vous décrivez votre magasin',
    body: 'Nom du magasin, wilaya, type de commerce et volume estimé. Trois minutes suffisent.',
  },
  {
    icon: 'chart' as const,
    title: 'Nous étudions la demande',
    body: 'Chaque demande est examinée selon la zone et la capacité de réassort. Aucun engagement automatique.',
  },
  {
    icon: 'truck' as const,
    title: 'Nous planifions les livraisons',
    body: 'Les modalités sont écrites et confirmées avant la première commande, en dinars.',
  },
];

/** Parcours revendeur : formulaire distinct, enregistré avec type = "revendeur". */
export default function RevendeursPage() {
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, je souhaite rejoindre le programme revendeur.`);

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <Badge tone="mint">Revendeurs</Badge>
        <h1 className="section-title mt-4">Programme revendeur</h1>
        <p className="section-lead">
          Vous tenez un commerce et cherchez un fournisseur régulier sur des familles de produits autorisées ? Présentez
          votre magasin : nous revenons vers vous avec les modalités.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {STEPS.map((step, index) => (
          <Reveal key={step.title} delay={index * 80}>
            <Card className="h-full">
              <CardBody className="space-y-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-mint-ink">
                  <Icon name={step.icon} className="h-5 w-5" />
                </span>
                <h2 className="text-base font-semibold tracking-tightish text-ink">{step.title}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal>
          <Card>
            <CardBody className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tightish text-ink">Inscription revendeur</h2>
                <p className="text-sm text-ink-soft">
                  Votre demande est enregistrée séparément des demandes de particuliers.
                </p>
              </div>
              <LeadCaptureForm type="revendeur" />
            </CardBody>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tightish text-ink">Ce que nous ne faisons pas</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-ink-soft">
              {[
                'Aucun produit interdit par la réglementation (friperie, pièces auto, médicaments, armes, drones, produits chimiques dangereux, smartphones, gros électroménager, alimentaire frais).',
                'Aucun prix public : les conditions sont propres à chaque demande.',
                'Aucun engagement automatique : chaque dossier est validé avant la première commande.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0 text-warn" />
                  {item}
                </li>
              ))}
            </ul>

            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-mint-ink transition-colors hover:text-accent-ink"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
                Une question sur le programme ?
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
