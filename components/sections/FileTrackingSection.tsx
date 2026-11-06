import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';

export function FileTrackingSection() {
  return (
    <section id="suivi" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>Informations administratives</Badge>
        <h2 className="section-title">Parcours & Suivi de dossier micro-importateur</h2>
        <p className="section-lead mx-auto">
          Les 5 étapes clés réglementaires pour structurer votre activité en toute légalité en Algérie.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-5">
        <Card><CardBody className="space-y-2"><span className="text-xs font-bold text-[#8A6D1F]">Étape 1</span><h3 className="font-bold text-[#1B1F1D] text-sm">ANAE</h3><p className="text-xs text-ink-soft">Carte d'artisan / micro-entrepreneur.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><span className="text-xs font-bold text-[#8A6D1F]">Étape 2</span><h3 className="font-bold text-[#1B1F1D] text-sm">CASNOS</h3><p className="text-xs text-ink-soft">Affiliation sécurité sociale non-salariés.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><span className="text-xs font-bold text-[#8A6D1F]">Étape 3</span><h3 className="font-bold text-[#1B1F1D] text-sm">NIF / Registre</h3><p className="text-xs text-ink-soft">Identification fiscale et légale.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><span className="text-xs font-bold text-[#8A6D1F]">Étape 4</span><h3 className="font-bold text-[#1B1F1D] text-sm">Préparation dossier</h3><p className="text-xs text-ink-soft">Justificatifs de voyage et factures.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><span className="text-xs font-bold text-[#8A6D1F]">Étape 5</span><h3 className="font-bold text-[#1B1F1D] text-sm">Orientation visa</h3><p className="text-xs text-ink-soft">Démarches consulaires de sourcing.</p></CardBody></Card>
      </div>

      <Card className="border-[#D4AF37]/30 bg-[#FCFBF7]">
        <CardBody className="space-y-4 p-6 sm:p-8">
          <h3 className="font-bold text-[#1B1F1D] text-base">Vérification de dossier</h3>
          <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
            <input
              type="text"
              disabled
              placeholder="Numéro de suivi (ex : ALM-2026-XXXX)"
              className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#F7F5EF] px-4 py-3 text-sm text-ink-faint cursor-not-allowed"
            />
            <button disabled className="rounded-xl bg-[#D4AF37]/30 px-6 py-3 text-sm font-semibold text-ink-faint cursor-not-allowed">
              Bientôt disponible
            </button>
          </div>
          <p className="text-xs text-ink-faint">
            * Aucune garantie d'obtention d'un visa ou d'un rendez-vous. ALMERÍAGA n'est pas un organisme officiel.
          </p>
        </CardBody>
      </Card>
    </section>
  );
}
