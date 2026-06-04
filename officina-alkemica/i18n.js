/* ============================================================
   OFFICINA ALKEMICA — stringhe d'interfaccia (IT / EN)
   Esposto come window.OA_I18N.
   ============================================================ */
(function () {
  "use strict";

  const STR = {
    school: { it: "Scuola ContattaTi", en: "Scuola ContattaTi" },
    backToSite: { it: "Torna al sito", en: "Back to the site" },
    gameTitle: { it: "Officina Alkemica", en: "Officina Alkemica" },
    gameKicker: { it: "L'Alchimia come Via per la felicità incondizionata", en: "Alchemy as a Way to unconditional happiness" },
    fromAuthor: { it: "dagli scritti di Salvatore Brizzi", en: "from the writings of Salvatore Brizzi" },
    themeLight: { it: "Tema chiaro", en: "Light theme" },
    themeDark: { it: "Tema scuro", en: "Dark theme" },

    epigraph: {
      it: "«Ogni lettore, quando legge, legge se stesso.»",
      en: "\u201CEvery reader, as they read, reads only themselves.\u201D"
    },
    epigraphSource: { it: "Marcel Proust", en: "Marcel Proust" },
    chooseMode: { it: "Scegli una prova", en: "Choose a trial" },
    bestScore: { it: "Record", en: "Best" },
    notYetPlayed: { it: "mai giocata", en: "not yet played" },
    initiationProgress: { it: "Progresso dell'Opera", en: "Progress of the Work" },
    resetProgress: { it: "Azzera i progressi", en: "Reset progress" },
    resetConfirm: { it: "Azzerare tutti i record e i progressi salvati?", en: "Reset all saved records and progress?" },

    mode_specchio_t: { it: "La Legge dello Specchio", en: "The Law of the Mirror" },
    mode_specchio_d: { it: "Davanti a una situazione, riconosci la lettura alchemica.", en: "Facing a situation, recognise the alchemical reading." },
    mode_persona_t: { it: "Personalità o Anima?", en: "Personality or Soul?" },
    mode_persona_d: { it: "A chi appartiene ogni facoltà: alla macchina o all'anima?", en: "Whom does each faculty belong to: the machine or the soul?" },
    mode_infsup_t: { it: "Inferior o Superior?", en: "Inferior or Superior?" },
    mode_infsup_d: { it: "Riconosci se un concetto appartiene all'Alchimia Inferior o alla Superior.", en: "Tell whether a concept belongs to Alchimia Inferior or Superior." },
    mode_quiz_t: { it: "Quiz dell'Alchimista", en: "The Alchemist's Quiz" },
    mode_quiz_d: { it: "Metti alla prova la tua conoscenza dell'Ars Regia.", en: "Test your knowledge of the Ars Regia." },
    mode_memoria_t: { it: "Memoria Alchemica", en: "Alchemical Memory" },
    mode_memoria_d: { it: "Ritrova le coppie di corrispondenze nascoste.", en: "Find the hidden pairs of correspondences." },

    start: { it: "Inizia", en: "Begin" },
    question: { it: "Domanda", en: "Question" },
    of: { it: "di", en: "of" },
    score: { it: "Punti", en: "Score" },
    streak: { it: "Serie", en: "Streak" },
    correct: { it: "Esatto", en: "Correct" },
    wrong: { it: "Non esatto", en: "Not quite" },
    next: { it: "Avanti", en: "Next" },
    seeResults: { it: "Vedi l'esito", en: "See result" },
    backToMenu: { it: "Torna alle prove", en: "Back to trials" },
    playAgain: { it: "Gioca ancora", en: "Play again" },

    specchioPrompt: { it: "Qual è la lettura alchemica della situazione?", en: "What is the alchemical reading of the situation?" },
    personaPrompt: { it: "A chi appartiene?", en: "Whom does it belong to?" },
    persona_opt0: { it: "Personalità", en: "Personality" },
    persona_opt1: { it: "Anima", en: "Soul" },
    infsupPrompt: { it: "Inferior o Superior?", en: "Inferior or Superior?" },
    infsup_opt0: { it: "Inferior", en: "Inferior" },
    infsup_opt1: { it: "Superior", en: "Superior" },

    moves: { it: "Mosse", en: "Moves" },
    pairs: { it: "Coppie", en: "Pairs" },
    memoryWin: { it: "Tutte le corrispondenze ritrovate!", en: "All correspondences found!" },
    memoryPrompt: { it: "Tocca due tessere per svelare una corrispondenza.", en: "Tap two tiles to reveal a correspondence." },

    resultPerfect: { it: "Trasmutato in Oro", en: "Transmuted into Gold" },
    resultGood: { it: "Il Piombo si fa Argento", en: "Lead turns to Silver" },
    resultMid: { it: "Il Fuoco si accende", en: "The Fire kindles" },
    resultLow: { it: "Ancora Piombo", en: "Still Lead" },
    youScored: { it: "Hai totalizzato", en: "You scored" },
    points: { it: "punti", en: "points" },
    accuracy: { it: "Risposte esatte", en: "Correct answers" },
    newRecord: { it: "Nuovo record!", en: "New record!" },
    recap: { it: "Da ricordare", en: "Worth remembering" }
  };

  function makeT(getLang) {
    return function t(key) {
      const e = STR[key];
      if (!e) return key;
      const l = getLang();
      return e[l] != null ? e[l] : e.it;
    };
  }

  window.OA_I18N = { STR, makeT };
})();
