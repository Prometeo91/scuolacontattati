/* ============================================================
   RISVEGLIO — dati di gioco bilingue (IT / EN)
   Fonte: Salvatore Brizzi, "Risveglio.
   Con gli esercizi delle Antiche Scuole Esoteriche" (Anima Ed.)
   Vol. 3 della Trilogia della Trasmutazione.
   Esposto come window.RI_DATA.

   Modalità dal contenuto reale del libro (25 lezioni):
   I   Sonno o Risveglio?       → Lezioni I–V
   II  Quale Ostacolo?          → Lezioni IX–XI
   III Quale Legge?             → Lezioni XII–XV
   IV  Quiz del Risveglio       → tutte le 25 lezioni
   V   Memoria dei Corpi Sottili → Lezione XXIII
   ============================================================ */
(function () {
  "use strict";

  /* ---------- I. SONNO O RISVEGLIO? (Lezioni I–V — classifica) ---------- */
  // belongs: 0 = Sonno (addormentamento/meccanicità), 1 = Risveglio (ricordo di sé)
  const STATO = [
    { item: { it: "Reagire meccanicamente a uno stimolo esterno", en: "Reacting mechanically to an external stimulus" }, belongs: 0,
      note: { it: "La personalità è una macchina biologica che re-agisce: non scegliamo noi di arrabbiarci o di avere paura.", en: "The personality is a biological machine that re-acts: we don't choose to get angry or feel afraid." } },
    { item: { it: "Osservarsi nel qui-e-ora mentre si agisce", en: "Observing oneself in the here-and-now while acting" }, belongs: 1,
      note: { it: "È il ricordo di sé: l'«attenzione divisa» — parte dell'attenzione su di sé, parte sull'azione.", en: "This is self-remembering: 'divided attention' — part of the attention on oneself, part on the action." } },
    { item: { it: "Interpretare i fatti secondo la propria allucinazione mentale", en: "Interpreting facts according to one's own mental hallucination" }, belongs: 0,
      note: { it: "Nell'addormentamento ognuno vive chiuso nel suo mondo, come dentro un sogno.", en: "In sleep everyone lives shut in his own world, as in a dream." } },
    { item: { it: "Il «testimone» che osserva senza giudicare", en: "The 'witness' that observes without judging" }, belongs: 1,
      note: { it: "L'Io osservatore è pura presenza distaccata: non interferisce, guarda e basta.", en: "The observing I is pure detached presence: it doesn't interfere, it just watches." } },
    { item: { it: "Credere di possedere libero arbitrio senza mai averlo verificato", en: "Believing one has free will without ever having verified it" }, belongs: 0,
      note: { it: "Se anche in una sola occasione le nostre emozioni ci hanno tradito, non possediamo libero arbitrio.", en: "If even once our emotions betrayed us, we do not possess free will." } },
    { item: { it: "Il «sonno verticale» scambiato per vera veglia", en: "'Vertical sleep' mistaken for true wakefulness" }, belongs: 0,
      note: { it: "La cosiddetta veglia è in realtà il terzo stato di sonno: non la veglia reale.", en: "So-called wakefulness is actually the third state of sleep: not real waking." } },
    { item: { it: "Creare un «centro di gravità permanente» dedicato al Lavoro", en: "Creating a 'permanent centre of gravity' dedicated to the Work" }, belongs: 1,
      note: { it: "È il passaggio da uomo 1-2-3 a uomo n. 4: la ferma decisione di dedicare la vita al Lavoro su di sé.", en: "It is the passage from man 1-2-3 to man no. 4: the firm decision to devote life to the Work on oneself." } },
    { item: { it: "Vivere nel dialogo interno senza rendersene conto", en: "Living in inner dialogue without realising it" }, belongs: 0,
      note: { it: "La mente fantastica senza controllo: veniamo letteralmente «pensati» dai nostri pensieri.", en: "The mind fantasises without control: we are literally 'thought' by our own thoughts." } },
    { item: { it: "L'apertura del Cuore e la percezione della Bellezza ovunque", en: "The opening of the Heart and the perception of Beauty everywhere" }, belongs: 1,
      note: { it: "È lo stato dell'uomo n. 5: vive in un costante innamoramento verso la vita.", en: "This is the state of man no. 5: he lives in constant falling-in-love with life." } },
    { item: { it: "Un io che prende decisioni e un altro io che le dimentica", en: "One 'I' that makes decisions and another 'I' that forgets them" }, belongs: 0,
      note: { it: "Non siamo «uno» ma «tanti»: ogni io crede di essere l'unico esistente.", en: "We are not 'one' but 'many': each I believes it is the only one." } }
  ];

  /* ---------- II. QUALE OSTACOLO? (Lezioni IX–XI — scenari) ---------- */
  // correct: 0=Identificazione, 1=Immaginazione negativa, 2=Emozione negativa
  const OSTACOLI = [
    { sit: { it: "Sei così preso dal tuo ruolo di «avvocato» che non riesci a comportarti diversamente nemmeno in famiglia.",
        en: "You are so absorbed in your role as 'lawyer' that you can't behave differently even at home." },
      correct: 0,
      note: { it: "Identificazione col ruolo sociale: crediamo di essere il nostro mestiere e agiamo di conseguenza.", en: "Identification with the social role: we believe we are our job and act accordingly." } },
    { sit: { it: "Prima di un colloquio immagini tutti i modi in cui potrebbe andare male.",
        en: "Before a job interview you imagine all the ways it could go wrong." },
      correct: 1,
      note: { it: "Immaginazione negativa: la mente ipotizza le conseguenze peggiori perché è programmata per la sopravvivenza.", en: "Negative imagination: the mind hypothesises the worst outcomes because it is programmed for survival." } },
    { sit: { it: "Qualcuno ti taglia la strada e senti montare una rabbia incontrollabile.",
        en: "Someone cuts you off in traffic and you feel uncontrollable anger rising." },
      correct: 2,
      note: { it: "Emozione negativa giustificata: crediamo che la causa sia esterna, quando è nel nostro apparato psicofisico.", en: "Justified negative emotion: we believe the cause is external, when it lies in our psychophysical apparatus." } },
    { sit: { it: "Ti arrabbi con il partner perché ha toccato «le tue cose».",
        en: "You get angry at your partner because they touched 'your things'." },
      correct: 0,
      note: { it: "Identificazione col senso del possesso: «nessuno può rubare qualcosa» — è solo materia che cambia posizione.", en: "Identification with the sense of possession: 'no one can steal anything' — it is only matter changing place." } },
    { sit: { it: "La sera prima di dormire un pensiero ossessivo su un problema di lavoro ti impedisce di prendere sonno.",
        en: "The evening before sleep an obsessive thought about a work problem keeps you awake." },
      correct: 1,
      note: { it: "Immaginazione negativa al suo massimo: quando l'attenzione cala, il dialogo interno prende il sopravvento.", en: "Negative imagination at its peak: when attention drops, inner dialogue takes over." } },
    { sit: { it: "Provi gelosia bruciante e desiderio di vendetta verso chi ha sedotto il tuo partner.",
        en: "You feel burning jealousy and desire for revenge toward whoever seduced your partner." },
      correct: 2,
      note: { it: "Emozione negativa: gelosia e vendetta sono reazioni meccaniche che ci fanno perdere energia.", en: "Negative emotion: jealousy and revenge are mechanical reactions that drain our energy." } },
    { sit: { it: "Fantastichiamo di incontrare la star dei nostri sogni e di vivere una storia d'amore perfetta.",
        en: "We daydream about meeting our dream celebrity and living a perfect love story." },
      correct: 1,
      note: { it: "Anche le fantasticherie positive sono immaginazione negativa: sogniamo a occhi aperti anziché vivere il presente.", en: "Even positive daydreams are negative imagination: we dream with eyes open instead of living the present." } },
    { sit: { it: "Ti presenti a un esame e invece del solo centro intellettuale, si intromette quello emotivo con ansia e paura.",
        en: "You sit for an exam and instead of the intellectual centre alone, the emotional one intrudes with anxiety and fear." },
      correct: 0,
      note: { it: "Identificazione: nella «casa senza padrone» risponde il servo sbagliato. Ansia e paura non servono all'esame.", en: "Identification: in the 'house without a master' the wrong servant answers. Anxiety and fear don't help at an exam." } },
    { sit: { it: "Un gruppo di tifosi arrabbiati allo stadio ti contagia e anche tu inizi a inveire — contro tutt'altro.",
        en: "A group of angry fans at the stadium infects you and you too start ranting — about something else entirely." },
      correct: 2,
      note: { it: "Le emozioni negative non ci appartengono: la vibrazione è la stessa, ma assume forme diverse in persone diverse.", en: "Negative emotions don't belong to us: the vibration is the same, but takes different forms in different people." } }
  ];

  /* ---------- III. QUALE LEGGE? (Lezioni XII–XV — scenari) ---------- */
  // correct: 0=Ottava, 1=Risonanza, 2=Specchio, 3=Non-giudizio
  const LEGGI = [
    { sit: { it: "Inizi un progetto con entusiasmo, ma dopo qualche settimana l'energia cala e lo abbandoni.",
        en: "You start a project with enthusiasm, but after a few weeks the energy drops and you abandon it." },
      correct: 0,
      note: { it: "Legge dell'Ottava: fra MI e FA c'è un intervallo dove l'energia rallenta. Serve uno «shock» esterno per proseguire.", en: "Law of the Octave: between MI and FA there is an interval where energy slows. An external 'shock' is needed to continue." } },
    { sit: { it: "Ti lamenti del tuo posto di lavoro, ma non riesci mai a cambiarlo.",
        en: "You complain about your job, but never manage to change it." },
      correct: 1,
      note: { it: "Legge di Risonanza: attiriamo inconsciamente la realtà più utile alla nostra evoluzione. Siamo sempre nel posto migliore.", en: "Law of Resonance: we unconsciously attract the reality most useful to our evolution. We are always in the best place." } },
    { sit: { it: "L'arroganza di un collega ti irrita in modo sproporzionato.",
        en: "A colleague's arrogance irritates you out of all proportion." },
      correct: 2,
      note: { it: "Legge dello Specchio: ciò che ci dà fastidio riflette un lato di noi che rifiutiamo.", en: "Law of the Mirror: what annoys us reflects a side of ourselves we reject." } },
    { sit: { it: "Critichi il modo di vestire di qualcuno e poi ti senti giudicato quando devi vestirti per un'occasione.",
        en: "You criticise someone's way of dressing and then feel judged when you must dress for an occasion." },
      correct: 3,
      note: { it: "Non-giudizio: giudizio verso altri e verso noi stessi sono le due facce della stessa medaglia.", en: "Non-judgment: judgment toward others and toward ourselves are two sides of the same coin." } },
    { sit: { it: "Provi pietà per una persona disabile; il Cuore aperto proverebbe compassione.",
        en: "You feel pity for a disabled person; the open Heart would feel compassion." },
      correct: 0,
      note: { it: "Legge dell'Ottava: pietà e compassione sono la stessa nota su due ottave diverse — personalità e anima.", en: "Law of the Octave: pity and compassion are the same note on two different octaves — personality and soul." } },
    { sit: { it: "Dopo aver cambiato interiormente, noti che anche le persone intorno a te cambiano.",
        en: "After changing inwardly, you notice the people around you change too." },
      correct: 1,
      note: { it: "Legge di Risonanza: nella misura in cui cambiamo, cambiano anche persone e luoghi che attiriamo.", en: "Law of Resonance: to the degree we change, the people and places we attract change too." } },
    { sit: { it: "Vedi un difetto «oggettivo» nel mondo, ma in realtà stai osservando qualcosa che è dentro di te.",
        en: "You see an 'objective' flaw in the world, but actually you are observing something within yourself." },
      correct: 2,
      note: { it: "Legge dello Specchio: la realtà ci fa da specchio — vediamo solo ciò che siamo.", en: "Law of the Mirror: reality mirrors us — we see only what we are." } },
    { sit: { it: "Giudichi «ricco» qualcuno e automaticamente crei dentro di te il polo della povertà.",
        en: "You judge someone 'rich' and automatically create within yourself the pole of poverty." },
      correct: 3,
      note: { it: "Non-giudizio: il positivo crea il negativo. Finché si resta nella personalità duale, non c'è via d'uscita.", en: "Non-judgment: the positive creates the negative. As long as one stays in the dual personality, there is no way out." } },
    { sit: { it: "La Terra sta per passare a un'ottava superiore: il cosiddetto «balzo quantico».",
        en: "The Earth is about to shift to a higher octave: the so-called 'quantum leap'." },
      correct: 0,
      note: { it: "Legge dell'Ottava: anche i pianeti si muovono lungo ottave — ghiaccio/acqua/vapore, discepolo/iniziato/maestro.", en: "Law of the Octave: planets too move along octaves — ice/water/steam, disciple/initiate/master." } }
  ];

  /* ---------- IV. QUIZ DEL RISVEGLIO (trasversale — tutte le 25 lezioni) ---------- */
  const QUIZ = [
    /* Lez. I */
    { q: { it: "Quanti sono gli stati di coscienza secondo il libro?", en: "How many states of consciousness does the book describe?" },
      options: { it: ["Quattro", "Due", "Tre", "Sette"], en: ["Four", "Two", "Three", "Seven"] }, correct: 0,
      note: { it: "Sonno profondo, sogno, sonno verticale (la falsa veglia) e veglia reale (risveglio).", en: "Deep sleep, dream, vertical sleep (false waking) and real wakefulness (awakening)." } },
    /* Lez. II */
    { q: { it: "La personalità, secondo Brizzi, è…", en: "The personality, according to Brizzi, is…" },
      options: { it: ["Una macchina biologica che re-agisce", "L'anima immortale", "Il Cuore aperto", "Lo Spirito"], en: ["A biological machine that re-acts", "The immortal soul", "The open Heart", "The Spirit"] }, correct: 0,
      note: { it: "Re-agiamo a seconda della struttura psichica formatasi durante la gestazione e la prima infanzia.", en: "We re-act according to the psychic structure formed during gestation and early childhood." } },
    /* Lez. III */
    { q: { it: "Il ricordo di sé, nell'Alchimia, è chiamato…", en: "Self-remembering, in Alchemy, is called…" },
      options: { it: ["Il «fuoco lento», l'«agente universale»", "La pietra filosofale", "L'acqua corrosiva", "Il solve et coagula"], en: ["The 'slow fire', the 'universal agent'", "The philosopher's stone", "The corrosive water", "The solve et coagula"] }, correct: 0,
      note: { it: "È il «regime» a cui la materia della personalità deve essere sottoposta per la trasmutazione.", en: "It is the 'regime' to which the matter of the personality must be subjected for transmutation." } },
    /* Lez. IV */
    { q: { it: "Nella metafora della «casa senza padrone», i servi rappresentano…", en: "In the metaphor of the 'house without a master', the servants represent…" },
      options: { it: ["I diversi «io» che agiscono senza coordinamento", "I corpi sottili", "Le emozioni superiori", "I pianeti"], en: ["The different 'I's that act without coordination", "The subtle bodies", "The higher emotions", "The planets"] }, correct: 0,
      note: { it: "Ogni «io» crede di essere l'unico e prende decisioni per la totalità.", en: "Each 'I' believes it is the only one and makes decisions for the whole." } },
    /* Lez. V */
    { q: { it: "L'Io osservatore (il «testimone») NON deve…", en: "The observing I (the 'witness') must NOT…" },
      options: { it: ["Giudicare ciò che osserva", "Osservare la rabbia", "Osservare la felicità", "Restare presente"], en: ["Judge what it observes", "Observe anger", "Observe happiness", "Remain present"] }, correct: 0,
      note: { it: "Se giudichiamo, non guardiamo col testimone ma con un «io» della personalità: rischio di scissione.", en: "If we judge, we don't look with the witness but with a personality 'I': risk of splitting." } },
    /* Lez. VI */
    { q: { it: "L'uomo numero 5, secondo le 7 categorie, ha…", en: "Man number 5, per the 7 categories, has…" },
      options: { it: ["Aperto il Cuore e ottenuto l'immortalità", "Solo studiato molto", "Aperto il centro intellettuale superiore", "Ancora tutti i centri addormentati"], en: ["Opened the Heart and obtained immortality", "Only studied a lot", "Opened the higher intellectual centre", "Still all centres asleep"] }, correct: 0,
      note: { it: "Vive in costante innamoramento verso la vita: vede la Bellezza ovunque.", en: "He lives in constant falling-in-love with life: he sees Beauty everywhere." } },
    /* Lez. VII */
    { q: { it: "Il ciclo dell'evoluzione prevede…", en: "The cycle of evolution involves…" },
      options: { it: ["Discesa nella materia, poi risalita verso lo Spirito", "Solo discesa nella materia", "Solo risalita", "Un cerchio senza fine"], en: ["Descent into matter, then ascent toward Spirit", "Only descent into matter", "Only ascent", "An endless circle"] }, correct: 0,
      note: { it: "Nella discesa acquisiamo autocoscienza; nella risalita torniamo allo Spirito con la coscienza conquistata.", en: "In the descent we acquire self-awareness; in the ascent we return to Spirit with the consciousness gained." } },
    /* Lez. IX */
    { q: { it: "L'identificazione è utile perché…", en: "Identification is useful because…" },
      options: { it: ["Ci permette di costruire un'identità individuale", "Ci risveglia", "Apre il Cuore", "Ci collega all'anima"], en: ["It lets us build an individual identity", "It awakens us", "It opens the Heart", "It connects us to the soul"] }, correct: 0,
      note: { it: "Nella fase discendente serve ad affermare: «Io sono qualcuno» — ma poi va trascesa.", en: "In the descending phase it serves to affirm: 'I am someone' — but then it must be transcended." } },
    /* Lez. X */
    { q: { it: "L'immaginazione negativa comprende anche…", en: "Negative imagination also includes…" },
      options: { it: ["Le fantasticherie positive (sognare a occhi aperti)", "La visualizzazione concentrata", "La riflessione scientifica", "L'osservazione distaccata"], en: ["Positive daydreams (daydreaming)", "Concentrated visualisation", "Scientific reflection", "Detached observation"] }, correct: 0,
      note: { it: "Anche fantasticare del Mulino Bianco è immaginazione negativa: subiamo i pensieri passivamente.", en: "Even daydreaming about a perfect family is negative imagination: we passively undergo thoughts." } },
    /* Lez. XI */
    { q: { it: "Le emozioni negative si chiamano «negative» perché…", en: "Negative emotions are called 'negative' because…" },
      options: { it: ["Sono l'altra faccia delle superiori, come numeri negativi", "Sono sbagliate", "Vanno represse", "Non esistono davvero"], en: ["They are the other face of higher ones, like negative numbers", "They are wrong", "They must be repressed", "They don't really exist"] }, correct: 0,
      note: { it: "Sono il Piombo da trasmutare in Oro: preziose, non sbagliate.", en: "They are the Lead to be transmuted into Gold: precious, not wrong." } },
    /* Lez. XII */
    { q: { it: "Nella Legge dell'Ottava, gli intervalli dove l'energia rallenta si trovano fra…", en: "In the Law of the Octave, the intervals where energy slows are between…" },
      options: { it: ["MI–FA e SI–DO", "DO–RE e FA–SOL", "RE–MI e LA–SI", "SOL–LA e DO–RE"], en: ["MI–FA and SI–DO", "DO–RE and FA–SOL", "RE–MI and LA–SI", "SOL–LA and DO–RE"] }, correct: 0,
      note: { it: "Come sulla tastiera del pianoforte: fra MI-FA e SI-DO non c'è il tasto nero (semitono).", en: "As on the piano keyboard: between MI-FA and SI-DO there is no black key (semitone)." } },
    /* Lez. XIII */
    { q: { it: "Il «pensiero verticale» è…", en: "'Vertical thinking' is…" },
      options: { it: ["La capacità di cogliere il significato simbolico oltre l'apparenza", "Il pensiero logico-razionale", "Il dialogo interno", "L'immaginazione negativa"], en: ["The ability to grasp symbolic meaning beyond appearance", "Logical-rational thinking", "Inner dialogue", "Negative imagination"] }, correct: 0,
      note: { it: "La realtà parla per simboli: il pensiero simbolico coglie la Verità nascosta.", en: "Reality speaks through symbols: symbolic thinking grasps the hidden Truth." } },
    /* Lez. XIV */
    { q: { it: "Secondo la Legge di Risonanza, siamo sul pianeta sbagliato?", en: "According to the Law of Resonance, are we on the wrong planet?" },
      options: { it: ["Mai: la Terra è sempre il posto migliore per la nostra evoluzione", "Sì, dovremmo essere altrove", "Solo i risvegliati sono nel posto giusto", "Dipende dal karma"], en: ["Never: the Earth is always the best place for our evolution", "Yes, we should be elsewhere", "Only the awakened are in the right place", "It depends on karma"] }, correct: 0,
      note: { it: "Chi si lamenta del pianeta è anche chi ne ha più bisogno per la propria evoluzione.", en: "Whoever complains about the planet is also the one who most needs it for their evolution." } },
    /* Lez. XVII */
    { q: { it: "La mente funziona in maniera…", en: "The mind works in a…" },
      options: { it: ["Duale, come un processo binario (on/off)", "Unitaria e sintetica", "Casuale e imprevedibile", "Sempre intuitiva"], en: ["Dual way, like a binary process (on/off)", "Unitary and synthetic way", "Random and unpredictable way", "Always intuitive way"] }, correct: 0,
      note: { it: "Buono/cattivo, caldo/freddo, giusto/sbagliato: la mente conosce solo attraverso gli opposti.", en: "Good/bad, hot/cold, right/wrong: the mind knows only through opposites." } },
    /* Lez. XVIII */
    { q: { it: "Per uscire dalla dualità bisogna…", en: "To exit duality one must…" },
      options: { it: ["Identificarsi con l'anima e guardare dal Cuore", "Pensare più forte", "Scegliere sempre il polo positivo", "Eliminare la mente"], en: ["Identify with the soul and look from the Heart", "Think harder", "Always choose the positive pole", "Eliminate the mind"] }, correct: 0,
      note: { it: "Il Cuore sintetizza e intuisce la perfezione di tutto ciò che accade.", en: "The Heart synthesises and intuits the perfection of all that happens." } },
    /* Lez. XX */
    { q: { it: "Le emozioni superiori sono GRATUITE, il che significa che…", en: "Higher emotions are GRATUITOUS, meaning…" },
      options: { it: ["Non vogliamo niente in cambio", "Non costano nulla", "Sono superficiali", "Durano poco"], en: ["We want nothing in return", "They cost nothing", "They are superficial", "They don't last"] }, correct: 0,
      note: { it: "Amiamo anche senza essere ricambiati; siamo amici anche di chi non è nostro amico.", en: "We love even without being loved back; we are friends even of those who are not our friends." } },
    /* Lez. XXII */
    { q: { it: "La «coppia essenziale», a differenza della convenzionale, è basata su…", en: "The 'essential couple', unlike the conventional, is based on…" },
      options: { it: ["La crescita reciproca verso l'anima", "Il calcolo economico", "Il sentimentalismo", "Il possesso reciproco"], en: ["Mutual growth toward the soul", "Economic calculation", "Sentimentality", "Mutual possession"] }, correct: 0,
      note: { it: "I due si spingono a vicenda verso propositi sempre più elevati, senza gelosia.", en: "The two push each other toward ever loftier aims, without jealousy." } },
    /* Lez. XXIV */
    { q: { it: "Dopo la morte, la coscienza attraversa un processo di…", en: "After death, consciousness goes through a process of…" },
      options: { it: ["Rivisitazione della vita all'indietro", "Annullamento totale", "Reincarnazione immediata", "Sonno eterno"], en: ["Reviewing life backwards", "Total annihilation", "Immediate reincarnation", "Eternal sleep"] }, correct: 0,
      note: { it: "Si rivede la propria vita in senso inverso, percependo le emozioni che abbiamo provocato negli altri.", en: "One reviews one's life in reverse, feeling the emotions we caused in others." } },
    /* Lez. XXV */
    { q: { it: "Cosa si reincarna, secondo il libro?", en: "What reincarnates, according to the book?" },
      options: { it: ["L'anima, non la personalità", "Il corpo fisico", "La mente razionale", "Le emozioni negative"], en: ["The soul, not the personality", "The physical body", "The rational mind", "Negative emotions"] }, correct: 0,
      note: { it: "La personalità è mortale; l'anima porta con sé l'essenza delle esperienze vissute.", en: "The personality is mortal; the soul carries with it the essence of the experiences lived." } },
    /* Lez. XIX */
    { q: { it: "Il significato esoterico della malattia è…", en: "The esoteric meaning of illness is…" },
      options: { it: ["Un messaggio dell'anima attraverso il corpo", "Una punizione divina", "Un caso sfortunato", "Solo un guasto meccanico"], en: ["A message from the soul through the body", "A divine punishment", "An unlucky accident", "Just a mechanical breakdown"] }, correct: 0,
      note: { it: "La malattia esprime sul piano fisico un disagio che ha origine nei piani sottili.", en: "Illness expresses on the physical plane a discomfort that originates on the subtle planes." } }
  ];

  /* ---------- V. MEMORIA DEI CORPI SOTTILI (Lezione XXIII) ---------- */
  const MEMORY = [
    { a: { it: "Corpo fisico", en: "Physical body" }, b: { it: "Il piano denso, visibile", en: "The dense, visible plane" } },
    { a: { it: "Corpo eterico", en: "Etheric body" }, b: { it: "Il «doppio» energetico", en: "The energetic 'double'" } },
    { a: { it: "Corpo astrale", en: "Astral body" }, b: { it: "La sede delle emozioni", en: "The seat of emotions" } },
    { a: { it: "Corpo mentale", en: "Mental body" }, b: { it: "La sede dei pensieri", en: "The seat of thoughts" } },
    { a: { it: "Anima", en: "Soul" }, b: { it: "Il «padrone di casa»", en: "The 'master of the house'" } },
    { a: { it: "Cuore", en: "Heart" }, b: { it: "Centro emozionale superiore", en: "Higher emotional centre" } }
  ];

  /* ---------- ANELLI (diagramma) ---------- */
  const RINGS = [
    { key: "corpi", color: "#1a1326", ring: "#3a2f52", label: { it: "Corpi Sottili", en: "Subtle Bodies" } },
    { key: "leggi", color: "#10212a", ring: "#2f5d6b", label: { it: "Le Leggi", en: "The Laws" } },
    { key: "ostacoli", color: "#2a1410", ring: "#7c3a2a", label: { it: "Gli Ostacoli", en: "The Obstacles" } },
    { key: "risveglio", color: "#3a2c10", ring: "#c9973a", label: { it: "Il Risveglio", en: "The Awakening" } }
  ];

  window.RI_DATA = { STATO, OSTACOLI, LEGGI, QUIZ, MEMORY, RINGS };
})();
