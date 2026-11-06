'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckField, SelectField, TextField } from '@/components/ui/Input';
import { cn } from '@/lib/cn';
import { newEventId, readAttribution } from '@/lib/analytics';
import { ATTRIBUTION_KEYS, validateLead, VOLUME_RANGES } from '@/lib/validation';
import type { LeadFieldErrors, LeadType } from '@/lib/validation';
import { WILAYAS } from '@/lib/wilayas';

type Values = {
  name: string;
  phone: string;
  wilaya: string;
  business_name: string;
  volume: string;
  message: string;
  consent: boolean;
  /** Piège à robots : doit rester vide. */
  website: string;
};

const INITIAL: Values = {
  name: '',
  phone: '',
  wilaya: '',
  business_name: '',
  volume: '',
  message: '',
  consent: false,
  website: '',
};

const COPY: Record<
  LeadType,
  {
    submit: string;
    footnote: string;
    consent: string;
    businessLabel?: string;
    messageLabel?: string;
    messageRequired?: boolean;
  }
> = {
  consommateur: {
    submit: 'Envoyer ma demande',
    footnote: 'Sans paiement en ligne : nous vous appelons pour confirmer le produit et le lieu de remise.',
    consent: 'J’accepte d’être rappelé(e) au numéro indiqué pour traiter ma commande. Mes données ne servent qu’à cela.',
  },
  devis: {
    submit: 'Demander mon devis',
    footnote: 'Aucun engagement : le devis est établi après échange sur le modèle et les quantités.',
    consent: 'J’accepte d’être contacté(e) au numéro indiqué pour établir mon devis.',
    messageLabel: 'Précisions (facultatif)',
  },
  gros: {
    submit: 'Envoyer ma demande',
    footnote: 'Aucun prix public : les conditions sont communiquées après échange, en dinars.',
    consent: 'J’accepte d’être contacté(e) au numéro indiqué au sujet de cette demande professionnelle.',
    businessLabel: 'Société',
    messageLabel: 'Produits visés (facultatif)',
  },
  revendeur: {
    submit: 'Rejoindre le programme',
    footnote: 'Aucun engagement : nous étudions chaque demande selon la zone et le volume.',
    consent: 'J’accepte d’être contacté(e) au numéro indiqué au sujet de cette demande de partenariat.',
    businessLabel: 'Nom du magasin',
    messageLabel: 'Type de commerce',
    messageRequired: true,
  },
};

export function LeadCaptureForm({
  type,
  productSlug,
  productName,
  className,
}: {
  type: LeadType;
  productSlug?: string;
  productName?: string;
  className?: string;
}) {
  const router = useRouter();
  const mountedAt = useRef(Date.now());
  const copy = COPY[type];

  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isBusiness = type === 'gros' || type === 'revendeur';

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined, type: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const payload = {
      type,
      product_slug: productSlug ?? '',
      name: values.name,
      phone: values.phone,
      wilaya: values.wilaya,
      business_name: isBusiness ? values.business_name : '',
      volume: isBusiness ? values.volume : '',
      message: values.message,
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
        setFormError(data?.message ?? 'L’envoi a échoué. Réessayez dans un instant ou écrivez-nous sur WhatsApp.');
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
    <form onSubmit={handleSubmit} className={cn('space-y-4', className)} noValidate>
      <div className={cn('grid gap-4', isBusiness ? 'sm:grid-cols-2' : 'grid-cols-1')}>
        {isBusiness && (
          <TextField
            label={copy.businessLabel ?? 'Société'}
            name="business_name"
            autoComplete="organization"
            required
            value={values.business_name}
            error={errors.business_name}
            onChange={(event: ChangeEvent<HTMLInputElement>) => set('business_name', event.target.value)}
          />
        )}

        <TextField
          label={type === 'revendeur' ? 'Nom du responsable' : 'Nom et prénom'}
          name="name"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={(event: ChangeEvent<HTMLInputElement>) => set('name', event.target.value)}
        />

        <TextField
          label="Téléphone (mobile)"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="0550 12 34 56"
          hint="Format algérien : 05, 06 ou 07."
          required
          value={values.phone}
          error={errors.phone}
          onChange={(event: ChangeEvent<HTMLInputElement>) => set('phone', event.target.value)}
        />

        <SelectField
          label="Wilaya"
          name="wilaya"
          required
          value={values.wilaya}
          error={errors.wilaya}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => set('wilaya', event.target.value)}
        >
          <option value="">Choisir…</option>
          {WILAYAS.map((wilaya) => (
            <option key={wilaya.code} value={wilaya.code}>
              {wilaya.code} – {wilaya.name}
            </option>
          ))}
        </SelectField>

        {isBusiness && (
          <SelectField
            label="Volume estimé"
            name="volume"
            required
            value={values.volume}
            error={errors.volume}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => set('volume', event.target.value)}
          >
            <option value="">Choisir…</option>
            {VOLUME_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </SelectField>
        )}
      </div>

      {copy.messageLabel && (
        <TextField
          label={copy.messageRequired ? `${copy.messageLabel} (obligatoire)` : copy.messageLabel}
          name="message"
          required={copy.messageRequired}
          value={values.message}
          error={errors.message}
          onChange={(event: ChangeEvent<HTMLInputElement>) => set('message', event.target.value)}
        />
      )}

      {/* Piège à robots : invisible et hors navigation clavier pour un humain. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Site web
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => set('website', event.target.value)}
          />
        </label>
      </div>

      <CheckField
        name="consent"
        checked={values.consent}
        error={errors.consent}
        onChange={(event: ChangeEvent<HTMLInputElement>) => set('consent', event.target.checked)}
        label={copy.consent}
      />

      {formError && (
        <div role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          {formError}
        </div>
      )}

      <div className="space-y-2">
        <Button type="submit" size="lg" className="w-full" loading={submitting}>
          {submitting ? 'Envoi en cours…' : copy.submit}
        </Button>
        <p className="text-center text-xs leading-relaxed text-ink-faint">{copy.footnote}</p>
      </div>

    </form>
  );
}
