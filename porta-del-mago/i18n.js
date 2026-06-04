/* ============================================================
   LA PORTA DEL MAGO — stringhe d'interfaccia (IT / EN)
   Esposto come window.PM_I18N.
   ============================================================ */
(function () {
  "use strict";

  const STR = {
    school: { it: "Scuola ContattaTi", en: "Scuola ContattaTi" },
    backToSite: { it: "Torna al sito", en: "Back to the site" },
    gameTitle: { it: "La Porta del Mago", en: "The Door of the Magus" },
    gameKicker: { it: "La Magia come Via di liberazione", en: "Magic as a Way of liberation" },
    fromAuthor: { it: "dagli scritti di Salvatore Brizzi", en: "from the writings of Salvatore Brizzi" },
    themeLight: { it: "Tema chiaro", en: "Light theme" },
    themeDark: { it: "Tema scuro", en: "Dark theme" },

    epigraph: {
      it: "«Un libro dev'essere un'ascia per il mare ghiacciato che è dentro di noi.»",
      en: "\u201CA book must be the axe for the frozen sea within us.\u201D"
    },
    epigraphSource: { it: "Franz Kafka", en: "Franz Kafka" },
    chooseMode: { it: "Scegli una prova", en: "Choose a trial" },
    bestScore: { it: "Record", en: "Best" },
    notYetPlayed: { it: "mai giocata", en: "not yet played" },
    initiationProgress: { it: "Cammino del Mago", en: "The Magus's Path" },
    resetProgress: { it: "Azzera i progressi", en: "Reset progress" },
    resetConfirm: { it: "Azzerare tutti i record e i progressi salvati?", en: "Reset all saved records and progress?" },

    mode_stato_t: { it: "Sonno o Presenza?", en: "Sleep or Presence?" },
    mode_stato_d: { it: "Ogni manifestazione: macchina addormentata o ricordo di sé?", en: "Each manifestation: sleeping machine or self-remembering?" },
    mode_lettura_t: { it: "La Lettura del Mago", en: "The Magus's Reading" },
    mode_lettura_d: { it: "Davanti a una situazione, riconosci la lettura del non-giudizio.", en: "Facing a situation, recognise the reading of non-judgment." },
    mode_risveglio_t: { it: "Risveglio o Illusione?", en: "Awakening or Illusion?" },
    mode_risveglio_d: { it: "Distingui la via autentica dalla trappola dell'ego e della magia nera.", en: "Tell the authentic way from the trap of ego and black magic." },
    mode_quiz_t: { it: "Quiz del Mago", en: "The Magus's Quiz" },
    mode_quiz_d: { it: "Metti alla prova la tua conoscenza della Via magica.", en: "Test your knowledge of the magical Way." },
    mode_memoria_t: { it: "Memoria Planetaria", en: "Planetary Memory" },
    mode_memoria_d: { it: "Ritrova le corrispondenze tra pianeti e qualità archetipali.", en: "Find the correspondences between planets and archetypal qualities." },

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

    letturaPrompt: { it: "Qual è la lettura del Mago?", en: "What is the Magus's reading?" },
    statoPrompt: { it: "A quale stato appartiene?", en: "To which state does it belong?" },
    stato_opt0: { it: "Sonno", en: "Sleep" },
    stato_opt1: { it: "Presenza", en: "Presence" },
    risveglioPrompt: { it: "Risveglio autentico o illusione?", en: "Authentic awakening or illusion?" },
    risveglio_opt0: { it: "Illusione", en: "Illusion" },
    risveglio_opt1: { it: "Risveglio", en: "Awakening" },

    moves: { it: "Mosse", en: "Moves" },
    pairs: { it: "Coppie", en: "Pairs" },
    memoryWin: { it: "Tutte le corrispondenze ritrovate!", en: "All correspondences found!" },
    memoryPrompt: { it: "Tocca due tessere per svelare una corrispondenza planetaria.", en: "Tap two tiles to reveal a planetary correspondence." },

    resultPerfect: { it: "La Porta è spalancata", en: "The Door stands wide open" },
    resultGood: { it: "La Porta si schiude", en: "The Door swings open" },
    resultMid: { it: "Il Fuoco si accende", en: "The Fire kindles" },
    resultLow: { it: "Ancora nel sonno", en: "Still asleep" },
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

  window.PM_I18N = { STR, makeT };
})();
