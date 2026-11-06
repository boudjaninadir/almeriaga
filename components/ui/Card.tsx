import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Carte épurée : fond blanc cassé, liseré or fin, ombre douce. Base de toutes les cartes. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-xl3 border border-[#D4AF37]/25 bg-[#FCFBF7] shadow-soft', className)}
      {...rest}
    />
  );
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 sm:p-7', className)} {...rest} />;
}

