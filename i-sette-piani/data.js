/* I SETTE PIANI — data.js (spiritual dungeon-crawler)
   Sequenza dei piani secondo Salvatore Brizzi, «I mondi spirituali»:
   1 Fisico ed Eterico, 2 Astrale, 3 Mentale e Causale, 4 Buddhico,
   5 Atmico, 6 Anupadaka, 7 Adi. La luce massima la calcola il motore. */
(function(){
"use strict";
window.DUNGEON_DATA = {
  id: "dng",
  startLuce: 7,
  planes: [
  /* ═══ PIANO 1: FISICO ED ETERICO ═══ */
  { key:"fisico", color:"#8a7a5a", glyph:"⬡",
    title:{it:"Piano Fisico",en:"Physical Plane"},
    subtitle:{it:"Il corpo denso e il doppio eterico",en:"The dense body and the etheric double"},
    intro:{it:"Sei nel piano più denso, l'unico visibile agli occhi dell'uomo ordinario. I suoi tre sottopiani più bassi sono il solido, il liquido e il gassoso. I quattro più alti formano l'eterico, detto doppio eterico perché è una copia perfetta del corpo fisico.",en:"You are in the densest plane, the only one visible to the eyes of ordinary man. Its three lowest subplanes are solid, liquid and gaseous. The four highest form the etheric, called the etheric double because it is a perfect copy of the physical body."},
    rooms:[
      {text:{it:"Una stanza buia. Senti il tuo cuore battere, il respiro, il sangue nelle orecchie. Non vedi nulla. Solo il corpo esiste qui.\n\nUna voce dice: «Chi sei senza i tuoi cinque sensi?»",
             en:"A dark room. You feel your heartbeat, your breath, the blood in your ears. You see nothing. Only the body exists here.\n\nA voice says: 'Who are you without your five senses?'"},
       choices:[
         {text:{it:"«Sono il corpo. Senza i sensi non esisto.»",en:"'I am the body. Without senses I don't exist.'"},luce:-1,type:"mechanical",
          result:{it:"Sentirsi il proprio corpo di carne è la prima prigione. I sensi, poi, colgono solo una stretta finestra di frequenze: tutto il resto dell'universo resta fuori.",en:"Feeling that you are your body of flesh is the first prison. And the senses catch only a narrow window of frequencies: the rest of the universe stays outside."}},
         {text:{it:"«I sensi sono strumenti. Io sono chi li usa.»",en:"'The senses are instruments. I am the one who uses them.'"},luce:1,type:"conscious",
          result:{it:"Esatto. Il corpo è un veicolo che ti avvolge e ti serve per muoverti nel mondo materiale. Tu sei chi lo abita.",en:"Exactly. The body is a vehicle that envelops you and lets you move through the material world. You are the one who inhabits it."}},
         {text:{it:"Resti in silenzio. Ascolti.",en:"You stay silent. You listen."},luce:0,type:"neutral",
          result:{it:"Il silenzio è un buon inizio. La domanda però resta aperta.",en:"Silence is a good start. The question, though, remains open."}}
       ]},
      {text:{it:"Vedi il tuo corpo dall'esterno. È avvolto da una griglia di linee luminose, come una guaina. In alcuni punti brilla; in altri è grigia, e avvicinando le mani senti zone più fredde.\n\nI punti grigi corrispondono alle parti del corpo dove senti dolore da anni.",
             en:"You see your body from the outside. It is wrapped in a grid of luminous lines, like a sheath. In some places it shines; in others it is grey, and bringing your hands close you feel colder areas.\n\nThe grey spots correspond to the body parts where you've felt pain for years."},
       choices:[
         {text:{it:"Porti l'attenzione sui punti grigi e mandi amore a quelle parti del corpo.",en:"You bring your attention to the grey spots and send love to those parts of the body."},luce:1,type:"conscious",
          result:{it:"I punti grigi sono blocchi che impediscono al prana di fluire liberamente. Li hai guardati invece di rifiutarli, e la griglia ricomincia a illuminarsi.",en:"The grey spots are blocks that keep prana from flowing freely. You looked at them instead of rejecting them, and the grid begins to light up again."}},
         {text:{it:"Ignori i punti grigi. Ti concentri sulla luce.",en:"You ignore the grey spots. You focus on the light."},luce:-1,type:"mechanical",
          result:{it:"I blocchi restano dove sono, e il prana continua a non passare. Distogliere lo sguardo non li scioglie.",en:"The blocks stay where they are, and prana still cannot pass. Looking away does not dissolve them."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Vampiro Eterico",en:"The Etheric Vampire"},
      text:{it:"Una figura translucida si materializza. Non ha un volto proprio: prende il volto di chiunque ti abbia mai prosciugato energia. Ex, colleghi tossici, familiari manipolatori.\n\n«Dammi la tua energia. Me la devi.»",
            en:"A translucent figure materialises. It has no face of its own: it takes the face of everyone who ever drained your energy. Exes, toxic colleagues, manipulative relatives.\n\n'Give me your energy. You owe me.'"},
      choices:[
        {text:{it:"Resti presente al senso di colpa che il vampiro risveglia, e lo guardi senza cedere.",en:"You stay present to the guilt the vampire awakens, and look at it without yielding."},luce:2,type:"conscious",
         result:{it:"Osservato alla luce della presenza, il vampiro si dissolve: si nutriva della tua colpa. Senti un'ondata di energia tornare nel tuo campo.",en:"Observed in the light of presence, the vampire dissolves: it was feeding on your guilt. You feel a wave of energy return to your field."}},
        {text:{it:"Ti senti in colpa. Gli dai un po' di energia.",en:"You feel guilty. You give it some energy."},luce:-2,type:"mechanical",
         result:{it:"Un vampiro entra solo se lo inviti, e la colpa è il tuo invito. Ogni volta che cedi, torna più forte.",en:"A vampire enters only if you invite it, and guilt is your invitation. Every time you yield, it comes back stronger."}}
      ]}
  },
  /* ═══ PIANO 2: ASTRALE ═══ */
  { key:"astrale", color:"#7c3a6a", glyph:"✦",
    title:{it:"Piano Astrale",en:"Astral Plane"},
    subtitle:{it:"Il piano emotivo",en:"The emotional plane"},
    intro:{it:"È il piano più vicino al fisico: fra le due materie c'è la stessa differenza che fra il ghiaccio e il vapore. La luce è diffusa e non viene da nessuna direzione. Ogni tua emozione ha un colore nell'aura: la collera è un lampo rosso scuro su fondo nero, la paura grigio livido, l'amore rosa.",en:"It is the plane closest to the physical: between the two kinds of matter there is the same difference as between ice and steam. The light is diffuse and comes from no direction. Each of your emotions has a colour in the aura: anger is a flash of dark red on a black ground, fear livid grey, love pink."},
    rooms:[
      {text:{it:"Una tempesta di colori ti investe: rosso cupo di sensualità, bruno-verdastro di gelosia, arancio d'orgoglio. Sono le tue emozioni, diventate forme viventi che ti girano intorno come animali affamati.\n\nOgnuna vuole la tua attenzione. Ognuna dice: «Sono io la più importante.»",
             en:"A storm of colours hits you: the dark red of sensuality, the greenish-brown of jealousy, the orange of pride. They are your emotions, turned into living forms circling you like hungry animals.\n\nEach one wants your attention. Each says: 'I am the most important.'"},
       choices:[
         {text:{it:"Le osservi tutte senza nutrirne nessuna. Rimani al centro, immobile.",en:"You observe them all without feeding any. You remain at the centre, still."},luce:1,type:"conscious",
          result:{it:"Contrastare le emozioni è una partita persa in partenza. Osservandole crei in te un punto che non si muove con loro, e le forme si indeboliscono una dopo l'altra.",en:"Opposing emotions is a game lost from the start. By observing them you create in yourself a point that does not move with them, and the forms weaken one after another."}},
         {text:{it:"Cerchi di combatterle, di scacciarle con la volontà.",en:"You try to fight them, to chase them away with willpower."},luce:-1,type:"mechanical",
          result:{it:"Più resisti, più ti colpiscono. Le forme diventano più grandi e aggressive.",en:"The more you resist, the harder they hit you. The forms grow larger and more aggressive."}}
       ]},
      {text:{it:"Appare un paesaggio meraviglioso: un giardino paradisiaco, musica celestiale, esseri di luce che ti sorridono. Tutto è perfetto. Troppo perfetto.\n\nUna parte di te sa che è una creazione del piano astrale. Ma è così bello.",
             en:"A wonderful landscape appears: a paradisiacal garden, celestial music, beings of light smiling at you. Everything is perfect. Too perfect.\n\nA part of you knows it is a creation of the astral plane. But it's so beautiful."},
       choices:[
         {text:{it:"«È bello, ma è una forma creata dal desiderio. Proseguo.»",en:"'It's beautiful, but it's a form created by desire. I continue.'"},luce:1,type:"conscious",
          result:{it:"Questo piano è detto il reame dell'illusione perché i suoi abitanti cambiano forma e creano mondi fantastici in cui confondono il visitatore. Hai visto il giardino per quello che è.",en:"This plane is called the realm of illusion because its inhabitants change form and create fantastic worlds in which they confuse the visitor. You saw the garden for what it is."}},
         {text:{it:"Resti. È il paradiso: perché mai dovresti andartene?",en:"You stay. It's paradise: why would you ever leave?"},luce:-1,type:"mechanical",
          result:{it:"Scenari come questo ammaliano il viaggiatore neofita, che rischia di perdersi e di aggiungere le proprie fantasie a quelle già presenti. C'è chi resta per anni su questi livelli prima di salire.",en:"Scenes like this enchant the novice traveller, who risks getting lost and adding his own fantasies to those already there. Some stay on these levels for years before rising."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Demone dello Specchio",en:"The Mirror Demon"},
      text:{it:"Appare un demone con il tuo volto. Mostra ogni emozione che hai represso, ogni desiderio che hai negato, ogni paura che hai nascosto.\n\n«Mi riconosci? Sono tutto ciò che non vuoi essere.»",
            en:"A demon appears with your face. It shows every emotion you've suppressed, every desire you've denied, every fear you've hidden.\n\n'Do you recognise me? I am everything you don't want to be.'"},
      choices:[
        {text:{it:"«Ti riconosco. Sei la mia ombra. Ti accetto.»",en:"'I recognise you. You are my shadow. I accept you.'"},luce:2,type:"conscious",
         result:{it:"Il demone cambia forma e diventa luce. Accettata e amata, la parte che rifiutavi si integra in te. Sei più intero di prima.",en:"The demon changes form and becomes light. Accepted and loved, the part you rejected integrates into you. You are more whole than before."}},
        {text:{it:"«Tu non esisti! Vattene!»",en:"'You don't exist! Go away!'"},luce:-2,type:"mechanical",
         result:{it:"Negare l'ombra la rafforza. Il demone ride: «Più mi neghi, più io cresco.» Passi, ma ferito.",en:"Denying the shadow strengthens it. The demon laughs: 'The more you deny me, the more I grow.' You pass, but wounded."}}
      ]}
  },
  /* ═══ PIANO 3: MENTALE E CAUSALE ═══ */
  { key:"mentale", color:"#3a6a9a", glyph:"◈",
    title:{it:"Piano Mentale",en:"Mental Plane"},
    subtitle:{it:"Il pensiero concreto e il pensiero astratto",en:"Concrete thought and abstract thought"},
    intro:{it:"I quattro sottopiani più bassi sono il mentale inferiore, la mente razionale, sede del pensiero concreto. I tre più alti sono il causale, la mente astratta. Il corpo causale è il corpo dell'anima: si costruisce con il Lavoro, e solo ciò che hai costruito qui sopravvive alla morte.",en:"The four lowest subplanes are the lower mental, the rational mind, seat of concrete thought. The three highest are the causal, the abstract mind. The causal body is the soul's body: it is built through the Work, and only what you have built here survives death."},
    rooms:[
      {text:{it:"Un'onda di astio attraversa la stanza. Non ha un oggetto: è solo una vibrazione. Un istante dopo ti ritrovi furioso con qualcuno a cui non pensavi da mesi.",
             en:"A wave of spite crosses the room. It has no object: it is only a vibration. A moment later you find yourself furious with someone you hadn't thought of in months."},
       choices:[
         {text:{it:"«Questo pensiero non è mio.» Riconosci l'onda e la lasci passare.",en:"'This thought is not mine.' You recognise the wave and let it pass."},luce:1,type:"conscious",
          result:{it:"Quasi tutto ciò che ti attraversa viene dalla mente collettiva. L'hai riconosciuto, e l'onda è passata senza trascinarti.",en:"Almost everything that passes through you comes from the collective mind. You recognised it, and the wave passed without dragging you along."}},
         {text:{it:"Segui la rabbia: quella persona se lo merita.",en:"You follow the anger: that person deserves it."},luce:-1,type:"mechanical",
          result:{it:"L'onda ha trovato in te una parte che vibrava all'unisono e l'ha portata in superficie. Hai scambiato per tuo un pensiero di passaggio.",en:"The wave found a part of you vibrating in unison and brought it to the surface. You took a passing thought for your own."}}
       ]},
      {text:{it:"Due figure appaiono: la Personalità e l'Anima. La Personalità è rumorosa, colorata, insistente. L'Anima è silenziosa, luminosa, paziente.\n\nLa Personalità dice: «Senza di me non sopravvivi.»\nL'Anima non dice nulla. Aspetta.",
             en:"Two figures appear: the Personality and the Soul. The Personality is noisy, colourful, insistent. The Soul is silent, luminous, patient.\n\nThe Personality says: 'Without me you won't survive.'\nThe Soul says nothing. It waits."},
       choices:[
         {text:{it:"Sposti il centro della tua consapevolezza nell'Anima. La Personalità resta, al suo servizio.",en:"You move the centre of your awareness into the Soul. The Personality stays, in its service."},luce:1,type:"conscious",
          result:{it:"La personalità è una macchina perfetta per sopravvivere; l'anima vive. Spostare il centro della consapevolezza dall'una all'altra è il passaggio che il Lavoro chiede.",en:"The personality is a perfect machine for survival; the soul lives. Moving the centre of awareness from one to the other is the step the Work asks for."}},
         {text:{it:"«Servono entrambe in egual misura.»",en:"'Both are needed in equal measure.'"},luce:0,type:"neutral",
          result:{it:"Sembra una risposta saggia, e lascia il centro della consapevolezza dov'era. Le due figure restano a guardarti.",en:"It sounds like a wise answer, and it leaves the centre of awareness where it was. The two figures keep watching you."}},
         {text:{it:"Dai ragione alla Personalità: prima di tutto bisogna sopravvivere.",en:"You side with the Personality: first of all, one must survive."},luce:-1,type:"mechanical",
          result:{it:"È la voce della macchina biologica, costruita su aggressività e paura. Finché comanda lei, la voce dell'Anima non si sente.",en:"It is the voice of the biological machine, built on aggression and fear. As long as it rules, the Soul's voice cannot be heard."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Guardiano del Silenzio",en:"The Guardian of Silence"},
      text:{it:"Nessuna forma. Nessun suono. Solo un vuoto immenso e una domanda che senti nelle ossa:\n\n«Sei disposto a smettere di credere di essere i tuoi pensieri?»\n\nIl pensiero continuerà a scorrere. Ti viene chiesto di lasciar andare la mente come strumento primario e di fidarti di qualcosa di più profondo.",
            en:"No form. No sound. Just an immense void and a question you feel in your bones:\n\n'Are you willing to stop believing you are your thoughts?'\n\nThought will keep flowing. You are asked to let go of the mind as the primary instrument and to trust something deeper."},
      choices:[
        {text:{it:"Lasci che il pensiero continui e smetti di identificarti con esso. Il silenzio è in chi osserva.",en:"You let thought continue and stop identifying with it. The silence is in the one who observes."},luce:2,type:"conscious",
         result:{it:"Osservando la mente che lavora ti sei disidentificato da essa. In quel silenzio si fa sentire l'intelligenza dell'Anima, che non ha bisogno di parole per conoscere.",en:"By observing the mind at work you have disidentified from it. In that silence the Soul's intelligence makes itself felt, and it needs no words to know."}},
        {text:{it:"«Io sono i miei pensieri. Chi sarei senza di loro?»",en:"'I am my thoughts. Who would I be without them?'"},luce:-2,type:"mechanical",
         result:{it:"La paura di perdere la mente è la mente che protegge se stessa. La mente non si ferma a comando: si può però osservarla con costanza, finché ci si disidentifica da essa.",en:"The fear of losing the mind is the mind protecting itself. The mind does not stop on command: you can, however, observe it steadily until you disidentify from it."}}
      ]}
  },
  /* ═══ PIANO 4: BUDDHICO ═══ */
  { key:"buddhico", color:"#7a5ab0", glyph:"◇",
    title:{it:"Piano Buddhico",en:"Buddhic Plane"},
    subtitle:{it:"L'emotivo superiore",en:"The higher emotional"},
    intro:{it:"Sei entrato nei piani dello spirito. Quando il corpo emotivo viene trasmutato sale di livello e diventa corpo buddhico. Qui l'intuizione nasce dal Cuore, l'«intelletto d'Amore», e la visione del Cuore porta dove gli opposti coincidono.",en:"You have entered the planes of the spirit. When the emotional body is transmuted it rises a level and becomes the buddhic body. Here intuition arises from the Heart, the 'intellect of Love', and the Heart's vision leads to where opposites coincide."},
    rooms:[
      {text:{it:"Un flusso di conoscenza diretta ti attraversa. Vedi connessioni tra eventi che credevi separati. La mente tace, e la risposta arriva prima della domanda.",
             en:"A flow of direct knowing passes through you. You see connections between events you thought were separate. The mind is silent, and the answer arrives before the question."},
       choices:[
         {text:{it:"Lasci che la mente si faccia da parte e accogli ciò che arriva.",en:"You let the mind step aside and welcome what arrives."},luce:1,type:"conscious",
          result:{it:"La Verità sorge quando la mente, con la sua voglia di penetrare razionalmente la materia, si mette da parte. Quello che ora sai lo puoi vivere, ma a parole non lo potresti spiegare.",en:"Truth rises when the mind, with its urge to penetrate matter rationally, steps aside. What you now know you can live, but you could not explain it in words."}},
         {text:{it:"Cerchi di memorizzare e spiegarti razionalmente ciò che senti.",en:"You try to memorise what you feel and explain it to yourself rationally."},luce:-1,type:"mechanical",
          result:{it:"Il desiderio di dare una risposta intellettuale ti porta fuori strada. Il flusso si interrompe e la mente riprende a parlare.",en:"The desire to give an intellectual answer leads you astray. The flow breaks off and the mind starts talking again."}}
       ]},
      {text:{it:"Incontri una donna che piange una perdita. Senti il suo dolore come se fosse tuo.",
             en:"You meet a woman weeping over a loss. You feel her pain as if it were yours."},
       choices:[
         {text:{it:"Le resti accanto, e vedi un'anima che sta imparando attraverso la sofferenza.",en:"You stay beside her, and see a soul learning through suffering."},luce:1,type:"conscious",
          result:{it:"È la compassione: provare gioia nel vedere un'anima che impara attraverso la sofferenza. È un'emozione superiore.",en:"This is compassion: feeling joy at seeing a soul learning through suffering. It is a higher emotion."}},
         {text:{it:"«Poverina. Che sfortuna.»",en:"'Poor thing. What bad luck.'"},luce:-1,type:"mechanical",
          result:{it:"È la pietà: considerare l'altro un povero sfortunato. Fra le emozioni è la forma inferiore della compassione.",en:"This is pity: seeing the other as a poor unfortunate. Among the emotions it is the lower form of compassion."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Volto del Nemico",en:"The Face of the Enemy"},
      text:{it:"Davanti alla soglia c'è la persona che ti ha fatto più male. Non ti attacca e non si scusa. Aspetta.\n\nPer salire devi decidere cosa fare di quel torto.",
            en:"Before the threshold stands the person who hurt you most. It does not attack you and does not apologise. It waits.\n\nTo rise, you must decide what to do with that wrong."},
      choices:[
        {text:{it:"Capisci che nessuno può fare del male alla tua anima. Lo perdoni, e lo ringrazi per ciò che ti ha mostrato di te.",en:"You understand that no one can harm your soul. You forgive them, and thank them for what they showed you about yourself."},luce:2,type:"conscious",
         result:{it:"Ogni nemico lo abbiamo richiamato noi, perché ci mostri un aspetto della nostra personalità che non ci piace. Perdonare è la consapevolezza totale che nessuno può fare del male alla nostra anima. La figura si scioglie e la soglia si apre.",en:"We summon every enemy ourselves, so that it shows us an aspect of our personality we dislike. Forgiving is the total awareness that no one can harm our soul. The figure dissolves and the threshold opens."}},
        {text:{it:"«Mi hai offeso, hai sbagliato, ma ci metto una pietra sopra.»",en:"'You offended me, you were wrong, but I'll put a stone over it.'"},luce:0,type:"neutral",
         result:{it:"È il perdono all'ottava bassa: il torto resta un torto, e lo hai solo coperto. Non hai ancora compreso che l'offesa in realtà non c'è mai stata.",en:"This is forgiveness at the low octave: the wrong remains a wrong, and you have only covered it. You have not yet understood that the offence never really existed."}},
        {text:{it:"Non lo perdoni. Te lo porti dietro.",en:"You don't forgive. You carry it with you."},luce:-2,type:"mechanical",
         result:{it:"Quando non perdoni ci rimetti tu: il risentimento agisce come un acido sui tuoi corpi sottili. Passi, ma più pesante.",en:"When you don't forgive, you are the one who pays: resentment acts like an acid on your subtle bodies. You pass, but heavier."}}
      ]}
  },
  /* ═══ PIANO 5: ATMICO ═══ */
  { key:"atmico", color:"#c9973a", glyph:"☉",
    title:{it:"Piano Atmico",en:"Atmic Plane"},
    subtitle:{it:"Il fisico superiore",en:"The higher physical"},
    intro:{it:"Sei arrivato al piano atmico, il fisico superiore. Qui il corpo fisico, trasmutato, sale di livello e diventa corpo atmico: è l'operazione detta risurrezione nella carne, grazie alla quale lo stesso corpo fisico diventa immortale.",en:"You have reached the atmic plane, the higher physical. Here the physical body, transmuted, rises a level and becomes the atmic body: this is the operation called resurrection in the flesh, through which the physical body itself becomes immortal."},
    rooms:[
      {text:{it:"Una figura ti offre un dono: sopravvivere alla morte nel corpo astrale e nel corpo mentale, viaggiare nei piani sottili, vedere ciò che gli altri non vedono.\n\n«Hai già fatto abbastanza. Prendi questo e fermati qui.»",
             en:"A figure offers you a gift: surviving death in the astral and mental bodies, travelling through the subtle planes, seeing what others do not see.\n\n'You've done enough already. Take this and stop here.'"},
       choices:[
         {text:{it:"Rifiuti il dono e prosegui l'Opera.",en:"You refuse the gift and continue the Work."},luce:1,type:"conscious",
          result:{it:"Anche i corpi astrale e mentale prima o poi si disgregano: la loro è una sopravvivenza, un effetto collaterale del Lavoro. Il suo fine è l'identità con l'anima, e poi l'identità divina.",en:"The astral and mental bodies too break up sooner or later: theirs is survival, a side effect of the Work. Its aim is identity with the soul, and then divine identity."}},
         {text:{it:"Accetti. Sopravvivere alla morte è ciò che cercavi.",en:"You accept. Surviving death is what you were looking for."},luce:-1,type:"mechanical",
          result:{it:"Lavorare per la sopravvivenza astrale o per i viaggi in astrale è un comportamento infantile, da Bassa Magia. Il dono ti lascia dov'eri.",en:"Working for astral survival or astral travel is childish behaviour, the stuff of Low Magic. The gift leaves you where you were."}}
       ]},
      {text:{it:"Un Fuoco scende dall'alto e cerca un varco per entrare nella carne. Per accoglierlo devi essere una coppa vuota: nessun desiderio personale, né materiale né spirituale.",
             en:"A Fire descends from above, looking for an opening into the flesh. To receive it you must be an empty cup: no personal desire, neither material nor spiritual."},
       choices:[
         {text:{it:"«Non sia fatta la mia, ma la Tua volontà.»",en:"'Not my will, but Yours be done.'"},luce:1,type:"conscious",
          result:{it:"Il segreto per far discendere il Fuoco è porsi completamente al suo servizio. Il Fuoco scende e invade il corpo di carne per operare l'ultima trasmutazione.",en:"The secret for making the Fire descend is to place yourself completely at its service. The Fire descends and pervades the body of flesh to perform the last transmutation."}},
         {text:{it:"Chiedi al Fuoco dei poteri. Ormai te li sei guadagnati.",en:"You ask the Fire for powers. By now you've earned them."},luce:-1,type:"mechanical",
          result:{it:"Anche un desiderio spirituale è un desiderio personale. Il varco si chiude e il Fuoco resta sopra di te.",en:"A spiritual desire is still a personal desire. The opening closes and the Fire stays above you."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Corpo di Pietra",en:"The Body of Stone"},
      text:{it:"Un gigante di pietra blocca la scala. Ha i tuoi lineamenti: è il tuo corpo, come lo hai sempre conosciuto.\n\n«Mi hai usato come veicolo e sei salito senza di me. Adesso cosa vuoi fare di me?»",
            en:"A stone giant blocks the stairway. It has your features: it is your body, as you have always known it.\n\n'You used me as a vehicle and climbed without me. What do you want to do with me now?'"},
      choices:[
        {text:{it:"«Torno a te. L'Opera si conclude nel corpo.»",en:"'I come back to you. The Work is completed in the body.'"},luce:2,type:"conscious",
         result:{it:"Il vero potere abita nel Corpo, e al Corpo si deve tornare per concludere l'Opera. La pietra si incendia: atomo dopo atomo la sua materia viene sostituita da materia di Fuoco, e il corpo, che nel suo stato consueto era morto, torna vivo.",en:"True power dwells in the Body, and one must return to the Body to complete the Work. The stone catches fire: atom by atom its matter is replaced by matter of Fire, and the body, which in its usual state was dead, comes alive."}},
        {text:{it:"«Resta qui. Sono spirito, la carne non mi riguarda più.»",en:"'Stay here. I am spirit, the flesh no longer concerns me.'"},luce:-2,type:"mechanical",
         result:{it:"Chi si ferma al Cielo lascia l'Opera a metà: il suo fine è unire spirito e materia. Il gigante resta pietra. La scala si apre lo stesso, ma sali senza il Fuoco.",en:"Whoever stops at Heaven leaves the Work half done: its aim is to unite spirit and matter. The giant stays stone. The stairway opens anyway, but you climb without the Fire."}}
      ]}
  },
  /* ═══ PIANO 6: ANUPADAKA ═══ */
  { key:"anupadaka", color:"#d8b45a", glyph:"◉",
    title:{it:"Piano Anupadaka",en:"Anupadaka Plane"},
    subtitle:{it:"La Monade",en:"The Monad"},
    intro:{it:"È il primo dei due piani divini, a cui l'essere umano giunge solo al termine dell'Opera. Qui l'individuo comincia a sciogliersi nel Tutto.",en:"It is the first of the two divine planes, which a human being reaches only at the end of the Work. Here the individual begins to dissolve into the Whole."},
    rooms:[
      {text:{it:"Vedi il ciclo intero. Un frammento dell'Uno, la Monade, si stacca e scende nella materia fino a diventare un io separato. Nell'Uno la coscienza era fusa con il Tutto, ma non lo sapeva, come nel sonno profondo.",
             en:"You see the whole cycle. A fragment of the One, the Monad, breaks away and descends into matter until it becomes a separate self. In the One, consciousness was merged with the Whole, but did not know it, as in deep sleep."},
       choices:[
         {text:{it:"Capisci che la separazione è servita a diventare coscienti.",en:"You understand that the separation served to become conscious."},luce:1,type:"conscious",
          result:{it:"Per creare consapevolezza serve una separazione fra chi osserva e ciò che è osservato. La coscienza torna all'Unità con una consapevolezza più alta di quella di partenza, grazie al passaggio nella materia.",en:"To create awareness there must be a separation between observer and observed. Consciousness returns to Unity with a higher awareness than it started with, thanks to its passage through matter."}},
         {text:{it:"«Tutta quella strada per tornare al punto di partenza?»",en:"'All that way to get back to the starting point?'"},luce:-1,type:"mechanical",
          result:{it:"Al punto di partenza la coscienza non sapeva di esserci. Il viaggio ti sembra inutile perché guardi solo la meta.",en:"At the starting point consciousness did not know it existed. The journey seems useless to you because you look only at the goal."}}
       ]},
      {text:{it:"Guardi in basso e ritrovi il tram, la cucina, l'ufficio. Questi mondi non erano lontani: compenetravano ogni giorno il piano fisico in cui vivevi.",
             en:"You look down and find the tram, the kitchen, the office again. These worlds were never far away: every day they interpenetrated the physical plane you lived in."},
       choices:[
         {text:{it:"Riconosci che erano presenti anche lì, a una frequenza più alta.",en:"You recognise that they were present there too, at a higher frequency."},luce:1,type:"conscious",
          result:{it:"I mondi spirituali compenetrano interamente il piano fisico. Restano invisibili perché la loro materia vibra a una frequenza più elevata, e si percepiscono solo portando lì il proprio stato di coscienza.",en:"The spiritual worlds wholly interpenetrate the physical plane. They stay invisible because their matter vibrates at a higher frequency, and they are perceived only by bringing one's state of consciousness there."}},
         {text:{it:"Distogli lo sguardo. Il mondo di sotto non ti riguarda più.",en:"You look away. The world below no longer concerns you."},luce:-1,type:"mechanical",
          result:{it:"I mondi spirituali non sono separati dalla realtà quotidiana. Voltarle le spalle adesso vuol dire tornare a vederli separati.",en:"The spiritual worlds are not separate from daily reality. Turning your back on it now means seeing them as separate again."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Sé Illuminato",en:"The Illumined Self"},
      text:{it:"Ti viene incontro una figura radiosa: sei tu, come sei diventato dopo tutto il Lavoro. Prova amore, beatitudine, unione con ogni cosa.\n\n«Guarda dove siamo arrivati. Restiamo così.»",
            en:"A radiant figure comes towards you: it is you, as you have become after all the Work. It feels love, bliss, union with all things.\n\n'Look how far we've come. Let's stay like this.'"},
      choices:[
        {text:{it:"Lasci andare anche lui. Oltre questa soglia non resta nessuno che viva l'unione.",en:"You let it go too. Beyond this threshold no one remains to live the union."},luce:2,type:"conscious",
         result:{it:"Il Sé, per quanto illuminato, è ancora un individuo. I piani divini implicano la completa identificazione con il Tutto e la scomparsa dell'individuo in quanto singolo essere. La figura si scioglie senza resistenza.",en:"The Self, however illumined, is still an individual. The divine planes imply complete identification with the Whole and the disappearance of the individual as a separate being. The figure dissolves without resistance."}},
        {text:{it:"Resti con lui. Hai lavorato tanto per arrivare fin qui.",en:"You stay with it. You worked so hard to get here."},luce:-2,type:"mechanical",
         result:{it:"Qui si arresta il sentiero della maggior parte dei ricercatori. L'unione è ancora vissuta da qualcuno che occupa un punto nello spazio e nel tempo.",en:"This is where the path of most seekers stops. The union is still lived by someone who occupies a point in space and time."}}
      ]}
  },
  /* ═══ PIANO 7: ADI ═══ */
  { key:"adi", color:"#e8c97a", glyph:"✺",
    title:{it:"Piano Adi",en:"Adi Plane"},
    subtitle:{it:"Il Logos",en:"The Logos"},
    intro:{it:"Il piano più elevato, quello divino, detto del Logos, cioè Dio. Qui non c'è più un viaggiatore che sale.",en:"The highest plane, the divine one, called the plane of the Logos, that is, God. Here there is no longer a traveller who climbs."},
    rooms:[
      {text:{it:"Non c'è spazio, non c'è tempo. C'è una presenza che è, insieme, te e tutto ciò che esiste.\n\nNon sei mai uscito dall'Uno. La separazione era illusoria.",
             en:"There is no space, no time. There is a presence that is, at once, you and everything that exists.\n\nYou never left the One. The separation was illusory."},
       choices:[
         {text:{it:"Ti sciogli nel Tutto restando sveglio.",en:"You dissolve into the Whole while staying awake."},luce:1,type:"conscious",
          result:{it:"La goccia diventa l'oceano, e questa volta ne è cosciente. Resta da dire soltanto: «Io sono ciò che sono.»",en:"The drop becomes the ocean, and this time it is aware of it. All that remains to say is: 'I am that I am.'"}},
         {text:{it:"Ti lasci andare come in un sonno profondo, senza più accorgerti di nulla.",en:"You let go as into deep sleep, no longer noticing anything."},luce:-1,type:"mechanical",
          result:{it:"È la via antica dell'annullamento: la goccia si annulla nell'oceano. È entrare nel Nulla, uno stato simile al sonno profondo da cui tutto è iniziato.",en:"It is the ancient way of annihilation: the drop is annulled in the ocean. It means entering the Nothing, a state like the deep sleep from which everything began."}}
       ]}
    ],
    guardian:null
  }]
};
})();
