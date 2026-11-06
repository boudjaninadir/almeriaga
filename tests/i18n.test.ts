import test from 'node:test';
import assert from 'node:assert';
import { DICTIONARIES } from '@/lib/i18n/index';
import { LOCALES, LOCALE_META, isLocale, localeDirection } from '@/lib/i18n/config';
import { interpolate } from '@/lib/i18n/format';
import { WILAYAS_AR, wilayaName } from '@/lib/i18n/wilayas';
import { mergeDictionary } from '@/lib/i18n/merge';
import { fr } from '@/lib/i18n/dictionaries/fr';

const ARABIC_RE = /[\u0600-\u06FF]/;

function walk(value: unknown, path: string, visit: (path: string, leaf: unknown) => void): void {
  if (Array.isArray(value)) {
    assert.ok(value.length > 0, `${path} ne doit pas être un tableau vide`);
    value.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) walk(child, `${path}.${key}`, visit);
    return;
  }
  visit(path, value);
}

test('chaque langue expose exactement les mêmes clés que le français', () => {
  const reference: string[] = [];
  walk(fr, 'dict', (path) => reference.push(path));
  const expected = reference.sort();

  for (const locale of LOCALES) {
    const paths: string[] = [];
    walk(DICTIONARIES[locale], 'dict', (path) => paths.push(path));
    assert.deepStrictEqual(paths.sort(), expected, `clés manquantes ou en trop pour ${locale}`);
  }
});

test('aucune traduction vide', () => {
  for (const locale of LOCALES) {
    walk(DICTIONARIES[locale], locale, (path, leaf) => {
      if (typeof leaf === 'string') {
        assert.ok(leaf.trim().length > 0, `${locale}: ${path} est vide`);
      }
    });
  }
});

test('les directions RTL et LTR sont correctes', () => {
  assert.strictEqual(localeDirection('ar'), 'rtl');
  assert.strictEqual(localeDirection('fr'), 'ltr');
  assert.strictEqual(localeDirection('dz'), 'ltr');
  assert.strictEqual(LOCALE_META.dz.hybrid, true);
  assert.strictEqual(isLocale('dz'), true);
  assert.strictEqual(isLocale('de'), false);
});

test('DZ est un hybride : majoritairement français, avec une part d’arabe', () => {
  const leaves: string[] = [];
  walk(DICTIONARIES.dz, 'dz', (path, leaf) => {
    if (typeof leaf === 'string') leaves.push(leaf);
  });
  const arabicLeaves = leaves.filter((leaf) => ARABIC_RE.test(leaf));

  assert.ok(arabicLeaves.length > 0, 'DZ doit contenir des fragments arabes');
  const ratio = arabicLeaves.length / leaves.length;
  assert.ok(ratio >= 0.05 && ratio <= 0.25, `part arabe DZ inattendue : ${Math.round(ratio * 100)} %`);
  // Le socle reste le français : les titres de sections sont en français.
  assert.match(DICTIONARIES.dz.products.title, /produits/);
});

test('le mode DZ remplace les tableaux au lieu de les fusionner', () => {
  const merged = mergeDictionary(fr, { hero: { trust: ['Un', 'Deux', 'Trois'] } });
  assert.deepStrictEqual(merged.hero.trust, ['Un', 'Deux', 'Trois']);
  assert.strictEqual(merged.hero.title, fr.hero.title);
});

test('interpolate remplace uniquement les clés connues', () => {
  assert.strictEqual(interpolate('Bonjour {name}, {missing}', { name: 'Karim' }), 'Bonjour Karim, {missing}');
  assert.strictEqual(interpolate('{n} packs', { n: 3 }), '3 packs');
});

test('les wilayas arabes couvrent les 58 codes', () => {
  assert.strictEqual(Object.keys(WILAYAS_AR).length, 58);
  assert.strictEqual(wilayaName('31', 'ar', 'Oran'), 'وهران');
  assert.strictEqual(wilayaName('31', 'fr', 'Oran'), 'Oran');
  assert.strictEqual(wilayaName('99', 'ar', 'Inconnue'), 'Inconnue');
});
