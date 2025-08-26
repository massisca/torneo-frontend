// torneo-frontend/src/components/LoginModal.jsx

import { useState, useEffect, useRef } from 'react';
import '../styles/LoginModal.css';

function LoginModal({ visible, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errore, setErrore] = useState('');
  const [loading, setLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const emailRef = useRef(null);

  useEffect(() => {
    if (visible && emailRef.current) {
      emailRef.current.focus();
    }
  }, [visible]);

  if (!visible) return null;

  const handleOk = async () => {
    if (!email.includes('@')) {
      setErrore('Email non valida');
      return;
    }

    setLoading(true);
    setErrore('');

    try {
      const res = await fetch(`${apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem('cod_ruolo', data.cod_ruolo);
        sessionStorage.setItem('nome_utente', data.nome);
        onClose();
        window.location.reload();
      } else {
        setErrore(data.message || 'Credenziali non valide');
      }
    } catch {
      setErrore('Errore di connessione');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal-content"
        role="dialog"
        aria-label="Finestra di login"
      >
        <button className="modal-close" onClick={onClose} aria-label="Chiudi popup">×</button>

        <h2>Accesso al gestionale</h2>
        <p className="modal-subtitle">Inserisci le tue credenziali</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="modal-input"
          required
          ref={emailRef}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="modal-input"
          required
        />

        {errore && (
          <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>
            {errore}
          </p>
        )}

        <button className="modal-button" onClick={handleOk} disabled={loading}>
          {loading ? 'Attendere...' : 'Accedi'}
        </button>

        <button className="modal-link" onClick={() => alert('Gestione recupero password in arrivo')}>
          Non ricordo la password
        </button>
      </div>
    </div>
  );
}

export default LoginModal;
