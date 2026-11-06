'use client';

import { ButtonLink } from '@/components/ui/Button';
import { FEATURED_PRODUCT } from '@/lib/catalog';
import { useI18n } from '@/lib/i18n/context';
import { whatsappLink } from '@/lib/site';

/**
 * Barre d'action fixe en bas d'écran sur mobile : réserver ou joindre WhatsApp
 * sans remonter la page. Masquée à partir de `md` (le header prend le relais).
 */
export function MobileCtaBar() {
  const { dict } = useI18n();
  const product = dict.products.items[FEATURED_PRODUCT.slug as keyof typeof dict.products.items];
  const whatsapp = whatsappLink(dict.hero.whatsappMessage);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 px-4 py-3 backdrop-blur md:hidden">
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold text-ink">{product?.name ?? FEATURED_PRODUCT.name}</p>
          <p className="text-[11px] text-ink-faint">{dict.common.noOnlinePayment}</p>
        </div>
        {whatsapp && (
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dict.nav.whatsapp}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-brand"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm0 18.15h-.01a8.2 8.2 0 01-4.18-1.15l-.3-.18-3.11.82.83-3.04-.19-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 012.41 5.83c0 4.54-3.7 8.23-8.25 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.98-.15.16-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.02s.87 2.34 1 2.5c.12.16 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.05.14-1.16-.06-.1-.22-.16-.47-.28z" />
            </svg>
          </a>
        )}
        <ButtonLink href="#reserver" size="md" className="shrink-0">
          {dict.nav.reserve}
        </ButtonLink>
      </div>
    </div>
  );
}
