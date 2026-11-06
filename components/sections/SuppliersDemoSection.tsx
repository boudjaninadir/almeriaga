'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/context';
import { DEMO_SUPPLIERS } from '@/lib/suppliers-demo';

const ALL = '*' as const;

export function SuppliersDemoSection() {
  const { dict } = useI18n();
  const { suppliers } = dict;
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);

  const categories = [
    { value: ALL, label: suppliers.all },
    ...Object.entries(suppliers.categories).map(([value, label]) => ({ value, label })),
  ];
  const filteredSuppliers =
    selectedCategory === ALL ? DEMO_SUPPLIERS : DEMO_SUPPLIERS.filter((s) => s.category === selectedCategory);

  return (
    <section id="fournisseurs" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-dark-block p-8 sm:p-12 text-white space-y-6">
        <div className="space-y-2">
          <Badge tone="brand" className="bg-gold-light/20 text-gold-light border-gold/40">{suppliers.badge}</Badge>
          <h2 className="text-3xl font-bold">{suppliers.title}</h2>
          <p className="text-sm text-white/80">{suppliers.lead}</p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedCategory === cat.value ? 'bg-gold text-brand-strong font-bold' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 pt-4">
          {filteredSuppliers.map((sup) => (
            <div key={sup.id} className="rounded-2xl bg-canvas/10 p-5 border border-white/15 space-y-3 backdrop-blur">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/20 text-gold-light">
                  {suppliers.statuses[sup.status]}
                </span>
                <span className="text-xs text-white/60">
                  {sup.city}, {suppliers.countries[sup.country as keyof typeof suppliers.countries] ?? sup.country}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">{sup.name}</h3>
                <p className="text-xs text-white/70 mt-1">{suppliers.categories[sup.category]}</p>
              </div>
              <p className="text-xs text-white/60 italic">{suppliers.notes[sup.id as keyof typeof suppliers.notes] ?? sup.notes}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/70">{suppliers.footerNote}</p>
          <ButtonLink href="#reserver" variant="gold" size="md">
            {suppliers.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
