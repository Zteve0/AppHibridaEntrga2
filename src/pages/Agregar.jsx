import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { CATEGORIAS, UNIDADES } from '../utils/fechas.js';

export default function Agregar() {
  const { id } = useParams();
  const { alimentos, agregarAlimento, editarAlimento } = useApp();
  const existente = id ? alimentos.find(a => a.id === id) : null;
  const nav = useNavigate();
  const [f, setF] = useState(existente
    ? { nombre: existente.nombre, categoria: existente.categoria, cantidad: String(existente.cantidad), unidad: existente.unidad, fecha: existente.fechaVencimiento, nota: existente.nota || '' }
    : { nombre: '', categoria: '', cantidad: '', unidad: 'un', fecha: '', nota: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const guardar = (e) => {
    e.preventDefault();
    if (!f.nombre.trim() || !f.categoria || !(Number(f.cantidad) > 0) || !f.fecha) {
      alert('Completa nombre, categoria, cantidad y fecha de vencimiento.');
      return;
    }
    const datos = { nombre: f.nombre.trim(), categoria: f.categoria, cantidad: Number(f.cantidad), unidad: f.unidad, fechaVencimiento: f.fecha, nota: f.nota.trim() };
    if (existente) { editarAlimento(id, datos); nav('/alimento/' + id); }
    else { agregarAlimento(datos); nav('/alimentos'); }
  };
  return (
    <main className='page'>
      <form className='form' onSubmit={guardar}>
        <label className='field'><span>Nombre</span>
          <input value={f.nombre} onChange={set('nombre')} placeholder='Ej. Leche entera' /></label>
        <label className='field'><span>Categoria</span>
          <select value={f.categoria} onChange={set('categoria')}>
            <option value=''>Seleccionar categoria</option>
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select></label>
        <div className='form__fila'>
          <label className='field'><span>Cantidad</span>
            <input type='number' min='0' step='any' value={f.cantidad} onChange={set('cantidad')} placeholder='0' /></label>
          <label className='field'><span>Unidad</span>
            <select value={f.unidad} onChange={set('unidad')}>{UNIDADES.map(u => <option key={u}>{u}</option>)}</select></label>
        </div>
        <label className='field'><span>Fecha de vencimiento</span>
          <input type='date' value={f.fecha} onChange={set('fecha')} /></label>
        <label className='field'><span>Nota (opcional)</span>
          <textarea rows='3' value={f.nota} onChange={set('nota')} placeholder='Ej. Abierta el martes'></textarea></label>
        <button type='submit' className='btn btn--primario'>{existente ? 'Guardar cambios' : 'Guardar alimento'}</button>
        <button type='button' className='btn btn--fantasma' onClick={() => nav(-1)}>Cancelar</button>
      </form>
    </main>
  );
}
