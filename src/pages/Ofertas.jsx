import Layout from '../components/Layout';
import PromocionesFlash from '../components/PromocionesFlash';

export default function Ofertas() {
  return (
    <Layout>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-2">Ofertas</h1>
      <p className="font-subtitle text-ink/60 mb-8">Promociones por tiempo limitado. ¡Aprovecha antes que se acaben!</p>
      <PromocionesFlash />
    </Layout>
  );
}
