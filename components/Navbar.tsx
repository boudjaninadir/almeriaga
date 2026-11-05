'use client';

import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';
import { Logo } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { SITE, whatsappLink } from '@/lib/site';

/** Liens de la barre de navigation sur grand écran. */
const LINKS = [
  { href: '/#produits', label: 'Produits' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/#fournisseurs', label: 'Fournisseurs' },
  { href: '/#suivi', label: 'Suivi' },
  { href: '/#a-propos', label: 'À propos' },
] as const;

/** Menu mobile : mêmes liens + les pages qui n'ont pas de place dans la barre. */
const MOBILE_LINKS = [
  { href: '/#produits', label: 'Produits' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/simulateur', label: 'Simulateur de rentabilité' },
  { href: '/gros', label: 'Achat en gros / revendeurs' },
  { href: '/#fournisseurs', label: 'Fournisseurs' },
  { href: '/espace-fournisseurs', label: 'Espace fournisseurs' },
  { href: '/#suivi', label: 'Suivi de dossier' },
  { href: '/#a-propos', label: 'À propos' },
] as const;

export function Navbar() {
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, j’ai une question.`);

  // Échap ferme le menu ; un écran large le referme aussi (le panneau est masqué en CSS).
  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    const desktop = window.matchMedia('(min-width: 1024px)');
    function onBreakpointChange() {
      if (desktop.matches) setMenuOpen(false);
    }

    document.addEventListener('keydown', onKeyDown);
    desktop.addEventListener('change', onBreakpointChange);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      desktop.removeEventListener('change', onBreakpointChange);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label={`${SITE.name}, accueil`} onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm font-medium text-ink-soft lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setAuthOpen(true)}
            className="hidden text-sm font-medium text-ink-soft transition hover:text-brand sm:inline-flex"
          >
            Connexion
          </button>
          <ButtonLink href="/#reserver" size="md" className="hidden sm:inline-flex">
            Réserver
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface text-ink transition hover:bg-surface-2 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!menuOpen} className="border-t border-line bg-canvas lg:hidden">
        <nav aria-label="Navigation mobile" className="container-page divide-y divide-line py-2">
          {MOBILE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between py-3 text-sm font-medium text-ink transition hover:text-brand"
            >
              {link.label}
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-ink-faint"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setAuthOpen(true);
            }}
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-ink transition hover:text-brand"
          >
            Connexion
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 text-ink-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </nav>

        <div className="container-page flex flex-col gap-3 pb-5">
          <ButtonLink href="/#reserver" size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
            Réserver mon pack
          </ButtonLink>
          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-line bg-surface text-sm font-medium text-brand"
            >
              Discuter sur WhatsApp
            </a>
          )}
        </div>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}


