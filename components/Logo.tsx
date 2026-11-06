import { cn } from '@/lib/cn';

/**
 * Wordmark typographique Almeríaga (Figma : Manrope ExtraBold, minuscules, 27 px).
 * Aucun symbole, aucune capitale : l'identité tient au mot et à son interlettrage serré.
 */
export function Logo({
  className,
  inverted = false,
}: {
  className?: string;
  /** Conservé pour compatibilité : sur papier comme sur encre, le wordmark reste lisible. */
  inverted?: boolean;
  light?: boolean;
  gradientId?: string;
}) {
  return (
    <span
      className={cn(
        'font-display text-[27px] font-extrabold lowercase leading-none tracking-[-1.3px]',
        inverted ? 'text-paper' : 'text-ink',
        className,
      )}
      aria-label="Almeríaga"
    >
      almeríaga
    </span>
  );
}
