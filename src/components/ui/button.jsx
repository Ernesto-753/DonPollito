import { forwardRef } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

/* Mismo patrón que src/components/ui/button.tsx de JAN (cva + variantes +
   tamaños), pero mapeado a la paleta de Don Pollito:
     - default   → fondo dorado (#a57f2c), para botones de acción principal
                   (precios/CTA), como pidió el usuario.
     - secondary → fondo guinda (#611232), para acciones secundarias fuertes.
     - outline   → borde, para acciones discretas (pasos, steppers).
     - ghost     → transparente, para iconos (carrito, buscar, menú).
     - link      → texto con subrayado al hover.
     - success   → verde hoja (#13582d), para confirmaciones puntuales. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-subtitle font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-gold text-paper hover:bg-gold-dark',
        secondary: 'bg-maroon text-paper hover:bg-maroon-dark',
        outline: 'border border-black/15 bg-transparent text-ink hover:bg-black/5',
        ghost: 'bg-transparent text-ink hover:bg-black/5',
        link: 'text-maroon underline-offset-4 hover:underline',
        success: 'bg-leaf text-paper hover:bg-leaf/90',
      },
      size: {
        default: 'h-11 px-5 text-sm',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const Button = forwardRef(({ className, variant, size, ...props }, ref) => (
  <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
));
Button.displayName = 'Button';
