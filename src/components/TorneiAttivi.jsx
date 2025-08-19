import { useEffect, useState } from 'react';
import styles from "../styles/style.module.css";

function TorneiAttivi() {
  const [tornei, setTornei] = useState([]);
  const [errore, setErrore] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/tornei/tornei-attivi`)
      .then(res => res.json())
      .then(data => setTornei(data))
      .catch(() => setErrore('Errore nel caricamento dei tornei.'));
  }, []);

  if (errore) return <p style={{ color: 'red' }}>{errore}</p>;
  if (tornei.length === 0) return <p>Attualmente non ci sono tornei in corso.</p>;

  return (
    <div className={styles.contenitoreTornei}>
      {tornei.map(torneo => (
        <div
          key={torneo.id}
          className={styles.torneoBox}
          onMouseEnter={e => e.currentTarget.classList.add(styles.torneoBoxHover)}
          onMouseLeave={e => e.currentTarget.classList.remove(styles.torneoBoxHover)}
        >
          <h3>{torneo.nome}</h3>
          <p>Data: {torneo.data}</p>
          <p>Luogo: {torneo.luogo}</p>
        </div>
      ))}
    </div>
  );
}

export default TorneiAttivi;
