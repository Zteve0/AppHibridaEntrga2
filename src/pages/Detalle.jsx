import { useEffect } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { diasRestantes, formatear, estadoVencimiento } from '../utils/fechas.js';
import { IconoVolver } from '../components/Iconos.jsx';

export default function Detalle() {
  const { id } = useParams();
  const { alimentos, eliminarAlimento } = useApp();
  const nav = useNavigate();
  const a = alimentos.find(x => x.id === id);
  useEffect(() => {
    if (a) document.title = a.nombre + ' — MiNevera';
    return () => { document.title = 'MiNevera — Tu despensa organizada'; };
  }, [a]);
  if (!a) return <Navigate to='/alimentos' replace />;
  const d = diasRestantes(a.fechaVencimiento);
  const e = estadoVencimiento(d);
  const diasTxt = !isFinite(d) ? 'Sin fecha de vencimiento' : d < 0 ? 'Vencido hace ' + -d + (d === -1 ? ' dia' : ' dias') : d === 0 ? 'Vence hoy' : d === 1 ? 'Mañana' : d + ' dias';
  const eliminar = () => {
    if (confirm('Eliminar "' + a.nombre + '" de tu despensa?')) { eliminarAlimento(id); nav('/alimentos'); }
  };
  return (
    <main className='page'>
      <button className='volver' onClick={() => nav(-1)}><IconoVolver size={16} />Volver</button>
      <div className='detalle__cab'>
        <h2>{a.nombre}</h2>
        <span className={'badge badge--' + e.tipo}>{e.txt}</span>
      </div>
      <dl className='detalle'>
        <div><dt>Categoria</dt><dd>{a.categoria}</dd></div>
        <div><dt>Cantidad</dt><dd>{a.cantidad + ' ' + a.unidad}</dd></div>
        <div><dt>Vencimiento</dt><dd>{formatear(a.fechaVencimiento)}</dd></div>
        <div><dt>Dias restantes</dt><dd>{diasTxt}</dd></div>
      </dl>
      {a.nota && <p className='nota'><strong>Nota:</strong> {a.nota}</p>}
      <div className='detalle__acciones'>
        <button className='btn btn--borde' onClick={() => nav('/editar/' + id)}>Editar</button>
        <button className='btn btn--peligro' onClick={eliminar}>Eliminar</button>
      </div>
    </main>
  );
}
