/* ============================================================
   LA PORTA DEL MAGO — dati di gioco bilingue (IT / EN)
   Fonte: Salvatore Brizzi, "La Porta del Mago.
   La Magia come Via di liberazione" (Anima Edizioni).
   Vol. 2 della Trilogia della Trasmutazione.
   Esposto come window.PM_DATA. Ogni voce è { it, en }.

   Modalità riprogettate dal contenuto reale del libro:
   I   Sonno o Presenza?       → Parte I
   II  La Lettura del Mago     → Parte II (scenari non-giudizio)
   III Risveglio o Illusione?  → Parti III + IV (discernimento)
   IV  Quiz del Mago           → trasversale (tutte le 4 parti)
   V   Memoria Planetaria      → Parte II (pianeti/qualità)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- I. SONNO O PRESENZA? (Parte I — classifica) ---------- */
  // belongs: 0 = Sonno (macchina meccanica), 1 = Presenza (ricordo di sé / anima)
  const STATO = [
    { item: { it: "Agire per reazione automatica all'ambiente", en: "Acting by automatic reaction to the environment" }, belongs: 0,
      note: { it: "Ogni nostro fare ordinario è meccanico: deriva dai programmi inconsci registrati in noi.", en: "All our ordinary doing is mechanical: it stems from the unconscious programs recorded in us." } },
    { item: { it: "Osservarsi nel mentre si compie un'azione", en: "Observing oneself while performing an action" }, belongs: 1,
      note: { it: "È l'essenza del ricordo di sé: presenza qui-e-ora, non prima né dopo.", en: "This is the essence of self-remembering: presence here-and-now, not before or after." } },
    { item: { it: "Perdersi nei ricordi del passato e nelle fantasie sul futuro", en: "Getting lost in memories of the past and fantasies of the future" }, belongs: 0,
      note: { it: "È attività meccanica e incontrollata della mente: solo l'Adesso esiste realmente.", en: "This is the mind's mechanical, uncontrolled activity: only the Now truly exists." } },
    { item: { it: "L'«attenzione divisa»", en: "'Divided attention'" }, belongs: 1,
      note: { it: "Tenere parte dell'attenzione su di sé mentre si agisce è la chiave della presenza.", en: "Keeping part of one's attention on oneself while acting is the key to presence." } },
    { item: { it: "Il «sonno verticale» scambiato per veglia", en: "'Vertical sleep' mistaken for wakefulness" }, belongs: 0,
      note: { it: "Lo stato che l'uomo crede a torto essere la veglia è in realtà una forma di sonno.", en: "The state man wrongly takes for wakefulness is in fact a form of sleep." } },
    { item: { it: "La «continuità di coscienza», vigili anche nel sonno", en: "'Continuity of consciousness', awake even in sleep" }, belongs: 1,
      note: { it: "Nel risveglio completo il Sé resta cosciente 24 ore su 24, mentre la macchina riposa.", en: "In full awakening the Self stays conscious 24/7, while the machine rests." } },
    { item: { it: "Manifestare libero arbitrio inibendo il fare", en: "Exercising free will by inhibiting doing" }, belongs: 1,
      note: { it: "Non esprimiamo libero arbitrio nel fare meccanico, ma nell'inibizione cosciente del fare.", en: "We don't express free will in mechanical doing, but in the conscious inhibition of doing." } },
    { item: { it: "Credere di essere sempre autocoscienti", en: "Believing oneself always self-aware" }, belongs: 0,
      note: { it: "Siamo coscienti solo nell'istante in cui ce lo ricordiamo (Gurdjieff): il resto è sonno.", en: "We are conscious only in the instant we remember to be (Gurdjieff): the rest is sleep." } },
    { item: { it: "La coscienza che risiede nel Cuore", en: "Consciousness residing in the Heart" }, belongs: 1,
      note: { it: "La coscienza non è esperienza della mente: si sperimenta che risiede nel Cuore.", en: "Consciousness is not an experience of the mind: it is found to reside in the Heart." } }
  ];

  /* ---------- II. LA LETTURA DEL MAGO (Parte II — scenari non-giudizio) ---------- */
  const LETTURA = [
    { sit: { it: "Qualcuno ti ferisce con parole dure e senti montare la rabbia.",
        en: "Someone wounds you with harsh words and you feel anger rising." },
      options: { it: ["L'attenzione va sull'emozione che provo, non sul suo comportamento", "Devo restituire l'offesa colpo su colpo", "Devo solo reprimere la rabbia e tacere", "Il torto è solo suo, io non c'entro"],
        en: ["Attention goes to the emotion I feel, not to his behaviour", "I must return the offence blow for blow", "I must just repress the anger and keep quiet", "The wrong is his alone, I have no part"] }, correct: 0,
      note: { it: "Ciò che conta non è il comportamento — ogni re-azione è «perfetta» per quel grado di coscienza — ma l'emozione che l'evento suscita in noi e che possiamo trasmutare.",
        en: "What matters is not behaviour — every re-action is 'perfect' for that degree of consciousness — but the emotion the event stirs in us, which we can transmute." } },

    { sit: { it: "Ti hanno fatto un torto e ti chiedi se riuscirai mai a perdonare.",
        en: "You were wronged and wonder whether you will ever be able to forgive." },
      options: { it: ["Perdonare è vedere che l'altro non mi ha mai fatto nulla", "Perdono ma non dimentico", "Perdonerò solo dopo le scuse", "Il perdono è da deboli"],
        en: ["To forgive is to see that the other never did anything to me", "I forgive but I don't forget", "I'll forgive only after an apology", "Forgiveness is for the weak"] }, correct: 0,
      note: { it: "Il vero perdono non è «mi hai fatto male ma ti perdono lo stesso»: è realizzare che «sono le mie emozioni a creare gli eventi, e non viceversa».",
        en: "True forgiveness is not 'you hurt me but I forgive you anyway': it is realising that 'it is my emotions that create events, not the reverse'." } },

    { sit: { it: "Un difetto in un'altra persona ti irrita in modo sproporzionato.",
        en: "A flaw in another person irritates you out of all proportion." },
      options: { it: ["Attraverso gli altri sto giudicando una parte di me", "Quella persona è semplicemente sbagliata", "Devo solo evitarla per sempre", "Non significa niente"],
        en: ["Through others I am judging a part of myself", "That person is simply wrong", "I must just avoid them forever", "It means nothing"] }, correct: 0,
      note: { it: "Più consideriamo «sbagliata» la materia, più ci allontaniamo dallo spirito: ciò che giudichiamo fuori indica un giudizio rivolto a noi stessi.",
        en: "The more we deem matter 'wrong', the further we drift from spirit: what we judge outside points to a judgment aimed at ourselves." } },

    { sit: { it: "Provi un'emozione negativa intensa e vorresti scacciarla via.",
        en: "You feel an intense negative emotion and want to drive it away." },
      options: { it: ["La accolgo e la sciolgo nel Fuoco del Cuore: il demone diventa angelo", "La reprimo facendo finta di niente", "La sfogo sugli altri", "La nutro con il dialogo interno"],
        en: ["I welcome it and dissolve it in the Heart's Fire: the demon becomes an angel", "I repress it, pretending nothing", "I vent it on others", "I feed it with inner dialogue"] }, correct: 0,
      note: { it: "Entrare nell'emozione, accoglierla e scioglierla col Fuoco del Cuore aperto trasmuta il Veleno in Farmaco: la stessa sostanza entra a far parte del corpo di gloria.",
        en: "Entering the emotion, welcoming and dissolving it with the open Heart's Fire turns Poison into Remedy: that same substance becomes part of the body of glory." } },

    { sit: { it: "Se tornassi indietro nel tempo, ti comporteresti «in maniera diversa».",
        en: "If you went back in time, you would behave 'differently'." },
      options: { it: ["Non è vero: con lo stesso grado di coscienza di allora, agirei uguale", "Certo, avrei fatto tutto meglio", "Basta volerlo per cambiare il passato", "Il passato è irrilevante"],
        en: ["Not true: with the same degree of consciousness, I'd act the same", "Of course, I would have done everything better", "You just have to want it to change the past", "The past is irrelevant"] }, correct: 0,
      note: { it: "Ogni nostra re-azione è «perfetta», perché è tutto quanto ci è possibile con quel grado di coscienza. Oggi forse cambieremmo, ma solo perché siamo già passati attraverso quell'esperienza.",
        en: "Every re-action is 'perfect', because it is all we can do with that degree of consciousness. Today we might change, but only because we've already been through that experience." } },

    { sit: { it: "Nel rapporto di coppia, il tuo partner ha tradito e ti invade la sofferenza.",
        en: "In your relationship, your partner has cheated and suffering floods you." },
      options: { it: ["Il fuoco alchemico va sull'emozione che il tradimento mi provoca, non sul giudizio", "Il tradire è sbagliato, punto e basta", "Devo vendicarmi o il conto non torna", "Non è successo nulla di male"],
        en: ["The alchemical fire goes to the emotion the betrayal provokes in me, not the judgment", "Cheating is wrong, period", "I must get revenge or the score isn't settled", "Nothing bad happened"] }, correct: 0,
      note: { it: "Non si giustifica il tradimento, ma si mette l'accento sulle nostre personali sofferenze e sulla possibilità di trascenderle — ciò che più ci interessa.",
        en: "The betrayal is not justified, but the accent falls on our own suffering and the possibility of transcending it — what matters most to us." } }
  ];

  /* ---------- III. RISVEGLIO O ILLUSIONE? (Parti III + IV — discernimento) ---------- */
  // belongs: 0 = Illusione (trappola, ego, magia nera), 1 = Risveglio (autentico)
  const RISVEGLIO = [
    { item: { it: "Aprire il Cuore attraverso il perdono e l'amore per i nemici", en: "Opening the Heart through forgiveness and love for enemies" }, belongs: 1,
      note: { it: "La «porta stretta» del Cuore è la vera Porta del Mago: è ciò che distingue la magia bianca dalla nera.", en: "The 'narrow gate' of the Heart is the true Door of the Magus: it is what distinguishes white from black magic." } },
    { item: { it: "Forzare kundalini senza purificazione interiore", en: "Forcing kundalini without inner purification" }, belongs: 0,
      note: { it: "Se il Fuoco risvegliato si incanala in emozioni basse, la personalità diventa «un'aberrazione della natura».", en: "If the awakened Fire channels into base emotions, the personality becomes 'an aberration of nature'." } },
    { item: { it: "Vincere nel mondo: ricchezza, pace e successo restando addormentati", en: "Winning in the world: wealth, peace and success while staying asleep" }, belongs: 0,
      note: { it: "Si insegna a vincere «nel» mondo, non «il» mondo — e il mondo si vince solo trascendendolo.", en: "One is taught to win 'in' the world, not 'the' world — and the world is won only by transcending it." } },
    { item: { it: "Trascendere lo spaziotempo attraverso l'apertura della coscienza", en: "Transcending spacetime through the opening of consciousness" }, belongs: 1,
      note: { it: "Il vero risveglio è l'uscita dallo spaziotempo, non il benessere all'interno della matrice.", en: "True awakening is stepping out of spacetime, not well-being within the matrix." } },
    { item: { it: "Fissare il corpo astrale per sopravvivere dopo la morte", en: "Fixing the astral body to survive after death" }, belongs: 0,
      note: { it: "È la via del mago nero: sopravvivenza in astrale senza l'anima. Le Logge Nere cercano allievi disciplinati, non schiavi della rabbia.", en: "This is the black magus's way: survival in the astral without the soul. Black Lodges seek disciplined pupils, not slaves of rage." } },
    { item: { it: "L'«imitatio Christi»: amare il prossimo e porgere l'altra guancia", en: "The 'imitatio Christi': loving thy neighbour and turning the other cheek" }, belongs: 1,
      note: { it: "L'aspirazione ad amare i propri nemici è ciò che distingue la magia bianca dalla nera: entrambe le vie condividono le stesse fasi preparatorie.", en: "The aspiration to love one's enemies is what distinguishes white from black magic: both ways share the same preparatory phases." } },
    { item: { it: "Ottenere poteri psichici e contatti con entità senza risveglio interiore", en: "Gaining psychic powers and contacts with entities without inner awakening" }, belongs: 0,
      note: { it: "Poteri e visioni non sono indice di giusta evoluzione: di norma è il contrario. È l'«illuminazione dell'ego».", en: "Powers and visions are not a sign of right evolution: usually it is the opposite. It is 'ego illumination'." } },
    { item: { it: "Predicare pace e buonismo in modo ipnotico e politicamente corretto", en: "Preaching peace and feel-good niceness in a hypnotic, politically correct way" }, belongs: 0,
      note: { it: "«Uomini o caporali?»: la bianca tunica del santo può nascondere la divisa di un soldatino. La finta spiritualità è quantitativa e moralista.", en: "'Men or corporals?': the saint's white tunic may hide a soldier's uniform. False spirituality is quantitative and moralistic." } },
    { item: { it: "L'«estasi estetica»: l'instancabile ricerca del Bello in ogni cosa", en: "'Aesthetic ecstasy': the tireless search for Beauty in everything" }, belongs: 1,
      note: { it: "L'estasi estetica è una delle vie brevi (ars brevis) sicure verso l'apertura del Cuore.", en: "Aesthetic ecstasy is one of the safe short ways (ars brevis) to the opening of the Heart." } },
    { item: { it: "Riprogrammare l'apparato psicofisico per vivere in pace col sorriso stampato", en: "Reprogramming the psychophysical apparatus to live in peace with a fixed smile" }, belongs: 0,
      note: { it: "L'ego illuminato muore con il sorriso sulle labbra, in pace… senza essersi mai risvegliato. La differenza col Vero è sottile, ma enorme.", en: "The illuminated ego dies smiling, at peace… without ever awakening. The difference from the Real is subtle, yet enormous." } }
  ];

  /* ---------- IV. QUIZ DEL MAGO (trasversale — tutte le 4 parti) ---------- */
  const QUIZ = [
    /* ── Parte I ── */
    { q: { it: "Il «ricordo di sé» è il segreto centrale di…", en: "'Self-remembering' is the central secret of…" },
      options: { it: ["Magia ed esoterismo (l'Ars Regia)", "La sola psicologia moderna", "L'astrologia popolare", "La ginnastica dolce"], en: ["Magic and esotericism (the Ars Regia)", "Modern psychology alone", "Popular astrology", "Gentle gymnastics"] }, correct: 0,
      note: { it: "È il fenomeno più importante della Magia: la chiave per accedere ad altri stati di coscienza.", en: "It is the most important phenomenon of Magic: the key to access other states of consciousness." } },
    { q: { it: "L'uomo ordinario, secondo il libro, è…", en: "Ordinary man, per the book, is…" },
      options: { it: ["Una macchina biologica addormentata", "Un'anima già pienamente desta", "Un puro spirito senza corpo", "Un essere senza programmi inconsci"], en: ["A sleeping biological machine", "An already fully awake soul", "Pure spirit without a body", "A being without unconscious programs"] }, correct: 0,
      note: { it: "Coscienza, volontà e libero arbitrio non sono dati alla nascita: sono frutto di uno sforzo.", en: "Consciousness, will and free will are not given at birth: they are the fruit of effort." } },
    { q: { it: "Lo sforzo verso il ricordo di sé costruisce prima…", en: "The effort toward self-remembering first builds…" },
      options: { it: ["Il «testimone», poi il «corpo di gloria»", "Il corpo astrale del mago nero", "Una nuova personalità", "Un guscio vuoto"], en: ["The 'witness', then the 'body of glory'", "The black magus's astral body", "A new personality", "An empty shell"] }, correct: 0,
      note: { it: "In quel corpo si trasferisce la coscienza: il Sé sopravvive alla morte della macchina biologica.", en: "Consciousness transfers into that body: the Self survives the death of the biological machine." } },
    { q: { it: "Dove risiede la coscienza, secondo Brizzi?", en: "Where does consciousness reside, per Brizzi?" },
      options: { it: ["Nel Cuore", "Nella mente razionale", "Nel cervello fisico", "Nei sensi"], en: ["In the Heart", "In the rational mind", "In the physical brain", "In the senses"] }, correct: 0,
      note: { it: "Il Cuore è il centro emozionale superiore, il centro anāhata: lì risiedono le Verità.", en: "The Heart is the higher emotional centre, the anāhata centre: there the Truths reside." } },
    { q: { it: "Il «quarto stato» di coscienza è…", en: "The 'fourth state' of consciousness is…" },
      options: { it: ["Il ricordo di sé, il vero stato di veglia", "Il sonno profondo", "Il sogno lucido", "L'estasi mistica"], en: ["Self-remembering, true wakefulness", "Deep sleep", "Lucid dreaming", "Mystical ecstasy"] }, correct: 0,
      note: { it: "Oltre sonno profondo, sogno e «sonno verticale» (la falsa veglia), esiste un quarto stato: il ricordo di sé.", en: "Beyond deep sleep, dream and 'vertical sleep' (false waking), there is a fourth state: self-remembering." } },

    /* ── Parte II ── */
    { q: { it: "Che cosa distingue la magia bianca dalla nera?", en: "What distinguishes white magic from black?" },
      options: { it: ["L'aspirazione ad amare i propri nemici", "Il tipo di abiti rituali", "La quantità di formule recitate", "Il pianeta invocato"], en: ["The aspiration to love one's enemies", "The kind of ritual robes", "The number of formulas recited", "The planet invoked"] }, correct: 0,
      note: { it: "Le due vie condividono le stesse fasi preparatorie: la nera manca solo dell'amore per i nemici.", en: "Both ways share the same preparatory phases: the black one only lacks love for enemies." } },
    { q: { it: "Il vero perdono consiste nel realizzare che…", en: "True forgiveness consists in realising that…" },
      options: { it: ["L'altro non ci ha mai fatto nulla", "Dobbiamo dimenticare in fretta", "Bisogna prima ricevere le scuse", "Il torto va dimostrato in pubblico"], en: ["The other never did anything to us", "We must forget quickly", "An apology must come first", "The wrong must be proven publicly"] }, correct: 0,
      note: { it: "«Sono le mie emozioni a creare gli eventi, e non viceversa»: è la chiave che apre il Cuore.", en: "'It is my emotions that create events, not the reverse': the key that opens the Heart." } },
    { q: { it: "A che cosa corrisponde, per analogia, ogni demone interiore?", en: "To what does each inner demon correspond, by analogy?" },
      options: { it: ["A un pianeta, una forza archetipale", "A un peccato senza rimedio", "A un nemico esterno reale", "A una malattia del corpo"], en: ["To a planet, an archetypal force", "To an irredeemable sin", "To a real external enemy", "To a bodily illness"] }, correct: 0,
      note: { it: "Trasmutando l'aspetto psichico nella qualità spirituale si può invocare l'energia di quella «divinità».", en: "By transmuting the psychic trait into its spiritual quality one can invoke that 'deity's' energy." } },
    { q: { it: "La realtà esteriore, per il mago, è…", en: "Outer reality, for the magus, is…" },
      options: { it: ["Una proiezione di quella interiore", "Del tutto separata da noi", "Un caso privo di senso", "Creata solo dagli altri"], en: ["A projection of the inner one", "Wholly separate from us", "A meaningless accident", "Created only by others"] }, correct: 0,
      note: { it: "Possiamo dominare all'esterno solo ciò che abbiamo dominato all'interno.", en: "We can master outside only what we have mastered within." } },
    { q: { it: "La vera «Porta del Mago» è…", en: "The true 'Door of the Magus' is…" },
      options: { it: ["La porta stretta del Cuore: perdono e non-giudizio", "Un portale dimensionale", "Un grimorio antico", "Il corpo astrale"], en: ["The narrow gate of the Heart: forgiveness and non-judgment", "A dimensional portal", "An ancient grimoire", "The astral body"] }, correct: 0,
      note: { it: "Il ricordo di sé è solo propedeutico: la vera Porta è l'apertura del Cuore.", en: "Self-remembering is only preparatory: the true Door is the opening of the Heart." } },

    /* ── Parte III ── */
    { q: { it: "Le «acque corrosive» (via violenta) forzano…", en: "The 'corrosive waters' (violent way) force…" },
      options: { it: ["Il risveglio di kundalini lungo la spina dorsale", "L'apertura dolce del Cuore", "Il sonno profondo", "L'oblio della mente"], en: ["The awakening of kundalini up the spine", "The gentle opening of the Heart", "Deep sleep", "The mind's oblivion"] }, correct: 0,
      note: { it: "Sentiero pericoloso, da non confondere con l'ars brevis, sicura.", en: "A dangerous path, not to be confused with the safe ars brevis." } },
    { q: { it: "Kundalini è un'energia che dimora…", en: "Kundalini is an energy that dwells…" },
      options: { it: ["Arrotolata alla base della spina dorsale, nel primo chakra", "Nel cervello", "Nello stomaco", "Fuori dal corpo"], en: ["Coiled at the base of the spine, in the first chakra", "In the brain", "In the stomach", "Outside the body"] }, correct: 0,
      note: { it: "Corrisponde al centro muladhara. Il suo risveglio avviene spontaneamente nel percorso alchemico regolare.", en: "It corresponds to the muladhara centre. Its awakening happens spontaneously in the regular alchemical path." } },
    { q: { it: "Le «acque corrosive» erano riservate in passato a…", en: "The 'corrosive waters' were once reserved for…" },
      options: { it: ["Chi aveva una morte imminente", "Tutti i principianti", "I soli maestri realizzati", "Chi aveva paura del buio"], en: ["Those facing imminent death", "All beginners", "Only realised masters", "Those afraid of the dark"] }, correct: 0,
      note: { it: "La scelta era fra il rischio della follia e la certezza di morire nell'incoscienza.", en: "The choice was between the risk of madness and the certainty of dying in unconsciousness." } },
    { q: { it: "L'ars brevis comprende le seguenti vie TRANNE…", en: "The ars brevis includes all the following ways EXCEPT…" },
      options: { it: ["Le acque corrosive", "Il servizio all'umanità", "L'estasi estetica", "L'imitatio Christi"], en: ["The corrosive waters", "Service to humanity", "Aesthetic ecstasy", "The imitatio Christi"] }, correct: 0,
      note: { it: "L'ars brevis (Alchimia Superior) comprende servizio, estasi estetica, imitatio Christi, Via Metafisica: vie brevi e sicure. Le acque corrosive sono la via violenta.", en: "The ars brevis (Alchimia Superior) includes service, aesthetic ecstasy, imitatio Christi, the Metaphysical Way: short and safe ways. The corrosive waters are the violent way." } },

    /* ── Parte IV ── */
    { q: { it: "Il «mago nero» cerca l'immortalità…", en: "The 'black magus' seeks immortality…" },
      options: { it: ["Fissando e abitando il corpo astrale", "Aprendo il Cuore all'amore", "Dissolvendosi nell'Uno", "Rinunciando a ogni potere"], en: ["By fixing and inhabiting the astral body", "By opening the Heart to love", "By dissolving into the One", "By renouncing all power"] }, correct: 0,
      note: { it: "Chi si separa dall'anima può solo sopravvivere in astrale: le Logge Nere cercano allievi disciplinati, non schiavi della rabbia.", en: "One severed from the soul can only survive in the astral: Black Lodges seek disciplined pupils, not slaves of rage." } },
    { q: { it: "Il «salto vibrazionale della Terra» è il passaggio…", en: "The 'vibrational leap of the Earth' is the passage…" },
      options: { it: ["Dall'Età dei Pesci all'Età dell'Acquario", "Dall'Acquario ai Pesci", "Dalla veglia al sonno", "Dall'oro al piombo"], en: ["From the Age of Pisces to the Age of Aquarius", "From Aquarius to Pisces", "From waking to sleep", "From gold to lead"] }, correct: 0,
      note: { it: "Un balzo quantico del pianeta: l'Eone di Osiride lascia il posto a quello di Horus.", en: "A quantum leap of the planet: the Aeon of Osiris yields to that of Horus." } },
    { q: { it: "L'«illuminazione dell'ego» permette di…", en: "The 'illumination of the ego' allows one to…" },
      options: { it: ["Vivere in pace e successo… restando addormentati", "Aprire definitivamente il Cuore", "Uscire dallo spaziotempo", "Identificarsi con l'anima"], en: ["Live in peace and success… while staying asleep", "Definitively open the Heart", "Step out of spacetime", "Identify with the soul"] }, correct: 0,
      note: { it: "Si insegna a vincere «nel» mondo, non a vincere «il» mondo — e il mondo si vince solo trascendendolo.", en: "One is taught to win 'in' the world, not to win 'the' world — and the world is won only by transcending it." } },
    { q: { it: "Le «monadi spirituali» sono…", en: "'Spiritual monads' are…" },
      options: { it: ["Frammenti dell'Uno, «gocce di Dio»", "Pianeti del Sistema Solare", "Rituali antichi", "Tecniche di meditazione"], en: ["Fragments of the One, 'drops of God'", "Planets of the Solar System", "Ancient rituals", "Meditation techniques"] }, correct: 0,
      note: { it: "Sulla Terra le monadi sviluppano l'autocoscienza incontrando la materia: è un pianeta-scuola.", en: "On Earth, monads develop self-awareness by meeting matter: it is a school-planet." } },
    { q: { it: "L'allegoria dei «maiali e uomini» illustra…", en: "The allegory of 'pigs and men' illustrates…" },
      options: { it: ["Le forze che vogliono mantenere l'uomo addormentato", "Una dieta spirituale", "Il ciclo delle reincarnazioni", "I rituali delle Logge Bianche"], en: ["The forces that want to keep man asleep", "A spiritual diet", "The cycle of reincarnation", "The rituals of the White Lodges"] }, correct: 0,
      note: { it: "Il «buon allevatore» fa di tutto perché i maiali non si trasformino in uomini: diffonde vie errate per il risveglio.", en: "The 'good farmer' does everything so pigs don't turn into men: he spreads wrong ways to awakening." } }
  ];

  /* ---------- V. MEMORIA PLANETARIA (Parte II — pianeta ↔ qualità archetipale) ---------- */
  const MEMORY = [
    { a: { it: "Sole", en: "Sun" }, b: { it: "Identità del Sé", en: "Identity of the Self" } },
    { a: { it: "Luna", en: "Moon" }, b: { it: "Intuizione", en: "Intuition" } },
    { a: { it: "Mercurio", en: "Mercury" }, b: { it: "Discernimento", en: "Discernment" } },
    { a: { it: "Venere", en: "Venus" }, b: { it: "Bellezza", en: "Beauty" } },
    { a: { it: "Marte", en: "Mars" }, b: { it: "Coraggio", en: "Courage" } },
    { a: { it: "Giove", en: "Jupiter" }, b: { it: "Abbondanza", en: "Abundance" } }
  ];

  /* ---------- ANELLI (per il diagramma di apertura) ---------- */
  // 4 cerchi concentrici: le 4 parti che convergono sul Cuore/Porta.
  const RINGS = [
    { key: "salto", color: "#1a1326", ring: "#3a2f52", label: { it: "Salto Vibrazionale", en: "Vibrational Leap" } },
    { key: "acque", color: "#10212a", ring: "#2f5d6b", label: { it: "Acque Corrosive", en: "Corrosive Waters" } },
    { key: "giudizio", color: "#2a1410", ring: "#7c3a2a", label: { it: "Non-giudizio", en: "Non-judgment" } },
    { key: "presenza", color: "#3a2c10", ring: "#c9973a", label: { it: "Presenza", en: "Presence" } }
  ];

  window.PM_DATA = { STATO, LETTURA, RISVEGLIO, QUIZ, MEMORY, RINGS };
})();
