import { redirect } from 'next/navigation';

/** Le simulateur n'appartient pas aux 22 écrans Figma : il est retiré de la navigation. */
export default function SimulateurPage() {
  redirect('/gros');
}
