/* ============================================================
   I MONDI SPIRITUALI — stringhe d'interfaccia (IT / EN)
   Esposto come window.MS_I18N.
   ============================================================ */
(function () {
  "use strict";

  const STR = {
    // brand / chrome
    school: { it: "Scuola ContattaTi", en: "Scuola ContattaTi" },
    backToSite: { it: "Torna al sito", en: "Back to the site" },
    gameTitle: { it: "I Mondi Spirituali", en: "The Spiritual Worlds" },
    gameKicker: { it: "Un viaggio iniziatico", en: "An initiatory journey" },
    fromAuthor: { it: "dagli scritti di Salvatore Brizzi", en: "from the writings of Salvatore Brizzi" },
    themeLight: { it: "Tema chiaro", en: "Light theme" },
    themeDark: { it: "Tema scuro", en: "Dark theme" },

    // home
    epigraph: {
      it: "«Hai mai fatto un sogno così reale da sembrarti vero? E se da quel sogno non dovessi mai più risvegliarti?»",
      en: "\u201CHave you ever had a dream so real it seemed true? And what if from that dream you could never awaken?\u201D"
    },
    epigraphSource: { it: "Morpheus — Matrix", en: "Morpheus — The Matrix" },
    chooseMode: { it: "Scegli una prova", en: "Choose a trial" },
    bestScore: { it: "Record", en: "Best" },
    completed: { it: "completata", en: "completed" },
    notYetPlayed: { it: "mai giocata", en: "not yet played" },
    initiationProgress: { it: "Progresso dell'iniziazione", en: "Initiation progress" },
    resetProgress: { it: "Azzera i progressi", en: "Reset progress" },
    resetConfirm: { it: "Azzerare tutti i record e i progressi salvati?", en: "Reset all saved records and progress?" },

    // modes
    mode_colori_t: { it: "I Colori dell'Anima", en: "Colours of the Soul" },
    mode_colori_d: { it: "Il corpo astrale è un'aurora di colori: riconosci l'emozione che ogni tinta esprime.", en: "The astral body is an aura of colours: recognise the emotion each hue expresses." },
    mode_sottopiani_t: { it: "I Sette Sottopiani", en: "The Seven Subplanes" },
    mode_sottopiani_d: { it: "Discendi e risali i sette «gironi» della materia astrale.", en: "Descend and re-ascend the seven astral 'circles' of matter." },
    mode_abitanti_t: { it: "Gli Abitanti dell'Astrale", en: "Dwellers of the Astral" },
    mode_abitanti_d: { it: "Dalla descrizione, riconosci l'entità che popola il piano astrale.", en: "From the description, identify the entity dwelling on the astral plane." },
    mode_quiz_t: { it: "Quiz dell'Iniziato", en: "The Initiate's Quiz" },
    mode_quiz_d: { it: "Metti alla prova la tua conoscenza degli insegnamenti.", en: "Test your knowledge of the teachings." },
    mode_memoria_t: { it: "Memoria Astrale", en: "Astral Memory" },
    mode_memoria_d: { it: "Ritrova le coppie di corrispondenze nascoste.", en: "Find the hidden pairs of correspondences." },

    // quiz/journey UI
    start: { it: "Inizia", en: "Begin" },
    question: { it: "Domanda", en: "Question" },
    of: { it: "di", en: "of" },
    score: { it: "Punti", en: "Score" },
    streak: { it: "Serie", en: "Streak" },
    correct: { it: "Esatto", en: "Correct" },
    wrong: { it: "Non esatto", en: "Not quite" },
    theAnswer: { it: "La risposta", en: "The answer" },
    next: { it: "Avanti", en: "Next" },
    seeResults: { it: "Vedi l'esito", en: "See result" },
    backToMenu: { it: "Torna alle prove", en: "Back to trials" },
    playAgain: { it: "Gioca ancora", en: "Play again" },

    // color mode specifics
    colorPrompt: { it: "A quale stato dell'anima vibra questo colore astrale?", en: "Which state of the soul does this astral colour vibrate to?" },
    colorName: { it: "La tinta", en: "The hue" },

    // entity mode
    entityPrompt: { it: "Quale entità del piano astrale è descritta?", en: "Which dweller of the astral plane is described?" },

    // journey
    descend: { it: "Scendi nel sottopiano", en: "Descend into the subplane" },
    ascendNote: { it: "Ogni risposta esatta ti eleva verso la superficie.", en: "Each correct answer raises you toward the surface." },

    // memory
    moves: { it: "Mosse", en: "Moves" },
    pairs: { it: "Coppie", en: "Pairs" },
    memoryWin: { it: "Tutte le corrispondenze ritrovate!", en: "All correspondences found!" },
    memoryPrompt: { it: "Tocca due tessere per svelare una corrispondenza.", en: "Tap two tiles to reveal a correspondence." },

    // results
    resultPerfect: { it: "Coscienza limpida", en: "Limpid consciousness" },
    resultGood: { it: "Lo sguardo si affina", en: "The sight grows keen" },
    resultMid: { it: "Il velo si dirada", en: "The veil thins" },
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

  window.MS_I18N = { STR, makeT };
})();
