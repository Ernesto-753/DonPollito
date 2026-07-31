import { createContext, forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './button';

// Puerto directo de src/components/ui/carousel.tsx de JAN (mismo uso de
// embla-carousel-react y la misma composición Carousel/CarouselContent/
// CarouselItem/CarouselPrevious/CarouselNext), sin los tipos de TypeScript.
const CarouselContext = createContext(null);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) throw new Error('useCarousel debe usarse dentro de <Carousel />');
  return context;
}

export const Carousel = forwardRef(
  ({ opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel({ ...opts, axis: 'x' }, plugins);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
    const scrollNext = useCallback(() => api?.scrollNext(), [api]);

    useEffect(() => {
      if (api && setApi) setApi(api);
    }, [api, setApi]);

    useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);
      return () => api?.off('select', onSelect);
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ carouselRef, api, scrollPrev, scrollNext, canScrollPrev, canScrollNext }}
      >
        <div ref={ref} className={cn('relative', className)} role="region" aria-roledescription="carousel" {...props}>
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

export const CarouselContent = forwardRef(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();
  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div ref={ref} className={cn('flex', className)} {...props} />
    </div>
  );
});
CarouselContent.displayName = 'CarouselContent';

export const CarouselItem = forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} role="group" aria-roledescription="slide" className={cn('min-w-0 shrink-0 grow-0 basis-full', className)} {...props} />
));
CarouselItem.displayName = 'CarouselItem';

export const CarouselPrevious = forwardRef(({ className, ...props }, ref) => {
  const { scrollPrev, canScrollPrev } = useCarousel();
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn('absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 shadow-md border-none', className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="size-4" />
      <span className="sr-only">Anterior</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

export const CarouselNext = forwardRef(({ className, ...props }, ref) => {
  const { scrollNext, canScrollNext } = useCarousel();
  return (
    <Button
      ref={ref}
      variant="outline"
      size="icon"
      className={cn('absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-white/90 shadow-md border-none', className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="size-4" />
      <span className="sr-only">Siguiente</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

// Puntos indicadores (dots) — no existen en el carousel.tsx original de
// JAN, se agregan aquí porque el boceto los pide explícitamente.
export function CarouselDots({ count, selected, onSelect, className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          aria-label={`Ir a la diapositiva ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn('h-2 rounded-full transition-all', i === selected ? 'w-6 bg-gold' : 'w-2 bg-white/60 hover:bg-white/90')}
        />
      ))}
    </div>
  );
}
