import { SubscriptionForm } from '@/components/lead/SubscriptionForm';
import { Badge } from '@/components/ui/Badge';
import { OFFERS_DZ, OFFERS_EU, type Offer } from '@/lib/data/offers';
import { formatDzd } from '@/lib/format';
import { t, type Locale } from '@/lib/i18n';

/**
 * Bannière pricing 3 offres (spec V4 §3) pour /fournisseur-eu et /fournisseur-dz.
 * Conversion exclusivement par lead form (Nom, Prénom, Téléphone) → leads_abonnement.
 */
export function SupplierOffers({ locale, market }: { locale: Locale; market: 'eu' | 'dz' }) {
  const offers: readonly Offer[] = market === 'eu' ? OFFERS_EU : OFFERS_DZ;

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={
              offer.highlight
                ? 'rounded-xl3 border border-[#D4AF37] bg-[#12513D] p-6 shadow-gold'
                : 'rounded-xl3 border border-[#D4AF37]/25 bg-[#0E4635] p-6 shadow-soft'
            }
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-[#F7F5EF]">{offer.name}</h3>
              {offer.highlight && <Badge tone="mint">Populaire</Badge>}
            </div>
            <p className="mt-3 font-display text-3xl font-semibold text-[#D4AF37]">
              {formatDzd(offer.price_dzd_month)}
              <span className="text-sm font-medium text-ink-faint"> / mois</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-soft">
              {offer.perks.map((perk) => (
                <li key={perk}>• {perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-xl rounded-xl3 border border-[#D4AF37]/25 bg-[#0E4635] p-6 sm:p-8">
        <h3 className="text-xl font-semibold text-[#F7F5EF]">{t(locale, 'offers_title')}</h3>
        <p className="mb-5 mt-1 text-sm text-ink-soft">{t(locale, 'offers_lead')}</p>
        <SubscriptionForm locale={locale} type="abonnement" offer={offers.find((o) => o.highlight)?.name ?? offers[0]?.name} />
      </div>
    </div>
  );
}
