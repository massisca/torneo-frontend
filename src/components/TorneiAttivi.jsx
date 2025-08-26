// torneo-frontend/src/components/TorneiAttivi.jsx
import { useEffect, useState } from 'react';
import { Text, Loader, Box } from '@mantine/core';
import { Link } from 'react-router-dom';
import styles from '../styles/GestioneParametri.module.css';

function TorneiAttivi() {
  const [tornei, setTornei] = useState([]);
  const [errore, setErrore] = useState('');
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/tornei/tornei-attivi`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTornei(data);
          setErrore('');
        } else if (data.message) {
          setTornei([]);
          setErrore(data.message);
        } else {
          setErrore('Risposta inattesa dal server.');
        }
        setLoading(false);
      })
      .catch(() => {
        setErrore('Errore nel caricamento dei tornei.');
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader color="red" />;
  if (errore) return <Text color="red">{errore}</Text>;

  return (
    <Box>
      <Text size="xl" weight={700} mb="md">Tornei Attivi</Text>

      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>Data Inizio</th>
            <th className={styles.th}>Luogo</th>
            <th className={styles.th}>Stato</th>
          </tr>
        </thead>
        <tbody>
          {tornei.map(torneo => (
            <tr key={torneo.id_torneo}>
              <td className={styles.td}>
                <Link to={`/torneo/${torneo.id_torneo}`} className={styles.link}>
                  {torneo.nome}
                </Link>
              </td>
              <td className={styles.td}>
                {torneo.data_inizio ? new Date(torneo.data_inizio).toLocaleDateString('it-IT') : '—'}
              </td>
              <td className={styles.td}>{torneo.luogo}</td>
              <td className={styles.td}>{torneo.stato}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default TorneiAttivi;
