import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Icon } from '@/components/ui/Icons';
import { Reveal } from '@/components/ui/Reveal';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_WHATSAPP, displayPhone, whatsappLink } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Nous joindre sur WhatsApp ou par e-mail. Aucun formulaire complexe.',
  alternates: { canonical: '/contact' },
};

/**
 * Contact général : WhatsApp et e-mail uniquement.
 * Les parcours professionnels sont accessibles par un bloc discret en bas de page
 * (et non depuis la landing).
 */
export default function ContactPage() {
  const whatsapp = whatsappLink(`Bonjour ${BRAND_NAME}, j’ai une question.`);

  return (
    <div className="container-page py-14 md:py-20">
      <Reveal>
        <Badge tone="mint">Contact</Badge>
        <h1 className="section-title mt-4">Nous joindre</h1>
        <p className="section-lead">
          Une question sur un produit, un délai ou une commande en cours ? Le plus simple reste WhatsApp. Vous pouvez
          aussi écrire par e-mail.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardBody className="space-y-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-mint text-mint-ink">
                <Icon name="whatsapp" className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold tracking-tightish text-ink">WhatsApp</h2>
              {whatsapp ? (
                <>
                  <p className="text-sm text-ink-soft">{displayPhone(CONTACT_WHATSAPP)}</p>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-mint-ink transition-colors hover:text-accent-ink"
                  >
                    Ouvrir la conversation
                    <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <p className="rounded-lg border border-line bg-surface-2 p-3 text-xs leading-relaxed text-ink-faint">
                  Non configuré (TODO) : renseignez NEXT_PUBLIC_CONTACT_WHATSAPP dans les variables d’environnement.
                </p>
              )}
            </CardBody>
          </Card>
        </Reveal>

        <Reveal delay={80}>
          <Card className="h-full">
            <CardBody className="space-y-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent-ink">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <h2 className="text-lg font-semibold tracking-tightish text-ink">E-mail</h2>
              {CONTACT_EMAIL ? (
                <>
                  <p className="break-all text-sm text-ink-soft">{CONTACT_EMAIL}</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent-ink transition-colors hover:text-accent"
                  >
                    Écrire un e-mail
                    <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <p className="rounded-lg border border-line bg-surface-2 p-3 text-xs leading-relaxed text-ink-faint">
                  Non configuré (TODO) : renseignez NEXT_PUBLIC_CONTACT_EMAIL dans les variables d’environnement.
                </p>
              )}
            </CardBody>
          </Card>
        </Reveal>
      </div>

      <Reveal delay={120}>
        <div className="mt-12 surface-card p-6">
          <h2 className="text-base font-semibold tracking-tightish text-ink">Délais de réponse</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Les demandes envoyées depuis le site sont rappelées dans l’ordre d’arrivée. Aucun engagement n’est pris
            avant la confirmation téléphonique.
          </p>
        </div>
      </Reveal>

      <div className="mt-16 border-t border-line pt-6 text-xs text-ink-faint">
        <p>
          Vous êtes un professionnel ?{' '}
          <Link href="/gros" className="underline underline-offset-2 transition-colors hover:text-accent-ink">
            Achat en gros
          </Link>{' '}
          ·{' '}
          <Link href="/revendeurs" className="underline underline-offset-2 transition-colors hover:text-accent-ink">
            Programme revendeur
          </Link>
        </p>
      </div>
    </div>
  );
}
