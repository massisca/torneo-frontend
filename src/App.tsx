// torneo-frontend/src/App.tsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Menu from './Menu';
import Home from './pages/Home';
import Storico from './pages/Storico';
import Iscrizioni from './pages/Iscrizioni';
import Contatti from './pages/Contatti';
import GestioneSquadra from './pages/GestioneSquadra';
import GestioneTorneo from './pages/GestioneTorneo';
import Parametri from './pages/Parametri';
import Utenti from './pages/Utenti';
import Torneo from './pages/Torneo';
 

            

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Pagina di default */}
          <Route index element={<Home />} />

          {/* Altre pagine */}
         
          <Route path="storico" element={<Storico />} />
          <Route path="iscrizioni" element={<Iscrizioni />} />
          <Route path="contatti" element={<Contatti />} />
          <Route path="gestione-squadra" element={<GestioneSquadra />} />
          <Route path="gestione-torneo" element={<GestioneTorneo />} />
          <Route path="parametri" element={<Parametri />} />
          <Route path="utenti" element={<Utenti />} />
          <Route path="/torneo/:id_torneo" element={<Torneo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
