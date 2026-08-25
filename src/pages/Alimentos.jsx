import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORIAS } from '../utils/fechas.js';
import ItemAlimento from '../components/ItemAlimento.jsx';

export default function Alimentos() {
  const { alimentos } = useApp();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Todos');
  const activas = CATEGORIAS.filter(c => alimentos.some(a => a.categoria === c));
  const filtrados = alimentos.filter(a =>
    (!q.trim() || a.nombre.toLowerCase().includes(q.trim().toLowerCase())) &&
    (cat === 'Todos' || a.categoria === cat)
  );
  const grupos = activas
    .map(c => ({ c, items: filtrados.filter(a => a.categoria === c) }))
    .filter(g => g.items.length > 0);
  return (
    <main className='page'>
      <input className='buscador' placeholder='Buscar alimento...' value={q} onChange={e => setQ(e.target.value)} />
      <div className='chips'>
        {['Todos', ...activas].map(c => (
          <button key={c} className={'chips__chip' + (cat === c ? ' active' : '')} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      {grupos.map(g => (
        <section key={g.c}>
          <h3 className='grupo'>{g.c}</h3>
          <div className='lista'>{g.items.map(a => <ItemAlimento key={a.id} a={a} conFecha />)}</div>
        </section>
      ))}
      {grupos.length === 0 && <p className='vacio'>No se encontraron alimentos. Agrega uno con el boton +.</p>}
    </main>
  );
}
