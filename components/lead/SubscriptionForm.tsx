'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckField, TextField } from '@/components/ui/Input';
import { newEventId, readAttribution } from '@/lib/analytics';
import { t, type Locale, type TKey } from '@/lib/i18n';
import { ATTRIBUTION_KEYS, normalizeDzPhone, validateLead } from '@/lib/validation';
import type { LeadFieldErrors } from '@/lib/validation';

/**
 * Formulaire d'abonnement / prix gros (spec V4 §3-§5) :
 * Nom, Prénom, Téléphone → /api/leads (types `abonnement` | `gros_price`),
 * écrit dans l'onglet Google Sheets `leads_abonnement` / `leads_gros`.
 */
export function SubscriptionForm({
  locale,
  type,
  offer,
  productSlug,
  productName,
}: {
  locale: Locale;
  type: 'abonnement' | 'gros_price';
  offer?: string;
  productSlug?: string;
  productName?: string;
}) {
  const router = useRouter();
  const mountedAt = useRef(Date.now());
  const [values, setValues] = useState({ name: '', prenom: '', phone: '', consent: false, website: '' });
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const label = (key: TKey) => t(locale, key);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    const payload = {
      type,
      product_slug: productSlug ?? '',
      name: values.name,
      prenom: values.prenom,
      phone: values.phone,
      wilaya: '',
      message: offer ? `Offre : ${offer}` : productName ? `Produit : ${productName}` : '',
      consent: values.consent,
      website: values.website,
      elapsedMs: Date.now() - mountedAt.current,
      ...readAttribution(ATTRIBUTION_KEYS),
    };
    const local = validateLead(payload);
    if (!local.ok) {
      setErrors(local.errors);
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => null)) as
        | { ok?: boolean; fieldErrors?: LeadFieldErrors; message?: string }
        | null;
      if (!response.ok || !data?.ok) {
        if (data?.fieldErrors) setErrors(data.fieldErrors);
        setFormError(data?.message ?? 'L’envoi a échoué. Réessayez dans un instant.');
        setSubmitting(false);
        return;
      }
      const params = new URLSearchParams({ type, eid: newEventId() });
      if (productSlug) params.set('slug', productSlug);
      if (productName) params.set('nom', productName);
      router.push(`/merci?${params.toString()}`);
    } catch {
      setFormError('Connexion interrompue. Vérifiez votre réseau, puis réessayez.');
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField
          label={label('form_nom')}
          name="name"
          autoComplete="family-name"
          required
          value={values.name}
          error={errors.name}
          onChange={(e) => { setValues((v) => ({ ...v, name: e.target.value })); setErrors((p) => ({ ...p, name: undefined })); }}
        />
        <TextField
          label={label('form_prenom')}
          name="prenom"
          autoComplete="given-name"
          required
          value={values.prenom}
          error={errors.prenom}
          onChange={(e) => { setValues((v) => ({ ...v, prenom: e.target.value })); setErrors((p) => ({ ...p, prenom: undefined })); }}
        />
      </div>
      <TextField
        label={label('form_phone')}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        placeholder="0550 12 34 56"
        required
        value={values.phone}
        error={errors.phone}
        onChange={(e) => { setValues((v) => ({ ...v, phone: e.target.value })); setErrors((p) => ({ ...p, phone: undefined })); }}
      />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))} />
        </label>
      </div>
      <CheckField
        name="consent"
        checked={values.consent}
        error={errors.consent}
        onChange={(e) => setValues((v) => ({ ...v, consent: e.target.checked }))}
        label={label('form_consent')}
      />
      {formError && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          {formError}
        </div>
      )}
      <Button type="submit" size="lg" className="w-full" loading={submitting}>
        {submitting ? '…' : label('form_submit')}
      </Button>
    </form>
  );
}
