// src/utils/validazioni.js

// ✅ Validazione per Formule
export const validaFormula = (obj) => {
  if (!obj.nome?.trim()) {
    return { valido: false, messaggio: '⚠️ Il nome è obbligatorio' };
  }
  if (!obj.descrizione?.trim()) {
    return { valido: false, messaggio: '⚠️ La descrizione è obbligatoria' };
  }
  if (!obj.gironi || isNaN(parseInt(obj.gironi))) {
    return { valido: false, messaggio: '⚠️ Inserisci un numero valido per i gironi' };
  }
  if (!obj.squadre_per_girone || isNaN(parseInt(obj.squadre_per_girone))) {
    return { valido: false, messaggio: '⚠️ Inserisci un numero valido per le squadre per girone' };
  }
  return { valido: true };
};

// ✅ Validazione per Ruoli
export const validaRuolo = (codice, nome) => {
  if (!codice?.trim()) {
    return { valido: false, messaggio: '⚠️ Il codice ruolo è obbligatorio' };
  }
  if (!nome?.trim()) {
    return { valido: false, messaggio: '⚠️ Il nome ruolo è obbligatorio' };
  }
  return { valido: true };
};

// ✅ Validazione per Fasi
export const validaFase = (nome, sequenza) => {
  if (!nome?.trim()) {
    return { valido: false, messaggio: '⚠️ Il nome della fase è obbligatorio' };
  }
  const sequenzaInt = parseInt(sequenza, 10);
  if (isNaN(sequenzaInt)) {
    return { valido: false, messaggio: '⚠️ La sequenza deve essere un numero valido' };
  }
  return { valido: true };
};
export const validaCampo = (nome, descrizione) => {
  if (!nome?.trim()) {
    return { valido: false, messaggio: '⚠️ Il nome del campo è obbligatorio' };
  }
  if (!descrizione?.trim()) {
    return { valido: false, messaggio: '⚠️ La descrizione del campo è obbligatoria' };
  }
  return { valido: true };
};
export const validaPunti = (obj) => {
  if (!obj.descrizione?.trim()) {
    return { valido: false, messaggio: '⚠️ La descrizione è obbligatoria' };
  }

  const numerici = [
    'punti_vittoria',
    'punti_pareggio',
    'punti_sconfitta',
    'bonus_difensivo',
    'punti_diff',
    'bonus_offensivo',
    'punti_fatti',
  ];

  for (const campo of numerici) {
    const val = parseInt(obj[campo]);
    if (isNaN(val) || val < 0) {
      return { valido: false, messaggio: `⚠️ Il campo "${campo}" deve essere un numero ≥ 0` };
    }
  }

  return { valido: true };
};
