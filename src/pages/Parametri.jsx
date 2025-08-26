// src/pages/Parametri.jsx
 
import { Box, Title, Divider } from '@mantine/core';
import GestioneRuoli from '../components/parametri/GestioneRuoli';
import GestioneFasi from '../components/parametri/GestioneFasi';
import GestionePunti from '../components/parametri/GestionePunti';
import GestioneCampi from '../components/parametri/GestioneCampi';
import GestioneFormule from '../components/parametri/GestioneFormule';

const Parametri = () => {
  return (
    <Box p="xl">
      <Title order={2} mb="xl">
        Gestione Parametri
      </Title>

      <Box mt={80}>
        <GestioneRuoli />
      </Box>

      <Box mt={80}>
        <Divider my="md" />
        <GestioneFasi />
      </Box>

      <Box mt={80}>
        <Divider my="md" />
        <GestionePunti />
      </Box>

      <Box mt={80}>
        <Divider my="md" />
        <GestioneCampi />
      </Box>

      <Box mt={80}>
        <Divider my="md" />
        <GestioneFormule />
      </Box>
    </Box>
  );
};

export default Parametri;
