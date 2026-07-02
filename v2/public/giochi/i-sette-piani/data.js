/* I SETTE PIANI — data.js (spiritual dungeon-crawler) */
(function(){
"use strict";
window.DUNGEON_DATA = {
  id: "dng",
  maxLuce: 14,
  startLuce: 7,
  planes: [
  /* ═══ PIANO 1: FISICO ═══ */
  { key:"fisico", color:"#8a7a5a", glyph:"⬡",
    title:{it:"Piano Fisico",en:"Physical Plane"},
    subtitle:{it:"La materia densa",en:"Dense matter"},
    intro:{it:"Sei nel piano più denso dell'esistenza. Tutto è peso, forma, solidità. Il tuo corpo è una macchina biologica — ma chi la guida?",en:"You are in the densest plane of existence. Everything is weight, form, solidity. Your body is a biological machine — but who drives it?"},
    rooms:[
      {text:{it:"Una stanza buia. Senti il tuo cuore battere, il respiro, il sangue nelle orecchie. Non vedi nulla. Solo il corpo esiste qui.\n\nUna voce dice: «Chi sei senza i tuoi cinque sensi?»",
             en:"A dark room. You feel your heartbeat, your breath, the blood in your ears. You see nothing. Only the body exists here.\n\nA voice says: 'Who are you without your five senses?'"},
       choices:[
         {text:{it:"«Sono il corpo. Senza i sensi non esisto.»",en:"'I am the body. Without senses I don't exist.'"},luce:-1,type:"mechanical",
          result:{it:"Il corpo è un veicolo, non il guidatore. Identificarsi con esso è la prima prigione.",en:"The body is a vehicle, not the driver. Identifying with it is the first prison."}},
         {text:{it:"«I sensi sono strumenti. Io sono chi li usa.»",en:"'The senses are instruments. I am the one who uses them.'"},luce:1,type:"conscious",
          result:{it:"Esatto. Il corpo fisico è il tempio — ma tu non sei il tempio. Sei chi lo abita.",en:"Exactly. The physical body is the temple — but you are not the temple. You are the one who inhabits it."}},
         {text:{it:"Resti in silenzio. Ascolti.",en:"You stay silent. You listen."},luce:0,type:"neutral",
          result:{it:"Il silenzio è un buon inizio. Ma la domanda resta — e chiederà risposta.",en:"Silence is a good start. But the question remains — and will demand an answer."}}
       ]},
      {text:{it:"Una porta si apre su un corridoio di specchi. Ogni specchio mostra una versione diversa di te: da bambino, da vecchio, malato, sano, ricco, povero.\n\nQuale sei davvero?",
             en:"A door opens onto a corridor of mirrors. Each mirror shows a different version of you: as a child, old, sick, healthy, rich, poor.\n\nWhich one are you really?"},
       choices:[
         {text:{it:"«Sono tutti loro. E nessuno di loro.»",en:"'I am all of them. And none of them.'"},luce:1,type:"conscious",
          result:{it:"Le forme cambiano. Ciò che osserva le forme non cambia mai. Hai colto la prima chiave.",en:"Forms change. What observes the forms never changes. You've grasped the first key."}},
         {text:{it:"Ti fermi davanti allo specchio che ti piace di più.",en:"You stop in front of the mirror you like best."},luce:-1,type:"mechanical",
          result:{it:"L'attaccamento all'immagine preferita è la trappola del piano fisico. L'ego sceglie sempre ciò che lo lusinga.",en:"Attachment to the preferred image is the physical plane's trap. The ego always chooses what flatters it."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Guardiano della Soglia Terrestre",en:"The Guardian of the Earthly Threshold"},
      text:{it:"Un gigante di pietra blocca la scala che sale. I suoi occhi sono vuoti.\n\n«Nessuno sale se porta il peso del corpo con sé. Cosa sei disposto a lasciare?»",
            en:"A stone giant blocks the stairway up. Its eyes are empty.\n\n'No one ascends who carries the body's weight. What are you willing to leave behind?'"},
      choices:[
        {text:{it:"«Lascio l'identificazione con il corpo. Porto solo la consapevolezza.»",en:"'I leave identification with the body. I carry only awareness.'"},luce:1,type:"conscious",
         result:{it:"Il gigante si sgretola. La scala si apre. Sei più leggero di prima.",en:"The giant crumbles. The stairway opens. You are lighter than before."}},
        {text:{it:"«Non lascio niente. Il corpo è tutto ciò che ho.»",en:"'I leave nothing. The body is all I have.'"},luce:-2,type:"mechanical",
         result:{it:"Il gigante ti respinge. Perdi energia. Ma la scala, alla fine, si apre lo stesso — il cammino prosegue, più difficile.",en:"The giant pushes you back. You lose energy. But the stairway opens anyway — the path continues, harder."}}
      ]}
  },
  /* ═══ PIANO 2: ETERICO ═══ */
  { key:"eterico", color:"#6a9a7a", glyph:"◎",
    title:{it:"Piano Eterico",en:"Etheric Plane"},
    subtitle:{it:"L'energia vitale",en:"Vital energy"},
    intro:{it:"L'aria vibra. Senti correnti di energia fluire attraverso il corpo come fiumi invisibili. Questo è il doppio eterico — il campo di forza che anima la materia.",en:"The air vibrates. You feel currents of energy flowing through the body like invisible rivers. This is the etheric double — the force field that animates matter."},
    rooms:[
      {text:{it:"Vedi il tuo corpo dall'esterno. È circondato da un alone luminoso che pulsa ritmicamente. In alcuni punti è brillante; in altri, scuro e stagnante.\n\nI punti scuri corrispondono alle parti del corpo dove senti dolore da anni.",
             en:"You see your body from the outside. It's surrounded by a luminous halo pulsing rhythmically. In some places it's brilliant; in others, dark and stagnant.\n\nThe dark spots correspond to the body parts where you've felt pain for years."},
       choices:[
         {text:{it:"Dirigi l'attenzione verso i punti oscuri. Respiri luce in essi.",en:"You direct attention to the dark spots. You breathe light into them."},luce:1,type:"conscious",
          result:{it:"L'attenzione cosciente è la medicina del corpo eterico. Dove porti la consapevolezza, l'energia ricomincia a fluire.",en:"Conscious attention is the etheric body's medicine. Where you bring awareness, energy flows again."}},
         {text:{it:"Ignori i punti scuri. Ti concentri sulla luce.",en:"You ignore the dark spots. You focus on the light."},luce:-1,type:"mechanical",
          result:{it:"Ignorare la malattia non la guarisce. Il corpo eterico riflette ogni blocco emotivo non risolto.",en:"Ignoring illness doesn't heal it. The etheric body reflects every unresolved emotional block."}}
       ]},
      {text:{it:"Un vortice di energia ti attira verso il basso. È piacevole — caldo, avvolgente, come addormentarsi in un letto morbido. Una voce sussurra: «Resta qui. Non hai bisogno di salire.»",
             en:"A vortex of energy pulls you downward. It's pleasant — warm, enveloping, like falling asleep in a soft bed. A voice whispers: 'Stay here. You don't need to go higher.'"},
       choices:[
         {text:{it:"Resisti. Riconosci la seduzione dell'inerzia.",en:"You resist. You recognise the seduction of inertia."},luce:1,type:"conscious",
          result:{it:"L'inerzia è la forza più potente del piano eterico. Chi cede resta intrappolato nel comfort — sveglio abbastanza da sentire, addormentato abbastanza da non agire.",en:"Inertia is the etheric plane's most powerful force. Those who yield remain trapped in comfort — awake enough to feel, asleep enough not to act."}},
         {text:{it:"Ti abbandoni al calore. «Solo un momento...»",en:"You surrender to the warmth. 'Just a moment...'"},luce:-1,type:"mechanical",
          result:{it:"Il «solo un momento» diventa un'eternità. L'inerzia ti ha quasi intrappolato — ti risvegli di scatto, ma hai perso energia.",en:"'Just a moment' becomes an eternity. Inertia almost trapped you — you jolt awake, but you've lost energy."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Vampiro Eterico",en:"The Etheric Vampire"},
      text:{it:"Una figura translucida si materializza. Non ha volto proprio — prende il volto di chiunque ti abbia mai prosciugato energia. Ex, colleghi tossici, familiari manipolatori.\n\n«Dammi la tua energia. Me la devi.»",
            en:"A translucent figure materialises. It has no face of its own — it takes the face of everyone who ever drained your energy. Exes, toxic colleagues, manipulative relatives.\n\n'Give me your energy. You owe me.'"},
      choices:[
        {text:{it:"«Non devo niente a nessuno. La mia energia è mia.» Tagli il cordone.",en:"'I owe nothing to anyone. My energy is mine.' You cut the cord."},luce:1,type:"conscious",
         result:{it:"Il vampiro si dissolve urlando. I cordoni eterici si spezzano. Senti un'ondata di energia tornare nel tuo campo.",en:"The vampire dissolves, screaming. The etheric cords snap. You feel a wave of energy return to your field."}},
        {text:{it:"Ti senti in colpa. Gli dai un po' di energia.",en:"You feel guilty. You give it some energy."},luce:-2,type:"mechanical",
         result:{it:"La colpa è il cibo preferito del vampiro eterico. Ogni volta che cedi, il cordone si rafforza.",en:"Guilt is the etheric vampire's favourite food. Every time you yield, the cord strengthens."}}
      ]}
  },
  /* ═══ PIANO 3: ASTRALE ═══ */
  { key:"astrale", color:"#7c3a6a", glyph:"✦",
    title:{it:"Piano Astrale",en:"Astral Plane"},
    subtitle:{it:"Il mondo delle emozioni",en:"The world of emotions"},
    intro:{it:"Colori ovunque — più vividi di qualsiasi cosa tu abbia mai visto. Ogni tua emozione è visibile: la rabbia è rossa, la paura grigia, l'amore dorato. Qui non puoi mentire — l'aura mostra tutto.",en:"Colours everywhere — more vivid than anything you've ever seen. Every emotion of yours is visible: anger is red, fear grey, love golden. Here you cannot lie — the aura shows everything."},
    rooms:[
      {text:{it:"Una tempesta di colori ti investe: rosso rabbia, verde gelosia, arancione desiderio. Sono le tue emozioni non elaborate — cristallizzate in forme viventi che ti circondano come animali affamati.\n\nOgnuna vuole la tua attenzione. Ognuna dice: «Sono io la più importante.»",
             en:"A storm of colours hits you: red anger, green jealousy, orange desire. They are your unprocessed emotions — crystallised into living forms circling you like hungry animals.\n\nEach one wants your attention. Each says: 'I am the most important.'"},
       choices:[
         {text:{it:"Le osservi tutte senza nutrirne nessuna. Rimani al centro, immobile.",en:"You observe them all without feeding any. You remain at the centre, still."},luce:1,type:"conscious",
          result:{it:"Le forme-pensiero si nutrono di identificazione. Quando le osservi senza reagire, si indeboliscono e si dissolvono una dopo l'altra.",en:"Thought-forms feed on identification. When you observe without reacting, they weaken and dissolve one after another."}},
         {text:{it:"Cerchi di combatterle — di scacciarle con la volontà.",en:"You try to fight them — to chase them away with willpower."},luce:-1,type:"mechanical",
          result:{it:"Combattere un'emozione la rafforza. «Ciò a cui resisti, persiste.» Le forme diventano più grandi e aggressive.",en:"Fighting an emotion strengthens it. 'What you resist, persists.' The forms grow larger and more aggressive."}}
       ]},
      {text:{it:"Un paesaggio meraviglioso appare: un giardino paradisiaco, musica celestiale, esseri di luce che ti sorridono. Tutto è perfetto. Troppo perfetto.\n\nUna parte di te sa che è un'illusione del piano astrale — ma è così bello.",
             en:"A wonderful landscape appears: a paradisiacal garden, celestial music, beings of light smiling at you. Everything is perfect. Too perfect.\n\nA part of you knows it's an illusion of the astral plane — but it's so beautiful."},
       choices:[
         {text:{it:"«È bello, ma non è reale. Proseguo.»",en:"'It's beautiful, but it's not real. I continue.'"},luce:1,type:"conscious",
          result:{it:"Le illusioni piacevoli sono più pericolose di quelle terrificanti — perché non vuoi lasciarle. Ma l'attaccamento al paradiso è pur sempre attaccamento.",en:"Pleasant illusions are more dangerous than terrifying ones — because you don't want to leave them. But attachment to paradise is still attachment."}},
         {text:{it:"Resti. È il paradiso — perché mai dovresti andartene?",en:"You stay. It's paradise — why would you ever leave?"},luce:-1,type:"mechanical",
          result:{it:"Il paradiso astrale è la trappola dorata. Molte anime restano qui per eoni, intrappolate nel piacere, senza mai salire ai piani superiori.",en:"The astral paradise is the golden trap. Many souls remain here for aeons, trapped in pleasure, never rising to the higher planes."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Demone dello Specchio",en:"The Mirror Demon"},
      text:{it:"Un demone appare — ma ha il tuo volto. Mostra ogni emozione che hai represso, ogni desiderio che hai negato, ogni paura che hai nascosto.\n\n«Mi riconosci? Sono tutto ciò che non vuoi essere.»",
            en:"A demon appears — but it has your face. It shows every emotion you've suppressed, every desire you've denied, every fear you've hidden.\n\n'Do you recognise me? I am everything you don't want to be.'"},
      choices:[
        {text:{it:"«Ti riconosco. Sei la mia ombra. Ti accetto.»",en:"'I recognise you. You are my shadow. I accept you.'"},luce:2,type:"conscious",
         result:{it:"Il demone cambia forma — diventa luce. L'ombra accettata si integra. Sei più intero di prima.",en:"The demon changes form — it becomes light. The accepted shadow integrates. You are more whole than before."}},
        {text:{it:"«Tu non esisti! Vattene!»",en:"'You don't exist! Go away!'"},luce:-2,type:"mechanical",
         result:{it:"Negare l'ombra la rafforza. Il demone ride: «Più mi neghi, più io cresco.» Passi, ma ferito.",en:"Denying the shadow strengthens it. The demon laughs: 'The more you deny me, the more I grow.' You pass, but wounded."}}
      ]}
  },
  /* ═══ PIANO 4: MENTALE INFERIORE ═══ */
  { key:"mentale_inf", color:"#3a6a9a", glyph:"◈",
    title:{it:"Piano Mentale Inferiore",en:"Lower Mental Plane"},
    subtitle:{it:"Il pensiero concreto",en:"Concrete thought"},
    intro:{it:"Forme geometriche perfette fluttuano ovunque — sono pensieri cristallizzati. Ogni convinzione è un edificio, ogni pregiudizio un muro. Il mondo mentale inferiore è costruito dalle tue certezze.",en:"Perfect geometric forms float everywhere — they are crystallised thoughts. Every conviction is a building, every prejudice a wall. The lower mental world is built from your certainties."},
    rooms:[
      {text:{it:"Sei circondato da muri altissimi fatti di parole: «ho ragione», «è sempre così», «non cambierò mai», «il mondo è fatto così». Ogni muro è una convinzione limitante che hai costruito negli anni.\n\nDietro i muri, intravedi una luce immensa.",
             en:"You are surrounded by towering walls made of words: 'I'm right', 'it's always like this', 'I'll never change', 'that's how the world is'. Each wall is a limiting belief you've built over the years.\n\nBehind the walls, you glimpse an immense light."},
       choices:[
         {text:{it:"Tocchi un muro e dici: «Questa non è verità. È solo un pensiero.» Il muro si dissolve.",en:"You touch a wall and say: 'This is not truth. It is only a thought.' The wall dissolves."},luce:1,type:"conscious",
          result:{it:"I pensieri non sono fatti. Le convinzioni sono prigioni volontarie. Dissolverne uno apre lo spazio per la verità.",en:"Thoughts are not facts. Convictions are voluntary prisons. Dissolving one opens space for truth."}},
         {text:{it:"Cerchi un'uscita tra i muri, senza toccarli. «Qualcuno deve averle messe qui.»",en:"You look for a way out between the walls, without touching them. 'Someone must have put them here.'"},luce:-1,type:"mechanical",
          result:{it:"Nessuno ha costruito i tuoi muri tranne te. Cercare un colpevole esterno è la strategia preferita della mente inferiore.",en:"No one built your walls but you. Looking for an external culprit is the lower mind's favourite strategy."}}
       ]},
      {text:{it:"Un libro infinito appare davanti a te. Contiene tutte le risposte a tutte le domande. Ma una clausola è scritta sulla copertina: «Chi legge tutte le risposte non avrà più domande. E chi non ha domande non cerca più.»",
             en:"An infinite book appears before you. It contains all answers to all questions. But a clause is written on the cover: 'Whoever reads all the answers will have no more questions. And whoever has no questions seeks no more.'"},
       choices:[
         {text:{it:"Chiudi il libro. «Le risposte senza esperienza sono vuote.»",en:"You close the book. 'Answers without experience are empty.'"},luce:1,type:"conscious",
          result:{it:"La conoscenza intellettuale è la mappa, non il territorio. Hai scelto di camminare anziché leggere del cammino.",en:"Intellectual knowledge is the map, not the territory. You chose to walk rather than read about the walk."}},
         {text:{it:"Leggi avidamente. Vuoi sapere tutto.",en:"You read avidly. You want to know everything."},luce:-1,type:"mechanical",
          result:{it:"Il sapere senza pratica è il cibo dell'ego intellettuale. Più sai, più credi di non aver bisogno di trasformarti.",en:"Knowledge without practice is the intellectual ego's food. The more you know, the more you believe you don't need to transform."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Architetto delle Certezze",en:"The Architect of Certainties"},
      text:{it:"Un essere fatto di equazioni e logica perfetta ti blocca.\n\n«Prova che esisti. Prova che la coscienza è reale. Senza prove, non passi.»\n\nÈ il guardiano della mente razionale: vuole che tutto sia dimostrabile.",
            en:"A being made of equations and perfect logic blocks you.\n\n'Prove you exist. Prove consciousness is real. Without proof, you don't pass.'\n\nIt is the guardian of the rational mind: it wants everything to be provable."},
      choices:[
        {text:{it:"«La coscienza non si prova — si vive. Io sono la prova.»",en:"'Consciousness cannot be proved — it is lived. I am the proof.'"},luce:1,type:"conscious",
         result:{it:"L'Architetto si dissolve. La razionalità è uno strumento prezioso, ma pretendere di dimostrare tutto è la sua prigione.",en:"The Architect dissolves. Rationality is a precious tool, but demanding to prove everything is its prison."}},
        {text:{it:"Cerchi di costruire un argomento logico perfetto.",en:"You try to build a perfect logical argument."},luce:-1,type:"mechanical",
         result:{it:"Non puoi dimostrare la coscienza con la mente — come l'occhio non può vedere se stesso. L'Architetto ride della tua logica.",en:"You cannot prove consciousness with the mind — just as the eye cannot see itself. The Architect laughs at your logic."}}
      ]}
  },
  /* ═══ PIANO 5: MENTALE SUPERIORE (CAUSALE) ═══ */
  { key:"causale", color:"#5a5aaa", glyph:"△",
    title:{it:"Piano Causale",en:"Causal Plane"},
    subtitle:{it:"Il corpo dell'anima",en:"The soul's body"},
    intro:{it:"Per la prima volta, senti l'Anima. Non come concetto — come presenza reale. È il corpo causale: il veicolo che sopravvive a tutte le morti, che porta con sé l'essenza di ogni vita.",en:"For the first time, you feel the Soul. Not as a concept — as a real presence. It is the causal body: the vehicle that survives all deaths, carrying the essence of every life."},
    rooms:[
      {text:{it:"Visioni di vite passate ti attraversano come un fiume. Non sono ricordi — sono lezioni. Ogni vita aveva un tema: amore non dato, coraggio mancato, verità non detta.\n\nUna voce dice: «Questa vita — quella che stai vivendo ora — qual è il suo tema?»",
             en:"Visions of past lives flow through you like a river. They are not memories — they are lessons. Each life had a theme: love not given, courage not shown, truth not spoken.\n\nA voice says: 'This life — the one you're living now — what is its theme?'"},
       choices:[
         {text:{it:"Ascolti nel silenzio. La risposta emerge da sola, chiara come un cristallo.",en:"You listen in silence. The answer emerges on its own, clear as crystal."},luce:1,type:"conscious",
          result:{it:"L'anima conosce il tema della tua vita. Non servono parole — serve ascolto. In quel silenzio, capisci perché sei qui.",en:"The soul knows the theme of your life. No words are needed — only listening. In that silence, you understand why you're here."}},
         {text:{it:"Analizzi intellettualmente ogni vita cercando il pattern.",en:"You intellectually analyse each life looking for the pattern."},luce:0,type:"neutral",
          result:{it:"L'intelletto può mappare, ma non sentire. Il tema della vita si rivela al Cuore, non alla mente.",en:"The intellect can map, but not feel. The theme of life reveals itself to the Heart, not the mind."}}
       ]},
      {text:{it:"Due figure appaiono: la Personalità e l'Anima. La Personalità è rumorosa, colorata, insistente. L'Anima è silenziosa, luminosa, paziente.\n\nLa Personalità dice: «Senza di me non puoi vivere nel mondo.»\nL'Anima dice: «Senza di me non puoi vivere.»",
             en:"Two figures appear: the Personality and the Soul. The Personality is noisy, colourful, insistent. The Soul is silent, luminous, patient.\n\nThe Personality says: 'Without me you can't live in the world.'\nThe Soul says: 'Without me you cannot live.'"},
       choices:[
         {text:{it:"«L'Anima guida, la Personalità serve. Non il contrario.»",en:"'The Soul leads, the Personality serves. Not the other way around.'"},luce:2,type:"conscious",
          result:{it:"L'allineamento è completo. La Personalità non è un nemico — è uno strumento. Ma deve essere al servizio dell'Anima, non il contrario.",en:"The alignment is complete. The Personality is not an enemy — it's an instrument. But it must serve the Soul, not the other way around."}},
         {text:{it:"«Servono entrambe in egual misura.»",en:"'Both are needed in equal measure.'"},luce:0,type:"neutral",
          result:{it:"L'equilibrio sembra saggio, ma è un compromesso. L'Anima e la Personalità non sono alla pari: una è eterna, l'altra è temporanea.",en:"Balance seems wise, but it's a compromise. The Soul and the Personality are not equals: one is eternal, the other temporary."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Guardiano del Silenzio",en:"The Guardian of Silence"},
      text:{it:"Nessuna forma. Nessun suono. Solo un vuoto immenso e una domanda che senti nelle ossa:\n\n«Sei disposto a smettere di pensare?»\n\nNon per un momento — per sempre. Lasciar andare la mente come strumento primario. Fidarti di qualcosa di più profondo.",
            en:"No form. No sound. Just an immense void and a question you feel in your bones:\n\n'Are you willing to stop thinking?'\n\nNot for a moment — forever. To let go of the mind as the primary instrument. To trust something deeper."},
      choices:[
        {text:{it:"Lasci andare. Il pensiero si ferma. Il silenzio parla.",en:"You let go. Thought stops. Silence speaks."},luce:2,type:"conscious",
         result:{it:"Nel silenzio oltre il pensiero abita la vera intelligenza — quella dell'Anima. Non ha bisogno di parole per conoscere.",en:"In the silence beyond thought dwells true intelligence — that of the Soul. It needs no words to know."}},
        {text:{it:"«Non posso smettere di pensare. Chi sarei senza i miei pensieri?»",en:"'I can't stop thinking. Who would I be without my thoughts?'"},luce:-1,type:"mechanical",
         result:{it:"La paura di perdere la mente è la mente che protegge se stessa. Ma tu non sei i tuoi pensieri — sei chi li osserva.",en:"The fear of losing the mind is the mind protecting itself. But you are not your thoughts — you are the one who observes them."}}
      ]}
  },
  /* ═══ PIANO 6: BUDDHICO ═══ */
  { key:"buddhico", color:"#7a5ab0", glyph:"◇",
    title:{it:"Piano Buddhico",en:"Buddhic Plane"},
    subtitle:{it:"L'intuizione e l'unità",en:"Intuition and unity"},
    intro:{it:"Qui la separazione scompare. Non c'è più «io» e «tu» — solo Uno che si sperimenta come molti. L'intuizione non è un pensiero: è un sapere diretto, senza mediazione della mente.",en:"Here separation disappears. There is no more 'I' and 'you' — only One experiencing itself as many. Intuition is not a thought: it is direct knowing, without the mind's mediation."},
    rooms:[
      {text:{it:"Vedi tutte le persone della tua vita — amici, nemici, amori, estranei — e per la prima volta capisci: sono tutti te. Ogni incontro era uno specchio. Ogni conflitto, un dialogo interiore.\n\nIl «nemico» ti ha insegnato tanto quanto l'«amico».",
             en:"You see all the people in your life — friends, enemies, lovers, strangers — and for the first time you understand: they are all you. Every encounter was a mirror. Every conflict, an inner dialogue.\n\nThe 'enemy' taught you as much as the 'friend.'"},
       choices:[
         {text:{it:"Senti gratitudine per tutti — inclusi quelli che ti hanno ferito.",en:"You feel gratitude for everyone — including those who hurt you."},luce:2,type:"conscious",
          result:{it:"La gratitudine per il «nemico» è il segno che hai trasceso la dualità. Sul piano buddhico, il positivo e il negativo sono uno.",en:"Gratitude for the 'enemy' is the sign you've transcended duality. On the buddhic plane, positive and negative are one."}},
         {text:{it:"Capisci il concetto, ma non riesci a perdonare tutti.",en:"You understand the concept, but can't forgive everyone."},luce:0,type:"neutral",
          result:{it:"La comprensione intellettuale è un inizio. Ma il piano buddhico richiede il Cuore, non la mente. Il perdono verrà.",en:"Intellectual understanding is a beginning. But the buddhic plane requires the Heart, not the mind. Forgiveness will come."}}
       ]},
      {text:{it:"Un flusso di conoscenza diretta ti attraversa. Sai cose che non hai mai studiato. Vedi connessioni invisibili tra eventi apparentemente separati. La mente tace — e al suo posto, qualcosa di più vasto pensa attraverso di te.",
             en:"A flow of direct knowing passes through you. You know things you've never studied. You see invisible connections between seemingly separate events. The mind is silent — and in its place, something vaster thinks through you."},
       choices:[
         {text:{it:"Ti arrendi al flusso. Lasci che l'intuizione guidi.",en:"You surrender to the flow. You let intuition guide."},luce:1,type:"conscious",
          result:{it:"L'intuizione buddhica è la voce dell'Anima che parla senza parole. Fidarsi di essa è l'atto di fede più grande.",en:"Buddhic intuition is the Soul's voice speaking without words. Trusting it is the greatest act of faith."}},
         {text:{it:"Cerchi di memorizzare e razionalizzare ciò che senti.",en:"You try to memorise and rationalise what you feel."},luce:-1,type:"mechanical",
          result:{it:"La mente razionale non può contenere l'intuizione — è come versare l'oceano in un bicchiere. Ciò che cerchi di afferrare, sfugge.",en:"The rational mind cannot contain intuition — it's like pouring the ocean into a glass. What you try to grasp, escapes."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Velo dell'Illusione",en:"The Veil of Illusion"},
      text:{it:"Non è una creatura — è un velo sottilissimo tra te e la Verità ultima. Attraverso il velo, intravedi una luce così intensa che fa paura.\n\nUna voce sussurra: «Attraversare il velo significa non poter mai più tornare a ciò che eri. Sei pronto?»",
            en:"It's not a creature — it's the thinnest veil between you and ultimate Truth. Through the veil, you glimpse a light so intense it frightens.\n\nA voice whispers: 'To cross the veil means never being able to return to what you were. Are you ready?'"},
      choices:[
        {text:{it:"Attraversi il velo. Non c'è nulla da perdere — solo illusioni.",en:"You cross the veil. There is nothing to lose — only illusions."},luce:2,type:"conscious",
         result:{it:"Il velo si dissolve come nebbia al sole. Oltre, c'è solo luce. E in quella luce, riconosci te stesso.",en:"The veil dissolves like mist in sunlight. Beyond, there is only light. And in that light, you recognise yourself."}},
        {text:{it:"Esiti. «E se dall'altra parte non c'è nulla?»",en:"You hesitate. 'What if there's nothing on the other side?'"},luce:-1,type:"mechanical",
         result:{it:"La paura del vuoto è l'ultimo trucco dell'ego. Ma anche nell'esitazione, la luce filtra. Passi, tremando.",en:"Fear of the void is the ego's last trick. But even in hesitation, the light filters through. You pass, trembling."}}
      ]}
  },
  /* ═══ PIANO 7: ATMICO ═══ */
  { key:"atmico", color:"#c9973a", glyph:"☉",
    title:{it:"Piano Atmico",en:"Atmic Plane"},
    subtitle:{it:"La volontà divina",en:"Divine will"},
    intro:{it:"Sei arrivato. Il piano della pura Volontà divina. Qui non c'è più separazione, non c'è più ricerca. C'è solo Essere.",en:"You've arrived. The plane of pure divine Will. Here there is no more separation, no more seeking. There is only Being."},
    rooms:[
      {text:{it:"Una luce dorata che non ha sorgente riempie tutto. Non c'è spazio, non c'è tempo. Solo una presenza infinita che è, contemporaneamente, te e tutto ciò che esiste.\n\nCapisci, in un lampo: non sei mai stato separato. La separazione era il sogno. Il risveglio è ricordare.",
             en:"A golden light with no source fills everything. There is no space, no time. Only an infinite presence that is, simultaneously, you and everything that exists.\n\nYou understand, in a flash: you were never separate. Separation was the dream. Awakening is remembering."},
       choices:[
         {text:{it:"Ti dissolvi nella luce. Non c'è più «io» — solo Uno.",en:"You dissolve into the light. There is no more 'I' — only One."},luce:2,type:"conscious",
          result:{it:"La goccia torna all'oceano. Ma non scompare — scopre di essere sempre stata l'oceano che sognava di essere una goccia.",en:"The drop returns to the ocean. But it doesn't disappear — it discovers it was always the ocean dreaming of being a drop."}}
       ]}
    ],
    guardian:null
  }]
};
})();
