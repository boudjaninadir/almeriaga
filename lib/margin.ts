/**
 * Calcul de rentabilité pur (aucune dépendance).
 * Estimation indicative : ne tient pas compte des frais de livraison, retours et publicité.
 */
export type MarginInput = {
  quantity: number;
  /** Coût livré estimé par unité, en DZD. */
  landedDzdPerUnit: number;
  /** Prix de vente par unité visé, en DZD. */
  sellDzdPerUnit: number;
};

export type MarginResult = {
  totalCostDzd: number;
  totalRevenueDzd: number;
  netMarginDzd: number;
  marginPct: number;
};

export function computeMargin({ quantity, landedDzdPerUnit, sellDzdPerUnit }: MarginInput): MarginResult {
  const qty = Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0;
  const cost = qty * Math.max(0, landedDzdPerUnit);
  const revenue = qty * Math.max(0, sellDzdPerUnit);
  const net = revenue - cost;
  return {
    totalCostDzd: cost,
    totalRevenueDzd: revenue,
    netMarginDzd: net,
    marginPct: cost > 0 ? (net / cost) * 100 : 0,
  };
}
