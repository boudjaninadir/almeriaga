'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { createClient } from '@/lib/supabase/client';
import { normalizeDzMobile } from '@/lib/validation';

type Props = { isOpen: boolean; onClose: () => void };

/**
 * Connexion : Google (Gmail) en priorité.
 * Téléphone (+213) : MODE SIMULATION — aucun SMS n'est envoyé tant qu'un fournisseur SMS n'est pas branché.
 */
export function AuthModal({ isOpen, onClose }: Props) {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [simulated, setSimulated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!isOpen) return null;

  async function loginWithGoogle() {
    setError(null);
    setBusy(true);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/` },
    });
    if (oauthError) {
      setError('Connexion Google indisponible pour le moment. Réessayez plus tard.');
      setBusy(false);
    }
  }

  function requestCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = normalizeDzMobile(phone);
    if (!normalized) {
      setPhoneError('Entrez un numéro mobile algérien valide (ex : 0550 12 34 56).');
      return;
    }
    setPhoneError(null);
    // Simulation : aucun SMS réellement envoyé. À remplacer lors du branchement d'un fournisseur SMS.
    setSimulated(true);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="w-full max-w-md space-y-6 rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Espace sécurisé</p>
            <h2 id="auth-title" className="mt-1 text-xl font-bold text-slate-900">Connexion ALMERÍAGA</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full p-2 text-slate-500 hover:bg-slate-100">✕</button>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          disabled={busy}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
        >
          Continuer avec Google (Gmail)
        </button>

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-slate-400">
          <span className="h-px flex-1 bg-slate-200" />
          ou téléphone algérien
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={requestCode} className="space-y-3" noValidate>
          <label htmlFor="auth-phone" className="block text-sm font-medium text-slate-700">Numéro mobile (+213)</label>
          <input
            id="auth-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0550 12 34 56"
            aria-invalid={phoneError ? true : undefined}
            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-base text-slate-900 focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800/20"
          />
          {phoneError && <p role="alert" className="text-xs font-medium text-rose-600">{phoneError}</p>}
          <button type="submit" className="h-12 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white transition hover:bg-slate-800">
            Recevoir le code
          </button>
          {simulated && (
            <p role="status" className="rounded-xl bg-amber-50 p-3 text-xs text-amber-800">
              Mode démonstration : aucun SMS n’a été envoyé. La connexion par téléphone sera activée dès qu’un fournisseur SMS sera branché.
            </p>
          )}
        </form>

        {error && <p role="alert" className="text-xs font-medium text-rose-600">{error}</p>}
      </div>
    </div>
  );
}
