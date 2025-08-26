// torneo-frontend/src/Layout.tsx

import { Outlet } from 'react-router-dom';
import Menu from './Menu';

const Layout = () => {
  return (
    <>
      <Menu />
      {/* Qui viene renderizzato il contenuto della pagina selezionata */}
      <Outlet />
    </>
  );
};

export default Layout;

