import { Icon, type IconName } from '@/components/ui/Icons';
import { getLocaleContext } from '@/lib/i18n/server';

type ProductArtProps = {
  icon: IconName;
  className?: string;
};

export function ProductArt({ icon, className }: ProductArtProps) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-surface p-6 border border-line ${className ?? ''}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-soft/30 to-transparent pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center justify-center text-brand">
        <div className="rounded-2xl bg-canvas p-4 shadow-soft border border-line">
          <Icon name={icon} className="h-12 w-12 text-brand" />
        </div>
      </div>
    </div>
  );
}

export function GtaViAmbianceBanner() {
  const { dict } = getLocaleContext();
  const banner = dict.pack.banner;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-dark-block p-8 md:p-12 shadow-lift">
      {/* Pure CSS Sunset Neon Gradient & Glow */}
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br from-pink-600/30 via-purple-600/30 to-orange-500/30 blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-gradient-to-tr from-brand/40 to-yellow-600/25 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-pink-300 border border-pink-500/30">
            {banner.badge}
          </span>
          <h3 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {banner.title}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed">
            {banner.body}
          </p>
        </div>
        <div className="flex justify-center">
          <div className="rounded-2xl bg-canvas/10 p-6 backdrop-blur border border-white/15 text-center space-y-3">
            <p className="text-xs uppercase tracking-widest text-gold-light font-semibold">{banner.eventLabel}</p>
            <p className="text-2xl font-bold text-white">{banner.date}</p>
            <p className="text-xs text-white/70">{banner.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
