import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { getLocaleContext } from '@/lib/i18n/server';

export function HowItWorksSection() {
  const { dict } = getLocaleContext();
  const { how } = dict;

  return (
    <section id="comment-ca-marche" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>{how.badge}</Badge>
        <h2 className="section-title">{how.title}</h2>
        <p className="section-lead mx-auto">{how.lead}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {how.steps.map((step, index) => (
          <Card key={step.title}>
            <CardBody className="space-y-3">
              <span className="text-2xl font-bold text-brand">{`0${index + 1}`}</span>
              <h3 className="font-bold text-ink">{step.title}</h3>
              <p className="text-xs text-ink-soft">{step.body}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
