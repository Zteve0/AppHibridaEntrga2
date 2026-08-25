import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { diasRestantes, DIAS_ALERTA } from '../utils/fechas.js';
import ItemAlimento from '../components/ItemAlimento.jsx';
import { IconoMas, IconoLista, IconoCarrito, IconoReloj, IconoNevera } from '../components/Iconos.jsx';

export default function Inicio() {
  const { alimentos } = useApp();
  const conDias = alimentos.map(a => ({ ...a, d: diasRestantes(a.fechaVencimiento) }));
  const top3 = [...conDias].sort((x, y) => x.d - y.d).slice(0, 3);
  const porVencer = conDias.filter(a => a.d >= 0 && a.d <= DIAS_ALERTA).length;
  const categorias = new Set(alimentos.map(a => a.categoria)).size;
  return (
    <main className='page'>
      <h3 className='grupo'>Resumen</h3>
      <div className='stats'>
        <div className='stats__card'><span className='stats__icono'><IconoLista size={14} /></span><strong>{alimentos.length}</strong><span>Productos</span></div>
        <div className='stats__card'><span className='stats__icono stats__icono--gris'><IconoNevera size={14} /></span><strong>{categorias}</strong><span>Categorías</span></div>
        <div className='stats__card'><span className='stats__icono stats__icono--ambar'><IconoReloj size={14} /></span><strong className='stats__num--ambar'>{porVencer}</strong><span>Por vencer</span></div>
      </div>
      <div className='seccion'>
        <h2>Proximos a vencer</h2>
        <Link to='/vencer' className='seccion__link'>Ver todos →</Link>
      </div>
      <div className='lista'>
        {top3.map(a => <ItemAlimento key={a.id} a={a} />)}
        {top3.length === 0 && <p className='vacio'>Sin alimentos registrados</p>}
      </div>
      <div className='seccion'><h2>Accesos rapidos</h2></div>
      <div className='quick'>
        <Link to='/agregar' className='quick__btn quick__btn--verde'><IconoMas size={18} />Agregar alimento</Link>
        <Link to='/alimentos' className='quick__btn'><IconoLista size={18} />Mis alimentos</Link>
        <Link to='/compras' className='quick__btn'><IconoCarrito size={18} />Lista de compras</Link>
        <Link to='/vencer' className='quick__btn'><IconoReloj size={18} />Por vencer</Link>
      </div>
    </main>
  );
}
