import { Link } from 'react-router-dom';
import { ImageOff, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatoMoneda } from '../data/productos';

// Tarjeta de producto usada en Inicio, Recomendaciones y Buscar. Ahora es un
// <Card /> (estilo "neo" tomado de JAN: rounded-2xl, sin borde, sombra que
// crece y la tarjeta se levanta al pasar el mouse) y trae su propio botón
// "Añadir al Carrito" — igual que en el boceto — para poder comprar
// directo desde la grilla sin depender de una página de detalle.
//
// La imagen y el nombre siempre enlazan a /producto/:id: como
// ProductoDetalle.jsx ya sabe mostrar el detalle de cualquier producto del
// catálogo, cada tarjeta apunta directo ahí (el botón de abajo usa
// stopPropagation para poder agregar al carrito sin disparar la navegación).
export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = useCart();
  const { show } = useToast();

  const agregar = (evento) => {
    evento.preventDefault();
    evento.stopPropagation();
    agregarAlCarrito(producto.id, 1);
    show(`${producto.nombre} se añadió al carrito`);
  };

  const imagen = (
    <div className="aspect-square w-full bg-black/[0.02] flex items-center justify-center overflow-hidden">
      {producto.imagen ? (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-contain p-6 group-hover:scale-105 transition duration-300"
        />
      ) : (
        <span className="text-black/20 group-hover:text-gold transition">
          <ImageOff className="size-10" />
        </span>
      )}
    </div>
  );

  const info = (
    <div className="p-4">
      <h3 className="font-subtitle text-base font-semibold text-ink group-hover:text-maroon transition truncate">
        {producto.nombre}
      </h3>
      <p className="mt-1 font-body text-lg font-bold text-gold">{formatoMoneda(producto.precio)}</p>
    </div>
  );

  return (
    <Card className="neo-card-hover group flex flex-col overflow-hidden">
      <Link to={`/producto/${producto.id}`}>
        {imagen}
        {info}
      </Link>
      <div className="px-4 pb-4">
        <Button onClick={agregar} className="w-full" size="sm">
          <ShoppingCart className="size-4" />
          Añadir al Carrito
        </Button>
      </div>
    </Card>
  );
}
