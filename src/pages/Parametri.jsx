import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import GestioneRuoli from '../components/GestioneRuoli';
import GestioneFasi from '../components/GestioneFasi';
import GestionePunti from '../components/GestionePunti';
import GestioneCampi from '../components/GestioneCampi';
import GestioneFormule from '../components/GestioneFormule';

function Parametri() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Parametri</h2>
      <Box sx={{ width: '100%', marginTop: 2 }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          <Tab label="Ruoli" />
          <Tab label="Fasi" />
          <Tab label="Punti" />
          <Tab label="Campi" />
          <Tab label="Formule" />
        </Tabs>

        <Box sx={{ marginTop: 4 }}>
          {tabIndex === 0 && <GestioneRuoli />}
          {tabIndex === 1 && <GestioneFasi />}
          {tabIndex === 2 && <GestionePunti />}
          {tabIndex === 3 && <GestioneCampi />}
          {tabIndex === 4 && <GestioneFormule />}
        </Box>
      </Box>
    </div>
  );
}

export default Parametri;
