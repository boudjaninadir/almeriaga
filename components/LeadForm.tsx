'use client';

import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { CheckField, SelectField, TextField } from '@/components/ui/Input';
import { Icon } from '@/components/ui/Icons';
import { newEventId, readAttribution, trackLead } from '@/lib/analytics';
import { FEATURED_PRODUCT } from '@/lib/catalog';
import { maskNationalPhone } from '@/lib/format';
import { MAX_RETAIL_QUANTITY, SITE, UNAVAILABLE_WILAYA_CODES, WHOLESALE_VOLUMES, whatsappLink } from '@/lib/site';
import { ATTRIBUTION_KEYS, normalizeDzMobile, validateLead } from '@/lib/validation';
import type { LeadFieldErrors, LeadKind } from '@/lib/validation';
import { WILAYAS } from '@/lib/wilayas';

type Status = 'idle' | 'submitting' | 'success';

type Values = {
  name: string;
  phone: string;
  wilaya: string;
  quantity: string;
  volume: string;
  shop: string;
  consent: boolean;
  website: string; // piège à robots, doit rester vide
};

const INITIAL: Values = { name: '', phone: '', wilaya: '', quantity: '1', volume: '', shop: '', consent: false, website: '' };
const REQUEST_TIMEOUT_MS = 12000;

const COPY: Record<LeadKind, { submit: string; sending: string; footnote: string; success: string; consent: string }> = {
  retail: {
    submit: 'Réserver mon pack',
    sending: 'Envoi en cours…',
    footnote: 'Sans paiement en ligne. Vous réglez à la livraison.',
    success: 'votre réservation est enregistrée.',
    consent: 'J’accepte d’être rappelé(e) au numéro indiqué pour cette réservation. Mes données ne servent qu’à traiter ma demande.',
  },
  wholesale: {
    submit: 'Demander un rappel',
    sending: 'Envoi en cours…',
    footnote: 'Aucun engagement. Nous vous rappelons pour parler volumes et conditions.',
    success: 'votre demande de rappel est enregistrée.',
    consent: 'J’accepte d’être rappelé(e) au numéro indiqué pour cette demande. Mes données ne servent qu’à traiter ma demande.',
  },
  waitlist: {
    submit: 'Me prévenir',
    sending: 'Envoi en cours…',
    footnote: 'Aucun engagement.',
    success: 'vous êtes sur la liste.',
    consent: 'J’accepte d’être contacté(e) au numéro indiqué. Mes données ne servent qu’à traiter ma demande.',
  },
};

/** "0550123456" -> "0550 12 34 56" */
function formatNationalPhone(value: string): string {
  const national = normalizeDzMobile(value);
  if (!national) return value;
  const d = `0${national.slice(4)}`;
  return `${d.slice(0, 4)} ${d.slice(4, 6)} ${d.slice(6, 8)} ${d.slice(8)}`;
}

export function LeadForm({ kind = 'retail', product: initialProduct }: { kind?: LeadKind; product?: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const mountedAt = useRef(0);
  const copy = COPY[kind];

  const [product, setProduct] = useState(initialProduct ?? '');

  useEffect(() => {
    if (!initialProduct && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('produit') || params.get('product');
      if (p) setProduct(p);
    }
  }, [initialProduct]);

  const [values, setValues] = useState<Values>(INITIAL);
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ firstName: string; maskedPhone: string } | null>(null);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  function set<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (key in errors) setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  function focusFirstInvalid() {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setFormError(null);

    const eventId = newEventId();
    const attribution = readAttribution(ATTRIBUTION_KEYS);
    const payload = {
      kind,
      product,
      name: values.name,
      phone: values.phone,
      wilaya: values.wilaya,
      quantity: kind === 'retail' ? values.quantity : undefined,
      volume: kind === 'wholesale' ? values.volume : undefined,
      shop: kind === 'wholesale' ? values.shop : undefined,
      consent: values.consent,
      eventId,
      attribution,
    };

    const check = validateLead(payload);
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
        trackLead(eventId, FEATURED_PRODUCT.name);
        setConfirmed({
          firstName: check.lead.name.split(' ')[0] ?? '',
          maskedPhone: maskNationalPhone(`0${check.lead.phone.slice(4)}`),
        });
        setStatus('success');
        return;
      }

      if (data?.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstInvalid();
      } else {
        setFormError(data?.message ?? 'Une erreur est survenue. Réessayez dans un instant.');
      }
      setStatus('idle');
    } catch {
      setFormError('La connexion a échoué. Vérifiez votre réseau puis réessayez.');
      setStatus('idle');
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (status === 'success' && confirmed) {
    return (
      <div role="status" aria-live="polite" className="space-y-4 py-2 text-center sm:text-left">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#12513D] text-[#D4AF37] sm:mx-0">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="text-2xl font-semibold tracking-tightish text-[#F7F5EF] focus:outline-none">
          Merci{confirmed.firstName ? ` ${confirmed.firstName}` : ''}, {copy.success}
        </h3>
        <p className="text-ink-soft">
          Nous vous appelons au <span className="font-medium text-[#F7F5EF]">{confirmed.maskedPhone}</span> dans la journée.
          Gardez votre téléphone à portée.
        </p>
        {kind === 'retail' && <p className="text-sm text-ink-faint">Aucun paiement n’est demandé avant la livraison.</p>}
      </div>
    );
  }

  const whatsapp = whatsappLink(
    kind === 'wholesale'
      ? `Bonjour ${SITE.name}, je souhaite acheter en gros.`
      : `Bonjour ${SITE.name}, je souhaite réserver le ${FEATURED_PRODUCT.name}.`,
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5" aria-describedby={formError ? 'form-error' : undefined}>
      <TextField
        label="Nom complet"
        name="name"
        autoComplete="name"
        placeholder="Ex : Karim Benali"
        required
        value={values.name}
        error={errors.name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('name', e.target.value)}
      />

      <TextField
        label="Téléphone mobile"
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder="0550 12 34 56"
        hint="Nous vous appelons sur ce numéro pour confirmer."
        required
        value={values.phone}
        error={errors.phone}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('phone', e.target.value)}
        onBlur={() => setValues((previous) => ({ ...previous, phone: formatNationalPhone(previous.phone) }))}
      />

      <div className={kind === 'retail' ? 'grid gap-5 sm:grid-cols-[1fr_9rem]' : 'space-y-5'}>
        <SelectField
          label={kind === 'retail' ? 'Wilaya de livraison' : 'Wilaya'}
          name="wilaya"
          required={kind !== 'waitlist'}
          value={values.wilaya}
          error={errors.wilaya}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => set('wilaya', e.target.value)}
        >
          <option value="">Choisir…</option>
          {WILAYAS.map((w) => {
            const unavailable = kind === 'retail' && UNAVAILABLE_WILAYA_CODES.includes(w.code);
            return (
              <option key={w.code} value={w.code} disabled={unavailable}>
                {w.code} – {w.name}
                {unavailable ? ' (non desservie)' : ''}
              </option>
            );
          })}
        </SelectField>

        {kind === 'retail' && (
          <SelectField
            label="Quantité"
            name="quantity"
            required
            value={values.quantity}
            error={errors.quantity}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => set('quantity', e.target.value)}
          >
            {Array.from({ length: MAX_RETAIL_QUANTITY }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} {n > 1 ? 'packs' : 'pack'}
              </option>
            ))}
          </SelectField>
        )}
      </div>

      {kind === 'wholesale' && (
        <>
          <SelectField
            label="Volume souhaité"
            name="volume"
            required
            value={values.volume}
            error={errors.volume}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => set('volume', e.target.value)}
          >
            <option value="">Choisir…</option>
            {WHOLESALE_VOLUMES.map((v) => (
              <option key={v.value} value={v.value}>
                {v.label}
              </option>
            ))}
          </SelectField>
          <TextField
            label="Nom de la boutique (facultatif)"
            name="shop"
            autoComplete="organization"
            value={values.shop}
            error={errors.shop}
            onChange={(e: ChangeEvent<HTMLInputElement>) => set('shop', e.target.value)}
          />
        </>
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
            onChange={(e) => set('website', e.target.value)}
          />
        </label>
      </div>

      <CheckField
        name="consent"
        checked={values.consent}
        error={errors.consent}
        onChange={(e: ChangeEvent<HTMLInputElement>) => set('consent', e.target.checked)}
        label={copy.consent}
      />

      {formError && (
        <div id="form-error" role="alert" className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-sm text-danger">
          <p className="font-medium">{formError}</p>
          {whatsapp && (
            <p className="mt-1">
              <a className="underline underline-offset-2" href={whatsapp} target="_blank" rel="noopener noreferrer">
                Nous écrire sur WhatsApp
              </a>
            </p>
          )}
        </div>
      )}

      <div className="space-y-3">
        <Button type="submit" size="lg" className="w-full" loading={status === 'submitting'}>
          {status === 'submitting' ? copy.sending : copy.submit}
        </Button>
        <p className="text-center text-xs text-ink-faint">{copy.footnote}</p>
      </div>
    </form>
  );
}
