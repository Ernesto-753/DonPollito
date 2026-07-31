import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PackageSearch } from 'lucide-react';
import Layout from '../components/Layout';
import HeroCarousel from '../components/HeroCarousel';
import CategoryFilter from '../components/CategoryFilter';
import TarjetaProducto from '../components/TarjetaProducto';
import PromocionesFlash from '../components/PromocionesFlash';
import { PRODUCTOS } from '../data/productos';

export default function Inicio() {
  const [params] = useSearchParams();
  const [categoria, setCategoria] = useState(params.get('categoria') || 'Todas');

  const destacados = useMemo(
    () => PRODUCTOS.filter((p) => p.destacado && (categoria === 'Todas' || p.categoria === categoria)),
    [categoria]
  );

  return (
    <Layout>
      <HeroCarousel />

      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-2">Bienvenido a Don Pollito</h1>
      <p className="font-subtitle text-ink/60 mb-6">Todo lo que necesitas para tu despensa, a un clic de distancia.</p>

      <div className="mb-6">
        <CategoryFilter activa={categoria} onCambiar={setCategoria} />
      </div>

      {destacados.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl mb-14">
          {destacados.map((producto) => (
            <TarjetaProducto key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-16 max-w-lg mb-14">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 text-gold">
            <PackageSearch className="size-8" />
          </div>
          <p className="font-subtitle text-ink/60">
            Aún no tenemos productos en esta categoría. ¡Vuelve pronto!
          </p>
        </div>
      )}

      <PromocionesFlash />
    </Layout>
  );
}
