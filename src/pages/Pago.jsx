import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import Layout from '../components/Layout';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

export default function Pago() {
  const navigate = useNavigate();

  const enviarFormulario = (evento) => {
    evento.preventDefault();
    navigate('/exito');
  };

  return (
    <Layout showBanner={false}>
      <h1 className="font-title text-3xl md:text-4xl text-maroon mb-8">Pago</h1>
      <div className="max-w-2xl">
        <div className="flex border-b border-black/10 mb-8">
          <button className="flex-1 py-3 font-subtitle font-semibold text-paper bg-maroon rounded-t-xl">Paso 1: Datos</button>
          <button className="flex-1 py-3 font-subtitle font-semibold text-black/40">Paso 2: Pago</button>
        </div>
        <Card className="p-6 shadow-md">
          <form className="space-y-5" onSubmit={enviarFormulario}>
            <div>
              <label className="block font-subtitle text-sm font-semibold mb-1.5">Nombre</label>
              <Input type="text" placeholder="Tu nombre completo" />
            </div>
            <div>
              <label className="block font-subtitle text-sm font-semibold mb-1.5">Dirección</label>
              <Input type="text" placeholder="Calle, número, colonia, ciudad" />
            </div>
            <div className="pt-4 border-t border-black/10">
              <h2 className="font-subtitle font-bold mb-3 flex items-center gap-2">
                <CreditCard className="size-5" />
                Información de Tarjeta
              </h2>
              <div className="space-y-4">
                <Input type="text" placeholder="**** **** **** 6189" />
                <div className="grid grid-cols-2 gap-4">
                  <Input type="text" placeholder="MM / YY" />
                  <Input type="text" placeholder="CVV" />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full mt-2" size="lg">
              Confirmar Pago
            </Button>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
