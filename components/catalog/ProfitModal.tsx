'use client';

import { useState } from 'react';
import { LeadForm } from '@/components/LeadForm';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Input';
import { computeMargin } from '@/lib/margin';
import { formatDzd, formatPct, parseNumber } from '@/lib/format';
import type { Product } from '@/types/product';

/** Indicatif : taux bancaire et plafond à faire confirmer par le propriétaire. */
const BANK_RATE_DZD_PER_EUR = 151.67;
const LEGAL_CAP_DZD = 1800000;

type Props = {
  product: Product | null;
  onClose: () => void;
};

/** Modal : calculateur de marge + formulaire de lead (gros / semi-gros). */
export function ProfitModal({ product, onClose }: Props) {
  if (!product) return null;
  return <ProfitModalContent key={product.id} product={product} onClose={onClose} />;
}

function ProfitModalContent({ product, onClose }: { product: Product; onClose: () => void }) {
  const [quantity, setQuantity] = useState(String(product.min_qty));
  const [sellPrice, setSellPrice] = useState(String(Math.round(product.est_landed_dzd * 1.25)));
  const [showLead, setShowLead] = useState(false);

  const result = computeMargin({
    quantity: parseNumber(quantity),
    landedDzdPerUnit: product.est_landed_dzd,
    sellDzdPerUnit: parseNumber(sellPrice),
  });
  const belowMin = parseNumber(quantity) < product.min_qty;

  // Contrôle du plafond : valeur déclarée = quantité × prix d'achat € × taux bancaire (indicatif).
  const declaredDzd = parseNumber(quantity) * product.price_spain_eur * BANK_RATE_DZD_PER_EUR;
  const overCap = declaredDzd > LEGAL_CAP_DZD;
  const nearCap = !overCap && declaredDzd > LEGAL_CAP_DZD * 0.9;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="profit-title">
      <div className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Simulation indicative</p>
            <h2 id="profit-title" className="mt-1 text-xl font-bold text-slate-900">{product.title_fr}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100" aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <TextField label="Quantité" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value)} hint={`Minimum ${product.min_qty} unités`} />
          <TextField label="Prix de vente visé (DZD / unité)" inputMode="numeric" value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
        </div>

        {belowMin && (
          <p className="mt-3 text-xs font-medium text-amber-700">Quantité inférieure au minimum de commande.</p>
        )}

        <div
          className={`mt-4 rounded-2xl border p-4 text-xs ${
            overCap
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : nearCap
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
          }`}
          role="status"
        >
          <p className="font-semibold">
            {overCap ? 'Dépassement du plafond de 1 800 000 DA' : nearCap ? 'Proche du plafond (plus de 90 %)' : 'Sous le plafond de 1 800 000 DA'}
          </p>
          <p className="mt-1">Valeur déclarée estimée : {formatDzd(declaredDzd)} (taux {BANK_RATE_DZD_PER_EUR} DA/€, indicatif).</p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <dt className="text-xs text-slate-500">Coût total livré</dt>
            <dd className="mt-1 font-semibold text-slate-900">{formatDzd(result.totalCostDzd)}</dd>
          </div>
          <div className="rounded-2xl bg-[#F8FAFC] p-4">
            <dt className="text-xs text-slate-500">Recette totale</dt>
            <dd className="mt-1 font-semibold text-slate-900">{formatDzd(result.totalRevenueDzd)}</dd>
          </div>
          <div className="rounded-2xl bg-emerald-800 p-4 text-white">
            <dt className="text-xs text-emerald-100">Marge nette</dt>
            <dd className="mt-1 font-bold">{formatDzd(result.netMarginDzd)}</dd>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <dt className="text-xs text-slate-500">Marge</dt>
            <dd className="mt-1 font-bold text-emerald-800">{formatPct(result.marginPct)}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-slate-500">Estimation indicative, non contractuelle. Hors frais de livraison, retours et publicité.</p>

        {!showLead ? (
          <Button type="button" className="mt-6 w-full bg-emerald-800 hover:bg-emerald-900" size="lg" onClick={() => setShowLead(true)}>
            Commander en gros
          </Button>
        ) : (
          <div className="mt-6 border-t border-slate-200 pt-6">
            <LeadForm kind="wholesale" product={product.id} />
          </div>
        )}
      </div>
    </div>
  );
}
