/* L'APPRENDISTA DEL MAGO — data.js (branching narrative adventure) */
(function(){
"use strict";
window.ADV_DATA = {
  startScene: "lettera",
  scenes: {
    /* ═══ CAPITOLO 1: LA CHIAMATA ═══ */
    lettera: {
      chapter: 1, title:{it:"La Lettera",en:"The Letter"},
      text:{it:"Una busta senza mittente appare nella tua cassetta postale. Dentro, un foglio scritto a mano con inchiostro seppia:\n\n«Se stai leggendo queste parole, una parte di te sa già che la vita che conduci non è la tua vera vita. C'è un Lavoro da fare — e un maestro disposto a guidarti. Se vuoi iniziare, presentati domani all'alba al giardino botanico. Non portare nulla tranne te stesso. Se puoi.»\n\nNessuna firma. Solo un simbolo: un triangolo con un punto al centro.",
            en:"An envelope with no sender appears in your mailbox. Inside, a handwritten sheet in sepia ink:\n\n'If you are reading these words, a part of you already knows that the life you lead is not your true life. There is Work to be done — and a master willing to guide you. If you wish to begin, present yourself tomorrow at dawn at the botanical garden. Bring nothing but yourself. If you can.'\n\nNo signature. Just a symbol: a triangle with a dot at the centre."},
      choices:[
        {text:{it:"Vai all'alba. Qualcosa dentro di te riconosce quelle parole.",en:"You go at dawn. Something inside you recognises those words."},next:"giardino",karma:2},
        {text:{it:"Cerchi informazioni online su quel simbolo e quel luogo.",en:"You search online for information about that symbol and that place."},next:"ricerca",karma:0},
        {text:{it:"Butti la lettera. Probabilmente è uno scherzo.",en:"You throw the letter away. It's probably a joke."},next:"rifiuto",karma:-1}
      ]
    },
    giardino: {
      chapter: 1, title:{it:"Il Giardino",en:"The Garden"},
      text:{it:"L'alba è fredda. Il giardino è deserto. Aspetti venti minuti, poi un'ora. Stai per andartene quando una voce alle tue spalle dice:\n\n«Sei venuto. Bene. La maggior parte delle persone non viene. E di quelli che vengono, la maggior parte se ne va dopo venti minuti.»\n\nTi giri. Un uomo sulla sessantina, vestito in modo ordinario, ti guarda con occhi che sembrano vedere attraverso di te.\n\n«Il primo insegnamento lo hai già ricevuto: la pazienza. Ora te ne do un secondo.»\n\nTi porge un quaderno vuoto.\n\n«Per una settimana, scrivi ogni sera tre momenti della giornata in cui hai agito meccanicamente — senza consapevolezza. Torna qui fra sette giorni.»",
            en:"The dawn is cold. The garden is deserted. You wait twenty minutes, then an hour. You're about to leave when a voice behind you says:\n\n'You came. Good. Most people don't come. And of those who come, most leave after twenty minutes.'\n\nYou turn around. A man in his sixties, dressed plainly, looks at you with eyes that seem to see through you.\n\n'The first teaching you've already received: patience. Now I'll give you a second.'\n\nHe hands you an empty notebook.\n\n'For one week, write every evening three moments from your day when you acted mechanically — without awareness. Come back here in seven days.'"},
      choices:[
        {text:{it:"Accetti il quaderno e pratichi l'esercizio con serietà ogni sera.",en:"You accept the notebook and practise the exercise seriously every evening."},next:"osservazione",karma:2},
        {text:{it:"Provi per due giorni, poi ti dimentichi.",en:"You try for two days, then forget."},next:"dimenticanza",karma:-1},
        {text:{it:"Lo fai, ma menti — inventi le osservazioni per sembrare bravo.",en:"You do it, but lie — you invent observations to look good."},next:"menzogna",karma:-2}
      ]
    },
    ricerca: {
      chapter: 1, title:{it:"La Ricerca",en:"The Research"},
      text:{it:"Passi ore a cercare online. Il simbolo — un triangolo con un punto — è un antico simbolo alchemico. Trovi forum esoterici, teorie complottiste, siti new-age. Tutto e niente.\n\nTre giorni dopo, riceivi una seconda busta. Stesso foglio, stessa calligrafia:\n\n«Cercare informazioni su un cammino non è percorrerlo. Il piede che cammina impara più dell'occhio che legge. Ultima occasione: domani, stessa ora, stesso luogo.»",
            en:"You spend hours searching online. The symbol — a triangle with a dot — is an ancient alchemical symbol. You find esoteric forums, conspiracy theories, new-age sites. Everything and nothing.\n\nThree days later, you receive a second envelope. Same paper, same handwriting:\n\n'Searching for information about a path is not walking it. The walking foot learns more than the reading eye. Last chance: tomorrow, same time, same place.'"},
      choices:[
        {text:{it:"Questa volta vai. Basta leggere — è ora di vivere.",en:"This time you go. Enough reading — it's time to live."},next:"giardino",karma:1},
        {text:{it:"Ignori anche questa. Troppo strano.",en:"You ignore this one too. Too strange."},next:"rifiuto",karma:-1}
      ]
    },
    rifiuto: {
      chapter: 1, title:{it:"Il Rifiuto",en:"The Refusal"}, ending:"dormiente",
      text:{it:"Butti la lettera. Torni alla tua vita. Le settimane passano.\n\nMa qualcosa è cambiato. Una sottile inquietudine si è insediata — la sensazione di aver chiuso una porta che non si riaprirà. Ogni tanto, nei momenti di silenzio, ripensi a quelle parole: «la vita che conduci non è la tua vera vita».\n\nE sai, nel profondo, che avevano ragione.\n\nMa il momento è passato. Per ora.",
            en:"You throw the letter away. You return to your life. Weeks pass.\n\nBut something has changed. A subtle restlessness has settled in — the feeling of having closed a door that won't reopen. Now and then, in moments of silence, you think back to those words: 'the life you lead is not your true life.'\n\nAnd you know, deep down, they were right.\n\nBut the moment has passed. For now."},
      choices:[]
    },

    /* ═══ CAPITOLO 2: L'OSSERVAZIONE ═══ */
    osservazione: {
      chapter: 2, title:{it:"L'Osservazione",en:"The Observation"},
      text:{it:"Sette giorni di auto-osservazione ti hanno sconvolto. Il quaderno è pieno:\n\n— «Mi sono arrabbiato in auto senza motivo reale»\n— «Ho giudicato un collega e poi ho fatto esattamente la stessa cosa»\n— «Ho passato un'ora al telefono senza ricordare nulla di ciò che ho visto»\n\nTorni al giardino. Il Maestro legge in silenzio, poi alza lo sguardo.\n\n«Bene. Ora sai una cosa che il 99% dell'umanità non sa: sei una macchina. Ogni tua reazione è automatica. Ogni emozione è un programma. Questa non è una brutta notizia — è l'inizio della libertà. Perché solo chi vede la prigione può uscirne.»\n\nPausa.\n\n«Ora la domanda vera: vuoi continuare? Il prossimo passo sarà più difficile.»",
            en:"Seven days of self-observation have shaken you. The notebook is full:\n\n— 'I got angry in the car for no real reason'\n— 'I judged a colleague and then did exactly the same thing'\n— 'I spent an hour on the phone remembering nothing I saw'\n\nYou return to the garden. The Master reads in silence, then looks up.\n\n'Good. Now you know something that 99% of humanity doesn't know: you are a machine. Every reaction is automatic. Every emotion is a programme. This is not bad news — it's the beginning of freedom. Because only those who see the prison can leave it.'\n\nPause.\n\n'Now the real question: do you want to continue? The next step will be harder.'"},
      choices:[
        {text:{it:"«Sì. Non posso più tornare indietro.»",en:"'Yes. I can't go back now.'"},next:"fuoco",karma:2},
        {text:{it:"«Ho bisogno di tempo per pensarci.»",en:"'I need time to think about it.'"},next:"pausa",karma:0}
      ]
    },
    dimenticanza: {
      chapter: 2, title:{it:"La Dimenticanza",en:"The Forgetting"},
      text:{it:"Dopo due giorni, l'esercizio scivola via. La vita quotidiana ti inghiotte: il lavoro, i social, le preoccupazioni. Il quaderno resta sul comodino, vuoto.\n\nTorni al giardino per vergogna più che per convinzione. Il Maestro ti guarda senza giudicare.\n\n«Non vergognarti. La macchina ti ha ripreso — è ciò che fa. L'importante è che tu sia qui. La domanda è: vuoi riprovare, sapendo che sarà difficile restare svegli?»",
            en:"After two days, the exercise slips away. Daily life swallows you: work, social media, worries. The notebook stays on the nightstand, empty.\n\nYou return to the garden out of shame more than conviction. The Master looks at you without judging.\n\n'Don't be ashamed. The machine took you back — that's what it does. What matters is that you're here. The question is: do you want to try again, knowing it will be hard to stay awake?'"},
      choices:[
        {text:{it:"«Sì, riprovo. Questa volta davvero.»",en:"'Yes, I'll try again. For real this time.'"},next:"osservazione",karma:1},
        {text:{it:"«Forse non sono fatto per questo.»",en:"'Maybe I'm not cut out for this.'"},next:"abbandono_precoce",karma:-1}
      ]
    },
    menzogna: {
      chapter: 2, title:{it:"La Menzogna",en:"The Lie"},
      text:{it:"Il Maestro apre il quaderno, legge due righe e lo chiude.\n\n«Queste non sono osservazioni. Sono invenzioni. Hai scritto ciò che pensavi volessi sentire, non ciò che hai visto.»\n\nIl tuo stomaco sprofonda. Come può saperlo?\n\n«Non ti giudico. Ma sappi una cosa: l'unico peccato in questo Lavoro è mentire a te stesso. Tutto il resto si può trasformare. La menzogna, no — perché trasforma il veleno in cibo.»\n\nTi restituisce il quaderno.\n\n«Hai un'ultima possibilità. Ricomincia. Ma questa volta, sii onesto — anche se ciò che vedi ti spaventa.»",
            en:"The Master opens the notebook, reads two lines and closes it.\n\n'These are not observations. They're inventions. You wrote what you thought I wanted to hear, not what you saw.'\n\nYour stomach sinks. How can he know?\n\n'I don't judge you. But know this: the only sin in this Work is lying to yourself. Everything else can be transformed. The lie cannot — because it turns poison into food.'\n\nHe returns the notebook.\n\n'You have one last chance. Start over. But this time, be honest — even if what you see frightens you.'"},
      choices:[
        {text:{it:"Ricominci con onestà brutale verso te stesso.",en:"You start over with brutal honesty towards yourself."},next:"osservazione",karma:1},
        {text:{it:"Te ne vai. Troppo scomodo guardarsi dentro.",en:"You leave. Too uncomfortable to look inside."},next:"abbandono_precoce",karma:-2}
      ]
    },
    abbandono_precoce: {
      chapter: 2, title:{it:"L'Abbandono",en:"The Abandonment"}, ending:"cercatore_incompiuto",
      text:{it:"Te ne vai dal giardino. Il Maestro non ti ferma.\n\nNei mesi seguenti, qualcosa è diverso. Hai visto — anche solo per un istante — quanto sei meccanico. E quel vedere non si cancella.\n\nNon pratichi, non cerchi un altro maestro, ma l'inquietudine resta. Come una spina sotto la pelle. Sai che esiste un altro modo di vivere, ma non hai il coraggio — o la volontà — di cercarlo.\n\nSei un cercatore incompiuto: hai visto la porta, ma non l'hai attraversata.",
            en:"You leave the garden. The Master doesn't stop you.\n\nIn the following months, something is different. You saw — even for just an instant — how mechanical you are. And that seeing cannot be erased.\n\nYou don't practise, you don't seek another master, but the restlessness remains. Like a thorn under the skin. You know another way of living exists, but you lack the courage — or the will — to seek it.\n\nYou are an incomplete seeker: you saw the door, but didn't walk through it."},
      choices:[]
    },
    pausa: {
      chapter: 2, title:{it:"La Pausa",en:"The Pause"},
      text:{it:"«Prenditi il tuo tempo», dice il Maestro. «Ma ricorda: il tempo è l'illusione preferita di chi dorme. «Domani» non esiste — esiste solo adesso.»\n\nPassano due settimane. Il ricordo dell'osservazione ti tormenta. Hai visto cose su te stesso che non puoi più ignorare. Una notte, alle 3 del mattino, pieni il quaderno con osservazioni reali — crude, imbarazzanti, vere.\n\nTorni al giardino il giorno dopo.",
            en:"'Take your time,' the Master says. 'But remember: time is the favourite illusion of those who sleep. \"Tomorrow\" doesn't exist — only now exists.'\n\nTwo weeks pass. The memory of the observation torments you. You've seen things about yourself you can no longer ignore. One night, at 3am, you fill the notebook with real observations — raw, embarrassing, true.\n\nYou return to the garden the next day."},
      choices:[
        {text:{it:"Mostri il quaderno pieno di verità scomode.",en:"You show the notebook full of uncomfortable truths."},next:"fuoco",karma:1}
      ]
    },

    /* ═══ CAPITOLO 3: LA PROVA DEL FUOCO ═══ */
    fuoco: {
      chapter: 3, title:{it:"La Prova del Fuoco",en:"The Trial by Fire"},
      text:{it:"«Oggi impari la trasmutazione», dice il Maestro.\n\n«Le emozioni negative — rabbia, gelosia, paura — sono piombo. Non vanno represse né espresse. Vanno trasmutate in oro. Come? Restando presenti DENTRO l'emozione, senza identificarsi con essa.»\n\nProprio in quel momento il tuo telefono vibra. Un messaggio: il tuo migliore amico ha parlato male di te con persone che conosci. La rabbia esplode.\n\nIl Maestro ti osserva.\n\n«Ecco la tua prova del fuoco. Cosa fai — adesso, in questo istante?»",
            en:"'Today you learn transmutation,' the Master says.\n\n'Negative emotions — anger, jealousy, fear — are lead. They must not be suppressed or expressed. They must be transmuted into gold. How? By remaining present WITHIN the emotion, without identifying with it.'\n\nRight then your phone vibrates. A message: your best friend has been talking badly about you to people you know. Rage explodes.\n\nThe Master watches you.\n\n'Here is your trial by fire. What do you do — now, in this instant?'"},
      choices:[
        {text:{it:"Senti la rabbia nel corpo. La osservi bruciare senza reagire. Rimani.",en:"You feel the anger in your body. You watch it burn without reacting. You stay."},next:"trasmutazione",karma:3},
        {text:{it:"Chiami immediatamente il tuo amico per un confronto furioso.",en:"You immediately call your friend for a furious confrontation."},next:"reazione",karma:-1},
        {text:{it:"Reprimi tutto. Sorridi e dici «non m'importa», ma dentro bruci.",en:"You suppress everything. You smile and say 'I don't care,' but inside you're burning."},next:"repressione",karma:0}
      ]
    },
    trasmutazione: {
      chapter: 3, title:{it:"La Trasmutazione",en:"The Transmutation"},
      text:{it:"La rabbia brucia. Brucia per minuti che sembrano ore. Ma tu resti. Presente. La osservi come un fuoco dentro il petto.\n\nPoi succede qualcosa: il fuoco si trasforma. La rabbia non scompare — si scioglie in qualcos'altro. Compassione? Comprensione? Non hai parole per definirlo.\n\nIl Maestro sorride per la prima volta.\n\n«Hai appena trasformato il piombo in oro. Pochi ci riescono la prima volta. La maggior parte impiega anni. Ricorda questa sensazione — è la via.»\n\nSenti una leggerezza che non hai mai provato.",
            en:"The anger burns. It burns for minutes that feel like hours. But you stay. Present. You observe it like a fire in your chest.\n\nThen something happens: the fire transforms. The anger doesn't disappear — it dissolves into something else. Compassion? Understanding? You have no words for it.\n\nThe Master smiles for the first time.\n\n'You have just transmuted lead into gold. Few manage it the first time. Most take years. Remember this feeling — it is the way.'\n\nYou feel a lightness you've never experienced."},
      choices:[
        {text:{it:"Continua il cammino",en:"Continue the path"},next:"bivio",karma:2}
      ]
    },
    reazione: {
      chapter: 3, title:{it:"La Reazione",en:"The Reaction"},
      text:{it:"Chiami il tuo amico. Urli. Lui urla. Dite cose che non si possono ritirare. La telefonata finisce con un «non voglio più vederti».\n\nIl Maestro ti guarda con tristezza.\n\n«La macchina ha vinto. Tu non hai parlato — ha parlato il tuo programma di difesa. Hai distrutto un'amicizia per proteggere un'immagine di te stesso che nemmeno esiste.»\n\nSilenzio.\n\n«Ma non tutto è perduto. Il dolore che senti adesso — se lo osservi anziché fuggirlo — può ancora diventare il tuo maestro.»",
            en:"You call your friend. You shout. He shouts. You say things that can't be taken back. The call ends with 'I never want to see you again.'\n\nThe Master looks at you with sadness.\n\n'The machine won. You didn't speak — your defence programme spoke. You destroyed a friendship to protect an image of yourself that doesn't even exist.'\n\nSilence.\n\n'But not all is lost. The pain you feel now — if you observe it instead of running from it — can still become your teacher.'"},
      choices:[
        {text:{it:"Osservi il dolore. Impari dalla caduta.",en:"You observe the pain. You learn from the fall."},next:"bivio",karma:1},
        {text:{it:"Ti giustifichi: «Aveva ragione chi si è arrabbiato.»",en:"You justify yourself: 'I was right to be angry.'"},next:"giustificazione",karma:-2}
      ]
    },
    repressione: {
      chapter: 3, title:{it:"La Repressione",en:"The Repression"},
      text:{it:"Il Maestro scuote la testa.\n\n«Reprimere non è trasmutare. Hai messo un coperchio sulla pentola bollente. L'emozione è ancora lì — congelata, non dissolta. Tornerà, più forte, in un momento che non ti aspetti.»\n\nHa ragione. Nei giorni seguenti la rabbia riemerge in modi inaspettati: irritazione con estranei, insonnia, un mal di stomaco persistente.\n\n«Il corpo non mente mai», dice il Maestro al vostro incontro successivo. «Ciò che la mente reprime, il corpo manifesta.»",
            en:"The Master shakes his head.\n\n'Suppressing is not transmuting. You put a lid on a boiling pot. The emotion is still there — frozen, not dissolved. It will return, stronger, at a moment you don't expect.'\n\nHe's right. In the following days the anger resurfaces in unexpected ways: irritation with strangers, insomnia, a persistent stomach ache.\n\n'The body never lies,' the Master says at your next meeting. 'What the mind represses, the body manifests.'"},
      choices:[
        {text:{it:"Riprovi: questa volta lasci che l'emozione ti attraversi.",en:"You try again: this time you let the emotion pass through you."},next:"bivio",karma:1},
        {text:{it:"Decidi che le emozioni sono nemiche da eliminare.",en:"You decide emotions are enemies to be eliminated."},next:"giustificazione",karma:-1}
      ]
    },
    giustificazione: {
      chapter: 3, title:{it:"La Giustificazione",en:"The Justification"}, ending:"orgoglioso",
      text:{it:"«Ho ragione io.» Questa frase diventa il tuo scudo.\n\nSmetti di frequentare il Maestro. Leggi libri di esoterismo per conto tuo. Parli di «risveglio» e «coscienza» nei social. Giudichi chi non è «al tuo livello».\n\nMa dentro, nel silenzio della notte, sai la verità: stai usando la conoscenza come armatura, non come chiave. Sai le parole, ma non le vivi.\n\nSei diventato ciò che il Maestro chiama «l'orgoglioso spirituale»: chi sa tutto e non pratica nulla.",
            en:"'I'm right.' This sentence becomes your shield.\n\nYou stop visiting the Master. You read esoteric books on your own. You talk about 'awakening' and 'consciousness' on social media. You judge those who aren't 'at your level.'\n\nBut inside, in the silence of the night, you know the truth: you're using knowledge as armour, not as a key. You know the words, but you don't live them.\n\nYou've become what the Master calls 'the spiritual proud one': one who knows everything and practises nothing."},
      choices:[]
    },

    /* ═══ CAPITOLO 4: IL BIVIO ═══ */
    bivio: {
      chapter: 4, title:{it:"Il Bivio",en:"The Fork"},
      text:{it:"Mesi di pratica. Stai cambiando. Vedi i tuoi automatismi, a volte riesci a non reagire. Il Maestro ti convoca per un incontro speciale.\n\n«Sei giunto al bivio. Da qui in avanti, il cammino si divide. Ci sono due vie:\n\nLa Via del Cuore: servizio, compassione, dissoluzione dell'ego. È la via del mago bianco. Lenta, dolorosa, definitiva.\n\nLa Via della Mente: conoscenza, potere, padronanza. Può condurre alla luce o all'oscurità. È più rapida, ma più pericolosa.\n\nNon c'è una via giusta. Ma la scelta che fai ora definirà tutto ciò che segue.»",
            en:"Months of practice. You're changing. You see your automatisms, sometimes you manage not to react. The Master summons you for a special meeting.\n\n'You've reached the fork. From here on, the path divides. There are two ways:\n\nThe Way of the Heart: service, compassion, dissolution of ego. It is the white magus's way. Slow, painful, definitive.\n\nThe Way of the Mind: knowledge, power, mastery. It can lead to light or darkness. It is faster, but more dangerous.\n\nThere is no right way. But the choice you make now will define everything that follows.'"},
      choices:[
        {text:{it:"«Scelgo il Cuore. Non voglio potere — voglio libertà.»",en:"'I choose the Heart. I don't want power — I want freedom.'"},next:"cuore",karma:3},
        {text:{it:"«Scelgo la Mente. La conoscenza è potere, e il potere serve per aiutare.»",en:"'I choose the Mind. Knowledge is power, and power is needed to help.'"},next:"mente",karma:1},
        {text:{it:"«Non posso scegliere adesso. Ho bisogno di entrambe.»",en:"'I can't choose now. I need both.'"},next:"equilibrio",karma:2}
      ]
    },

    /* ═══ CAPITOLO 5: LE VIE ═══ */
    cuore: {
      chapter: 5, title:{it:"La Via del Cuore",en:"The Way of the Heart"},
      text:{it:"La Via del Cuore ti porta dove non volevi andare.\n\nIl Maestro ti assegna un compito: per un mese, compi un atto di servizio anonimo ogni giorno. Nessuno deve sapere. Nessun riconoscimento.\n\nLe prime settimane sono facili. Poi diventa brutale. L'ego urla: «Perché nessuno mi ringrazia? Perché nessuno vede quanto sono buono?»\n\nUn giorno, mentre aiuti un senzatetto sotto la pioggia, qualcosa si rompe dentro di te. Non l'ego — il muro INTORNO all'ego. E per un istante — un istante solo — senti ciò che il Maestro chiama «il Cuore».\n\nNon è un'emozione. È uno stato. Come se l'universo intero respirasse attraverso di te.",
            en:"The Way of the Heart takes you where you didn't want to go.\n\nThe Master gives you a task: for a month, perform an anonymous act of service every day. No one must know. No recognition.\n\nThe first weeks are easy. Then it becomes brutal. The ego screams: 'Why doesn't anyone thank me? Why doesn't anyone see how good I am?'\n\nOne day, while helping a homeless person in the rain, something breaks inside you. Not the ego — the wall AROUND the ego. And for an instant — just one instant — you feel what the Master calls 'the Heart.'\n\nIt's not an emotion. It's a state. As if the entire universe were breathing through you."},
      choices:[
        {text:{it:"Continua verso la notte oscura",en:"Continue towards the dark night"},next:"notte_oscura",karma:2}
      ]
    },
    mente: {
      chapter: 5, title:{it:"La Via della Mente",en:"The Way of the Mind"},
      text:{it:"La Via della Mente è seducente.\n\nIl Maestro ti insegna i meccanismi sottili: come funzionano i centri (intellettuale, emotivo, motorio, istintivo), come le impressioni entrano e si cristallizzano, come la macchina biologica produce «io» diversi che si alternano al comando.\n\nCapisci tutto. Vedi i meccanismi negli altri — e in te stesso. È potere puro: sai perché le persone reagiscono come reagiscono.\n\nMa un giorno il Maestro ti ferma.\n\n«Stai accumulando conoscenza senza trasformarti. Sai tutto sulla trasmutazione del piombo in oro, ma non hai mai messo le mani nel fuoco. La conoscenza senza pratica è il cibo preferito dell'ego spirituale.»\n\n«Cosa mi proponi?»\n\n«Di smettere di studiare. E di iniziare a soffrire coscientemente.»",
            en:"The Way of the Mind is seductive.\n\nThe Master teaches you the subtle mechanisms: how the centres work (intellectual, emotional, motor, instinctive), how impressions enter and crystallise, how the biological machine produces different 'I's that take turns commanding.\n\nYou understand everything. You see the mechanisms in others — and in yourself. It's pure power: you know why people react the way they react.\n\nBut one day the Master stops you.\n\n'You're accumulating knowledge without transforming. You know everything about the transmutation of lead into gold, but you've never put your hands in the fire. Knowledge without practice is the spiritual ego's favourite food.'\n\n'What do you suggest?'\n\n'Stop studying. And start suffering consciously.'"},
      choices:[
        {text:{it:"Accetti. Chiudi i libri e ti getti nel fuoco della pratica.",en:"You accept. You close the books and throw yourself into the fire of practice."},next:"notte_oscura",karma:2},
        {text:{it:"Rifiuti. La conoscenza È il potere, e tu ne vuoi di più.",en:"You refuse. Knowledge IS power, and you want more."},next:"potere_oscuro",karma:-2}
      ]
    },
    equilibrio: {
      chapter: 5, title:{it:"L'Equilibrio",en:"The Balance"},
      text:{it:"Il Maestro sorride.\n\n«Pochi scelgono questa via — perché è la più difficile. Richiede che tu tenga il Cuore e la Mente in equilibrio, senza che uno domini l'altro. È la via dell'Alchimista Completo.»\n\nTi assegna un doppio compito: al mattino, studia i meccanismi della macchina. Alla sera, pratica il servizio anonimo.\n\nÈ estenuante. L'ego non ha dove nascondersi — non nella conoscenza, non nella bontà. Ogni angolo viene illuminato.\n\nDopo tre mesi, il Maestro ti dice: «Sei pronto per la prova più grande.»",
            en:"The Master smiles.\n\n'Few choose this way — because it is the hardest. It requires you to keep Heart and Mind in balance, without one dominating the other. It is the way of the Complete Alchemist.'\n\nHe assigns you a double task: in the morning, study the machine's mechanisms. In the evening, practise anonymous service.\n\nIt's exhausting. The ego has nowhere to hide — not in knowledge, not in goodness. Every corner is illuminated.\n\nAfter three months, the Master tells you: 'You are ready for the greatest trial.'"},
      choices:[
        {text:{it:"Continua verso la notte oscura",en:"Continue towards the dark night"},next:"notte_oscura",karma:3}
      ]
    },
    potere_oscuro: {
      chapter: 5, title:{it:"Il Potere Oscuro",en:"The Dark Power"}, ending:"mago_nero",
      text:{it:"Continui a studiare. Ma non più col Maestro — da solo, in libri sempre più oscuri. Impari a manipolare, a persuadere, a leggere le debolezze altrui.\n\nIl Maestro ti manda un ultimo messaggio:\n\n«Chi cerca il potere per sé stesso ha scelto la via della mano sinistra. Non ti giudico — ma sappi che l'immortalità che cerchi è una prigione. Il mago nero sopravvive, ma non vive. Conserva l'ego per l'eternità — e con esso, la sua sofferenza.»\n\nNon rispondi. Ma negli anni che seguono, ogni successo ha il sapore della cenere. Hai tutto il potere che volevi — e nessuna pace.",
            en:"You continue studying. But no longer with the Master — alone, in ever darker books. You learn to manipulate, to persuade, to read others' weaknesses.\n\nThe Master sends you a final message:\n\n'Those who seek power for themselves have chosen the left-hand path. I don't judge you — but know that the immortality you seek is a prison. The black magus survives, but doesn't live. He preserves the ego for eternity — and with it, his suffering.'\n\nYou don't reply. But in the years that follow, every success tastes of ashes. You have all the power you wanted — and no peace."},
      choices:[]
    },

    /* ═══ CAPITOLO 6: LA NOTTE OSCURA ═══ */
    notte_oscura: {
      chapter: 6, title:{it:"La Notte Oscura",en:"The Dark Night"},
      text:{it:"Arriva senza avviso.\n\nUn giorno, tutto ciò in cui credi crolla. La pratica sembra inutile. Il Maestro sembra un impostore. La «coscienza» sembra un'illusione. Ti senti più perso di quando hai iniziato.\n\nÈ la Notte Oscura dell'Anima — il momento in cui l'ego, sentendosi morire, scatena il suo ultimo assalto.\n\nIl Maestro non viene. Non risponde alle chiamate. Sei solo.\n\nTre settimane di inferno interiore. Dubbio assoluto. Disperazione.\n\nPoi, una notte, una domanda emerge dal silenzio: «Chi è che soffre?»\n\nE in quel momento — un lampo.",
            en:"It arrives without warning.\n\nOne day, everything you believe collapses. The practice seems useless. The Master seems a fraud. 'Consciousness' seems an illusion. You feel more lost than when you began.\n\nIt is the Dark Night of the Soul — the moment when the ego, sensing its death, unleashes its final assault.\n\nThe Master doesn't come. Doesn't answer calls. You are alone.\n\nThree weeks of inner hell. Absolute doubt. Despair.\n\nThen, one night, a question emerges from the silence: 'Who is it that suffers?'\n\nAnd in that moment — a flash."},
      choices:[
        {text:{it:"Rimani nel vuoto. Non cerchi risposte. Lasci che il silenzio risponda.",en:"You stay in the void. You don't seek answers. You let silence answer."},next:"risveglio_finale",karma:3},
        {text:{it:"Cerchi disperatamente il Maestro. Non ce la fai da solo.",en:"You desperately seek the Master. You can't do it alone."},next:"dipendenza",karma:0},
        {text:{it:"Ti arrendi. Abbandoni tutto. «Era tutta un'illusione.»",en:"You give up. You abandon everything. 'It was all an illusion.'"},next:"resa",karma:-1}
      ]
    },
    dipendenza: {
      chapter: 6, title:{it:"La Dipendenza",en:"The Dependence"},
      text:{it:"Trovi il Maestro. Implori aiuto.\n\nTi guarda a lungo, poi dice:\n\n«Ti ho lasciato solo di proposito. Non per crudeltà — perché dovevi scoprire che il Maestro vero non sono io. Sono solo uno specchio. Il Maestro è dentro di te — quella voce che ha chiesto «chi è che soffre?».\n\nFinché dipendi da me, non sei libero. E io non faccio schiavi — faccio uomini liberi.»\n\nÈ la lezione più dura. Ma capisci.",
            en:"You find the Master. You implore for help.\n\nHe looks at you for a long time, then says:\n\n'I left you alone on purpose. Not out of cruelty — because you had to discover that the true Master is not me. I am just a mirror. The Master is within you — that voice that asked \"who is it that suffers?\".\n\nAs long as you depend on me, you are not free. And I don't make slaves — I make free men.'"},
      choices:[
        {text:{it:"Torni nel silenzio — questa volta senza cercare aiuto esterno.",en:"You return to the silence — this time without seeking external help."},next:"risveglio_finale",karma:2}
      ]
    },
    resa: {
      chapter: 6, title:{it:"La Resa",en:"The Surrender"}, ending:"ritorno",
      text:{it:"Abbandoni tutto. Torni alla vita di prima.\n\nMa non è più la stessa. Non puoi più guardare il mondo con gli stessi occhi. Sai troppo per dormire completamente, e troppo poco per restare sveglio.\n\nSei sospeso in un limbo: né dormiente né sveglio. Il peggiore dei mondi — perché conosci la prigione ma hai scelto di restare dentro.\n\nForse un giorno riprenderai il cammino. La porta è sempre aperta. Ma ogni giorno che passa, la voce interiore si fa più debole.",
            en:"You abandon everything. You return to your former life.\n\nBut it's no longer the same. You can't look at the world with the same eyes anymore. You know too much to sleep completely, and too little to stay awake.\n\nYou're suspended in a limbo: neither asleep nor awake. The worst of worlds — because you know the prison but have chosen to stay inside.\n\nPerhaps one day you'll resume the path. The door is always open. But with each passing day, the inner voice grows fainter."},
      choices:[]
    },

    /* ═══ CAPITOLO 7: IL RISVEGLIO ═══ */
    risveglio_finale: {
      chapter: 7, title:{it:"Il Risveglio",en:"The Awakening"}, ending:"risvegliato",
      text:{it:"Nel silenzio, senza cercare, trovi.\n\nNon è un'esplosione. Non è un'estasi. È qualcosa di molto più semplice e molto più vasto: la realizzazione che non c'è mai stata separazione. Tu e il mondo. Tu e gli altri. Tu e il divino. Mai separati — solo illuso di esserlo.\n\nIl Maestro appare il giorno dopo. Ti guarda e ride.\n\n«Ci sei arrivato. Non io ti ci ho portato — ci sei arrivato tu.»\n\n«Ma... e adesso?»\n\n«Adesso? Adesso cominci davvero. Tutto ciò che è venuto prima era solo preparazione. La vita reale — la vita cosciente — inizia ora.»\n\nTi porge un quaderno vuoto. Lo stesso di quel primo giorno.\n\n«Scrivici dentro la prima pagina della tua nuova vita.»\n\nSorridete entrambi. E il sole — per la prima volta — sembra vero.",
            en:"In the silence, without seeking, you find.\n\nIt's not an explosion. It's not an ecstasy. It's something much simpler and much vaster: the realisation that there was never any separation. You and the world. You and others. You and the divine. Never separate — only the illusion of being so.\n\nThe Master appears the next day. He looks at you and laughs.\n\n'You made it. I didn't bring you here — you arrived on your own.'\n\n'But... what now?'\n\n'Now? Now you truly begin. Everything that came before was just preparation. The real life — the conscious life — starts now.'\n\nHe hands you an empty notebook. The same one from that first day.\n\n'Write in it the first page of your new life.'\n\nYou both smile. And the sun — for the first time — seems real."},
      choices:[]
    }
  },
  endings: {
    dormiente:          {glyph:"☾",score:0},
    cercatore_incompiuto:{glyph:"△",score:1},
    orgoglioso:         {glyph:"◇",score:2},
    mago_nero:          {glyph:"✧",score:2},
    ritorno:            {glyph:"◐",score:3},
    risvegliato:        {glyph:"☉",score:5}
  }
};
})();
