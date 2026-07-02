/* IL GUERRIERO — data.js (pooled from 3 books) */
(function(){
"use strict";
window.GAME_DATA = {
  id: "guerr",
  modes: ["ring","trepunti","quiz","memoria"],
  rings: [
    {key:"morte",color:"#1a1326",ring:"#3a2f52",label:{it:"Immortalamento",en:"Immortalamento"}},
    {key:"cronos",color:"#10212a",ring:"#2f5d6b",label:{it:"Cronos",en:"Kronos"}},
    {key:"ring",color:"#2a1410",ring:"#7c3a2a",label:{it:"Il Ring",en:"The Ring"}},
    {key:"guerriero",color:"#3a2c10",ring:"#c9973a",label:{it:"Il Guerriero",en:"The Warrior"}}
  ],
  modeDefs: {
    ring: { type:"classify", roman:"I", glyph:"◐", optionKeys:[0,1],
      items: [
        {item:{it:"Desiderare ardentemente la vittoria per dimostrare di essere qualcuno",en:"Ardently desiring victory to prove one is someone"},belongs:0,note:{it:"Il desiderio di vincere è sinonimo di paura: non sei sicuro di te.",en:"The desire to win is synonymous with fear: you're not sure of yourself."}},
        {item:{it:"Fluire nel Qui-e-Ora senza aspettative sul risultato",en:"Flowing in the Here-and-Now without expectations"},belongs:1,note:{it:"Quando la vittoria perde importanza, la prestazione perfetta la fa verificare.",en:"When victory loses importance, perfect performance causes it to occur."}},
        {item:{it:"Sali sul ring pensando 'Devo distruggere il mio avversario'",en:"You step into the ring thinking 'I must destroy my opponent'"},belongs:0,note:{it:"Qualsiasi azione motivata dalla furia è votata al fallimento (Gengis Khan).",en:"Any action motivated by fury is doomed to fail (Genghis Khan)."}},
        {item:{it:"Corpo in 'rilassatezza attiva', come un felino prima del salto",en:"Body in 'active relaxation', like a cat before the leap"},belongs:1,note:{it:"Tensione fisica pura, non sporcata da tensione mentale ed emotiva.",en:"Pure physical tension, not dirtied by mental and emotional tension."}},
        {item:{it:"Colpire con rabbia e aggressività per schiacciare l'avversario",en:"Striking with rage and aggression to crush the opponent"},belongs:0,note:{it:"La rabbia è un combustibile che lascia intatta l'insoddisfazione.",en:"Rage is a fuel that when exhausted leaves dissatisfaction intact."}},
        {item:{it:"Combattere con la precisione di un ballerino e l'assenza di un monaco",en:"Fighting with the precision of a dancer and the absence of a monk"},belongs:1,note:{it:"Il colpo si esegue come un brano musicale al violino.",en:"The blow is executed like a musical piece on the violin."}},
        {item:{it:"I muscoli contratti dalla tensione emotiva prima del match",en:"Muscles clenched with emotional tension before the match"},belongs:0,note:{it:"Le emozioni creano attrito psicologico che impatta l'efficienza.",en:"Emotions create psychological friction that impacts efficiency."}},
        {item:{it:"Il colpo parte da solo, come se la Vita lo sferrasse attraverso di te",en:"The blow goes out on its own, as if Life struck it through you"},belongs:1,note:{it:"Non ostacolare un colpo che sta già andando verso il suo destino.",en:"Don't hinder a blow already heading toward its destiny."}},
        {item:{it:"La prestazione come danza dove i due avversari sono complici",en:"Performance as a dance where opponents are accomplices"},belongs:1,note:{it:"I due avversari si sostengono a vicenda per ottenere il massimo.",en:"The two opponents support each other to achieve their best."}},
        {item:{it:"Anticipare con la mente ciò che sta per succedere, provando paura",en:"Mentally anticipating what's about to happen, feeling fear"},belongs:0,note:{it:"La paura è basata su un'immagine mentale, un'anticipazione… un'illusione.",en:"Fear is based on a mental image, an anticipation… an illusion."}}
      ]
    },
    trepunti: { type:"scenario", roman:"II", glyph:"△", optionKeys:[0,1,2],
      items: [
        {sit:{it:"Il capo ti umilia al lavoro. Ti chiudi in bagno e osservi la rabbia che sale.",en:"Your boss humiliates you. You lock in the bathroom and observe the rage rising."},correct:0,note:{it:"Punto primo — Auto-osservazione: osserva cosa accade dentro di te. È già guarigione.",en:"Point one — Self-observation: observe what's happening inside you. It's already healing."}},
        {sit:{it:"Ti lamenti della società per la tua condizione economica.",en:"You blame society for your economic condition."},correct:1,note:{it:"Punto secondo — Non incolpare: l'origine dei tuoi mali si trova dentro di te.",en:"Point two — Don't blame: the origin of all your ills lies within you."}},
        {sit:{it:"Metti le mani sul plesso solare e respiri mandando amore al dolore.",en:"You place hands on your solar plexus and breathe, sending love to the pain."},correct:2,note:{it:"Punto terzo — Ama e perdona ciò che stai provando dentro di te in questo momento.",en:"Point three — Love and forgive what you're feeling within you right now."}},
        {sit:{it:"Qualcuno ti taglia la strada. Noti il fastidio nel corpo senza giudicarlo.",en:"Someone cuts you off. You notice the annoyance in your body without judging."},correct:0,note:{it:"L'Osservatore non giudica, non critica, non ha fretta di cambiare… al limite sorride.",en:"The Observer doesn't judge, doesn't criticise, isn't in a hurry to change… at most smiles."}},
        {sit:{it:"Pensi: 'Se non ci fosse quel collega, non avrei problemi.'",en:"You think: 'If not for that colleague, I'd have no problems.'"},correct:1,note:{it:"Non soffri perché qualcuno ti ha fatto qualcosa, ma qualcuno lo ha fatto perché hai scelto la sofferenza.",en:"You don't suffer because someone did something, but someone did it because you chose suffering."}},
        {sit:{it:"Senti il dolore della solitudine: lo abbracci, lo accogli senza scappare.",en:"You feel the pain of loneliness: you embrace it without running away."},correct:2,note:{it:"Ama e perdona la tua sofferenza, il tuo dolore, la tua ferita sanguinante.",en:"Love and forgive your suffering, your pain, your bleeding wound."}},
        {sit:{it:"La signora al telefono sul treno ti irrita. La tua irritazione ha creato la scena.",en:"The lady on the phone irritates you. Your irritation created the scene."},correct:1,note:{it:"Era la mia irritazione a creare e alimentare quell'episodio… e non viceversa.",en:"It was my irritation creating and feeding that episode… not the reverse."}},
        {sit:{it:"Espiri immaginando di mandare amore alle parti ferite del tuo essere.",en:"You exhale imagining sending love to the wounded parts of your being."},correct:2,note:{it:"Inspirando: più presente. Espirando: mando amore al mio dolore.",en:"Inhaling: more present. Exhaling: sending love to my pain."}},
        {sit:{it:"Senti il senso di ingiustizia e osservi la rabbia con distacco.",en:"You feel injustice and observe the rage with detachment."},correct:0,note:{it:"Vedevo salire rabbia, voglia di uccidere, senso di ingiustizia… e li accoglievo.",en:"I saw rage, the urge to kill, the sense of injustice rising… and I welcomed them."}}
      ]
    },
    quiz: { type:"quiz", roman:"III", glyph:"✦", count:10,
      items: [
        {q:{it:"Il 'colpo perfetto' è sferrato da…",en:"The 'perfect blow' is struck by…"},options:{it:["La Vita stessa attraverso il corpo dell'atleta","La pura forza muscolare","La rabbia","La tecnica meccanica"],en:["Life itself through the athlete's body","Pure muscular force","Rage","Mechanical technique"]},correct:0,note:{it:"La Vita sferra solo colpi perfetti. L'atleta deve evitare d'intervenire.",en:"Life only strikes perfect blows. The athlete must avoid intervening."}},
        {q:{it:"Lo stato ideale dell'atleta è…",en:"The athlete's ideal state is…"},options:{it:["Corpo rilassato, emozioni assenti, mente assente","Corpo teso, mente attiva","Rabbia controllata","Totale aggressività"],en:["Body relaxed, emotions absent, mind absent","Body tense, mind active","Controlled rage","Total aggression"]},correct:0,note:{it:"Rilassatezza attiva: tensione fisica pura, non sporcata da tensione mentale.",en:"Active relaxation: pure physical tension, not dirtied by mental tension."}},
        {q:{it:"I maestri prevedevano il vincitore osservando…",en:"Masters predicted the winner by observing…"},options:{it:["Come i fighter eseguivano la Ram Muay","Il peso dei combattenti","Il numero di allenamenti","L'età"],en:["How fighters performed the Ram Muay","Fighters' weight","Number of training sessions","Age"]},correct:0,note:{it:"Chi è concentrato nella danza — nel Qui-e-Ora — ha già vinto.",en:"He who is focused in the dance — in the Here-and-Now — has already won."}},
        {q:{it:"Il monaco-guerriero moderno deve…",en:"The modern monk-warrior must…"},options:{it:["Costituire una 'resistenza interiore' basata su solidi principi","Isolarsi dalla società","Combattere ogni giorno","Seguire solo tecniche orientali"],en:["Constitute an 'inner resistance' based on solid principles","Isolate from society","Fight every day","Follow only Eastern techniques"]},correct:0,note:{it:"Non piegarsi all'assenza di spirito dell'epoca moderna.",en:"Not bending to the spiritlessness of the modern age."}},
        {q:{it:"Draco Daatson ha fondato…",en:"Draco Daatson founded…"},options:{it:["La setta dei Senza Sonno","Un monastero","Una scuola di yoga","Un partito"],en:["The Sleepless sect","A monastery","A yoga school","A party"]},correct:0,note:{it:"Guerrieri del risveglio: non ho mai visto un occidentale risvegliarsi con tecniche di meditazione.",en:"Warriors of awakening: I've never seen a Westerner awaken through meditation techniques."}},
        {q:{it:"L''immortalamento' del guerriero avviene attraverso…",en:"The warrior's 'immortalamento' happens through…"},options:{it:["L'accettazione totale della morte","Una pozione magica","Evitare ogni pericolo","La tecnologia"],en:["Total acceptance of death","A magic potion","Avoiding every danger","Technology"]},correct:0,note:{it:"Chi trova il coraggio di affrontare la morte ha già fabbricato un'anima immortale.",en:"He who finds courage to face death has already fabricated an immortal soul."}},
        {q:{it:"Fare pace con la propria morte serve a…",en:"Making peace with one's death serves to…"},options:{it:["Vivere pienamente il presente","Diventare tristi","Rinunciare alla vita","Niente"],en:["Live the present fully","Become sad","Renounce life","Nothing"]},correct:0,note:{it:"Il Fuoco interiore emerge solo quando la mente si sente vicina alla sua fine.",en:"The inner Fire emerges only when the mind feels close to its end."}},
        {q:{it:"Per la rinascita italica basterebbero…",en:"For Italian rebirth it would be enough to have…"},options:{it:["Dieci monaci-guerrieri centrati e integri","Un milione di manifestanti","Un nuovo governo","Dieci miliardi"],en:["Ten centred, whole monk-warriors","A million demonstrators","A new government","Ten billion"]},correct:0,note:{it:"Dieci persone di tal fatta sarebbero sufficienti per una rinascita spirituale.",en:"Ten such people would suffice for a spiritual rebirth."}},
        {q:{it:"L'addestramento del Guerriero è su…",en:"The Warrior's training is on…"},options:{it:["Tre livelli: fisico, emotivo e mentale","Solo spirituale","Solo arti marziali","Solo studio"],en:["Three levels: physical, emotional and mental","Only spiritual","Only martial arts","Only study"]},correct:0,note:{it:"Fisico: vita sana. Emotivo: non lamentarsi. Mentale: presenza.",en:"Physical: healthy living. Emotional: no complaining. Mental: presence."}}
      ]
    },
    memoria: { type:"memory", roman:"IV", glyph:"✶",
      items: [
        {a:{it:"Il colpo perfetto",en:"The perfect blow"},b:{it:"Non ostacolare\nil destino",en:"Don't hinder\ndestiny"}},
        {a:{it:"Rilassatezza\nattiva",en:"Active\nrelaxation"},b:{it:"Corpo pronto\nmente assente",en:"Body ready\nmind absent"}},
        {a:{it:"I Tre Punti",en:"The Three Points"},b:{it:"Osserva, non incolpare\nama e perdona",en:"Observe, don't blame\nlove and forgive"}},
        {a:{it:"I Senza Sonno",en:"The Sleepless"},b:{it:"Guerrieri del\nrisveglio",en:"Warriors of\nawakening"}},
        {a:{it:"La Ram Muay",en:"The Ram Muay"},b:{it:"La danza rivela\nil vincitore",en:"The dance reveals\nthe winner"}},
        {a:{it:"Monaco-guerriero",en:"Monk-warrior"},b:{it:"Resistenza\ninteriore",en:"Inner\nresistance"}}
      ]
    }
  }
};
})();
