import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { Icon } from '@/components/ui/Icons';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_WHATSAPP, displayPhone, whatsappLink } from '@/lib/site-config';

/**
 * Pied de page clair, sans fond sombre.
 * Aucun lien vers /gros ni /revendeurs ici : la landing ne doit pas les exposer.
 */
const LINKS = [
  { href: '/catalogue', label: 'Catalogue' },
  { href: '/cadre-legal', label: 'Cadre légal' },
  { href: '/contact', label: 'Contact' },
  { href: '/mentions-legales', label: 'Mentions légales' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, j’ai une question.`);

  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
            Micro-importation depuis l’Espagne vers Oran, Tlemcen et Sidi Bel Abbès. Commande sans paiement en ligne,
            confirmation par téléphone.
          </p>
          <p className="text-xs text-ink-faint">Prix affichés en dinars algériens (DZD).</p>
        </div>

        <nav aria-label="Pied de page" className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Navigation</p>
          <ul className="space-y-2">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-soft transition-colors hover:text-accent-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">Contact</p>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mint-ink transition-colors hover:text-accent-ink"
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
              className="flex items-center gap-2 break-all text-ink-soft transition-colors hover:text-accent-ink"
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

      <div className="container-page border-t border-line py-6 text-xs text-ink-faint">
        © {year} {BRAND_NAME}. Tous droits réservés.
      </div>
    </footer>
  );
}


