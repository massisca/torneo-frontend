import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  TextField, Table, TableBody, TableCell, TableHead, TableRow
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const GestioneRuoli = () => {
  const [ruoli, setRuoli] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ cod_ruolo: '', nome_ruolo: '' });

  const fetchRuoli = async () => {
    try {
      const res = await axios.get('/api/ruoli');
      setRuoli(res.data);
    } catch (err) {
      toast.error('Errore nel caricamento dei ruoli');
    }
  };

  useEffect(() => {
    fetchRuoli();
  }, []);

  const handleOpen = (ruolo = null) => {
    if (ruolo) {
      setFormData(ruolo);
      setEditMode(true);
    } else {
      setFormData({ cod_ruolo: '', nome_ruolo: '' });
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ cod_ruolo: '', nome_ruolo: '' });
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`/api/ruoli/${formData.cod_ruolo}`, formData);
        toast.success('Ruolo aggiornato');
      } else {
        await axios.post('/api/ruoli', formData);
        toast.success('Ruolo aggiunto');
      }
      fetchRuoli();
      handleClose();
    } catch (err) {
      toast.error('Errore durante il salvataggio');
    }
  };

  const handleDelete = async (cod_ruolo) => {
    if (!window.confirm('Confermi la cancellazione del ruolo?')) return;
    try {
      await axios.delete(`/api/ruoli/${cod_ruolo}`);
      toast.success('Ruolo eliminato');
      fetchRuoli();
    } catch (err) {
      toast.error('Errore durante l\'eliminazione');
    }
  };

  return (
    <div>
      <ToastContainer />
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Aggiungi Ruolo
      </Button>

      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Codice</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Azioni</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ruoli.map((ruolo) => (
            <TableRow key={ruolo.cod_ruolo}>
              <TableCell>{ruolo.cod_ruolo}</TableCell>
              <TableCell>{ruolo.nome_ruolo}</TableCell>
              <TableCell>
                <Button onClick={() => handleOpen(ruolo)}>Modifica</Button>
                <Button color="error" onClick={() => handleDelete(ruolo.cod_ruolo)}>Elimina</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Modifica Ruolo' : 'Nuovo Ruolo'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Codice Ruolo"
            fullWidth
            margin="dense"
            value={formData.cod_ruolo}
            onChange={(e) => setFormData({ ...formData, cod_ruolo: e.target.value })}
            disabled={editMode}
          />
          <TextField
