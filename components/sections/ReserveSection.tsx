import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { LeadForm } from '@/components/LeadForm';
import { getLocaleContext } from '@/lib/i18n/server';
import { interpolate } from '@/lib/i18n/format';
import { CONTACT, displayPhone, whatsappLink } from '@/lib/site';

/**
 * Bloc de réservation du pack phare (ancre `#reserver`).
 * Cible de tous les CTA du site : header, hero, cartes produit, pied de page, barre mobile.
 */
export function ReserveSection() {
  const { dict } = getLocaleContext();
  const { reserve } = dict;
  const whatsapp = whatsappLink(reserve.whatsappMessage);

  return (
    <section id="reserver" className="scroll-mt-20 container-page">
      <div className="mx-auto max-w-xl">
        <Card className="border-brand/20 shadow-lift">
          <CardBody className="space-y-8 p-8 sm:p-10">
            <div className="space-y-2 text-center">
              <Badge>{reserve.badge}</Badge>
              <h2 className="text-2xl font-bold tracking-tightish text-ink sm:text-3xl">{reserve.title}</h2>
              <p className="text-sm text-ink-soft">
                {interpolate(reserve.lead, { delay: reserve.callbackDelay, note: reserve.note })}
              </p>
            </div>

            <LeadForm kind="retail" />

            <div className="space-y-1 border-t border-line pt-4 text-center text-xs text-ink-faint">
              {whatsapp && (
                <p>
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-2">
                    {reserve.whatsapp} {displayPhone(CONTACT.whatsappNumber)}
                  </a>
                </p>
              )}
              <p>{reserve.fallback}</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
