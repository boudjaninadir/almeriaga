import Script from 'next/script';

/**
 * Pixel Meta, chargé après l'interactivité (n'affecte pas le LCP).
 * L'identifiant vient de NEXT_PUBLIC_META_PIXEL_ID et est validé par format :
 * une valeur absente ou mal formée désactive simplement le pixel.
 *
 * Événements : ViewContent sur les fiches produit, Lead sur /merci.
 */
const META_ID = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '').trim();
const META_OK = /^\d{8,20}$/.test(META_ID);

export function Analytics() {
  if (!META_OK) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_ID}');fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}

