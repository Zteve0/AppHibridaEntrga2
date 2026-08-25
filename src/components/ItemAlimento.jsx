import { Link } from 'react-router-dom';
import { diasRestantes, formatear, estadoVencimiento } from '../utils/fechas.js';

export default function ItemAlimento({ a, conFecha }) {
  const e = estadoVencimiento(diasRestantes(a.fechaVencimiento));
  return (
    <Link to={'/alimento/' + a.id} className='item'>
      <div className='item__info'>
        <span className='item__nombre'>{a.nombre}</span>
        <span className='item__meta'>{a.cantidad + ' ' + a.unidad + (conFecha ? ' - vence ' + formatear(a.fechaVencimiento) : '')}</span>
      </div>
      <span className={'badge badge--' + e.tipo}>{e.txt}</span>
    </Link>
  );
}
