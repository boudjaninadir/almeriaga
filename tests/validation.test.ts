import test from 'node:test';
import assert from 'node:assert';
import { normalizeDzPhone, validateLead } from '@/lib/validation';

test('normalizeDzPhone accepts the three Algerian prefixes', () => {
  assert.strictEqual(normalizeDzPhone('0550123456'), '+213550123456');
  assert.strictEqual(normalizeDzPhone('+213 661 23 45 67'), '+213661234567');
  assert.strictEqual(normalizeDzPhone('00213770123456'), '+213770123456');
  assert.strictEqual(normalizeDzPhone('0123456789'), null);
});

test('validateLead accepts a consumer request', () => {
  const result = validateLead({
    type: 'consommateur',
    name: 'Karim Benali',
    phone: '0550123456',
    wilaya: '16',
    consent: true,
  });

  assert.strictEqual(result.ok, true);
  if (result.ok) {
    assert.strictEqual(result.lead.type, 'consommateur');
    assert.strictEqual(result.lead.phone, '+213550123456');
    assert.strictEqual(result.lead.wilaya, '16 – Alger');
  }
});

test('validateLead rejects an invalid name or phone', () => {
  const result = validateLead({
    type: 'consommateur',
    name: '=SUM(A1)',
    phone: '123',
    wilaya: '16',
    consent: true,
  });

  assert.strictEqual(result.ok, false);
});

test('validateLead requires shop name and volume for a reseller', () => {
  const result = validateLead({
    type: 'revendeur',
    name: 'Karim Benali',
    phone: '0550123456',
    wilaya: '16',
    business_name: '',
    volume: '',
    message: '',
    consent: true,
  });

  assert.strictEqual(result.ok, false);
  if (!result.ok) {
    assert.ok(result.errors.business_name);
    assert.ok(result.errors.volume);
    assert.ok(result.errors.message);
  }
});

