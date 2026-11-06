import { Icon } from '@/components/ui/Icons';
import { whatsappLink } from '@/lib/site-config';

/**
 * Bouton WhatsApp flottant, présent sur toutes les pages publiques.
 * Rendu uniquement si NEXT_PUBLIC_CONTACT_WHATSAPP est configuré.
 */
export function WhatsAppFab() {
  const href = whatsappLink('Bonjour, je souhaite des informations sur vos produits.');
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-[#0B3D2E] shadow-lift ring-1 ring-[#D4AF37]/40 transition duration-200 ease-out-soft hover:-translate-y-0.5 hover:bg-[#F3D77A] active:translate-y-0"
    >
      <Icon name="whatsapp" className="h-6 w-6" />
    </a>
  );
}
