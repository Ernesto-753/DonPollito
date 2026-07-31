import { Button } from './ui/button';
import { CATEGORIAS } from '../data/categorias';

export default function CategoryFilter({ activa, onCambiar }) {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
      <Button
        variant={activa === 'Todas' ? 'default' : 'outline'}
        size="sm"
        className="rounded-full shrink-0"
        onClick={() => onCambiar('Todas')}
      >
        Todas
      </Button>
      {CATEGORIAS.map(({ nombre, icono: Icono }) => (
        <Button
          key={nombre}
          variant={activa === nombre ? 'default' : 'outline'}
          size="sm"
          className="rounded-full shrink-0"
          onClick={() => onCambiar(nombre)}
        >
          <Icono className="size-4" />
          {nombre}
        </Button>
      ))}
    </div>
  );
}
