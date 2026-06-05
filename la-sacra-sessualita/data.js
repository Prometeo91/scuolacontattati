/* ============================================================
   LA SACRA SESSUALITÀ — dati bilingue (IT / EN)
   Fonte: S. Brizzi, "La sacra sessualità" (Antipodi, 2017)
   Esposto come window.SS_DATA.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- I. SACRO O PROFANO? ---------- */
  // belongs: 0 = Profano (possesso, meccanicità, paura), 1 = Sacro (Cuore, rituale, evoluzione)
  const SACRO = [
    { item: { it: "Fare sesso per sfregare organi e provare il brivido dell'orgasmo", en: "Having sex to rub organs and feel the thrill of orgasm" }, belongs: 0,
      note: { it: "«Il sesso è legato alla trasmissione dell'amore e non ha niente a che fare con lo sfregamento di due parti anatomiche.»", en: "'Sex is linked to the transmission of love and has nothing to do with rubbing two body parts together.'" } },
    { item: { it: "Unirsi con l'intenzione di svolgere un rituale che avvicina a Dio", en: "Uniting with the intention of performing a ritual that draws one closer to God" }, belongs: 1,
      note: { it: "«Si prendeva la decisione di fare sesso come noi oggi prenderemmo la decisione di andare a messa.»", en: "'The decision to have sex was taken as we today would take the decision to go to mass.'" } },
    { item: { it: "Possedere il partner con tentacoli magnetici: la 'conquista'", en: "Possessing the partner with magnetic tentacles: the 'conquest'" }, belongs: 0,
      note: { it: "«Quella che oggi consideriamo la normalità di coppia, una volta era considerata magia nera, o meglio, magia rossa.»", en: "'What we today consider a normal relationship was once considered black magic, or rather, red magic.'" } },
    { item: { it: "Far salire l'energia sessuale nel Cuore come conseguenza dell'amore per i nemici", en: "Raising sexual energy into the Heart as a consequence of loving one's enemies" }, belongs: 1,
      note: { it: "«Una sessualità iniziatica giunge come conseguenza dell'apertura del Cuore e non può esserne la causa.»", en: "'An initiatic sexuality comes as a consequence of the opening of the Heart and cannot be its cause.'" } },
    { item: { it: "Dipendere dal sesso come da una droga: cercare sensazioni sempre più estreme", en: "Depending on sex like a drug: seeking ever more extreme sensations" }, belongs: 0,
      note: { it: "«Fino a quando giungo a un punto tale che se non provo il brivido del sesso estremo, non sento più nulla.»", en: "'Until I reach a point where if I don't feel the thrill of extreme sex, I feel nothing anymore.'" } },
    { item: { it: "Commuoversi durante l'atto sessuale grazie alla totale Presenza", en: "Being moved during the sexual act thanks to total Presence" }, belongs: 1,
      note: { it: "«Mi è capitato di sentire il Cuore infiammarsi e di commuovermi durante l'atto, semplicemente grazie alla Presenza.»", en: "'I've felt the Heart catch fire and been moved during the act, simply thanks to Presence.'" } },
    { item: { it: "Usare il sesso per 'segnare il territorio' come un animale", en: "Using sex to 'mark territory' like an animal" }, belongs: 0,
      note: { it: "«Nella maggior parte dei casi si fa l'amore per possedere un altro essere umano magneticamente.»", en: "'In most cases one makes love to magnetically possess another human being.'" } },
    { item: { it: "Il Cuore come valore aggiunto che fa la differenza fra vecchia e nuova sessualità", en: "The Heart as the added value that makes the difference between old and new sexuality" }, belongs: 1,
      note: { it: "«In passato si conosceva la sessualità sacra ma mancava il Cuore, ed è questa assenza che ha condotto alle deviazioni.»", en: "'In the past sacred sexuality was known but the Heart was missing, and this absence led to the deviations.'" } },
    { item: { it: "Imparare il sesso dai video pornografici come unico riferimento", en: "Learning about sex from pornographic videos as the only reference" }, belongs: 0,
      note: { it: "«In quei video le donne sono trattate come 'buchi di carne'. Tutto viene percepito nell'ottica della prestazione.»", en: "'In those videos women are treated as objects. Everything is perceived in terms of performance.'" } },
    { item: { it: "Lacrimare mentre si fa l'amore: qualcosa che ancora mancava ad Atlantide", en: "Weeping while making love: something that was still missing in Atlantis" }, belongs: 1,
      note: { it: "«La nuova sessualità sarà su un'ottava superiore, che comprende l'apertura del Cuore. Qualcosa di ben distante dal sesso nei gabinetti.»", en: "'The new sexuality will be on a higher octave, including the opening of the Heart. Something far from sex in toilets.'" } }
  ];

  /* ---------- II. LE TRE FASI DELLA COPPIA (scenari — 3 opzioni) ---------- */
  // correct: 0 = Euforia (maschere), 1 = Crisi (emersione ombre), 2 = Intimità autentica
  const FASI = [
    { sit: { it: "Entrambi indossano maschere e puntano sull'apparenza e sulla performance sessuale.",
        en: "Both wear masks and focus on appearance and sexual performance." },
      correct: 0,
      note: { it: "Prima fase — Euforia: «Utilizziamo maschere sessuali per nascondere le paure più profonde: la paura di non valere niente.»", en: "First phase — Euphoria: 'We use sexual masks to hide the deepest fears: the fear of being worthless.'" } },
    { sit: { it: "Emergono paure, insicurezze e disfunzioni fisiche: il partner 'ci fa male'.",
        en: "Fears, insecurities and physical dysfunctions emerge: the partner 'hurts us'." },
      correct: 1,
      note: { it: "Seconda fase — Crisi: «Più diventiamo intimi con qualcuno, più diventiamo vulnerabili, e questo fa crescere le paure.»", en: "Second phase — Crisis: 'The more intimate we become with someone, the more vulnerable we become, and this makes fears grow.'" } },
    { sit: { it: "I partner si mettono a nudo (fisicamente e psicologicamente) senza più maschere.",
        en: "The partners bare themselves (physically and psychologically) without masks." },
      correct: 2,
      note: { it: "Terza fase — Intimità autentica: «O si è disposti a 'morire' alla propria vecchia immagine, oppure non si creerà mai una coppia reale.»", en: "Third phase — Authentic intimacy: 'Either you are willing to 'die' to your old image, or you will never create a real couple.'" } },
    { sit: { it: "Lei decide di separarsi perché 'non è più innamorata', dopo che l'eccitazione è svanita.",
        en: "She decides to separate because she's 'no longer in love', after the excitement faded." },
      correct: 1,
      note: { it: "Strategia di evitamento della seconda fase: «I partner giungono alla conclusione che non sono più innamorati e abbandonano.»", en: "Avoidance strategy of the second phase: 'The partners conclude they are no longer in love and abandon the relationship.'" } },
    { sit: { it: "Due partner si tradiscono a vicenda per rivivere clandestinamente la prima fase con altri.",
        en: "Two partners cheat on each other to clandestinely relive the first phase with others." },
      correct: 1,
      note: { it: "Terza strategia di evitamento: «Tornano a rivivere clandestinamente la prima fase euforica, ma con altri partner.»", en: "Third avoidance strategy: 'They clandestinely relive the first euphoric phase, but with other partners.'" } },
    { sit: { it: "Ammettere un'insicurezza, condividerla: questo fa crescere l'intimità.",
        en: "Admitting an insecurity, sharing it: this grows intimacy." },
      correct: 2,
      note: { it: "Terza fase: «Nessuna insicurezza deve essere fonte di vergogna; ammetterla fa crescere proprio quell'intimità che si è cercato di evitare.»", en: "Third phase: 'No insecurity should be a source of shame; admitting it grows precisely the intimacy one tried to avoid.'" } },
    { sit: { it: "Passione ed eccitazione al massimo: ma non c'è ancora un contatto profondo.",
        en: "Passion and excitement at their peak: but there is no deep contact yet." },
      correct: 0,
      note: { it: "Prima fase — Euforia sessuale: «Per quanto possa sembrare una bella fase, in realtà non c'è ancora un contatto profondo e intimo.»", en: "First phase — Sexual euphoria: 'However beautiful this phase may seem, there is no deep and intimate contact yet.'" } },
    { sit: { it: "Il rapporto di coppia serve a far emergere le nostre ferite, non a farci sentire bene.",
        en: "The couple relationship serves to bring our wounds to the surface, not to make us feel good." },
      correct: 2,
      note: { it: "Terza fase: «Il partner non è un tappabuchi per i nostri vuoti interiori. Il suo ruolo è far emergere le nostre ferite.»", en: "Third phase: 'The partner is not a stopgap for our inner voids. His role is to bring our wounds to the surface.'" } },
    { sit: { it: "Due partner vivono insieme da anni, fanno l'amore regolarmente, ma restano distanti nel profondo.",
        en: "Two partners live together for years, make love regularly, but remain distant deep down." },
      correct: 1,
      note: { it: "Seconda strategia di evitamento: «Si stipula un tacito accordo nel quale si decide di non conoscersi mai al cento per cento.»", en: "Second avoidance strategy: 'A tacit agreement is reached to never fully know each other.'" } }
  ];

  /* ---------- III. QUIZ DELLA SACRA SESSUALITÀ ---------- */
  const QUIZ = [
    { q: { it: "La «ierà porneusis» (prostituzione sacra) nell'antichità era…", en: "The 'hierà porneusis' (sacred prostitution) in antiquity was…" },
      options: { it: ["Un rituale sacro d'avvicinamento a Dio", "Un mercato del piacere", "Un crimine", "Una forma di schiavitù"], en: ["A sacred ritual of approach to God", "A pleasure market", "A crime", "A form of slavery"] }, correct: 0,
      note: { it: "«Non poteva esserci sesso se non all'interno della sfera del sacro. Le sacerdotesse insegnavano i segreti dell'energia sessuale.»", en: "'There could be no sex except within the sphere of the sacred. Priestesses taught the secrets of sexual energy.'" } },
    { q: { it: "La Confessione originariamente era…", en: "Confession originally was…" },
      options: { it: ["Un atto terapeutico del sacerdote-guaritore", "Un elenco di peccati morali", "Un rituale di punizione", "Una formalità burocratica"], en: ["A therapeutic act of the priest-healer", "A list of moral sins", "A punishment ritual", "A bureaucratic formality"] }, correct: 0,
      note: { it: "«Il sacerdote era un terapeuta, un guaritore. Assegnava esercizi e atti psicomagici, non penitenze meccaniche.»", en: "'The priest was a therapist, a healer. He assigned exercises and psychomagical acts, not mechanical penances.'" } },
    { q: { it: "Fare sesso 'solo per procreare' originariamente significava…", en: "'Having sex only to procreate' originally meant…" },
      options: { it: ["Far incarnare consapevolmente anime di alta levatura spirituale", "Reprimere il piacere per motivi morali", "Limitare la popolazione", "Obbedire a un dogma senza significato"], en: ["Consciously letting souls of high spiritual stature incarnate", "Repressing pleasure for moral reasons", "Limiting population", "Obeying a meaningless dogma"] }, correct: 0,
      note: { it: "«A seconda della levatura spirituale dei due che si univano, poteva nascere un'anima d'un tipo piuttosto che d'un altro.»", en: "'Depending on the spiritual stature of the two uniting, a soul of one kind or another could be born.'" } },
    { q: { it: "Il 'karma sessuale' di chi ha difficoltà sessuali indica…", en: "The 'sexual karma' of those with sexual difficulties indicates…" },
      options: { it: ["Un potenziale sessuale maggiore, mal utilizzato in vite passate", "Una punizione divina", "Mancanza di energia sessuale", "Cattiva sorte"], en: ["A greater sexual potential, misused in past lives", "A divine punishment", "Lack of sexual energy", "Bad luck"] }, correct: 0,
      note: { it: "«Le difficoltà sessuali si associano sempre a un grande potenziale sessuale. L'esistenza ti protegge.»", en: "'Sexual difficulties always come with great sexual potential. Existence protects you.'" } },
    { q: { it: "La vera libertà sessuale è…", en: "True sexual freedom is…" },
      options: { it: ["Libertà dai meccanismi psicologici di prestazione e giudizio", "Poter fare qualunque cosa si desideri", "Assenza di regole", "Libertinaggio sfrenato"], en: ["Freedom from the psychological mechanisms of performance and judgment", "Being able to do anything one wants", "The absence of rules", "Unbridled libertinage"] }, correct: 0,
      note: { it: "«La mia sessualità è libera quando non sono più costretto a pensare alle mie dimensioni e alla mia prestazione.»", en: "'My sexuality is free when I'm no longer forced to think about my size and performance.'" } },
    { q: { it: "Il giudizio sessuale è…", en: "Sexual judgment is…" },
      options: { it: ["La vera malattia psichica dei nostri tempi, all'origine di ogni paura sessuale", "Un difetto minore", "Una protezione naturale", "Irrilevante per la sessualità"], en: ["The true psychic disease of our times, at the root of every sexual fear", "A minor flaw", "A natural protection", "Irrelevant to sexuality"] }, correct: 0,
      note: { it: "«Uscire dal giudizio è una strada decisamente sottovalutata per giungere al risveglio spirituale.»", en: "'Getting out of judgment is a decidedly underrated path to spiritual awakening.'" } },
    { q: { it: "Le sacerdotesse torneranno perché…", en: "Priestesses will return because…" },
      options: { it: ["Stiamo entrando in un'era femminile: restaurazione dei Misteri", "La storia si ripete identica", "Lo dice la scienza", "Lo decidono i governi"], en: ["We are entering a feminine era: restoration of the Mysteries", "History repeats itself identically", "Science says so", "Governments decide it"] }, correct: 0,
      note: { it: "«Ciò che era sacro tornerà a essere sacro, ma su un'ottava superiore, con il Cuore.»", en: "'What was sacred will be sacred again, but on a higher octave, with the Heart.'" } },
    { q: { it: "Nella sessualità sacra, la penetrazione diventa…", en: "In sacred sexuality, penetration becomes…" },
      options: { it: ["L'aspetto meno importante rispetto a ciò che c'è intorno", "L'unico scopo del rapporto", "Un atto meccanico da perfezionare", "Irrilevante"], en: ["The least important aspect compared to what surrounds it", "The sole purpose of the relationship", "A mechanical act to perfect", "Irrelevant"] }, correct: 0,
      note: { it: "«Alla fine non ti ricordi neanche più cosa è successo: il momento dello sfregamento è passato in secondo piano.»", en: "'In the end you don't even remember what happened: the moment of rubbing faded into the background.'" } },
    { q: { it: "Il rapporto fra magia sessuale e apertura del Cuore è…", en: "The relationship between sexual magic and the opening of the Heart is…" },
      options: { it: ["Il Cuore si apre prima; la sessualità sacra ne è la conseguenza", "La sessualità sacra apre il Cuore", "Non hanno alcun rapporto", "Sono la stessa cosa"], en: ["The Heart opens first; sacred sexuality is the consequence", "Sacred sexuality opens the Heart", "They have no relationship", "They are the same thing"] }, correct: 0,
      note: { it: "«Non è mai possibile mettere il carro davanti ai buoi. Chi svolge ricordo di sé, non-giudizio, amore per i nemici… giunge naturalmente.»", en: "'You can never put the cart before the horse. He who practises self-remembering, non-judgment, love for enemies… arrives naturally.'" } },
    { q: { it: "I problemi sessuali (impotenza, eiaculazione precoce, ecc.) sono legati a…", en: "Sexual problems (impotence, premature ejaculation, etc.) are linked to…" },
      options: { it: ["Antiche pratiche magico-sessuali nelle incarnazioni passate", "Cattiva alimentazione", "Genetica difettosa", "Mancanza di esercizio fisico"], en: ["Ancient magical-sexual practices in past incarnations", "Poor diet", "Defective genetics", "Lack of physical exercise"] }, correct: 0,
      note: { it: "«L'esistenza mi protegge e fa in modo che impari a usare bene il mio strumento, prima di affidarmi uno strumento molto potente.»", en: "'Existence protects me and ensures I learn to use my instrument well, before entrusting me with a very powerful one.'" } }
  ];

  /* ---------- IV. MEMORIA: SACRO ↔ DEGENERAZIONE ---------- */
  const MEMORY = [
    { a: { it: "Prostituzione\nsacra", en: "Sacred\nprostitution" }, b: { it: "Iniziazione\nsessuale", en: "Sexual\ninitiation" } },
    { a: { it: "Confessione", en: "Confession" }, b: { it: "Terapia del\nsacerdote-guaritore", en: "Therapy of the\npriest-healer" } },
    { a: { it: "Fare sesso\nper procreare", en: "Sex for\nprocreation" }, b: { it: "Far incarnare\nanime elevate", en: "Letting elevated\nsouls incarnate" } },
    { a: { it: "Il pos-sesso", en: "Pos-session" }, b: { it: "Magia rossa:\nlegatura d'amore", en: "Red magic:\nlove binding" } },
    { a: { it: "La vera libertà\nsessuale", en: "True sexual\nfreedom" }, b: { it: "Libertà dal giudizio\ne dalla prestazione", en: "Freedom from judgment\nand performance" } },
    { a: { it: "La messa\nautentica", en: "The authentic\nmass" }, b: { it: "Trasmissione\neucaristica", en: "Eucharistic\ntransmission" } }
  ];

  const RINGS = [
    { key: "misteri", color: "#1a1326", ring: "#3a2f52", label: { it: "I Misteri", en: "The Mysteries" } },
    { key: "cuore", color: "#2a1410", ring: "#7c3a2a", label: { it: "Il Cuore", en: "The Heart" } },
    { key: "coppia", color: "#10212a", ring: "#2f5d6b", label: { it: "La Coppia", en: "The Couple" } },
    { key: "sacro", color: "#3a2c10", ring: "#c9973a", label: { it: "Il Sacro", en: "The Sacred" } }
  ];

  window.GAME_DATA = {
  id: "sess",
  modes: ["sacro","fasi","quiz","memoria"],
  rings: RINGS,
  modeDefs: {
    sacro: { type:"classify", roman:"I", glyph:"☉", optionKeys:[0,1], items: SACRO },
    fasi: { type:"scenario", roman:"II", glyph:"◐", optionKeys:[0,1,2], items: FASI },
    quiz: { type:"quiz", roman:"III", glyph:"✦", count:10, items: QUIZ },
    memoria: { type:"memory", roman:"IV", glyph:"✶", items: MEMORY }
  }
};
})();
