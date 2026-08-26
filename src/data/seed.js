function off(d) { const t = new Date(); t.setDate(t.getDate() + d); return t.toISOString().slice(0, 10); }

export function seedAlimentos() {
  return [
    { id: 'a1', nombre: 'Leche entera', categoria: 'Lacteos', cantidad: 1, unidad: 'L', fechaVencimiento: off(1), nota: '' },
    { id: 'a2', nombre: 'Yogurt natural', categoria: 'Lacteos', cantidad: 2, unidad: 'un', fechaVencimiento: off(3), nota: '' },
    { id: 'a3', nombre: 'Pechuga de pollo', categoria: 'Carnes', cantidad: 0.7, unidad: 'kg', fechaVencimiento: off(-1), nota: 'Revisar antes de usar' },
    { id: 'a4', nombre: 'Queso fresco', categoria: 'Lacteos', cantidad: 0.3, unidad: 'kg', fechaVencimiento: off(-5), nota: '' },
    { id: 'a5', nombre: 'Tomate chonto', categoria: 'Verduras', cantidad: 1, unidad: 'kg', fechaVencimiento: off(6), nota: '' },
    { id: 'a6', nombre: 'Manzana verde', categoria: 'Frutas', cantidad: 8, unidad: 'un', fechaVencimiento: off(12), nota: '' },
    { id: 'a7', nombre: 'Arroz blanco', categoria: 'Cereales', cantidad: 5, unidad: 'kg', fechaVencimiento: off(90), nota: 'Bolsa grande' },
    { id: 'a9', nombre: 'Jugo de naranja', categoria: 'Bebidas', cantidad: 1.5, unidad: 'L', fechaVencimiento: off(5), nota: '' },
    { id: 'a10', nombre: 'Pan tajado', categoria: 'Panaderia', cantidad: 1, unidad: 'un', fechaVencimiento: off(4), nota: '' }
  ];
}

export function seedCompras() {
  return [
    { id: 'c1', nombre: 'Huevos', cantidad: 12, unidad: 'un', comprado: false },
    { id: 'c2', nombre: 'Arroz', cantidad: 2, unidad: 'kg', comprado: false },
    { id: 'c3', nombre: 'Aceite', cantidad: 1, unidad: 'L', comprado: false },
    { id: 'c4', nombre: 'Pan', cantidad: 1, unidad: 'un', comprado: true }
  ];
}
