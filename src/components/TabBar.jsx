import { NavLink, Link } from 'react-router-dom';
import { IconoInicio, IconoLista, IconoMas, IconoReloj, IconoCarrito } from './Iconos.jsx';

export default function TabBar() {
  const cls = ({ isActive }) => 'tabbar__item' + (isActive ? ' active' : '');
  return (
    <nav className='tabbar'>
      <NavLink to='/' end className={cls}><IconoInicio /><span>Inicio</span></NavLink>
      <NavLink to='/alimentos' className={cls}><IconoLista /><span>Alimentos</span></NavLink>
      <div className='tabbar__fab'>
        <Link to='/agregar' aria-label='Agregar alimento'><IconoMas size={24} /></Link>
      </div>
      <NavLink to='/vencer' className={cls}><IconoReloj /><span>Vencer</span></NavLink>
      <NavLink to='/compras' className={cls}><IconoCarrito /><span>Compras</span></NavLink>
    </nav>
  );
}
