import { SimulatorApp } from '@/components/SimulatorApp';

export const metadata = {
  title: 'Simulateur de rentabilité',
  description: 'Simulateur de micro-importation : calculez vos coûts, marges et seuils de rentabilité en toute conformité.',
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
