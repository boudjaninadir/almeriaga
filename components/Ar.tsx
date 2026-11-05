import type { ReactNode } from 'react';

/** Petit fragment en arabe (écriture de droite à gauche) à l'intérieur d'un texte français. */
export function Ar({ children }: { children: ReactNode }) {
  return (
    <span lang="ar" dir="rtl" className="font-medium">
      {children}
    </span>
  );
}
