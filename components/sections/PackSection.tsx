import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { FEATURED_PRODUCT } from '@/lib/catalog';
import { GtaViAmbianceBanner } from '@/components/ProductArt';

export function PackSection() {
  return (
    <section id="pack" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>Le pack phare</Badge>
        <h2 className="section-title">Ce que contient votre pack PS5 + GTA VI</h2>
        <p className="section-lead mx-auto">
          Conçu pour les passionnés exigeants, sans compromis sur l'authenticité et la sécurité.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURED_PRODUCT.pack.map((item, idx) => (
          <Card key={idx} className="transition hover:shadow-lift">
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl bg-brand-soft p-3 text-brand"><Icon name={item.icon} className="h-6 w-6" /></div>
              <div className="space-y-1">
                <h3 className="font-bold text-ink">{item.title}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{item.body}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <GtaViAmbianceBanner />
    </section>
  );
}
