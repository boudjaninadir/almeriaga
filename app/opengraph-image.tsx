import { ImageResponse } from 'next/og';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/site-config';

export const runtime = 'edge';
export const alt = `${BRAND_NAME} — ${BRAND_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Visuel de partage : charte « Rich Minimalist » (blanc cassé + or), aucune mention de produit spécifique. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(150deg, #F7F5EF 0%, #F7F5EF 45%, #EDE9DF 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#1B1F1D',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#8A6D1F',
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
            color: '#1B1F1D',
          }}
        >
          {BRAND_TAGLINE}
        </div>
        <div
          style={{
            marginTop: '42px',
            fontSize: '20px',
            color: '#8A6D1F',
            background: '#FCFBF7',
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

