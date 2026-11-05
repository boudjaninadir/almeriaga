const isDev = process.env.NODE_ENV === 'development';

/**
 * CSP en mode "Report-Only" : elle signale les violations dans la console du
 * navigateur sans rien bloquer. Après avoir vérifié que les pixels Meta/TikTok
 * et le formulaire fonctionnent sans alerte, remplacez la clé par
 * 'Content-Security-Policy' pour l'appliquer réellement.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''} https://connect.facebook.net https://analytics.tiktok.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.facebook.com https://analytics.tiktok.com https://*.tiktok.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.facebook.com https://connect.facebook.net https://analytics.tiktok.com https://*.tiktok.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy-Report-Only', value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
