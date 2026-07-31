import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-11 w-full rounded-xl border border-black/10 bg-black/[0.02] px-4 py-2 font-body text-sm placeholder:text-ink/40 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';
