import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/style.module.css";
import popupBg from "../assets/popup-bg.jpg";

function LoginModal({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        console.log("Dati ricevuti dal login:", data);
        localStorage.setItem('cod_ruolo', data.cod_ruolo);
        localStorage.setItem('nome_utente', data.nome);
        onClose();
        window.location.reload();
      } else {
        setErrore(data.message);
      }
    } catch {
      setErrore('Errore di connessione');
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.modal}>
      <div
        className={styles.modalContent}
        style={{ backgroundImage: `url(${popupBg})` }}
      >
        <span className={styles.close} onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
          <button type="submit">Login</button>
          <p style={{ color: 'red' }}>{errore}</p>
        </form>
        <div className={styles.modalLinks}>
           <Link to="/registrazione" className={styles.modalLink} onClick={onClose}>
              Nuovo utente
           </Link>
           <Link to="/recupero" className={styles.modalLink} onClick={onClose}>
             Password dimenticata
           </Link>
</div>

      </div>
    </div>
  );
}

export default LoginModal;
