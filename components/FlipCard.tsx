'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * @deprecated Carte de visite 3D de l'ancienne section « À propos ».
 * Les identifiants personnels (nom, ANAE, NIF, ville) ont été retirés : plus aucune
 * donnée personnelle n'est codée en dur. À retirer avec `git rm components/FlipCard.tsx`.
 */

type FlipCardProps = {
  rectoSrc?: string;
  versoSrc?: string;
};

export function FlipCard({ rectoSrc = '/images/carte-recto.png', versoSrc = '/images/carte-verso.png' }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      className="w-full max-w-sm mx-auto cursor-pointer perspective-1000 select-none py-4"
      onClick={() => setIsFlipped((prev) => !prev)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      title="Cliquez pour retourner la carte"
    >
      <div
        className={`relative w-full aspect-[1.75/1] rounded-2xl transition-transform duration-700 transform-style-3d shadow-lift ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Recto (Green Card) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-dark-block p-6 flex flex-col justify-between border border-gold/40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-strong to-brand opacity-90" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-gold-light">ALMERÍAGA</span>
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          </div>
          <div className="relative z-10 space-y-1">
            <h3 className="text-xl font-bold tracking-tight text-white">ALMERÍAGA</h3>
            <p className="text-xs text-gold-light font-mono">Auto-entrepreneur | Micro-importateur</p>
          </div>
          <div className="relative z-10 flex justify-between items-end text-[11px] font-mono text-white/70 pt-2 border-t border-gold/20">
            <span>Importation déclarée</span>
            <span>Micro-importation</span>
          </div>
        </div>

        {/* Verso (Gold Card) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-gold-light via-gold to-[#8A6E1E] p-6 flex flex-col justify-between rotate-y-180 text-brand-strong shadow-lift overflow-hidden border border-white/30">
          <div className="relative z-10 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Sourcing & Logistique</span>
            <span className="font-mono text-xs font-semibold">Algérie</span>
          </div>
          <div className="relative z-10 space-y-1 text-center">
            <p className="text-sm font-bold tracking-wider uppercase">De l'Espagne à votre porte</p>
            <p className="text-xs font-mono opacity-90">Paiement à la livraison · Facture & Garantie</p>
          </div>
          <div className="relative z-10 flex justify-between items-center text-[10px] font-mono opacity-80 pt-2 border-t border-brand-strong/20">
            <span>hello@almeriaga.com</span>
            <span>Rotation auto (clic pour inverser)</span>
          </div>
        </div>
      </div>
    </div>
  );
}