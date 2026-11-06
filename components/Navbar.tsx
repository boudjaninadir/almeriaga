import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/lib/site';

const LINKS = [
  { href: '/#produits', label: 'Produits' },
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/#fournisseurs', label: 'Fournisseurs' },
  { href: '/#suivi', label: 'Suivi' },
  { href: '/#a-propos', label: 'À propos' },
] as const;

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-canvas/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label={`${SITE.name}, accueil`}>
          <Logo />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm font-medium text-ink-soft lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-brand">
              {link.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/#reserver" size="md">
          Réserver
        </ButtonLink>
      </div>
    </header>
  );
}

