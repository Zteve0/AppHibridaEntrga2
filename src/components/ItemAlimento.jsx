import { Link } from 'react-router-dom';
import { diasRestantes, formatear, estadoVencimiento } from '../utils/fechas.js';

export default function ItemAlimento({ a, conFecha }) {
  const e = estadoVencimiento(diasRestantes(a.fechaVencimiento));
  const meta = a.cantidad + ' ' + a.unidad + (conFecha && a.fechaVencimiento ? ' - vence ' + formatear(a.fechaVencimiento) : '');
  return (
    <Link to={'/alimento/' + a.id} className='item' aria-label={a.nombre + ', ' + e.txt}>
      <div className='item__info'>
        <span className='item__nombre'>{a.nombre}</span>
        <span className='item__meta'>{meta}</span>
      </div>
      <span className={'badge badge--' + e.tipo}>{e.txt}</span>
    </Link>
  );
}
