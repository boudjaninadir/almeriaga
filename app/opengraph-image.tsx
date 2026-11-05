import { ImageResponse } from 'next/og';
import { BRAND_NAME, BRAND_TAGLINE } from '@/lib/site-config';

export const runtime = 'edge';
export const alt = `${BRAND_NAME} — ${BRAND_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Visuel de partage : thème clair, accent vif, aucune mention de produit spécifique. */
export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(150deg, #FDFBF7 0%, #FFECE3 55%, #E4F2ED 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#222429',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '68px',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: '#CD380A',
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
            color: '#222429',
          }}
        >
          {BRAND_TAGLINE}
        </div>
        <div
          style={{
            marginTop: '42px',
            fontSize: '20px',
            color: '#155C4C',
            background: '#E4F2ED',
            padding: '12px 26px',
            borderRadius: '9999px',
            border: '1px solid rgba(21, 92, 76, 0.18)',
          }}
        >
          Prix en dinars · Aucun paiement en ligne
        </div>
      </div>
    ),
    { ...size },
  );
}

