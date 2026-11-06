import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { ANAE_PROCEDURE, PROCEDURE_DISCLAIMER } from '@/lib/data/anae-procedure';
import { t } from '@/lib/i18n';
import { currentLocale } from '@/lib/locale-server';

export const metadata: Metadata = {
  title: 'Procédure ANAE de A à Z',
  description:
    'Toutes les étapes officielles de la micro-importation : carte auto-entrepreneur, autorisation générale, douane, visa et documents obligatoires.',
  alternates: { canonical: '/anne-procedure' },
};

const PHASE_ICON = { legal: 'shield', mobilite: 'route', terrain: 'store' } as const;

/** Tier gratuit (spec V4 §3) : procédure ANAE complète, documents et visa. */
export default function AnneProcedurePage() {
  const locale = currentLocale();
  const phases = ['legal', 'mobilite', 'terrain'] as const;

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <Badge tone="mint">{t(locale, 'badge_legal')}</Badge>
        <h1 className="section-title mt-4">{t(locale, 'procedure_title')}</h1>
        <p className="section-lead">{t(locale, 'procedure_lead')}</p>
      </Reveal>

      <div className="mt-12 space-y-10">
        {phases.map((phase) => (
          <section key={phase}>
            <Reveal>
              <h2 className="text-xl font-semibold text-[#D4AF37]">
                {phase === 'legal' ? '1. Cadre légal' : phase === 'mobilite' ? '2. Mobilité & visa' : '3. Terrain & douane'}
              </h2>
            </Reveal>
            <div className="mt-5 grid gap-6 lg:grid-cols-2">
              {ANAE_PROCEDURE.filter((step) => step.phase === phase).map((step, index) => (
                <Reveal key={step.id} delay={index * 60}>
                  <Card className="h-full">
                    <CardBody className="space-y-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#12513D] text-[#D4AF37]">
                        <Icon name={PHASE_ICON[phase]} className="h-5 w-5" />
                      </span>
                      <h3 className="text-base font-semibold text-[#F7F5EF]">{step.title}</h3>
                      <p className="text-sm text-ink-soft">
                        <span className="font-medium text-[#D4AF37]">{step.organism}</span>
                      </p>
                      <p className="text-sm leading-relaxed text-ink-soft">Documents : {step.documents}</p>
                      <p className="text-xs leading-relaxed text-ink-faint">{step.note}</p>
                    </CardBody>
                  </Card>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-10 rounded-xl3 border border-warn/25 bg-warn/5 p-6">
          <div className="flex gap-3">
            <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0 text-warn" />
            <p className="text-sm leading-relaxed text-ink-soft">{PROCEDURE_DISCLAIMER}</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
