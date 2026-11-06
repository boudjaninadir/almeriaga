'use client';

import { useEffect, useId, useRef, useState, useTransition } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Flag } from '@/components/i18n/Flags';
import { useI18n } from '@/lib/i18n/context';
import { persistLocale } from '@/lib/i18n/client';
import { LOCALE_META, LOCALE_ORDER } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

/**
 * Sélecteur de drapeaux du header. Il pose un cookie (lu par le serveur, qui rend
 * le HTML dans la bonne langue) puis rafraîchit l'arbre serveur — la page et le
 * défilement restent en place, aucun rechargement complet.
 */
export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Ferme au clic extérieur et à Échap ; rend le focus au bouton.
  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: MouseEvent) {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // À l'ouverture, place le focus sur la langue active pour la navigation clavier.
  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
    active?.focus();
  }, [open]);

  function choose(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    persistLocale(next);
    startTransition(() => router.refresh());
  }

  /** Navigation clavier conforme à une listbox : flèches, début, fin. */
  function onListKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const options = Array.from(listRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]') ?? []);
    if (options.length === 0) return;
    event.preventDefault();
    const current = options.indexOf(document.activeElement as HTMLButtonElement);
    let next = current;
    if (event.key === 'ArrowDown') next = current < 0 ? 0 : (current + 1) % options.length;
    if (event.key === 'ArrowUp') next = current < 0 ? options.length - 1 : (current - 1 + options.length) % options.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = options.length - 1;
    options[next]?.focus();
  }

  const current = LOCALE_META[locale];

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${dict.language.choose} — ${dict.language.current} : ${current.nativeLabel}`}
        className={
          'inline-flex h-10 items-center gap-2 border border-chalk bg-transparent px-2.5 font-sans text-[12px] font-medium text-ink ' +
          'transition-colors hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper ' +
          (isPending ? 'opacity-60' : '')
        }
      >
        <Flag code={current.flag} className="h-3 w-[18px] rounded-[1px] ring-1 ring-black/10" />
        <span className="uppercase tracking-[0.06em]">{current.code}</span>
        <svg
          viewBox="0 0 24 24"
          className={`h-2.5 w-2.5 text-stone transition ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {compact && <span className="sr-only">{dict.language.label}</span>}
      </button>

      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={dict.language.choose}
          onKeyDown={onListKeyDown}
          className="absolute end-0 z-50 mt-2 w-60 overflow-hidden rounded-[2px] border border-chalk bg-paper p-1 shadow-[0_16px_40px_rgba(20,20,20,0.10)]"
        >
          {LOCALE_ORDER.map((code) => {
            const meta = LOCALE_META[code];
            const selected = code === locale;
            return (
              <button
                key={code}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(code)}
                className={`flex w-full items-center gap-3 rounded-[2px] px-2.5 py-2.5 text-start text-sm transition-colors ${
                  selected ? 'bg-chalk/60 text-ink' : 'text-ink hover:bg-chalk/30'
                }`}
              >
                <Flag code={meta.flag} className="h-4 w-6 shrink-0 rounded-[2px] ring-1 ring-black/10" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{meta.nativeLabel}</span>
                  <span className="block truncate text-[11px] text-ink-faint">
                    {meta.hybrid ? `${meta.label} · ${dict.language.hybridNote}` : meta.label}
                  </span>
                </span>
                {selected && (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 text-brand"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}

      <span role="status" aria-live="polite" className="sr-only">
        {isPending ? dict.language.switching : ''}
      </span>
    </div>
  );
}
