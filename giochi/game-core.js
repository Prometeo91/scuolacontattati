/* ============================================================
   GAME CORE — utility e chrome condivisi da TUTTI gli engine
   dei giochi (engine.js, journey-engine.js, rpg-engine.js,
   adv-engine.js). Va caricato prima dell'engine.
   Un bug corretto qui è corretto per tutti i giochi.

   Uso:  const C = window.GameCore(I);   // I = oggetto i18n {STR, makeT}
         C.onLangChange = function(){ ...re-render della schermata... };
         C.init(function(){ ...primo render... });
   ============================================================ */
(function(){
"use strict";
const LS_LANG="sc-lang", LS_THEME="sctheme";

window.GameCore=function(I){
  function getLang(){return localStorage.getItem(LS_LANG)==="en"?"en":"it";}
  const t=I.makeT(getLang);
  function L(o){if(!o)return"";const l=getLang();return o[l]!=null?o[l]:o.it;}
  function frag(h){const d=document.createElement("div");d.innerHTML=h.trim();return d.firstElementChild;}
  function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
  function nl2br(s){return esc(s).replace(/\n/g,"<br>");}
  let app;
  function mount(n){app.innerHTML="";app.appendChild(n);}

  /* ── Tema ── */
  function isLight(){return document.documentElement.getAttribute("data-theme")==="light";}
  const _soleSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>';
  const _lunaSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>';
  function updateThemeBtn(){const btn=document.getElementById("themeToggle");if(!btn)return;const light=isLight();btn.querySelector(".ico").innerHTML=light?_lunaSvg:_soleSvg;btn.querySelector(".lbl").textContent=light?t("themeDark"):t("themeLight");}
  function toggleTheme(){const meta=document.getElementById("metaThemeColor");if(isLight()){document.documentElement.removeAttribute("data-theme");localStorage.setItem(LS_THEME,"dark");if(meta)meta.content="#0d0b1a";}else{document.documentElement.setAttribute("data-theme","light");localStorage.setItem(LS_THEME,"light");if(meta)meta.content="#f5f0e8";}updateThemeBtn();}

  /* ── Lingua + intestazione pagina ── */
  function updateChrome(){
    const lang=getLang();
    document.querySelectorAll(".lang-pill button").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
    document.getElementById("brandSchool").textContent=L(I.STR.school);
    const gl=document.getElementById("gamesLink");if(gl)gl.textContent=lang==="en"?"Games":"Giochi";
    const bl=document.getElementById("brandLink");if(bl)bl.setAttribute("title",L(I.STR.backToSite));
    updateThemeBtn();document.title=L(I.STR.gameTitle)+" · "+L(I.STR.school);
  }
  function setLang(lang){
    localStorage.setItem(LS_LANG,lang);document.documentElement.setAttribute("lang",lang);updateChrome();
    if(core.onLangChange)core.onLangChange();
  }

  const core={
    getLang,t,L,frag,esc,nl2br,mount,
    onLangChange:null,
    init(firstRender){
      function boot(){
        app=document.getElementById("app");
        document.documentElement.setAttribute("lang",getLang());
        document.querySelectorAll(".lang-pill button").forEach(b=>b.addEventListener("click",()=>setLang(b.dataset.lang)));
        const tt=document.getElementById("themeToggle");if(tt)tt.addEventListener("click",toggleTheme);
        updateChrome();
        firstRender();
      }
      if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot);else boot();
    }
  };
  return core;
};
})();
