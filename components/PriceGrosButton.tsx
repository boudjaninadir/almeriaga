'use client';

import { useState } from 'react';
import { SubscriptionForm } from '@/components/lead/SubscriptionForm';
import { Button } from '@/components/ui/Button';
import { t, type Locale } from '@/lib/i18n';

/**
 * Bouton « Prix Gros » (spec V4 §3) : le prix gros n'est jamais public.
 * Un clic ouvre le formulaire Nom / Prénom / Téléphone → leads_gros.
 */
export function PriceGrosButton({
  locale,
  productSlug,
  productName,
}: {
  locale: Locale;
  productSlug: string;
  productName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-3">
      <Button variant="mint" size="md" onClick={() => setOpen((value) => !value)} aria-expanded={open}>
        {t(locale, 'price_gros')}
      </Button>
      {open && (
        <div className="rounded-xl3 border border-[#D4AF37]/25 bg-[#F7F5EF] p-5">
          <p className="mb-4 text-xs leading-relaxed text-ink-faint">{t(locale, 'price_gros_note')}</p>
          <SubscriptionForm locale={locale} type="gros_price" productSlug={productSlug} productName={productName} />
        </div>
      )}
    </div>
  );
}
