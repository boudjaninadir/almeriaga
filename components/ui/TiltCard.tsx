'use client';

import { useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Carte qui s'incline au survol (perspective CSS).
 * Les variables --tilt-x / --tilt-y sont posées en JS, la transformation est en CSS
 * pour rester sur `transform` uniquement. Désactivé au doigt et en mode « moins d'animation ».
 */
export function TiltCard({
  children,
  className,
  strength = 7,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'mouse') return;
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const ratioX = (event.clientX - rect.left) / rect.width - 0.5;
    const ratioY = (event.clientY - rect.top) / rect.height - 0.5;
    element.style.setProperty('--tilt-y', `${(ratioX * strength).toFixed(2)}deg`);
    element.style.setProperty('--tilt-x', `${(-ratioY * strength).toFixed(2)}deg`);
    setActive(true);
  }

  function reset() {
    const element = ref.current;
    if (element) {
      element.style.setProperty('--tilt-y', '0deg');
      element.style.setProperty('--tilt-x', '0deg');
    }
    setActive(false);
  }

  return (
    <div className="tilt-wrap h-full">
      <div
        ref={ref}
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        className={cn('tilt-card h-full', active && 'tilt-card--active', className)}
      >
        {children}
      </div>
    </div>
  );
}
