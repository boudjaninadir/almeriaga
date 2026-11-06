import type { Metadata } from 'next';
import { SimulatorApp } from '@/components/SimulatorApp';

/**
 * Module PRIVÉ : protégé par middleware (Basic Auth), noindex, hors sitemap et hors robots.
 * C'est le seul endroit, avec /admin/suivi, où des euros et des marges peuvent apparaître.
 */
export const metadata: Metadata = {
  title: 'Simulateur de rentabilité (privé)',
  description: 'Simulateur interne de micro-importation : coûts, marges et seuils de rentabilité.',
  robots: { index: false, follow: false, nocache: true },
};

export default function SimulateurPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-page">
        <SimulatorApp />
      </div>
    </div>
  );
}

