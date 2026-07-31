import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { CATEGORIAS } from '../data/categorias';

// Cada categoría enlaza a Inicio con ?categoria=<nombre> para preseleccionar
// el mismo filtro que usa la grilla de productos de la página de Inicio.
export default function Categorias() {
  return (
    <Layout>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-8">Categorías</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
        {CATEGORIAS.map(({ nombre, icono: Icono }) => (
          <Link key={nombre} to={`/?categoria=${encodeURIComponent(nombre)}`}>
            <Card className="neo-card-hover flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
              <div className="w-14 h-14 rounded-full bg-maroon/5 flex items-center justify-center text-maroon">
                <Icono className="size-7" />
              </div>
              <span className="font-subtitle font-semibold text-ink">{nombre}</span>
            </Card>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
