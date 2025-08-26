// src/components/parametri/GestioneCampi.jsx
import React, { useState, useEffect } from 'react';
import styles from '../../styles/GestioneParametri.module.css';
import { validaCampo } from '../../utils/validazioni';

const GestioneCampi = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const [campi, setCampi] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [edited, setEdited] = useState({});
  const [nuovo, setNuovo] = useState({
    nome_campo: '',
    descrizione_campo: '',
  });
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/campi`)
      .then((res) => res.json())
      .then(setCampi)
      .catch((err) => console.error('Errore nel recupero:', err));
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEdited({ ...campi[index] });
  };

  const handleChange = (field, value) => {
    setEdited((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (id) => {
    const result = validaCampo(edited.nome_campo, edited.descrizione_campo);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/campi/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(edited),
    })
      .then((res) => res.json())
      .then((updated) => {
        const updatedList = [...campi];
        updatedList[editingIndex] = updated;
        setCampi(updatedList);
        setEditingIndex(null);
      })
      .catch((err) => console.error('Errore nel salvataggio:', err));
  };

  const handleInsert = () => {
    const result = validaCampo(nuovo.nome_campo, nuovo.descrizione_campo);
    if (!result.valido) {
      alert(result.messaggio);
      return;
    }

    fetch(`${apiUrl}/api/campi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuovo),
    })
      .then((res) => res.json())
      .then((newCampo) => {
        setCampi([...campi, newCampo]);
        setNuovo({ nome_campo: '', descrizione_campo: '' });
      })
      .catch((err) => console.error('Errore inserimento:', err));
  };

  const handleDelete = (id) => {
    fetch(`${apiUrl}/api/campi/${id}`, { method: 'DELETE' })
      .then(() => {
        setCampi(campi.filter((c) => c.id_campo !== id));
        setConfirmDeleteId(null);
      })
      .catch((err) => console.error('Errore eliminazione:', err));
  };

  return (
    <div>
      <h2>Gestione Campi</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>ID</th>
            <th className={styles.th}>Nome Campo</th>
            <th className={styles.th}>Descrizione</th>
            <th className={styles.th}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.td}>—</td>
            <td className={styles.td}>
              <input
                value={nuovo.nome_campo}
                onChange={(e) => setNuovo({ ...nuovo, nome_campo: e.target.value })}
              />
            </td>
            <td className={styles.td}>
              <input
                value={nuovo.descrizione_campo}
                onChange={(e) => setNuovo({ ...nuovo, descrizione_campo: e.target.value })}
              />
            </td>
            <td className={styles.td}>
              <button className={styles.button} onClick={handleInsert}>➕</button>
            </td>
          </tr>

          {campi.map((campo, index) => (
            <tr key={campo.id_campo}>
              <td className={styles.td}>{campo.id_campo}</td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input
                    value={edited.nome_campo}
                    onChange={(e) => handleChange('nome_campo', e.target.value)}
                  />
                ) : campo.nome_campo}
              </td>
              <td className={styles.td}>
                {editingIndex === index ? (
                  <input
                    value={edited.descrizione_campo}
                    onChange={(e) => handleChange('descrizione_campo', e.target.value)}
                  />
                ) : campo.descrizione_campo}
              </td>
              <td className={styles.td}>
                {confirmDeleteId === campo.id_campo ? (
                  <>
                    <button className={styles.button} onClick={() => handleDelete(campo.id_campo)}>✅</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(null)}>❌</button>
                  </>
                ) : editingIndex === index ? (
                  <button className={styles.button} onClick={() => handleSave(campo.id_campo)}>💾</button>
                ) : (
                  <>
                    <button className={styles.button} onClick={() => handleEdit(index)}>✏️</button>
                    <button className={styles.button} onClick={() => setConfirmDeleteId(campo.id_campo)}>🗑️</button>
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

export default GestioneCampi;
