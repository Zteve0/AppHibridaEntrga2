import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import NavBar from './components/NavBar.jsx';
import TabBar from './components/TabBar.jsx';
import Inicio from './pages/Inicio.jsx';
import Alimentos from './pages/Alimentos.jsx';
import Agregar from './pages/Agregar.jsx';
import Detalle from './pages/Detalle.jsx';
import Vencer from './pages/Vencer.jsx';
import Compras from './pages/Compras.jsx';
import Creditos from './pages/Creditos.jsx';

// HashRouter: la navegacion funciona offline e incluso abriendo dist/index.html directo
export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className='app'>
          <NavBar />
          <Routes>
            <Route path='/' element={<Inicio />} />
            <Route path='/alimentos' element={<Alimentos />} />
            <Route path='/agregar' element={<Agregar />} />
            <Route path='/editar/:id' element={<Agregar />} />
            <Route path='/alimento/:id' element={<Detalle />} />
            <Route path='/vencer' element={<Vencer />} />
            <Route path='/compras' element={<Compras />} />
            <Route path='/creditos' element={<Creditos />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
          <TabBar />
        </div>
      </HashRouter>
    </AppProvider>
  );
}
