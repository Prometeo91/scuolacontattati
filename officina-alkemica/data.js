/* ============================================================
   OFFICINA ALKEMICA — dati di gioco bilingue (IT / EN)
   Fonte: Salvatore Brizzi, "Officina Alkemica.
   L'Alchimia come Via per la felicità incondizionata"
   Esposto come window.OA_DATA. Ogni voce è { it, en }.

   Modalità riprogettate dal contenuto reale del libro:
   I   La Legge dello Specchio   → Parte I  (Alch. Inferior)
   II  Personalità o Anima?      → Parte II (Alch. Inferior)
   III Inferior o Superior?      → struttura portante del libro
   IV  Quiz dell'Alchimista      → trasversale (tutte le parti)
   V   Memoria Alchemica         → corrispondenze
   ============================================================ */
(function () {
  "use strict";

  /* ---------- I. LA LEGGE DELLO SPECCHIO (scenari) ---------- */
  const SPECCHIO = [
    { sit: { it: "Un collega ti irrita profondamente per la sua arroganza: non lo sopporti.",
        en: "A colleague deeply irritates you with his arrogance: you can't stand him." },
      options: { it: ["Sta riflettendo un lato di me che ancora rifiuto", "È oggettivamente arrogante, e basta", "Devo solo evitarlo", "Il problema è solo suo"],
        en: ["He is mirroring a side of me I still reject", "He is objectively arrogant, full stop", "I just need to avoid him", "The problem is his alone"] }, correct: 0,
      note: { it: "Tutto ciò che nel mondo ci dà fastidio riflette i lati della nostra personalità che ancora non vogliamo accettare.",
        en: "Everything in the world that annoys us reflects the sides of our personality we do not yet want to accept." } },

    { sit: { it: "Ammiri molto la generosità di un'amica: ti commuove davvero.",
        en: "You greatly admire a friend's generosity: it truly moves you." },
      options: { it: ["Sta rispecchiando una qualità che ho già integrato in me", "Lei è speciale, io no", "È solo fortunata di carattere", "Non significa nulla"],
        en: ["It mirrors a quality I have already integrated in myself", "She is special, I'm not", "She's just lucky by nature", "It means nothing"] }, correct: 0,
      note: { it: "Ciò che ammiriamo nel mondo rispecchia aspetti di noi che abbiamo già integrato e che ci procurano belle sensazioni.",
        en: "What we admire in the world mirrors aspects of us we have already integrated, which give us good sensations." } },

    { sit: { it: "Ti rubano il portafogli e provi un forte disagio.",
        en: "Your wallet is stolen and you feel strong distress." },
      options: { it: ["Il disagio nasce dal senso del possesso che proietto sull'evento", "Mi è stato tolto qualcosa di mio per sempre", "Il mondo è ingiusto con me", "Devo solo arrabbiarmi di più"],
        en: ["The distress arises from the sense of possession I project on the event", "Something truly mine was taken forever", "The world is unfair to me", "I just need to get angrier"] }, correct: 0,
      note: { it: "«Nessuno può rubare qualcosa»: oggettivamente è solo materia che cambia posizione; è il senso del possesso a creare il furto e il dolore.",
        en: "'No one can steal anything': objectively it is only matter changing place; it is the sense of possession that creates the theft and the pain." } },

    { sit: { it: "Vorresti che il mondo intorno a te fosse migliore.",
        en: "You wish the world around you were better." },
      options: { it: ["Solo indagando me stesso posso cambiare il mondo", "Devo convincere gli altri a cambiare", "Il mondo è perduto", "Aspetto che cambi da solo"],
        en: ["Only by examining myself can I change the world", "I must persuade others to change", "The world is lost", "I wait for it to change on its own"] }, correct: 0,
      note: { it: "La realtà ci fa da specchio: vediamo solo ciò che siamo. Solo indagando noi stessi possiamo cambiare il mondo.",
        en: "Reality mirrors us: we see only what we are. Only by examining ourselves can we change the world." } },

    { sit: { it: "Una situazione ti appare semplicemente «brutta» e sbagliata.",
        en: "A situation simply looks 'ugly' and wrong to you." },
      options: { it: ["Sto osservando una caratteristica che è dentro di me", "È brutta indipendentemente da me", "Va eliminata e basta", "Non mi riguarda"],
        en: ["I am observing a trait that is within me", "It is ugly independently of me", "It just has to be removed", "It doesn't concern me"] }, correct: 0,
      note: { it: "Ogniqualvolta crediamo di vedere qualcosa di sbagliato all'esterno, stiamo osservando una caratteristica che in realtà si trova dentro di noi.",
        en: "Whenever we think we see something wrong outside, we are observing a trait that is in fact within us." } },

    { sit: { it: "Provi gelosia e senso di possesso verso il tuo partner.",
        en: "You feel jealousy and possessiveness toward your partner." },
      options: { it: ["Gelosia e possesso non fanno parte dell'amore", "Sono la prova del vero amore", "Sono inevitabili e giuste", "Vanno solo nascoste"],
        en: ["Jealousy and possession are not part of love", "They are proof of true love", "They are inevitable and right", "They just have to be hidden"] }, correct: 0,
      note: { it: "Si accede alla sacralità della coppia solo dopo che ogni istinto di gelosia e possesso è stato sradicato: essi non fanno parte dell'amore.",
        en: "One accesses the sacredness of the couple only after every instinct of jealousy and possession is uprooted: they are not part of love." } }
  ];

  /* ---------- II. PERSONALITÀ O ANIMA? (classifica) ---------- */
  // belongs: 0 = Personalità (macchina biologica), 1 = Anima
  const PERSONA_ANIMA = [
    { item: { it: "La mente razionale", en: "The rational mind" }, belongs: 0,
      note: { it: "La personalità conosce per mezzo della mente, delle sensazioni e delle emozioni.", en: "The personality knows through the mind, the senses and the emotions." } },
    { item: { it: "Il Cuore", en: "The Heart" }, belongs: 1,
      note: { it: "Il Cuore è l'organo di conoscenza dell'anima.", en: "The Heart is the soul's organ of knowledge." } },
    { item: { it: "Le sensazioni fisiche", en: "Physical sensations" }, belongs: 0,
      note: { it: "Appartengono all'apparato psicofisico, cioè alla macchina biologica.", en: "They belong to the psychophysical apparatus, the biological machine." } },
    { item: { it: "La compassione e il senso del Bello", en: "Compassion and the sense of Beauty" }, belongs: 1,
      note: { it: "Sono «emozioni superiori»: il corpo dell'anima è costituito di esse.", en: "They are 'higher emotions': the body of the soul is made of them." } },
    { item: { it: "Il senso del possesso", en: "The sense of possession" }, belongs: 0,
      note: { it: "È uno schema mentale radicato nella personalità.", en: "It is a mental pattern rooted in the personality." } },
    { item: { it: "La «tuta spaziale»", en: "The 'spacesuit'" }, belongs: 0,
      note: { it: "La personalità è la tuta: ci consente di muoverci, ma in sé non conosce nulla.", en: "The personality is the suit: it lets us move, but in itself knows nothing." } },
    { item: { it: "L'«astronauta» dentro la tuta", en: "The 'astronaut' inside the suit" }, belongs: 1,
      note: { it: "L'anima è l'astronauta: solo a chi sta dentro è dato di conoscere.", en: "The soul is the astronaut: only the one inside can truly know." } },
    { item: { it: "Ciò che è immortale in noi", en: "What is immortal in us" }, belongs: 1,
      note: { it: "L'anima vive; la personalità soltanto sopravvive ed è mortale.", en: "The soul lives; the personality merely survives and is mortal." } },
    { item: { it: "Le emozioni negative", en: "Negative emotions" }, belongs: 0,
      note: { it: "La macchina biologica è prevalentemente costituita di emozioni negative.", en: "The biological machine is mostly made of negative emotions." } }
  ];

  /* ---------- III. INFERIOR O SUPERIOR? (classifica) ---------- */
  // belongs: 0 = Alchimia Inferior, 1 = Alchimia Superior
  const INF_SUP = [
    { item: { it: "Trasmutare le emozioni negative partendo dalla sofferenza", en: "Transmuting negative emotions starting from suffering" }, belongs: 0,
      note: { it: "L'Alchimia Inferior lavora partendo dal disagio e dalla sofferenza per produrre emozioni superiori: il Veleno diventa Farmaco.", en: "Alchimia Inferior works starting from discomfort and suffering to produce higher emotions: the Poison becomes the Remedy." } },
    { item: { it: "L'«estasi estetica»: lasciarsi invadere dalla meraviglia della Bellezza", en: "'Aesthetic ecstasy': letting oneself be overrun by the wonder of Beauty" }, belongs: 1,
      note: { it: "Un'opera d'arte, una nuvola, gli occhi di chi ci chiede consiglio… la Bellezza apre il Cuore senza passare dalla sofferenza.", en: "A work of art, a cloud, the eyes of someone asking our advice… Beauty opens the Heart without passing through suffering." } },
    { item: { it: "Creare il «Testimone» disidentificandosi dalla macchina biologica", en: "Creating the 'Witness' by dis-identifying from the biological machine" }, belongs: 0,
      note: { it: "La Nigredo — l'Opera al Nero — è la prima fase dell'Alchimia Inferior: morte dell'identificazione con la personalità.", en: "The Nigredo — the Black Work — is the first phase of Alchimia Inferior: death of identification with the personality." } },
    { item: { it: "Il «Servizio» all'umanità: prendere la propria «croce»", en: "'Service' to humanity: taking up one's 'cross'" }, belongs: 1,
      note: { it: "Dedicarsi a uno scopo superiore — insegnamento, arte, guarigione — è via diretta verso il Cuore, senza bisogno di sofferenza.", en: "Devoting oneself to a higher purpose — teaching, art, healing — is a direct way to the Heart, with no need for suffering." } },
    { item: { it: "Contrastare i «castelli di rabbia»: il dialogo interno negativo", en: "Opposing the 'castles of anger': negative inner dialogue" }, belongs: 0,
      note: { it: "Accendere il «Fuoco» significa contrastare ogni dialogo interno che genera emozioni negative, dopo aver tratto l'utile dall'evento.", en: "Lighting the 'Fire' means opposing every inner dialogue that breeds negative emotions, after having drawn the lesson from the event." } },
    { item: { it: "Nutrirsi d'arte: pittura, musica, danza, teatro, poesia", en: "Nourishing oneself with art: painting, music, dance, theatre, poetry" }, belongs: 1,
      note: { it: "Produrre e fruire arte favorisce l'avvento delle emozioni superiori e l'apertura del Cuore: è Alchimia Superior.", en: "Producing and enjoying art fosters higher emotions and the opening of the Heart: this is Alchimia Superior." } },
    { item: { it: "La trasmutazione graduale: Piombo → Argento → Oro", en: "Gradual transmutation: Lead → Silver → Gold" }, belongs: 0,
      note: { it: "Piombo→Argento (Albedo) → Oro (Rubedo): è il percorso graduale dell'Opera attraverso le tre fasi.", en: "Lead → Silver (Albedo) → Gold (Rubedo): the gradual path of the Work through the three phases." } },
    { item: { it: "Cercare nel partner un «compagno di Via», senza possesso né gelosia", en: "Seeking a 'companion of the Way' in one's partner, without possession or jealousy" }, belongs: 1,
      note: { it: "La coppia sacra è aspetto dell'Alchimia Superior: l'amore non provoca MAI sofferenza; il possesso sì.", en: "The sacred couple is an aspect of Alchimia Superior: love NEVER causes suffering; possession does." } },
    { item: { it: "Usare concentrazione e visualizzazione per contattare l'anima", en: "Using concentration and visualisation to contact the soul" }, belongs: 0,
      note: { it: "Concentrazione e visualizzazione sono strumenti della Parte Terza dell'Alchimia Inferior: tecniche per la trasmutazione interiore.", en: "Concentration and visualisation are tools of Part Three of the Alchimia Inferior: techniques for inner transmutation." } },
    { item: { it: "Arruolarsi fra i Guerrieri dello Spirito: arte, insegnamento, guarigione", en: "Enlisting among the Warriors of the Spirit: art, teaching, healing" }, belongs: 1,
      note: { it: "Il Guerriero dello Spirito combatte con l'arte, l'insegnamento e la guarigione: è il massimo compimento dell'Alchimia Superior.", en: "The Warrior of the Spirit fights with art, teaching and healing: the highest fulfilment of Alchimia Superior." } }
  ];

  /* ---------- IV. QUIZ DELL'ALCHIMISTA (trasversale) ---------- */
  const QUIZ = [
    /* ── Parte I (Legge dello Specchio) ── */
    { q: { it: "«Ars Regia» è un altro nome di…", en: "'Ars Regia' is another name for…" },
      options: { it: ["L'Alchimia", "La meditazione zen", "Lo hatha yoga", "L'astrologia"], en: ["Alchemy", "Zen meditation", "Hatha yoga", "Astrology"] }, correct: 0,
      note: { it: "L'Alchimia, l'Arte Regale, fa capo alla Tradizione Ermetica occidentale.", en: "Alchemy, the Royal Art, belongs to the Western Hermetic Tradition." } },
    { q: { it: "Secondo la Legge dello Specchio, la realtà esteriore è…", en: "According to the Law of the Mirror, outer reality is…" },
      options: { it: ["Una proiezione che riflette ciò che siamo", "Del tutto indipendente da noi", "Un caso senza senso", "Creata dagli altri"], en: ["A projection mirroring what we are", "Entirely independent of us", "A meaningless accident", "Created by others"] }, correct: 0,
      note: { it: "Vediamo solo ciò che siamo: il mondo è costruito «a nostra immagine e somiglianza».", en: "We see only what we are: the world is built 'in our image and likeness'." } },
    { q: { it: "La domanda a cui, secondo il libro, tutte le domande conducono è…", en: "The question to which, per the book, all questions lead is…" },
      options: { it: ["«Come ottenere una felicità incondizionata?»", "«Quanto vivrò?»", "«Esiste Dio?»", "«Dov'è l'anima?»"], en: ["'How to obtain unconditional happiness?'", "'How long will I live?'", "'Does God exist?'", "'Where is the soul?'"] }, correct: 0,
      note: { it: "Qualunque cosa chiediamo, stiamo formulando solo questa domanda.", en: "Whatever we ask, we are only formulating this one question." } },

    /* ── Parte II (Personalità e Anima) ── */
    { q: { it: "Qual è l'organo di conoscenza dell'anima?", en: "What is the soul's organ of knowledge?" },
      options: { it: ["Il Cuore", "La mente", "Gli occhi", "Il cervello"], en: ["The Heart", "The mind", "The eyes", "The brain"] }, correct: 0,
      note: { it: "Con la mente restiamo nell'illusione; col Cuore la coscienza si apre alla realtà oltre le apparenze.", en: "With the mind we stay in illusion; with the Heart consciousness opens to reality beyond appearances." } },
    { q: { it: "La personalità, in psicologia, è…", en: "The personality, in psychology, is…" },
      options: { it: ["Una macchina biologica: pensieri, emozioni e carne", "L'essenza immortale dell'uomo", "Il Cuore", "Lo Spirito"], en: ["A biological machine: thoughts, emotions and flesh", "The immortal essence of man", "The Heart", "The Spirit"] }, correct: 0,
      note: { it: "L'uomo è un'anima che occupa per un certo tempo una personalità — la sua «tuta spaziale».", en: "Man is a soul that for a time inhabits a personality — his 'spacesuit'." } },

    /* ── Parte III (Contattare l'anima / Trasmutazione) ── */
    { q: { it: "Noi proviamo emozioni negative perché…", en: "We feel negative emotions because…" },
      options: { it: ["Le giustifichiamo con ragionamenti intellettuali", "Sono reazioni volontarie", "Sono dettate dall'anima", "Non hanno alcuna causa"], en: ["We justify them through intellectual reasoning", "They are voluntary reactions", "They are dictated by the soul", "They have no cause"] }, correct: 0,
      note: { it: "Nessuno si arrabbia volontariamente: le emozioni negative sono reazioni meccaniche che giustifichiamo dall'inconscio.", en: "No one gets angry voluntarily: negative emotions are mechanical reactions we justify from the unconscious." } },
    { q: { it: "Trasmutare significa mutare ciò che è «infero» in ciò che è…", en: "To transmute means turning what is 'infernal' into what is…" },
      options: { it: ["Angelico (superiore)", "Invisibile", "Materiale", "Definitivo"], en: ["Angelic (higher)", "Invisible", "Material", "Final"] }, correct: 0,
      note: { it: "La trasmutazione dell'inferiore nel superiore è il cuore dell'Opera al Bianco.", en: "Transmuting the lower into the higher is the heart of the White Work." } },
    { q: { it: "Il nucleo centrale dell'Opera alchemica (fase Albedo) è…", en: "The central core of the alchemical Work (Albedo phase) is…" },
      options: { it: ["Trasmutare le emozioni negative in emozioni superiori", "Accumulare conoscenze esoteriche", "Distruggere la personalità", "Fuggire dalla materia"], en: ["Transmuting negative emotions into higher emotions", "Accumulating esoteric knowledge", "Destroying the personality", "Fleeing from matter"] }, correct: 0,
      note: { it: "Il Veleno diventa Farmaco: rabbia→beatitudine, paura→serenità, gelosia→gioia.", en: "Poison becomes Remedy: anger → bliss, fear → serenity, jealousy → joy." } },

    /* ── Parte IV (Le tre fasi dell'Opera) ── */
    { q: { it: "Le tre fasi dell'Opera, in ordine, sono…", en: "The three phases of the Work, in order, are…" },
      options: { it: ["Nigredo, Albedo, Rubedo", "Albedo, Rubedo, Nigredo", "Rubedo, Nigredo, Albedo", "Solve, Coagula, Ignis"], en: ["Nigredo, Albedo, Rubedo", "Albedo, Rubedo, Nigredo", "Rubedo, Nigredo, Albedo", "Solve, Coagula, Ignis"] }, correct: 0,
      note: { it: "Opera al Nero, al Bianco, al Rosso — pur sovrapponendosi nel cammino.", en: "Black, White and Red Work — though they overlap along the path." } },
    { q: { it: "La sequenza dei metalli nella trasmutazione è…", en: "The sequence of metals in the transmutation is…" },
      options: { it: ["Piombo → Argento → Oro", "Oro → Argento → Piombo", "Ferro → Rame → Oro", "Argento → Piombo → Oro"], en: ["Lead → Silver → Gold", "Gold → Silver → Lead", "Iron → Copper → Gold", "Silver → Lead → Gold"] }, correct: 0,
      note: { it: "Il Piombo diventa Argento con l'Albedo, e l'Argento diventa Oro con il Rubedo.", en: "Lead becomes Silver with the Albedo, and Silver becomes Gold with the Rubedo." } },
    { q: { it: "Il fine ultimo dell'Opera al Rosso è…", en: "The ultimate aim of the Red Work is…" },
      options: { it: ["L'unificazione di spirito e materia nell'Uno", "Sopravvivere alla morte fisica", "Acquisire poteri psichici", "Reprimere le emozioni"], en: ["The unification of spirit and matter in the One", "Surviving physical death", "Gaining psychic powers", "Repressing emotions"] }, correct: 0,
      note: { it: "Il Sé si scioglie nell'Uno incondizionato: è la Grande Opera.", en: "The Self dissolves into the unconditioned One: it is the Great Work." } },
    { q: { it: "Nella Nigredo (Opera al Nero) si costruisce…", en: "In the Nigredo (Black Work) one builds…" },
      options: { it: ["Il «Testimone»", "Il corpo di gloria", "L'Oro", "Il senso del possesso"], en: ["The 'Witness'", "The body of glory", "The Gold", "The sense of possession"] }, correct: 0,
      note: { it: "La disidentificazione progressiva dalle reazioni emotive della personalità crea il Testimone.", en: "The gradual dis-identification from the personality's emotional reactions creates the Witness." } },

    /* ── Parte V (Il Testimone ci salva) ── */
    { q: { it: "L'Alchimia Superior è detta anche…", en: "Alchimia Superior is also called…" },
      options: { it: ["Ars brevis", "Ars longa", "Opera al Nero", "Nigredo"], en: ["Ars brevis", "Ars longa", "Black Work", "Nigredo"] }, correct: 0,
      note: { it: "Apre il Cuore tramite l'arte («estasi estetica») e il servizio, senza passare dalla sofferenza.", en: "It opens the Heart through art ('aesthetic ecstasy') and service, without passing through suffering." } },

    /* ── Alchimia Superior ── */
    { q: { it: "Cos'è la «via dell'estasi estetica»?", en: "What is the 'way of aesthetic ecstasy'?" },
      options: { it: ["L'apertura del Cuore di fronte alla Bellezza", "Una tecnica di repressione", "Un esercizio di logica", "Una dieta alchemica"], en: ["The opening of the Heart before Beauty", "A technique of repression", "A logic exercise", "An alchemical diet"] }, correct: 0,
      note: { it: "La meraviglia di fronte alla Bellezza ci collega direttamente al «Regno dei Cieli».", en: "Wonder before Beauty connects us directly to the 'Kingdom of Heaven'." } },
    { q: { it: "Tutte le nostre sofferenze derivano da…", en: "All our suffering stems from…" },
      options: { it: ["L'aridità del Cuore, la sua mancata apertura", "Eventi esterni sfavorevoli", "La cattiva sorte", "L'azione degli altri"], en: ["The dryness of the Heart, its failure to open", "Unfavourable external events", "Bad luck", "The actions of others"] }, correct: 0,
      note: { it: "Nessuna difficoltà ha la sua fonte all'esterno di noi: ogni problema origina dalla «durezza» del Cuore.", en: "No difficulty has its source outside us: every problem originates from the 'hardness' of the Heart." } },
    { q: { it: "Gelosia e senso del possesso, secondo Brizzi…", en: "Jealousy and the sense of possession, according to Brizzi…" },
      options: { it: ["Non fanno parte dell'amore", "Sono la prova dell'amore", "Sono virtù da coltivare", "Rendono sacra la coppia"], en: ["Are not part of love", "Are proof of love", "Are virtues to cultivate", "Make the couple sacred"] }, correct: 0,
      note: { it: "La coppia diventa sacra solo dopo aver sradicato ogni gelosia e possesso.", en: "The couple becomes sacred only after every jealousy and possession is uprooted." } },
    { q: { it: "L'alchimista cerca nel partner…", en: "The alchemist seeks in a partner…" },
      options: { it: ["Un «compagno di Via»", "Qualcuno da possedere", "Un discepolo devoto", "Un rifugio dal mondo"], en: ["A 'companion of the Way'", "Someone to possess", "A devoted disciple", "A refuge from the world"] }, correct: 0,
      note: { it: "I due devono sospingersi a vicenda verso propositi sempre più elevati, senza gelosia né insicurezze.", en: "The two must push each other toward ever loftier aims, without jealousy or insecurity." } },
    { q: { it: "Il Fuoco dell'Alchimia Superior proviene da…", en: "The Fire of Alchimia Superior comes from…" },
      options: { it: ["Un contatto immediato con il Regno dei Cieli", "L'attrito con la macchina biologica", "Un rituale esteriore", "La sofferenza accumulata"], en: ["An immediate contact with the Kingdom of Heaven", "Friction with the biological machine", "An outward ritual", "Accumulated suffering"] }, correct: 0,
      note: { it: "A differenza dell'Inferior (attrito), il Fuoco Superior discende dallo Spirito perché siamo identificati con l'anima.", en: "Unlike the Inferior (friction), the Superior Fire descends from the Spirit because we are identified with the soul." } },
    { q: { it: "I Guerrieri dello Spirito combattono con…", en: "The Warriors of the Spirit fight with…" },
      options: { it: ["Arte, insegnamento e guarigione", "Spade e scudi", "Rabbia e vendetta", "Manipolazione e inganno"], en: ["Art, teaching and healing", "Swords and shields", "Anger and revenge", "Manipulation and deceit"] }, correct: 0,
      note: { it: "L'alchimista è un Guerriero che combatte affinché il dolore dell'umanità schiava dell'illusione venga alleviato.", en: "The alchemist is a Warrior who fights so that the pain of humanity enslaved by illusion may be eased." } }
  ];

  /* ---------- V. MEMORIA ALCHEMICA (coppie) ---------- */
  const MEMORY = [
    { a: { it: "Nigredo", en: "Nigredo" }, b: { it: "Opera al Nero", en: "Black Work" } },
    { a: { it: "Albedo", en: "Albedo" }, b: { it: "Opera al Bianco", en: "White Work" } },
    { a: { it: "Rubedo", en: "Rubedo" }, b: { it: "Opera al Rosso", en: "Red Work" } },
    { a: { it: "Personalità", en: "Personality" }, b: { it: "Tuta spaziale", en: "Spacesuit" } },
    { a: { it: "Anima", en: "Soul" }, b: { it: "Astronauta", en: "Astronaut" } },
    { a: { it: "Cuore", en: "Heart" }, b: { it: "Organo dell'anima", en: "Organ of the soul" } }
  ];

  /* ---------- LE TRE FASI (per il diagramma di apertura) ---------- */
  const PHASES = [
    { key: "nigredo", color: "#15110c", ring: "#3a342a", label: { it: "Nigredo", en: "Nigredo" } },
    { key: "albedo", color: "#d8d2c4", ring: "#efe9dc", label: { it: "Albedo", en: "Albedo" } },
    { key: "rubedo", color: "#7c1d1d", ring: "#c0392b", label: { it: "Rubedo", en: "Rubedo" } }
  ];

  window.OA_DATA = { SPECCHIO, PERSONA_ANIMA, INF_SUP, QUIZ, MEMORY, PHASES };
})();
