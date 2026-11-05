import test from 'node:test';
import assert from 'node:assert';
import { DEFAULT_INPUTS, simulate } from '@/lib/simulator';

test('simulate computes correct values for default inputs (25 consoles)', () => {
  const result = simulate(DEFAULT_INPUTS);
  assert.strictEqual(result.goodsEur, 25 * 460);
  assert.strictEqual(result.declaredValueDzd, 25 * 460 * 151.67);
  assert.strictEqual(result.overCap, false);
  assert.strictEqual(result.scenarios.length, 3);
});
