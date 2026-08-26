import { useApp } from '../context/AppContext.jsx';
import { diasRestantes } from '../utils/fechas.js';
import ItemAlimento from '../components/ItemAlimento.jsx';

export default function Vencer() {
  const { alimentos } = useApp();
  const orden = [...alimentos].sort((x, y) => diasRestantes(x.fechaVencimiento) - diasRestantes(y.fechaVencimiento));
  const vencidos = orden.filter(a => diasRestantes(a.fechaVencimiento) < 0);
  const vigentes = orden.filter(a => { const d = diasRestantes(a.fechaVencimiento); return d >= 0 && isFinite(d); });
  const sinFecha = orden.filter(a => !a.fechaVencimiento);
  return (
    <main className='page'>
      <p className='ayuda'>Ordenado por urgencia: lo que vence primero aparece de primero.</p>
      {vencidos.length > 0 && <>
        <h3 className='grupo'>Vencidos ({vencidos.length})</h3>
        <div className='lista'>{vencidos.map(a => <ItemAlimento key={a.id} a={a} conFecha />)}</div>
      </>}
      <h3 className='grupo'>Próximos ({vigentes.length})</h3>
      <div className='lista'>
        {vigentes.map(a => <ItemAlimento key={a.id} a={a} conFecha />)}
        {orden.length === 0 && <p className='vacio'>Tu despensa está vacía. Agrega alimentos con el botón +.</p>}
      </div>
      {sinFecha.length > 0 && <>
        <h3 className='grupo'>Sin fecha de vencimiento ({sinFecha.length})</h3>
        <div className='lista'>{sinFecha.map(a => <ItemAlimento key={a.id} a={a} />)}</div>
      </>}
    </main>
  );
}
