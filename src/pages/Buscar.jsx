import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import Layout from '../components/Layout';
import TarjetaProducto from '../components/TarjetaProducto';
import { PRODUCTOS } from '../data/productos';

export default function Buscar() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  const resultados = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().includes(query));
  }, [q]);

  return (
    <Layout>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-2">Resultados de búsqueda</h1>
      <p className="font-subtitle text-ink/60 mb-8">
        {resultados.length > 0
          ? `${resultados.length} resultado${resultados.length === 1 ? '' : 's'} para "${q}"`
          : `Sin resultados para "${q}"`}
      </p>

      {resultados.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
          {resultados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 max-w-lg mx-auto">
          <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6 text-gold">
            <SearchX className="size-10" />
          </div>
          <p className="font-subtitle text-ink/60">
            No encontramos productos que coincidan. Intenta con otro nombre.
          </p>
        </div>
      )}
    </Layout>
  );
}
