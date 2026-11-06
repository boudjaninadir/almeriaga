'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

type Item = { q: string; a: string };

/**
 * Accordéon FAQ conforme au handoff : cible ≥ 48 px, aria-expanded,
 * réponses conservées dans le DOM (accessibles aux lecteurs d'écran).
 */
export function Accordion({ items, defaultOpen = 'all' }: { items: Item[]; defaultOpen?: 'all' | 'first' | 'none' }) {
  const [open, setOpen] = useState<Set<number>>(() => {
    if (defaultOpen === 'all') return new Set(items.map((_, i) => i));
    if (defaultOpen === 'first') return new Set([0]);
    return new Set();
  });
  const baseId = useId();

  function toggle(index: number) {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="divide-y divide-chalk border-y border-chalk">
      {items.map((item, index) => {
        const expanded = open.has(index);
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-start font-display text-[18px] font-medium leading-snug text-ink transition-colors hover:text-stone"
              >
                <span>{item.q}</span>
                <span className="relative h-4 w-4 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
                  <span
                    className={cn(
                      'absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-transform duration-200',
                      expanded && 'scale-y-0',
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pb-6 pe-10 font-sans text-[16px] leading-[1.6] text-ink"
            >
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
