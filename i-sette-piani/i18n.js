/* I SETTE PIANI — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"I Sette Piani",en:"The Seven Planes"},
  gameTitle_html:{it:"I Sette <span class='accent'>Piani</span>",en:"The Seven <span class='accent'>Planes</span>"},
  gameKicker:{it:"Esplorazione verticale attraverso i piani dell'essere",en:"Vertical exploration through the planes of being"},
  epigraph:{it:"«I mondi, o piani, in cui l'universo manifesto è suddiviso sono sette.»",en:"'The worlds, or planes, into which the manifest universe is divided are seven.'"},
  epigraphSource:{it:"Salvatore Brizzi, I mondi spirituali",en:"Salvatore Brizzi, I mondi spirituali"},
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
  gameOverText:{it:"La tua Luce ha raggiunto lo zero e le tenebre ti hanno inghiottito. Ogni caduta però insegna qualcosa: ricomincia con occhi nuovi.",en:"Your Light has reached zero and darkness has swallowed you. Every fall teaches something, though: begin again with new eyes."},
  victory:{it:"La Luce Totale",en:"Total Light"},
  victoryText:{it:"Hai attraversato i sette piani, dal fisico al Logos. La goccia è diventata l'oceano, e ne è cosciente.",en:"You have crossed the seven planes, from the physical to the Logos. The drop has become the ocean, and is aware of it."},
  end_basso:{it:"Viandante dell'Ombra",en:"Shadow Wanderer"},
  end_basso_d:{it:"Hai raggiunto il Logos, ma con poca luce. Molte scelte sono state meccaniche e hanno oscurato la visione. Sei arrivato comunque, e il prossimo viaggio può essere più luminoso.",en:"You reached the Logos, but with little light. Many choices were mechanical and dimmed your vision. You arrived all the same, and the next journey can be brighter."},
  end_medio:{it:"Cercatore di Luce",en:"Light Seeker"},
  end_medio_d:{it:"Hai attraversato i sette piani con consapevolezza crescente. Alcune scelte sono state meccaniche: il Lavoro sta nell'accorgersene e nel continuare a osservare.",en:"You crossed the seven planes with growing awareness. Some choices were mechanical: the Work lies in noticing it and in continuing to observe."},
  end_alto:{it:"Portatore di Luce",en:"Light Bearer"},
  end_alto_d:{it:"La tua Luce brilla intensamente. Hai attraversato i piani quasi sempre da sveglio, e le prove ti hanno rafforzato. Resta qualche scelta da rivedere: rigiocando puoi trovarla.",en:"Your Light shines brightly. You crossed the planes awake almost all the way, and the trials strengthened you. A few choices remain to be reviewed: playing again you can find them."},
  end_perfetto:{it:"L'Illuminato",en:"The Illuminated One"},
  end_perfetto_d:{it:"Luce piena. Hai fatto ogni scelta in modo cosciente, dal corpo denso fino al Logos. Hai accettato l'ombra, perdonato il nemico, riportato il Fuoco nel corpo e lasciato andare anche il Sé illuminato.\n\nRicorda però che il percorso autentico non ha fine: ogni giorno si può conquistare un traguardo.",en:"Full Light. You made every choice consciously, from the dense body to the Logos. You accepted the shadow, forgave the enemy, brought the Fire back into the body and let go even of the illumined Self.\n\nRemember, though, that the authentic path has no end: every day you can reach a milestone."}
};
function makeT(getLang){return function t(key){const e=STR[key];if(!e)return key;const l=getLang();return e[l]!=null?e[l]:e.it;};}
window.DNG_I18N={STR,makeT};
})();
