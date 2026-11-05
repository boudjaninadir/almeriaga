import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { CONTACT, LEGAL, SITE, displayPhone, whatsappLink } from '@/lib/site';

const LINKS = [
  { href: '/#produits', label: 'Produits' },
  { href: '/simulateur', label: 'Simulateur' },
  { href: '/#fournisseurs', label: 'Fournisseurs' },
  { href: '/#suivi', label: 'Suivi de dossier' },
  { href: '/#a-propos', label: 'À propos' },
  { href: '/mentions-legales', label: 'Mentions légales' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = whatsappLink(`Bonjour ${SITE.name}, j’ai une question.`);

  return (
    <footer className="bg-dark-block pb-28 pt-14 text-white/80 md:pb-14">
      <div className="container-page grid gap-10 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo light gradientId="almeriaga-gold-footer" />
          <div className="space-y-1 text-sm">
            {LEGAL.sellerName && <p className="font-medium text-white">{LEGAL.sellerName}</p>}
            <p>Auto-entrepreneur · Micro-importateur</p>
            {LEGAL.anae && <p>N° ANAE : {LEGAL.anae}</p>}
            {LEGAL.nif && <p>NIF : {LEGAL.nif}</p>}
            {LEGAL.city && <p>{LEGAL.city}, Algérie</p>}
          </div>
        </div>

        <nav aria-label="Pied de page" className="space-y-2 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">Navigation</p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold-light">Contact par pôle</p>
          <div className="space-y-1.5 text-xs">
            <p><span className="text-white/60">Général :</span> <a href={`mailto:${CONTACT.emails.hello}`} className="hover:text-gold-light underline">{CONTACT.emails.hello}</a></p>
            <p><span className="text-white/60">Commandes :</span> <a href={`mailto:${CONTACT.emails.commandes}`} className="hover:text-gold-light underline">{CONTACT.emails.commandes}</a></p>
            <p><span className="text-white/60">Revendeurs :</span> <a href={`mailto:${CONTACT.emails.gros}`} className="hover:text-gold-light underline">{CONTACT.emails.gros}</a></p>
            <p><span className="text-white/60">Fournisseurs :</span> <a href={`mailto:${CONTACT.emails.fournisseurs}`} className="hover:text-gold-light underline">{CONTACT.emails.fournisseurs}</a></p>
            <p><span className="text-white/60">Support :</span> <a href={`mailto:${CONTACT.emails.support}`} className="hover:text-gold-light underline">{CONTACT.emails.support}</a></p>
          </div>
          {CONTACT.whatsappNumber && (
            <p className="pt-2">
              {whatsapp ? (
                <a className="transition hover:text-white font-semibold text-gold-light" href={whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp {displayPhone(CONTACT.whatsappNumber)}
                </a>
              ) : (
                displayPhone(CONTACT.whatsappNumber)
              )}
            </p>
          )}
        </div>
      </div>

      <div className="container-page mt-10 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/60">
        <p>
          © {year} {SITE.name}. Tous droits réservés. PlayStation et PS5 sont des marques de Sony Interactive Entertainment ;
          {' '}
          {SITE.name} n’est pas affilié à Sony. Grand Theft Auto est une marque de Take-Two Interactive.
        </p>
      </div>
    </footer>
  );
}

