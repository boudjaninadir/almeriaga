/**
 * Limiteur de débit en mémoire.
 * LIMITE À CONNAÎTRE : sur un hébergement serverless (Vercel), chaque instance a sa
 * propre mémoire, donc la limite est "au mieux". Pour une garantie stricte, remplacez
 * ce module par Upstash Redis (@upstash/ratelimit) sans toucher à la route API.
 */

type GlobalStore = {
  __almeriagaHits?: Map<string, number[]>;
  __almeriagaPhones?: Map<string, number>;
};

const g = globalThis as unknown as GlobalStore;
const hits = (g.__almeriagaHits ??= new Map<string, number[]>());
const phones = (g.__almeriagaPhones ??= new Map<string, number>());

const MAX_KEYS = 5000;

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number = Date.now(),
): { allowed: boolean; retryAfterSec: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

  if (recent.length >= limit) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - recent[0]!)) / 1000)) };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_KEYS) {
    for (const [k, times] of hits) {
      if (times.length === 0 || now - times[times.length - 1]! > windowMs) hits.delete(k);
    }
  }
  return { allowed: true, retryAfterSec: 0 };
}

/** Un même numéro ne doit pas créer plusieurs leads en quelques minutes (double clic, rafraîchissement). */
export function wasPhoneSeenRecently(phone: string, windowMs: number, now: number = Date.now()): boolean {
  const seenAt = phones.get(phone);
  return seenAt !== undefined && now - seenAt < windowMs;
}

export function rememberPhone(phone: string, now: number = Date.now()): void {
  phones.set(phone, now);
  if (phones.size > MAX_KEYS) {
    for (const [k, t] of phones) {
      if (now - t > 60 * 60 * 1000) phones.delete(k);
    }
  }
}
