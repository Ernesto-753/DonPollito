import { useEffect, useMemo, useState } from 'react';
import { Zap } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { PRODUCTOS, formatoMoneda } from '../data/productos';

const DEADLINE_KEY = 'donpollito_flash_deadline';
const DURACION_MS = 6 * 60 * 60 * 1000; // 6 horas

const DESCUENTOS_DEMO = [
  { id: 'cloralex', porcentaje: 30 },
  { id: 'boing', porcentaje: 20 },
  { id: 'zulka', porcentaje: 15 },
];

function leerOCrearDeadline() {
  const guardado = Number(localStorage.getItem(DEADLINE_KEY));
  if (guardado && guardado > Date.now()) return guardado;
  const nuevo = Date.now() + DURACION_MS;
  localStorage.setItem(DEADLINE_KEY, String(nuevo));
  return nuevo;
}

function formatearRestante(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const horas = String(Math.floor(total / 3600)).padStart(2, '0');
  const minutos = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const segundos = String(total % 60).padStart(2, '0');
  return { horas, minutos, segundos };
}

export default function PromocionesFlash() {
  const { agregarAlCarrito } = useCart();
  const { show } = useToast();
  const [deadline, setDeadline] = useState(leerOCrearDeadline);
  const [ahora, setAhora] = useState(Date.now());

  useEffect(() => {
    const intervalo = setInterval(() => setAhora(Date.now()), 1000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (ahora >= deadline) setDeadline(leerOCrearDeadline());
  }, [ahora, deadline]);

  const restante = formatearRestante(deadline - ahora);

  const ofertas = useMemo(
    () =>
      DESCUENTOS_DEMO.map(({ id, porcentaje }) => {
        const producto = PRODUCTOS.find((p) => p.id === id);
        if (!producto) return null;
        const precioOferta = producto.precio * (1 - porcentaje / 100);
        return { producto, porcentaje, precioOferta };
      }).filter(Boolean),
    []
  );

  if (ofertas.length === 0) return null;

  const comprar = (producto) => {
    agregarAlCarrito(producto.id, 1);
    show(`${producto.nombre} se añadió al carrito`);
  };

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="font-title text-2xl md:text-3xl text-maroon flex items-center gap-2">
          <Zap className="size-6 text-gold" />
          Promociones Flash
        </h2>
        <div className="flex items-center gap-1.5 font-subtitle font-bold text-sm text-maroon">
          <span>Termina en</span>
          {[restante.horas, restante.minutos, restante.segundos].map((valor, i) => (
            <span key={i} className="bg-maroon text-paper rounded-lg px-2 py-1 tabular-nums">
              {valor}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-3xl">
        {ofertas.map(({ producto, porcentaje, precioOferta }) => (
          <Card key={producto.id} className="neo-card-hover overflow-hidden relative">
            <Badge variant="default" className="absolute top-3 left-3 z-10 bg-maroon">
              -{porcentaje}%
            </Badge>
            <div className="aspect-square w-full bg-black/[0.02] flex items-center justify-center overflow-hidden">
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain p-6" />
            </div>
            <div className="p-4">
              <h3 className="font-subtitle text-base font-semibold text-ink truncate">{producto.nombre}</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-body text-lg font-bold text-gold">{formatoMoneda(precioOferta)}</span>
                <span className="font-body text-sm text-ink/40 line-through">{formatoMoneda(producto.precio)}</span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <Button size="sm" className="w-full" onClick={() => comprar(producto)}>
                Comprar Ahora
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
