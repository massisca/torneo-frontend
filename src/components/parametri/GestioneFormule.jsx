// src/components/parametri/GestioneFormule.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/GestioneParametri.module.css';
import { validaFormula } from '../../utils/validazioni';

const GestioneFormule = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [formule, setFormule] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [edited, setEdited] = useState({});
  const [nuova, setNuova] = useState({
    nome: '',
    descrizione: '',
    gironi: '',
    squadre_per_girone: '',
    fase_finale: true,
    classifica_completa: true,
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/formule`)
      .then((res) => res.json())
      .then(setFormule)
      .catch((err) => console.error('Errore nel recupero:', err));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEdited({ ...formule[index] });
  };

  const handleChange = (field, value) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (id) => {
    const result = validaFormula(edited);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/formule/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...edited,
        gironi: parseInt(edited.gironi),
        squadre_per_girone: parseInt(edited.squadre_per_girone),
      }),
    })
      .then((res) => res.json())
      .then((updated) => {
        const updatedList = [...formule];
        updatedList[editingIndex] = updated;
        setFormule(updatedList);
        setEditingIndex(null);
      })
      .catch((err) => console.error('Errore nel salvataggio:', err));
  };

  const handleInsert = () => {
    const result = validaFormula(nuova);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    const body = {
      ...nuova,
      gironi: parseInt(nuova.gironi),
      squadre_per_girone: parseInt(nuova.squadre_per_girone),
    };

    fetch(`${apiUrl}/api/formule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((newFormula) => {
        setFormule([...formule, newFormula]);
        setNuova({
          nome: '',
          descrizione: '',
          gironi: '',
          squadre_per_girone: '',
          fase_finale: true,
          classifica_completa: true,
        });
      })
      .catch((err) => console.error('Errore inserimento:', err));
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/formule/${id}`, { method: 'DELETE' })
      .then(() => {
        setFormule(formule.filter((f) => f.id_formula !== id));
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error('Errore eliminazione:', err));
  };

  return (
    <div>
      <h2>Gestione Formule</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Nome</th>
            <th className={styles.th}>Descrizione</th>
            <th className={styles.th}>Gironi</th>
            <th className={styles.th}>Squadre/Girone</th>
            <th className={styles.th}>Fase Finale</th>
            <th className={styles.th}>Classifica Completa</th>
            <th className={styles.th}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>
              <input value={nuova.nome} onChange={(e) => setNuova({ ...nuova, nome: e.target.value })} />
            </td>
            <td className={styles.td}>
              <input value={nuova.descrizione} onChange={(e) => setNuova({ ...nuova, descrizione: e.target.value })} />
            </td>
            <td className={styles.td}>
              <input type="number" value={nuova.gironi} onChange={(e) => setNuova({ ...nuova, gironi: e.target.value })} />
            </td>
            <td className={styles.td}>
              <input type="number" value={nuova.squadre_per_girone} onChange={(e) => setNuova({ ...nuova, squadre_per_girone: e.target.value })} />
            </td>
            <td className={styles.td}>
              <input type="checkbox" checked={nuova.fase_finale} onChange={(e) => setNuova({ ...nuova, fase_finale: e.target.checked })} />
            </td>
            <td className={styles.td}>
              <input type="checkbox" checked={nuova.classifica_completa} onChange={(e) => setNuova({ ...nuova, classifica_completa: e.target.checked })} />
            </td>
            <td className={styles.td}>
              <button className={styles.button} onClick={handleInsert}>➕</button>
            </td>
          </tr>

          {formule.map((f, index) => (
            <tr key={f.id_formula}>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input value={edited.nome} onChange={(e) => handleChange('nome', e.target.value)} />
                ) : f.nome}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input value={edited.descrizione} onChange={(e) => handleChange('descrizione', e.target.value)} />
                ) : f.descrizione}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input type="number" value={edited.gironi} onChange={(e) => handleChange('gironi', e.target.value)} />
                ) : f.gironi}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input type="number" value={edited.squadre_per_girone} onChange={(e) => handleChange('squadre_per_girone', e.target.value)} />
                ) : f.squadre_per_girone}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input type="checkbox" checked={edited.fase_finale} onChange={(e) => handleChange('fase_finale', e.target.checked)} />
                ) : f.fase_finale ? '✅' : '❌'}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input type="checkbox" checked={edited.classifica_completa} onChange={(e) => handleChange('classifica_completa', e.target.checked)} />
                ) : f.classifica_completa ? '✅' : '❌'}
              </td>
              <td className={styles.td}>
                {confirmDeleteId === f.id_formula ? (
                  <>
                    <button className={styles.button} onClick={() => handleDelete(f.id_formula)}>✅</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(null)}>❌</button>
                  </>
                ) : editingIndex === index ? (
                  <button className={styles.button} onClick={() => handleSave(f.id_formula)}>💾</button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(index)}>✏️</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(f.id_formula)}>🗑️</button>
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

export default GestioneFormule;
