/**
 * Moteur du simulateur de rentabilité : fonctions pures, sans dépendance.
 * Il reproduit les calculs de l'onglet « 1. SIMULATEUR PS5 » du tableur Micro-Importation_Master
 * (vérifié par tests/simulator.test.ts), avec trois différences voulues :
 *  1. Le coût des accessoires du pack (GTA VI, manettes, autres) s'applique au scénario détail (pack complet)
 *     et pas aux scénarios gros (console nue), conformément à l'offre décrite.
 *  2. Le plafond légal en euros est calculé avec le taux bancaire (plafond DZD / taux), et non figé à 12 000 €.
 *  3. Le seuil de rentabilité d'un pack tient compte du coût variable des accessoires.
 */

export type SimInputs = {
  // Taux (DZD pour 1 €)
  bankRate: number; // taux bancaire / douanier (sert à la valeur déclarée et au plafond)
  realRate: number; // taux utilisé pour convertir tes coûts réels (hypothèse de calcul)
  // Achat
  unitPriceEur: number;
  quantity: number;
  // Prix de vente (DZD)
  sellSuperGrosDzd: number;
  sellGrosDzd: number;
  sellDetailDzd: number;
  // Accessoires du pack détail (DZD par pack)
  packGameDzd: number;
  packControllersDzd: number;
  packOtherDzd: number;
  // Charges fixes du voyage (€)
  ferryEur: number;
  fuelEur: number;
  hotelEur: number;
  mealsEur: number;
  insuranceEur: number;
  visaEur: number;
  contingencyEur: number;
  // Fiscalité et plafond
  customsPct: number; // droit de douane en %
  ifuPct: number; // IFU en %
  ifuCoef: number; // coefficient appliqué à la valeur déclarée pour la base IFU
  legalCapDzd: number;
  // Produit et véhicule
  unitLengthCm: number;
  unitWidthCm: number;
  unitHeightCm: number;
  unitWeightKg: number;
  vehicleVolumeL: number;
  vehiclePayloadKg: number;
  fillEfficiencyPct: number;
};

export const DEFAULT_INPUTS: SimInputs = {
  bankRate: 151.67,
  realRate: 275,
  unitPriceEur: 460,
  quantity: 25,
  sellSuperGrosDzd: 167000,
  sellGrosDzd: 175000,
  sellDetailDzd: 185000,
  packGameDzd: 18000,
  packControllersDzd: 0,
  packOtherDzd: 0,
  ferryEur: 760,
  fuelEur: 15,
  hotelEur: 60,
  mealsEur: 40,
  insuranceEur: 30,
  visaEur: 80,
  contingencyEur: 0,
  customsPct: 5,
  ifuPct: 0.5,
  ifuCoef: 1.3,
  legalCapDzd: 1800000,
  unitLengthCm: 10.5,
  unitWidthCm: 39,
  unitHeightCm: 26,
  unitWeightKg: 4.5,
  vehicleVolumeL: 1038,
  vehiclePayloadKg: 350,
  fillEfficiencyPct: 100,
};

export type ScenarioKey = 'superGros' | 'gros' | 'detail';

export type Scenario = {
  key: ScenarioKey;
  label: string;
  isPack: boolean;
  priceDzd: number;
  priceEur: number;
  revenueDzd: number;
  extrasCostDzd: number;
  totalCostDzd: number;
  profitDzd: number;
  profitPerUnitDzd: number;
  roiPct: number;
  /** Nombre d'unités à vendre pour couvrir le coût total (Infinity si impossible). */
  breakEvenUnits: number;
};

export type SimResult = {
  goodsEur: number;
  declaredValueDzd: number;
  capEur: number;
  capRemainingDzd: number;
  capRemainingEur: number;
  maxQuantityByCap: number;
  overCap: boolean;
  customsDzd: number;
  ifuBaseDzd: number;
  ifuDzd: number;
  fixedEur: number;
  fixedDzd: number;
  goodsRealDzd: number;
  baseCostDzd: number;
  unitCostDzd: number;
  unitCostEur: number;
  packExtraPerUnitDzd: number;
  scenarios: Scenario[];
  resellerMarginPct: number;
  unitVolumeL: number;
  maxByVolume: number;
  maxByWeight: number;
  vehicleCapacity: number;
  overVehicle: boolean;
};

const div = (a: number, b: number): number => (b > 0 ? a / b : 0);

export function simulate(i: SimInputs): SimResult {
  const n = Math.max(0, i.quantity);

  const goodsEur = i.unitPriceEur * n;
  const declaredValueDzd = goodsEur * i.bankRate;
  const capEur = div(i.legalCapDzd, i.bankRate);
  const capRemainingDzd = i.legalCapDzd - declaredValueDzd;
  const capRemainingEur = capEur - goodsEur;
  const maxQuantityByCap = Math.floor(div(i.legalCapDzd, i.unitPriceEur * i.bankRate));

  const customsDzd = (declaredValueDzd * i.customsPct) / 100;
  const ifuBaseDzd = declaredValueDzd * i.ifuCoef;
  const ifuDzd = (ifuBaseDzd * i.ifuPct) / 100;

  const fixedEur = i.ferryEur + i.fuelEur + i.hotelEur + i.mealsEur + i.insuranceEur + i.visaEur + i.contingencyEur;
  const fixedDzd = fixedEur * i.realRate;
  const goodsRealDzd = goodsEur * i.realRate;

  const baseCostDzd = goodsRealDzd + fixedDzd + customsDzd + ifuDzd;
  const unitCostDzd = div(baseCostDzd, n);
  const unitCostEur = div(unitCostDzd, i.realRate);

  const packExtraPerUnitDzd = i.packGameDzd + i.packControllersDzd + i.packOtherDzd;

  const build = (key: ScenarioKey, label: string, priceDzd: number, isPack: boolean): Scenario => {
    const extraPerUnit = isPack ? packExtraPerUnitDzd : 0;
    const revenueDzd = priceDzd * n;
    const extrasCostDzd = extraPerUnit * n;
    const totalCostDzd = baseCostDzd + extrasCostDzd;
    const profitDzd = revenueDzd - totalCostDzd;
    const margin = priceDzd - extraPerUnit;
    return {
      key,
      label,
      isPack,
      priceDzd,
      priceEur: div(priceDzd, i.realRate),
      revenueDzd,
      extrasCostDzd,
      totalCostDzd,
      profitDzd,
      profitPerUnitDzd: div(profitDzd, n),
      roiPct: div(profitDzd, totalCostDzd) * 100,
      breakEvenUnits: margin > 0 ? baseCostDzd / margin : Infinity,
    };
  };

  const scenarios: Scenario[] = [
    build('superGros', 'Super gros (console nue)', i.sellSuperGrosDzd, false),
    build('gros', 'Gros revendeurs (console nue)', i.sellGrosDzd, false),
    build('detail', 'Détail (pack complet)', i.sellDetailDzd, true),
  ];

  const unitVolumeL = (i.unitLengthCm * i.unitWidthCm * i.unitHeightCm) / 1000;
  const maxByVolume = Math.floor(div((i.vehicleVolumeL * i.fillEfficiencyPct) / 100, unitVolumeL));
  const maxByWeight = Math.floor(div(i.vehiclePayloadKg, i.unitWeightKg));
  const vehicleCapacity = Math.min(maxByVolume, maxByWeight);

  return {
    goodsEur,
    declaredValueDzd,
    capEur,
    capRemainingDzd,
    capRemainingEur,
    maxQuantityByCap,
    overCap: declaredValueDzd > i.legalCapDzd,
    customsDzd,
    ifuBaseDzd,
    ifuDzd,
    fixedEur,
    fixedDzd,
    goodsRealDzd,
    baseCostDzd,
    unitCostDzd,
    unitCostEur,
    packExtraPerUnitDzd,
    scenarios,
    resellerMarginPct: div(i.sellDetailDzd - i.sellGrosDzd, i.sellGrosDzd) * 100,
    unitVolumeL,
    maxByVolume,
    maxByWeight,
    vehicleCapacity,
    overVehicle: n > vehicleCapacity,
  };
}
