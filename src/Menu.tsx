// torneo-frontend/src/Menu.tsx

import { Box, Menu as MantineMenu, Button, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginModal from './components/LoginModal';

const Menu = () => {
  const [nome, setNome] = useState('');
  const [ruolo, setRuolo] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const nomeInSessione = sessionStorage.getItem('nome_utente');
    const ruoloInSessione = sessionStorage.getItem('cod_ruolo');
    if (nomeInSessione) setNome(nomeInSessione);
    if (ruoloInSessione) setRuolo(ruoloInSessione);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setNome('');
    setRuolo('');
    navigate('/');
  };

  return (
    <Box w="100%" m={0} p={0}>
      <img
        src="/banner.jpg"
        alt="Banner gestionale tornei"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      <Box
        bg="#e0e0e0"
        px="md"
        py="sm"
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Menu e titolo */}
        <Box style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <MantineMenu shadow="md" width={220} withinPortal={false}>
            <MantineMenu.Target>
              <Button radius="md">☰</Button>
            </MantineMenu.Target>
            <MantineMenu.Dropdown>
              <MantineMenu.Item component={Link} to="/">Home</MantineMenu.Item>
              <MantineMenu.Item component={Link} to="/storico">Storico Tornei</MantineMenu.Item>
              <MantineMenu.Item component={Link} to="/iscrizioni">Iscrizioni</MantineMenu.Item>
              <MantineMenu.Item component={Link} to="/contatti">Contatti</MantineMenu.Item>

              {(ruolo === 'ADM' || ruolo === 'GES' || ruolo === 'SQA') && (
                <MantineMenu.Item component={Link} to="/gestione-squadra">Gestione Squadra</MantineMenu.Item>
              )}
              {(ruolo === 'ADM' || ruolo === 'GES') && (
                <MantineMenu.Item component={Link} to="/gestione-torneo">Gestione Torneo</MantineMenu.Item>
              )}
              {ruolo === 'ADM' && (
                <>
                  <MantineMenu.Item component={Link} to="/parametri">Gestione Parametri</MantineMenu.Item>
                  <MantineMenu.Item component={Link} to="/utenti">Gestione Utenti</MantineMenu.Item>
                </>
              )}

              {!nome ? (
                <MantineMenu.Item
                  component="a"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setLoginModalOpen(true);
                  }}
                >
                  Login
                </MantineMenu.Item>
              ) : (
                <MantineMenu.Item
                  component="a"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </MantineMenu.Item>
              )}
            </MantineMenu.Dropdown>
          </MantineMenu>

          <Text fw={700} fz="28px" c="red">
            Gestionale Tornei
          </Text>
        </Box>

        {/* Benvenuto o login a destra */}
        <Box style={{ textAlign: 'right' }}>
          {!nome ? (
            <Text
              fz="14px"
              fw={500}
              c="red"
              style={{ cursor: 'pointer' }}
              onClick={() => setLoginModalOpen(true)}
            >
              Effettua login
            </Text>
          ) : (
            <Text fz="14px" fw={500} c="red">
              Ciao, {nome}
            </Text>
          )}
        </Box>
      </Box>

      {/* Modale login */}
      <LoginModal
        visible={loginModalOpen}
        onClose={() => {
          const nomeAggiornato = sessionStorage.getItem('nome_utente');
          const ruoloAggiornato = sessionStorage.getItem('cod_ruolo');
          setNome(nomeAggiornato || '');
          setRuolo(ruoloAggiornato || '');
          setLoginModalOpen(false);
        }}
      />
    </Box>
  );
};

export default Menu;
