import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { getLocaleContext } from '@/lib/i18n/server';
import { interpolate } from '@/lib/i18n/format';

export function FileTrackingSection() {
  const { dict } = getLocaleContext();
  const { tracking } = dict;

  return (
    <section id="suivi" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>{tracking.badge}</Badge>
        <h2 className="section-title">{tracking.title}</h2>
        <p className="section-lead mx-auto">{tracking.lead}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        {tracking.steps.map((step, index) => (
          <Card key={step.title}>
            <CardBody className="space-y-2">
              <span className="text-xs font-bold text-brand">{interpolate(tracking.step, { n: index + 1 })}</span>
              <h3 className="font-bold text-ink text-sm">{step.title}</h3>
              <p className="text-xs text-ink-soft">{step.body}</p>
            </CardBody>
          </Card>
        ))}
      </div>

      <Card className="border-brand/30 bg-surface">
        <CardBody className="space-y-4 p-6 sm:p-8">
          <h3 className="font-bold text-ink text-base">{tracking.verifyTitle}</h3>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              disabled
              placeholder={tracking.placeholder}
              className="w-full rounded-xl border border-line bg-canvas px-4 py-3 text-sm text-ink-faint cursor-not-allowed"
            />
            <button disabled className="rounded-xl bg-line px-6 py-3 text-sm font-semibold text-ink-faint cursor-not-allowed">
              {tracking.soon}
            </button>
          </div>
          <p className="text-xs text-ink-faint">{tracking.disclaimer}</p>
        </CardBody>
      </Card>
    </section>
  );
}
