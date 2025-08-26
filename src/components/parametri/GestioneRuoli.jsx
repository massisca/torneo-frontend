// src/components/parametri/GestioneRuoli.jsx

import React, { useEffect, useState } from 'react';
import styles from '../../styles/GestioneParametri.module.css';
import { validaRuolo } from '../../utils/validazioni';

const GestioneRuoli = () => {
  const [ruoli, setRuoli] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedValue, setEditedValue] = useState('');
  const [newCodRuolo, setNewCodRuolo] = useState('');
  const [newNomeRuolo, setNewNomeRuolo] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/ruoli`)
      .then((res) => res.json())
      .then((data) => setRuoli(data));
  }, []);

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedValue(ruoli[index].nome_ruolo);
  };

  const handleUpdate = (index) => {
    const ruolo = ruoli[index];
    const result = validaRuolo(ruolo.cod_ruolo, editedValue);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/ruoli/${ruolo.cod_ruolo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome_ruolo: editedValue }),
    }).then(() => {
      const updated = [...ruoli];
      updated[index].nome_ruolo = editedValue;
      setRuoli(updated);
      setEditingIndex(null);
    });
  };

  const handleDelete = (cod_ruolo) => {
    fetch(`${apiUrl}/api/ruoli/${cod_ruolo}`, { method: 'DELETE' }).then(() =>
      setRuoli(ruoli.filter((r) => r.cod_ruolo !== cod_ruolo))
    );
    setConfirmDelete(null);
  };

  const handleAdd = () => {
    const result = validaRuolo(newCodRuolo, newNomeRuolo);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/ruoli`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cod_ruolo: newCodRuolo.toUpperCase(),
        nome_ruolo: newNomeRuolo,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRuoli([...ruoli, data]);
        setNewCodRuolo('');
        setNewNomeRuolo('');
      });
  };

  return (
    <div>
      <h2>Gestione Ruoli</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Codice</th>
            <th className={styles.th}>Nome Ruolo</th>
            <th className={styles.th}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>
              <input
                type="text"
                value={newCodRuolo}
                onChange={(e) => setNewCodRuolo(e.target.value)}
                placeholder="Codice ruolo"
              />
            </td>
            <td className={styles.td}>
              <input
                type="text"
                value={newNomeRuolo}
                onChange={(e) => setNewNomeRuolo(e.target.value)}
                placeholder="Nome nuovo ruolo"
              />
            </td>
            <td className={styles.td}>
              <button className={styles.button} onClick={handleAdd}>➕</button>
            </td>
          </tr>

          {ruoli.map((ruolo, index) => (
            <tr key={ruolo.cod_ruolo}>
              <td className={styles.td}>{ruolo.cod_ruolo}</td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={editedValue}
                    onChange={(e) => setEditedValue(e.target.value)}
                  />
                ) : (
                  ruolo.nome_ruolo
                )}
              </td>
              <td className={styles.td}>
                {confirmDelete === ruolo.cod_ruolo ? (
                  <>
                    <button className={styles.button} onClick={() => handleDelete(ruolo.cod_ruolo)}>✅</button>
                    <button className={styles.button} onClick={() => setConfirmDelete(null)}>❌</button>
                  </>
                ) : editingIndex === index ? (
                  <button className={styles.button} onClick={() => handleUpdate(index)}>💾</button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => startEditing(index)}>✏️</button>
                    <button className={styles.button} onClick={() => setConfirmDelete(ruolo.cod_ruolo)}>🗑️</button>
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

export default GestioneRuoli;
