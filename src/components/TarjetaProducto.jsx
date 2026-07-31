import { Link } from 'react-router-dom';
import { ImageOff, ShoppingCart } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatoMoneda } from '../data/productos';

export default function TarjetaProducto({ producto }) {
  const { agregarAlCarrito } = useCart();
  const { show } = useToast();
  const esRutaInterna = producto.pagina && producto.pagina !== '#' && !producto.pagina.startsWith('http');

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
      {esRutaInterna ? (
        <Link to={producto.pagina}>
          {imagen}
          {info}
        </Link>
      ) : (
        <div>
          {imagen}
          {info}
        </div>
      )}
      <div className="px-4 pb-4">
        <Button onClick={agregar} className="w-full" size="sm">
          <ShoppingCart className="size-4" />
          Añadir al Carrito
        </Button>
      </div>
    </Card>
  );
}
