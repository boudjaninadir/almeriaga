import { ImageResponse } from 'next/og';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/site-config';

export const runtime = 'edge';
export const alt = `${BRAND_NAME} — ${BRAND_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Visuel de partage : charte « Rich Minimalist » (émeraude profond + or), aucune mention de produit spécifique. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(150deg, #0B3D2E 0%, #0B3D2E 45%, #06241B 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#F7F5EF',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#D4AF37',
            marginBottom: '18px',
          }}
        >
          {BRAND_NAME}
        </div>
        <div
          style={{
            fontSize: '34px',
            fontWeight: 600,
            maxWidth: '900px',
            lineHeight: 1.25,
            color: '#F7F5EF',
          }}
        >
          {BRAND_TAGLINE}
        </div>
        <div
          style={{
            marginTop: '42px',
            fontSize: '20px',
            color: '#D4AF37',
            background: '#0E4635',
            padding: '12px 26px',
            borderRadius: '9999px',
            border: '1px solid rgba(212, 175, 55, 0.45)',
          }}
        >
          Prix en dinars · Aucun paiement en ligne
        </div>
      </div>
    ),
    { ...size },
  );
}

