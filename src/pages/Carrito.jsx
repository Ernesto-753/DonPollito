import { Link } from 'react-router-dom';
import { Truck, X, ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { buttonVariants } from '../components/ui/button';
import { useCart, COSTO_ENVIO } from '../context/CartContext';
import { obtenerProducto, formatoMoneda } from '../data/productos';

export default function Carrito() {
  const { carrito, quitarDelCarrito, subtotal } = useCart();
  const entradas = Object.entries(carrito);
  const envio = subtotal > 0 ? COSTO_ENVIO : 0;
  const total = subtotal + envio;

  return (
    <Layout>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-8">Tu Carrito</h1>
      <div className="grid lg:grid-cols-3 gap-10 items-start max-w-5xl">
        <Card className="lg:col-span-2 divide-y divide-black/10 shadow-none border border-black/10">
          {entradas.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6">
              <div className="w-14 h-14 rounded-full bg-maroon/5 flex items-center justify-center mb-4 text-maroon/40">
                <ShoppingBag className="size-7" />
              </div>
              <p className="text-ink/60 font-subtitle">Tu carrito está vacío.</p>
            </div>
          ) : (
            entradas.map(([id, cantidad]) => {
              const producto = obtenerProducto(id);
              if (!producto) return null;
              return (
                <div key={id} className="flex items-center justify-between py-4 px-6">
  
  <div className="flex items-center gap-4">

    {/* Botón eliminar */}
    <button
      className="text-black/40 hover:text-maroon transition"
      aria-label={`Quitar ${producto.nombre}`}
      onClick={() => quitarDelCarrito(id)}
    >
      <X className="size-4" />
    </button>

    {/* Imagen del producto */}
    <div className="w-16 h-16 rounded-lg border border-black/10 overflow-hidden flex items-center justify-center shrink-0">
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-full object-contain p-2"
      />
    </div>

    {/* Nombre y cantidad */}
    <div>
      <span className="font-subtitle font-medium">
        {producto.nombre}
      </span>

      {cantidad > 1 && (
        <p className="text-sm text-ink/60 font-body">
          Cantidad: {cantidad}
        </p>
      )}
    </div>

  </div>

  {/* Precio */}
  <span className="font-body font-semibold">
    {formatoMoneda(producto.precio * cantidad)}
  </span>

</div>
              );
            })
          )}
        </Card>

        <Card className="p-6 shadow-md">
          <h2 className="font-subtitle font-bold text-lg mb-4">Resumen</h2>
          <div className="space-y-2 font-body text-sm mb-4">
            <div className="flex justify-between">
              <span className="text-ink/70">Subtotal</span>
              <span>{formatoMoneda(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink/70 flex items-center gap-1.5">
                <Truck className="size-4" />
                Envío
              </span>
              <span>{formatoMoneda(envio)}</span>
            </div>
          </div>
          <div className="flex justify-between font-subtitle font-bold text-lg border-t border-black/10 pt-4 mb-6">
            <span>Total</span>
            <span className="text-gold">{formatoMoneda(total)}</span>
          </div>
          <Link to="/pago" className={buttonVariants({ className: 'w-full' })}>
            Pagar
          </Link>
        </Card>
      </div>
    </Layout>
  );
}
