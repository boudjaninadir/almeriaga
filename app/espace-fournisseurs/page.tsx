import { notFound } from 'next/navigation';
import { LeadForm } from '@/components/LeadForm';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { SITE, whatsappLink } from '@/lib/site';

export const metadata = {
  title: 'Espace fournisseurs & guides micro-importation',
  description: 'Ressources, guides ANAE/CASNOS, annuaire et liste d’attente pour les micro-importateurs en Algérie.',
};

export default function EspaceFournisseursPage() {
  // Route retirée de la structure (voir PLAN.md) : elle répond désormais 404.
  notFound();

  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, je souhaite en savoir plus sur l'espace fournisseurs.`);

  return (
    <div className="py-12 md:py-20">
      <div className="container-page space-y-12">
        <div className="mx-auto max-w-2xl text-center space-y-4">
          <Badge>Bientôt disponible</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F7F5EF] sm:text-4xl">
            Espace fournisseurs & micro-importateurs
          </h1>
          <p className="text-ink-soft">
            Guides pratiques (ANAE, CASNOS, douanes), annuaire de sourcing et bonnes pratiques pour réussir votre micro-importation en toute légalité.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl border border-[#D4AF37]/25 bg-[#12513D] p-3 text-[#D4AF37]"><Icon name="book" className="h-6 w-6" /></div>
              <h3 className="font-bold text-[#F7F5EF]">Guides ANAE / CASNOS</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Toutes les démarches administratives pour déclarer votre activité d'auto-entrepreneur sans ambiguïté.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl border border-[#D4AF37]/25 bg-[#12513D] p-3 text-[#D4AF37]"><Icon name="users" className="h-6 w-6" /></div>
              <h3 className="font-bold text-[#F7F5EF]">Annuaire vérifié</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Répertoire de contacts et grossistes de confiance testés sur le terrain.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl border border-[#D4AF37]/25 bg-[#12513D] p-3 text-[#D4AF37]"><Icon name="phone" className="h-6 w-6" /></div>
              <h3 className="font-bold text-[#F7F5EF]">Modèles de messages</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Scripts professionnels pour négocier et communiquer efficacement avec vos fournisseurs à l'étranger.
              </p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="space-y-4">
              <div className="inline-flex rounded-2xl border border-[#D4AF37]/25 bg-[#12513D] p-3 text-[#D4AF37]"><Icon name="shield" className="h-6 w-6" /></div>
              <h3 className="font-bold text-[#F7F5EF]">Check-list voyage & visa</h3>
              <p className="text-sm text-ink-soft leading-relaxed">
                Conseils logistiques et préparation de voyage. (Aucune vente de rendez-vous visa ou fausse invitation).
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="mx-auto max-w-xl">
          <Card className="border-[#D4AF37]/25 shadow-lift">
            <CardBody className="space-y-8 p-8 sm:p-10">
              <div className="space-y-2 text-center">
                <Badge>Liste d'attente</Badge>
                <h2 className="text-2xl font-bold tracking-tight text-[#F7F5EF]">Être prévenu(e) du lancement</h2>
                <p className="text-sm text-ink-soft">Inscrivez-vous pour recevoir l'accès dès l'ouverture des ressources.</p>
              </div>

              <LeadForm kind="waitlist" />

              {whatsapp && (
                <p className="text-center text-xs text-ink-faint pt-2">
                  Contact : <a href={whatsapp ?? undefined} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] underline">WhatsApp</a>
                </p>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
