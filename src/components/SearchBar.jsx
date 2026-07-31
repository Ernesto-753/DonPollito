import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { PRODUCTOS, formatoMoneda } from '../data/productos';

// Búsqueda funcional en el header: filtra el catálogo en tiempo real y
// muestra hasta 6 sugerencias con foto/precio (estilo del input de
// búsqueda de JAN — bg suave, sin borde marcado, icono a la izquierda).
export default function SearchBar({ className = '' }) {
  const [query, setQuery] = useState('');
  const [abierto, setAbierto] = useState(false);
  const contenedorRef = useRef(null);
  const navigate = useNavigate();

  const sugerencias = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTOS.filter((p) => p.nombre.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  useEffect(() => {
    function alClicFuera(evento) {
      if (contenedorRef.current && !contenedorRef.current.contains(evento.target)) {
        setAbierto(false);
      }
    }
    document.addEventListener('mousedown', alClicFuera);
    return () => document.removeEventListener('mousedown', alClicFuera);
  }, []);

  const buscar = (valor) => {
    const q = valor.trim();
    if (!q) return;
    setAbierto(false);
    navigate(`/buscar?q=${encodeURIComponent(q)}`);
  };

  return (
    <div ref={contenedorRef} className={`relative ${className}`}>
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-ink/40 pointer-events-none" />
      <Input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setAbierto(true);
        }}
        onFocus={() => setAbierto(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') buscar(query);
          if (e.key === 'Escape') setAbierto(false);
        }}
        placeholder="Buscar productos de abarrotes..."
        className="pl-10 pr-8"
      />
      {query && (
        <button
          aria-label="Limpiar búsqueda"
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
        >
          <X className="size-4" />
        </button>
      )}

      {abierto && sugerencias.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-2xl shadow-xl border border-black/5 overflow-hidden z-40">
          {sugerencias.map((producto) => (
            <button
              key={producto.id}
              onClick={() => buscar(producto.nombre)}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.03] transition text-left"
            >
              <div className="size-9 rounded-lg bg-black/[0.02] shrink-0 flex items-center justify-center overflow-hidden">
                {producto.imagen && <img src={producto.imagen} alt="" className="w-full h-full object-contain" />}
              </div>
              <span className="flex-1 font-subtitle text-sm font-medium truncate">{producto.nombre}</span>
              <span className="font-body text-sm font-bold text-gold">{formatoMoneda(producto.precio)}</span>
            </button>
          ))}
          <button
            onClick={() => buscar(query)}
            className="w-full px-4 py-2.5 text-center font-subtitle text-sm font-semibold text-maroon hover:bg-black/[0.03] transition border-t border-black/5"
          >
            Ver todos los resultados para "{query}"
          </button>
        </div>
      )}
    </div>
  );
}
