'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { Logo } from '@/components/Logo';
import { ButtonLink, ArrowUpRight } from '@/components/ui/Button';
import { useI18n } from '@/lib/i18n/context';
import { cn } from '@/lib/cn';

export function Navbar() {
  const { dict } = useI18n();
  const { nav } = dict;
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  const links = [
    { href: '/', label: nav.home, active: pathname === '/' },
    { href: '/catalogue', label: nav.catalogue, active: pathname.startsWith('/catalogue') || pathname.startsWith('/produit') || pathname.startsWith('/sur-commande') },
    { href: '/cadre-legal', label: nav.legal, active: pathname === '/cadre-legal' },
    { href: '/contact', label: nav.contact, active: pathname === '/contact' },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-chalk bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[104px]">
        <Link href="/" aria-label={`Almeríaga — ${nav.homeLabel}`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={nav.mainNav} className="hidden items-center gap-6 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.active ? 'page' : undefined}
              className={cn(
                'relative whitespace-nowrap py-2 font-sans text-[13px] leading-none transition-colors',
                link.active ? 'text-ink' : 'text-ink/80 hover:text-ink',
              )}
            >
              {link.label}
              {link.active && (
                <span className="absolute -bottom-0.5 start-0 h-px w-4 bg-accent" aria-hidden="true" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <ButtonLink href="/catalogue" size="lg" arrow className="hidden h-14 px-5 lg:inline-flex">
            {nav.reserve}
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-chalk text-ink transition-colors hover:border-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? nav.menuClose : nav.menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div id={menuId} hidden={!menuOpen} className="border-t border-chalk bg-paper lg:hidden">
        <div className="container-page flex flex-col gap-6 py-8">
          <nav aria-label={nav.mobileNav} className="flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex min-h-[56px] items-center justify-between border-b border-chalk py-3 font-display text-[18px] font-medium text-ink"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 text-stone" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center justify-between gap-4">
            <span className="eyebrow">{dict.language.label}</span>
            <LanguageSwitcher />
          </div>
          <ButtonLink href="/catalogue" size="lg" arrow className="w-full" onClick={() => setMenuOpen(false)}>
            {nav.reserve}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
