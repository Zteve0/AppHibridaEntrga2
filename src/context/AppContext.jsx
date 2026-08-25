import { createContext, useContext, useEffect, useState } from 'react';
import { seedAlimentos, seedCompras } from '../data/seed.js';

const K_A = 'minevera_alimentos';
const K_C = 'minevera_compras';
const uid = () => Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);

function leer(key, seed) {
  try { const v = JSON.parse(localStorage.getItem(key)); if (Array.isArray(v)) return v; } catch (e) { /* datos corruptos: se re-siembra */ }
  return seed;
}

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [alimentos, setAlimentos] = useState(() => leer(K_A, seedAlimentos()));
  const [compras, setCompras] = useState(() => leer(K_C, seedCompras()));

  // persistencia local: la app no requiere internet
  useEffect(() => { localStorage.setItem(K_A, JSON.stringify(alimentos)); }, [alimentos]);
  useEffect(() => { localStorage.setItem(K_C, JSON.stringify(compras)); }, [compras]);

  const api = {
    alimentos, compras,
    agregarAlimento: (d) => { const id = uid(); setAlimentos(a => [...a, { id, ...d }].sort((x, y) => x.nombre.localeCompare(y.nombre))); return id; },
    editarAlimento: (id, d) => setAlimentos(a => a.map(x => (x.id === id ? { ...x, ...d } : x)).sort((x, y) => x.nombre.localeCompare(y.nombre))),
    eliminarAlimento: (id) => setAlimentos(a => a.filter(x => x.id !== id)),
    agregarCompra: (d) => setCompras(c => [...c, { id: uid(), comprado: false, ...d }]),
    toggleCompra: (id) => setCompras(c => c.map(x => (x.id === id ? { ...x, comprado: !x.comprado } : x))),
    limpiarComprados: () => setCompras(c => c.filter(x => !x.comprado))
  };
  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useApp = () => useContext(Ctx);
