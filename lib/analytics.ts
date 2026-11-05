/**
 * Helpers de suivi côté navigateur. Sans danger si les pixels ne sont pas chargés
 * (IDs absents, bloqueur de publicités) : chaque appel est protégé.
 *
 * L'eventId identique côté navigateur et (plus tard) côté serveur via l'API
 * Conversions de Meta / Events API de TikTok permet la déduplication.
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => void };
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

export function trackLead(eventId: string, contentName: string): void {
  try {
    window.fbq?.('track', 'Lead', { content_name: contentName }, { eventID: eventId });
  } catch {
    /* le suivi ne doit jamais casser le formulaire */
  }
  try {
    window.ttq?.track('SubmitForm', { content_name: contentName }, { event_id: eventId });
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
