import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { BRAND_NAME, CONTACT_EMAIL } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Statut de l’éditeur, activité déclarée, propriété intellectuelle et données personnelles.',
  alternates: { canonical: '/mentions-legales' },
};

/**
 * Mentions légales.
 * Aucun identifiant personnel (nom, NIF, ANAE, CASNOS, RIB) n'est codé en dur :
 * ces mentions doivent être complétées par l'exploitant, puis validées.
 */
export default function MentionsLegalesPage() {
  return (
    <div className="container-page max-w-3xl py-14 md:py-20">
      <div className="space-y-3">
        <Badge tone="neutral">Informations légales</Badge>
        <h1 className="section-title">Mentions légales</h1>
        <p className="text-sm leading-relaxed text-ink-soft">
          Informations relatives à l’éditeur du site et au traitement des données.
        </p>
      </div>

      <Card className="mt-8">
        <CardBody className="space-y-7 text-sm leading-relaxed text-ink-soft">
          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">1. Éditeur du site</h2>
            <p>
              Le site <strong className="text-[#1B1F1D]">{BRAND_NAME}</strong> est édité par un auto-entrepreneur exerçant une
              activité déclarée de micro-importation (décret exécutif n° 25-170).
            </p>
            <p className="rounded-lg border border-[#D4AF37]/25 bg-[#F1EDE3] p-3 text-xs text-ink-faint">
              TODO — avant publication : compléter ici les mentions obligatoires (identité de l’exploitant, numéro
              d’immatriculation, adresse professionnelle, contact). Ces informations ne sont volontairement pas
              intégrées au code afin qu’aucun identifiant personnel ne soit exposé par erreur.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">2. Activité et périmètre</h2>
            <p>
              L’activité consiste à sélectionner des produits en Europe et à les importer dans le cadre du régime de la
              micro-importation, pour une remise dans les wilayas desservies. Les prix publics sont exprimés en dinars
              algériens (DZD) ; aucun paiement n’est effectué en ligne.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">3. Propriété intellectuelle</h2>
            <p>
              Les marques et noms commerciaux cités sur ce site appartiennent à leurs propriétaires respectifs. Les
              visuels de produits proviennent des produits de l’éditeur ou de ses fournisseurs ; toute reproduction
              sans autorisation est interdite.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">4. Données personnelles</h2>
            <p>
              Les formulaires du site collectent uniquement le nom, le téléphone et la wilaya, ainsi que, pour les
              professionnels, le nom de la société, le volume estimé et le message. Ces données servent exclusivement au
              traitement de la demande et à la confirmation téléphonique. Elles ne sont ni cédées ni revendues.
            </p>
            <p>
              Pour demander la consultation ou la suppression de vos données, écrivez à{' '}
              {CONTACT_EMAIL ? (
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-[#8A6D1F] underline underline-offset-2">
                  {CONTACT_EMAIL}
                </a>
              ) : (
                <span className="font-medium text-[#1B1F1D]">l’adresse de contact (TODO : non configurée)</span>
              )}
              .
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">5. Hébergement</h2>
            <p>Le site est hébergé par Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis).</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-semibold text-[#1B1F1D]">6. Responsabilité</h2>
            <p>
              Les informations légales présentées sur ce site (ANAE, décret n° 25-170, démarches, droits et taxes) sont
              fournies à titre indicatif et ne constituent pas un conseil juridique. Elles doivent être vérifiées auprès
              des administrations compétentes avant toute décision.
            </p>
          </section>
        </CardBody>
      </Card>

      <p className="mt-6 text-xs text-ink-faint">
        <Link href="/cadre-legal" className="underline underline-offset-2 hover:text-[#8A6D1F]">
          Voir la démarche de micro-importation
        </Link>
      </p>
    </div>
  );
}

