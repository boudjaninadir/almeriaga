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
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface p-6 ${className ?? ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-soft/40 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-accent-ink">
        <div className="rounded-2xl border border-line bg-canvas p-4 shadow-soft">
          <Icon name={icon} className="h-12 w-12 text-accent-ink" />
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

