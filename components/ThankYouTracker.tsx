'use client';

import { useEffect } from 'react';
import { trackLead } from '@/lib/analytics';

/**
 * Confirme la conversion sur /merci : c'est ici, et seulement ici, que l'événement
 * Lead est envoyé. L'identifiant de demande (`eid`) est transmis par le formulaire.
 */
export function ThankYouTracker({ eventId, contentName }: { eventId: string; contentName: string }) {
  useEffect(() => {
    if (eventId) trackLead(eventId, contentName);
  }, [eventId, contentName]);

  return null;
}
