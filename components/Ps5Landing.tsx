import { LeadForm } from '@/components/LeadForm';
import { Ar } from '@/components/Ar';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { HeroBrandSection } from '@/components/sections/HeroBrandSection';
import { AVAILABILITY_LABEL, FEATURED_PRODUCT } from '@/lib/catalog';
import { SITE, whatsappLink } from '@/lib/site';

export function Ps5Landing() {
  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, info PS5.`);

  return (
    <>
      <HeroBrandSection />

      <section id="pack" className="scroll-mt-20 py-16 md:py-24 bg-surface/50">
        <div className="container-page space-y-12">
          <div className="mx-auto max-w-2xl text-center space-y-4">
            <Badge>Le contenu</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">Ce que contient votre pack</h2>
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
        </div>
      </section>

      <section id="reserver" className="scroll-mt-20 py-16 md:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-xl">
            <Card className="border-brand/20 shadow-lift">
              <CardBody className="space-y-8 p-8 sm:p-10">
                <div className="space-y-2 text-center">
                  <Badge>Réservation</Badge>
                  <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">Réserver votre pack</h2>
                </div>
                <LeadForm kind="retail" />
                {whatsapp && (
                  <p className="text-center text-xs text-ink-faint pt-2">
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-brand underline">WhatsApp <Ar>اتصل</Ar></a>
                  </p>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-line bg-canvas/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-semibold text-ink">Pack PS5 Slim + GTA VI</p></div>
          <ButtonLink href="#reserver" size="md">Réserver <Ar>حجز</Ar></ButtonLink>
        </div>
      </div>
    </>
  );
}
