import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/ui/Icons';
import { t } from '@/lib/i18n';
import { currentLocale } from '@/lib/locale-server';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_WHATSAPP, displayPhone, whatsappLink } from '@/lib/site-config';

/**
 * Pied de page : bloc sombre en dégradé très subtil (#0B3D2E → #06241B)
 * et liseré or 1px, conformément à la charte « Rich Minimalist ».
 * Aucun lien vers /gros ni /revendeurs ici : la landing ne doit pas les exposer.
 */
const LINKS = [
  { href: '/produits', label: 'Produits' },
  { href: '/cadre-legal', label: 'Cadre légal' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, j’ai une question.`);

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-[#D4AF37]/30 bg-gradient-to-b from-[#0B3D2E] to-[#06241B]">
      <div aria-hidden="true" className="brand-waves" />
      <div className="container-page relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            {t(currentLocale(), 'footer_tagline')}
          </p>
          <p className="text-xs text-ink-faint">Prix affichés en dinars algériens (DZD).</p>
        </div>

        <nav aria-label="Pied de page" className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Navigation</p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft transition-colors hover:text-[#D4AF37]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#D4AF37]">Contact</p>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#D4AF37] transition-colors hover:text-[#F3D77A]"
            >
              <Icon name="whatsapp" className="h-4 w-4" />
              WhatsApp {displayPhone(CONTACT_WHATSAPP)}
            </a>
          ) : (
            <p className="text-xs text-ink-faint">WhatsApp : non configuré (TODO).</p>
          )}
          {CONTACT_EMAIL ? (
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 break-all text-ink-soft transition-colors hover:text-[#D4AF37]"
            >
              <Icon name="mail" className="h-4 w-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          ) : (
            <p className="text-xs text-ink-faint">E-mail : non configuré (TODO).</p>
          )}
          <p className="pt-2 text-xs leading-relaxed text-ink-faint">
            Les informations légales présentées sur ce site ne constituent pas un conseil juridique : vérifiez-les
            auprès de l’ANAE et des Douanes avant publication.
          </p>
        </div>
      </div>

      <div className="container-page relative border-t border-[#D4AF37]/15 py-6 text-xs text-ink-faint">
        © {year} {BRAND_NAME}. Tous droits réservés.
      </div>
    </footer>
  );
}


