export const CATEGORIAS = ['Lacteos', 'Carnes', 'Verduras', 'Frutas', 'Cereales', 'Panaderia', 'Bebidas', 'Condimentos', 'Congelados', 'Otros'];
export const UNIDADES = ['kg', 'L', 'un'];
export const DIAS_ALERTA = 3;

export function diasRestantes(fecha) {
  if (!fecha) return Infinity;
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const f = new Date(fecha + 'T00:00:00');
  return Math.round((f - hoy) / 864e5);
}

export function formatear(fecha) {
  if (!fecha) return 'Sin fecha';
  const p = fecha.split('-');
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : fecha;
}

export function estadoVencimiento(d) {
  if (!isFinite(d)) return { txt: 'Sin fecha', tipo: 'sinfecha' };
  if (d < 0) return { txt: 'Vencido', tipo: 'vencido' };
  const txt = d === 0 ? 'Hoy' : d === 1 ? 'Mañana' : d + ' días';
  return { txt, tipo: d <= DIAS_ALERTA ? 'pronto' : 'ok' };
}
