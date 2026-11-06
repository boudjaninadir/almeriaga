import { Badge } from '@/components/ui/Badge';
import { LEGAL, SITE } from '@/lib/site';

export function AboutSection() {
  return (
    <section id="a-propos" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-surface p-8 sm:p-12 border border-line space-y-6">
        <Badge>À propos de nous</Badge>
        <h2 className="text-3xl font-bold text-ink">ALMERÍAGA — Sourcing & Micro-importation</h2>
        <div className="space-y-4 text-sm text-ink-soft leading-relaxed">
          <p>
            Inspiré par les hubs de sourcing d'Almería, <strong className="font-semibold text-ink">{SITE.name}</strong> connecte les passionnés et revendeurs algériens aux équipements next-gen les plus recherchés. Fondé par <strong className="font-semibold text-ink">{LEGAL.sellerName}</strong>, auto-entrepreneur micro-importateur ({LEGAL.city}, Algérie), nous défendons des valeurs de transparence totale, d'importation déclarée et de paiement à la livraison.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-line text-xs">
            <div><span className="font-bold text-ink">N° ANAE :</span> {LEGAL.anae}</div>
            <div><span className="font-bold text-ink">NIF :</span> {LEGAL.nif}</div>
            <div><span className="font-bold text-ink">Siège :</span> {LEGAL.city}, Algérie</div>
          </div>
        </div>
      </div>
    </section>
  );
}
