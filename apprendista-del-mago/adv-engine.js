/* L'APPRENDISTA DEL MAGO — adventure engine */
(function(){
"use strict";
const D=window.ADV_DATA, I=window.ADV_I18N;
const LS_KEY="sc-adv-state",LS_LANG="sc-lang",LS_THEME="sctheme";

function getLang(){return localStorage.getItem(LS_LANG)==="en"?"en":"it";}
const t=I.makeT(getLang);
function L(o){if(!o)return"";const l=getLang();return o[l]!=null?o[l]:o.it;}
function frag(h){const d=document.createElement("div");d.innerHTML=h.trim();return d.firstElementChild;}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function nl2br(s){return esc(s).replace(/\n/g,"<br>");}
let app;
function mount(n){app.innerHTML="";app.appendChild(n);}

/* State */
function freshState(){return{sceneKey:"",history:[],karma:0,ended:false,endingKey:""};}
let S;
function save(){try{localStorage.setItem(LS_KEY,JSON.stringify(S));}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem(LS_KEY));if(s&&s.history)return s;}catch(e){}return null;}

/* ══════════ SCREENS ══════════ */

function renderTitle(){
  S=load()||freshState();
  const n=frag('<div class="home"></div>');
  const halo=frag('<div class="home-halo"></div>');
  const sym=frag('<div class="planes-diagram" style="width:120px;height:120px"><div class="ring" style="width:120px;height:120px;border-color:rgba(201,151,58,0.3);left:50%;top:50%;transform:translate(-50%,-50%)"></div><div class="ring" style="width:80px;height:80px;border-color:rgba(201,151,58,0.4);left:50%;top:50%;transform:translate(-50%,-50%)"></div><div class="core"></div></div>');
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
  if(saved&&saved.sceneKey&&!saved.ended){
    const resumeBtn=frag(`<button class="btn btn-primary">${esc(t("resume"))} →</button>`);
    resumeBtn.addEventListener("click",()=>{S=saved;renderScene(S.sceneKey);});
    acts.appendChild(resumeBtn);
    const newBtn=frag(`<button class="btn btn-ghost">${esc(t("restart"))}</button>`);
    newBtn.addEventListener("click",()=>{if(confirm(t("restartConfirm"))){S=freshState();save();renderScene("lettera");}});
    acts.appendChild(newBtn);
  } else {
    const beginBtn=frag(`<button class="btn btn-primary">${esc(t("begin"))} →</button>`);
    beginBtn.addEventListener("click",()=>{S=freshState();save();renderScene("lettera");});
    acts.appendChild(beginBtn);
  }
  if(saved&&saved.ended){
    const seeBtn=frag(`<button class="btn btn-ghost">${esc(t("yourEnding"))}</button>`);
    seeBtn.addEventListener("click",()=>{S=saved;renderEnding(S.endingKey);});
    acts.appendChild(seeBtn);
  }
  n.appendChild(acts);
  mount(n);
}

function renderScene(key){
  const sc=D.scenes[key];
  if(!sc){renderTitle();return;}
  S.sceneKey=key;
  if(!S.ended)save();
  const isEnding=!!sc.ending;
  const n=frag('<div class="rpg-round"></div>');
  // Chapter badge
  if(sc.chapter){
    n.appendChild(frag(`<div class="rpg-act-numeral" style="text-align:center;margin-bottom:0.3rem">${esc(t("chapter"))} ${sc.chapter}</div>`));
  }
  n.appendChild(frag(`<div class="rpg-act-title" style="text-align:center;font-size:clamp(22px,5vw,34px);margin-bottom:1.5rem">${esc(L(sc.title))}</div>`));
  // Scene card
  const card=frag('<div class="rpg-scene"></div>');
  card.appendChild(frag(`<div class="rpg-scene-text" style="border-left-color:var(--gold)">${nl2br(L(sc.text))}</div>`));
  if(sc.choices&&sc.choices.length>0){
    const choicesW=frag('<div class="rpg-choices"></div>');
    sc.choices.forEach((ch,i)=>{
      const btn=frag(`<button class="rpg-choice">${esc(L(ch.text))}</button>`);
      btn.addEventListener("click",()=>{
        S.history.push({scene:key,choice:i,karma:ch.karma||0});
        S.karma+=(ch.karma||0);
        // Disable buttons
        choicesW.querySelectorAll(".rpg-choice").forEach((b,j)=>{
          b.disabled=true;
          if(j===i)b.classList.add(ch.karma>0?"chosen-conscious":ch.karma<0?"chosen-mechanical":"chosen-neutral");
          else b.classList.add("dim");
        });
        // Show continue
        const foot=frag('<div class="rpg-foot" style="margin-top:1.2rem"></div>');
        const nextScene=D.scenes[ch.next];
        const contBtn=frag(`<button class="btn btn-primary">${esc(t("continua"))} →</button>`);
        contBtn.addEventListener("click",()=>{
          if(nextScene&&nextScene.ending){
            S.ended=true;S.endingKey=nextScene.ending;save();try{localStorage.setItem("sc-adv-sigillo",String(Date.now()));}catch(e){}
            renderScene(ch.next);
          } else {
            renderScene(ch.next);
          }
        });
        foot.appendChild(contBtn);
        card.appendChild(foot);
        save();
      });
      choicesW.appendChild(btn);
    });
    card.appendChild(choicesW);
  } else {
    // Ending scene
    S.ended=true;S.endingKey=sc.ending;save();try{localStorage.setItem("sc-adv-sigillo",String(Date.now()));}catch(e){}
    const foot=frag('<div class="rpg-foot" style="margin-top:1.2rem;flex-wrap:wrap;justify-content:center"></div>');
    const seeBtn=frag(`<button class="btn btn-primary">${esc(t("yourEnding"))} →</button>`);
    seeBtn.addEventListener("click",()=>renderEnding(sc.ending));
    foot.appendChild(seeBtn);
    card.appendChild(foot);
  }
  n.appendChild(card);
  mount(n);
  window.scrollTo({top:0,behavior:"smooth"});
}

function renderEnding(endingKey){
  const endData=D.endings[endingKey]||{glyph:"?",score:0};
  const n=frag('<div class="rpg-profile"></div>');
  n.appendChild(frag(`<div class="rpg-profile-seal">${endData.glyph}</div>`));
  n.appendChild(frag(`<h2>${esc(t("ending"))}</h2>`));
  n.appendChild(frag(`<div class="rpg-profile-archetype" style="margin-top:1rem">${esc(t("end_"+endingKey))}</div>`));
  n.appendChild(frag(`<div class="rpg-profile-desc" style="white-space:pre-line">${esc(t("end_"+endingKey+"_d"))}</div>`));
  // Stats
  const statsW=frag('<div style="display:flex;gap:12px;justify-content:center;margin:1.2rem 0;flex-wrap:wrap"></div>');
  statsW.appendChild(frag(`<div class="rpg-profile-stat"><span class="rpg-profile-stat-val">${S.history.length}</span><span class="rpg-profile-stat-name">${getLang()==="en"?"Choices made":"Scelte fatte"}</span></div>`));
  statsW.appendChild(frag(`<div class="rpg-profile-stat"><span class="rpg-profile-stat-val">${S.karma}</span><span class="rpg-profile-stat-name">Karma</span></div>`));
  const maxChapter=S.history.reduce((m,h)=>{const sc=D.scenes[h.scene];return sc&&sc.chapter>m?sc.chapter:m;},1);
  statsW.appendChild(frag(`<div class="rpg-profile-stat"><span class="rpg-profile-stat-val">${maxChapter}/7</span><span class="rpg-profile-stat-name">${getLang()==="en"?"Chapters":"Capitoli"}</span></div>`));
  n.appendChild(statsW);
  // Actions
  const acts=frag('<div class="rpg-profile-actions"></div>');
  const again=frag(`<button class="btn btn-primary">${esc(t("playAgain"))}</button>`);
  again.addEventListener("click",()=>{S=freshState();save();renderScene("lettera");});
  const menu=frag(`<button class="btn btn-ghost">${esc(t("backToMenu"))}</button>`);
  menu.addEventListener("click",()=>{window.location.href="../index.html#giochi";});
  acts.appendChild(again);acts.appendChild(menu);
  n.appendChild(acts);
  mount(n);
  window.scrollTo({top:0,behavior:"smooth"});
}

/* ══════════ CHROME ══════════ */
function setLang(lang){localStorage.setItem(LS_LANG,lang);document.documentElement.setAttribute("lang",lang);updateChrome();
  if(S.ended)renderEnding(S.endingKey);else if(S.sceneKey)renderScene(S.sceneKey);else renderTitle();
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
