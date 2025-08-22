function App() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#333' }}>Benvenuto nel Torneo!</h1>
      <p style={{ color: '#666', fontSize: '18px' }}>
        Questa è una pagina di test statica.
      </p>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
        Se la vedi, il deploy funziona correttamente 🎉
      </p>
    </div>
  );
}

export default App;
