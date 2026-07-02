/* IL CAMMINO DELL'ALCHIMISTA — RPG engine */
(function(){
"use strict";
const D=window.RPG_DATA, I=window.RPG_I18N;
const C=window.GameCore(I);
const t=C.t,L=C.L,frag=C.frag,esc=C.esc,mount=C.mount;
const LS_KEY="sc-rpg-state";
const STAT_MAX=20, ACT_KEYS=["nigredo","albedo","rubedo"], ACT_NUMS=["I","II","III"];
const STAT_ICONS={presenza:"◉",volonta:"♦",nongiudizio:"☯",compassione:"♡"};

/* ── State ── */
function freshState(){return{screen:"title",act:0,scene:0,bossPhase:0,answered:false,chosenIdx:-1,stats:{presenza:0,volonta:0,nongiudizio:0,compassione:0},actStartStats:null,completed:false};}
let S;
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(S));}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem(LS_KEY));if(s&&s.stats)return s;}catch(e){}return null;}
function hasSave(){return!!load();}
function totalStat(){const s=S.stats;return s.presenza+s.volonta+s.nongiudizio+s.compassione;}
function getLevel(){const tot=totalStat();for(let i=D.levels.length-1;i>=0;i--)if(tot>=D.levels[i].min)return D.levels[i];return D.levels[0];}
function setActAttr(){document.documentElement.setAttribute("data-act",ACT_KEYS[S.act]||"nigredo");}

/* ── Shared UI components ── */
function buildStatsPanel(){
  const w=frag('<div class="rpg-stats"></div>');
  D.stats.forEach(sk=>{
    const v=Math.max(0,S.stats[sk]);
    const pct=Math.min(100,Math.round(v/STAT_MAX*100));
    w.appendChild(frag(`<div class="rpg-stat"><span class="rpg-stat-icon ${sk}">${STAT_ICONS[sk]}</span><div class="rpg-stat-info"><div class="rpg-stat-name">${esc(t("stat_"+sk))}</div><div class="rpg-stat-bar"><div class="rpg-stat-fill ${sk}" style="width:0%"></div></div></div><span class="rpg-stat-val">${v}</span></div>`));
  });
  requestAnimationFrame(()=>{requestAnimationFrame(()=>{w.querySelectorAll(".rpg-stat-fill").forEach((f,i)=>{const v=Math.max(0,S.stats[D.stats[i]]);f.style.width=Math.min(100,Math.round(v/STAT_MAX*100))+"%";});});});
  return w;
}
function buildLevelBadge(){
  const lv=getLevel();
  return frag(`<div class="rpg-level"><span class="rpg-level-glyph">${lv.glyph}</span><span>${esc(t("level"))}: <b>${esc(t("lv_"+lv.key))}</b></span></div>`);
}
function buildProgress(){
  const act=D.acts[S.act], total=act.scenes.length;
  const w=frag('<div class="rpg-progress"></div>');
  for(let i=0;i<total;i++){
    if(i>0)w.appendChild(frag('<div class="rpg-progress-line"></div>'));
    const cls="rpg-progress-dot"+(i<S.scene?" done":i===S.scene?" current":"");
    w.appendChild(frag(`<div class="${cls}"></div>`));
  }
  w.appendChild(frag('<div class="rpg-progress-line"></div>'));
  const bossCls="rpg-progress-dot boss"+(S.scene>=total?(S.bossPhase>0?" done":" current"):"");
  w.appendChild(frag(`<div class="${bossCls}"></div>`));
  return w;
}
function backBtn(onclick){
  const b=frag(`<button class="btn-back">← ${esc(t("backToMenu"))}</button>`);
  b.addEventListener("click",onclick);return b;
}

/* ══════════════ SCREENS ══════════════ */

/* ── TITLE ── */
function renderTitle(){
  S=load()||freshState();S.screen="title";
  document.documentElement.removeAttribute("data-act");
  const n=frag('<div class="home"></div>');
  const halo=frag('<div class="home-halo"></div>');
  // alchemical symbol
  const sym=frag('<div class="planes-diagram" style="width:120px;height:120px"><div class="ring" style="width:120px;height:120px;border-color:rgba(201,151,58,0.3);left:50%;top:50%;transform:translate(-50%,-50%)"></div><div class="ring" style="width:80px;height:80px;border-color:rgba(201,151,58,0.4);left:50%;top:50%;transform:translate(-50%,-50%)"></div><div class="ring" style="width:44px;height:44px;border-color:rgba(201,151,58,0.5);left:50%;top:50%;transform:translate(-50%,-50%)"></div><div class="core"></div></div>');
  halo.appendChild(sym);
  halo.appendChild(frag(`<h1>${L(I.STR.gameTitle_html)}</h1>`));
  halo.appendChild(frag(`<div class="home-sub">${esc(L(I.STR.gameKicker))}</div>`));
  halo.appendChild(frag(`<div class="home-author">${esc(L(I.STR.fromAuthor))}</div>`));
  n.appendChild(halo);
  n.appendChild(frag(`<p class="epigraph">${esc(L(I.STR.epigraph))}</p>`));
  n.appendChild(frag(`<div class="epigraph-src">${esc(L(I.STR.epigraphSource))}</div>`));
  n.appendChild(frag('<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>'));
  // buttons
  const acts=frag('<div style="display:flex;flex-direction:column;align-items:center;gap:0.7rem;margin-top:1.5rem"></div>');
  const saved=load();
  if(saved&&!saved.completed&&(saved.act>0||saved.scene>0||saved.bossPhase>0)){
    const lvS=getLevel();
    const resumeBtn=frag(`<button class="btn btn-primary">${esc(t("resume"))} →</button>`);
    resumeBtn.addEventListener("click",()=>{S=saved;resumeGame();});
    acts.appendChild(resumeBtn);
    const newBtn=frag(`<button class="btn btn-ghost">${esc(t("restart"))}</button>`);
    newBtn.addEventListener("click",()=>{if(confirm(t("restartConfirm"))){S=freshState();save();renderActIntro();}});
    acts.appendChild(newBtn);
  } else {
    const beginBtn=frag(`<button class="btn btn-primary">${esc(t("begin"))} →</button>`);
    beginBtn.addEventListener("click",()=>{S=freshState();save();renderActIntro();});
    acts.appendChild(beginBtn);
  }
  if(saved&&saved.completed){
    const profileBtn=frag(`<button class="btn btn-ghost">${esc(t("seeProfile"))}</button>`);
    profileBtn.addEventListener("click",()=>{S=saved;renderProfile();});
    acts.appendChild(profileBtn);
  }
  n.appendChild(acts);
  mount(n);
}

function resumeGame(){
  setActAttr();
  if(S.screen==="act-intro")renderActIntro();
  else if(S.screen==="boss-intro")renderBossIntro();
  else if(S.screen==="boss")renderBossPhase();
  else if(S.screen==="act-complete")renderActComplete();
  else if(S.screen==="profile")renderProfile();
  else renderScene();
}

/* ── ACT INTRO ── */
function renderActIntro(){
  S.screen="act-intro";S.scene=0;S.bossPhase=0;S.answered=false;S.chosenIdx=-1;
  S.actStartStats={...S.stats};
  setActAttr();save();
  const actKey=ACT_KEYS[S.act];
  const n=frag('<div class="rpg-act-intro"></div>');
  n.appendChild(frag(`<div class="rpg-act-numeral">⟐ ${esc(t("scene")!=="Trial"?"ATTO":"ACT")} ${ACT_NUMS[S.act]} ⟐</div>`));
  n.appendChild(frag(`<div class="rpg-act-title">${esc(t("act_"+actKey))}</div>`));
  n.appendChild(frag(`<div class="rpg-act-sub">${esc(t("act_"+actKey+"_sub"))}</div>`));
  n.appendChild(frag('<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>'));
  n.appendChild(frag(`<div class="rpg-act-desc">${esc(t("act_"+actKey+"_desc"))}</div>`));
  const btn=frag(`<button class="btn btn-primary" style="margin-top:2rem">${esc(t("enter"))} →</button>`);
  btn.addEventListener("click",()=>{S.screen="scene";S.answered=false;save();renderScene();});
  n.appendChild(btn);
  mount(n);
}

/* ── SCENE ── */
function renderScene(){
  S.screen="scene";setActAttr();
  const act=D.acts[S.act],sc=act.scenes[S.scene];
  const n=frag('<div class="rpg-round"></div>');
  n.appendChild(buildLevelBadge());
  n.appendChild(buildStatsPanel());
  n.appendChild(buildProgress());
  // Scene card
  const card=frag('<div class="rpg-scene"></div>');
  card.appendChild(frag(`<div class="rpg-scene-prompt">${esc(t("scene"))} ${S.scene+1} ${esc(t("of"))} ${act.scenes.length}</div>`));
  card.appendChild(frag(`<div class="rpg-scene-text">${esc(L(sc.text))}</div>`));
  // Choices
  const choicesW=frag(`<div class="rpg-choices"></div>`);
  sc.choices.forEach((ch,i)=>{
    const btn=frag(`<button class="rpg-choice">${esc(L(ch.text))}</button>`);
    btn.addEventListener("click",()=>handleChoice(i,sc,card,choicesW,n));
    choicesW.appendChild(btn);
  });
  card.appendChild(choicesW);
  // Feedback area
  card.appendChild(frag('<div class="rpg-feedback"><div class="rpg-result-text"></div><div class="rpg-stat-changes"></div><div class="rpg-teaching"></div></div>'));
  card.appendChild(frag('<div class="rpg-foot"></div>'));
  n.appendChild(card);
  mount(n);
  if(S.answered&&S.chosenIdx>=0)restoreChoice(S.chosenIdx,sc,card,choicesW,n);
}

function handleChoice(idx,sc,card,choicesW,wrap){
  if(S.answered)return;
  S.answered=true;S.chosenIdx=idx;
  const ch=sc.choices[idx];
  // Apply effects
  if(ch.effects){Object.entries(ch.effects).forEach(([k,v])=>{S.stats[k]=(S.stats[k]||0)+v;});}
  save();
  // UI
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;
    if(i===idx)b.classList.add("chosen-"+ch.type);
    else b.classList.add("dim");
  });
  showFeedback(ch,sc,card,wrap);
  // Update stats display
  updateStatsInPlace(wrap);
}

function showFeedback(ch,sc,card,wrap){
  const fb=card.querySelector(".rpg-feedback");
  fb.querySelector(".rpg-result-text").textContent=L(ch.result);
  // Stat changes
  const changesEl=fb.querySelector(".rpg-stat-changes");
  changesEl.innerHTML="";
  if(ch.effects){Object.entries(ch.effects).forEach(([k,v])=>{
    if(v===0)return;
    const cls=v>0?"positive":"negative";
    const sign=v>0?"+":"";
    changesEl.appendChild(frag(`<span class="rpg-stat-change ${cls}">${sign}${v} ${esc(t("stat_"+k))}</span>`));
  });}
  // Teaching
  fb.querySelector(".rpg-teaching").textContent=L(sc.teaching);
  fb.classList.add("show");
  // Continue button
  const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
  const act=D.acts[S.act];
  const isLast=S.scene>=act.scenes.length-1;
  const btn=frag(`<button class="btn btn-primary">${esc(t("continua"))} →</button>`);
  btn.addEventListener("click",()=>{
    if(isLast){S.answered=false;S.chosenIdx=-1;renderBossIntro();}
    else{S.scene++;S.answered=false;S.chosenIdx=-1;save();renderScene();}
  });
  foot.appendChild(btn);
}

function restoreChoice(idx,sc,card,choicesW,wrap){
  const ch=sc.choices[idx];
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;
    if(i===idx)b.classList.add("chosen-"+ch.type);
    else b.classList.add("dim");
  });
  showFeedback(ch,sc,card,wrap);
}

function updateStatsInPlace(wrap){
  const panel=wrap.querySelector(".rpg-stats");
  if(!panel)return;
  panel.querySelectorAll(".rpg-stat-fill").forEach((f,i)=>{
    const v=Math.max(0,S.stats[D.stats[i]]);
    f.style.width=Math.min(100,Math.round(v/STAT_MAX*100))+"%";
  });
  panel.querySelectorAll(".rpg-stat-val").forEach((el,i)=>{
    el.textContent=Math.max(0,S.stats[D.stats[i]]);
  });
  const lvEl=wrap.querySelector(".rpg-level");
  if(lvEl){const lv=getLevel();lvEl.innerHTML=`<span class="rpg-level-glyph">${lv.glyph}</span><span>${esc(t("level"))}: <b>${esc(t("lv_"+lv.key))}</b></span>`;}
}

/* ── BOSS INTRO ── */
function renderBossIntro(){
  S.screen="boss-intro";S.bossPhase=0;S.answered=false;setActAttr();save();
  const boss=D.acts[S.act].boss;
  const n=frag('<div class="rpg-boss-intro"></div>');
  const seals=["☾","◈","✦"];
  n.appendChild(frag(`<div class="rpg-boss-seal">${seals[S.act]||"◈"}</div>`));
  n.appendChild(frag(`<div class="rpg-act-numeral">${esc(t("bossEncounter"))}</div>`));
  n.appendChild(frag(`<div class="rpg-boss-name">${esc(L(boss.name))}</div>`));
  n.appendChild(frag(`<div class="rpg-boss-desc">${esc(L(boss.intro))}</div>`));
  const btn=frag(`<button class="btn btn-primary" style="margin-top:2rem">${esc(t("face"))} →</button>`);
  btn.addEventListener("click",()=>{S.screen="boss";S.answered=false;save();renderBossPhase();});
  n.appendChild(btn);
  mount(n);
}

/* ── BOSS PHASE ── */
function renderBossPhase(){
  S.screen="boss";setActAttr();
  const boss=D.acts[S.act].boss,ph=boss.phases[S.bossPhase];
  const n=frag('<div class="rpg-round"></div>');
  n.appendChild(buildLevelBadge());
  n.appendChild(buildStatsPanel());
  // Phase indicator
  n.appendChild(frag(`<div class="rpg-act-numeral" style="text-align:left;margin-bottom:0.6rem">${esc(L(boss.name))} — ${esc(t("bossPhase"))} ${S.bossPhase+1}/3</div>`));
  const card=frag('<div class="rpg-scene" style="border-color:var(--act-accent2,var(--danger))"></div>');
  card.appendChild(frag(`<div class="rpg-scene-text" style="border-color:var(--act-accent2,var(--danger))">${esc(L(ph.text))}</div>`));
  const choicesW=frag('<div class="rpg-choices"></div>');
  ph.choices.forEach((ch,i)=>{
    const btn=frag(`<button class="rpg-choice">${esc(L(ch.text))}</button>`);
    btn.addEventListener("click",()=>handleBossChoice(i,ph,card,choicesW,n));
    choicesW.appendChild(btn);
  });
  card.appendChild(choicesW);
  card.appendChild(frag('<div class="rpg-feedback"><div class="rpg-result-text"></div><div class="rpg-stat-changes"></div></div>'));
  card.appendChild(frag('<div class="rpg-foot"></div>'));
  n.appendChild(card);
  mount(n);
  if(S.answered&&S.chosenIdx>=0)restoreBossChoice(S.chosenIdx,ph,card,choicesW,n);
}

function handleBossChoice(idx,ph,card,choicesW,wrap){
  if(S.answered)return;
  S.answered=true;S.chosenIdx=idx;
  const ch=ph.choices[idx];
  if(ch.effects){Object.entries(ch.effects).forEach(([k,v])=>{S.stats[k]=(S.stats[k]||0)+v;});}
  save();
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;
    if(i===idx)b.classList.add("chosen-"+ch.type);
    else b.classList.add("dim");
  });
  showBossFeedback(ch,card,wrap);
  updateStatsInPlace(wrap);
}

function showBossFeedback(ch,card,wrap){
  const fb=card.querySelector(".rpg-feedback");
  fb.querySelector(".rpg-result-text").textContent=L(ch.result);
  const changesEl=fb.querySelector(".rpg-stat-changes");changesEl.innerHTML="";
  if(ch.effects){Object.entries(ch.effects).forEach(([k,v])=>{
    if(v===0)return;const cls=v>0?"positive":"negative";const sign=v>0?"+":"";
    changesEl.appendChild(frag(`<span class="rpg-stat-change ${cls}">${sign}${v} ${esc(t("stat_"+k))}</span>`));
  });}
  fb.classList.add("show");
  const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
  const isLastPhase=S.bossPhase>=2;
  const btn=frag(`<button class="btn btn-primary">${esc(t("continua"))} →</button>`);
  btn.addEventListener("click",()=>{
    if(isLastPhase){S.answered=false;S.chosenIdx=-1;renderActComplete();}
    else{S.bossPhase++;S.answered=false;S.chosenIdx=-1;save();renderBossPhase();}
  });
  foot.appendChild(btn);
}

function restoreBossChoice(idx,ph,card,choicesW,wrap){
  const ch=ph.choices[idx];
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;if(i===idx)b.classList.add("chosen-"+ch.type);else b.classList.add("dim");
  });
  showBossFeedback(ch,card,wrap);
}

/* ── ACT COMPLETE ── */
function renderActComplete(){
  S.screen="act-complete";setActAttr();save();
  const actKey=ACT_KEYS[S.act];
  const isLastAct=S.act>=2;
  const n=frag('<div class="rpg-act-intro"></div>');
  n.appendChild(frag(`<div class="rpg-act-numeral">✦ ${esc(t("actComplete")).toUpperCase()} ✦</div>`));
  n.appendChild(frag(`<div class="rpg-act-title">${esc(t("act_"+actKey))}</div>`));
  n.appendChild(frag(`<div class="rpg-act-sub">${esc(t("act_"+actKey+"_sub"))}</div>`));
  n.appendChild(frag('<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>'));
  // Stats gained this act
  if(S.actStartStats){
    const gained=frag('<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:1rem 0"></div>');
    D.stats.forEach(sk=>{
      const diff=(S.stats[sk]||0)-(S.actStartStats[sk]||0);
      if(diff!==0){const cls=diff>0?"positive":"negative";const sign=diff>0?"+":"";
      gained.appendChild(frag(`<span class="rpg-stat-change ${cls}">${sign}${diff} ${esc(t("stat_"+sk))}</span>`));}
    });
    n.appendChild(gained);
  }
  n.appendChild(buildLevelBadge());
  n.appendChild(buildStatsPanel());
  const btn=frag(`<button class="btn btn-primary" style="margin-top:1.5rem">${esc(isLastAct?t("seeProfile"):t("nextAct"))} →</button>`);
  btn.addEventListener("click",()=>{
    if(isLastAct){S.completed=true;save();try{localStorage.setItem("sc-rpg-sigillo",String(Date.now()));}catch(e){}renderProfile();}
    else{S.act++;S.scene=0;S.bossPhase=0;S.answered=false;S.chosenIdx=-1;renderActIntro();}
  });
  n.appendChild(btn);
  mount(n);
}

/* ── PROFILE ── */
function renderProfile(){
  S.screen="profile";document.documentElement.removeAttribute("data-act");save();
  const lv=getLevel(),tot=totalStat();
  const arch=getArchetype();
  const n=frag('<div class="rpg-profile"></div>');
  n.appendChild(frag(`<div class="rpg-profile-seal">${lv.glyph}</div>`));
  n.appendChild(frag(`<h2>${esc(t("yourProfile"))}</h2>`));
  n.appendChild(frag(`<div class="rpg-profile-level">${esc(t("level"))}: ${esc(t("lv_"+lv.key))} — ${tot} ${esc(t("finalScore"))}</div>`));
  n.appendChild(frag(`<div class="rpg-profile-archetype">${esc(t(arch+""))}</div>`));
  // Stats grid
  const sg=frag('<div class="rpg-profile-stats"></div>');
  D.stats.forEach(sk=>{
    const v=Math.max(0,S.stats[sk]);
    sg.appendChild(frag(`<div class="rpg-profile-stat"><span class="rpg-stat-icon ${sk}">${STAT_ICONS[sk]}</span><span class="rpg-profile-stat-val">${v}</span><span class="rpg-profile-stat-name">${esc(t("stat_"+sk))}</span></div>`));
  });
  n.appendChild(sg);
  n.appendChild(frag(`<div class="rpg-profile-desc">${esc(t(arch+"_d"))}</div>`));
  // Actions
  const acts=frag('<div class="rpg-profile-actions"></div>');
  const again=frag(`<button class="btn btn-primary">${esc(t("playAgain"))}</button>`);
  again.addEventListener("click",()=>{if(confirm(t("restartConfirm"))){S=freshState();save();renderTitle();}});
  const menu=frag(`<button class="btn btn-ghost">${esc(t("backToMenu"))}</button>`);
  menu.addEventListener("click",()=>{window.location.href="../index.html#giochi";});
  acts.appendChild(again);acts.appendChild(menu);
  n.appendChild(acts);
  mount(n);
}

function getArchetype(){
  const s=S.stats,tot=totalStat();
  if(tot<10)return"prof_dormiente";
  const vals=[s.presenza,s.volonta,s.nongiudizio,s.compassione];
  const mx=Math.max(...vals),mn=Math.min(...vals);
  if(mx-mn<=3)return"prof_completo";
  const maxStat=D.stats[vals.indexOf(mx)];
  if(maxStat==="presenza")return"prof_testimone";
  if(maxStat==="volonta")return"prof_guerriero_int";
  if(maxStat==="nongiudizio")return"prof_specchio";
  if(maxStat==="compassione")return"prof_guaritore";
  return"prof_completo";
}

/* ══════════════ CHROME — condiviso in ../giochi/game-core.js ══════════════ */
C.onLangChange=function(){
  if(S.screen==="title")renderTitle();else if(S.screen==="act-intro")renderActIntro();else if(S.screen==="scene")renderScene();else if(S.screen==="boss-intro")renderBossIntro();else if(S.screen==="boss")renderBossPhase();else if(S.screen==="act-complete")renderActComplete();else if(S.screen==="profile")renderProfile();
};
C.init(function(){
  S=load()||freshState();
  renderTitle();
});
})();
