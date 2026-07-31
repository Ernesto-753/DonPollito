import { forwardRef } from 'react';
import { cn } from '../../lib/utils';


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
