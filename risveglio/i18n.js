/* ============================================================
   RISVEGLIO — stringhe d'interfaccia (IT / EN)
   Esposto come window.RI_I18N.
   ============================================================ */
(function () {
  "use strict";

  const STR = {
    school: { it: "Scuola ContattaTi", en: "Scuola ContattaTi" },
    backToSite: { it: "Torna al sito", en: "Back to the site" },
    gameTitle: { it: "Risveglio", en: "Awakening" },
    gameKicker: { it: "Con gli esercizi delle Antiche Scuole Esoteriche", en: "With the exercises of the Ancient Esoteric Schools" },
    fromAuthor: { it: "dagli scritti di Salvatore Brizzi", en: "from the writings of Salvatore Brizzi" },
    themeLight: { it: "Tema chiaro", en: "Light theme" },
    themeDark: { it: "Tema scuro", en: "Dark theme" },

    epigraph: {
      it: "«Il fare un libro è meno che niente, se il libro fatto non rifà la gente.»",
      en: "\u201CThe making of a book is less than nothing, if the book once made does not remake the people.\u201D"
    },
    epigraphSource: { it: "Giuseppe Giusti", en: "Giuseppe Giusti" },
    chooseMode: { it: "Scegli una prova", en: "Choose a trial" },
    bestScore: { it: "Record", en: "Best" },
    notYetPlayed: { it: "mai giocata", en: "not yet played" },
    initiationProgress: { it: "Cammino del Risveglio", en: "The Path of Awakening" },
    resetProgress: { it: "Azzera i progressi", en: "Reset progress" },
    resetConfirm: { it: "Azzerare tutti i record e i progressi salvati?", en: "Reset all saved records and progress?" },

    mode_stato_t: { it: "Sonno o Risveglio?", en: "Sleep or Awakening?" },
    mode_stato_d: { it: "Classifica ogni manifestazione: addormentamento o ricordo di sé?", en: "Classify each manifestation: sleep or self-remembering?" },
    mode_ostacoli_t: { it: "Quale Ostacolo?", en: "Which Obstacle?" },
    mode_ostacoli_d: { it: "Riconosci se è identificazione, immaginazione negativa o emozione negativa.", en: "Tell whether it is identification, negative imagination or negative emotion." },
    mode_leggi_t: { it: "Quale Legge?", en: "Which Law?" },
    mode_leggi_d: { it: "A quale legge cosmica corrisponde la situazione?", en: "Which cosmic law does the situation correspond to?" },
    mode_quiz_t: { it: "Quiz del Risveglio", en: "The Awakening Quiz" },
    mode_quiz_d: { it: "Metti alla prova la tua conoscenza delle 25 lezioni.", en: "Test your knowledge of the 25 lessons." },
    mode_memoria_t: { it: "Memoria dei Corpi Sottili", en: "Subtle Bodies Memory" },
    mode_memoria_d: { it: "Ritrova le corrispondenze fra corpi sottili e caratteristiche.", en: "Find the correspondences between subtle bodies and their traits." },

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

    statoPrompt: { it: "A quale stato appartiene?", en: "To which state does it belong?" },
    stato_opt0: { it: "Sonno", en: "Sleep" },
    stato_opt1: { it: "Risveglio", en: "Awakening" },

    ostacoliPrompt: { it: "Quale ostacolo è in azione?", en: "Which obstacle is at work?" },
    ostacolo_opt0: { it: "Identificazione", en: "Identification" },
    ostacolo_opt1: { it: "Immaginazione negativa", en: "Negative imagination" },
    ostacolo_opt2: { it: "Emozione negativa", en: "Negative emotion" },

    leggiPrompt: { it: "Quale legge è in azione?", en: "Which law is at work?" },
    legge_opt0: { it: "Legge dell'Ottava", en: "Law of the Octave" },
    legge_opt1: { it: "Legge di Risonanza", en: "Law of Resonance" },
    legge_opt2: { it: "Legge dello Specchio", en: "Law of the Mirror" },
    legge_opt3: { it: "Non-giudizio", en: "Non-judgment" },

    moves: { it: "Mosse", en: "Moves" },
    pairs: { it: "Coppie", en: "Pairs" },
    memoryWin: { it: "Tutte le corrispondenze ritrovate!", en: "All correspondences found!" },
    memoryPrompt: { it: "Tocca due tessere per svelare una corrispondenza.", en: "Tap two tiles to reveal a correspondence." },

    resultPerfect: { it: "Il Risveglio è completo", en: "The Awakening is complete" },
    resultGood: { it: "La coscienza si apre", en: "Consciousness opens" },
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

  window.RI_I18N = { STR, makeT };
})();
