import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Milk, Minus, Plus, ShoppingCart } from 'lucide-react';
import Layout from '../components/Layout';
import { Button } from '../components/ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { obtenerProducto, formatoMoneda } from '../data/productos';

const RESPALDO = {
  nombre: '_________',
  precio: 0.0,
  caracteristicas: ['_________', '_________', '_________', '_________'],
};

export default function ProductoDetalle() {
  const { id } = useParams();
  const producto = obtenerProducto(id);
  const { agregarAlCarrito } = useCart();
  const { show } = useToast();
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    document.title = `${producto ? producto.nombre : RESPALDO.nombre} | Don Pollito`;
  }, [producto]);

  const nombre = producto ? producto.nombreCompleto || producto.nombre : RESPALDO.nombre;
  const precio = producto ? producto.precio : RESPALDO.precio;
  const caracteristicas = producto?.caracteristicas?.length ? producto.caracteristicas : RESPALDO.caracteristicas;

  const agregar = () => {
    if (!producto) return;
    agregarAlCarrito(producto.id, cantidad);
    show(`${producto.nombre} se añadió al carrito`);
  };

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-5xl">
        <div className="relative w-full max-w-sm mx-auto aspect-square flex items-center justify-center">
      {producto?.imagen ? (
        <div className="relative w-full h-full rounded-2xl bg-black/[0.02] border border-black/10 flex items-center justify-center overflow-hidden p-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>

      ) : (
        <>
          <div
            className="absolute inset-0 bg-gold/5 border-2 border-gold/30"
            style={{
              clipPath:
                'polygon(30% 2%, 70% 2%, 98% 30%, 98% 70%, 70% 98%, 30% 98%, 2% 70%, 2% 30%)'
            }}
          />
          <div className="relative flex flex-col items-center gap-3 text-maroon">
            <Milk className="size-16" strokeWidth={1.5} />
            <span className="font-subtitle font-bold tracking-[0.2em] text-sm">
              {(producto ? producto.nombre : RESPALDO.nombre).toUpperCase()}
            </span>
          </div>
    </>
)}

</div>
        <div>
          <h1 className="font-title text-3xl md:text-4xl text-maroon mb-2">{nombre}</h1>
          <p className="font-subtitle text-2xl md:text-3xl text-gold font-bold mb-6">{formatoMoneda(precio)}</p>
          <ul className="space-y-2.5 font-body text-ink/80 mb-8">
            {caracteristicas.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-gold font-bold">&bull;</span> {item}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-black/15 rounded-xl overflow-hidden">
              <button
                className="w-10 h-10 hover:bg-black/5 transition flex items-center justify-center"
                aria-label="Quitar uno"
                onClick={() => producto && setCantidad((c) => Math.max(1, c - 1))}
              >
                <Minus className="size-4" />
              </button>
              <input
                value={cantidad}
                readOnly
                className="w-12 h-10 text-center font-subtitle font-semibold outline-none border-x border-black/10"
              />
              <button
                className="w-10 h-10 hover:bg-black/5 transition flex items-center justify-center"
                aria-label="Agregar uno"
                onClick={() => producto && setCantidad((c) => c + 1)}
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>
          <Button size="lg" className="w-full sm:w-auto" onClick={agregar}>
            <ShoppingCart className="size-5" />
            Añadir al Carrito
          </Button>
        </div>
      </div>
    </Layout>
  );
}
