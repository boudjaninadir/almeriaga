import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 container-page space-y-8">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>FAQ</Badge>
        <h2 className="section-title">Questions fréquentes</h2>
      </div>

      <div className="grid gap-4 max-w-3xl mx-auto">
        <Card><CardBody className="space-y-2"><h3 className="font-bold text-ink">Le paiement se fait-il en ligne ?</h3><p className="text-xs text-ink-soft leading-relaxed">Non. Aucun paiement en ligne n'est demandé. Vous réglez directement à la livraison lors de la réception de votre pack dans votre wilaya.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><h3 className="font-bold text-ink">Quand serai-je rappelé après ma réservation ?</h3><p className="text-xs text-ink-soft leading-relaxed">Notre équipe vous contacte dans la journée pour confirmer les détails de votre commande et planifier l'acheminement.</p></CardBody></Card>
        <Card><CardBody className="space-y-2"><h3 className="font-bold text-ink">Les consoles sont-elles garanties ?</h3><p className="text-xs text-ink-soft leading-relaxed">Oui, chaque console neuve bénéficie d'une garantie vendeur de 12 mois avec facture officielle.</p></CardBody></Card>
      </div>
    </section>
  );
}
