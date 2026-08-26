import { useNavigate } from 'react-router-dom';
import { EQUIPO, STACK } from '../data/equipo.js';
import { IconoVolver, IconoNevera } from '../components/Iconos.jsx';

export default function Creditos() {
  const nav = useNavigate();
  return (
    <main className='page'>
      <button className='volver' onClick={() => nav(-1)}><IconoVolver size={16} />Atras</button>
      <div className='creditos__cab'>
        <span className='creditos__logo'><IconoNevera size={24} /></span>
        <div>
          <strong>MiNevera</strong>
          <span>Version 1.0 · Funciona sin conexion</span>
        </div>
      </div>
      <h3 className='grupo'>Equipo de desarrollo</h3>
      <div className='lista'>
        {EQUIPO.map(p => (
          <div key={p.id} className='credito'>
            <span className='credito__num'>{p.id}</span>
            <div className='credito__info'>
              <strong>{p.nombre}</strong>
              <span className='credito__rol'>{p.rol}</span>
              <span className='credito__detalle'>{p.detalle}</span>
            </div>
          </div>
        ))}
      </div>
      <h3 className='grupo'>Construida con</h3>
      <dl className='detalle'>
        {STACK.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>
      <p className='creditos__nota'>Proyecto academico de Aplicaciones Moviles · Medellin, 2026. Tus datos se guardan solo en este dispositivo: la app no envia informacion a internet.</p>
    </main>
  );
}
