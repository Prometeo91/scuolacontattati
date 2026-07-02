/* IL GRANDE VIAGGIO — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"Il Grande Viaggio",en:"The Great Journey"},
  gameTitle_html:{it:"Il Grande <span class='accent'>Viaggio</span>",en:"The Great <span class='accent'>Journey</span>"},
  gameKicker:{it:"Il ciclo della coscienza: morte, cielo e ritorno",en:"The cycle of consciousness: death, heaven and return"},
  epigraph:{it:"«La morte non è un evento unico, ma un processo che si ripete su ogni piano.»",en:"'Death is not a single event, but a process repeated on every plane.'"},
  epigraphSource:{it:"Arthur E. Powell",en:"Arthur E. Powell"},
  fromAuthor:{it:"dalle opere di Arthur E. Powell",en:"from the works of Arthur E. Powell"},
  themeLight:{it:"Tema chiaro",en:"Light theme"},
  themeDark:{it:"Tema scuro",en:"Dark theme"},
  begin:{it:"Inizia il viaggio",en:"Begin the journey"},
  resume:{it:"Riprendi",en:"Resume"},
  restart:{it:"Ricomincia",en:"Start over"},
  restartConfirm:{it:"Ricominciare da capo? Il progresso verrà azzerato.",en:"Start over? Progress will be reset."},
  continua:{it:"Continua",en:"Continue"},
  ascend:{it:"Prosegui",en:"Go on"},
  enter:{it:"Entra",en:"Enter"},
  face:{it:"Affronta",en:"Face"},
  luce:{it:"Coscienza",en:"Awareness"},
  room:{it:"Passo",en:"Step"},
  of:{it:"di",en:"of"},
  plane:{it:"Tappa",en:"Stage"},
  guardian:{it:"Custode",en:"Keeper"},
  backToMenu:{it:"Torna ai giochi",en:"Back to games"},
  playAgain:{it:"Gioca ancora",en:"Play again"},
  ending:{it:"Fine del viaggio",en:"End of the journey"},
  yourDestiny:{it:"Il tuo destino",en:"Your destiny"},
  gameOver:{it:"La coscienza si è dissolta",en:"Consciousness has dissolved"},
  gameOverText:{it:"Hai attraversato il viaggio trascinato dalle correnti, senza presenza. Rinascerai comunque — ma senza il filo d'oro del ricordo. Ricomincia: questa volta, da sveglio.",en:"You crossed the journey dragged by the currents, without presence. You will be reborn anyway — but without the golden thread of remembrance. Begin again: this time, awake."},
  victory:{it:"Il Ciclo è Compiuto",en:"The Cycle is Complete"},
  victoryText:{it:"Hai attraversato la morte, la purificazione, il cielo e il ritorno. La notte e il giorno dell'anima sono una sola, ininterrotta vita.",en:"You crossed death, purification, heaven and the return. The night and day of the soul are one single, unbroken life."},
  end_basso:{it:"Anima Assonnata",en:"Drowsy Soul"},
  end_basso_d:{it:"Hai compiuto il ciclo, ma trascinato più che camminando. Le correnti del kàmaloka e le lusinghe del cielo ti hanno mosso come marea. Eppure sei arrivato: e ogni ciclo insegna. Il prossimo viaggio sarà più lucido.",en:"You completed the cycle, but dragged more than walking. The currents of kamaloka and heaven's flatteries moved you like a tide. Yet you arrived: and every cycle teaches. The next journey will be more lucid."},
  end_medio:{it:"Anima Pellegrina",en:"Pilgrim Soul"},
  end_medio_d:{it:"Hai attraversato i mondi con coscienza crescente. Qualche corrente ti ha deviato, qualche soglia ti ha visto esitare — ma il filo del viaggio non si è mai spezzato. La presenza è un muscolo: e tu l'hai allenato.",en:"You crossed the worlds with growing awareness. Some currents deflected you, some thresholds saw you hesitate — but the journey's thread never broke. Presence is a muscle: and you trained it."},
  end_alto:{it:"Anima Ricordante",en:"Remembering Soul"},
  end_alto_d:{it:"Hai attraversato la morte quasi senza chiudere gli occhi. L'elementale non ti ha comandato, il lutto non ti ha incatenato, il cielo non ti ha addormentato. Il filo d'oro della coscienza è quasi intero: poco manca alla continuità piena.",en:"You crossed death almost without closing your eyes. The elemental did not command you, grief did not chain you, heaven did not lull you to sleep. The golden thread of consciousness is almost whole: little is missing for full continuity."},
  end_perfetto:{it:"Anima Risvegliata",en:"Awakened Soul"},
  end_perfetto_d:{it:"Coscienza piena, dall'ultimo respiro al primo. Hai guardato la visione panoramica senza fuggire, dissolto l'elementale senza lottare, lasciato il cielo senza rimpianto e accolto l'oblio senza paura.\n\nQuesta è la continuità di coscienza: la morte attraversata da svegli non è più morte.",en:"Full consciousness, from the last breath to the first. You watched the panoramic vision without fleeing, dissolved the elemental without struggling, left heaven without regret and welcomed oblivion without fear.\n\nThis is continuity of consciousness: death crossed awake is no longer death."}
};
function makeT(getLang){return function t(key){const e=STR[key];if(!e)return key;const l=getLang();return e[l]!=null?e[l]:e.it;};}
window.DNG_I18N={STR,makeT};
})();
