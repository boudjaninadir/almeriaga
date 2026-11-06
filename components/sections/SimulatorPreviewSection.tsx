import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { getLocaleContext } from '@/lib/i18n/server';

export function SimulatorPreviewSection() {
  const { dict } = getLocaleContext();
  const { simulatorPreview: preview } = dict;

  return (
    <section id="simulateur" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-surface p-8 sm:p-12 border border-line grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <Badge>{preview.badge}</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-ink">{preview.title}</h2>
          <p className="text-sm text-ink-soft leading-relaxed">{preview.lead}</p>
          <div className="grid grid-cols-3 gap-4 py-2">
            {preview.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-canvas p-4 border border-line">
                <p className="text-xs text-ink-faint">{stat.label}</p>
                <p className="text-base font-bold text-brand mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
          <div>
            <ButtonLink href="/simulateur" size="lg">
              {preview.cta}
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-2xl bg-dark-block p-6 text-white space-y-4">
          <p className="text-xs uppercase tracking-widest text-gold-light font-semibold">{preview.panelLabel}</p>
          <p className="text-xl font-bold">{preview.panelTitle}</p>
          <p className="text-xs text-white/80 leading-relaxed">{preview.panelBody}</p>
        </div>
      </div>
    </section>
  );
}
