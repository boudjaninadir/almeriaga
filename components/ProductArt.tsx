import { Icon, type IconName } from '@/components/ui/Icons';

type ProductArtProps = {
  icon: IconName;
  className?: string;
};

/**
 * @deprecated Utilitaire hérité (thème clair). Le visuel des fiches est désormais
 * components/produit/ProductVisual.tsx, qui affiche la photo du produit ou une pastille.
 */
export function ProductArt({ icon, className }: ProductArtProps) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#0E4635] p-6 ${className ?? ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#12513D]/40 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-[#D4AF37]">
        <div className="rounded-2xl border border-[#D4AF37]/25 bg-[#0B3D2E] p-4 shadow-soft">
          <Icon name={icon} className="h-12 w-12 text-[#D4AF37]" />
        </div>
      </div>
    </div>
  );
}

/**
 * @deprecated Ancienne bannière « ambiance GTA VI » : le produit vedette est sorti de la
 * structure. Le composant est conservé inerte pour ne pas casser un import hérité.
 */
export function GtaViAmbianceBanner() {
  return null;
}


/* Ancienne bannière « ambiance GTA VI » retirée : plus aucun produit vedette. */

