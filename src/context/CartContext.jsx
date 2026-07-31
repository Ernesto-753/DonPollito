import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { obtenerProducto } from '../data/productos';

const CARRITO_KEY = 'donpollito_carrito';
export const COSTO_ENVIO = 10.0;

// Carrito de ejemplo la primera vez que alguien visita el sitio
const CARRITO_POR_DEFECTO = { leche: 1, mole: 1, azucar: 1, cafe: 1 };

function leerCarritoInicial() {
  const guardado = localStorage.getItem(CARRITO_KEY);
  if (guardado) {
    try {
      return JSON.parse(guardado);
    } catch (e) {
      // dato corrupto, se reinicia abajo
    }
  }
  localStorage.setItem(CARRITO_KEY, JSON.stringify(CARRITO_POR_DEFECTO));
  return CARRITO_POR_DEFECTO;
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoInicial);

  const persistir = useCallback((nuevoCarrito) => {
    localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevoCarrito));
    setCarrito(nuevoCarrito);
  }, []);

  const agregarAlCarrito = useCallback(
    (idProducto, cantidad = 1) => {
      setCarrito((actual) => {
        const nuevo = { ...actual, [idProducto]: (actual[idProducto] || 0) + cantidad };
        localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevo));
        return nuevo;
      });
    },
    []
  );

  const quitarDelCarrito = useCallback((idProducto) => {
    setCarrito((actual) => {
      const nuevo = { ...actual };
      delete nuevo[idProducto];
      localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevo));
      return nuevo;
    });
  }, []);

  const cambiarCantidadCarrito = useCallback((idProducto, delta) => {
    setCarrito((actual) => {
      const nuevo = { ...actual };
      const nuevaCantidad = (nuevo[idProducto] || 0) + delta;
      if (nuevaCantidad <= 0) delete nuevo[idProducto];
      else nuevo[idProducto] = nuevaCantidad;
      localStorage.setItem(CARRITO_KEY, JSON.stringify(nuevo));
      return nuevo;
    });
  }, []);

  const vaciarCarrito = useCallback(() => {
    // Se guarda un objeto vacío (no se borra la llave) para que la
    // próxima visita no lo confunda con "primera visita" y lo vuelva a
    // sembrar con el carrito de ejemplo.
    persistir({});
  }, [persistir]);

  const totalArticulos = useMemo(
    () => Object.values(carrito).reduce((suma, cantidad) => suma + cantidad, 0),
    [carrito]
  );

  const subtotal = useMemo(
    () =>
      Object.entries(carrito).reduce((suma, [id, cantidad]) => {
        const producto = obtenerProducto(id);
        return suma + (producto ? producto.precio * cantidad : 0);
      }, 0),
    [carrito]
  );

  const value = useMemo(
    () => ({
      carrito,
      agregarAlCarrito,
      quitarDelCarrito,
      cambiarCantidadCarrito,
      vaciarCarrito,
      totalArticulos,
      subtotal,
    }),
    [carrito, agregarAlCarrito, quitarDelCarrito, cambiarCantidadCarrito, vaciarCarrito, totalArticulos, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>');
  return ctx;
}
