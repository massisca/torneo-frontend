import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Parametri = () => {
  const [parametri, setParametri] = useState([]);
  const [formData, setFormData] = useState({ chiave: '', valore: '' });
  const [editMode, setEditMode] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchParametri = async () => {
    try {
      const res = await axios.get('/api/parametri');
      setParametri(res.data);
    } catch (err) {
      toast.error('Errore nel caricamento dei parametri');
    }
  };

  useEffect(() => {
    fetchParametri();
  }, []);

  const handleOpen = (parametro = null) => {
    if (parametro) {
      setFormData(parametro);
      setEditMode(true);
    } else {
      setFormData({ chiave: '', valore: '' });
      setEditMode(false);
    }
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setFormData({ chiave: '', valore: '' });
    setEditMode(false);
  };

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await axios.put(`/api/parametri/${formData.chiave}`, formData);
        toast.success('Parametro aggiornato');
      } else {
        await axios.post('/api/parametri', formData);
        toast.success('Parametro aggiunto');
      }
      fetchParametri();
      handleClose();
    } catch (err) {
      toast.error('Errore durante il salvataggio');
    }
  };

  const handleDelete = async (chiave) => {
    if (!window.confirm('Confermi la cancellazione del parametro?')) return;
    try {
      await axios.delete(`/api/parametri/${chiave}`);
      toast.success('Parametro eliminato');
      fetchParametri();
    } catch (err) {
      toast.error('Errore durante l\'eliminazione');
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Button colorScheme="teal" onClick={() => handleOpen()}>
        Aggiungi Parametro
      </Button>

      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Chiave</Th>
            <Th>Valore</Th>
            <Th>Azioni</Th>
          </Tr>
        </Thead>
        <Tbody>
          {parametri.map((parametro) => (
            <Tr key={parametro.chiave}>
              <Td>{parametro.chiave}</Td>
              <Td>{parametro.valore}</Td>
              <Td>
                <Button size="sm" mr={2} onClick={() => handleOpen(parametro)}>Modifica</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(parametro.chiave)}>Elimina</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editMode ? 'Modifica Parametro' : 'Nuovo Parametro'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Chiave"
                value={formData.chiave}
                onChange={(e) => setFormData({ ...formData, chiave: e.target.value })}
                isDisabled={editMode}
              />
              <Input
                placeholder="Valore"
                value={formData.valore}
                onChange={(e) => setFormData({ ...formData, valore: e.target.value })}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Salva
            </Button>
            <Button onClick={handleClose}>Annulla</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};


export default Parametri;
