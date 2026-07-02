/* LA SACRA SESSUALITÀ — i18n */
(function () {
  "use strict";
  const STR = {
    school: { it: "Scuola ContattaTi", en: "Scuola ContattaTi" },
    backToSite: { it: "Torna al sito", en: "Back to the site" },
    gameTitle: { it: "La Sacra Sessualità", en: "The Sacred Sexuality" },
    gameKicker: { it: "La prostituzione sacra del passato e del futuro", en: "The sacred prostitution of the past and of the future" },
    fromAuthor: { it: "dagli scritti di Salvatore Brizzi", en: "from the writings of Salvatore Brizzi" },
    themeLight: { it: "Tema chiaro", en: "Light theme" }, themeDark: { it: "Tema scuro", en: "Dark theme" },
    epigraph: { it: "«Il sesso è legato alla trasmissione dell'amore e non ha niente a che fare con lo sfregamento di due parti anatomiche.»", en: "\u201CSex is linked to the transmission of love and has nothing to do with rubbing two body parts together.\u201D" },
    epigraphSource: { it: "Salvatore Brizzi", en: "Salvatore Brizzi" },
    chooseMode: { it: "Scegli una prova", en: "Choose a trial" },
    bestScore: { it: "Record", en: "Best" }, notYetPlayed: { it: "mai giocata", en: "not yet played" },
    initiationProgress: { it: "Cammino del Sacro", en: "The Path of the Sacred" },
    resetProgress: { it: "Azzera i progressi", en: "Reset progress" },
    resetConfirm: { it: "Azzerare tutti i record e i progressi salvati?", en: "Reset all saved records and progress?" },

    mode_sacro_t: { it: "Sacro o Profano?", en: "Sacred or Profane?" },
    mode_sacro_d: { it: "Via del Cuore o possesso e meccanicità?", en: "Way of the Heart or possession and mechanicalness?" },
    mode_fasi_t: { it: "Le Tre Fasi della Coppia", en: "The Three Phases of the Couple" },
    mode_fasi_d: { it: "Euforia, crisi o intimità autentica?", en: "Euphoria, crisis or authentic intimacy?" },
    mode_quiz_t: { it: "Quiz della Sacra Sessualità", en: "The Sacred Sexuality Quiz" },
    mode_quiz_d: { it: "Quanto conosci la sessualità sacra dell'antichità e del futuro?", en: "How well do you know the sacred sexuality of antiquity and the future?" },
    mode_memoria_t: { it: "Memoria del Sacro", en: "Memory of the Sacred" },
    mode_memoria_d: { it: "Ritrova le corrispondenze fra significato antico e degenerazione moderna.", en: "Find correspondences between ancient meaning and modern degeneration." },

    start: { it: "Inizia", en: "Begin" }, question: { it: "Domanda", en: "Question" }, of: { it: "di", en: "of" },
    score: { it: "Punti", en: "Score" }, streak: { it: "Serie", en: "Streak" },
    correct: { it: "Esatto", en: "Correct" }, wrong: { it: "Non esatto", en: "Not quite" },
    next: { it: "Avanti", en: "Next" }, seeResults: { it: "Vedi l'esito", en: "See result" },
    backToMenu: { it: "Torna alle prove", en: "Back to trials" }, playAgain: { it: "Gioca ancora", en: "Play again" },

    sacroPrompt: { it: "Sacro o profano?", en: "Sacred or profane?" },
    sacro_opt0: { it: "Profano", en: "Profane" }, sacro_opt1: { it: "Sacro", en: "Sacred" },
    fasiPrompt: { it: "In quale fase della coppia ci troviamo?", en: "Which phase of the couple are we in?" },
    fasi_opt0: { it: "Euforia", en: "Euphoria" }, fasi_opt1: { it: "Crisi", en: "Crisis" }, fasi_opt2: { it: "Intimità autentica", en: "Authentic intimacy" },

    moves: { it: "Mosse", en: "Moves" }, pairs: { it: "Coppie", en: "Pairs" },
    memoryPrompt: { it: "Tocca due tessere per svelare una corrispondenza.", en: "Tap two tiles to reveal a correspondence." },
    resultPerfect: { it: "Il sacro è restaurato", en: "The sacred is restored" },
    resultGood: { it: "Il Cuore si apre", en: "The Heart opens" },
    resultMid: { it: "Il Fuoco si accende", en: "The Fire kindles" },
    resultLow: { it: "Ancora nel profano", en: "Still in the profane" },
    youScored: { it: "Hai totalizzato", en: "You scored" }, points: { it: "punti", en: "points" },
    accuracy: { it: "Risposte esatte", en: "Correct answers" },
    newRecord: { it: "Nuovo record!", en: "New record!" }, recap: { it: "Da ricordare", en: "Worth remembering" }
  };
  function makeT(getLang) { return function t(key) { const e = STR[key]; if (!e) return key; const l = getLang(); return e[l] != null ? e[l] : e.it; }; }
  window.GAME_I18N = { STR, makeT };
})();
