// src/pages/Home.jsx
import { Box, Title } from '@mantine/core';
import TorneiAttivi from '../components/TorneiAttivi';

const Home = () => {
  return (
    <Box p="md">
      <Title order={2} mb="md">Benvenuto nel Gestionale Tornei</Title>
      <TorneiAttivi />
    </Box>
  );
};

export default Home;
