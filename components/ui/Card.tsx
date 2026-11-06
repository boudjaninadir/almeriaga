import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Carte épurée : fond émeraude, liseré or fin, ombre profonde. Base de toutes les cartes. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-xl3 border border-[#D4AF37]/25 bg-[#0E4635] shadow-soft', className)}
      {...rest}
    />
  );
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 sm:p-7', className)} {...rest} />;
}

