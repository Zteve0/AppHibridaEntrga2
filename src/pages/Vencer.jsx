import { useApp } from '../context/AppContext.jsx';
import { diasRestantes } from '../utils/fechas.js';
import ItemAlimento from '../components/ItemAlimento.jsx';

export default function Vencer() {
  const { alimentos } = useApp();
  const orden = [...alimentos].sort((x, y) => diasRestantes(x.fechaVencimiento) - diasRestantes(y.fechaVencimiento));
  return (
    <main className='page'>
      <p className='ayuda'>Ordenado por urgencia de vencimiento.</p>
      <div className='lista'>
        {orden.map(a => <ItemAlimento key={a.id} a={a} conFecha />)}
        {orden.length === 0 && <p className='vacio'>Tu despensa esta vacia. Agrega alimentos con el boton +.</p>}
      </div>
    </main>
  );
}
