import { redirect } from 'next/navigation';

/** Ancienne route conservée pour les liens existants : renvoie vers /produits. */
export default function CataloguePage() {
  redirect('/produits');
}
