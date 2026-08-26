import { Link, useLocation } from 'react-router-dom';
import { IconoNevera, IconoInfo } from './Iconos.jsx';
import { useApp } from '../context/AppContext.jsx';
import { diasRestantes, DIAS_ALERTA } from '../utils/fechas.js';

const titulos = [
  ['/alimento', 'Detalle'],
  ['/editar', 'Editar alimento'],
  ['/alimentos', 'Mis alimentos'],
  ['/agregar', 'Agregar'],
  ['/vencer', 'Proximos a vencer'],
  ['/compras', 'Lista de compras'],
  ['/creditos', 'Créditos']
];

export default function NavBar() {
  const { pathname } = useLocation();
  const { alimentos } = useApp();
  const actual = titulos.find(t => pathname.startsWith(t[0]));
  const porVencer = alimentos.filter(a => { const d = diasRestantes(a.fechaVencimiento); return d >= 0 && d <= DIAS_ALERTA; }).length;
  return (
    <header className='navbar'>
      <div className='navbar__logo'><IconoNevera size={20} /></div>
      <span className='navbar__nombre'>MiNevera</span>
      {porVencer > 0 && <span className='navbar__alerta'>{porVencer} por vencer</span>}
      <span className='navbar__pagina'>{actual ? actual[1] : 'Inicio'}</span>
      <Link to='/creditos' className='navbar__info' aria-label='Créditos' title='Créditos'><IconoInfo size={16} /></Link>
    </header>
  );
}
