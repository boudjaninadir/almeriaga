'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Input';
import { createClient } from '@/lib/supabase/client';
import { useI18n } from '@/lib/i18n/context';
import { normalizeDzMobile } from '@/lib/validation';

export function AuthPanel() {
  const { dict } = useI18n();
  const t = dict.authPage;
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function google() {
    setError(null);
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
      });
      if (oauthError) {
        setError('Connexion Google indisponible pour le moment.');
        setBusy(false);
      }
    } catch {
      setError('Connexion Google indisponible pour le moment.');
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);
    if (method === 'phone') {
      if (!normalizeDzMobile(value)) {
        setError(t.phoneHint);
        return;
      }
      setNotice(t.note);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(t.emailPlaceholder);
      return;
    }
    setNotice(t.note);
  }

  return (
    <div className="border border-chalk p-6 sm:p-8">
      <div className="grid grid-cols-2 border-b border-chalk">
        {(['login', 'signup'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item);
              setError(null);
              setNotice(null);
            }}
            aria-pressed={mode === item}
            className={
              'h-11 border-b-2 font-sans text-[14px] transition-colors ' +
              (mode === item ? 'border-ink text-ink' : 'border-transparent text-stone hover:text-ink')
            }
          >
            {item === 'login' ? dict.nav.login : t.signup}
          </button>
        ))}
      </div>

      <h2 className="mt-7 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.02em] text-ink">{t.panelTitle}</h2>
      <p className="mt-2 font-sans text-[13px] leading-[1.6] text-stone">{t.panelLead}</p>

      <Button type="button" variant="secondary" size="lg" className="mt-6 w-full" onClick={google} loading={busy}>
        {t.google}
      </Button>

      <div className="my-5 flex items-center gap-3 font-sans text-[12px] text-stone">
        <span className="h-px flex-1 bg-chalk" />
        {t.or}
        <span className="h-px flex-1 bg-chalk" />
      </div>

      <div className="mb-5 flex gap-4">
        {(['phone', 'email'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMethod(item);
              setValue('');
              setError(null);
              setNotice(null);
            }}
            className={
              'font-sans text-[13px] transition-colors ' +
              (method === item ? 'text-ink underline underline-offset-4 decoration-accent' : 'text-stone hover:text-ink')
            }
          >
            {item === 'phone' ? t.phone : t.email}
          </button>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-4" noValidate>
        {method === 'phone' ? (
          <TextField
            label={t.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            hint={t.phoneHint}
            addon={<span>+213</span>}
            dir="ltr"
            value={value}
            error={error ?? undefined}
            onChange={(e) => setValue(e.target.value)}
          />
        ) : (
          <TextField
            label={t.email}
            type="email"
            autoComplete="email"
            placeholder={t.emailPlaceholder}
            value={value}
            error={error ?? undefined}
            onChange={(e) => setValue(e.target.value)}
          />
        )}

        <Button type="submit" size="lg" arrow className="w-full">
          {t.submit}
        </Button>
      </form>

      {notice && <p className="mt-4 border border-chalk px-4 py-3 font-sans text-[12px] leading-[1.6] text-ink">{notice}</p>}
      <p className="mt-4 font-sans text-[12px] leading-[1.6] text-stone">{t.note}</p>
    </div>
  );
}
