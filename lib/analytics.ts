/**
 * Helpers de suivi côté navigateur (Meta uniquement).
 * Sans danger si le pixel n'est pas chargé (identifiant absent, bloqueur de publicités) :
 * chaque appel est protégé.
 *
 * L'eventId transmis à /merci permet de rapprocher l'événement Lead de la conversion.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}


export function newEventId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  } catch {
    /* repli ci-dessous */
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/** Événement Lead : déclenché par la page /merci, avec l'identifiant de la demande. */
export function trackLead(eventId: string, contentName: string): void {
  try {
    window.fbq?.('track', 'Lead', { content_name: contentName }, { eventID: eventId });
  } catch {
    /* le suivi ne doit jamais casser la page */
  }
}

/** Événement ViewContent : déclenché à l'ouverture d'une fiche produit. */
export function trackViewContent(contentId: string, contentName: string): void {
  try {
    window.fbq?.('track', 'ViewContent', {
      content_type: 'product',
      content_ids: [contentId],
      content_name: contentName,
    });
  } catch {
    /* idem */
  }
}


export function readAttribution(keys: readonly string[]): Record<string, string> {
  const result: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of keys) {
      const value = params.get(key);
      if (value) result[key] = value.slice(0, 200);
    }
  } catch {
    /* ignoré */
  }
  return result;
}
