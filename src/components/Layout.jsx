import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Truck, ShoppingCart, Menu, X, Home, LayoutGrid, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SearchBar from './SearchBar';
import { cn } from '../lib/utils';

// Enlaces del menú — ahora horizontales, arriba, en vez del menú lateral
// que tenía el sitio original.
const ENLACES_NAV = [
  { id: 'inicio', href: '/', etiqueta: 'Inicio', icono: Home },
  { id: 'categorias', href: '/categorias', etiqueta: 'Categorías', icono: LayoutGrid },
  { id: 'ofertas', href: '/ofertas', etiqueta: 'Ofertas', icono: Tag },
  { id: 'recomendaciones', href: '/recomendaciones', etiqueta: 'Recomendaciones', icono: Sparkles },
];

// Traduce la ruta actual al id de ENLACES_NAV que debe verse activo.
function idPaginaActiva(pathname) {
  if (pathname === '/') return 'inicio';
  if (pathname.startsWith('/categorias')) return 'categorias';
  if (pathname.startsWith('/ofertas')) return 'ofertas';
  if (pathname.startsWith('/recomendaciones') || pathname.startsWith('/producto')) return 'recomendaciones';
  return null;
}

function Banner() {
  return (
    <div className="bg-gold text-ink text-center text-xs sm:text-sm font-subtitle font-semibold py-2 px-4 flex items-center justify-center gap-2">
      <Truck className=" text-white size-4 shrink-0 w-5 h-5" />
      <span className="text-white">Oferta por tiempo limitado — envío gratis en compras mayores a $500</span>
    </div>
  );
}

function LogoDonPollito() {
  return (
    <Link to="/" className="order-1 flex items-center gap-2 shrink-0">
      <img src="/icono.png" className="w-20 h-20" alt="Don Pollito" />
      <span className="font-title text-2xl md:text-3xl text-maroon tracking-wide">Don Pollito</span>
    </Link>
  );
}

function CartButton() {
  const { totalArticulos } = useCart();
  return (
    <Link
      to="/carrito"
      className="relative flex items-center justify-center w-11 h-11 rounded-full hover:bg-black/5 transition text-ink shrink-0"
      aria-label={`Carrito, ${totalArticulos} artículo${totalArticulos === 1 ? '' : 's'}`}
    >
      <ShoppingCart className="size-6" />
      <span className="absolute top-0 right-0 bg-maroon text-paper text-[10px] font-subtitle font-bold w-5 h-5 rounded-full flex items-center justify-center">
        {totalArticulos}
      </span>
    </Link>
  );
}

function NavDesktop({ paginaActiva }) {
  return (
    <nav className="order-2 hidden md:flex items-center gap-1">
      {ENLACES_NAV.map(({ id, href, etiqueta, icono: Icono }) => (
        <Link
          key={id}
          to={href}
          className={cn(
            'flex items-center gap-1.5 px-3.5 py-2 rounded-full font-subtitle text-sm font-semibold transition',
            id === paginaActiva ? 'bg-gold/15 text-maroon' : 'text-ink/70 hover:bg-black/5 hover:text-maroon'
          )}
        >
          <Icono className="size-4" />
          {etiqueta}
        </Link>
      ))}
    </nav>
  );
}

function NavMovil({ paginaActiva, abierto, onCerrar }) {
  return (
    <nav
      id="menu-movil"
      aria-hidden={!abierto}
      className={cn(
        'md:hidden overflow-hidden bg-white transition-[max-height] duration-200',
        abierto ? 'max-h-96 border-t border-black/10' : 'max-h-0'
      )}
    >
      <div className="flex flex-col gap-1 px-4 py-3">
        {ENLACES_NAV.map(({ id, href, etiqueta, icono: Icono }) => (
          <Link
            key={id}
            to={href}
            tabIndex={abierto ? 0 : -1}
            onClick={onCerrar}
            className={cn(
              'flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-subtitle text-sm font-semibold transition',
              id === paginaActiva ? 'bg-gold/15 text-maroon' : 'text-ink/70 hover:bg-black/5'
            )}
          >
            <Icono className="size-4" />
            {etiqueta}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function Header({ paginaActiva }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();
  const primerRender = useRef(true);

  useEffect(() => {
    if (primerRender.current) {
      primerRender.current = false;
      return;
    }
    setMenuAbierto(false);
  }, [location.pathname]);

  return (
    <header className="w-full bg-paper/90 backdrop-blur-md border-b border-black/10 sticky top-0 z-30">
      {/* Un solo <SearchBar/>: en vez de montar dos instancias (una para
          escritorio y otra para móvil, cada una con su propio estado),
          esta única instancia se reubica con clases de Tailwind (order +
          w-full/flex-1) según el ancho de pantalla. */}
      <div className="px-4 md:px-10 py-3 md:py-4 flex flex-wrap items-center gap-3 md:gap-6">
        <LogoDonPollito />
        <NavDesktop paginaActiva={paginaActiva} />
        <div className="order-2 md:order-4 flex items-center gap-1 ml-auto md:ml-0">
          <CartButton />
          <button
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto((v) => !v)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full hover:bg-black/5 transition text-ink"
          >
            {menuAbierto ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
        <SearchBar className="order-3 w-full md:w-auto md:flex-1 md:max-w-md" />
      </div>
      <NavMovil paginaActiva={paginaActiva} abierto={menuAbierto} onCerrar={() => setMenuAbierto(false)} />
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-maroon text-paper/70 font-body text-sm py-6 px-4 mt-auto">
      
      <div className="text-center">
        {/* Contacto */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6">
          <a href="mailto:DonPollito@gmail.com" className="hover:text-paper transition">Contacto: DonPollito@gmail.com</a>
          <a href="tel:7531006767" className="hover:text-paper transition">Teléfono: 753-100-6767</a>
        </div>

        {/* Horario */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-6 mt-2">
          <span>Horario: Martes a Domingo 10:00 am - 8:00 pm</span>
        </div>
      </div>

      {/* Derechos reservados */}
      <div className="border-t border-paper/10 mt-8 pt-6 text-center">
        <p>
          &copy; 2026 Don Pollito. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

export default function Layout({ children, showBanner = true }) {
  const location = useLocation();
  const paginaActiva = idPaginaActiva(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      {showBanner && <Banner />}
      <Header paginaActiva={paginaActiva} />
      <main className="flex-1 px-4 md:px-10 py-8 md:py-10 max-w-7xl w-full mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
