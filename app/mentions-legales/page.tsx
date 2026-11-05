import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { LEGAL, SITE } from '@/lib/site';

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales et informations réglementaires d’ALMERÍAGA.',
};

export default function MentionsLegalesPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-page max-w-3xl space-y-8">
        <div className="space-y-4 text-center">
          <Badge>Conformité</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink">Mentions légales</h1>
          <p className="text-sm text-ink-soft">Informations obligatoires conformément à la législation en vigueur.</p>
        </div>

        <Card>
          <CardBody className="space-y-6 text-sm text-ink-soft leading-relaxed">
            <div className="space-y-2">
              <h2 className="font-bold text-ink text-base">1. Éditeur du site</h2>
              <p>Le site <strong className="text-ink">{SITE.name}</strong> est édité par :</p>
              <ul className="list-disc pl-5 space-y-1">
                {LEGAL.sellerName && <li>Nom / Raison sociale : <strong className="text-ink">{LEGAL.sellerName}</strong></li>}
                <li>Statut : Auto-entrepreneur · Micro-importateur</li>
                {LEGAL.anae && <li>N° ANAE : <strong className="text-ink">{LEGAL.anae}</strong></li>}
                {LEGAL.nif && <li>NIF : <strong className="text-ink">{LEGAL.nif}</strong></li>}
                {LEGAL.city && <li>Localisation : <strong className="text-ink">{LEGAL.city}, Algérie</strong></li>}
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-ink text-base">2. Propriété intellectuelle</h2>
              <p>
                PlayStation et PS5 sont des marques déposées de Sony Interactive Entertainment. ALMERÍAGA n’est pas affilié à Sony. Grand Theft Auto est une marque de Take-Two Interactive. Tous les autres noms de marques et logos appartiennent à leurs propriétaires respectifs.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-ink text-base">3. Données personnelles</h2>
              <p>
                Les informations recueillies via les formulaires de réservation ou de contact servent exclusivement au traitement de votre demande et à la confirmation par téléphone. Aucune donnée n'est cédée à des tiers.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="font-bold text-ink text-base">4. Hébergement</h2>
              <p>
                Ce site est hébergé par Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA).
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
