'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ButtonLink } from '@/components/ui/Button';
import { DEMO_SUPPLIERS } from '@/lib/suppliers-demo';

export function SuppliersDemoSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const categories = ['Tous', 'Consoles & Jeux', 'Accessoires VR', 'Composants PC', 'Électronique générale'];
  const filteredSuppliers = selectedCategory === 'Tous'
    ? DEMO_SUPPLIERS
    : DEMO_SUPPLIERS.filter((s) => s.category === selectedCategory);

  return (
    <section id="fournisseurs" className="scroll-mt-20 container-page space-y-8">
      <div className="rounded-3xl bg-dark-block p-8 sm:p-12 text-[#F7F5EF] space-y-6">
        <div className="space-y-2">
          <Badge tone="brand" className="bg-gold-light/20 text-gold-light border-gold/40">Espace Fournisseurs (Démo)</Badge>
          <h2 className="text-3xl font-bold">Annuaire test de partenaires</h2>
          <p className="text-sm text-[#F7F5EF]/80">
            L'annuaire réel de fournisseurs vérifiés arrive prochainement. Découvrez ci-dessous un aperçu fictif de démonstration.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
                selectedCategory === cat ? 'bg-[#D4AF37] text-[#0B3D2E] font-bold' : 'bg-[#D4AF37]/10 text-[#F7F5EF] hover:bg-[#D4AF37]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 pt-4">
          {filteredSuppliers.map((sup) => (
            <div key={sup.id} className="rounded-2xl bg-[#0B3D2E]/60 p-5 border border-[#D4AF37]/25 space-y-3 backdrop-blur">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold/20 text-gold-light">{sup.status}</span>
                <span className="text-xs text-[#F7F5EF]/60">{sup.city}, {sup.country}</span>
              </div>
              <div>
                <h3 className="font-bold text-[#F7F5EF] text-lg">{sup.name}</h3>
                <p className="text-xs text-[#F7F5EF]/70 mt-1">{sup.category}</p>
              </div>
              <p className="text-xs text-[#F7F5EF]/60 italic">{sup.notes}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#F7F5EF]/70">Restez informé du lancement de l'annuaire vérifié.</p>
          <ButtonLink href="#reserver" variant="secondary" size="md">
            S'inscrire à la liste d'attente
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
