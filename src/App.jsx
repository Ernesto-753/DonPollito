import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Inicio from './pages/Inicio';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Recomendaciones from './pages/Recomendaciones';
import Carrito from './pages/Carrito';
import Pago from './pages/Pago';
import Exito from './pages/Exito';
import ProductoDetalle from './pages/ProductoDetalle';
import Buscar from './pages/Buscar';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/recomendaciones" element={<Recomendaciones />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/exito" element={<Exito />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/buscar" element={<Buscar />} />
        </Routes>
      </CartProvider>
    </ToastProvider>
  );
}

export default App;
