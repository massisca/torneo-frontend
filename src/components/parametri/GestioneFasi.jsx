
// src/components/parametri/GestioneFasi.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/GestioneParametri.module.css';
import { validaFase } from '../../utils/validazioni';

const GestioneFasi = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [fasi, setFasi] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedNomeFase, setEditedNomeFase] = useState('');
  const [editedSequenza, setEditedSequenza] = useState('');
  const [nuovoNomeFase, setNuovoNomeFase] = useState('');
  const [nuovaSequenza, setNuovaSequenza] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/fasi`)
      .then((res) => res.json())
      .then((data) => setFasi(data))
      .catch((err) => console.error('Errore nel recupero delle fasi:', err));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedNomeFase(fasi[index].nome_fase);
    setEditedSequenza(fasi[index].sequenza?.toString() || '');
  };

  const handleSave = (id) => {
    const result = validaFase(editedNomeFase, editedSequenza);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/fasi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome_fase: editedNomeFase,
        sequenza: parseInt(editedSequenza, 10),
      }),
    })
      .then((res) => res.json())
      .then((updatedFase) => {
        const updatedFasi = [...fasi];
        updatedFasi[editingIndex] = updatedFase;
        setFasi(updatedFasi);
        setEditingIndex(null);
      })
      .catch((err) => console.error('Errore nel salvataggio:', err));
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/fasi/${id}`, { method: 'DELETE' })
      .then(() => {
        setFasi(fasi.filter((fase) => fase.id_fase !== id));
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error('Errore nell\'eliminazione:', err));
  };

  const handleInsert = () => {
    const result = validaFase(nuovoNomeFase, nuovaSequenza);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/fasi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome_fase: nuovoNomeFase,
        sequenza: parseInt(nuovaSequenza, 10),
      }),
    })
      .then((res) => res.json())
      .then((newFase) => {
        setFasi([...fasi, newFase]);
        setNuovoNomeFase('');
        setNuovaSequenza('');
      })
      .catch((err) => console.error('Errore inserimento:', err));
  };

  return (
    <div>
      <h2>Gestione Fasi</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Nome Fase</th>
            <th className={styles.th}>Sequenza</th>
            <th className={styles.th}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>—</td>
            <td className={styles.td}>
              <input
                type="text"
                value={nuovoNomeFase}
                onChange={(e) => setNuovoNomeFase(e.target.value)}
              />
            </td>
            <td className={styles.td}>
              <input
                type="text"
                className={`${styles.input} ${styles.noSpinner}`}
                value={nuovaSequenza}
                onChange={(e) => setNuovaSequenza(e.target.value)}
              />
            </td>
            <td className={styles.td}>
              <button className={styles.button} onClick={handleInsert}>➕</button>
            </td>
          </tr>

          {fasi.map((fase, index) => (
            <tr key={fase.id_fase}>
              <td className={styles.td}>{fase.id_fase}</td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedNomeFase}
                    onChange={(e) => setEditedNomeFase(e.target.value)}
                  />
                ) : (
                  fase.nome_fase
                )}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    className={`${styles.input} ${styles.noSpinner}`}
                    value={editedSequenza}
                    onChange={(e) => setEditedSequenza(e.target.value)}
                  />
                ) : (
                  fase.sequenza
                )}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <button className={styles.button} onClick={() => handleSave(fase.id_fase)}>💾</button>
                ) : confirmDeleteId === fase.id_fase ? (
                  <>
                    <button className={styles.button} onClick={() => handleDelete(fase.id_fase)}>✅</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(null)}>❌</button>
                  </>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(index)}>✏️</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(fase.id_fase)}>🗑️</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestioneFasi;
