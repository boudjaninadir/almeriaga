import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { LEGAL_DISCLAIMER, LEGAL_PHASES } from '@/lib/cadre-legal';

export const metadata: Metadata = {
  title: 'Cadre légal de la micro-importation',
  description:
    'La démarche de micro-importation en trois phases : cadre légal (ANAE, NIF, CASNOS), mobilité, terrain. Aucun montant, aucune date.',
  alternates: { canonical: '/cadre-legal' },
};

/**
 * Page publique de réassurance.
 * Aucun numéro personnel, aucun coût, aucun plafond, aucun taux : la page explique
 * la démarche et renvoie vers l'ANAE et les Douanes pour les valeurs officielles.
 */
export default function CadreLegalPage() {
  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <Badge tone="mint">Cadre légal</Badge>
        <h1 className="section-title mt-4">La micro-importation, étape par étape</h1>
        <p className="section-lead">
          L’activité d’Almeríaga relève du régime de l’auto-entrepreneur et du décret exécutif n° 25-170. Voici les
          étapes que nous suivons, présentées sans chiffres : les montants, plafonds et échéances dépendent des textes
          en vigueur et de votre situation.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {LEGAL_PHASES.map((phase, index) => (
          <Reveal key={phase.id} delay={index * 80}>
            <Card className="h-full">
              <CardBody className="space-y-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                  <Icon name={index === 0 ? 'shield' : index === 1 ? 'route' : 'store'} className="h-5 w-5" />
                </span>
                <h2 className="text-lg font-semibold tracking-tightish text-ink">{phase.title}</h2>
                <p className="text-sm leading-relaxed text-ink-soft">{phase.summary}</p>
                <ol className="space-y-2 border-t border-line pt-4">
                  {phase.steps.map((step) => (
                    <li key={step.label} className="text-sm leading-relaxed text-ink-soft">
                      <span className="font-medium text-ink">{step.label}</span>
                      {step.note && <span className="block text-xs text-ink-faint">{step.note}</span>}
                    </li>
                  ))}
                </ol>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 rounded-xl3 border border-warn/25 bg-warn/5 p-6">
          <div className="flex gap-3">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
            <p className="text-sm leading-relaxed text-ink-soft">{LEGAL_DISCLAIMER}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <ButtonLink href="/contact" size="lg">
            Poser une question
            <Icon name="arrow" className="h-4 w-4" />
          </ButtonLink>
          <p className="text-xs leading-relaxed text-ink-faint">
            Les valeurs officielles (plafonds, droits de douane, échéances) sont à vérifier directement auprès de
            l’ANAE et de la Direction Générale des Douanes.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
