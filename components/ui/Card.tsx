import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

/** Surface blanche, filet fin, ombre douce : base de toutes les cartes. */
export function Card({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-xl3 border border-line bg-surface shadow-soft', className)} {...rest} />;
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('p-6 sm:p-7', className)} {...rest} />;
}

