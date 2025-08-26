// src/components/parametri/GestionePunti.jsx

import React, { useState, useEffect } from 'react';
import styles from '../../styles/GestioneParametri.module.css';
import { validaPunti } from '../../utils/validazioni';

const GestionePunti = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [punti, setPunti] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [edited, setEdited] = useState({});
  const [nuovo, setNuovo] = useState({
    descrizione: '',
    punti_vittoria: 0,
    punti_pareggio: 0,
    punti_sconfitta: 0,
    bonus_difensivo: 0,
    punti_diff: 0,
    bonus_offensivo: 0,
    punti_fatti: 0,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/punti`)
      .then((res) => res.json())
      .then(setPunti)
      .catch((err) => console.error('Errore nel recupero:', err));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEdited({ ...punti[index] });
  };

  const handleChange = (field, value) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (id) => {
    const result = validaPunti(edited);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/punti/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...edited }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const updatedList = [...punti];
        updatedList[editingIndex] = updated;
        setPunti(updatedList);
        setEditingIndex(null);
      })
      .catch((err) => console.error('Errore nel salvataggio:', err));
  };

  const handleInsert = () => {
    const result = validaPunti(nuovo);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/punti`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuovo),
    })
      .then((res) => res.json())
      .then((newRow) => {
        setPunti([...punti, newRow]);
        setNuovo({
          descrizione: '',
          punti_vittoria: 3,
          punti_pareggio: 1,
          punti_sconfitta: 0,
          bonus_difensivo: 0,
          punti_diff: 0,
          bonus_offensivo: 0,
          punti_fatti: 0,
        });
      })
      .catch((err) => console.error('Errore inserimento:', err));
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/punti/${id}`, { method: 'DELETE' })
      .then(() => {
        setPunti(punti.filter((p) => p.id_punti !== id));
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error('Errore eliminazione:', err));
  };

  return (
    <div>
      <h2>Gestione Punti</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Descrizione</th>
            <th className={styles.th}>Vittoria</th>
            <th className={styles.th}>Pareggio</th>
            <th className={styles.th}>Sconfitta</th>
            <th className={styles.th}>Bonus Difensivo</th>
            <th className={styles.th}>Diff</th>
            <th className={styles.th}>Bonus Offensivo</th>
            <th className={styles.th}>Fatti</th>
            <th className={styles.th}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>
              <input value={nuovo.descrizione} onChange={(e) => setNuovo({ ...nuovo, descrizione: e.target.value })} />
            </td>
            {[
              'punti_vittoria',
              'punti_pareggio',
              'punti_sconfitta',
              'bonus_difensivo',
              'punti_diff',
              'bonus_offensivo',
              'punti_fatti',
            ].map((field) => (
              <td className={styles.td} key={field}>
                <input
                  type="number"
                  min="0"
                  value={nuovo[field]}
                  onChange={(e) => setNuovo({ ...nuovo, [field]: parseInt(e.target.value) })}
                />
              </td>
            ))}
            <td className={styles.td}>
              <button className={styles.button} onClick={handleInsert}>➕</button>
            </td>
          </tr>

          {punti.map((p, index) => (
            <tr key={p.id_punti}>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input value={edited.descrizione} onChange={(e) => handleChange('descrizione', e.target.value)} />
                ) : p.descrizione}
              </td>
              {[
                'punti_vittoria',
                'punti_pareggio',
                'punti_sconfitta',
                'bonus_difensivo',
                'punti_diff',
                'bonus_offensivo',
                'punti_fatti',
              ].map((field) => (
                <td className={styles.td} key={field}>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      min="0"
                      value={edited[field]}
                      onChange={(e) => handleChange(field, parseInt(e.target.value))}
                    />
                  ) : p[field]}
                </td>
              ))}
              <td className={styles.td}>
                {confirmDeleteId === p.id_punti ? (
                  <>
                    <button className={styles.button} onClick={() => handleDelete(p.id_punti)}>✅</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(null)}>❌</button>
                  </>
                ) : editingIndex === index ? (
                  <button className={styles.button} onClick={() => handleSave(p.id_punti)}>💾</button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(index)}>✏️</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(p.id_punti)}>🗑️</button>
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

export default GestionePunti;
