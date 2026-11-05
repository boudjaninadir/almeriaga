import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Ar } from '@/components/Ar';
import { LeadForm } from '@/components/LeadForm';
import { CONTACT, SITE, displayPhone, whatsappLink } from '@/lib/site';
import { DELIVERY } from '@/lib/catalog';

/**
 * Bloc de réservation du pack phare (ancre `#reserver`).
 * Cible de tous les CTA du site : header, hero, cartes produit, pied de page, barre mobile.
 */
export function ReserveSection() {
  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, info PS5.`);

  return (
    <section id="reserver" className="scroll-mt-20 container-page">
      <div className="mx-auto max-w-xl">
        <Card className="border-brand/20 shadow-lift">
          <CardBody className="space-y-8 p-8 sm:p-10">
            <div className="space-y-2 text-center">
              <Badge>Réservation</Badge>
              <h2 className="text-2xl font-bold tracking-tightish text-ink sm:text-3xl">Réserver votre pack</h2>
              <p className="text-sm text-ink-soft">
                Rappel sous {DELIVERY.callbackDelay}. {DELIVERY.note}
              </p>
            </div>

            <LeadForm kind="retail" />

            <div className="space-y-1 border-t border-line pt-4 text-center text-xs text-ink-faint">
              {whatsapp && (
                <p>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
                    WhatsApp <Ar>اتصل</Ar> {displayPhone(CONTACT.whatsappNumber)}
                  </a>
                </p>
              )}
              <p>Le formulaire ne fonctionne pas ? Écrivez-nous, nous enregistrons votre demande à la main.</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
