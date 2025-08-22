import React, { useState } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
} from '@chakra-ui/react';
import GestioneRuoli from '../components/GestioneRuoli';
import GestioneFasi from '../components/GestioneFasi';
import GestionePunti from '../components/GestionePunti';
import GestioneCampi from '../components/GestioneCampi';
import GestioneFormule from '../components/GestioneFormule';

function Parametri() {
  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={6}>
        Parametri
      </Heading>

      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Ruoli</Tab>
          <Tab>Fasi</Tab>
          <Tab>Punti</Tab>
          <Tab>Campi</Tab>
          <Tab>Formule</Tab>
        </TabList>

        <TabPanels mt={4}>
          <TabPanel><GestioneRuoli /></TabPanel>
          <TabPanel><GestioneFasi /></TabPanel>
          <TabPanel><GestionePunti /></TabPanel>
          <TabPanel><GestioneCampi /></TabPanel>
          <TabPanel><GestioneFormule /></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default Parametri;
