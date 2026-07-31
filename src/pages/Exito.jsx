import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Layout from '../components/Layout';
import { buttonVariants } from '../components/ui/button';
import { useCart } from '../context/CartContext';

export default function Exito() {
  const { vaciarCarrito } = useCart();
  const yaVaciado = useRef(false);

  useEffect(() => {
    if (yaVaciado.current) return;
    yaVaciado.current = true;
    vaciarCarrito();
  }, [vaciarCarrito]);

  return (
    <Layout showBanner={false}>
      <div className="flex flex-col items-center justify-center text-center py-16 max-w-lg mx-auto">
        <div className="w-40 h-40 rounded-full bg-leaf/10 flex items-center justify-center mb-6 text-leaf">
          <CheckCircle2 className="size-30" />
        </div>
        <img
            className="h-auto object-contain"
            src="/polloPulgar44.png"
            alt="Pollito pulgar arriba"
          />
        <h1 className="font-title text-3xl md:text-4xl text-maroon mb-3">Compra Exitosa</h1>
        <p className="font-body text-leaf font-semibold mb-8">¡Gracias por su compra!</p>
        <Link to="/" className={buttonVariants({ size: 'lg' })}>
          Volver al Inicio
        </Link>
      </div>
    </Layout>
  );
}
