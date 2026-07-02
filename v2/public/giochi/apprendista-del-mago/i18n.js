/* L'APPRENDISTA DEL MAGO — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"L'Apprendista del Mago",en:"The Magus's Apprentice"},
  gameTitle_html:{it:"L'Apprendista del <span class='accent'>Mago</span>",en:"The Magus's <span class='accent'>Apprentice</span>"},
  gameKicker:{it:"Un'avventura narrativa a bivi sul cammino iniziatico",en:"A branching narrative adventure on the initiatic path"},
  epigraph:{it:"«Il maestro appare quando l'allievo è pronto.»",en:"'The master appears when the pupil is ready.'"},
  epigraphSource:{it:"Salvatore Brizzi",en:"Salvatore Brizzi"},
  fromAuthor:{it:"dagli scritti di Salvatore Brizzi",en:"from the writings of Salvatore Brizzi"},
  themeLight:{it:"Tema chiaro",en:"Light theme"},
  themeDark:{it:"Tema scuro",en:"Dark theme"},
  begin:{it:"Inizia l'avventura",en:"Begin the adventure"},
  resume:{it:"Riprendi",en:"Resume"},
  restart:{it:"Ricomincia",en:"Start over"},
  restartConfirm:{it:"Ricominciare da capo? Il progresso verrà azzerato.",en:"Start over? Progress will be reset."},
  continua:{it:"Continua",en:"Continue"},
  chapter:{it:"Capitolo",en:"Chapter"},
  backToMenu:{it:"Torna ai giochi",en:"Back to games"},
  playAgain:{it:"Gioca ancora",en:"Play again"},
  ending:{it:"Fine del cammino",en:"End of the path"},
  yourEnding:{it:"Il tuo destino",en:"Your destiny"},
  /* Endings */
  end_dormiente:{it:"Il Dormiente",en:"The Sleeper"},
  end_dormiente_d:{it:"Hai rifiutato la chiamata. La porta era aperta, ma non sei entrato. Il sonno della coscienza continua — ma la voce interiore non si spegne mai del tutto. Forse, un giorno, la ascolterai.",en:"You refused the call. The door was open, but you didn't enter. The sleep of consciousness continues — but the inner voice never fully goes silent. Perhaps, one day, you'll listen."},
  end_cercatore_incompiuto:{it:"Il Cercatore Incompiuto",en:"The Incomplete Seeker"},
  end_cercatore_incompiuto_d:{it:"Hai visto la porta, ma non l'hai attraversata. Sai che esiste un altro modo di vivere, ma non hai trovato la forza — o la volontà — di perseguirlo. Il seme è piantato; germoglierà quando sarà il momento.",en:"You saw the door but didn't walk through it. You know another way of living exists, but you haven't found the strength — or the will — to pursue it. The seed is planted; it will sprout when the time is right."},
  end_orgoglioso:{it:"L'Orgoglioso Spirituale",en:"The Spiritual Proud One"},
  end_orgoglioso_d:{it:"Hai accumulato conoscenza senza trasformarti. Sai le parole, ma non le vivi. L'ego si è travestito da cercatore — la trappola più sottile. Quando l'umiltà busserà, saprai ricominciare.",en:"You accumulated knowledge without transforming. You know the words but don't live them. The ego disguised itself as a seeker — the subtlest trap. When humility knocks, you'll know how to begin again."},
  end_mago_nero:{it:"Il Mago Nero",en:"The Black Magus"},
  end_mago_nero_d:{it:"Hai scelto il potere per te stesso. L'immortalità che cerchi è una prigione dorata — l'ego conservato per l'eternità, con tutta la sua sofferenza. Hai tutto e non hai nulla. La via del ritorno è sempre aperta, ma più lunga ad ogni passo.",en:"You chose power for yourself. The immortality you seek is a golden prison — the ego preserved for eternity, with all its suffering. You have everything and you have nothing. The way back is always open, but longer with every step."},
  end_ritorno:{it:"Il Ritorno",en:"The Return"},
  end_ritorno_d:{it:"Hai conosciuto la luce e l'hai lasciata andare. Vivi nel limbo tra il sonno e la veglia — troppo consapevole per dormire, troppo spaventato per svegliarti. La porta è sempre aperta. Il cammino aspetta.",en:"You knew the light and let it go. You live in the limbo between sleep and waking — too aware to sleep, too frightened to wake. The door is always open. The path awaits."},
  end_risvegliato:{it:"Il Risvegliato",en:"The Awakened One"},
  end_risvegliato_d:{it:"Hai attraversato il fuoco, la notte oscura e il vuoto. Hai lasciato morire l'illusione di chi credevi di essere. E in quel vuoto, hai trovato ciò che non muore mai.\n\nIl cammino non è finito — è appena iniziato. Ma ora cammini con occhi aperti.",en:"You walked through fire, the dark night and the void. You let the illusion of who you believed yourself to be die. And in that void, you found what never dies.\n\nThe path is not over — it has just begun. But now you walk with open eyes."}
};
function makeT(getLang){return function t(key){const e=STR[key];if(!e)return key;const l=getLang();return e[l]!=null?e[l]:e.it;};}
window.ADV_I18N={STR,makeT};
})();
