/* IL CORPO E L'ANIMA — data.js */
(function(){
"use strict";
window.GAME_DATA = {
  id: "corpo",
  modes: ["persona","immag","quiz","memoria"],
  rings: [
    {key:"piani",color:"#1a1326",ring:"#3a2f52",label:{it:"I Piani",en:"The Planes"}},
    {key:"corpi",color:"#10212a",ring:"#2f5d6b",label:{it:"I Corpi",en:"The Bodies"}},
    {key:"anima",color:"#2a1410",ring:"#7c3a2a",label:{it:"L'Anima",en:"The Soul"}},
    {key:"cuore",color:"#3a2c10",ring:"#c9973a",label:{it:"Il Cuore",en:"The Heart"}}
  ],
  modeDefs: {
    persona: { type:"classify", roman:"I", glyph:"◐", optionKeys:[0,1],
      items: [
        {item:{it:"La mente razionale",en:"The rational mind"},belongs:0,note:{it:"La personalità conosce per mezzo della mente, delle sensazioni e delle emozioni.",en:"The personality knows through the mind, the senses and the emotions."}},
        {item:{it:"Il Cuore",en:"The Heart"},belongs:1,note:{it:"Il Cuore è l'organo di conoscenza dell'anima.",en:"The Heart is the soul's organ of knowledge."}},
        {item:{it:"Le sensazioni fisiche",en:"Physical sensations"},belongs:0,note:{it:"Appartengono all'apparato psicofisico, la macchina biologica.",en:"They belong to the psychophysical apparatus, the biological machine."}},
        {item:{it:"La compassione e il senso del Bello",en:"Compassion and the sense of Beauty"},belongs:1,note:{it:"Sono emozioni superiori: il corpo dell'anima è costituito di esse.",en:"They are higher emotions: the body of the soul is made of them."}},
        {item:{it:"Il senso del possesso",en:"The sense of possession"},belongs:0,note:{it:"È uno schema mentale radicato nella personalità.",en:"It is a mental pattern rooted in the personality."}},
        {item:{it:"La «tuta spaziale»",en:"The 'spacesuit'"},belongs:0,note:{it:"La personalità è la tuta: ci consente di muoverci, ma in sé non conosce nulla.",en:"The personality is the suit: it lets us move, but in itself knows nothing."}},
        {item:{it:"L'«astronauta» dentro la tuta",en:"The 'astronaut' inside the suit"},belongs:1,note:{it:"L'anima è l'astronauta: solo a chi sta dentro è dato di conoscere.",en:"The soul is the astronaut: only the one inside can truly know."}},
        {item:{it:"Ciò che è immortale in noi",en:"What is immortal in us"},belongs:1,note:{it:"L'anima vive; la personalità soltanto sopravvive ed è mortale.",en:"The soul lives; the personality merely survives and is mortal."}},
        {item:{it:"Le emozioni negative",en:"Negative emotions"},belongs:0,note:{it:"La macchina biologica è prevalentemente costituita di emozioni negative.",en:"The biological machine is mostly made of negative emotions."}},
        {item:{it:"Essere trascinati dalle emozioni senza rendersene conto",en:"Being dragged by emotions without realising it"},belongs:0,note:{it:"Non si provano emozioni, si è da esse trascinati. Non si gestisce il corpo, si subisce.",en:"One doesn't feel emotions but is dragged by them."}},
        {item:{it:"Lo sfondo immutabile pieno di Pace su cui accadono increspature superficiali",en:"The immutable background full of Peace on which surface ripples occur"},belongs:1,note:{it:"Diveniamo lo sfondo immutabile sul quale accadono increspature prive di reale importanza.",en:"We become the immutable background on which surface ripples devoid of real importance occur."}}
      ]
    },
    immag: { type:"classify", roman:"II", glyph:"◇", optionKeys:[0,1],
      items: [
        {item:{it:"Alla vigilia di un esame la mente costruisce scenari catastrofici non richiesti",en:"Before an exam the mind builds catastrophic scenarios unbidden"},belongs:0,note:{it:"Immaginazione negativa: ogni genere di immaginazione non voluta né controllata.",en:"Negative imagination: every kind of imagination neither willed nor controlled."}},
        {item:{it:"Un artista immagina coscientemente i mondi che poi rappresenterà",en:"An artist consciously imagines the worlds he will represent"},belongs:1,note:{it:"Visualizzazione: la capacità di immaginare in maniera voluta e cosciente.",en:"Visualisation: the ability to imagine in a willed and conscious manner."}},
        {item:{it:"Dopo un litigio, ripensare per ore a cosa avremmo detto",en:"After a quarrel, spending hours thinking about what we'd have said"},belongs:0,note:{it:"Fa riaffiorare un'emozione negativa a distanza di ore dall'evento.",en:"It makes a negative emotion resurface hours after the event."}},
        {item:{it:"Ricostruire il filo dei discorsi per trarne insegnamento, senza emozioni basse",en:"Reconstructing discussions to learn, without base emotions"},belongs:1,note:{it:"Ricostruire la scena è utile, ma senza replicare le stesse basse emozioni.",en:"Reconstructing the scene is useful, but without replicating the same base emotions."}},
        {item:{it:"Sognare a occhi aperti di vincere alla lotteria",en:"Daydreaming about winning the lottery"},belongs:0,note:{it:"I sogni a occhi aperti richiameranno una dose corrispondente di emozioni negative.",en:"Daydreams will attract a corresponding dose of negative emotions."}},
        {item:{it:"Immaginare un incontro importante in maniera controllata, senza ansia",en:"Imagining an important meeting in a controlled way, without anxiety"},belongs:1,note:{it:"Molto utile se fatto in maniera controllata.",en:"Very useful if done in a controlled manner."}},
        {item:{it:"Il partner è in vacanza e la mente immagina tradimenti e disgrazie",en:"Partner is on holiday and the mind imagines betrayals and disasters"},belongs:0,note:{it:"L'ipocondria è immaginazione negativa. Ogni pensiero ossessivo origina da essa.",en:"Hypochondria is negative imagination. Every obsessive thought originates from it."}},
        {item:{it:"Chiedersi: 'Avevo il controllo di ciò che stavo pensando, oppure no?'",en:"Asking: 'Did I control what I was thinking, or not?'"},belongs:1,note:{it:"Il test del ricordo di sé: se non è stato voluto, è immaginazione negativa.",en:"The self-remembering test: if it was not willed, it is negative imagination."}}
      ]
    },
    quiz: { type:"quiz", roman:"III", glyph:"✦", count:10,
      items: [
        {q:{it:"L'organo di conoscenza dell'anima è…",en:"The soul's organ of knowledge is…"},options:{it:["Il Cuore","La mente","Gli occhi","Il cervello"],en:["The Heart","The mind","The eyes","The brain"]},correct:0,note:{it:"Col Cuore la coscienza si apre alla realtà oltre le apparenze.",en:"With the Heart consciousness opens to reality beyond appearances."}},
        {q:{it:"Le tre fasi dell'Opera, in ordine, sono…",en:"The three phases of the Work are…"},options:{it:["Nigredo, Albedo, Rubedo","Albedo, Rubedo, Nigredo","Rubedo, Nigredo, Albedo","Solve, Coagula, Ignis"],en:["Nigredo, Albedo, Rubedo","Albedo, Rubedo, Nigredo","Rubedo, Nigredo, Albedo","Solve, Coagula, Ignis"]},correct:0,note:{it:"Opera al Nero, al Bianco, al Rosso — pur sovrapponendosi nel cammino.",en:"Black, White and Red Work — though they overlap along the path."}},
        {q:{it:"La sequenza dei metalli è…",en:"The sequence of metals is…"},options:{it:["Piombo → Argento → Oro","Oro → Argento → Piombo","Ferro → Rame → Oro","Argento → Piombo → Oro"],en:["Lead → Silver → Gold","Gold → Silver → Lead","Iron → Copper → Gold","Silver → Lead → Gold"]},correct:0,note:{it:"Il Piombo diventa Argento con l'Albedo, e Argento diventa Oro con il Rubedo.",en:"Lead becomes Silver with the Albedo, and Silver becomes Gold with the Rubedo."}},
        {q:{it:"Nella Nigredo si costruisce…",en:"In the Nigredo one builds…"},options:{it:["Il 'Testimone'","Il corpo di gloria","L'Oro","Il senso del possesso"],en:["The 'Witness'","The body of glory","The Gold","The sense of possession"]},correct:0,note:{it:"La disidentificazione progressiva dalle reazioni emotive crea il Testimone.",en:"Gradual dis-identification from emotional reactions creates the Witness."}},
        {q:{it:"Cosa si reincarna?",en:"What reincarnates?"},options:{it:["L'anima, non la personalità","Il corpo fisico","La mente razionale","Le emozioni negative"],en:["The soul, not the personality","The physical body","The rational mind","Negative emotions"]},correct:0,note:{it:"La personalità è mortale; l'anima porta con sé l'essenza delle esperienze.",en:"The personality is mortal; the soul carries the essence of experiences."}},
        {q:{it:"Il significato esoterico della malattia è…",en:"The esoteric meaning of illness is…"},options:{it:["Un messaggio dell'anima attraverso il corpo","Una punizione divina","Un caso sfortunato","Solo un guasto meccanico"],en:["A message from the soul through the body","A divine punishment","An unlucky accident","Just a mechanical breakdown"]},correct:0,note:{it:"La malattia esprime sul piano fisico un disagio dei piani sottili.",en:"Illness expresses on the physical plane a discomfort from the subtle planes."}},
        {q:{it:"L'Alchimia Superior (ars brevis) apre il Cuore tramite…",en:"Alchimia Superior (ars brevis) opens the Heart through…"},options:{it:["L'arte ('estasi estetica') e il servizio","La sofferenza","Rituali complicati","Lo studio intellettuale"],en:["Art ('aesthetic ecstasy') and service","Suffering","Complicated rituals","Intellectual study"]},correct:0,note:{it:"Apre il Cuore senza passare dalla sofferenza.",en:"Opens the Heart without passing through suffering."}},
        {q:{it:"Dopo la morte, la coscienza attraversa…",en:"After death, consciousness goes through…"},options:{it:["Una rivisitazione della vita all'indietro","Annullamento totale","Reincarnazione immediata","Sonno eterno"],en:["A review of life backwards","Total annihilation","Immediate reincarnation","Eternal sleep"]},correct:0,note:{it:"Si rivede la vita in senso inverso, percependo le emozioni provocate negli altri.",en:"One reviews life in reverse, feeling the emotions caused in others."}},
        {q:{it:"Controllo e identificazione sono…",en:"Control and identification are…"},options:{it:["Inversamente proporzionali","Direttamente proporzionali","Uguali","Indipendenti"],en:["Inversely proportional","Directly proportional","Equal","Independent"]},correct:0,note:{it:"Meno siamo identificati con qualcosa, più ne abbiamo il controllo.",en:"The less identified we are, the more control we have."}},
        {q:{it:"Il 'crogiuolo' dove bruciare le emozioni negative è…",en:"The 'crucible' where negative emotions are burned is…"},options:{it:["Il Cuore in embrione","Il cervello razionale","Lo stomaco","Un rituale esterno"],en:["The embryonic Heart","The rational brain","The stomach","An external ritual"]},correct:0,note:{it:"Il crogiuolo è il nostro Cuore: una pietra magica capace di trasmutare.",en:"The crucible is our Heart: a magic stone able to transmute."}}
      ]
    },
    memoria: { type:"memory", roman:"IV", glyph:"✶",
      items: [
        {a:{it:"Corpo fisico",en:"Physical body"},b:{it:"Il piano denso\nvisibile",en:"The dense\nvisible plane"}},
        {a:{it:"Corpo eterico",en:"Etheric body"},b:{it:"Il 'doppio'\nenergetico",en:"The energetic\n'double'"}},
        {a:{it:"Corpo astrale",en:"Astral body"},b:{it:"La sede\ndelle emozioni",en:"The seat\nof emotions"}},
        {a:{it:"Corpo mentale",en:"Mental body"},b:{it:"La sede\ndei pensieri",en:"The seat\nof thoughts"}},
        {a:{it:"Personalità",en:"Personality"},b:{it:"Tuta spaziale",en:"Spacesuit"}},
        {a:{it:"Anima",en:"Soul"},b:{it:"Astronauta",en:"Astronaut"}}
      ]
    }
  }
};
})();
