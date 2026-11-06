'use client';

import { useState } from 'react';
import { Ar } from '@/components/Ar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input';
import { formatDzd, parseNumber } from '@/lib/format';
import { formatEur, formatPct } from '@/lib/format-private';
import { DEFAULT_INPUTS, simulate } from '@/lib/simulator';
import type { SimInputs } from '@/lib/simulator';

export function SimulatorApp() {
  const [inputs, setInputs] = useState<SimInputs>(DEFAULT_INPUTS);
  const result = simulate(inputs);

  function handleChange(key: keyof SimInputs, val: string) {
    const num = parseNumber(val);
    setInputs((prev) => ({ ...prev, [key]: num }));
  }

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <Badge>Simulateur officiel</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#F7F5EF] mt-2">
            Simulateur de rentabilité <Ar>محاكي الربحية</Ar>
          </h1>
          <p className="text-sm text-ink-soft mt-1">Estimez vos coûts et marges par voyage (plafond légal 1 800 000 DA).</p>
        </div>
        <Button variant="secondary" size="md" onClick={() => setInputs(DEFAULT_INPUTS)}>
          Réinitialiser
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <h2 className="font-bold text-[#F7F5EF] text-base">Paramètres principaux</h2>
              <TextField
                label="Taux bancaire (DZD/€)"
                value={String(inputs.bankRate)}
                onChange={(e) => handleChange('bankRate', e.target.value)}
              />
              <TextField
                label="Taux réel (DZD/€)"
                value={String(inputs.realRate)}
                onChange={(e) => handleChange('realRate', e.target.value)}
              />
              <TextField
                label="Prix unitaire d'achat (€)"
                value={String(inputs.unitPriceEur)}
                onChange={(e) => handleChange('unitPriceEur', e.target.value)}
              />
              <TextField
                label="Quantité"
                value={String(inputs.quantity)}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
              <TextField
                label="Prix de vente Détail (DZD)"
                value={String(inputs.sellDetailDzd)}
                onChange={(e) => handleChange('sellDetailDzd', e.target.value)}
              />
              <TextField
                label="Ferry & Voyage (€)"
                value={String(inputs.ferryEur)}
                onChange={(e) => handleChange('ferryEur', e.target.value)}
              />
              <div className="pt-2 border-t border-[#D4AF37]/25 space-y-3">
                <h3 className="font-bold text-[#F7F5EF] text-sm">Coûts du Pack Détail (DZD)</h3>
                <TextField
                  label="Coût Jeu / GTA VI (DZD)"
                  value={String(inputs.packGameDzd)}
                  onChange={(e) => handleChange('packGameDzd', e.target.value)}
                />
                <TextField
                  label="Coût Manettes supp. (DZD)"
                  value={String(inputs.packControllersDzd)}
                  onChange={(e) => handleChange('packControllersDzd', e.target.value)}
                />
                <TextField
                  label="Autres accessoires (DZD)"
                  value={String(inputs.packOtherDzd)}
                  onChange={(e) => handleChange('packOtherDzd', e.target.value)}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Card className="border-[#D4AF37]/30 bg-[#0E4635]/80">
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/25 pb-4">
                <h2 className="font-bold text-[#F7F5EF] text-xl">Synthèse</h2>
                {result.overCap ? (
                  <Badge tone="neutral" className="border-danger/30 bg-danger/10 text-danger font-semibold">
                    ⚠️ Dépassement 1.8M DA
                  </Badge>
                ) : (
                  <Badge tone="brand" className="font-semibold">✓ Conforme 1.8M DA</Badge>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
                  <p className="text-xs text-ink-faint">Valeur déclarée</p>
                  <p className="text-lg font-bold text-[#F7F5EF] mt-1">{formatDzd(result.declaredValueDzd)}</p>
                </div>
                <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
                  <p className="text-xs text-ink-faint">Coût de revient</p>
                  <p className="text-lg font-bold text-[#D4AF37] mt-1">{formatDzd(result.unitCostDzd)}</p>
                </div>
                <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25">
                  <p className="text-xs text-ink-faint">Frais fixes totaux</p>
                  <p className="text-lg font-bold text-[#F7F5EF] mt-1">{formatEur(result.fixedEur)}</p>
                </div>
              </div>

              {/* Hand-crafted SVG Bar Chart */}
              <div className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25 space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-ink-soft">
                  <span>Comparatif Coûts vs Recettes (Scénario Détail)</span>
                  <span className="text-[#D4AF37]">SVG fait main</span>
                </div>
                <div className="h-44 w-full flex items-end justify-around pt-6 pb-2 border-b border-[#D4AF37]/25">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-[#F7F5EF]">{formatDzd(result.unitCostDzd * inputs.quantity)}</span>
                    <div className="w-16 rounded-t bg-[#D4AF37]/70" style={{ height: '100px' }} />
                    <span className="text-xs text-ink-soft">Coûts totaux</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-[#D4AF37]">{formatDzd(result.scenarios[0].revenueDzd)}</span>
                    <div className="w-16 rounded-t bg-[#D4AF37]" style={{ height: '140px' }} />
                    <span className="text-xs text-ink-soft">Recettes</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-[#F7F5EF] text-base">Scénarios</h3>
                {result.scenarios.map((sc) => (
                  <div key={sc.key} className="rounded-xl bg-[#0B3D2E] p-4 border border-[#D4AF37]/25 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#F7F5EF] text-sm">{sc.label}</span>
                      <span className="font-bold text-[#D4AF37]">{formatDzd(sc.profitDzd)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-soft">
                      <span>ROI : {formatPct(sc.roiPct)}</span>
                      <span>Seuil : {Number.isFinite(sc.breakEvenUnits) ? `${Math.ceil(sc.breakEvenUnits)} u` : '—'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-ink-faint pt-2">
                * Estimation indicative, non contractuelle. Marges avant frais de livraison, retours, publicité, et coût du jeu/manettes du pack.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
