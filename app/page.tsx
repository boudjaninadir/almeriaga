import { MobileCtaBar } from '@/components/MobileCtaBar';
import { AboutSection } from '@/components/sections/AboutSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { FileTrackingSection } from '@/components/sections/FileTrackingSection';
import { HeroBrandSection } from '@/components/sections/HeroBrandSection';
import { HowItWorksSection } from '@/components/sections/HowItWorksSection';
import { PackSection } from '@/components/sections/PackSection';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ReserveSection } from '@/components/sections/ReserveSection';
import { SimulatorPreviewSection } from '@/components/sections/SimulatorPreviewSection';
import { SuppliersDemoSection } from '@/components/sections/SuppliersDemoSection';

/**
 * Page d'accueil : assemblage des sections dans l'ordre de lecture commercial.
 * Chaque ancre utilisée par la navigation existe ici et une seule fois :
 * `#produits`, `#pack`, `#reserver`, `#fournisseurs`, `#suivi`, `#a-propos`, `#faq`.
 */
export default function Page() {
  return (
    <>
      <HeroBrandSection />

      <div className="space-y-16 pb-16 pt-16 md:space-y-24 md:pb-24 md:pt-24">
        <ProductsSection />
        <PackSection />
        <ReserveSection />
        <HowItWorksSection />
        <SimulatorPreviewSection />
        <SuppliersDemoSection />
        <FileTrackingSection />
        <AboutSection />
        <FaqSection />
      </div>

      <MobileCtaBar />
    </>
  );
}

