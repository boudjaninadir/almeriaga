import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { getLocaleContext } from '@/lib/i18n/server';

export function FaqSection() {
  const { dict } = getLocaleContext();
  const { faq } = dict;

  return (
    <section id="faq" className="scroll-mt-20 container-page space-y-8">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>{faq.badge}</Badge>
        <h2 className="section-title">{faq.title}</h2>
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        {faq.items.map((item) => (
          <Card key={item.q}>
            <CardBody className="space-y-2">
              <h3 className="font-bold text-ink">{item.q}</h3>
              <p className="text-xs text-ink-soft leading-relaxed">{item.a}</p>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
