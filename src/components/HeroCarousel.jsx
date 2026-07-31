import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, CarouselDots } from './ui/carousel';
import { buttonVariants } from './ui/button';

const SLIDES = [
  {
    titulo: '¡Surtido Completo y Envío Rápido!',
    texto: 'Todo lo que necesitas para tu despensa, directo a tu puerta.',
    cta: 'Surtir Ahora',
    to: '/categorias',
    desde: 'from-maroon',
    hasta: 'to-tinto',
  },
  {
    titulo: 'Envío gratis desde $500',
    texto: 'Entre más llenes tu carrito, más te ahorras en envío.',
    cta: 'Ver Carrito',
    to: '/carrito',
    desde: 'from-gold-dark',
    hasta: 'to-gold',
  },
  {
    titulo: 'Lo que Don Pollito recomienda',
    texto: 'Los favoritos de la tienda, elegidos para ti.',
    cta: 'Ver Recomendaciones',
    to: '/recomendaciones',
    desde: 'from-tinto',
    hasta: 'to-maroon',
  },
];

// Carrusel de banner para Inicio — usa el mismo componente Carousel (puerto
// de JAN sobre embla-carousel-react) más el plugin de autoplay, con puntos
// indicadores como pide el boceto.
export default function HeroCarousel() {
  const [seleccionado, setSeleccionado] = useState(0);
  const apiRef = useRef(null);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const manejarApi = (api) => {
    apiRef.current = api;
    api.on('select', () => setSeleccionado(api.selectedScrollSnap()));
  };

  return (
    <Carousel setApi={manejarApi} plugins={[autoplay.current]} className="mb-8">
      <CarouselContent>
        {SLIDES.map((slide) => (
          <CarouselItem key={slide.titulo}>
            <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${slide.desde} ${slide.hasta} px-8 py-14 md:px-14 md:py-20 text-paper`}>
              <div className="relative max-w-lg">
                <h2 className="font-title text-2xl md:text-4xl font-bold mb-3">{slide.titulo}</h2>
                <p className="font-subtitle text-paper/80 mb-6">{slide.texto}</p>
                <Link to={slide.to} className={buttonVariants({ variant: 'default', size: 'lg' })}>
                  {slide.cta}
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
      <CarouselDots
        count={SLIDES.length}
        selected={seleccionado}
        onSelect={(i) => apiRef.current?.scrollTo(i)}
        className="mt-4"
      />
    </Carousel>
  );
}
