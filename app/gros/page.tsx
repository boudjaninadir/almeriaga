import { LeadForm } from '@/components/LeadForm';
import { Ar } from '@/components/Ar';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { SITE, whatsappLink } from '@/lib/site';

export const metadata = {
  title: 'Achat en gros & Revendeurs',
  description: 'Approvisionnement en gros pour les boutiques de jeux vidéo et revendeurs en Algérie. Tarifs préférentiels et accompagnement.',
};

export default function GrosPage() {
  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, je suis revendeur et souhaite des informations sur l'achat en gros.`);

  return (
    <div className="py-12 md:py-20">
      <div className="container-page space-y-12">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <Badge>Espace B2B / Revendeurs</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Approvisionnement en gros <Ar>البيع بالجملة</Ar>
          </h1>
          <p className="text-ink-soft">
            Vous possédez une boutique de jeux vidéo ou êtes revendeur ? Bénéficiez de conditions privilégiées et d'un approvisionnement direct et régulier.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl bg-brand-soft p-3 text-brand"><Icon name="store" className="h-6 w-6" /></div>
              <h3 className="font-bold text-ink">Tarifs dégressifs</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Marges attractives pour les boutiques partenaires selon les volumes commandés (à partir de 5 unités).
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl bg-brand-soft p-3 text-brand"><Icon name="shield" className="h-6 w-6" /></div>
              <h3 className="font-bold text-ink">Produits vérifiés</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Consoles neuves d'origine, emballées et garanties. Traçabilité et conformité assurées.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl bg-brand-soft p-3 text-brand"><Icon name="phone" className="h-6 w-6" /></div>
              <h3 className="font-bold text-ink">Suivi dédié</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Un interlocuteur unique pour vos commandes, vos plannings de livraison et vos questions logistiques.
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border-brand/20 shadow-lift">
            <CardBody className="space-y-8 p-8 sm:p-10">
              <div className="space-y-2 text-center">
                <Badge>Rappel B2B</Badge>
                <h2 className="text-2xl font-bold tracking-tight text-ink">Demander un rappel <Ar>طلب اتصال</Ar></h2>
                <p className="text-sm text-ink-soft">Indiquez vos coordonnées et votre volume prévisionnel.</p>
              </div>

              <LeadForm kind="wholesale" />

              {whatsapp && (
                <p className="text-center text-xs text-ink-faint pt-2">
                  Contact direct : <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-brand underline">WhatsApp <Ar>واتساب</Ar></a>
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
