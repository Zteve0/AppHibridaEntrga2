import { useLocation } from 'react-router-dom';
import { IconoNevera } from './Iconos.jsx';

const titulos = [
  ['/alimento', 'Detalle'],
  ['/editar', 'Editar alimento'],
  ['/alimentos', 'Mis alimentos'],
  ['/agregar', 'Agregar'],
  ['/vencer', 'Proximos a vencer'],
  ['/compras', 'Lista de compras']
];

export default function NavBar() {
  const { pathname } = useLocation();
  const actual = titulos.find(t => pathname.startsWith(t[0]));
  return (
    <header className='navbar'>
      <div className='navbar__logo'><IconoNevera size={20} /></div>
      <span className='navbar__nombre'>MiNevera</span>
      <span className='navbar__pagina'>{actual ? actual[1] : 'Inicio'}</span>
    </header>
  );
}
