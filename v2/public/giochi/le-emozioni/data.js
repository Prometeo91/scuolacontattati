/* LE EMOZIONI — data.js (pooled from 5 books) */
(function(){
"use strict";
window.GAME_DATA = {
  id: "emoz",
  modes: ["ottava","cuore","quiz","memoria"],
  rings: [
    {key:"perdono",color:"#1a1326",ring:"#3a2f52",label:{it:"Il Perdono",en:"Forgiveness"}},
    {key:"trasmut",color:"#10212a",ring:"#2f5d6b",label:{it:"Trasmutazione",en:"Transmutation"}},
    {key:"giudizio",color:"#2a1410",ring:"#7c3a2a",label:{it:"Non-giudizio",en:"Non-judgment"}},
    {key:"cuore",color:"#3a2c10",ring:"#c9973a",label:{it:"Il Cuore",en:"The Heart"}}
  ],
  modeDefs: {
    ottava: { type:"classify", roman:"I", glyph:"◐", optionKeys:[0,1],
      items: [
        {item:{it:"Compassione: gioia nel vedere un'anima che impara attraverso la sofferenza",en:"Compassion: joy seeing a soul learning through suffering"},belongs:1,note:{it:"L'ottava alta della pietà. Nella compassione c'è il senso della perfezione del creato.",en:"The high octave of pity. In compassion there is the sense of creation's perfection."}},
        {item:{it:"Pietà: considerare l'altro un povero sfortunato",en:"Pity: considering the other a poor unfortunate"},belongs:0,note:{it:"Nella pietà è presente il senso dell'ingiustizia, della sfortuna e dell'inferiorità.",en:"In pity there is the sense of injustice, misfortune and inferiority."}},
        {item:{it:"Innocuità: avere la possibilità di intervenire, ma decidere di non farlo",en:"Harmlessness: having the ability to intervene, but deciding not to"},belongs:1,note:{it:"Le autentiche arti marziali: la forza di non usare la forza.",en:"Authentic martial arts: the strength not to use strength."}},
        {item:{it:"Impotenza: non avere la capacità di intervenire",en:"Impotence: not having the ability to intervene"},belongs:0,note:{it:"Non è una scelta cosciente ma un'incapacità: l'ottava bassa dell'innocuità.",en:"Not a conscious choice but an incapacity: the low octave of harmlessness."}},
        {item:{it:"Solitudine: capire di non essere mai soli, uniti a tutti gli altri",en:"Solitude: understanding one is never alone, united with all others"},belongs:1,note:{it:"La solitudine è una conquista dell'anima: sento l'unità con il Tutto.",en:"Solitude is a conquest of the soul: I feel unity with the All."}},
        {item:{it:"Sentirsi soli: credere di essere separati dagli altri e soffrirne",en:"Feeling lonely: believing oneself separate from others and suffering"},belongs:0,note:{it:"L'ottava bassa della solitudine: la separazione come sofferenza.",en:"The low octave of solitude: separation as suffering."}},
        {item:{it:"Devozione: riconoscere liberamente la grandezza dell'altro",en:"Devotion: freely recognising the other's greatness"},belongs:1,note:{it:"Nella devozione si riconosce la grandezza senza servilismo.",en:"In devotion one recognises greatness without servility."}},
        {item:{it:"Servilismo: servire sperando in un tornaconto",en:"Servility: serving hoping for a gain"},belongs:0,note:{it:"L'ottava bassa della devozione: si serve per ottenere qualcosa.",en:"The low octave of devotion: one serves to obtain something."}},
        {item:{it:"Autostima: stimare le proprie qualità riconoscendo che ci sono state donate",en:"Self-esteem: esteeming qualities while recognising they were given"},belongs:1,note:{it:"L'autostima vera non compete: riconosce il valore ricevuto.",en:"True self-esteem doesn't compete: it recognises received value."}},
        {item:{it:"Orgoglio: credere che le qualità siano nostre ed entrare in competizione",en:"Pride: believing qualities are ours and entering competition"},belongs:0,note:{it:"L'ottava bassa dell'autostima: si attribuisce il merito a sé.",en:"The low octave of self-esteem: one credits oneself."}},
        {item:{it:"Umiltà: sicurezza che nasce dalla comprensione della propria forza",en:"Humility: confidence born from understanding one's own strength"},belongs:1,note:{it:"Non si ha più bisogno di dimostrare il proprio valore.",en:"One no longer needs to prove one's worth."}},
        {item:{it:"Disistima: incapacità di riconoscere le proprie qualità",en:"Low self-esteem: inability to recognise one's qualities"},belongs:0,note:{it:"L'ottava bassa dell'umiltà: non riconoscere ciò che si è.",en:"The low octave of humility: not recognising what one is."}}
      ]
    },
    cuore: { type:"scenario", roman:"II", glyph:"◇", optionKeys:[0,1],
      items: [
        {sit:{it:"Qualcuno ti ferisce con parole dure e senti montare la rabbia.",en:"Someone wounds you with harsh words and you feel anger rising."},correct:1,note:{it:"L'attenzione va sull'emozione che provo, non sul comportamento dell'altro.",en:"Attention goes to the emotion I feel, not to the other's behaviour."}},
        {sit:{it:"Ti hanno fatto un torto e ti chiedi se riuscirai mai a perdonare.",en:"You were wronged and wonder whether you'll ever forgive."},correct:1,note:{it:"Vero perdono: realizzare che l'altro non mi ha mai fatto nulla. Sono le mie emozioni a creare gli eventi.",en:"True forgiveness: realising the other never did anything to me. My emotions create events."}},
        {sit:{it:"Un difetto in un'altra persona ti irrita in modo sproporzionato.",en:"A flaw in another person irritates you out of all proportion."},correct:1,note:{it:"Attraverso gli altri sto giudicando una parte di me che ancora rifiuto.",en:"Through others I am judging a part of myself I still reject."}},
        {sit:{it:"Provi un'emozione negativa intensa e vorresti scacciarla via.",en:"You feel an intense negative emotion and want to drive it away."},correct:1,note:{it:"La accolgo e la sciolgo nel Fuoco del Cuore: il demone diventa angelo.",en:"I welcome it and dissolve it in the Heart's Fire: the demon becomes an angel."}},
        {sit:{it:"Vorresti che il mondo intorno a te fosse migliore.",en:"You wish the world around you were better."},correct:1,note:{it:"Solo indagando me stesso posso cambiare il mondo. La realtà riflette ciò che sono.",en:"Only by examining myself can I change the world. Reality reflects what I am."}},
        {sit:{it:"Devo restituire l'offesa colpo su colpo per difendere il mio onore.",en:"I must return the offence blow for blow to defend my honour."},correct:0,note:{it:"Ogni re-azione è perfetta per quel grado di coscienza: il punto è l'emozione che provo io.",en:"Every re-action is perfect for that degree of consciousness: the point is the emotion I feel."}},
        {sit:{it:"Il perdono è da deboli: perdonerò solo dopo le scuse.",en:"Forgiveness is for the weak: I'll forgive only after an apology."},correct:0,note:{it:"Il perdono è una facoltà sovrumana, lo strumento del vero Guerriero, non da debosciati.",en:"Forgiveness is a superhuman faculty, the weapon of the true Warrior, not for the dissolute."}},
        {sit:{it:"Quella persona è semplicemente sbagliata, il problema è solo suo.",en:"That person is simply wrong, the problem is theirs alone."},correct:0,note:{it:"Più consideriamo sbagliata la materia, più ci allontaniamo dallo spirito.",en:"The more we deem matter wrong, the further we drift from spirit."}}
      ]
    },
    quiz: { type:"quiz", roman:"III", glyph:"✦", count:10,
      items: [
        {q:{it:"Le emozioni negative si chiamano 'negative' perché…",en:"Negative emotions are called 'negative' because…"},options:{it:["Sono l'altra faccia delle superiori, come numeri negativi","Sono sbagliate","Vanno represse","Non esistono"],en:["They are the other face of higher ones, like negative numbers","They are wrong","Must be repressed","Don't exist"]},correct:0,note:{it:"Sono il Piombo da trasmutare in Oro: preziose, non sbagliate.",en:"They are the Lead to transmute into Gold: precious, not wrong."}},
        {q:{it:"Il nucleo dell'Opera alchemica (Albedo) è…",en:"The core of the alchemical Work (Albedo) is…"},options:{it:["Trasmutare le emozioni negative in emozioni superiori","Accumulare conoscenze","Distruggere la personalità","Fuggire dalla materia"],en:["Transmuting negative emotions into higher emotions","Accumulating knowledge","Destroying the personality","Fleeing from matter"]},correct:0,note:{it:"Il Veleno diventa Farmaco: rabbia→beatitudine, paura→serenità.",en:"Poison becomes Remedy: anger→bliss, fear→serenity."}},
        {q:{it:"La vera 'Porta del Mago' è…",en:"The true 'Door of the Magus' is…"},options:{it:["La porta stretta del Cuore: perdono e non-giudizio","Un portale dimensionale","Un grimorio antico","Il corpo astrale"],en:["The narrow gate of the Heart: forgiveness and non-judgment","A dimensional portal","An ancient grimoire","The astral body"]},correct:0,note:{it:"Il ricordo di sé è solo propedeutico: la vera Porta è l'apertura del Cuore.",en:"Self-remembering is only preparatory: the true Door is the opening of the Heart."}},
        {q:{it:"Ogni emozione negativa è la manifestazione di…",en:"Every negative emotion is the manifestation of…"},options:{it:["Un giudizio che agisce nella mente","Un demone esterno","Una cattiva digestione","Un karma immutabile"],en:["A judgment acting in the mind","An external demon","Bad digestion","Immutable karma"]},correct:0,note:{it:"Il non-giudizio trasforma le emozioni negative in superiori: Piombo in Oro.",en:"Non-judgment transforms negative emotions into higher ones: Lead into Gold."}},
        {q:{it:"I Tre Segreti del Mago (Il bambino e il mago) sono…",en:"The Three Secrets (The child and the magus) are…"},options:{it:["Attrazione, Gratitudine, Amore","Forza, Coraggio, Saggezza","Fede, Speranza, Carità","Pensiero, Parola, Azione"],en:["Attraction, Gratitude, Love","Strength, Courage, Wisdom","Faith, Hope, Charity","Thought, Word, Action"]},correct:0,note:{it:"Attrazione: attiri ciò che sei. Gratitudine: magnete per il bene. Amore: unidirezionale dal Cuore.",en:"Attraction: you attract what you are. Gratitude: magnet for good. Love: unidirectional from the Heart."}},
        {q:{it:"Il corpo di gloria è costituito di…",en:"The body of glory is made of…"},options:{it:["Emozioni superiori","Emozioni negative","Pensieri razionali","Materia fisica"],en:["Higher emotions","Negative emotions","Rational thoughts","Physical matter"]},correct:0,note:{it:"Le emozioni superiori si sviluppano nutrendo il Bello e trasmutando le negative.",en:"Higher emotions develop by nourishing Beauty and transmuting the negative ones."}},
        {q:{it:"Il perdonare all'ottava alta significa…",en:"Forgiving at the high octave means…"},options:{it:["Realizzare che nessuno può fare del male alla nostra anima","Dimenticare in fretta","Aspettare le scuse","Fingere"],en:["Realising no one can harm our soul","Forgetting quickly","Waiting for an apology","Pretending"]},correct:0,note:{it:"All'ottava bassa: 'mi hai offeso ma ci metto una pietra sopra' — non si è compreso che l'offesa non c'è mai stata.",en:"At the low octave: 'you offended me but I'll let it go' — one hasn't understood the offence never occurred."}},
        {q:{it:"L'Amore, secondo 'Il bambino e il mago', è…",en:"Love, per 'The child and the magus', is…"},options:{it:["Unidirezionale: dal Cuore verso l'esterno, senza pretendere nulla","Un baratto equo","Solo per adulti","Qualcosa che si aspetta"],en:["Unidirectional: from Heart outward, expecting nothing","A fair barter","Only for adults","Something you expect"]},correct:0,note:{it:"«L'Amore non è un baratto, è un regalo.» Ama come ami un fiore: non pretendi che ricambi.",en:"'Love is not a barter, it is a gift.' Love as you love a flower: you don't demand it loves you back."}},
        {q:{it:"«Cavalcare la Tigre» significa…",en:"'Riding the Tiger' means…"},options:{it:["Non manifestare le emozioni basse: tenerle dentro e osservarle col Cuore","Reprimere tutto","Sfogarsi","Ignorare"],en:["Not manifesting base emotions: keeping them inside and observing with the Heart","Repressing everything","Venting","Ignoring"]},correct:0,note:{it:"Non è repressione (involontaria) ma lavoro cosciente sulla trasmutazione.",en:"It is not repression (involuntary) but conscious work on transmutation."}},
        {q:{it:"Tutte le nostre sofferenze derivano da…",en:"All our suffering stems from…"},options:{it:["L'aridità del Cuore, la sua mancata apertura","Eventi esterni sfavorevoli","La cattiva sorte","L'azione degli altri"],en:["The dryness of the Heart, its failure to open","Unfavourable external events","Bad luck","Others' actions"]},correct:0,note:{it:"Nessuna difficoltà ha la sua fonte all'esterno: ogni problema origina dalla durezza del Cuore.",en:"No difficulty has its source outside: every problem originates from the hardness of the Heart."}}
      ]
    },
    memoria: { type:"memory", roman:"IV", glyph:"✶",
      items: [
        {a:{it:"Compassione",en:"Compassion"},b:{it:"Pietà",en:"Pity"}},
        {a:{it:"Innocuità",en:"Harmlessness"},b:{it:"Impotenza",en:"Impotence"}},
        {a:{it:"Solitudine",en:"Solitude"},b:{it:"Sentirsi soli",en:"Loneliness"}},
        {a:{it:"Devozione",en:"Devotion"},b:{it:"Servilismo",en:"Servility"}},
        {a:{it:"Autostima",en:"Self-esteem"},b:{it:"Orgoglio",en:"Pride"}},
        {a:{it:"Umiltà",en:"Humility"},b:{it:"Disistima",en:"Low self-esteem"}}
      ]
    }
  }
};
})();
