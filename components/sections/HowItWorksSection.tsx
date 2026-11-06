import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';

export function HowItWorksSection() {
  return (
    <section id="comment-ca-marche" className="scroll-mt-20 container-page space-y-12">
      <div className="mx-auto max-w-2xl text-center space-y-4">
        <Badge>Processus</Badge>
        <h2 className="section-title">Comment ça marche ?</h2>
        <p className="section-lead mx-auto">Quatre étapes simples, sécurisées et sans paiement en ligne.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardBody className="space-y-3"><span className="text-2xl font-bold text-[#D4AF37]">01</span><h3 className="font-bold text-[#F7F5EF]">Réservation</h3><p className="text-xs text-ink-soft">Remplissez le formulaire en quelques secondes.</p></CardBody></Card>
        <Card><CardBody className="space-y-3"><span className="text-2xl font-bold text-[#D4AF37]">02</span><h3 className="font-bold text-[#F7F5EF]">Appel de confirmation</h3><p className="text-xs text-ink-soft">Nous vous appelons dans la journée pour valider les détails.</p></CardBody></Card>
        <Card><CardBody className="space-y-3"><span className="text-2xl font-bold text-[#D4AF37]">03</span><h3 className="font-bold text-[#F7F5EF]">Acheminement</h3><p className="text-xs text-ink-soft">Préparation soignée de votre pack et transport sécurisé.</p></CardBody></Card>
        <Card><CardBody className="space-y-3"><span className="text-2xl font-bold text-[#D4AF37]">04</span><h3 className="font-bold text-[#F7F5EF]">Paiement à la livraison</h3><p className="text-xs text-ink-soft">Vous inspectez votre colis et payez à réception dans votre wilaya.</p></CardBody></Card>
      </div>
    </section>
  );
}
