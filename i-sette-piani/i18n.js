/* I SETTE PIANI — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"I Sette Piani",en:"The Seven Planes"},
  gameTitle_html:{it:"I Sette <span class='accent'>Piani</span>",en:"The Seven <span class='accent'>Planes</span>"},
  gameKicker:{it:"Esplorazione verticale attraverso i piani dell'essere",en:"Vertical exploration through the planes of being"},
  epigraph:{it:"«L'universo manifesto è composto da sette piani.»",en:"'The manifest universe is composed of seven planes.'"},
  epigraphSource:{it:"Salvatore Brizzi",en:"Salvatore Brizzi"},
  fromAuthor:{it:"dagli scritti di Salvatore Brizzi",en:"from the writings of Salvatore Brizzi"},
  themeLight:{it:"Tema chiaro",en:"Light theme"},
  themeDark:{it:"Tema scuro",en:"Dark theme"},
  begin:{it:"Inizia l'ascesa",en:"Begin the ascent"},
  resume:{it:"Riprendi",en:"Resume"},
  restart:{it:"Ricomincia",en:"Start over"},
  restartConfirm:{it:"Ricominciare da capo? Il progresso verrà azzerato.",en:"Start over? Progress will be reset."},
  continua:{it:"Continua",en:"Continue"},
  ascend:{it:"Ascendi",en:"Ascend"},
  enter:{it:"Entra",en:"Enter"},
  face:{it:"Affronta",en:"Face"},
  luce:{it:"Luce",en:"Light"},
  room:{it:"Stanza",en:"Room"},
  of:{it:"di",en:"of"},
  plane:{it:"Piano",en:"Plane"},
  guardian:{it:"Guardiano",en:"Guardian"},
  backToMenu:{it:"Torna ai giochi",en:"Back to games"},
  playAgain:{it:"Gioca ancora",en:"Play again"},
  ending:{it:"Fine dell'ascesa",en:"End of the ascent"},
  yourDestiny:{it:"Il tuo destino",en:"Your destiny"},
  gameOver:{it:"La luce si è spenta",en:"The light has gone out"},
  gameOverText:{it:"La tua Luce ha raggiunto lo zero. Le tenebre ti hanno inghiottito — ma ogni caduta è un insegnamento. Ricomincia con occhi nuovi.",en:"Your Light has reached zero. Darkness has swallowed you — but every fall is a teaching. Begin again with new eyes."},
  victory:{it:"La Luce Totale",en:"Total Light"},
  victoryText:{it:"Hai attraversato tutti e sette i piani dell'essere. La goccia è tornata all'oceano — e ha scoperto di essere sempre stata l'oceano.",en:"You have crossed all seven planes of being. The drop returned to the ocean — and discovered it was always the ocean."},
  end_basso:{it:"Viandante dell'Ombra",en:"Shadow Wanderer"},
  end_basso_d:{it:"Hai raggiunto la cima, ma con poca luce. Il cammino ti ha segnato — le scelte meccaniche hanno oscurato la visione. Ma sei arrivato, e questo conta. Il prossimo viaggio sarà più luminoso.",en:"You reached the top, but with little light. The path marked you — mechanical choices dimmed your vision. But you arrived, and that counts. The next journey will be brighter."},
  end_medio:{it:"Cercatore di Luce",en:"Light Seeker"},
  end_medio_d:{it:"Hai attraversato i sette piani con consapevolezza crescente. Non ogni scelta è stata perfetta — ma la perfezione non è il punto. Il punto è la presenza. E tu eri presente.",en:"You crossed the seven planes with growing awareness. Not every choice was perfect — but perfection is not the point. The point is presence. And you were present."},
  end_alto:{it:"Portatore di Luce",en:"Light Bearer"},
  end_alto_d:{it:"La tua Luce brilla intensamente. Hai attraversato ogni piano con consapevolezza e coraggio. Le prove ti hanno rafforzato anziché indebolirti. Sei pronto per il vero Lavoro — quello che inizia dopo il risveglio.",en:"Your Light shines brightly. You crossed every plane with awareness and courage. The trials strengthened rather than weakened you. You are ready for the real Work — the one that begins after awakening."},
  end_perfetto:{it:"L'Illuminato",en:"The Illuminated One"},
  end_perfetto_d:{it:"Luce piena. Ogni scelta è stata un atto di coscienza. Hai visto le trappole e non ci sei caduto. Hai accettato l'ombra e l'hai integrata. Hai attraversato il velo e non hai avuto paura.\n\nMa ricorda: l'illuminazione non è la fine — è l'inizio della vera vita cosciente.",en:"Full Light. Every choice was an act of consciousness. You saw the traps and didn't fall. You accepted the shadow and integrated it. You crossed the veil and weren't afraid.\n\nBut remember: illumination is not the end — it is the beginning of true conscious life."}
};
function makeT(getLang){return function t(key){const e=STR[key];if(!e)return key;const l=getLang();return e[l]!=null?e[l]:e.it;};}
window.DNG_I18N={STR,makeT};
})();
