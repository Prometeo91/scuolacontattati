/* IL GRANDE VIAGGIO — data.js (il ciclo morte-rinascita secondo Arthur E. Powell) */
(function(){
"use strict";
window.DUNGEON_DATA = {
  id: "viaggio",
  startLuce: 7,
  planes: [
  /* ═══ TAPPA 1: LA SOGLIA ═══ */
  { key:"soglia", color:"#8a7a5a", glyph:"☾",
    title:{it:"La Soglia",en:"The Threshold"},
    subtitle:{it:"La morte fisica",en:"Physical death"},
    intro:{it:"Il respiro si fa lento. Il doppio eterico si ritira dal corpo denso, unito ad esso da un filo lucente che all'istante della morte si romperà. Davanti ai tuoi occhi interiori comincia a scorrere, quadro dopo quadro, l'intera vita appena conclusa.",en:"The breath slows. The etheric double withdraws from the dense body, joined to it by a shining thread that will break at the instant of death. Before your inner eyes the whole life just ended begins to flow, picture after picture."},
    rooms:[
      {text:{it:"La visione panoramica ti mostra ogni evento della vita così come fu davvero, anche dove lo ricordavi diverso. Vedi le conseguenze di ogni tua azione, le cause dietro ogni incontro.\n\nUn'immagine dolorosa appare: il momento di cui ti sei sempre vergognato.",
             en:"The panoramic vision shows you every event of your life as it truly was, even where you remembered it differently. You see the consequences of every action, the causes behind every encounter.\n\nA painful image appears: the moment you were always ashamed of."},
       choices:[
         {text:{it:"Distogli lo sguardo. Non vuoi rivederlo.",en:"You look away. You don't want to see it again."},luce:-1,type:"mechanical",
          result:{it:"La visione panoramica è il dono della morte: ciò che non viene guardato ora, dovrà essere rivissuto altrove.",en:"The panoramic vision is death's gift: what is not looked at now will have to be relived elsewhere."}},
         {text:{it:"Osservi con calma, da testimone, finché l'immagine si completa.",en:"You watch calmly, as a witness, until the image completes itself."},luce:1,type:"conscious",
          result:{it:"In pochi secondi l'Ego rivive l'intera esistenza e ne coglie la tendenza che predomina: è quel pensiero a decidere dove passerai la vita astrale.",en:"In a few seconds the Ego relives the whole existence and grasps its predominant tendency: that thought decides where you will spend your astral life."}},
         {text:{it:"Cerchi di trattenere solo i momenti felici.",en:"You try to hold on only to the happy moments."},luce:0,type:"neutral",
          result:{it:"La visione non si lascia scegliere: è un bilancio, e scorre intera.",en:"The vision cannot be curated: it is a reckoning, and it flows whole."}}
       ]},
      {text:{it:"Vedi il tuo corpo disteso sotto di te. Intorno, le persone care. Il filo che ti legava a lui si è rotto, ma sei ancora avvolto nella materia eterica e fluttui sopra quella forma familiare.\n\nQualcosa in te vuole rientrare, riprendere tutto com'era.",
             en:"You see your body lying beneath you. Around it, your loved ones. The thread that bound you to it has broken, but you are still wrapped in etheric matter, floating above that familiar form.\n\nSomething in you wants to re-enter, to take everything back as it was."},
       choices:[
         {text:{it:"Resti sopra il corpo. Non sei pronto.",en:"You stay above the body. You are not ready."},luce:-1,type:"mechanical",
          result:{it:"Trattenersi presso il corpo prolunga solo il distacco: alcuni si liberano dall'involucro eterico in pochi istanti, altri vi riposano per ore o per giorni.",en:"Lingering by the body only prolongs the parting: some free themselves from the etheric envelope in a few moments, others rest in it for hours or days."}},
         {text:{it:"Saluti la forma che ti ha servito, e lasci andare anche l'involucro eterico.",en:"You salute the form that served you, and let the etheric envelope go as well."},luce:1,type:"conscious",
          result:{it:"Il corpo era il tempio, e tu l'abitante: lasciarlo con serenità è il primo passo del viaggio.",en:"The body was the temple, and you the dweller: leaving it serenely is the journey's first step."}}
       ]}
    ],
    guardian:{
      name:{it:"Lo Spettro Eterico",en:"The Etheric Wraith"},
      text:{it:"Il doppio eterico, ormai svuotato, ti avvolge come una nebbia grigio-violetta. È il tuo stesso fantasma, e sussurra:\n\n«Resta con me. Aleggiamo insieme presso i luoghi che conosci. Là fuori non c'è niente per te.»",
            en:"The etheric double, now emptied, wraps around you like a grey-violet mist. It is your own ghost, and it whispers:\n\n'Stay with me. Let us hover together near the places you know. Out there, there is nothing for you.'"},
      choices:[
        {text:{it:"«Sei solo un involucro consumato. Ti restituisco alla terra, con gratitudine.»",en:"'You are only a worn-out shell. I return you to the earth, with gratitude.'"},luce:1,type:"conscious",
         result:{it:"La nebbia si dirada e si disgrega. Chi non si lascia trattenere dallo spettro eterico entra libero nel mondo astrale.",en:"The mist thins and disintegrates. One who is not held by the etheric wraith enters the astral world free."}},
        {text:{it:"Resti avvolto nella nebbia. Almeno è familiare.",en:"You stay wrapped in the mist. At least it is familiar."},luce:-2,type:"mechanical",
         result:{it:"Vaghi a lungo, semi-cosciente, tra i luoghi della vita passata. Alla fine la nebbia si dissolve da sola, ma hai perso tempo e luce.",en:"You wander long, half-conscious, among the places of your past life. In the end the mist dissolves by itself, but you have lost time and light."}}
      ]}
  },
  /* ═══ TAPPA 2: L'ELEMENTALE DEL DESIDERIO ═══ */
  { key:"elementale", color:"#7c3a2a", glyph:"◈",
    title:{it:"L'Elementale del Desiderio",en:"The Desire-Elemental"},
    subtitle:{it:"L'ingresso nel kàmaloka",en:"Entering kamaloka"},
    intro:{it:"Entri nel mondo astrale. Ma qualcosa si muove dentro il tuo stesso corpo astrale: l'elementale del desiderio, la vita istintiva che per anni hai nutrito con ogni passione, ora vuole prendere il comando del viaggio.",en:"You enter the astral world. But something stirs within your own astral body: the desire-elemental, the instinctive life you fed for years with every passion, now wants to take command of the journey."},
    rooms:[
      {text:{it:"Senti la materia del tuo corpo astrale riorganizzarsi: l'elementale la sta disponendo in gusci concentrici, con la materia più densa all'esterno, come una corazza.\n\nÈ la sua strategia per durare più a lungo.",
             en:"You feel the matter of your astral body rearranging: the elemental is laying it out in concentric shells, densest matter outside, like armour.\n\nIt is its strategy to last longer."},
       choices:[
         {text:{it:"Lasci fare: sembra una protezione.",en:"You let it happen: it feels like protection."},luce:-1,type:"mechanical",
          result:{it:"Con i gusci densi all'esterno resterai prigioniero a lungo dei sottopiani inferiori, percependo solo ciò che è più grossolano.",en:"With the dense shells outside you will long remain a prisoner of the lower sub-planes, perceiving only what is coarsest."}},
         {text:{it:"Rifiuti coscientemente la ridisposizione, mantenendo il corpo astrale fluido.",en:"You consciously refuse the rearrangement, keeping the astral body fluid."},luce:1,type:"conscious",
          result:{it:"Chi conosce può impedire la ridisposizione in gusci: la materia resta mescolata e il passaggio attraverso il kàmaloka sarà rapido e lucido.",en:"One who knows can prevent the shell-arrangement: the matter stays mingled and the passage through kamaloka will be swift and lucid."}}
       ]},
      {text:{it:"I desideri della vita appena lasciata si svegliano tutti insieme: fame, sete, abitudini, brame. Ma non hai più gli organi fisici per soddisfarli.\n\nBruciano come fiamme senza legna.",
             en:"The desires of the life just left awaken all at once: hunger, thirst, habits, cravings. But you no longer have the physical organs to satisfy them.\n\nThey burn like flames without wood."},
       choices:[
         {text:{it:"Corri verso i luoghi dove li soddisfacevi, cercando sollievo.",en:"You rush to the places where you used to satisfy them, seeking relief."},luce:-1,type:"mechanical",
          result:{it:"Il desiderio senza organo è il vero 'purgatorio': inseguirlo lo alimenta. Si spegne solo ciò che smette d'essere nutrito.",en:"Desire without an organ is the true 'purgatory': chasing it feeds it. Only what is no longer fed burns out."}},
         {text:{it:"Resti fermo e li guardi bruciare, fiamma dopo fiamma.",en:"You stand still and watch them burn, flame after flame."},luce:1,type:"conscious",
          result:{it:"Osservate senza essere nutrite, le passioni si consumano e liberano ciò che avevano di puro. Questa è la purificazione del kàmaloka.",en:"Watched and unfed, the passions burn themselves out and release what was pure in them. This is kamaloka's purification."}}
       ]}
    ],
    guardian:{
      name:{it:"L'Elementale del Desiderio",en:"The Desire-Elemental"},
      text:{it:"Prende forma davanti a te, fatto della tua stessa materia astrale: un volto che è il tuo, deformato da ogni brama coltivata in vita.\n\n«Io sono la tua fame. Mi hai costruito tu, giorno per giorno. Ora nutrimi — o dissolviti con me.»",
            en:"It takes shape before you, made of your own astral matter: a face that is yours, distorted by every craving cultivated in life.\n\n'I am your hunger. You built me, day by day. Now feed me — or dissolve with me.'"},
      choices:[
        {text:{it:"«Tu non sei me. Sei materia che io ho animato — e che ora lascio riposare.»",en:"'You are not me. You are matter that I animated — and that I now lay to rest.'"},luce:1,type:"conscious",
         result:{it:"L'elementale perde la presa: dove i desideri sono stati sottomessi, non c'è lotta.",en:"The elemental loses its grip: where desires have been subdued, there is no struggle."}},
        {text:{it:"Gli cedi il comando: conosce questo mondo meglio di te.",en:"You yield command to it: it knows this world better than you."},luce:-2,type:"mechanical",
         result:{it:"L'elementale ti trascina nei sottopiani più densi, dove i desideri urlano più forte. Ti libererai, ma a caro prezzo.",en:"The elemental drags you to the densest sub-planes, where desires scream loudest. You will free yourself, but at a high price."}}
      ]}
  },
  /* ═══ TAPPA 3: IL KÀMALOKA ═══ */
  { key:"kamaloka", color:"#9a6a3a", glyph:"◐",
    title:{it:"Il Kàmaloka",en:"Kamaloka"},
    subtitle:{it:"Il purgatorio astrale",en:"The astral purgatory"},
    intro:{it:"I sette sottopiani astrali ti attraversano come acque di densità diverse. Qui la mente, mescolata alle passioni, le purifica e assimila ciò che hanno di puro. Non sei solo: il kàmaloka è popolato.",en:"The seven astral sub-planes pass through you like waters of different densities. Here the mind, mingled with the passions, purifies them and assimilates what is pure in them. You are not alone: kamaloka is peopled."},
    rooms:[
      {text:{it:"Incontri una figura smarrita: un uomo morto all'improvviso, che ancora non sa di essere morto. Ripete i gesti della sua giornata, confuso, spaventato dal tuo sguardo.",
             en:"You meet a lost figure: a man who died suddenly and does not yet know he is dead. He repeats the motions of his day, confused, frightened by your gaze."},
       choices:[
         {text:{it:"Lo eviti: la sua confusione potrebbe contagiarti.",en:"You avoid him: his confusion might infect you."},luce:-1,type:"mechanical",
          result:{it:"La paura dell'altro è ancora separazione. Nel mondo astrale, ciò che temi ti si avvicina.",en:"Fear of the other is still separation. In the astral world, what you fear draws nearer."}},
         {text:{it:"Ti avvicini con calma e gli mostri, senza parole, ciò che è accaduto.",en:"You approach calmly and show him, without words, what has happened."},luce:1,type:"conscious",
          result:{it:"Hai fatto il lavoro degli aiutatori invisibili: chi comprende la propria morte attraversa il kàmaloka in pace.",en:"You have done the work of the invisible helpers: one who understands his own death crosses kamaloka in peace."}}
       ]},
      {text:{it:"Una corrente ti afferra: qualcuno, sulla terra, ti sta chiamando. Una seduta spiritica. Senti l'attrazione del medium come una mano che ti tira verso il basso, verso le cose che hai lasciato.",
             en:"A current seizes you: someone on earth is calling you. A séance. You feel the medium's pull like a hand dragging you downward, towards the things you left behind."},
       choices:[
         {text:{it:"Rispondi al richiamo e ridiscendi a parlare con i vivi.",en:"You answer the call and descend again to speak with the living."},luce:-1,type:"mechanical",
          result:{it:"Ogni ritorno ravviva i desideri terrestri e prolunga il soggiorno astrale.",en:"Every return revives earthly desires and prolongs the astral stay."}},
         {text:{it:"Mandi un pensiero di pace a chi ti chiama, e prosegui la salita.",en:"You send a thought of peace to those calling you, and continue the ascent."},luce:1,type:"conscious",
          result:{it:"L'amore vero accompagna chi parte. Il pensiero di pace giunge a destinazione più integro di qualunque messaggio.",en:"True love accompanies the one who leaves. The thought of peace arrives more whole than any message."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Lutto dei Vivi",en:"The Grief of the Living"},
      text:{it:"Le lacrime di chi ti piange salgono fino a te come catene luminose. Ogni singhiozzo ti strattona verso il basso. Il loro dolore è sincero, e ti chiede di restare.\n\n«Non andare. Non ancora. Non così.»",
            en:"The tears of those who mourn you rise to you like luminous chains. Every sob tugs you downward. Their grief is sincere, and it asks you to stay.\n\n'Don't go. Not yet. Not like this.'"},
      choices:[
        {text:{it:"«Vi amo — e proprio per questo proseguo. Ci ritroveremo più in alto.»",en:"'I love you — and that is exactly why I go on. We shall meet again higher up.'"},luce:1,type:"conscious",
         result:{it:"Le catene si trasformano in fili d'oro che benedicono la salita. Il distacco compiuto nell'amore non è perdita.",en:"The chains turn into golden threads blessing the ascent. A parting accomplished in love is not loss."}},
        {text:{it:"Resti aggrappato al loro dolore: ti fa sentire ancora vivo.",en:"You cling to their grief: it makes you feel alive."},luce:-2,type:"mechanical",
         result:{it:"Il lutto trattenuto turba i morti e i vivi insieme. Resti sospeso, né di qua né di là, finché le lacrime si esauriscono.",en:"Grief held onto disturbs the dead and the living alike. You hang suspended, neither here nor there, until the tears run dry."}}
      ]}
  },
  /* ═══ TAPPA 4: LA SECONDA MORTE ═══ */
  { key:"seconda", color:"#3a5a7c", glyph:"◇",
    title:{it:"La Seconda Morte",en:"The Second Death"},
    subtitle:{it:"L'abbandono del corpo astrale",en:"Leaving the astral body"},
    intro:{it:"Il corpo astrale, purificato e logorato, si disgrega. Il tessuto di vita dorato si ritira e avvolge l'atomo astrale permanente. Davanti a te si apre il velo verso il mondo celeste, ma c'è un'ultima soglia.",en:"The astral body, purified and worn, disintegrates. The golden life-web withdraws and wraps the permanent astral atom. Before you the veil to the heaven world opens, but there is one last threshold."},
    rooms:[
      {text:{it:"Ciò che stai per lasciare potrebbe diventare quella che si chiama un'ombra: un cadavere astrale che conserva la tua apparenza, la tua memoria e le tue piccole idiosincrasie, e che nelle sedute spiritiche può essere scambiato per te.",
             en:"What you are about to leave could become what is called a 'shade': an astral corpse keeping your appearance, your memory and your small idiosyncrasies, which at séances can be mistaken for you."},
       choices:[
         {text:{it:"Lo abbandoni in fretta, ancora carico di residui.",en:"You abandon it hastily, still loaded with residues."},luce:-1,type:"mechanical",
          result:{it:"Un'ombra densa vaga a lungo, animata dai tuoi residui. Le ombre che parlano nelle sedute spiritiche nascono così.",en:"A dense shade wanders long, animated by your residues. The shades that speak at séances are born this way."}},
         {text:{it:"Lo svuoti con cura, ritirando da esso ogni energia che ti appartiene.",en:"You empty it with care, withdrawing from it every energy that belongs to you."},luce:1,type:"conscious",
          result:{it:"Svuotato, il corpo astrale si disgrega rapidamente. Nulla di tuo resta a vagare.",en:"Once emptied, the astral body disintegrates quickly. Nothing of yours remains to wander."}}
       ]},
      {text:{it:"Il velo del mondo celeste non lascia passare ciò che è grossolano: la materia devachanica non risponde alle vibrazioni delle passioni.\n\nNella mano stringi ancora un vecchio rancore. È quasi un cimelio, ormai.",
             en:"The heaven world's veil lets nothing coarse through: devachanic matter does not respond to the vibrations of the passions.\n\nIn your hand you still clutch an old resentment. It is almost a keepsake by now."},
       choices:[
         {text:{it:"Provi a nasconderlo e a portarlo con te.",en:"You try to hide it and carry it through."},luce:-1,type:"mechanical",
          result:{it:"Il velo non giudica: semplicemente, il rancore non può esistere oltre. Ti respinge finché lo tieni in mano.",en:"The veil does not judge: resentment simply cannot exist beyond. It pushes you back as long as you hold it."}},
         {text:{it:"Lo consegni al fuoco della soglia, e ne conservi solo la lezione.",en:"You hand it to the threshold's fire, keeping only its lesson."},luce:1,type:"conscious",
          result:{it:"Solo i germi latenti restano nell'atomo permanente. La lezione passa; il veleno no.",en:"Only the latent germs remain in the permanent atom. The lesson passes; the poison does not."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Guardiano del Velo",en:"The Guardian of the Veil"},
      text:{it:"Una figura di luce ferma e impersonale si erge sulla soglia del mondo celeste.\n\n«Qui entra solo ciò che è stato purificato. Mostrami che cosa hai raccolto dalla vita e dal kàmaloka.»",
            en:"A figure of still, impersonal light stands at the threshold of the heaven world.\n\n'Only what has been purified enters here. Show me what you have gathered from life and from kamaloka.'"},
      choices:[
        {text:{it:"Apri le mani: amori, aspirazioni, esperienze, l'essenza pura senza le scorie.",en:"You open your hands: loves, aspirations, experiences, the pure essence without the dross."},luce:1,type:"conscious",
         result:{it:"Il Guardiano si fa da parte. La mente ha assimilato ciò che le passioni avevano di puro: questo è il lasciapassare.",en:"The Guardian steps aside. The mind has assimilated what was pure in the passions: this is the pass."}},
        {text:{it:"Esiti: senza le tue passioni, non sai più chi sei.",en:"You hesitate: without your passions, you no longer know who you are."},luce:-2,type:"mechanical",
         result:{it:"L'esitazione ti trattiene sulla soglia. Passerai comunque, quando smetterai di confondere ciò che provi con ciò che sei.",en:"Hesitation holds you at the threshold. You will pass anyway, once you stop confusing what you feel with what you are."}}
      ]}
  },
  /* ═══ TAPPA 5: IL DEVACHAN ═══ */
  { key:"devachan", color:"#3a7c9a", glyph:"☉",
    title:{it:"Il Devachan",en:"Devachan"},
    subtitle:{it:"Il mondo celeste",en:"The heaven world"},
    intro:{it:"Sei nel 'soggiorno degli dei'. Qui ogni amore, speranza e aspirazione della vita terrestre fiorisce senza ostacoli e viene trasformata in facoltà. È il giorno che segue la notte della vita: il tempo dell'assimilazione.",en:"You are in the 'abode of the gods'. Here every love, hope and aspiration of earthly life blossoms unhindered and is transformed into faculty. It is the day that follows life's night: the time of assimilation."},
    rooms:[
      {text:{it:"I tuoi cari sono qui con te, vividi e sorridenti. Poi comprendi: sono le immagini che TU dai loro, animate dal vero legame che vi unisce attraverso i piani.",
             en:"Your loved ones are here with you, vivid and smiling. Then you understand: they are the images YOU give them, animated by the true bond uniting you across the planes."},
       choices:[
         {text:{it:"Pretendi che siano 'reali' come sulla terra, o il paradiso è una beffa.",en:"You demand they be 'real' as on earth, or heaven is a mockery."},luce:-1,type:"mechanical",
          result:{it:"Anche sulla terra amavi un'immagine che ti facevi dell'altro. Qui almeno l'immagine è animata dall'anima stessa che ami.",en:"On earth too you loved an image you made of the other. Here at least the image is animated by the very soul you love."}},
         {text:{it:"Comprendi: l'amore è reale; la forma è la tua creazione. E va bene così.",en:"You understand: the love is real; the form is your creation. And that is well."},luce:1,type:"conscious",
          result:{it:"Nel Devachan ogni ego raggiunge davvero i suoi cari attraverso le forme che gli vengono offerte. L'amore non è mai stato la forma.",en:"In Devachan every ego truly reaches its loved ones through the forms offered to it. Love was never the form."}}
       ]},
      {text:{it:"Ogni esperienza della vita viene macinata e trasformata: i dolori in comprensione, gli sforzi in capacità, le aspirazioni in poteri della prossima vita.\n\nPuoi orientare l'assimilazione.",
             en:"Every life experience is ground and transformed: pains into understanding, efforts into capacities, aspirations into powers for the next life.\n\nYou can orient the assimilation."},
       choices:[
         {text:{it:"Coltivi soprattutto ciò che fu piacevole: che la prossima vita sia comoda.",en:"You cultivate mostly what was pleasant: may the next life be comfortable."},luce:0,type:"neutral",
          result:{it:"Il piacere assimilato dà serenità, ma poca forza. Sono le prove digerite che diventano facoltà.",en:"Assimilated pleasure gives serenity, but little strength. It is digested trials that become faculties."}},
         {text:{it:"Lavori anche i dolori e i fallimenti, finché rivelano la loro lezione.",en:"You work the pains and failures too, until they yield their lesson."},luce:1,type:"conscious",
          result:{it:"È così che il Devachan compie il suo scopo: nulla dell'esperienza va perduto, tutto diventa potere dell'anima.",en:"This is how Devachan fulfils its purpose: nothing of experience is lost, all becomes power of the soul."}}
       ]}
    ],
    guardian:{
      name:{it:"La Beatitudine Senza Fine",en:"The Endless Bliss"},
      text:{it:"Il mondo celeste stesso ti parla, con la voce più dolce che esista:\n\n«Perché andartene? Qui non c'è dolore, non c'è perdita, non c'è fatica. Potresti restare per ere intere.»",
            en:"The heaven world itself speaks to you, in the sweetest voice there is:\n\n'Why leave? Here there is no pain, no loss, no toil. You could stay for whole ages.'"},
      choices:[
        {text:{it:"«La beatitudine non è la meta: è il riposo fra due giornate di lavoro. L'evoluzione continua.»",en:"'Bliss is not the goal: it is the rest between two days of work. Evolution continues.'"},luce:1,type:"conscious",
         result:{it:"Il cielo non ti trattiene: ti ha solo restituito le forze. Chi comprende il Devachan non lo scambia per la fine del cammino.",en:"Heaven does not hold you: it only gave you back your strength. One who understands Devachan does not mistake it for the journey's end."}},
        {text:{it:"Resti. Per sempre, se possibile.",en:"You stay. Forever, if possible."},luce:-2,type:"mechanical",
         result:{it:"Nessuno resta per sempre: quando l'esperienza è assimilata, il cielo stesso si dissolve. Hai solo ritardato l'alba.",en:"No one stays forever: when experience is assimilated, heaven itself dissolves. You have only delayed the dawn."}}
      ]}
  },
  /* ═══ TAPPA 6: LA VISIONE E IL RITORNO ═══ */
  { key:"ritorno", color:"#7a5ab0", glyph:"✦",
    title:{it:"La Visione e il Ritorno",en:"The Vision and the Return"},
    subtitle:{it:"Trishna e la rinascita",en:"Trishna and rebirth"},
    intro:{it:"Per un istante, sul piano causale, sei l'Ego: vedi la vita appena conclusa come un tutto, e quella che verrà con la lezione che dovrai impararvi. Poi Trishna, la sete di esistenza, comincia a chiamarti di nuovo verso il basso.",en:"For an instant, on the causal plane, you are the Ego: you see the life just ended as a whole, and the one to come with the lesson you will have to learn in it. Then Trishna, the thirst for existence, begins to call you downward again."},
    rooms:[
      {text:{it:"Dalla visione dell'Ego, la prossima vita si profila: vedi i suoi possibili contorni, le sue prove, i suoi incontri.\n\nCosa chiedi alla nuova giornata terrestre?",
             en:"From the Ego's vision, the next life takes shape: you see its possible outlines, its trials, its encounters.\n\nWhat do you ask of the new earthly day?"},
       choices:[
         {text:{it:"Comodità, salute, fortuna: una vita senza spine.",en:"Comfort, health, fortune: a life without thorns."},luce:-1,type:"mechanical",
          result:{it:"Una vita comoda non si ottiene chiedendola: la legge del karma decide quale occasione l'ego ha meritato, e può essere una condizione meno buona di quella sperata.",en:"A comfortable life is not had by asking for it: the law of karma decides what opportunity the ego has earned, and it may be a poorer condition than the one hoped for."}},
         {text:{it:"Le esperienze che ancora mancano alla tua crescita, qualunque forma abbiano.",en:"The experiences still missing from your growth, whatever form they take."},luce:1,type:"conscious",
          result:{it:"L'ego comune non si sceglie il corpo: la legge dell'evoluzione lo fa nascere dove può sviluppare le qualità di cui ha bisogno. Chi è più avanti rimette tutto nelle mani della legge eterna.",en:"The ordinary ego does not choose its body: the law of evolution has it born where it can develop the qualities it needs. One who is further on leaves everything in the hands of the eternal law."}}
       ]},
      {text:{it:"Gli atomi permanenti si risvegliano. Le vibrazioni di tutto ciò che sei stato, comprese le tendenze più difficili, cominciano a costruire i nuovi corpi.",
             en:"The permanent atoms awaken. The vibrations of all you have been, including the most difficult tendencies, begin to build the new bodies."},
       choices:[
         {text:{it:"Vorresti cancellare le tendenze scomode dal seme.",en:"You wish you could erase the awkward tendencies from the seed."},luce:-1,type:"mechanical",
          result:{it:"Nulla si cancella: si trasforma. La tendenza negata tornerà come destino; quella accolta, come strumento.",en:"Nothing is erased: it is transformed. The denied tendency returns as fate; the welcomed one, as instrument."}},
         {text:{it:"Accogli l'intero seme: anche le ombre sono materiale di lavoro.",en:"You welcome the whole seed: even the shadows are working material."},luce:1,type:"conscious",
          result:{it:"Gli atomi permanenti conservano tutto, senza giudicare. Chi accoglie il proprio seme intero nasce già riconciliato.",en:"The permanent atoms preserve everything, without judging. One who welcomes his whole seed is born already reconciled."}}
       ]}
    ],
    guardian:{
      name:{it:"Il Custode della Nascita",en:"The Keeper of Birth"},
      text:{it:"Sulla soglia della discesa, una figura velata regge una coppa.\n\n«Berrai l'oblio: la nuova mente non ricorderà questo viaggio, né le vite che hai visto. Dimmi: che cosa porterai oltre il velo della memoria?»",
            en:"At the threshold of descent, a veiled figure holds a cup.\n\n'You will drink forgetfulness: the new mind will remember neither this journey nor the lives you saw. Tell me: what will you carry beyond the veil of memory?'"},
      choices:[
        {text:{it:"«Il frutto delle esperienze: le capacità. La memoria resta nell'ego, e nulla è perduto.»",en:"'The fruit of experiences: capacities. Memory remains in the ego, and nothing is lost.'"},luce:1,type:"conscious",
         result:{it:"Il Custode sorride sotto il velo. La coscienza che ha attraversato la morte da sveglia porta il suo filo d'oro nella nuova vita.",en:"The Keeper smiles beneath the veil. The consciousness that crossed death awake carries its golden thread into the new life."}},
        {text:{it:"Ti disperi: senza ricordi, tutto questo sarà stato inutile.",en:"You despair: without memories, all this will have been useless."},luce:-2,type:"mechanical",
         result:{it:"Ciò che hai imparato passa nelle capacità, anche senza ricordi. Berrai comunque, ma la disperazione lascia un'ombra sul primo respiro.",en:"What you have learned passes into capacities, even without memories. You will drink anyway, but despair leaves a shadow on the first breath."}}
      ]}
  }
  ]
};
})();
