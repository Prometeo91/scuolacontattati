/* IL SENTIERO DELL'INIZIAZIONE — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"Il Sentiero dell'Iniziazione",en:"The Path of Initiation"},
  gameTitle_html:{it:"Il Sentiero dell'<span class='accent'>Iniziazione</span>",en:"The Path of <span class='accent'>Initiation</span>"},
  gameKicker:{it:"Dalla prova alla rivelazione: la scala del Pellegrino",en:"From probation to revelation: the Pilgrim's ladder"},
  epigraph:{it:"«Vedo una scala che sale nella volta azzurra, la base confusa nelle nebbie che circondano il pianeta.»",en:"'I see a ladder rising into the blue vault, its base lost in the mists that surround the planet.'"},
  epigraphSource:{it:"Catechismo esoterico · Alice A. Bailey",en:"Esoteric catechism · Alice A. Bailey"},
  fromAuthor:{it:"da \"Iniziazione umana e solare\" di Alice A. Bailey",en:"from 'Initiation, Human and Solar' by Alice A. Bailey"},
  themeLight:{it:"Tema chiaro",en:"Light theme"},
  themeDark:{it:"Tema scuro",en:"Dark theme"},
  begin:{it:"Sali sulla scala",en:"Climb the ladder"},
  resume:{it:"Riprendi",en:"Resume"},
  restart:{it:"Ricomincia",en:"Start over"},
  restartConfirm:{it:"Ricominciare da capo? Il progresso verrà azzerato.",en:"Start over? Progress will be reset."},
  continua:{it:"Continua",en:"Continue"},
  ascend:{it:"Sali",en:"Ascend"},
  enter:{it:"Entra",en:"Enter"},
  face:{it:"Affronta",en:"Face"},
  luce:{it:"Aspirazione",en:"Aspiration"},
  room:{it:"Prova",en:"Trial"},
  of:{it:"di",en:"of"},
  plane:{it:"Gradino",en:"Rung"},
  guardian:{it:"Guardiano",en:"Guardian"},
  backToMenu:{it:"Torna ai giochi",en:"Back to games"},
  playAgain:{it:"Gioca ancora",en:"Play again"},
  ending:{it:"Fine dell'ascesa",en:"End of the ascent"},
  yourDestiny:{it:"Il tuo grado",en:"Your degree"},
  gameOver:{it:"L'Aspirazione si è spenta",en:"Aspiration has gone out"},
  gameOverText:{it:"Il fuoco dell'aspirazione si è esaurito lungo la salita. Ma la scala resta dove l'hai lasciata — nessun gradino conquistato va perduto. Riprendi il cammino con rinnovato ardore.",en:"The fire of aspiration burned out along the climb. But the ladder remains where you left it — no rung once gained is ever lost. Take up the path again with renewed ardour."},
  victory:{it:"La Scala è Salita",en:"The Ladder is Climbed"},
  victoryText:{it:"Dal Sentiero della Prova alla soglia della Rivelazione: hai percorso la scala del Pellegrino fino in cima.",en:"From the Path of Probation to the threshold of Revelation: you climbed the Pilgrim's ladder to the top."},
  end_basso:{it:"Pellegrino della Soglia",en:"Pilgrim of the Threshold"},
  end_basso_d:{it:"Hai raggiunto la cima della scala, ma con il fuoco quasi spento. Molte prove ti hanno visto cedere alle vie comode della personalità. Eppure il Catechismo lo dice: all'occhio appare sempre una separazione — che da vicino si risolve in una Croce. Risali: ora conosci i gradini.",en:"You reached the top of the ladder, but with the fire nearly out. Many trials saw you yield to the personality's easy ways. Yet the Catechism says it: to the eye there always appears a separation — which up close resolves into a Cross. Climb again: now you know the rungs."},
  end_medio:{it:"Aspirante Provato",en:"Tested Aspirant"},
  end_medio_d:{it:"Hai salito la scala con passo alterno ma sincero. Qualche guardiano ti ha respinto, qualche prova ti ha piegato — ma l'aspirazione non si è mai spenta del tutto. Il carattere si costruisce così: lacuna dopo lacuna, colmata con intento deliberato.",en:"You climbed the ladder with an uneven but sincere step. Some guardians pushed you back, some trials bent you — but aspiration never wholly went out. Character is built this way: gap after gap, filled with deliberate intent."},
  end_alto:{it:"Discepolo Accettato",en:"Accepted Disciple"},
  end_alto_d:{it:"Hai attraversato le prove con fermezza: il corpo obbedisce, le acque astrali sono quiete, la mente serve. Il centro della tua vita si è spostato dal personale all'impersonale. La Porta dell'Iniziazione è davanti a te — e tu sai già come vi si giunge: con i piedi lavati nel sangue del cuore.",en:"You crossed the trials with firmness: the body obeys, the astral waters are still, the mind serves. The centre of your life has shifted from the personal to the impersonal. The Gate of Initiation stands before you — and you already know how it is reached: with feet washed in the blood of the heart."},
  end_perfetto:{it:"Iniziato",en:"Initiate"},
  end_perfetto_d:{it:"Aspirazione piena dal primo gradino all'ultimo. Hai colmato le lacune, servito senza corona, dominato i tre elementali, rinunciato perfino alla ricompensa. La Verga ha toccato il tuo capo.\n\n«Salgo calpestando il mio morto sé. Nella tensione del dolore perdo me stesso, trovo Me stesso, ed entro nella pace.»",en:"Full aspiration from the first rung to the last. You filled the gaps, served without a crown, mastered the three elementals, renounced even the reward. The Rod has touched your head.\n\n'I mount by treading on my dead self. In the strain of pain I lose myself, I find Myself, and enter into peace.'"}
};
function makeT(getLang){return function t(key){const e=STR[key];if(!e)return key;const l=getLang();return e[l]!=null?e[l]:e.it;};}
window.DNG_I18N={STR,makeT};
})();
