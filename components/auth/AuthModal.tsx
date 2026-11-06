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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#1B1F1D]/45 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="w-full max-w-md space-y-6 rounded-t-3xl border border-[#D4AF37]/25 bg-[#FCFBF7] p-6 shadow-2xl sm:rounded-3xl sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8A6D1F]">Espace sécurisé</p>
            <h2 id="auth-title" className="mt-1 text-xl font-bold text-[#1B1F1D]">Connexion ALMERÍAGA</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full p-2 text-ink-faint transition-colors hover:bg-[#F1EDE3] hover:text-[#8A6D1F]">✕</button>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          disabled={busy}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#D4AF37]/30 text-sm font-semibold text-[#1B1F1D] transition hover:border-[#D4AF37]/60 hover:bg-[#F1EDE3] disabled:opacity-60"
        >
          Continuer avec Google (Gmail)
        </button>

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-wider text-ink-faint">
          <span className="h-px flex-1 bg-[#D4AF37]/25" />
          ou téléphone algérien
          <span className="h-px flex-1 bg-[#D4AF37]/25" />
        </div>

        <form onSubmit={requestCode} className="space-y-3" noValidate>
          <label htmlFor="auth-phone" className="block text-sm font-medium text-[#1B1F1D]">Numéro mobile (+213)</label>
          <input
            id="auth-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0550 12 34 56"
            aria-invalid={phoneError ? true : undefined}
            className="h-12 w-full rounded-xl border border-[#D4AF37]/25 bg-[#F7F5EF] px-4 text-base text-[#1B1F1D] placeholder:text-ink-faint focus:border-[#D4AF37] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
          />
          {phoneError && <p role="alert" className="text-xs font-medium text-danger">{phoneError}</p>}
          <button type="submit" className="h-12 w-full rounded-xl bg-[#D4AF37] text-sm font-semibold text-[#1B1F1D] transition hover:bg-[#F3D77A]">
            Recevoir le code
          </button>
          {simulated && (
            <p role="status" className="rounded-xl border border-warn/25 bg-warn/5 p-3 text-xs text-warn">
              Mode démonstration : aucun SMS n’a été envoyé. La connexion par téléphone sera activée dès qu’un fournisseur SMS sera branché.
            </p>
          )}
        </form>

        {error && <p role="alert" className="text-xs font-medium text-danger">{error}</p>}
      </div>
    </div>
  );
}
