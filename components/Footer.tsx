import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { getLocaleContext } from '@/lib/i18n/server';

export function Footer() {
  const { dict } = getLocaleContext();
  const { footer, nav } = dict;

  const links = [
    { href: '/catalogue', label: nav.catalogue },
    { href: '/cadre-legal', label: nav.legal },
    { href: '/contact', label: nav.contact },
    { href: '/mentions-legales', label: footer.legal },
  ];

  return (
    <footer className="border-t border-chalk bg-paper">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16 md:py-16">
        <div className="max-w-[420px] space-y-6">
          <Logo />
          <p className="font-sans text-[13px] leading-[1.65] text-ink">{footer.tagline}</p>
        </div>

        <nav aria-label={footer.navTitle} className="space-y-1">
          <ul className="space-y-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-sans text-[14px] leading-none text-ink transition-colors hover:text-stone">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4">
          <p className="font-sans text-[12px] uppercase leading-none tracking-[0.12em] text-stone">{footer.twoShores}</p>
          <p className="font-sans text-[13px] leading-[1.6] text-ink">
            {footer.route}
            <br />
            {footer.routeCities}
          </p>
          <p className="font-sans text-[13px] leading-[1.6] text-stone">{footer.noPayment}</p>
        </div>
      </div>

      <div className="border-t border-chalk">
        <div className="container-page flex flex-col gap-2 py-6 font-sans text-[11px] leading-none text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>{footer.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
