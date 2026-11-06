import { ClosingCta } from '@/components/home/ClosingCta';
import { HomeFaq } from '@/components/home/Faq';
import { HomeHero } from '@/components/home/Hero';
import { HomeSteps } from '@/components/home/Steps';
import { TrustStrip } from '@/components/home/TrustStrip';

/**
 * Accueil — écran « Accueil / » de la maquette Figma (desktop 5:37063, mobile 5:37229).
 * Hero, trio de confiance, trois étapes, FAQ, bande de clôture.
 */
export default function Page() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <div className="space-y-16 pb-0 pt-16 lg:space-y-24 lg:pt-24">
        <HomeSteps />
        <HomeFaq />
      </div>
      <ClosingCta />
    </>
  );
}
