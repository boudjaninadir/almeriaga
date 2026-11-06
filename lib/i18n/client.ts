import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

/**
 * Pose le cookie de langue côté navigateur. `SameSite=Lax` suffit : le cookie
 * n'est lu que par le serveur pour choisir le dictionnaire, aucun secret.
 */
export function persistLocale(locale: Locale): void {
  if (typeof document === 'undefined') return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
}
