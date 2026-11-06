import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { PRODUCTS } from '@/lib/catalog';
import { interpolate } from '@/lib/i18n/format';
import { getLocaleContext } from '@/lib/i18n/server';

export function ProductsSection() {
  const { dict } = getLocaleContext();
  const { products, common } = dict;

  return (
    <section id="produits" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>{products.badge}</Badge>
        <h2 className="section-title">{products.title}</h2>
        <p className="section-lead mx-auto">{products.lead}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((prod) => {
          const localized = products.items[prod.slug as keyof typeof products.items];
          const bullets = localized?.bullets ?? prod.pack.map((item) => item.title);
          return (
            <Card key={prod.slug} className="transition hover:shadow-lift flex flex-col justify-between">
              <CardBody className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="brand">{products.availability[prod.availability]}</Badge>
                    <span className="text-xs font-semibold text-gold">
                      {prod.warrantyMonths > 0
                        ? interpolate(common.warrantyShort, { months: prod.warrantyMonths })
                        : null}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-ink">{localized?.name ?? prod.name}</h3>
                    <p className="text-sm font-semibold text-brand">{common.priceOnRequest}</p>
                  </div>
                  <ul className="space-y-2 pt-2 border-t border-line text-xs text-ink-soft">
                    {bullets.map((title, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                        <span>{title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-4">
                  <ButtonLink href="/#reserver" variant="secondary" size="md" className="w-full">
                    {common.callback}
                  </ButtonLink>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
