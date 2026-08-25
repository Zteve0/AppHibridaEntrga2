const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ size = 21, children }) => (<svg width={size} height={size} viewBox='0 0 24 24' {...base}>{children}</svg>);

export const IconoNevera = (p) => (<Svg {...p}><rect x='5' y='2' width='14' height='20' rx='2' /><line x1='5' y1='10' x2='19' y2='10' /><line x1='9' y1='5' x2='9' y2='7' /><line x1='9' y1='13' x2='9' y2='16' /></Svg>);
export const IconoInicio = (p) => (<Svg {...p}><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' /><polyline points='9 22 9 12 15 12 15 22' /></Svg>);
export const IconoLista = (p) => (<Svg {...p}><line x1='8' y1='6' x2='21' y2='6' /><line x1='8' y1='12' x2='21' y2='12' /><line x1='8' y1='18' x2='21' y2='18' /><line x1='3' y1='6' x2='3.01' y2='6' /><line x1='3' y1='12' x2='3.01' y2='12' /><line x1='3' y1='18' x2='3.01' y2='18' /></Svg>);
export const IconoMas = (p) => (<Svg {...p}><line x1='12' y1='5' x2='12' y2='19' /><line x1='5' y1='12' x2='19' y2='12' /></Svg>);
export const IconoReloj = (p) => (<Svg {...p}><circle cx='12' cy='12' r='10' /><polyline points='12 6 12 12 16 14' /></Svg>);
export const IconoCarrito = (p) => (<Svg {...p}><circle cx='9' cy='21' r='1' /><circle cx='20' cy='21' r='1' /><path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' /></Svg>);
export const IconoVolver = (p) => (<Svg {...p}><polyline points='15 18 9 12 15 6' /></Svg>);
export const IconoCheck = (p) => (<Svg {...p}><polyline points='20 6 9 17 4 12' /></Svg>);
