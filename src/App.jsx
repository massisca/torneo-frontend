import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from './styles/style.module.css';
import banner from './assets/banner.jpg';
import background from './assets/background.jpg';
import LoginModal from './components/LoginModal';
import TorneiAttivi from './components/TorneiAttivi';
import Parametri from './pages/Parametri';


function Home() {
  return (
    <>
      <h2>Benvenuto nel gestionale tornei</h2>
       {/* <TorneiAttivi /> */}
    </>
  );
}

function Storico() {
  return <h2>Storico Tornei</h2>;
}

function Iscrizioni() {
  return <h2>Iscrizioni</h2>;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const ruolo = localStorage.getItem('cod_ruolo');
  const nomeUtente = localStorage.getItem('nome_utente');

  return (
    <div className={styles.body} style={{ backgroundImage: `url(${background})` }}>
      <div className={styles.bodyOverlay}></div>

      <header className={styles.intestazione}>
  <img src={banner} alt="Banner Rugby" className={styles.bannerImg} />
  <h1 className={styles.titolo}>Gestionale Tornei</h1>
  {ruolo && <p className={styles.benvenuto}>Benvenuto {nomeUtente}</p>}
</header>

<nav>
  <ul className={styles.menuUl}>
    <li className={styles.menuLi}><Link to="/" className={styles.menuLink}>Home</Link></li>
    <li className={styles.menuLi}><Link to="/storico" className={styles.menuLink}>Storico Tornei</Link></li>
    <li className={styles.menuLi}><Link to="/attivi" className={styles.menuLink}>Tornei in Corso</Link></li>
    <li className={styles.menuLi}><Link to="/iscrizioni" className={styles.menuLink}>Iscrizioni</Link></li>

    {(ruolo === 'ADM' || ruolo === 'GES' || ruolo === 'SQA') && (
      <li className={styles.menuLi}><Link to="/squadra" className={styles.menuLink}>Gestione Squadra</Link></li>
    )}
    {(ruolo === 'ADM' || ruolo === 'GES') && (
      <li className={styles.menuLi}><Link to="/torneo" className={styles.menuLink}>Gestione Torneo</Link></li>
    )}
    {ruolo === 'ADM' && (
      <>
        <li className={styles.menuLi}><Link to="/parametri" className={styles.menuLink}>Gestione Parametri</Link></li>
        <li className={styles.menuLi}><Link to="/utenti" className={styles.menuLink}>Gestione Utenti</Link></li>
      </>
    )}

    {!ruolo ? (
      <li className={styles.menuLi}>
        <button onClick={() => setShowLogin(true)} className={styles.menuLink}>LOGIN</button>
      </li>
    ) : (
      <li className={styles.menuLi}>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className={styles.menuLink}
        >
          LOGOUT
        </button>
      </li>
    )}
  </ul>
</nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/storico" element={<Storico />} />
          <Route path="/attivi" element={<TorneiAttivi />} />
          <Route path="/iscrizioni" element={<Iscrizioni />} />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/recupero" element={<Recupero />} />
          <Route path="/parametri" element={<Parametri />} /> 
        </Routes>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 gestionale tornei. Tutti i diritti riservati.</p>
      </footer>

      <LoginModal visible={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}
function Registrazione() {
  return <h2>Pagina registrazione in costruzione...</h2>;
}

function Recupero() {
  return <h2>Recupero password in costruzione...</h2>;
}





export default App;
