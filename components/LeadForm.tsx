'use client';

import { RequestForm } from '@/components/forms/RequestForm';
import { useI18n } from '@/lib/i18n/context';
import type { LeadKind } from '@/lib/validation-compat';

/**
 * Passerelle temporaire pour les anciens écrans (simulateur, espace fournisseurs).
 * Les nouvelles pages utilisent directement <RequestForm>.
 */
export function LeadForm({ kind = 'retail', product }: { kind?: LeadKind; product?: string }) {
  const { dict } = useI18n();
  const type = kind === 'retail' ? 'consommateur' : kind === 'wholesale' ? 'gros' : 'devis';
  return (
    <RequestForm
      type={type}
      productSlug={product ?? (kind === 'retail' ? 'lisseur' : '')}
      submitLabel={dict.shop.product.submit}
      messageRequired={kind !== 'retail'}
    />
  );
}
