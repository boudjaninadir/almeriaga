import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE.name} — Deux rives. Un lien.`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#FAF8F4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          color: '#141414',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '54px', fontWeight: 800, letterSpacing: '-2.6px' }}>almeríaga</div>
          <div style={{ fontSize: '18px', letterSpacing: '2px', color: '#8A8680' }}>ESPAGNE → ALGÉRIE</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ width: '56px', height: '2px', background: '#E88923', marginBottom: '28px' }} />
          <div style={{ fontSize: '84px', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.02 }}>
            L’autre rive.
          </div>
          <div style={{ fontSize: '84px', fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.02 }}>
            À votre portée.
          </div>
          <div style={{ marginTop: '28px', fontSize: '22px', color: '#4A4844', maxWidth: '820px', lineHeight: 1.5 }}>
            Produits achetés en Espagne, remis en Algérie. Vous choisissez, un conseiller vous rappelle, vous payez à la remise.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E7E4DE', paddingTop: '24px', fontSize: '16px', color: '#8A8680' }}>
          <span>Aucun paiement en ligne.</span>
          <span>Oran · Tlemcen · Sidi Bel Abbès</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
