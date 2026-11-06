'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { TextField } from '@/components/ui/Input';
import { formatDzd, formatEur, formatPct, parseNumber } from '@/lib/format';
import { useI18n } from '@/lib/i18n/context';
import { interpolate } from '@/lib/i18n/format';
import { DEFAULT_INPUTS, simulate } from '@/lib/simulator';
import type { SimInputs } from '@/lib/simulator';

export function SimulatorApp() {
  const { locale, dict } = useI18n();
  const t = dict.simulator;
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
          <Badge>{t.badge}</Badge>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink mt-2">
            {t.title}
            {locale !== 'ar' && (
              <>
                {' '}
                <span dir="rtl" lang="ar">{t.titleAccent}</span>
              </>
            )}
          </h1>
          <p className="text-sm text-ink-soft mt-1">{t.lead}</p>
        </div>
        <Button variant="secondary" size="md" onClick={() => setInputs(DEFAULT_INPUTS)}>
          {t.reset}
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-6">
          <Card>
            <CardBody className="space-y-4">
              <h2 className="font-bold text-ink text-base">{t.paramsTitle}</h2>
              <TextField
                label={t.labels.bankRate}
                value={String(inputs.bankRate)}
                onChange={(e) => handleChange('bankRate', e.target.value)}
              />
              <TextField
                label={t.labels.realRate}
                value={String(inputs.realRate)}
                onChange={(e) => handleChange('realRate', e.target.value)}
              />
              <TextField
                label={t.labels.unitPrice}
                value={String(inputs.unitPriceEur)}
                onChange={(e) => handleChange('unitPriceEur', e.target.value)}
              />
              <TextField
                label={t.labels.quantity}
                value={String(inputs.quantity)}
                onChange={(e) => handleChange('quantity', e.target.value)}
              />
              <TextField
                label={t.labels.sellDetail}
                value={String(inputs.sellDetailDzd)}
                onChange={(e) => handleChange('sellDetailDzd', e.target.value)}
              />
              <TextField
                label={t.labels.ferry}
                value={String(inputs.ferryEur)}
                onChange={(e) => handleChange('ferryEur', e.target.value)}
              />
              <div className="pt-2 border-t border-line space-y-3">
                <h3 className="font-bold text-ink text-sm">{t.packTitle}</h3>
                <TextField
                  label={t.labels.packGame}
                  value={String(inputs.packGameDzd)}
                  onChange={(e) => handleChange('packGameDzd', e.target.value)}
                />
                <TextField
                  label={t.labels.packControllers}
                  value={String(inputs.packControllersDzd)}
                  onChange={(e) => handleChange('packControllersDzd', e.target.value)}
                />
                <TextField
                  label={t.labels.packOther}
                  value={String(inputs.packOtherDzd)}
                  onChange={(e) => handleChange('packOtherDzd', e.target.value)}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Card className="border-brand/30 bg-surface/80">
            <CardBody className="space-y-6">
              <div className="flex items-center justify-between border-b border-line pb-4">
                <h2 className="font-bold text-ink text-xl">{t.summary}</h2>
                {result.overCap ? (
                  <Badge tone="neutral" className="border-danger/30 bg-danger/10 text-danger font-semibold">
                    {t.overCap}
                  </Badge>
                ) : (
                  <Badge tone="brand" className="font-semibold">{t.compliant}</Badge>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-canvas p-4 border border-line">
                  <p className="text-xs text-ink-faint">{t.declaredValue}</p>
                  <p className="text-lg font-bold text-ink mt-1">{formatDzd(result.declaredValueDzd)}</p>
                </div>
                <div className="rounded-xl bg-canvas p-4 border border-line">
                  <p className="text-xs text-ink-faint">{t.unitCost}</p>
                  <p className="text-lg font-bold text-brand mt-1">{formatDzd(result.unitCostDzd)}</p>
                </div>
                <div className="rounded-xl bg-canvas p-4 border border-line">
                  <p className="text-xs text-ink-faint">{t.fixedCosts}</p>
                  <p className="text-lg font-bold text-ink mt-1">{formatEur(result.fixedEur)}</p>
                </div>
              </div>

              {/* Hand-crafted SVG Bar Chart */}
              <div className="rounded-xl bg-canvas p-4 border border-line space-y-3">
                <div className="flex justify-between items-center text-xs font-semibold text-ink-soft">
                  <span>{t.chartTitle}</span>
                  <span className="text-brand">{t.chartHandmade}</span>
                </div>
                <div className="h-44 w-full flex items-end justify-around pt-6 pb-2 border-b border-line">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-ink">{formatDzd(result.unitCostDzd * inputs.quantity)}</span>
                    <div className="w-16 rounded-t bg-brand/70" style={{ height: '100px' }} />
                    <span className="text-xs text-ink-soft">{t.costsTotal}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-bold text-brand">{formatDzd(result.scenarios[0].revenueDzd)}</span>
                    <div className="w-16 rounded-t bg-brand" style={{ height: '140px' }} />
                    <span className="text-xs text-ink-soft">{t.revenue}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-ink text-base">{t.scenarios}</h3>
                {result.scenarios.map((sc) => (
                  <div key={sc.key} className="rounded-xl bg-canvas p-4 border border-line space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink text-sm">{t.scenarioLabels[sc.key] ?? sc.label}</span>
                      <span className="font-bold text-brand">{formatDzd(sc.profitDzd)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-ink-soft">
                      <span>{interpolate(t.roi, { value: formatPct(sc.roiPct) })}</span>
                      <span>
                        {interpolate(t.threshold, {
                          value: Number.isFinite(sc.breakEvenUnits)
                            ? interpolate(t.unitShort, { n: Math.ceil(sc.breakEvenUnits) })
                            : '—',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-center text-xs text-ink-faint pt-2">{t.disclaimer}</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
