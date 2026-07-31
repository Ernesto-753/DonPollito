import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

// Igual que src/components/ui/card.tsx de JAN: Card/Header/Title/Description/
// Content/Footer, pero con esquinas más redondeadas (rounded-2xl) y sin
// borde por defecto — el estilo "neo" de tarjeta que pidió el usuario
// (sombra suave + hover que "levanta" la tarjeta se agrega por className).
export const Card = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('rounded-2xl bg-white shadow-sm', className)} {...props} />
));
Card.displayName = 'Card';

export const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('font-subtitle text-lg font-bold leading-none', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('font-body text-sm text-ink/60', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
