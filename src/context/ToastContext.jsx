import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext(null);

let idSeq = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((actuales) => actuales.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const show = useCallback(
    (mensaje, { tipo = 'success', duracion = 2600 } = {}) => {
      const id = ++idSeq;
      setToasts((actuales) => [...actuales, { id, mensaje, tipo }]);
      timers.current[id] = setTimeout(() => dismiss(id), duracion);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              'flex items-start gap-3 rounded-2xl px-4 py-3 shadow-lg font-subtitle text-sm font-semibold text-paper toast-enter',
              t.tipo === 'success' ? 'bg-leaf' : 'bg-maroon'
            )}
          >
            {t.tipo === 'success' ? (
              <CheckCircle2 className="size-5 shrink-0 mt-0.5" />
            ) : (
              <Info className="size-5 shrink-0 mt-0.5" />
            )}
            <span className="flex-1">{t.mensaje}</span>
            <button onClick={() => dismiss(t.id)} className="shrink-0 opacity-80 hover:opacity-100">
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
}
