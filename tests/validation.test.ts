import test from 'node:test';
import assert from 'node:assert';
import { DICTIONARIES } from '@/lib/i18n/index';
import { normalizeDzMobile, normalizePhoneInput, toAsciiDigits, validateLead } from '@/lib/validation';

test('normalizeDzMobile handles various formats', () => {
  assert.strictEqual(normalizeDzMobile('0550123456'), '+213550123456');
  assert.strictEqual(normalizeDzMobile('+213 661 23 45 67'), '+213661234567');
  assert.strictEqual(normalizeDzMobile('00213770123456'), '+213770123456');
  assert.strictEqual(normalizeDzMobile('0123456789'), null);
});

test('normalizeDzMobile accepts Arabic-Indic digits', () => {
  assert.strictEqual(toAsciiDigits('٠٥٥٠١٢٣٤٥٦'), '0550123456');
  assert.strictEqual(normalizeDzMobile('٠٥٥٠ ١٢ ٣٤ ٥٦'), '+213550123456');
});

test('normalizePhoneInput accepts the +213 addon without duplicating the prefix', () => {
  assert.strictEqual(normalizePhoneInput('550 12 34 56'), '0550123456');
  assert.strictEqual(normalizePhoneInput('0550123456'), '0550123456');
  assert.strictEqual(normalizePhoneInput('+213 550 12 34 56'), '+213 550 12 34 56');
  assert.strictEqual(normalizeDzMobile(normalizePhoneInput('550123456')), '+213550123456');
});

test('validateLead accepts a consumer request with the exact contract keys', () => {
  const res = validateLead({
    type: 'consommateur',
    product_slug: 'lisseur',
    nom: 'Karim Benali',
    telephone: '0550123456',
    wilaya: '31',
    message: 'Disponibilité ?',
    utm_source: 'meta',
    utm_campaign: 'lisseur',
    consent: true,
  });

  assert.strictEqual(res.ok, true);
  if (res.ok) {
    assert.deepStrictEqual(Object.keys(res.lead).sort(), [
      'message',
      'nom',
      'product_slug',
      'telephone',
      'type',
      'utm_campaign',
      'utm_source',
      'wilaya',
    ]);
    assert.strictEqual(res.lead.telephone, '+213550123456');
    assert.strictEqual(res.lead.wilaya, '31');
  }
});

test('validateLead rejects invalid name, phone or wilaya', () => {
  const res = validateLead({
    type: 'consommateur',
    product_slug: 'lisseur',
    nom: '=SUM(A1)',
    telephone: '123',
    wilaya: '16',
    consent: true,
  });
  assert.strictEqual(res.ok, false);
  if (!res.ok) {
    assert.ok(res.errors.nom);
    assert.ok(res.errors.telephone);
    assert.ok(res.errors.wilaya);
  }
});

test('validateLead requires a message for devis, gros and revendeur', () => {
  for (const type of ['devis', 'gros', 'revendeur'] as const) {
    const res = validateLead({
      type,
      product_slug: type === 'devis' ? 'produit-exemple' : '',
      nom: 'Karim Benali',
      telephone: '0550123456',
      wilaya: '13',
      message: '',
      consent: true,
    });
    assert.strictEqual(res.ok, false, type);
    if (!res.ok) assert.ok(res.errors.message, type);
  }
});

test('validateLead keeps a cleaned multi-line reseller message', () => {
  const res = validateLead({
    type: 'revendeur',
    nom: 'Karim Benali',
    telephone: '0550123456',
    wilaya: '22',
    message: 'Magasin : Ma boutique\nType de commerce : Jeux vidéo\nVolume : 20/mois',
    consent: true,
  });
  assert.strictEqual(res.ok, true);
  if (res.ok) assert.match(res.lead.message, /^Magasin : Ma boutique/);
});

test('validateLead truncates messages longer than 1000 characters', () => {
  const res = validateLead({
    type: 'gros',
    nom: 'Karim Benali',
    telephone: '0550123456',
    wilaya: '31',
    message: 'x'.repeat(1200),
    consent: true,
  });
  assert.strictEqual(res.ok, true);
  if (res.ok) assert.strictEqual(res.lead.message.length, 1000);
});

test('validateLead returns the messages of the active language', () => {
  const res = validateLead(
    { type: 'consommateur', nom: '', telephone: '123', wilaya: '31', consent: false },
    DICTIONARIES.ar.request.errors,
  );
  assert.strictEqual(res.ok, false);
  if (!res.ok) {
    assert.strictEqual(res.errors.nom, DICTIONARIES.ar.request.errors.name);
    assert.strictEqual(res.errors.telephone, DICTIONARIES.ar.request.errors.phone);
    assert.strictEqual(res.errors.consent, DICTIONARIES.ar.request.errors.consent);
  }
});
