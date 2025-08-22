import React, { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
} from '@chakra-ui/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const GestioneRuoli = () => {
  const [ruoli, setRuoli] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ cod_ruolo: '', nome_ruolo: '' });
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    onOpen();
  };

  const handleClose = () => {
    onClose();
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
    <Box>
      <ToastContainer />
      <Button colorScheme="blue" onClick={() => handleOpen()}>
        Aggiungi Ruolo
      </Button>

      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Codice</Th>
            <Th>Nome</Th>
            <Th>Azioni</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ruoli.map((ruolo) => (
            <Tr key={ruolo.cod_ruolo}>
              <Td>{ruolo.cod_ruolo}</Td>
              <Td>{ruolo.nome_ruolo}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleOpen(ruolo)}>Modifica</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(ruolo.cod_ruolo)}>Elimina</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Modifica Ruolo' : 'Nuovo Ruolo'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Codice Ruolo"
                value={formData.cod_ruolo}
                onChange={(e) => setFormData({ ...formData, cod_ruolo: e.target.value })}
                isDisabled={editMode}
              />
              <Input
                placeholder="Nome Ruolo"
                value={formData.nome_ruolo}
                onChange={(e) => setFormData({ ...formData, nome_ruolo: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Salva
            </Button>
            <Button onClick={handleClose}>Annulla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default GestioneRuoli;
