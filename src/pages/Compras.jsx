import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { UNIDADES } from '../utils/fechas.js';
import { IconoCheck } from '../components/Iconos.jsx';

export default function Compras() {
  const { compras, agregarCompra, toggleCompra, limpiarComprados } = useApp();
  const [f, setF] = useState({ nombre: '', cantidad: '', unidad: 'un' });
  const pendientes = compras.filter(c => !c.comprado);
  const comprados = compras.filter(c => c.comprado);
  const agregar = (e) => {
    e.preventDefault();
    if (!f.nombre.trim()) { alert('Escribe el nombre del item.'); return; }
    agregarCompra({ nombre: f.nombre.trim(), cantidad: Number(f.cantidad) > 0 ? Number(f.cantidad) : 1, unidad: f.unidad });
    setF({ nombre: '', cantidad: '', unidad: 'un' });
  };
  return (
    <main className='page'>
      <form className='compras__form' onSubmit={agregar}>
        <input placeholder='Nuevo item...' value={f.nombre} onChange={e => setF({ ...f, nombre: e.target.value })} />
        <input type='number' min='0' step='any' placeholder='Cant.' value={f.cantidad} onChange={e => setF({ ...f, cantidad: e.target.value })} />
        <select value={f.unidad} onChange={e => setF({ ...f, unidad: e.target.value })}>{UNIDADES.map(u => <option key={u}>{u}</option>)}</select>
        <button type='submit' aria-label='Agregar item'>+</button>
      </form>
      <h3 className='grupo'>Pendientes ({pendientes.length})</h3>
      <div className='lista'>
        {pendientes.map(c => (
          <div key={c.id} className='compra'>
            <button className='compra__check' aria-label='Marcar comprado' onClick={() => toggleCompra(c.id)}></button>
            <div className='item__info'><span className='item__nombre'>{c.nombre}</span><span className='item__meta'>{c.cantidad + ' ' + c.unidad}</span></div>
          </div>
        ))}
        {pendientes.length === 0 && <p className='vacio'>No hay items pendientes</p>}
      </div>
      <h3 className='grupo'>Comprados ({comprados.length})</h3>
      <div className='lista'>
        {comprados.map(c => (
          <div key={c.id} className='compra compra--hecha'>
            <button className='compra__check compra__check--on' aria-label='Desmarcar' onClick={() => toggleCompra(c.id)}><IconoCheck size={12} /></button>
            <div className='item__info'><span className='item__nombre'>{c.nombre}</span><span className='item__meta'>{c.cantidad + ' ' + c.unidad}</span></div>
          </div>
        ))}
      </div>
      {comprados.length > 0 && <button className='btn btn--peligro' onClick={() => confirm('¿Eliminar los ' + comprados.length + ' items comprados?') && limpiarComprados()}>Eliminar comprados</button>}
    </main>
  );
}
