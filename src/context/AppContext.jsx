import { createContext, useContext, useEffect, useState } from 'react';
import { seedAlimentos, seedCompras } from '../data/seed.js';
import { leer, guardar } from '../utils/storage.js';

const K_A = 'minevera_alimentos';
const K_C = 'minevera_compras';
const MARCA = 'Agregado desde la lista de compras';
const uid = () => Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [alimentos, setAlimentos] = useState([]);
  const [compras, setCompras] = useState([]);
  const [cargado, setCargado] = useState(false);

  // carga inicial desde el almacenamiento del dispositivo
  useEffect(() => {
    (async () => {
      const a = await leer(K_A);
      const c = await leer(K_C);
      setAlimentos(Array.isArray(a) ? a : seedAlimentos());
      setCompras(Array.isArray(c) ? c : seedCompras());
      setCargado(true);
    })();
  }, []);

  // persistencia: la app no requiere internet
  useEffect(() => { if (cargado) guardar(K_A, alimentos); }, [alimentos, cargado]);
  useEffect(() => { if (cargado) guardar(K_C, compras); }, [compras, cargado]);

  const api = {
    alimentos, compras,
    agregarAlimento: (d) => { const id = uid(); setAlimentos(a => [...a, { id, ...d }].sort((x, y) => x.nombre.localeCompare(y.nombre))); return id; },
    editarAlimento: (id, d) => setAlimentos(a => a.map(x => (x.id === id ? { ...x, ...d } : x)).sort((x, y) => x.nombre.localeCompare(y.nombre))),
    eliminarAlimento: (id) => setAlimentos(a => a.filter(x => x.id !== id)),
    agregarCompra: (d) => setCompras(c => [...c, { id: uid(), comprado: false, ...d }]),
    toggleCompra: (id) => {
      const item = compras.find(x => x.id === id);
      if (item && !item.comprado) {
        // al comprar, entra al inventario sin fecha de vencimiento (editable en el detalle)
        const nuevo = { id: uid(), nombre: item.nombre, categoria: 'Otros', cantidad: item.cantidad, unidad: item.unidad, fechaVencimiento: '', nota: MARCA };
        setAlimentos(a => [...a, nuevo].sort((x, y) => x.nombre.localeCompare(y.nombre)));
      } else if (item && item.comprado) {
        // al desmarcar, se retira el alimento que se habia agregado automaticamente
        setAlimentos(a => {
          const idx = a.findIndex(x => x.nombre === item.nombre && x.nota === MARCA);
          return idx >= 0 ? a.filter((_, i) => i !== idx) : a;
        });
      }
      setCompras(c => c.map(x => (x.id === id ? { ...x, comprado: !x.comprado } : x)));
    },
    limpiarComprados: () => setCompras(c => c.filter(x => !x.comprado))
  };

  if (!cargado) return null;
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
