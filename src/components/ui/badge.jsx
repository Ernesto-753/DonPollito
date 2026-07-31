import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

// Mismo patrón que src/components/ui/badge.tsx de JAN, con la paleta de
// Don Pollito. `success` usa el verde hoja reservado para mensajes/alertas.
export const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-subtitle font-semibold',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-gold text-paper',
        secondary: 'border-transparent bg-black/5 text-ink/70',
        outline: 'border-black/15 text-ink/70 bg-transparent',
        success: 'border-transparent bg-leaf/10 text-leaf',
        maroon: 'border-transparent bg-maroon/10 text-maroon',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
