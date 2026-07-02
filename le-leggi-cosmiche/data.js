/* LE LEGGI COSMICHE — data.js */
(function(){
"use strict";
window.GAME_DATA = {
  id: "leggi",
  modes: ["legge","specchio","quiz","memoria"],
  rings: [
    {key:"ottava",color:"#1a1326",ring:"#3a2f52",label:{it:"L'Ottava",en:"The Octave"}},
    {key:"risonanza",color:"#10212a",ring:"#2f5d6b",label:{it:"Risonanza",en:"Resonance"}},
    {key:"specchio",color:"#2a1410",ring:"#7c3a2a",label:{it:"Lo Specchio",en:"The Mirror"}},
    {key:"attrazione",color:"#3a2c10",ring:"#c9973a",label:{it:"Attrazione",en:"Attraction"}}
  ],
  modeDefs: {
    legge: { type:"scenario", roman:"I", glyph:"☉", optionKeys:[0,1,2,3],
      items: [
        {sit:{it:"Inizi un progetto con entusiasmo, ma dopo qualche settimana l'energia cala.",en:"You start a project with enthusiasm, but after a few weeks the energy drops."},correct:0,note:{it:"Legge dell'Ottava: fra MI e FA c'è un intervallo. Serve uno 'shock' per proseguire.",en:"Law of the Octave: between MI and FA there is an interval. A 'shock' is needed to continue."}},
        {sit:{it:"Ti lamenti del tuo posto di lavoro, ma non riesci mai a cambiarlo.",en:"You complain about your job, but never manage to change it."},correct:1,note:{it:"Legge di Risonanza: attiriamo la realtà più utile alla nostra evoluzione.",en:"Law of Resonance: we attract the reality most useful to our evolution."}},
        {sit:{it:"L'arroganza di un collega ti irrita in modo sproporzionato.",en:"A colleague's arrogance irritates you out of all proportion."},correct:2,note:{it:"Legge dello Specchio: ciò che ci dà fastidio riflette un lato di noi che rifiutiamo.",en:"Law of the Mirror: what annoys us reflects a side of ourselves we reject."}},
        {sit:{it:"Critichi il modo di vestire di qualcuno e poi ti senti giudicato.",en:"You criticise someone's dressing and then feel judged yourself."},correct:3,note:{it:"Non-giudizio: giudizio verso altri e verso noi stessi sono due facce della stessa medaglia.",en:"Non-judgment: judgment toward others and toward ourselves are two sides of the same coin."}},
        {sit:{it:"Provi pietà per un disabile; il Cuore aperto proverebbe compassione.",en:"You feel pity for a disabled person; the open Heart would feel compassion."},correct:0,note:{it:"Legge dell'Ottava: pietà e compassione sono la stessa nota su due ottave diverse.",en:"Law of the Octave: pity and compassion are the same note on two different octaves."}},
        {sit:{it:"Dopo aver cambiato interiormente, le persone intorno cambiano.",en:"After changing inwardly, the people around you change too."},correct:1,note:{it:"Legge di Risonanza: nella misura in cui cambiamo, cambiano persone e luoghi che attiriamo.",en:"Law of Resonance: to the degree we change, the people and places we attract change too."}},
        {sit:{it:"Vedi un difetto 'oggettivo' nel mondo, ma stai osservando qualcosa dentro di te.",en:"You see an 'objective' flaw in the world, but you're observing something within yourself."},correct:2,note:{it:"Legge dello Specchio: la realtà ci fa da specchio — vediamo solo ciò che siamo.",en:"Law of the Mirror: reality mirrors us — we see only what we are."}},
        {sit:{it:"Giudichi 'ricco' qualcuno e crei dentro di te il polo della povertà.",en:"You judge someone 'rich' and create within yourself the pole of poverty."},correct:3,note:{it:"Non-giudizio: il positivo crea il negativo. Nella dualità non c'è via d'uscita.",en:"Non-judgment: the positive creates the negative. In duality there is no way out."}},
        {sit:{it:"Due bulli ti prendono di mira. Più hai paura, più tornano.",en:"Two bullies single you out. The more you fear them, the more they come back."},correct:1,note:{it:"Attrazione/Risonanza: la paura emana dal corpo come un odore e attira ciò che temi.",en:"Attraction/Resonance: fear emanates from the body and attracts what you fear."}}
      ]
    },
    specchio: { type:"classify", roman:"II", glyph:"◇", optionKeys:[0,1],
      items: [
        {item:{it:"Cerchi di evitare l'interrogazione sperando che la maestra cambi idea",en:"You try to avoid the exam hoping the teacher will change her mind"},belongs:0,note:{it:"Pettini lo specchio: la paura del giudizio resta dentro di te.",en:"Combing the mirror: the fear of judgment remains inside you."}},
        {item:{it:"Osservi la sensazione di paura quando vedi i bulli arrivare",en:"You observe the sensation of fear when you see the bullies coming"},belongs:1,note:{it:"Lavori dall'interno: osservi il Piombo interiore senza rifiutarlo.",en:"Working from within: you observe the inner Lead without rejecting it."}},
        {item:{it:"Ti lamenti del mondo e aspetti che gli altri cambino",en:"You complain about the world and wait for others to change"},belongs:0,note:{it:"Solo indagando te stesso puoi cambiare il mondo.",en:"Only by examining yourself can you change the world."}},
        {item:{it:"Mandi amore alle parti del tuo corpo che vengono prese in giro",en:"You send love to the parts of your body that are made fun of"},belongs:1,note:{it:"Ami il modo in cui è fatto il tuo corpo. Altrimenti incontrerai sempre qualcuno a cui non piace.",en:"You love the way your body is made. Otherwise you'll always meet someone who doesn't like it."}},
        {item:{it:"Incolpi qualcun altro per ciò che ti è successo",en:"You blame someone else for what happened to you"},belongs:0,note:{it:"Nella Magia agisci all'interno per modificare l'esterno.",en:"In Magic you act within to change the outside."}},
        {item:{it:"Quando qualcosa ti dà disagio, pensi: 'Che parte di me sta emergendo?'",en:"When something makes you uneasy, you think: 'What part of me is emerging?'"},belongs:1,note:{it:"Dovresti essere contento: hai la possibilità di osservare un aspetto nascosto.",en:"You should be happy: you have the chance to observe a hidden aspect."}},
        {item:{it:"Ti concentri sulla frase 'Adesso sono presente' passando attraverso una porta",en:"You focus on 'Now I am present' while passing through a door"},belongs:1,note:{it:"Esercizio fondamentale di Presenza per renderti più sveglio nella vita quotidiana.",en:"Fundamental Presence exercise to make you more awake in daily life."}},
        {item:{it:"Speri che la sfortuna passi da sola, senza cambiare nulla di te",en:"You hope bad luck will pass on its own, without changing anything about yourself"},belongs:0,note:{it:"Non puoi sfuggire a una parte di te: ti seguirà ovunque andrai.",en:"You can't escape a part of yourself: it will follow you wherever you go."}}
      ]
    },
    quiz: { type:"quiz", roman:"III", glyph:"✦", count:10,
      items: [
        {q:{it:"Nella Legge dell'Ottava, gli intervalli si trovano fra…",en:"In the Law of the Octave, the intervals are between…"},options:{it:["MI–FA e SI–DO","DO–RE e FA–SOL","RE–MI e LA–SI","SOL–LA e DO–RE"],en:["MI–FA and SI–DO","DO–RE and FA–SOL","RE–MI and LA–SI","SOL–LA and DO–RE"]},correct:0,note:{it:"Come sulla tastiera: fra MI-FA e SI-DO non c'è il tasto nero.",en:"As on the keyboard: between MI-FA and SI-DO there is no black key."}},
        {q:{it:"Il 'pensiero verticale' è…",en:"'Vertical thinking' is…"},options:{it:["La capacità di cogliere il significato simbolico oltre l'apparenza","Il pensiero logico","Il dialogo interno","L'immaginazione negativa"],en:["The ability to grasp symbolic meaning beyond appearance","Logical thinking","Inner dialogue","Negative imagination"]},correct:0,note:{it:"La realtà parla per simboli: il pensiero simbolico coglie la Verità nascosta.",en:"Reality speaks through symbols: symbolic thinking grasps the hidden Truth."}},
        {q:{it:"Secondo la Legge di Risonanza, siamo sempre…",en:"According to the Law of Resonance, we are always…"},options:{it:["Nel posto migliore per la nostra evoluzione","Nel posto sbagliato","Dove il destino ci ha messo","Dove vogliono gli altri"],en:["In the best place for our evolution","In the wrong place","Where destiny put us","Where others want us"]},correct:0,note:{it:"Chi si lamenta del pianeta è chi ne ha più bisogno per la propria evoluzione.",en:"Whoever complains about the planet is the one who most needs it for evolution."}},
        {q:{it:"Secondo la Legge dello Specchio, la realtà esterna è…",en:"According to the Law of the Mirror, outer reality is…"},options:{it:["Una proiezione che riflette ciò che siamo","Indipendente da noi","Un caso senza senso","Creata dagli altri"],en:["A projection mirroring what we are","Independent of us","A meaningless accident","Created by others"]},correct:0,note:{it:"Vediamo solo ciò che siamo: il mondo è costruito a nostra immagine.",en:"We see only what we are: the world is built in our image."}},
        {q:{it:"La mente funziona in maniera…",en:"The mind works in a…"},options:{it:["Duale: come un processo binario","Unitaria e sintetica","Casuale","Sempre intuitiva"],en:["Dual way, like a binary process","Unitary and synthetic way","Random","Always intuitive"]},correct:0,note:{it:"Buono/cattivo, caldo/freddo: la mente conosce solo attraverso gli opposti.",en:"Good/bad, hot/cold: the mind knows only through opposites."}},
        {q:{it:"Per uscire dalla dualità bisogna…",en:"To exit duality one must…"},options:{it:["Identificarsi con l'anima e guardare dal Cuore","Pensare più forte","Scegliere sempre il polo positivo","Eliminare la mente"],en:["Identify with the soul and look from the Heart","Think harder","Always choose the positive pole","Eliminate the mind"]},correct:0,note:{it:"Il Cuore sintetizza e intuisce la perfezione di tutto ciò che accade.",en:"The Heart synthesises and intuits the perfection of all that happens."}},
        {q:{it:"«Un uomo non attrae ciò che vuole, bensì…»",en:"'A man doesn't attract what he wants, but…'"},options:{it:["Ciò che è","Ciò che odia","Ciò che gli altri vogliono","Il caso"],en:["What he is","What he hates","What others want","Chance"]},correct:0,note:{it:"La causa è dentro, l'effetto è fuori. Il mondo riflette ciò che sei.",en:"The cause is inside, the effect is outside. The world reflects what you are."}},
        {q:{it:"La Gratitudine agisce come…",en:"Gratitude acts as…"},options:{it:["Un magnete: più ne hai, più attiri motivi per essere grato","Un sedativo","Un'illusione","Un obbligo morale"],en:["A magnet: the more you feel, the more reasons to be grateful you attract","A sedative","An illusion","A moral obligation"]},correct:0,note:{it:"Secondo segreto del Mago: la Gratitudine è una forza attrattiva.",en:"Second secret of the Magus: Gratitude is an attractive force."}}
      ]
    },
    memoria: { type:"memory", roman:"IV", glyph:"✶",
      items: [
        {a:{it:"Legge dell'Ottava",en:"Law of the Octave"},b:{it:"Intervalli MI-FA\ne SI-DO",en:"Intervals MI-FA\nand SI-DO"}},
        {a:{it:"Legge di Risonanza",en:"Law of Resonance"},b:{it:"Il simile attrae\nil simile",en:"Like attracts\nlike"}},
        {a:{it:"Legge dello Specchio",en:"Law of the Mirror"},b:{it:"Vediamo solo\nciò che siamo",en:"We see only\nwhat we are"}},
        {a:{it:"Il Non-giudizio",en:"Non-judgment"},b:{it:"Uscire dalla\ndualità",en:"Exiting\nduality"}},
        {a:{it:"L'Attrazione",en:"Attraction"},b:{it:"La causa è dentro\nl'effetto è fuori",en:"Cause inside\neffect outside"}},
        {a:{it:"Il pensiero\nverticale",en:"Vertical\nthinking"},b:{it:"Cogliere il simbolo\noltre l'apparenza",en:"Grasping the symbol\nbeyond appearance"}}
      ]
    }
  }
};
})();
