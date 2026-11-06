import type { Metadata } from 'next';
import { Badge } from '@/components/ui/Badge';
import { ADMIN_STEPS } from '@/lib/admin-steps';
import { formatDzd } from '@/lib/format';
import { BRAND_NAME } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Suivi administratif',
  description: 'Suivi interne des démarches ANAE, mobilité et terrain.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

const TONE: Record<string, 'neutral' | 'accent' | 'mint'> = {
  'à faire': 'neutral',
  'en cours': 'accent',
  'à vérifier': 'accent',
  terminé: 'mint',
};

/**
 * Suivi administratif interne.
 * Route privée : /admin/suivi répond 404 sans ADMIN_USER/ADMIN_PASSWORD, et exige
 * une authentification Basic Auth sinon (voir middleware.ts).
 * Les données proviennent de lib/admin-steps.ts : aucun identifiant personnel.
 */
export default function AdminSuiviPage() {
  const total = ADMIN_STEPS.length;
  const done = ADMIN_STEPS.filter((step) => step.done).length;

  return (
    <div className="container-page py-10 md:py-14">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <Badge tone="neutral">Espace privé</Badge>
          <h1 className="text-3xl font-semibold tracking-display text-[#1B1F1D]">Suivi administratif</h1>
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft">
            Colonnes de la feuille « Suivi administratif » : phase, tâche, statut, établissement, date de dépôt,
            terminé, durée, notes et coût. Données locales (<code>lib/admin-steps.ts</code>), non connectées à la base.
          </p>
        </div>

        <div className="rounded-xl2 border border-[#D4AF37]/25 bg-[#FCFBF7] px-5 py-4 text-sm shadow-soft">
          <p className="font-semibold text-[#1B1F1D]">
            {done} / {total} terminées
          </p>
          <p className="text-xs text-ink-faint">{BRAND_NAME} — usage interne</p>
        </div>
      </div>

      <div className="mt-8 overflow-x-auto rounded-xl3 border border-[#D4AF37]/25 bg-[#FCFBF7] shadow-soft">
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
          <caption className="sr-only">Étapes administratives du projet</caption>
          <thead>
            <tr className="border-b border-[#D4AF37]/25 bg-[#F1EDE3] text-xs uppercase tracking-[0.08em] text-ink-faint">
              <th scope="col" className="px-4 py-3 font-semibold">Phase</th>
              <th scope="col" className="px-4 py-3 font-semibold">Tâche</th>
              <th scope="col" className="px-4 py-3 font-semibold">Statut</th>
              <th scope="col" className="px-4 py-3 font-semibold">Établissement</th>
              <th scope="col" className="px-4 py-3 font-semibold">Date de dépôt</th>
              <th scope="col" className="px-4 py-3 font-semibold">Terminé</th>
              <th scope="col" className="px-4 py-3 font-semibold">Durée</th>
              <th scope="col" className="px-4 py-3 font-semibold">Notes</th>
              <th scope="col" className="px-4 py-3 font-semibold">Coût</th>
            </tr>
          </thead>
          <tbody>
            {ADMIN_STEPS.map((step) => (
              <tr key={step.id} className="border-b border-[#D4AF37]/20 align-top last:border-b-0">
                <td className="whitespace-nowrap px-4 py-3 text-xs font-medium text-ink-soft">{step.phase}</td>
                <td className="px-4 py-3 font-medium text-[#1B1F1D]">{step.task}</td>
                <td className="px-4 py-3">
                  <Badge tone={TONE[step.status] ?? 'neutral'}>{step.status}</Badge>
                </td>
                <td className="px-4 py-3 text-ink-soft">{step.establishment}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-faint">{step.filedAt ?? '—'}</td>
                <td className="px-4 py-3 text-ink-soft">{step.done ? 'Oui' : 'Non'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-faint">
                  {step.durationDays === null ? '—' : `${step.durationDays} j`}
                </td>
                <td className="px-4 py-3 text-xs leading-relaxed text-ink-faint">{step.notes || '—'}</td>
                <td className="whitespace-nowrap px-4 py-3 text-ink-soft">
                  {step.costDzd === null ? '—' : formatDzd(step.costDzd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-ink-faint">
        Rappel : cette page ne contient aucun numéro personnel (NIF, ANAE, CASNOS, RIB). Les montants sont en dinars.
        Les démarches et montants doivent être confirmés auprès des administrations compétentes.
      </p>
    </div>
  );
}
