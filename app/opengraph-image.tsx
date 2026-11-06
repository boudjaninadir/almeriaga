import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F5132 0%, #082d1c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#C9A227',
            marginBottom: '20px',
          }}
        >
          {SITE.name}
        </div>
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            maxWidth: '900px',
            lineHeight: 1.3,
            color: '#ffffff',
          }}
        >
          {SITE.title}
        </div>
        <div
          style={{
            marginTop: '40px',
            fontSize: '20px',
            color: '#d1fae5',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '12px 24px',
            borderRadius: '9999px',
          }}
        >
          Paiement à la livraison · Algérie
        </div>
      </div>
    ),
    { ...size }
  );
}
