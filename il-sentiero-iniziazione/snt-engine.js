/* IL SENTIERO DELL'INIZIAZIONE — journey engine */
(function(){
"use strict";
const D=window.DUNGEON_DATA, I=window.DNG_I18N;
const LS_KEY="sc-sentiero-state",LS_LANG="sc-lang",LS_THEME="sctheme";

function getLang(){return localStorage.getItem(LS_LANG)==="en"?"en":"it";}
const t=I.makeT(getLang);
function L(o){if(!o)return"";const l=getLang();return o[l]!=null?o[l]:o.it;}
function frag(h){const d=document.createElement("div");d.innerHTML=h.trim();return d.firstElementChild;}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function nl2br(s){return esc(s).replace(/\n/g,"<br>");}
let app;
function mount(n){app.innerHTML="";app.appendChild(n);}

/* State */
function freshState(){return{plane:0,room:0,inGuardian:false,luce:D.startLuce,answered:false,chosenIdx:-1,ended:false,endingKey:""};}
let S;
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(S));}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem(LS_KEY));if(s&&typeof s.luce==="number")return s;}catch(e){}return null;}

/* Luce bar */
function luceBar(){
  const pct=Math.round(Math.max(0,S.luce)/D.maxLuce*100);
  return frag(`<div style="display:flex;align-items:center;gap:10px;margin-bottom:1rem">
    <span style="font-size:13px;color:var(--gold);letter-spacing:0.06em;font-variant-caps:all-small-caps;min-width:40px">${esc(t("luce"))}</span>
    <div style="flex:1;height:8px;border-radius:4px;background:var(--surface);border:0.5px solid var(--border);overflow:hidden">
      <div class="luce-fill" style="height:100%;border-radius:4px;background:linear-gradient(90deg,#c9973a,#e8c97a);transition:width 0.6s ease;width:${pct}%"></div>
    </div>
    <span style="font-size:14px;color:var(--gold-light);font-weight:600;min-width:30px;text-align:right;font-variant-numeric:tabular-nums">${Math.max(0,S.luce)}/${D.maxLuce}</span>
  </div>`);
}

/* Plane indicator */
function planeIndicator(){
  const w=frag('<div style="display:flex;align-items:center;gap:6px;margin-bottom:0.8rem;flex-wrap:wrap"></div>');
  D.planes.forEach((p,i)=>{
    const cls=i<S.plane?"done":i===S.plane?"current":"";
    const dot=frag(`<div style="width:${i===S.plane?'32px':'24px'};height:${i===S.plane?'32px':'24px'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${i===S.plane?'14px':'11px'};border:1px solid ${i<=S.plane?p.color:'var(--border)'};background:${i<S.plane?p.color+'22':'transparent'};color:${i<=S.plane?p.color:'var(--text-muted)'};transition:all 0.3s;${i===S.plane?'box-shadow:0 0 10px '+p.color+'44;':''}">${p.glyph}</div>`);
    w.appendChild(dot);
    if(i<D.planes.length-1)w.appendChild(frag('<div style="flex:0 0 1px;width:8px;height:1px;background:var(--border)"></div>'));
  });
  return w;
}

/* ══════════ SCREENS ══════════ */

function renderTitle(){
  S=load()||freshState();
  const n=frag('<div class="home"></div>');
  const halo=frag('<div class="home-halo"></div>');
  // 7-layer symbol
  const sym=frag('<div class="planes-diagram" style="width:130px;height:130px"></div>');
  const sizes=[130,110,92,76,62,48,36];
  const colors=D.planes.map(p=>p.color);
  sizes.forEach((s,i)=>{
    sym.appendChild(frag(`<div class="ring" style="width:${s}px;height:${s}px;border-color:${colors[i]||'rgba(201,151,58,0.3)'};opacity:0.5;left:50%;top:50%;transform:translate(-50%,-50%)"></div>`));
  });
  sym.appendChild(frag('<div class="core"></div>'));
  halo.appendChild(sym);
  halo.appendChild(frag(`<h1>${L(I.STR.gameTitle_html)}</h1>`));
  halo.appendChild(frag(`<div class="home-sub">${esc(L(I.STR.gameKicker))}</div>`));
  halo.appendChild(frag(`<div class="home-author">${esc(L(I.STR.fromAuthor))}</div>`));
  n.appendChild(halo);
  n.appendChild(frag(`<p class="epigraph">${esc(L(I.STR.epigraph))}</p>`));
  n.appendChild(frag(`<div class="epigraph-src">${esc(L(I.STR.epigraphSource))}</div>`));
  n.appendChild(frag('<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>'));
  const acts=frag('<div style="display:flex;flex-direction:column;align-items:center;gap:0.7rem;margin-top:1.5rem"></div>');
  const saved=load();
  if(saved&&!saved.ended&&(saved.plane>0||saved.room>0)){
    const resumeBtn=frag(`<button class="btn btn-primary">${esc(t("resume"))} →</button>`);
    resumeBtn.addEventListener("click",()=>{S=saved;resumeGame();});
    acts.appendChild(resumeBtn);
    const newBtn=frag(`<button class="btn btn-ghost">${esc(t("restart"))}</button>`);
    newBtn.addEventListener("click",()=>{if(confirm(t("restartConfirm"))){S=freshState();save();renderPlaneIntro();}});
    acts.appendChild(newBtn);
  } else {
    const beginBtn=frag(`<button class="btn btn-primary">${esc(t("begin"))} →</button>`);
    beginBtn.addEventListener("click",()=>{S=freshState();save();renderPlaneIntro();});
    acts.appendChild(beginBtn);
  }
  if(saved&&saved.ended){
    const seeBtn=frag(`<button class="btn btn-ghost">${esc(t("yourDestiny"))}</button>`);
    seeBtn.addEventListener("click",()=>{S=saved;renderEnding();});
    acts.appendChild(seeBtn);
  }
  n.appendChild(acts);
  mount(n);
}

function resumeGame(){
  if(S.ended){renderEnding();return;}
  if(S.inGuardian){renderGuardian();return;}
  renderRoom();
}

/* Plane intro */
function renderPlaneIntro(){
  if(S.plane>=D.planes.length){S.ended=true;save();renderEnding();return;}
  const p=D.planes[S.plane];
  S.room=0;S.inGuardian=false;S.answered=false;S.chosenIdx=-1;save();
  document.documentElement.style.setProperty("--plane-color",p.color);
  const n=frag('<div class="rpg-act-intro"></div>');
  n.appendChild(planeIndicator());
  n.appendChild(frag(`<div class="rpg-act-numeral" style="color:${p.color}">⟐ ${esc(t("plane"))} ${S.plane+1}/${D.planes.length} ⟐</div>`));
  n.appendChild(frag(`<div class="rpg-act-title" style="font-size:clamp(28px,6vw,44px)">${p.glyph} ${esc(L(p.title))}</div>`));
  n.appendChild(frag(`<div class="rpg-act-sub" style="color:${p.color}">${esc(L(p.subtitle))}</div>`));
  n.appendChild(frag('<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>'));
  n.appendChild(frag(`<div class="rpg-act-desc">${esc(L(p.intro))}</div>`));
  n.appendChild(luceBar());
  const btn=frag(`<button class="btn btn-primary" style="margin-top:1.5rem">${esc(t("enter"))} →</button>`);
  btn.addEventListener("click",()=>{renderRoom();});
  n.appendChild(btn);
  mount(n);
}

/* Room */
function renderRoom(){
  const p=D.planes[S.plane];
  if(!p||S.room>=p.rooms.length){S.inGuardian=true;save();if(p.guardian)renderGuardian();else{S.plane++;renderPlaneIntro();}return;}
  const rm=p.rooms[S.room];
  S.answered=false;S.chosenIdx=-1;S.inGuardian=false;save();
  const n=frag('<div class="rpg-round"></div>');
  n.appendChild(planeIndicator());
  n.appendChild(luceBar());
  n.appendChild(frag(`<div class="rpg-act-numeral" style="text-align:left;color:${p.color}">${esc(L(p.title))} — ${esc(t("room"))} ${S.room+1}/${p.rooms.length}</div>`));
  const card=frag('<div class="rpg-scene"></div>');
  card.appendChild(frag(`<div class="rpg-scene-text" style="border-left-color:${p.color}">${nl2br(L(rm.text))}</div>`));
  const choicesW=frag('<div class="rpg-choices"></div>');
  rm.choices.forEach((ch,i)=>{
    const btn=frag(`<button class="rpg-choice">${esc(L(ch.text))}</button>`);
    btn.addEventListener("click",()=>handleRoomChoice(i,rm,card,choicesW,n,p));
    choicesW.appendChild(btn);
  });
  card.appendChild(choicesW);
  card.appendChild(frag('<div class="rpg-feedback"><div class="rpg-result-text"></div><div class="rpg-stat-changes"></div></div>'));
  card.appendChild(frag('<div class="rpg-foot"></div>'));
  n.appendChild(card);
  mount(n);
}

function handleRoomChoice(idx,rm,card,choicesW,wrap,p){
  const ch=rm.choices[idx];
  S.luce=Math.min(D.maxLuce,Math.max(0,S.luce+(ch.luce||0)));
  S.answered=true;S.chosenIdx=idx;save();
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;
    if(i===idx)b.classList.add("chosen-"+ch.type);
    else b.classList.add("dim");
  });
  const fb=card.querySelector(".rpg-feedback");
  fb.querySelector(".rpg-result-text").textContent=L(ch.result);
  const changesEl=fb.querySelector(".rpg-stat-changes");changesEl.innerHTML="";
  if(ch.luce!==0){
    const cls=ch.luce>0?"positive":"negative";const sign=ch.luce>0?"+":"";
    changesEl.appendChild(frag(`<span class="rpg-stat-change ${cls}">${sign}${ch.luce} ${esc(t("luce"))}</span>`));
  }
  fb.classList.add("show");
  // Update luce bar
  const luceEl=wrap.querySelector(".luce-fill");
  if(luceEl)luceEl.style.width=Math.round(Math.max(0,S.luce)/D.maxLuce*100)+"%";
  const luceVal=wrap.querySelector("[style*='tabular-nums']");
  // Check game over
  if(S.luce<=0){
    S.ended=true;S.endingKey="gameOver";save();
    const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
    const btn=frag(`<button class="btn btn-primary">${esc(t("ending"))} →</button>`);
    btn.addEventListener("click",()=>renderEnding());
    foot.appendChild(btn);
    return;
  }
  const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
  const btn=frag(`<button class="btn btn-primary">${esc(t("continua"))} →</button>`);
  btn.addEventListener("click",()=>{S.room++;renderRoom();});
  foot.appendChild(btn);
}

/* Guardian */
function renderGuardian(){
  const p=D.planes[S.plane];
  if(!p||!p.guardian){S.plane++;renderPlaneIntro();return;}
  const g=p.guardian;
  S.inGuardian=true;S.answered=false;save();
  const n=frag('<div class="rpg-round"></div>');
  n.appendChild(planeIndicator());
  n.appendChild(luceBar());
  n.appendChild(frag(`<div class="rpg-act-numeral" style="text-align:center;color:${p.color}">⚔ ${esc(t("guardian"))} ⚔</div>`));
  n.appendChild(frag(`<div class="rpg-boss-name" style="text-align:center;font-size:clamp(20px,4vw,30px);margin-bottom:1rem">${esc(L(g.name))}</div>`));
  const card=frag('<div class="rpg-scene" style="border-color:'+p.color+'"></div>');
  card.appendChild(frag(`<div class="rpg-scene-text" style="border-left-color:${p.color}">${nl2br(L(g.text))}</div>`));
  const choicesW=frag('<div class="rpg-choices"></div>');
  g.choices.forEach((ch,i)=>{
    const btn=frag(`<button class="rpg-choice">${esc(L(ch.text))}</button>`);
    btn.addEventListener("click",()=>handleGuardianChoice(i,g,card,choicesW,n,p));
    choicesW.appendChild(btn);
  });
  card.appendChild(choicesW);
  card.appendChild(frag('<div class="rpg-feedback"><div class="rpg-result-text"></div><div class="rpg-stat-changes"></div></div>'));
  card.appendChild(frag('<div class="rpg-foot"></div>'));
  n.appendChild(card);
  mount(n);
}

function handleGuardianChoice(idx,g,card,choicesW,wrap,p){
  const ch=g.choices[idx];
  S.luce=Math.min(D.maxLuce,Math.max(0,S.luce+(ch.luce||0)));
  S.answered=true;S.chosenIdx=idx;save();
  choicesW.querySelectorAll(".rpg-choice").forEach((b,i)=>{
    b.disabled=true;
    if(i===idx)b.classList.add("chosen-"+ch.type);
    else b.classList.add("dim");
  });
  const fb=card.querySelector(".rpg-feedback");
  fb.querySelector(".rpg-result-text").textContent=L(ch.result);
  const changesEl=fb.querySelector(".rpg-stat-changes");changesEl.innerHTML="";
  if(ch.luce!==0){
    const cls=ch.luce>0?"positive":"negative";const sign=ch.luce>0?"+":"";
    changesEl.appendChild(frag(`<span class="rpg-stat-change ${cls}">${sign}${ch.luce} ${esc(t("luce"))}</span>`));
  }
  fb.classList.add("show");
  const luceEl=wrap.querySelector(".luce-fill");
  if(luceEl)luceEl.style.width=Math.round(Math.max(0,S.luce)/D.maxLuce*100)+"%";
  if(S.luce<=0){
    S.ended=true;S.endingKey="gameOver";save();
    const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
    const btn=frag(`<button class="btn btn-primary">${esc(t("ending"))} →</button>`);
    btn.addEventListener("click",()=>renderEnding());
    foot.appendChild(btn);
    return;
  }
  const foot=card.querySelector(".rpg-foot");foot.innerHTML="";
  const isLast=S.plane>=D.planes.length-1;
  const btn=frag(`<button class="btn btn-primary">${esc(isLast?t("ending"):t("ascend"))} →</button>`);
  btn.addEventListener("click",()=>{S.plane++;renderPlaneIntro();});
  foot.appendChild(btn);
}

/* Ending */
function renderEnding(){
  S.ended=true;save();
  const isGameOver=S.luce<=0;
  const endKey=isGameOver?"gameOver":S.luce>=D.maxLuce?"perfetto":S.luce>=10?"alto":S.luce>=6?"medio":"basso";
  const glyphs={gameOver:"☾",basso:"△",medio:"◇",alto:"☉",perfetto:"✦"};
  const n=frag('<div class="rpg-profile"></div>');
  n.appendChild(frag(`<div class="rpg-profile-seal" style="${isGameOver?'border-color:var(--text-muted);color:var(--text-muted)':''}">${glyphs[endKey]||"?"}</div>`));
  if(isGameOver){
    n.appendChild(frag(`<h2>${esc(t("gameOver"))}</h2>`));
    n.appendChild(frag(`<div class="rpg-profile-desc">${esc(t("gameOverText"))}</div>`));
  } else {
    try{localStorage.setItem("sc-sentiero-sigillo",String(Date.now()));}catch(e){}
    n.appendChild(frag(`<h2>${esc(t("victory"))}</h2>`));
    n.appendChild(frag(`<div class="rpg-profile-level">${esc(t("luce"))}: ${S.luce}/${D.maxLuce} — ${esc(t("plane"))} ${Math.min(S.plane+1,D.planes.length)}/${D.planes.length}</div>`));
    n.appendChild(frag(`<div class="rpg-profile-archetype">${esc(t("end_"+endKey))}</div>`));
    n.appendChild(frag(`<div class="rpg-profile-desc" style="white-space:pre-line">${esc(t("end_"+endKey+"_d"))}</div>`));
  }
  const acts=frag('<div class="rpg-profile-actions"></div>');
  const again=frag(`<button class="btn btn-primary">${esc(t("playAgain"))}</button>`);
  again.addEventListener("click",()=>{S=freshState();save();renderTitle();});
  const menu=frag(`<button class="btn btn-ghost">${esc(t("backToMenu"))}</button>`);
  menu.addEventListener("click",()=>{window.location.href="../index.html#giochi";});
  acts.appendChild(again);acts.appendChild(menu);
  n.appendChild(acts);
  mount(n);
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ══════════ CHROME ══════════ */
function setLang(lang){localStorage.setItem(LS_LANG,lang);document.documentElement.setAttribute("lang",lang);updateChrome();
  if(S.ended)renderEnding();else if(S.plane>0||S.room>0||S.inGuardian)resumeGame();else renderTitle();
}
function isLight(){return document.documentElement.getAttribute("data-theme")==="light";}
var _soleSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>';
var _lunaSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>';
function updateThemeBtn(){const btn=document.getElementById("themeToggle");if(!btn)return;const light=isLight();btn.querySelector(".ico").innerHTML=light?_lunaSvg:_soleSvg;btn.querySelector(".lbl").textContent=light?t("themeDark"):t("themeLight");}
function toggleTheme(){const meta=document.getElementById("metaThemeColor");if(isLight()){document.documentElement.removeAttribute("data-theme");localStorage.setItem(LS_THEME,"dark");if(meta)meta.content="#0d0b1a";}else{document.documentElement.setAttribute("data-theme","light");localStorage.setItem(LS_THEME,"light");if(meta)meta.content="#f5f0e8";}updateThemeBtn();}
function updateChrome(){
  const lang=getLang();
  document.querySelectorAll(".lang-pill button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  document.getElementById("brandSchool").textContent=L(I.STR.school);
  const gl=document.getElementById("gamesLink");if(gl)gl.textContent=lang==="en"?"Games":"Giochi";
  const bl=document.getElementById("brandLink");if(bl)bl.setAttribute("title",L(I.STR.backToSite));
  updateThemeBtn();document.title=L(I.STR.gameTitle)+" · "+L(I.STR.school);
}
function init(){
  app=document.getElementById("app");
  document.documentElement.setAttribute("lang",getLang());
  document.querySelectorAll(".lang-pill button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
  const tt=document.getElementById("themeToggle");if(tt)tt.addEventListener("click",toggleTheme);
  updateChrome();
  S=load()||freshState();
  renderTitle();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
