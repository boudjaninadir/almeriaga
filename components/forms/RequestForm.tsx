'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckField, SelectField, TextAreaField, TextField } from '@/components/ui/Input';
import { newEventId, readAttribution, trackLead } from '@/lib/analytics';
import { useI18n } from '@/lib/i18n/context';
import { wilayaName } from '@/lib/i18n/wilayas';
import { SERVICE_WILAYAS, normalizeDzMobile, normalizePhoneInput, validateLead } from '@/lib/validation';
import type { LeadFieldErrors, LeadType } from '@/lib/validation';

type Values = {
  nom: string;
  telephone: string;
  wilaya: string;
  message: string;
  store: string;
  shopType: string;
  volume: string;
  consent: boolean;
  website: string;
};

const INITIAL: Values = {
  nom: '',
  telephone: '',
  wilaya: '',
  message: '',
  store: '',
  shopType: '',
  volume: '',
  consent: false,
  website: '',
};

const REQUEST_TIMEOUT_MS = 12000;

/**
 * Formulaire métier unique, aligné sur le contrat `leads`.
 * - consommateur / devis / gros : nom, téléphone, wilaya, message.
 * - revendeur : magasin, type de commerce et volume sont sérialisés dans `message`.
 * Le consentement est validé mais jamais envoyé (hors des 8 clés).
 */
export function RequestForm({
  type,
  productSlug = '',
  submitLabel,
  messageRequired = false,
  reseller = false,
  productName = '',
}: {
  type: LeadType;
  productSlug?: string;
  submitLabel: string;
  messageRequired?: boolean;
  reseller?: boolean;
  productName?: string;
}) {
  const router = useRouter();
  const { locale, dict } = useI18n();
  const t = dict.request;
  const formRef = useRef<HTMLFormElement>(null);
  const mountedAt = useRef(0);

  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (key in errors) setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function focusFirstInvalid() {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  }

  function buildMessage(): string {
    if (!reseller) return values.message.trim();
    const parts = [
      `${t.store} : ${values.store.trim()}`,
      `${t.shopType} : ${values.shopType.trim()}`,
      `${t.volume} : ${values.volume.trim()}`,
    ];
    if (values.message.trim()) parts.push(values.message.trim());
    return parts.join('\n');
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setFormError(null);

    const message = buildMessage();
    const eventId = newEventId();
    const attribution = readAttribution(['utm_source', 'utm_campaign']);
    const payload = {
      type,
      product_slug: productSlug,
      nom: values.nom,
      telephone: normalizePhoneInput(values.telephone),
      wilaya: values.wilaya,
      message,
      consent: values.consent,
      utm_source: attribution.utm_source ?? '',
      utm_campaign: attribution.utm_campaign ?? '',
    };

    if (reseller) {
      const resellerErrors: LeadFieldErrors = { ...errors };
      if (!values.store.trim()) resellerErrors.store = t.errors.store;
      if (!values.shopType.trim()) resellerErrors.store = t.errors.store;
      if (!values.volume.trim()) resellerErrors.volume = t.errors.volume;
      if (resellerErrors.store || resellerErrors.volume) {
        setErrors(resellerErrors);
        focusFirstInvalid();
        return;
      }
    }

    const check = validateLead(payload, t.errors);
    if (!check.ok) {
      setErrors(check.errors);
      focusFirstInvalid();
      return;
    }

    setStatus('submitting');
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...payload, website: values.website, elapsedMs: Date.now() - mountedAt.current }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: LeadFieldErrors;
      } | null;

      if (response.ok && data?.ok) {
        trackLead(eventId, productName || productSlug || type);
        router.push('/merci');
        return;
      }

      if (data?.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstInvalid();
      } else {
        setFormError(data?.message ?? t.error);
      }
      setStatus('idle');
    } catch {
      setFormError(t.error);
      setStatus('idle');
    } finally {
      window.clearTimeout(timer);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      {reseller && (
        <>
          <TextField
            label={t.store}
            name="store"
            autoComplete="organization"
            placeholder={t.storePlaceholder}
            required
            value={values.store}
            error={errors.store}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set('store', e.target.value)}
          />
          <SelectField
            label={t.shopType}
            name="shopType"
            required
            value={values.shopType}
            error={errors.store}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => set('shopType', e.target.value)}
          >
            <option value="">{t.shopTypePlaceholder}</option>
            <option value="Boutique de jeux vidéo">Boutique de jeux vidéo</option>
            <option value="Épicerie / supérette">Épicerie / supérette</option>
            <option value="Salon de beauté">Salon de beauté</option>
            <option value="Autre commerce">Autre commerce</option>
          </SelectField>
          <TextField
            label={t.volume}
            name="volume"
            placeholder={t.volumePlaceholder}
            required
            value={values.volume}
            error={errors.volume}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set('volume', e.target.value)}
          />
        </>
      )}

      <TextField
        label={t.name}
        name="nom"
        autoComplete="name"
        placeholder={t.namePlaceholder}
        required
        value={values.nom}
        error={errors.nom}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('nom', e.target.value)}
      />

      <TextField
        label={t.phone}
        name="telephone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="0550 12 34 56"
        hint={t.phoneHint}
        addon={<span>+213</span>}
        dir="ltr"
        required
        value={values.telephone}
        error={errors.telephone}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('telephone', e.target.value)}
        onBlur={() => {
          const normalized = normalizeDzMobile(values.telephone);
          if (normalized) {
            const n = normalized.slice(4);
            set('telephone', `${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7, 9)}`);
          }
        }}
      />

      <SelectField
        label={t.wilaya}
        name="wilaya"
        required
        value={values.wilaya}
        error={errors.wilaya}
        hint={t.wilayaHint}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => set('wilaya', e.target.value)}
      >
        <option value="">{t.wilayaPlaceholder}</option>
        {SERVICE_WILAYAS.map((w) => (
          <option key={w.code} value={w.code}>
            {wilayaName(w.code, locale, w.name)}
          </option>
        ))}
      </SelectField>

      {messageRequired ? (
        <TextAreaField
          label={t.messageRequired}
          name="message"
          placeholder={t.messageRequiredPlaceholder}
          required
          value={values.message}
          error={errors.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('message', e.target.value)}
        />
      ) : (
        <TextAreaField
          label={t.message}
          name="message"
          placeholder={t.messagePlaceholder}
          value={values.message}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set('message', e.target.value)}
        />
      )}

      {/* Piège à robots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </label>
      </div>

      <CheckField
        name="consent"
        checked={values.consent}
        error={errors.consent}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('consent', e.target.checked)}
        label={t.consent}
      />

      {formError && (
        <div role="alert" className="border border-danger/40 bg-danger/5 p-4 text-[13px] text-danger">
          {formError}
        </div>
      )}

      <Button type="submit" size="lg" arrow className="w-full" loading={status === 'submitting'}>
        {status === 'submitting' ? t.sending : submitLabel}
      </Button>
    </form>
  );
}
