import { Badge } from '@/components/ui/Badge';
import { interpolate } from '@/lib/i18n/format';
import { getLocaleContext } from '@/lib/i18n/server';
import { LEGAL, SITE } from '@/lib/site';

export function AboutSection() {
  const { dict } = getLocaleContext();
  const { about } = dict;

  return (
    <section id="a-propos" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-surface p-8 sm:p-12 border border-line space-y-6">
        <Badge>{about.badge}</Badge>
        <h2 className="text-3xl font-bold text-ink">{about.title}</h2>
        <div className="space-y-4 text-sm text-ink-soft leading-relaxed">
          <p>
            {interpolate(about.body, { brand: SITE.name, seller: LEGAL.sellerName, city: LEGAL.city })}
          </p>
          <div className="grid gap-4 sm:grid-cols-3 pt-4 border-t border-line text-xs">
            <div><span className="font-bold text-ink">{about.anae} :</span> {LEGAL.anae}</div>
            <div><span className="font-bold text-ink">{about.nif} :</span> {LEGAL.nif}</div>
            <div><span className="font-bold text-ink">{about.hq} :</span> {LEGAL.city}, {dict.footer.city}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
