import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { AVAILABILITY_LABEL, PRODUCTS } from '@/lib/catalog';

export function ProductsSection() {
  return (
    <section id="produits" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>Catalogue</Badge>
        <h2 className="section-title">Nos produits & équipements</h2>
        <p className="section-lead mx-auto">
          Sélection rigoureuse de consoles, casques VR, PC gaming et accessoires. Disponibilité transparente et prix sur demande.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((prod) => (
          <Card key={prod.slug} className="transition hover:shadow-lift flex flex-col justify-between">
            <CardBody className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge tone="brand">{AVAILABILITY_LABEL[prod.availability]}</Badge>
                  <span className="text-xs font-semibold text-gold">Garantie {prod.warrantyMonths}m</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-ink">{prod.name}</h3>
                  <p className="text-sm font-semibold text-brand">Prix sur demande</p>
                </div>
                <ul className="space-y-2 pt-2 border-t border-line text-xs text-ink-soft">
                  {prod.pack.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{item.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <ButtonLink href="/#reserver" variant="secondary" size="md" className="w-full">
                  Demander un rappel
                </ButtonLink>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
