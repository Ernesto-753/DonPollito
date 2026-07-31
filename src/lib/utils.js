import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Mismo helper que usa JAN (src/lib/utils.ts): junta clases condicionales
// (clsx) y resuelve conflictos de Tailwind (twMerge) para que un className
// pasado por props siempre pueda sobreescribir al de por defecto.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
