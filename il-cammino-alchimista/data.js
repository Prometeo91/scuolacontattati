/* IL CAMMINO DELL'ALCHIMISTA — RPG data (bilingual) */
(function(){
"use strict";
window.RPG_DATA = {
  stats: ["presenza","volonta","nongiudizio","compassione"],
  levels: [
    {min:0,  key:"dormiente", glyph:"☾"},
    {min:12, key:"cercatore", glyph:"△"},
    {min:24, key:"apprendista",glyph:"◇"},
    {min:36, key:"alchimista", glyph:"☉"},
    {min:50, key:"guerriero",  glyph:"⚔"},
    {min:62, key:"mago",       glyph:"✦"}
  ],
  acts: [
  /* ══════════════ ATTO I — NIGREDO ══════════════ */
  { key:"nigredo",
    scenes:[
    { key:"riunione", stat:"presenza",
      text:{it:"Sei in una riunione di lavoro. Il tuo capo critica apertamente il tuo progetto davanti a tutti i colleghi. Senti il calore salire nel petto.",
            en:"You're in a work meeting. Your boss openly criticises your project in front of all your colleagues. You feel heat rising in your chest."},
      choices:[
        {text:{it:"Ti difendi con forza, alzi la voce. Nessuno ti può trattare così.",en:"You defend yourself forcefully, raising your voice. No one can treat you like this."},
         effects:{presenza:-1},type:"mechanical",
         result:{it:"La reazione è stata automatica: la macchina ha risposto al posto tuo. Hai perso l'occasione di osservarti.",en:"The reaction was automatic: the machine responded instead of you. You missed a chance to observe yourself."}},
        {text:{it:"Fai un respiro. Osservi la rabbia senza agire. Dopo una pausa, rispondi con calma.",en:"You take a breath. You observe the anger without acting. After a pause, you respond calmly."},
         effects:{presenza:2},type:"conscious",
         result:{it:"Hai creato uno spazio tra lo stimolo e la risposta. In quello spazio vive la libertà.",en:"You created a space between stimulus and response. In that space lives freedom."}},
        {text:{it:"Sorridi e annuisci, ma dentro di te pianifichi la tua rivincita.",en:"You smile and nod, but inside you're planning your revenge."},
         effects:{},type:"neutral",
         result:{it:"Hai evitato la scena, ma l'emozione negativa è solo stata repressa — non trasmutata. Tornerà.",en:"You avoided the scene, but the negative emotion was only suppressed — not transmuted. It will return."}}
      ],
      teaching:{it:"«La differenza tra un uomo meccanico e uno cosciente è che il primo reagisce, il secondo agisce.»",en:"'The difference between a mechanical man and a conscious one is that the first reacts, the second acts.'"}
    },
    { key:"specchio", stat:"nongiudizio",
      text:{it:"Un amico fa esattamente ciò che hai sempre criticato negli altri: parla alle spalle di qualcuno. Senti disgusto.",
            en:"A friend does exactly what you've always criticised in others: talks behind someone's back. You feel disgust."},
      choices:[
        {text:{it:"Lo giudichi duramente e prendi le distanze. Non è degno della tua amicizia.",en:"You judge them harshly and distance yourself. They're not worthy of your friendship."},
         effects:{nongiudizio:-1},type:"mechanical",
         result:{it:"Il giudizio è stato immediato. Ma chi è che giudica? La stessa macchina che compie le stesse azioni inconsciamente.",en:"The judgment was immediate. But who is judging? The same machine that performs the same actions unconsciously."}},
        {text:{it:"Ti fermi. Riconosci: «Questo mi disturba perché è il MIO specchio.»",en:"You pause. You recognise: 'This bothers me because it's MY mirror.'"},
         effects:{nongiudizio:2},type:"conscious",
         result:{it:"La Legge dello Specchio è spietata e misericordiosa insieme: ciò che ti irrita fuori esiste dentro di te.",en:"The Law of the Mirror is ruthless and merciful at once: what irritates you outside exists within you."}},
        {text:{it:"Cambi argomento per evitare il conflitto.",en:"You change the subject to avoid conflict."},
         effects:{},type:"neutral",
         result:{it:"Hai evitato lo scontro, ma anche l'opportunità di vedere te stesso. Lo specchio si ripresenterà.",en:"You avoided the clash, but also the chance to see yourself. The mirror will return."}}
      ],
      teaching:{it:"«Tutto ciò che ci irrita negli altri può portarci a comprendere noi stessi.»",en:"'Everything that irritates us in others can lead us to understand ourselves.'"}
    },
    { key:"coda", stat:"volonta",
      text:{it:"Sei in fila da venti minuti. Qualcuno ti passa davanti con noncuranza. Tutti fanno finta di niente.",
            en:"You've been queuing for twenty minutes. Someone cuts in front of you casually. Everyone pretends not to notice."},
      choices:[
        {text:{it:"Lo affronti in modo aggressivo. Deve capire che non si fa.",en:"You confront them aggressively. They need to learn."},
         effects:{volonta:-1,compassione:-1},type:"mechanical",
         result:{it:"La rabbia ha preso il controllo. Non eri tu a parlare — era la macchina biologica, programmata per difendere il territorio.",en:"Anger took control. It wasn't you speaking — it was the biological machine, programmed to defend its territory."}},
        {text:{it:"Noti la rabbia meccanica. Usi il momento per praticare il ricordo di sé.",en:"You notice the mechanical anger. You use the moment to practise self-remembering."},
         effects:{volonta:2},type:"conscious",
         result:{it:"Ogni irritazione è un'occasione per svegliarsi. Hai trasformato il piombo della reazione in oro di consapevolezza.",en:"Every irritation is an opportunity to awaken. You transmuted the lead of reaction into gold of awareness."}},
        {text:{it:"Non dici nulla, ma rimugini per i successivi venti minuti.",en:"You say nothing, but seethe for the next twenty minutes."},
         effects:{presenza:-1},type:"neutral",
         result:{it:"Il silenzio esteriore nascondeva una tempesta interiore. L'emozione negativa ti ha consumato energia senza che te ne accorgessi.",en:"The outward silence hid an inner storm. The negative emotion consumed your energy without you noticing."}}
      ],
      teaching:{it:"«Le emozioni negative sono il nutrimento della macchina biologica. Ogni volta che ti identifichi con esse, le alimenti.»",en:"'Negative emotions are the food of the biological machine. Every time you identify with them, you feed them.'"}
    },
    { key:"offesa", stat:"compassione",
      text:{it:"A cena, qualcuno fa una battuta crudele sulle tue convinzioni più profonde. Il tavolo ride.",
            en:"At dinner, someone makes a cruel joke about your deepest beliefs. The table laughs."},
      choices:[
        {text:{it:"Rispondi con una battuta ancora più tagliente. Ti vendichi.",en:"You fire back with an even sharper remark. You get your revenge."},
         effects:{compassione:-1,nongiudizio:-1},type:"mechanical",
         result:{it:"Occhio per occhio. La macchina ha difeso la sua immagine. Ma chi ha vinto, davvero?",en:"An eye for an eye. The machine defended its image. But who really won?"}},
        {text:{it:"Senti la puntura. Poi vedi: la loro derisione nasce dalla paura di ciò che non comprendono.",en:"You feel the sting. Then you see: their mockery comes from fear of what they don't understand."},
         effects:{compassione:2},type:"conscious",
         result:{it:"La compassione non è debolezza — è la capacità di vedere oltre la maschera dell'altro.",en:"Compassion is not weakness — it's the ability to see beyond another's mask."}},
        {text:{it:"Lasci il tavolo in silenzio dignitoso, ma porti la ferita per giorni.",en:"You leave the table in dignified silence, but carry the wound for days."},
         effects:{compassione:1,presenza:-1},type:"neutral",
         result:{it:"La dignità esteriore era reale, ma il dolore trattenuto si è cristallizzato dentro. Ciò che non viene trasformato viene trasferito.",en:"The outward dignity was real, but the retained pain crystallised inside. What is not transformed is transferred."}}
      ],
      teaching:{it:"«Non è ciò che ti accade che conta, ma come reagisci a ciò che ti accade.»",en:"'It's not what happens to you that matters, but how you react to what happens to you.'"}
    },
    { key:"sonno", stat:"presenza",
      text:{it:"Sono le 2 di notte. Stai scorrendo il telefono da tre ore senza rendertene conto. Una voce dentro di te dice: «Fermati.»",
            en:"It's 2am. You've been scrolling your phone for three hours without realising. A voice inside says: 'Stop.'"},
      choices:[
        {text:{it:"«Ancora cinque minuti.» Continui a scorrere.",en:"'Five more minutes.' You keep scrolling."},
         effects:{volonta:-1,presenza:-1},type:"mechanical",
         result:{it:"I cinque minuti diventano un'altra ora. La macchina ha vinto. Il sonno della coscienza è il suo stato naturale.",en:"Five minutes becomes another hour. The machine won. The sleep of consciousness is its natural state."}},
        {text:{it:"Noti l'automatismo. Posi il telefono. Senti il disagio di stare con te stesso — e rimani.",en:"You notice the automatism. You put the phone down. You feel the discomfort of being with yourself — and you stay."},
         effects:{presenza:2,volonta:1},type:"conscious",
         result:{it:"Quello spazio vuoto che hai creato — il disagio di non fare nulla — è il terreno dove nasce la coscienza.",en:"That empty space you created — the discomfort of doing nothing — is the ground where consciousness is born."}},
        {text:{it:"Ti senti in colpa ma continui, promettendoti che «da domani cambio».",en:"You feel guilty but keep going, promising yourself 'I'll change from tomorrow.'"},
         effects:{volonta:-1},type:"neutral",
         result:{it:"«Domani» è la parola preferita di chi dorme. Il Lavoro esiste solo adesso.",en:"'Tomorrow' is the favourite word of those who sleep. The Work exists only now."}}
      ],
      teaching:{it:"«L'uomo comune trascorre l'intera esistenza in uno stato che è analogo al sonno.»",en:"'The ordinary man spends his entire existence in a state that is analogous to sleep.'"}
    }],
    boss:{
      name:{it:"Il Guardiano della Soglia",en:"The Guardian of the Threshold"},
      intro:{it:"Una figura d'ombra appare. Indossa il tuo volto, ma mostra tutto ciò che nascondi. Sussurra: «Io sono ciò che non vuoi vedere.»",
             en:"A figure of shadow appears. It wears your face, but shows everything you hide. It whispers: 'I am what you don't want to see.'"},
      phases:[
        {text:{it:"Il Guardiano ti mostra ogni tua reazione automatica, ogni bugia detta a te stesso, ogni momento vissuto nel sonno. «Sei solo una macchina», dice. «Ogni emozione, ogni pensiero — tutto automatico.»",
               en:"The Guardian shows you every automatic reaction, every lie you told yourself, every moment lived in sleep. 'You are just a machine,' it says. 'Every emotion, every thought — all automatic.'"},
         choices:[
           {text:{it:"«Mostrami tutto. Voglio vedere.»",en:"'Show me everything. I want to see.'"},effects:{presenza:2,volonta:1},type:"conscious",
            result:{it:"Il coraggio di guardare è il primo passo. Il Guardiano annuisce.",en:"The courage to look is the first step. The Guardian nods."}},
           {text:{it:"«Non voglio vedere. Basta.»",en:"'I don't want to see. Enough.'"},effects:{presenza:-1},type:"mechanical",
            result:{it:"Voltarsi dall'altra parte non cancella ciò che esiste. Il Guardiano attenderà.",en:"Looking away doesn't erase what exists. The Guardian will wait."}}
         ]},
        {text:{it:"Il Guardiano apre un libro: è la storia di tutte le volte che hai detto «sono consapevole» mentre vivevi col pilota automatico. Ogni autoillusione, nero su bianco.",
               en:"The Guardian opens a book: it's the story of every time you said 'I am conscious' while living on autopilot. Every self-illusion, in black and white."},
         choices:[
           {text:{it:"«Lo vedo. Accetto questa verità su di me.»",en:"'I see it. I accept this truth about myself.'"},effects:{nongiudizio:2,presenza:1},type:"conscious",
            result:{it:"L'accettazione senza giudizio dissolve l'illusione. La verità, per quanto dolorosa, libera.",en:"Acceptance without judgment dissolves the illusion. Truth, however painful, sets free."}},
           {text:{it:"«Quello non sono più io! Sono cambiato!»",en:"'That's not me anymore! I've changed!'"},effects:{nongiudizio:-1},type:"mechanical",
            result:{it:"Negare il passato è la forma più sottile di sonno. Chi dice «sono cambiato» spesso dorme ancora.",en:"Denying the past is the subtlest form of sleep. Those who say 'I've changed' are often still asleep."}}
         ]},
        {text:{it:"«Per attraversare questa soglia devi morire», dice il Guardiano. «Non il tuo corpo — l'illusione di chi credi di essere. Sei disposto?»",
               en:"'To cross this threshold you must die,' says the Guardian. 'Not your body — the illusion of who you think you are. Are you willing?'"},
         choices:[
           {text:{it:"«Sono disposto a morire per rinascere.»",en:"'I am willing to die to be reborn.'"},effects:{volonta:2,compassione:1},type:"conscious",
            result:{it:"La prima morte è la più difficile: la morte della personalità fittizia. Oltre c'è la libertà.",en:"The first death is the hardest: the death of the fictitious personality. Beyond it lies freedom."}},
           {text:{it:"«Non sono pronto. Non ancora.»",en:"'I'm not ready. Not yet.'"},effects:{volonta:-1},type:"mechanical",
            result:{it:"«Non ancora» è la risposta della paura. Ma il Guardiano è paziente — aspetterà.",en:"'Not yet' is fear's answer. But the Guardian is patient — it will wait."}}
         ]}
      ]
    }
  },
  /* ══════════════ ATTO II — ALBEDO ══════════════ */
  { key:"albedo",
    scenes:[
    { key:"tradimento", stat:"compassione",
      text:{it:"Il tuo partner confessa un tradimento emotivo. Il mondo crolla.",
            en:"Your partner confesses an emotional betrayal. The world caves in."},
      choices:[
        {text:{it:"Rabbia. Accuse. Vuoi che soffra come stai soffrendo tu.",en:"Rage. Accusations. You want them to suffer as you are suffering."},
         effects:{compassione:-2},type:"mechanical",
         result:{it:"La sofferenza cercava compagnia. La macchina ha reagito con il suo programma più antico: colpo per colpo.",en:"Suffering sought company. The machine reacted with its oldest programme: blow for blow."}},
        {text:{it:"Respiri nel dolore. Non lo proietti indietro. Ti chiedi: «Cosa in me ha attratto questa lezione?»",en:"You breathe into the pain. You don't project it back. You ask: 'What in me attracted this lesson?'"},
         effects:{compassione:2,nongiudizio:1},type:"conscious",
         result:{it:"Il dolore accettato coscientemente diventa trasformazione. Non hai perdonato — hai compreso.",en:"Pain accepted consciously becomes transformation. You didn't forgive — you understood."}},
        {text:{it:"Analizzi la situazione intellettualmente, disconnettendoti dall'emozione.",en:"You analyse the situation intellectually, disconnecting from the emotion."},
         effects:{nongiudizio:1,presenza:-1},type:"neutral",
         result:{it:"L'intelletto ha creato una distanza, ma non una trasformazione. L'emozione è stata congelata, non sciolta.",en:"The intellect created distance, but not transformation. The emotion was frozen, not dissolved."}}
      ],
      teaching:{it:"«Il dolore che non trasformi, lo trasmetti.»",en:"'The pain you do not transform, you transmit.'"}
    },
    { key:"morale", stat:"nongiudizio",
      text:{it:"Scopri che un amico ha evaso le tasse. Si giustifica: «Lo fanno tutti.»",
            en:"You discover a friend has cheated on their taxes. They justify it: 'Everyone does it.'"},
      choices:[
        {text:{it:"Lo condanni e consideri di chiudere l'amicizia.",en:"You condemn them and consider ending the friendship."},
         effects:{nongiudizio:-2},type:"mechanical",
         result:{it:"Il giudizio ha diviso il mondo in giusto e sbagliato. Ma chi giudica è la stessa macchina che domani farà qualcosa di analogo.",en:"Judgment divided the world into right and wrong. But the one judging is the same machine that tomorrow will do something similar."}},
        {text:{it:"Noti il tuo giudizio e lo lasci dissolversi. Il loro cammino non è il tuo da giudicare.",en:"You notice your judgment and let it dissolve. Their path is not yours to judge."},
         effects:{nongiudizio:2},type:"conscious",
         result:{it:"Non giudicare non significa approvare. Significa smettere di nutrire la dualità positivo/negativo dentro di te.",en:"Not judging doesn't mean approving. It means stopping feeding the positive/negative duality within you."}},
        {text:{it:"Trovi giustificazioni per lui, per evitare il disagio del disaccordo.",en:"You make excuses for them to avoid the discomfort of disagreement."},
         effects:{},type:"neutral",
         result:{it:"Giustificare l'altro per evitare il conflitto è un'altra forma di sonno. Non hai né giudicato né compreso.",en:"Justifying the other to avoid conflict is another form of sleep. You neither judged nor understood."}}
      ],
      teaching:{it:"«Il positivo crea il negativo. Nella dualità non c'è via d'uscita.»",en:"'The positive creates the negative. In duality there is no way out.'"}
    },
    { key:"diagnosi", stat:"volonta",
      text:{it:"Il medico ti comunica una diagnosi preoccupante. L'incertezza ti inonda.",
            en:"The doctor gives you a worrying diagnosis. Uncertainty floods in."},
      choices:[
        {text:{it:"Panico. «Perché proprio a me?» Precipiti nella disperazione.",en:"Panic. 'Why me?' You spiral into despair."},
         effects:{volonta:-1,presenza:-1},type:"mechanical",
         result:{it:"La domanda «perché a me?» presuppone che la vita sia ingiusta. Ma la vita non è giusta né ingiusta — è uno specchio.",en:"The question 'why me?' presupposes life is unfair. But life is neither fair nor unfair — it's a mirror."}},
        {text:{it:"La paura arriva. La lasci attraversarti. Rimani presente. «Anche questo è un insegnamento.»",en:"Fear arrives. You let it pass through. You remain present. 'This too is a teaching.'"},
         effects:{volonta:2,presenza:2},type:"conscious",
         result:{it:"Nella malattia si nasconde un messaggio dell'anima. Rimanere presenti nella paura è il più grande atto di volontà.",en:"In illness hides a message from the soul. Remaining present in fear is the greatest act of will."}},
        {text:{it:"Neghi il problema. «Sicuramente non è niente di grave.»",en:"You deny the problem. 'Surely it's nothing serious.'"},
         effects:{presenza:-1},type:"neutral",
         result:{it:"La negazione è il sonnifero più efficace. Ciò che non guardi in faccia ti governa dall'ombra.",en:"Denial is the most effective sleeping pill. What you don't face governs you from the shadows."}}
      ],
      teaching:{it:"«La malattia è un maestro severo: arriva quando l'anima non viene più ascoltata.»",en:"'Illness is a severe teacher: it arrives when the soul is no longer heard.'"}
    },
    { key:"sogno", stat:"presenza",
      text:{it:"In un sogno, improvvisamente ti rendi conto: «Sto sognando!» Il paesaggio diventa vivido, reale.",
            en:"In a dream, you suddenly realise: 'I'm dreaming!' The landscape becomes vivid, real."},
      choices:[
        {text:{it:"L'eccitazione ti sveglia. Il momento è perso.",en:"The excitement wakes you up. The moment is lost."},
         effects:{},type:"neutral",
         result:{it:"L'identificazione con l'emozione — anche quella positiva — distrugge la lucidità. Il piano astrale richiede calma.",en:"Identification with emotion — even positive — destroys lucidity. The astral plane requires calm."}},
        {text:{it:"Mantieni una calma consapevolezza. Esplori il paesaggio astrale coscientemente.",en:"You maintain calm awareness. You explore the astral landscape consciously."},
         effects:{presenza:2,volonta:1},type:"conscious",
         result:{it:"La lucidità nei sogni rivela quella che avrai da disincarnato. Hai iniziato a costruire il ponte tra i mondi.",en:"Lucidity in dreams reveals what you'll have once disincarnate. You've begun building the bridge between worlds."}},
        {text:{it:"La paura ti afferra. Ti forzi a svegliarti.",en:"Fear grips you. You force yourself awake."},
         effects:{presenza:-1},type:"mechanical",
         result:{it:"La paura dell'ignoto ti ha riportato nella prigione del noto. Il corpo astrale si è richiuso.",en:"Fear of the unknown brought you back to the prison of the known. The astral body closed again."}}
      ],
      teaching:{it:"«La lucidità dei sogni rivela quella che avremo da disincarnati.»",en:"'The lucidity of dreams reveals what we'll have once disincarnate.'"}
    },
    { key:"crisi", stat:"volonta",
      text:{it:"Tutto crolla contemporaneamente: problemi di lavoro, relazione in crisi, difficoltà economiche. Sembra che l'universo ti sia contro.",
            en:"Everything collapses at once: work problems, relationship in crisis, money troubles. It seems the universe is against you."},
      choices:[
        {text:{it:"«Non è colpa mia. La vita è ingiusta. Sono una vittima delle circostanze.»",en:"'It's not my fault. Life is unfair. I'm a victim of circumstances.'"},
         effects:{volonta:-2,nongiudizio:-1},type:"mechanical",
         result:{it:"La vittima è il ruolo preferito dalla personalità. Finché incolpi l'esterno, sei in catene.",en:"The victim is the personality's favourite role. As long as you blame the outside, you are in chains."}},
        {text:{it:"«Ho creato tutto questo. Cosa mi sto rifiutando di vedere?»",en:"'I have created all of this. What am I refusing to see?'"},
         effects:{volonta:2,nongiudizio:1},type:"conscious",
         result:{it:"Assumersi la responsabilità totale è l'atto più rivoluzionario. Non sei una vittima — sei un creatore inconsapevole.",en:"Taking total responsibility is the most revolutionary act. You're not a victim — you're an unconscious creator."}},
        {text:{it:"Riconosci qualche responsabilità, ma continui a sentirti vittima.",en:"You acknowledge some responsibility, but still feel like a victim."},
         effects:{volonta:1},type:"neutral",
         result:{it:"Un passo nella direzione giusta, ma la personalità si aggrappa ancora al ruolo di vittima.",en:"A step in the right direction, but the personality still clings to the victim role."}}
      ],
      teaching:{it:"«Tutto ciò che ti accade lo hai generato tu. Quando lo capirai davvero, sarai libero.»",en:"'Everything that happens to you, you have generated. When you truly understand this, you'll be free.'"}
    }],
    boss:{
      name:{it:"Il Doppio Oscuro",en:"The Dark Double"},
      intro:{it:"La tua ombra appare davanti a te — identica a te, ma invertita. Mostra ogni desiderio negato, ogni emozione soppressa, ogni verità rifiutata.",
             en:"Your shadow appears before you — identical to you, but reversed. It shows every denied desire, every suppressed emotion, every refused truth."},
      phases:[
        {text:{it:"Il Doppio ti mostra ciò che hai represso: invidia, gelosia, rabbia, desiderio di dominio. «Tutto questo sei tu», dice con la tua voce. «Mi riconosci?»",
               en:"The Double shows you what you've repressed: envy, jealousy, rage, desire for dominion. 'All of this is you,' it says in your voice. 'Do you recognise me?'"},
         choices:[
           {text:{it:"«Sei parte di me. Ti riconosco e ti accetto.»",en:"'You are part of me. I recognise and accept you.'"},effects:{nongiudizio:2,compassione:1},type:"conscious",
            result:{it:"L'ombra accettata smette di governarti dal buio. Ciò che porti alla luce non può più manipolarti.",en:"The accepted shadow stops governing you from the dark. What you bring to light can no longer manipulate you."}},
           {text:{it:"«Vattene! Tu non sei me!»",en:"'Go away! You're not me!'"},effects:{nongiudizio:-1,compassione:-1},type:"mechanical",
            result:{it:"Negare l'ombra la rafforza. Ogni lotta contro di essa la nutre.",en:"Denying the shadow strengthens it. Every fight against it feeds it."}}
         ]},
        {text:{it:"Il Doppio cambia forma: diventa seducente, potente. «Posso darti potere sugli altri. Te lo meriti. Hai lavorato così tanto. Basta che mi nutri.»",
               en:"The Double changes form: it becomes seductive, powerful. 'I can give you power over others. You deserve it. You've worked so hard. Just feed me.'"},
         choices:[
           {text:{it:"«Il potere senza amore è il sentiero del mago nero. Rifiuto.»",en:"'Power without love is the path of the black magus. I refuse.'"},effects:{compassione:2,volonta:1},type:"conscious",
            result:{it:"Il mago nero cerca l'immortalità separandosi dall'anima. Il mago bianco la cerca unendosi ad essa.",en:"The black magus seeks immortality by separating from the soul. The white magus seeks it by uniting with it."}},
           {text:{it:"«Dimmi di più...»",en:"'Tell me more...'"},effects:{compassione:-2},type:"mechanical",
            result:{it:"La seduzione del potere è la trappola più antica. Chi cerca potere per sé finisce per perdere l'anima.",en:"The seduction of power is the oldest trap. Those who seek power for themselves end up losing their soul."}}
         ]},
        {text:{it:"Il Doppio comincia a dissolversi. Mentre svanisce, piange. È la parte di te che ha sofferto in silenzio per tutta la vita. Provi compassione per la tua stessa ombra?",
               en:"The Double begins to dissolve. As it fades, it weeps. It's the part of you that suffered in silence your whole life. Do you feel compassion for your own shadow?"},
         choices:[
           {text:{it:"«Amo anche questa parte di me.»",en:"'I love even this part of myself.'"},effects:{compassione:2,nongiudizio:2},type:"conscious",
            result:{it:"L'amore incondizionato verso sé stessi — inclusa l'ombra — è il fondamento dell'Opera alchemica.",en:"Unconditional love towards oneself — including the shadow — is the foundation of the alchemical Work."}},
           {text:{it:"«Finalmente se n'è andato.» Tiri un sospiro di sollievo.",en:"'Finally it's gone.' You sigh with relief."},effects:{},type:"neutral",
            result:{it:"Il sollievo è comprensibile, ma l'ombra non dissoluta tornerà. Ciò che non integri ti possiede.",en:"The relief is understandable, but the undissolved shadow will return. What you don't integrate possesses you."}}
         ]}
      ]
    }
  },
  /* ══════════════ ATTO III — RUBEDO ══════════════ */
  { key:"rubedo",
    scenes:[
    { key:"ottava", stat:"volonta",
      text:{it:"Un progetto creativo che avevi iniziato con grande entusiasmo mesi fa ha perso ogni slancio. Non ricordi nemmeno perché hai cominciato.",
            en:"A creative project you started months ago with great enthusiasm has lost all momentum. You barely remember why you began."},
      choices:[
        {text:{it:"Lo abbandoni. Qualcos'altro ti ispirerà.",en:"You abandon it. Something else will inspire you."},
         effects:{volonta:-1},type:"mechanical",
         result:{it:"La Legge dell'Ottava prevede questo calo. Ogni progetto incontra un punto dove l'energia si esaurisce — chi non lo sa, abbandona sempre.",en:"The Law of the Octave foresees this drop. Every project meets a point where energy runs out — those who don't know this always give up."}},
        {text:{it:"Applichi «lo shock»: infondi energia nuova nel punto critico, trovi un significato più profondo.",en:"You apply 'the shock': you infuse new energy at the critical point, find a deeper meaning."},
         effects:{volonta:2,presenza:1},type:"conscious",
         result:{it:"Lo shock cosciente all'intervallo giusto è ciò che distingue il creatore dal sognatore. Hai superato il punto di morte dell'ottava.",en:"The conscious shock at the right interval is what distinguishes the creator from the dreamer. You passed the octave's death point."}},
        {text:{it:"Ti forzi a continuare meccanicamente, per senso del dovere.",en:"You force yourself to continue mechanically, out of duty."},
         effects:{volonta:1,presenza:-1},type:"neutral",
         result:{it:"La disciplina senza consapevolezza è lavoro meccanico. Meglio di abbandonare, ma non è ancora il Lavoro.",en:"Discipline without awareness is mechanical work. Better than giving up, but it's not yet the Work."}}
      ],
      teaching:{it:"«Ogni processo nell'universo inizia con forza e poi degenera, a meno che non venga applicato uno 'shock' cosciente.»",en:"'Every process in the universe begins with force and then degenerates, unless a conscious 'shock' is applied.'"}
    },
    { key:"potere", stat:"compassione",
      text:{it:"Hai guadagnato una posizione di influenza. Le persone ti ascoltano, seguono i tuoi consigli. Potresti plasmare le loro visioni.",
            en:"You've gained a position of influence. People listen to you, follow your advice. You could shape their views."},
      choices:[
        {text:{it:"Usi la posizione a tuo vantaggio. «Me lo sono guadagnato.»",en:"You use the position for personal advantage. 'I've earned this.'"},
         effects:{compassione:-2,nongiudizio:-1},type:"mechanical",
         result:{it:"Il potere usato per l'ego è il cammino della mano sinistra. Non importa quanta conoscenza hai — senza Cuore, sei al servizio delle tenebre.",en:"Power used for ego is the left-hand path. It doesn't matter how much knowledge you have — without Heart, you serve the darkness."}},
        {text:{it:"Metti il potere al servizio del risveglio altrui, non del tuo ego.",en:"You put power in service of others' awakening, not your ego."},
         effects:{compassione:2,nongiudizio:2},type:"conscious",
         result:{it:"Il vero maestro è colui che usa il proprio potere per rendere gli altri più liberi, non più dipendenti.",en:"The true master is one who uses their power to make others freer, not more dependent."}},
        {text:{it:"Rifiuti ogni responsabilità. «Non voglio avere potere su nessuno.»",en:"You refuse all responsibility. 'I don't want power over anyone.'"},
         effects:{volonta:-1},type:"neutral",
         result:{it:"Rifiutare il potere per paura non è umiltà — è un'altra forma di fuga. Il guerriero accetta la responsabilità.",en:"Refusing power out of fear is not humility — it's another form of escape. The warrior accepts responsibility."}}
      ],
      teaching:{it:"«Il potere senza amore è la via del mago nero. L'amore senza potere è impotenza. Serve entrambi.»",en:"'Power without love is the black magus's way. Love without power is impotence. Both are needed.'"}
    },
    { key:"energia", stat:"presenza",
      text:{it:"Un'attrazione potente ti invade. Ogni cellula del corpo desidera una sola cosa. L'energia è travolgente.",
            en:"A powerful attraction consumes you. Every cell in your body wants one thing only. The energy is overwhelming."},
      choices:[
        {text:{it:"Agisci d'impulso. Il corpo comanda.",en:"You act on impulse. The body commands."},
         effects:{volonta:-1,presenza:-1},type:"mechanical",
         result:{it:"L'energia sessuale sprecata nell'impulso non può essere trasformata. È come bruciare carburante senza muovere il motore.",en:"Sexual energy wasted on impulse cannot be transformed. It's like burning fuel without moving the engine."}},
        {text:{it:"Respiri l'energia verso l'alto. La transmuti in forza creativa.",en:"You breathe the energy upward. You transmute it into creative force."},
         effects:{volonta:2,presenza:2},type:"conscious",
         result:{it:"L'energia sessuale è il carburante dell'Opera. Trasmutata, diventa la forza più potente a disposizione dell'essere umano.",en:"Sexual energy is the fuel of the Work. Transmuted, it becomes the most powerful force available to the human being."}},
        {text:{it:"Reprimi il desiderio completamente, negandone l'esistenza.",en:"You suppress the desire entirely, denying its existence."},
         effects:{presenza:-1},type:"neutral",
         result:{it:"Reprimere non è trasmutare. Ciò che reprimi si accumula nell'ombra e riemerge con violenza doppia.",en:"Suppressing is not transmuting. What you repress accumulates in the shadow and resurfaces with double violence."}}
      ],
      teaching:{it:"«L'energia sessuale è il piombo dell'alchimista: non va né sprecata né repressa, ma trasmutata in oro.»",en:"'Sexual energy is the alchemist's lead: it should be neither wasted nor repressed, but transmuted into gold.'"}
    },
    { key:"orgoglio", stat:"nongiudizio",
      text:{it:"Dopo mesi di pratica interiore, ti senti «al di sopra» delle persone comuni. Vedi il loro sonno chiaramente. Li compatisci.",
            en:"After months of inner practice, you feel 'above' ordinary people. You see their sleep clearly. You pity them."},
      choices:[
        {text:{it:"Cominci a insegnare senza che nessuno te lo chieda. «Ho capito ciò che voi non capite.»",en:"You start teaching without being asked. 'I understand what you don't.'"},
         effects:{nongiudizio:-2,compassione:-1},type:"mechanical",
         result:{it:"L'orgoglio spirituale è la trappola più sottile. Chi si sente superiore ha solo cambiato la forma del sonno.",en:"Spiritual pride is the subtlest trap. Those who feel superior have only changed the form of sleep."}},
        {text:{it:"Riconosci l'orgoglio come la trappola più sottile. «Non sono diverso da nessuno.»",en:"You recognise pride as the subtlest trap. 'I am no different from anyone.'"},
         effects:{nongiudizio:2,compassione:1},type:"conscious",
         result:{it:"L'umiltà autentica nasce dal vedere che la distanza tra il «risvegliato» e il «dormiente» è un'illusione dell'ego.",en:"Authentic humility comes from seeing that the distance between the 'awakened' and the 'asleep' is an ego illusion."}},
        {text:{it:"Dubiti di tutto e smetti di praticare. «Forse mi sto illudendo.»",en:"You doubt everything and stop practising. 'Maybe I'm deluding myself.'"},
         effects:{volonta:-1,presenza:-1},type:"neutral",
         result:{it:"Il dubbio è l'arma preferita della personalità: prima gonfia l'ego, poi lo sgonfia. In entrambi i casi, vinci solo restando presente.",en:"Doubt is the personality's favourite weapon: first it inflates the ego, then deflates it. In both cases, you only win by staying present."}}
      ],
      teaching:{it:"«Non esiste un 'io' che si risveglia. C'è solo il risveglio.»",en:"'There is no 'I' that awakens. There is only awakening.'"}
    },
    { key:"sacrificio", stat:"compassione",
      text:{it:"Puoi accettare un'opportunità prestigiosa o aiutare una persona in reale difficoltà. Non puoi fare entrambe le cose.",
            en:"You can accept a prestigious opportunity or help someone in real need. You can't do both."},
      choices:[
        {text:{it:"Prendi l'opportunità. «Devo pensare a me stesso.»",en:"You take the opportunity. 'I must think of myself.'"},
         effects:{compassione:-1},type:"mechanical",
         result:{it:"La personalità chiama questo «buon senso». L'anima lo chiama paura.",en:"The personality calls this 'common sense'. The soul calls it fear."}},
        {text:{it:"Aiuti senza attaccamento al risultato. «L'universo provvede.»",en:"You help without attachment to the outcome. 'The universe provides.'"},
         effects:{compassione:2,volonta:1},type:"conscious",
         result:{it:"Il servizio disinteressato è l'atto più alchemico. Chi dà senza calcolo riceve ciò che non poteva immaginare.",en:"Selfless service is the most alchemical act. Those who give without calculation receive what they couldn't imagine."}},
        {text:{it:"Aiuti, ma con risentimento segreto.",en:"You help, but with secret resentment."},
         effects:{compassione:1,presenza:-1},type:"neutral",
         result:{it:"L'azione giusta con l'emozione sbagliata non è ancora servizio — è sacrificio, e il sacrificio crea debito.",en:"The right action with the wrong emotion is not yet service — it's sacrifice, and sacrifice creates debt."}}
      ],
      teaching:{it:"«Il vero servizio non chiede nulla in cambio. Non è sacrificio — è gioia.»",en:"'True service asks nothing in return. It's not sacrifice — it's joy.'"}
    }],
    boss:{
      name:{it:"La Dissoluzione dell'Io",en:"The Dissolution of the I"},
      intro:{it:"Sei giunto alla prova finale. Non c'è nemico da affrontare — c'è solo te stesso, e la domanda ultima: sei disposto a lasciar andare tutto ciò che credi di essere?",
             en:"You've reached the final trial. There is no enemy to face — there is only yourself, and the ultimate question: are you willing to let go of everything you believe yourself to be?"},
      phases:[
        {text:{it:"Tutto ciò che hai costruito — la tua identità spirituale, il tuo progresso, il tuo «livello» — comincia a dissolversi come sabbia tra le dita. Senti il panico. Il vuoto ti chiama.",
               en:"Everything you've built — your spiritual identity, your progress, your 'level' — begins dissolving like sand through your fingers. You feel panic. The void calls."},
         choices:[
           {text:{it:"«Non sono mai stato queste cose. Lascio andare.»",en:"'I was never these things. I let go.'"},effects:{presenza:2,volonta:2},type:"conscious",
            result:{it:"Lasciar andare l'identità è la morte dell'ego. Oltre, c'è ciò che non muore mai.",en:"Letting go of identity is the ego's death. Beyond it lies what never dies."}},
           {text:{it:"«No! Ho lavorato così tanto per questo! Non posso perderlo!»",en:"'No! I worked so hard for this! I can't lose it!'"},effects:{presenza:-1,volonta:-1},type:"mechanical",
            result:{it:"L'attaccamento ai risultati spirituali è l'ultima catena. Anche l'illuminazione, se desiderata, diventa prigione.",en:"Attachment to spiritual results is the last chain. Even enlightenment, if desired, becomes a prison."}}
         ]},
        {text:{it:"Il vuoto. Nessuna identità, nessuna storia. Solo oscurità infinita. Una voce chiede: «Chi sei?»",
               en:"The void. No identity, no story. Just infinite darkness. A voice asks: 'Who are you?'"},
         choices:[
           {text:{it:"Silenzio. Rimani nella pura consapevolezza senza definire nulla.",en:"Silence. You remain in pure awareness without defining anything."},effects:{nongiudizio:2,presenza:2},type:"conscious",
            result:{it:"Nel silenzio oltre il pensiero abita ciò che sei veramente. Non un nome, non una storia — pura coscienza.",en:"In the silence beyond thought dwells what you truly are. Not a name, not a story — pure consciousness."}},
           {text:{it:"«Io sono un cercatore spirituale, io sono...»",en:"'I am a spiritual seeker, I am...'"},effects:{nongiudizio:-1},type:"mechanical",
            result:{it:"Definirsi è limitarsi. L'«io sono» seguito da qualsiasi cosa è ancora una gabbia — dorata, ma gabbia.",en:"To define oneself is to limit oneself. 'I am' followed by anything is still a cage — golden, but a cage."}}
         ]},
        {text:{it:"Una luce appare. Non è fuori di te — SEI tu. Per la prima volta senti che non c'è mai stata separazione. Solo la scelta finale rimane.",
               en:"A light appears. It's not outside you — it IS you. For the first time you feel there was never any separation. Only the final choice remains."},
         choices:[
           {text:{it:"«Non c'è mai stata separazione. Io e la Luce siamo Uno.»",en:"'There was never any separation. I and the Light are One.'"},effects:{compassione:3,presenza:3},type:"conscious",
            result:{it:"La Rubedo è compiuta. Il piombo è diventato oro. Non sei cambiato — hai ricordato chi sei da sempre.",en:"The Rubedo is accomplished. Lead has become gold. You haven't changed — you remembered who you've always been."}},
           {text:{it:"«Ho paura di perdere me stesso.»",en:"'I'm afraid of losing myself.'"},effects:{},type:"mechanical",
            result:{it:"La paura di perdere il sé è l'ultima illusione. Non puoi perdere ciò che sei — solo ciò che credi di essere.",en:"The fear of losing the self is the last illusion. You can't lose what you are — only what you believe yourself to be."}}
         ]}
      ]
    }
  }]
};
})();
