import { Package, Home, Beef, Leaf, ChefHat, Car } from 'lucide-react';

/* Igual que PRODUCTOS: para agregar una categoría nueva solo se agrega un
   objeto aquí. Los iconos ahora usan lucide-react (igual que JAN) en vez
   de SVGs escritos a mano.

   "nombre" debe coincidir exactamente con el campo "categoria" de cada
   producto en productos.js para que el filtro de la página de Inicio
   funcione. */
export const CATEGORIAS = [
  { nombre: 'Despensa', icono: Package },
  { nombre: 'Hogar', icono: Home },
  { nombre: 'Carnes', icono: Beef },
  { nombre: 'Jardín', icono: Leaf },
  { nombre: 'Cocina', icono: ChefHat },
  { nombre: 'Autos', icono: Car },
];
