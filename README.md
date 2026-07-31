# Don Pollito — versión React

App de React construida con [Vite](https://vite.dev), [React Router](https://reactrouter.com)
y Tailwind CSS v4. El diseño (navegación arriba, tarjetas redondeadas, filtro de
categorías, carrusel, etc.) sigue la sintaxis y estructura de componentes del
proyecto **JAN** (Next.js + shadcn/ui + lucide-react), pero con la paleta de
colores propia de Don Pollito — JAN no se tocó, solo se usó como referencia.

## Requisitos

- Node.js 18 o superior
- npm (viene con Node)

## Cómo correrlo

```bash
npm install
npm run dev
```

Esto abre el proyecto en `http://localhost:5173`. Cualquier cambio en `src/` se
recarga solo (hot reload).

Para generar la versión de producción (los archivos que subirías a un hosting):

```bash
npm run build
```

Esto crea la carpeta `dist/` con el sitio ya compilado. Puedes previsualizarla con
`npm run preview`.

## Estructura

```
src/
  lib/
    utils.js               cn() — helper de clases (clsx + tailwind-merge), igual que JAN
  data/
    productos.js            Catálogo de productos, ahora con campo "categoria"
    categorias.jsx            Categorías (iconos de lucide-react)
  context/
    CartContext.jsx           Carrito de compra (localStorage), igual que antes
    ToastContext.jsx           Mensajes/alertas del sistema (verde hoja)
  components/
    ui/                        Button, Badge, Card, Input, Carousel — mini "design
                                system" al estilo shadcn/ui de JAN, con los colores
                                de Don Pollito
    Layout.jsx                 Banner + header con menú arriba (ya no hay barra
                                lateral) + footer
    SearchBar.jsx               Buscador funcional con sugerencias en vivo
    CategoryFilter.jsx          Píldoras de categoría (patrón tomado de
                                POSView.tsx de JAN) — filtra la grilla de Inicio
    HeroCarousel.jsx             Carrusel de banners (embla-carousel-react, igual
                                que el carousel.tsx de JAN)
    PromocionesFlash.jsx         Sección de ofertas relámpago con cuenta regresiva
    TarjetaProducto.jsx          Tarjeta de producto con botón "Añadir al Carrito"
  pages/
    Inicio.jsx                   /              (carrusel + categorías + grid + flash)
    Categorias.jsx                /categorias
    Ofertas.jsx                    /ofertas       (ahora muestra Promociones Flash)
    Recomendaciones.jsx            /recomendaciones
    Carrito.jsx                     /carrito
    Pago.jsx                         /pago
    Exito.jsx                         /exito
    ProductoDetalle.jsx               /producto/:id  (ej. /producto/leche)
    Buscar.jsx                         /buscar?q=...
```

## Paleta de colores (la misma en todo el sitio)

| Color | Hex | Uso |
|---|---|---|
| Guinda (maroon) | `#611232` | Encabezado, pie de página, íconos principales, secciones |
| Vino (tinto) | `#2b0915` | Acentos y transiciones (fondo del carrusel, detalles) |
| Dorado (gold) | `#a57f2c` | Botones y precios — fondo de los botones principales |
| Verde hoja (leaf) | `#13582d` | Mensajes y alertas del sistema (toasts, iconos de éxito) |

Se agregó `gold-dark` (`#8c6c25`, hover de los botones dorados) como único tono
extra, como permitiste.

## Qué cambió respecto a la versión anterior

- **Menú arriba**: la barra lateral se quitó; ahora es un menú horizontal en el
  header, con versión de escritorio y un menú desplegable en móvil (ícono ☰).
- **Categorías sobre la grilla**: en Inicio hay una fila de categorías (Despensa,
  Hogar, Carnes, Jardín, Cocina, Autos) que filtra los productos mostrados al
  hacer clic — igual que el filtro de POSView.tsx en JAN. La página /categorias
  enlaza a cada categoría con `?categoria=...`.
- **Buscador funcional**: input en el header con sugerencias en vivo; Enter o
  clic en "Ver todos los resultados" lleva a `/buscar`.
- **Promociones Flash**: sección con cuenta regresiva y 3 productos con
  descuento de demostración (ver nota abajo).
- **Botón "Añadir al Carrito" en cada tarjeta**: antes solo la página de
  `/producto/leche` (que ni siquiera está en el catálogo) tenía forma de
  agregar algo al carrito. Ahora cualquier tarjeta de producto lo permite.
- **Mensajes del sistema**: al añadir un producto aparece un aviso verde
  (abajo a la derecha) confirmando la acción.
- Se asignó una `categoria` a cada producto del catálogo (según la foto real de
  cada uno) y se marcaron 4 productos como `recomendado: true` para que la
  página de Recomendaciones ya no esté vacía.

## Puntos a tener en cuenta

- **Promociones Flash es una demo**: los descuentos (Cloralex -30%, Boing -20%,
  Zulka -15%) son inventados para mostrar la sección; el carrito sigue cobrando
  el precio normal del catálogo al agregar esos productos. Si quieres que el
  descuento se refleje también en el carrito, lo puedo conectar.
- El carrito de ejemplo (`leche`, `mole`, `azucar`, `cafe`) y la página
  `/producto/leche` siguen usando ids que **no están en el catálogo** (mismo
  estado que el prototipo original) — no se ven con nombre/precio en el
  carrito hasta que agregues `leche` como producto real.
- Ninguna tarjeta de producto enlaza todavía a su propia página de detalle
  (todas las `pagina` siguen en `'#'`), salvo la demo de `/producto/leche`.
- Tres categorías (Carnes, Jardín, Autos) no tienen productos todavía — al
  seleccionarlas se muestra un mensaje de "aún no hay productos", no un error.

Ninguno de estos es un error: son huecos de contenido reales del catálogo
actual. Cuando quieras, seguimos completándolos.
