/* IL SENTIERO DELL'INIZIAZIONE — data.js (da "Iniziazione umana e solare" di Alice A. Bailey) */
(function(){
"use strict";
window.DUNGEON_DATA = {
  maxLuce: 14,
  startLuce: 7,
  planes: [
  /* ═══ TAPPA 1: IL SENTIERO DELLA PROVA ═══ */
  { key:"prova", color:"#8a7a5a", glyph:"◌",
    title:{it:"Il Sentiero della Prova",en:"The Path of Probation"},
    subtitle:{it:"La formazione del carattere",en:"Character building"},
    intro:{it:"Ti sei schierato dal lato delle forze evolutive. Qui non ci sono cerimonie né maestri visibili: c'è solo il lavoro quotidiano su te stesso. 'Prendersi in mano': coltivare le qualità che mancano, dominare la personalità.",en:"You have ranged yourself on the side of the forces of evolution. Here there are no ceremonies, no visible teachers: only the daily work upon yourself. 'Taking yourself in hand': cultivating the missing qualities, mastering the personality."},
    rooms:[
      {text:{it:"Scopri in te una mancanza precisa: una qualità che non hai mai sviluppato, perché era scomodo farlo. Ora la vedi chiaramente, come un vuoto nel tuo carattere.",
             en:"You discover in yourself a precise lack: a quality you never developed, because it was uncomfortable to do so. Now you see it clearly, like a gap in your character."},
       choices:[
         {text:{it:"La compensi con le qualità che già possiedi: perché faticare?",en:"You compensate with the qualities you already have: why toil?"},luce:-1,type:"mechanical",
          result:{it:"Il corpo causale si costruisce colmando ogni lacuna, non aggirandola. Ciò che eviti oggi ti aspetterà domani.",en:"The causal body is built by filling every gap, not by skirting it. What you avoid today will await you tomorrow."}},
         {text:{it:"Cominci a coltivarla deliberatamente, giorno dopo giorno.",en:"You begin to cultivate it deliberately, day after day."},luce:1,type:"conscious",
          result:{it:"È il lavoro del Sentiero della Prova: costruire il carattere come un ricettacolo idoneo al principio cristico.",en:"This is the work of the Probationary Path: building character as a fit receptacle for the Christ principle."}}
       ]},
      {text:{it:"Nessuno si accorge dei tuoi sforzi. Nessun maestro appare, nessun segno arriva. Solo lavoro silenzioso, mentre intorno gli altri vivono come hanno sempre vissuto.\n\nUn dubbio si insinua: e se tutto questo fosse inutile?",
             en:"No one notices your efforts. No master appears, no sign arrives. Only silent work, while around you others live as they always have.\n\nA doubt creeps in: what if all this is useless?"},
       choices:[
         {text:{it:"Cerchi conferme: pratiche vistose, gruppi, attestati spirituali.",en:"You seek confirmation: showy practices, groups, spiritual credentials."},luce:-1,type:"mechanical",
          result:{it:"Il periodo della gestazione è nascosto per natura. Il Cristo bambino si forma nel cuore, non sul palcoscenico.",en:"The gestation period is hidden by nature. The Christ-child forms in the heart, not on a stage."}},
         {text:{it:"Continui in silenzio: il seme non ha bisogno di spettatori per germogliare.",en:"You continue in silence: the seed needs no spectators to sprout."},luce:1,type:"conscious",
          result:{it:"Il Sentiero della Prova corrisponde all'ultimo periodo della gestazione. Ciò che si forma in te non si vede — ancora.",en:"The Probationary Path corresponds to the last period of gestation. What forms in you cannot be seen — yet."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Vecchio Sé",en:"The Old Self"},
      text:{it:"Le tue abitudini di sempre prendono forma davanti a te: un te stesso comodo, simpatico, riconoscibile.\n\n«Perché cambiarci? Siamo ciò che sei. Tutti ti conoscono così. Senza di noi, chi saresti?»",
            en:"Your lifelong habits take shape before you: a comfortable, likeable, recognisable you.\n\n'Why change us? We are what you are. Everyone knows you this way. Without us, who would you be?'"},
      choices:[
        {text:{it:"«Siete una forma che ho costruito. Posso costruirne una più vera.»",en:"'You are a form I built. I can build a truer one.'"},luce:1,type:"conscious",
         result:{it:"Retto vivere, retto pensare, retta condotta: il carattere è una forma — e ora dev'essere vivificata e abitata dall'interno.",en:"Right living, right thinking, right conduct: character is a form — and now it must be vivified and indwelt."}},
        {text:{it:"«Hai ragione. Sono fatto così.»",en:"'You are right. This is just how I am.'"},luce:-2,type:"mechanical",
         result:{it:"'Sono fatto così' è la frase con cui la personalità chiude la porta del Sentiero. Ma la porta non sparisce: aspetta.",en:"'This is just how I am' is the phrase with which the personality shuts the door of the Path. But the door does not vanish: it waits."}}
      ]}
  },
  /* ═══ TAPPA 2: IL DISCEPOLATO ═══ */
  { key:"discepolato", color:"#6a9a7a", glyph:"◍",
    title:{it:"Il Discepolato",en:"Discipleship"},
    subtitle:{it:"Dal personale all'impersonale",en:"From the personal to the impersonal"},
    intro:{it:"Ti sei consacrato a servire l'umanità e a cooperare con il Piano. Il centro della tua attività deve ora spostarsi: da te stesso — perno attorno a cui tutto ruotava — al centro del gruppo.",en:"You have pledged yourself to serve humanity and co-operate with the Plan. The centre of your activity must now shift: from yourself — the pivot around which all revolved — to the centre of the group."},
    rooms:[
      {text:{it:"Nel lavoro di gruppo arriva un successo: il progetto a cui hai dato più di tutti viene lodato — ma il merito viene attribuito a un altro.",
             en:"In the group work a success comes: the project you gave most to is praised — but the credit goes to another."},
       choices:[
         {text:{it:"Rivendichi il tuo contributo: la giustizia prima di tutto.",en:"You claim your contribution: justice first of all."},luce:-1,type:"mechanical",
          result:{it:"Il discepolo realizza la relativa insignificanza di ogni unità — e anche la sua importanza. Il merito personale è ancora il perno antico.",en:"The disciple realises the relative insignificance of each unit — and also its importance. Personal credit is still the old pivot."}},
         {text:{it:"Lasci correre: ciò che conta è che il lavoro sia compiuto.",en:"You let it pass: what matters is that the work is done."},luce:1,type:"conscious",
          result:{it:"Trasferire la coscienza dal personale all'impersonale: questo è il discepolato. Il gruppo ha ricevuto; questo basta.",en:"Shifting consciousness from the personal to the impersonal: this is discipleship. The group received; that is enough."}}
       ]},
      {text:{it:"I tuoi cari si ribellano alla tua crescente impersonalità: «Sei cambiato. Non sei più dei nostri». Ti vogliono unito a loro nei desideri e negli interessi, come prima.",
             en:"Your loved ones rebel against your growing impersonality: 'You've changed. You're no longer one of us.' They want you joined to them in desires and interests, as before."},
       choices:[
         {text:{it:"Torni come prima: l'amore vale più del cammino.",en:"You go back to how you were: love is worth more than the path."},luce:-1,type:"mechanical",
          result:{it:"La vera unità può essere conosciuta soltanto in quella essenziale dell'anima. Recitare la vecchia parte non è amore: è paura.",en:"True unity can be known only in the essential unity of the soul. Playing the old part is not love: it is fear."}},
         {text:{it:"Resti te stesso e li ami dal piano della vita, non da quello delle forme.",en:"You remain yourself and love them from the side of life, not of forms."},luce:1,type:"conscious",
          result:{it:"La scoperta di ciò che è la forma reca sofferenza al discepolo — ma col tempo la via conduce alla perfetta unione.",en:"Discovering what form is brings the disciple suffering — but in time the way leads to perfect union."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Orgoglio del Servizio",en:"The Pride of Service"},
      text:{it:"Una figura luminosa ti mostra il bilancio del tuo servizio: persone aiutate, opere compiute, gratitudine raccolta.\n\n«Guarda quanto hai fatto. Sei più avanti degli altri. Il tuo servizio ti rende speciale.»",
            en:"A luminous figure shows you the ledger of your service: people helped, works accomplished, gratitude gathered.\n\n'Look how much you have done. You are ahead of the others. Your service makes you special.'"},
      choices:[
        {text:{it:"«Sono un avamposto della coscienza del Maestro: il servizio passa attraverso di me, non da me.»",en:"'I am an outpost of the Master's consciousness: service passes through me, not from me.'"},luce:1,type:"conscious",
         result:{it:"Il discepolo è un centro di forza entro un centro di forza più vasto, responsabile solo della direzione dell'energia.",en:"The disciple is a centre of force within a vaster centre of force, responsible only for the direction of the energy."}},
        {text:{it:"Accetti il riconoscimento: in fondo, te lo sei guadagnato.",en:"You accept the credit: after all, you earned it."},luce:-2,type:"mechanical",
         result:{it:"Il servizio che incorona il servitore è il travestimento più elegante della personalità. La porta dell'iniziazione resta chiusa.",en:"Service that crowns the servant is the personality's most elegant disguise. The door of initiation stays shut."}}
      ]}
  },
  /* ═══ TAPPA 3: LA PRIMA INIZIAZIONE ═══ */
  { key:"nascita", color:"#9a6a3a", glyph:"☆",
    title:{it:"La Prima Iniziazione — la Nascita",en:"The First Initiation — the Birth"},
    subtitle:{it:"Il dominio del corpo fisico",en:"Control of the physical body"},
    intro:{it:"Prima iniziazione significa semplicemente 'inizio': la nascita del Cristo nel cuore. Ma per varcarla, l'Ego deve avere acquistato un notevole dominio sul corpo fisico. L'elementale fisico non deve più ricevere risposta alle proprie richieste.",en:"First initiation simply means 'beginning': the birth of the Christ in the heart. But to pass it, the Ego must have gained marked control of the physical body. The physical elemental must no longer receive answer to its demands."},
    rooms:[
      {text:{it:"Il corpo reclama i suoi appetiti di sempre: cibo oltre la fame, stordimento oltre la sete, piacere oltre il bisogno. Oggi reclama più forte del solito — proprio perché hai iniziato a dirgli di no.",
             en:"The body claims its usual appetites: food beyond hunger, numbing beyond thirst, pleasure beyond need. Today it claims louder than usual — precisely because you have begun to say no."},
       choices:[
         {text:{it:"Cedi 'solo per oggi': domani ricomincerai.",en:"You give in 'just for today': tomorrow you will start again."},luce:-1,type:"mechanical",
          result:{it:"Ghiottoneria, alcolismo e dissolutezza non devono avere alcun potere: il dominio dev'essere completo, ogni allettamento scomparso.",en:"Gluttony, drink and licentiousness must have no power: control must be complete, every allurement gone."}},
         {text:{it:"Osservi il reclamo senza obbedirgli, finché tace da solo.",en:"You watch the claim without obeying it, until it falls silent by itself."},luce:1,type:"conscious",
          result:{it:"L'elementale fisico non riceve più risposta: l'obbedienza della carne diventa quasi automatica.",en:"The physical elemental no longer receives an answer: the obedience of the flesh becomes almost automatic."}}
       ]},
      {text:{it:"Hai commesso un errore — pubblico, visibile. Gli altri lo hanno notato. Puoi minimizzare, giustificarti, oppure…",
             en:"You have made a mistake — public, visible. Others noticed. You can minimise, justify yourself, or…"},
       choices:[
         {text:{it:"Minimizzi: un iniziato non può permettersi di apparire fallibile.",en:"You minimise: an initiate cannot afford to look fallible."},luce:-1,type:"mechanical",
          result:{it:"La nota fondamentale dell'iniziato è la rettitudine: riconoscere i propri errori con sincerità e apertamente.",en:"The keynote of the initiate is rectitude: acknowledging one's errors sincerely and openly."}},
         {text:{it:"Lo riconosci apertamente e ripari, senza drammi.",en:"You acknowledge it openly and make amends, without drama."},luce:1,type:"conscious",
          result:{it:"Gli iniziati possono cadere e cadono — ma riconoscono l'errore e si sforzano palesemente di conformarsi al livello più alto.",en:"Initiates can and do fall — but they acknowledge the error and openly strive to conform to the highest standard."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Elementale Fisico",en:"The Physical Elemental"},
      text:{it:"La vita istintiva del tuo corpo si erge davanti a te, antica di milioni di anni.\n\n«Io ti ho tenuto in vita da sempre. Le mie voglie sono i miei salari. Negarmeli è negare la vita stessa.»",
            en:"The instinctive life of your body rises before you, millions of years old.\n\n'I have kept you alive since always. My cravings are my wages. To deny them is to deny life itself.'"},
      choices:[
        {text:{it:"«Ti onoro come servitore, non come padrone. I tuoi salari sono salute e misura — non eccesso.»",en:"'I honour you as servant, not as master. Your wages are health and measure — not excess.'"},luce:1,type:"conscious",
         result:{it:"Il centro del cuore si vivifica. La Nascita è avvenuta: il Cristo bambino è nato nella caverna del cuore.",en:"The heart centre is vivified. The Birth has occurred: the Christ-child is born in the cave of the heart."}},
        {text:{it:"Tratti il corpo da nemico: digiuni punitivi, rigori estremi.",en:"You treat the body as an enemy: punitive fasts, extreme rigours."},luce:-2,type:"mechanical",
         result:{it:"Mortificare non è dominare: l'ascetismo violento è ancora l'elementale al comando — ribaltato. Il dominio è quieto, non crudele.",en:"Mortifying is not mastering: violent asceticism is still the elemental in command — inverted. Mastery is quiet, not cruel."}}
      ]}
  },
  /* ═══ TAPPA 4: LA SECONDA INIZIAZIONE ═══ */
  { key:"battesimo", color:"#3a6a9a", glyph:"≈",
    title:{it:"La Seconda Iniziazione — il Battesimo",en:"The Second Initiation — the Baptism"},
    subtitle:{it:"Il dominio del corpo astrale",en:"Control of the astral body"},
    intro:{it:"La crisi del dominio sul corpo astrale: il sacrificio e la morte del desiderio. Fra la Nascita e il Battesimo possono trascorrere molte vite — è il passo più lungo. Il corpo delle emozioni deve diventare puro e limpido.",en:"The crisis of control of the astral body: the sacrifice and death of desire. Between the Birth and the Baptism many lives may pass — it is the longest step. The body of the emotions must become pure and limpid."},
    rooms:[
      {text:{it:"Un'ondata emotiva ti travolge: qualcuno ha ferito ciò che ami. La collera sale, giustificata, sacrosanta. Tutto in te chiede di restituire il colpo.",
             en:"An emotional wave overwhelms you: someone has hurt what you love. Anger rises, justified, sacrosanct. Everything in you demands to strike back."},
       choices:[
         {text:{it:"Colpisci: c'è una collera giusta, e questa lo è.",en:"You strike: there is such a thing as righteous anger, and this is it."},luce:-1,type:"mechanical",
          result:{it:"L'onda ti ha usato come strumento. Il corpo astrale agitato non distingue la giustizia dalla vendetta.",en:"The wave used you as its instrument. The agitated astral body cannot tell justice from revenge."}},
         {text:{it:"Lasci passare l'onda attraverso di te senza esserne mosso — poi agisci, se serve.",en:"You let the wave pass through you unmoved — then act, if needed."},luce:1,type:"conscious",
          result:{it:"Il corpo emotivo puro e limpido riflette senza distorcere: l'azione che nasce dalla calma colpisce più giusto di quella nata dall'ira.",en:"The pure, limpid emotional body reflects without distorting: action born of calm strikes truer than action born of anger."}}
       ]},
      {text:{it:"Scopri che il tuo desiderio più caro — quello che ha orientato anni della tua vita — non è ciò che l'anima chiede. Sono due strade diverse.",
             en:"You discover that your dearest desire — the one that steered years of your life — is not what the soul asks. They are two different roads."},
       choices:[
         {text:{it:"Difendi il tuo desiderio: ci hai investito troppo per lasciarlo.",en:"You defend your desire: you have invested too much to let it go."},luce:-1,type:"mechanical",
          result:{it:"L'investimento non rende vero ciò che è caro. Il desiderio difeso a oltranza diventa il muro fra te e l'Ego.",en:"Investment does not make the cherished true. Desire defended at all costs becomes the wall between you and the Ego."}},
         {text:{it:"Lo deponi: 'la morte del desiderio è stata la meta dello sforzo'.",en:"You lay it down: 'the death of desire has been the goal of endeavour.'"},luce:1,type:"conscious",
          result:{it:"Il desiderio è dominato dall'Ego: ora l'iniziato tende soltanto al bene del Tutto, in accordo con la volontà dell'Ego e del Maestro.",en:"Desire is mastered by the Ego: now the initiate aims only at the good of the Whole, in line with the will of Ego and Master."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Elementale Astrale",en:"The Astral Elemental"},
      text:{it:"Le acque del piano astrale si sollevano in un'unica figura ondeggiante, fatta di tutte le tue paure e brame.\n\n«Senza di me la tua vita sarà piatta, grigia, senza passione. Io SONO la tua vitalità.»",
            en:"The waters of the astral plane rise into a single swaying figure, made of all your fears and cravings.\n\n'Without me your life will be flat, grey, passionless. I AM your vitality.'"},
      choices:[
        {text:{it:"«Confondi l'agitazione con la vita. L'amore quieto è più vivo di ogni tempesta.»",en:"'You mistake agitation for life. Quiet love is more alive than any storm.'"},luce:1,type:"conscious",
         result:{it:"Le acque si calmano in uno specchio limpido. Il centro della gola si vivifica: ora puoi servire con la parola.",en:"The waters settle into a limpid mirror. The throat centre is vivified: now you can serve through the word."}},
        {text:{it:"Temi che abbia ragione: trattieni qualche tempesta, per sentirti vivo.",en:"You fear it is right: you keep a few storms, to feel alive."},luce:-2,type:"mechanical",
         result:{it:"Ogni tempesta trattenuta è una porta socchiusa. L'elementale rientra da dove vuole, quando vuole.",en:"Every storm retained is a door left ajar. The elemental re-enters where it wills, when it wills."}}
      ]}
  },
  /* ═══ TAPPA 5: LA TERZA INIZIAZIONE ═══ */
  { key:"trasfigurazione", color:"#7a5ab0", glyph:"✧",
    title:{it:"La Terza Iniziazione — la Trasfigurazione",en:"The Third Initiation — the Transfiguration"},
    subtitle:{it:"Il dominio della mente",en:"Control of the mind"},
    intro:{it:"La personalità intera, dominata e integrata, viene trasfigurata dalla luce dell'Ego. Ora la prova è la più sottile: la mente stessa — l'ultimo e il più raffinato dei veicoli — deve cedere il comando.",en:"The whole personality, mastered and integrated, is transfigured by the light of the Ego. Now the test is the subtlest: the mind itself — the last and most refined of the vehicles — must yield command."},
    rooms:[
      {text:{it:"La tua mente, ormai potente, costruisce sistemi perfetti: spiegazioni complete di te, del mondo, del cammino. Sono belli, coerenti — e cominciano a sostituire l'esperienza diretta.",
             en:"Your mind, now powerful, builds perfect systems: complete explanations of yourself, the world, the path. They are beautiful, coherent — and they begin to replace direct experience."},
       choices:[
         {text:{it:"Perfezioni ancora il sistema: la comprensione completa è quasi raggiunta.",en:"You refine the system further: complete understanding is almost reached."},luce:-1,type:"mechanical",
          result:{it:"La mente è il fattore creativo per eccellenza — e per questo la sua prigione è la più elegante. La mappa non è il territorio.",en:"The mind is the creative factor par excellence — and for this reason its prison is the most elegant. The map is not the territory."}},
         {text:{it:"Usi il sistema come strumento, e lo deponi quando l'esperienza parla.",en:"You use the system as a tool, and lay it down when experience speaks."},luce:1,type:"conscious",
          result:{it:"La mente dominata è un proiettore della luce dell'anima, non uno schermo che la sostituisce.",en:"The mastered mind is a projector of the soul's light, not a screen that replaces it."}}
       ]},
      {text:{it:"La luce dell'Ego comincia a investire la personalità. Per un istante vedi te stesso dall'alto: i tre corpi allineati, docili, trasparenti.\n\nE arriva un pensiero: «Guarda cosa sono diventato».",
             en:"The Ego's light begins to flood the personality. For an instant you see yourself from above: the three bodies aligned, docile, transparent.\n\nAnd a thought arrives: 'Look what I have become.'"},
       choices:[
         {text:{it:"Ti compiaci: il riconoscimento è meritato.",en:"You bask in it: the recognition is deserved."},luce:-1,type:"mechanical",
          result:{it:"L'ultimo rifugio della personalità è l'orgoglio spirituale. Si traveste da gratitudine, ma dice sempre 'io'.",en:"The personality's last refuge is spiritual pride. It disguises itself as gratitude, but it always says 'I'."}},
         {text:{it:"Lasci che la luce attraversi anche quel pensiero, fino a dissolverlo.",en:"You let the light pass through that thought too, until it dissolves."},luce:1,type:"conscious",
          result:{it:"La Trasfigurazione: non c'è più nessuno da incoronare. La personalità è diventata vetro per la luce.",en:"The Transfiguration: there is no one left to crown. The personality has become glass for the light."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Orgoglio Intellettuale",en:"Intellectual Pride"},
      text:{it:"Un essere di pensiero puro, splendido e gelido, ti sbarra la strada con un sorriso.\n\n«Hai capito tutto. Hai letto, meditato, compreso. Che altro può darti un'iniziazione, se non ciò che già sai?»",
            en:"A being of pure thought, splendid and icy, bars your way with a smile.\n\n'You have understood everything. You have read, meditated, comprehended. What can an initiation give you that you do not already know?'"},
      choices:[
        {text:{it:"«Conoscere non è essere. Mi inchino a ciò che la mente non può contenere.»",en:"'Knowing is not being. I bow to what the mind cannot contain.'"},luce:1,type:"conscious",
         result:{it:"L'essere gelido si scioglie in luce. La mente, deposta la corona, diventa ciò che doveva essere: un servitore perfetto.",en:"The icy being melts into light. The mind, its crown laid down, becomes what it was meant to be: a perfect servant."}},
        {text:{it:"Rispondi con la più brillante delle tue argomentazioni.",en:"You answer with the most brilliant of your arguments."},luce:-2,type:"mechanical",
         result:{it:"Hai vinto il dibattito e perso il passaggio. L'orgoglio intellettuale non si sconfigge a parole: si depone.",en:"You won the debate and lost the passage. Intellectual pride is not defeated with words: it is laid down."}}
      ]}
  },
  /* ═══ TAPPA 6: LA RINUNCIA E LA RIVELAZIONE ═══ */
  { key:"rinuncia", color:"#c9973a", glyph:"✦",
    title:{it:"La Rinuncia e la Rivelazione",en:"The Renunciation and the Revelation"},
    subtitle:{it:"La quarta e la quinta iniziazione",en:"The fourth and fifth initiations"},
    intro:{it:"La Crocifissione: tutto ciò che è più caro al cuore dev'essere sacrificato, volontariamente. Si giunge alla Porta 'con i piedi lavati nel sangue del cuore'. Oltre — la Rivelazione, e i sette Sentieri.",en:"The Crucifixion: all that is dearest to the heart must be sacrificed, willingly. One reaches the Gate 'with feet washed in the blood of the heart'. Beyond — the Revelation, and the seven Paths."},
    rooms:[
      {text:{it:"Ti viene chiesto l'ultimo sacrificio: non i vizi — quelli sono già caduti — ma le cose buone. Il frutto del tuo lavoro, la tua reputazione, perfino la consolazione del cammino stesso.",
             en:"The last sacrifice is asked of you: not the vices — those have already fallen — but the good things. The fruit of your work, your reputation, even the consolation of the path itself."},
       choices:[
         {text:{it:"Offri tutto, ma trattieni una sola cosa: la certezza di essere nel giusto.",en:"You offer everything, but keep one thing: the certainty of being right."},luce:-1,type:"mechanical",
          result:{it:"La rinuncia che trattiene qualcosa non è rinuncia: è un contratto. Sul braccio verticale della Croce si sale a mani vuote.",en:"Renunciation that keeps something back is not renunciation: it is a contract. One climbs the Cross's vertical arm with empty hands."}},
         {text:{it:"Apri anche l'ultima mano: «considero tutto perduto, pur di conquistare la meta».",en:"You open the last hand too: 'counting all things lost, so I may win the goal.'"},luce:1,type:"conscious",
          result:{it:"«Solo mani vuote, segnate dai chiodi, assicurano la continuità della catena» — una tesa a Chi sta sopra, l'altra all'uomo che segue.",en:"'Only hands that are empty, marked by the nails, ensure the continuity of the chain' — one stretched to Him above, the other to the man who follows."}}
       ]},
      {text:{it:"L'abisso. Nessun ponte visibile. Dietro di te, tutto ciò che hai lasciato; davanti, il buio della 'notte tempestosa' di cui parla il Catechismo.",
             en:"The abyss. No visible bridge. Behind you, all you have left; ahead, the dark of the 'stormy night' the Catechism speaks of."},
       choices:[
         {text:{it:"Aspetti che appaia un ponte, una garanzia, un segno.",en:"You wait for a bridge, a guarantee, a sign to appear."},luce:-1,type:"mechanical",
          result:{it:"Il ponte sull'abisso non preesiste: «si costruisce con atti amorevoli compiuti nella sofferenza della vita».",en:"The bridge over the abyss does not pre-exist: 'it is built with loving deeds done in the pain of living.'"}},
         {text:{it:"Avanzi: ogni atto d'amore compiuto è una pietra del ponte già posata.",en:"You step forward: every act of love accomplished is a stone of the bridge already laid."},luce:1,type:"conscious",
          result:{it:"«Si passa fra le lacrime, le nubi e le nebbie; si sale da soli.» Ma il ponte regge: era costruito da tutta la tua vita.",en:"'One passes amid tears, clouds and mists; one climbs alone.' But the bridge holds: your whole life had been building it."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Hierofante",en:"The Hierophant"},
      text:{it:"Oltre l'abisso, una Presenza ti attende con la Verga dell'Iniziazione. La domanda dell'antico catechismo risuona:\n\n«Quale parte hai tu in questo piano, o Pellegrino sul Sentiero? Come ti presenterai dinanzi al tuo Signore?»",
            en:"Beyond the abyss, a Presence awaits you with the Rod of Initiation. The question of the ancient catechism resounds:\n\n'What part do you play in this plan, O Pilgrim on the Path? How will you stand before your Lord?'"},
      choices:[
        {text:{it:"«Guardo in alto, aiuto in basso; lavoro, servo, raccolgo, prego. Sono la Croce, sono la Via.»",en:"'I look above, I help below; I work, I serve, I gather, I pray. I am the Cross, I am the Way.'"},luce:1,type:"conscious",
         result:{it:"La Verga tocca il tuo capo. «Nella tensione del dolore perdo me stesso, trovo Me stesso — ed entro nella pace.» I sette Sentieri si aprono.",en:"The Rod touches your head. 'In the strain of pain I lose myself, I find Myself — and enter into peace.' The seven Paths open."}},
        {text:{it:"«Ho fatto del mio meglio. Chiedo la ricompensa promessa.»",en:"'I did my best. I ask for the promised reward.'"},luce:-2,type:"mechanical",
         result:{it:"«Uccido il desiderio e mi sforzo, dimenticando ogni ricompensa.» Chi chiede il premio non ha ancora compiuto la Rinuncia.",en:"'I kill desire and I strive, forgetting all reward.' One who asks for the prize has not yet accomplished the Renunciation."}}
      ]}
  }
  ]
};
})();
