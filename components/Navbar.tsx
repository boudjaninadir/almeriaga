'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { Logo } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { BRAND_NAME, whatsappLink } from '@/lib/site-config';


/**
 * Navigation publique (spec V4 §2) : Produits, Procédure ANAE, Fournisseur EU/DZ,
 * Cadre légal, Contact. Libellés localisés passés par le layout.
 */
const LINKS = [
  { href: '/', key: 'nav_home' },
  { href: '/produits', key: 'nav_products' },
  { href: '/anne-procedure', key: 'nav_procedure' },
  { href: '/fournisseur-eu', key: 'nav_suppliers_eu' },
  { href: '/fournisseur-dz', key: 'nav_suppliers_dz' },
  { href: '/cadre-legal', key: 'nav_legal' },
  { href: '/contact', key: 'nav_contact' },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}


export function Navbar({ ctaHref, labels }: { ctaHref: string; labels: Record<string, string> }) {
  const pathname = usePathname() ?? '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, j’ai une question.`);

  // Le menu mobile se referme au changement de page.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);


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
    <header className="sticky top-0 z-40 border-b border-[#D4AF37]/20 bg-[#F7F5EF]/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-3">
        <Link href="/" aria-label={`${BRAND_NAME}, accueil`} onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                  active ? 'text-[#8A6D1F]' : 'text-ink-soft hover:text-[#1B1F1D]',
                )}
              >
                {labels[link.key]}                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-[#D4AF37] transition-opacity duration-200',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                />
              </Link>
            );
          })}
        </nav>


        <div className="flex items-center gap-2">
          <ButtonLink href={ctaHref} size="md" className="hidden sm:inline-flex">
            {labels.cta_start}          </ButtonLink>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#FCFBF7] text-[#1B1F1D] transition hover:bg-[#F1EDE3] lg:hidden"
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

      <div id={menuId} hidden={!menuOpen} className="border-t border-[#D4AF37]/20 bg-[#FCFBF7] lg:hidden">
        <nav aria-label="Navigation mobile" className="container-page divide-y divide-[#D4AF37]/15 py-2">
          {LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center justify-between py-3 text-sm font-medium',
                  active ? 'text-[#8A6D1F]' : 'text-[#1B1F1D]',
                )}
              >
                {labels[link.key]}                <svg
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
            );
          })}

        </nav>


        <div className="container-page flex flex-col gap-3 pb-5">
          <ButtonLink href={ctaHref} size="lg" className="w-full" onClick={() => setMenuOpen(false)}>
            {labels.cta_start}          </ButtonLink>

          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D4AF37]/45 text-sm font-semibold text-[#8A6D1F] transition-colors duration-200 hover:bg-[#D4AF37] hover:text-[#1B1F1D]"
            >
              Discuter sur WhatsApp
            </a>
          )}
        </div>
      </div>
    </header>
  );
}




