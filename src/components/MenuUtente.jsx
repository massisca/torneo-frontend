import { useState } from 'react';
import styles from "../styles/style.module.css";

function MenuUtente({ onLoginClick }) {
  const [ruolo, setRuolo] = useState(localStorage.getItem('cod_ruolo'));
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    localStorage.removeItem('cod_ruolo');
    window.location.href = '/';
  };

  return (
    <ul className={styles.menuUl}>
      <li className={styles.menuLi}><a className={styles.menuLink} href="/">Home</a></li>
      <li className={styles.menuLi}><a className={styles.menuLink} href="/tornei">Tornei</a></li>
      <li className={styles.menuLi}><a className={styles.menuLink} href="/iscrizioni">Iscrizioni</a></li>

      {(ruolo === 'ADM' || ruolo === 'GES' || ruolo === 'SQA') && (
        <li className={styles.menuLi}>
          <a className={styles.menuLink} href="/gestione-squadra">Gestione Squadra</a>
        </li>
      )}
      {(ruolo === 'ADM' || ruolo === 'GES') && (
        <li className={styles.menuLi}>
          <a className={styles.menuLink} href="/gestione-torneo">Gestione Torneo</a>
        </li>
      )}
      {ruolo === 'ADM' && (
        <li className={styles.menuLi}>
          <a className={styles.menuLink} href="/parametri">Parametri</a>
        </li>
      )}
      <li className={styles.menuLi}>
        {ruolo ? (
          <a className={styles.menuLink} href="#" onClick={handleLogout}>Logout</a>
        ) : (
          <a className={styles.menuLink} href="#" onClick={onLoginClick}>Login</a>
        )}
      </li>
    </ul>
  );
}

export default MenuUtente;
