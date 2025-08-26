// src/pages/Torneo.jsx
import { useParams } from 'react-router-dom';
import { Box, Title, Text } from '@mantine/core';

const Torneo = () => {
  const { id_torneo } = useParams();

  return (
    <Box p="md">
      <Title order={2} mb="md">Pagina Torneo</Title>
      <Text>🆔 ID Torneo: <strong>{id_torneo}</strong></Text>
    </Box>
  );
};

export default Torneo;
