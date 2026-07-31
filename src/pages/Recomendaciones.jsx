import Layout from '../components/Layout';
import TarjetaProducto from '../components/TarjetaProducto';
import { PRODUCTOS } from '../data/productos';

export default function Recomendaciones() {
  const recomendados = PRODUCTOS.filter((p) => p.recomendado);

  return (
    <Layout>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-8">Recomendaciones de Don Pollito</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
        {recomendados.map((producto) => (
          <TarjetaProducto key={producto.id} producto={producto} />
        ))}
      </div>
    </Layout>
  );
}
