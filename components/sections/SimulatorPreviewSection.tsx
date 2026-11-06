import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';

export function SimulatorPreviewSection() {
  return (
    <section id="simulateur" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-[#0E4635] p-8 sm:p-12 border border-[#D4AF37]/25 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Badge>Outil revendeur</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-[#F7F5EF]">Simulateur de rentabilité & plafonds</h2>
          <p className="text-sm text-ink-soft leading-relaxed">
            Calculez instantanément vos coûts de revient, marges nettes, seuil de rentabilité et le respect du plafond légal de 1 800 000 DA par voyage.
          </p>
          <div className="grid grid-cols-3 gap-4 py-2">
            <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
              <p className="text-xs text-ink-faint">Plafond légal</p>
              <p className="text-base font-bold text-[#D4AF37] mt-1">1,8M DA</p>
            </div>
            <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
              <p className="text-xs text-ink-faint">Scénarios</p>
              <p className="text-base font-bold text-[#F7F5EF] mt-1">3 modes</p>
            </div>
            <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
              <p className="text-xs text-ink-faint">Taux change</p>
              <p className="text-base font-bold text-[#F7F5EF] mt-1">Réel / Banque</p>
            </div>
          </div>
          <div>
            <ButtonLink href="/simulateur" size="lg">
              Ouvrir le simulateur complet
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-2xl bg-dark-block p-6 text-[#F7F5EF] space-y-4">
          <p className="text-xs uppercase tracking-widest text-gold-light font-semibold">Aperçu direct</p>
          <p className="text-xl font-bold">Maîtrisez votre micro-importation</p>
          <p className="text-xs text-[#F7F5EF]/80 leading-relaxed">
            Le simulateur intègre les frais de transport, ferry, douane et taux de change pour vous offrir une vision claire et sécurisée de votre activité.
          </p>
        </div>
      </div>
    </section>
  );
}
