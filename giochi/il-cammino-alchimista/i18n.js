/* IL CAMMINO DELL'ALCHIMISTA — i18n */
(function(){
"use strict";
const STR = {
  school:{it:"Scuola ContattaTi",en:"Scuola ContattaTi"},
  backToSite:{it:"Torna al sito",en:"Back to the site"},
  gameTitle:{it:"Il Cammino dell'Alchimista",en:"The Alchemist's Path"},
  gameTitle_html:{it:"Il Cammino dell'<span class='accent'>Alchimista</span>",en:"The Alchemist's <span class='accent'>Path</span>"},
  gameKicker:{it:"Un viaggio interiore in prima persona attraverso le tre fasi dell'Opera",en:"A first-person inner journey through the three phases of the Work"},
  epigraph:{it:"«Non è ciò che ti accade che conta, ma come reagisci a ciò che ti accade.»",en:"'It's not what happens to you that matters, but how you react to what happens to you.'"},
  epigraphSource:{it:"Salvatore Brizzi",en:"Salvatore Brizzi"},
  fromAuthor:{it:"dagli scritti di Salvatore Brizzi",en:"from the writings of Salvatore Brizzi"},
  themeLight:{it:"Tema chiaro",en:"Light theme"},
  themeDark:{it:"Tema scuro",en:"Dark theme"},
  begin:{it:"Inizia il Cammino",en:"Begin the Path"},
  resume:{it:"Riprendi il Cammino",en:"Resume the Path"},
  restart:{it:"Ricomincia",en:"Start over"},
  restartConfirm:{it:"Ricominciare da capo? Tutto il progresso verrà azzerato.",en:"Start over? All progress will be reset."},
  continua:{it:"Continua",en:"Continue"},
  enter:{it:"Entra",en:"Enter"},
  face:{it:"Affronta",en:"Face"},
  choose:{it:"Scegli la tua risposta",en:"Choose your response"},
  scene:{it:"Prova",en:"Trial"},
  of:{it:"di",en:"of"},
  actComplete:{it:"Atto completato",en:"Act completed"},
  nextAct:{it:"Prossimo atto",en:"Next act"},
  seeProfile:{it:"Scopri il tuo profilo",en:"Discover your profile"},
  backToMenu:{it:"Torna ai giochi",en:"Back to games"},
  playAgain:{it:"Gioca ancora",en:"Play again"},
  yourProfile:{it:"Il tuo Profilo Alchemico",en:"Your Alchemical Profile"},
  level:{it:"Livello",en:"Level"},
  finalScore:{it:"Punteggio finale",en:"Final score"},
  statBreakdown:{it:"Le tue qualità",en:"Your qualities"},
  profileDesc:{it:"Profilo",en:"Profile"},
  /* Stats */
  stat_presenza:{it:"Presenza",en:"Presence"},
  stat_volonta:{it:"Volontà",en:"Will"},
  stat_nongiudizio:{it:"Non-giudizio",en:"Non-judgment"},
  stat_compassione:{it:"Compassione",en:"Compassion"},
  /* Levels */
  lv_dormiente:{it:"Dormiente",en:"Sleeper"},
  lv_cercatore:{it:"Cercatore",en:"Seeker"},
  lv_apprendista:{it:"Apprendista",en:"Apprentice"},
  lv_alchimista:{it:"Alchimista",en:"Alchemist"},
  lv_guerriero:{it:"Guerriero",en:"Warrior"},
  lv_mago:{it:"Mago",en:"Magus"},
  /* Acts */
  act_nigredo:{it:"Nigredo",en:"Nigredo"},
  act_nigredo_sub:{it:"La Dissoluzione",en:"The Dissolution"},
  act_nigredo_desc:{it:"Nel buio della materia prima, devi riconoscere la macchina che ti abita. Ogni reazione automatica è un'occasione per svegliarti.",en:"In the darkness of the prima materia, you must recognise the machine that inhabits you. Every automatic reaction is a chance to awaken."},
  act_albedo:{it:"Albedo",en:"Albedo"},
  act_albedo_sub:{it:"La Purificazione",en:"The Purification"},
  act_albedo_desc:{it:"La materia si purifica. Le prove diventano più profonde: tradimenti, malattia, crisi. Qui si impara a trasmutare il dolore in consapevolezza.",en:"The matter purifies. The trials become deeper: betrayals, illness, crisis. Here you learn to transmute pain into awareness."},
  act_rubedo:{it:"Rubedo",en:"Rubedo"},
  act_rubedo_sub:{it:"L'Integrazione",en:"The Integration"},
  act_rubedo_desc:{it:"L'oro appare. Le prove finali riguardano il potere, l'energia sacra, l'orgoglio e il servizio. Sei pronto a lasciar andare tutto ciò che credi di essere?",en:"The gold appears. The final trials concern power, sacred energy, pride and service. Are you ready to let go of everything you believe yourself to be?"},
  /* Boss */
  bossEncounter:{it:"Incontro con",en:"Encounter with"},
  bossPhase:{it:"Fase",en:"Phase"},
  /* Profile archetypes */
  prof_testimone:{it:"Il Testimone",en:"The Witness"},
  prof_testimone_d:{it:"La tua qualità dominante è la Presenza. Sei colui che osserva senza giudicare, che vede senza identificarsi. Il tuo dono è la lucidità — la capacità di restare sveglio quando tutti dormono. Il tuo rischio è la freddezza: osservare senza partecipare.",en:"Your dominant quality is Presence. You are the one who observes without judging, who sees without identifying. Your gift is lucidity — the ability to stay awake when everyone sleeps. Your risk is coldness: observing without participating."},
  prof_guerriero_int:{it:"Il Guerriero Interiore",en:"The Inner Warrior"},
  prof_guerriero_int_d:{it:"La tua qualità dominante è la Volontà. Sei colui che non si arrende, che applica lo shock cosciente quando l'energia cala. Il tuo dono è la determinazione — trasformi ogni ostacolo in carburante. Il tuo rischio è la rigidità: forzare quando serve arrendersi.",en:"Your dominant quality is Will. You are the one who doesn't give up, who applies the conscious shock when energy drops. Your gift is determination — you transform every obstacle into fuel. Your risk is rigidity: forcing when surrender is needed."},
  prof_specchio:{it:"Lo Specchio",en:"The Mirror"},
  prof_specchio_d:{it:"La tua qualità dominante è il Non-giudizio. Sei colui che vede entrambi i lati senza scegliere, che trascende la dualità. Il tuo dono è l'equanimità — niente ti squilibra. Il tuo rischio è il distacco: accettare tutto senza mai prendere posizione.",en:"Your dominant quality is Non-judgment. You are the one who sees both sides without choosing, who transcends duality. Your gift is equanimity — nothing unbalances you. Your risk is detachment: accepting everything without ever taking a stand."},
  prof_guaritore:{it:"Il Guaritore",en:"The Healer"},
  prof_guaritore_d:{it:"La tua qualità dominante è la Compassione. Sei colui che sente il dolore altrui e lo trasforma in amore. Il tuo dono è l'empatia — apri cuori chiusi. Il tuo rischio è il sacrificio: dare fino a svuotarti.",en:"Your dominant quality is Compassion. You are the one who feels others' pain and transforms it into love. Your gift is empathy — you open closed hearts. Your risk is sacrifice: giving until you're empty."},
  prof_completo:{it:"L'Alchimista Completo",en:"The Complete Alchemist"},
  prof_completo_d:{it:"Le tue qualità sono in equilibrio. Presenza, Volontà, Non-giudizio e Compassione si bilanciano in te come i quattro elementi. Sei sulla via dell'integrazione totale. Il tuo compito è mantenere questo equilibrio anche nella tempesta.",en:"Your qualities are in balance. Presence, Will, Non-judgment and Compassion balance within you like the four elements. You are on the path of total integration. Your task is to maintain this balance even in the storm."},
  prof_dormiente:{it:"Il Dormiente",en:"The Sleeper"},
  prof_dormiente_d:{it:"Il cammino è appena iniziato. Le prove ti hanno mostrato quanto la macchina governa le tue reazioni. Non scoraggiarti: il primo passo è sempre vedere il proprio sonno. Ritenta con occhi nuovi.",en:"The path has just begun. The trials showed you how much the machine governs your reactions. Don't be discouraged: the first step is always seeing your own sleep. Try again with new eyes."}
};

function makeT(getLang) {
  return function t(key) {
    const e = STR[key];
    if (!e) return key;
    const l = getLang();
    return e[l] != null ? e[l] : e.it;
  };
}
window.RPG_I18N = { STR, makeT };
})();
