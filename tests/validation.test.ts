import test from 'node:test';
import assert from 'node:assert';
import { validateLead, normalizeDzMobile } from '@/lib/validation';

test('normalizeDzMobile handles various formats', () => {
  assert.strictEqual(normalizeDzMobile('0550123456'), '+213550123456');
  assert.strictEqual(normalizeDzMobile('+213 661 23 45 67'), '+213661234567');
  assert.strictEqual(normalizeDzMobile('00213770123456'), '+213770123456');
  assert.strictEqual(normalizeDzMobile('0123456789'), null);
});

test('validateLead validates retail lead successfully', () => {
  const res = validateLead({
    kind: 'retail',
    name: 'Karim Benali',
    phone: '0550123456',
    wilaya: '16',
    quantity: 1,
    consent: true,
    elapsedMs: 2000,
  });
  assert.strictEqual(res.ok, true);
  if (res.ok) {
    assert.strictEqual(res.lead.kind, 'retail');
    assert.strictEqual(res.lead.phone, '+213550123456');
    assert.strictEqual(res.lead.wilayaCode, '16');
  }
});

test('validateLead rejects invalid name or phone', () => {
  const res = validateLead({
    kind: 'retail',
    name: '=SUM(A1)',
    phone: '123',
    wilaya: '16',
    quantity: 1,
    consent: true,
    elapsedMs: 2000,
  });
  assert.strictEqual(res.ok, false);
});
