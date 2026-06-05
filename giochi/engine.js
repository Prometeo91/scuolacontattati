/* ============================================================
   MOTORE UNIVERSALE — giochi iniziatici (vanilla JS)
   Legge GAME_DATA e GAME_I18N da window.
   Supporta: classify (2/3/4 opzioni fisse), scenario (come classify
   ma con .sit invece di .item), quiz (4 opzioni shuffle), memory.
   ============================================================ */
(function () {
  "use strict";
  const D = window.GAME_DATA, I = window.GAME_I18N;
  const LS_LANG = "sc-lang", LS_THEME = "sctheme";
  const LS_BEST = "sc-" + D.id + "-best", LS_SEEN = "sc-" + D.id + "-seen";

  function getLang() { return localStorage.getItem(LS_LANG) === "en" ? "en" : "it"; }
  const t = I.makeT(getLang);
  function L(obj) { if (!obj) return ""; const l = getLang(); return obj[l] != null ? obj[l] : obj.it; }

  function loadJ(k) { try { return JSON.parse(localStorage.getItem(k)) || {}; } catch(e) { return {}; } }
  function saveJ(k,o) { try { localStorage.setItem(k, JSON.stringify(o)); } catch(e) {} }

  let app, currentScreen;
  function shuffle(a) { const b=a.slice(); for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];} return b; }
  function pickN(a,n) { return shuffle(a).slice(0,n); }
  function esc(s) { return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
  function letter(i) { return String.fromCharCode(65+i); }
  function mount(node) { app.innerHTML=""; app.appendChild(node); }
  function frag(h) { const d=document.createElement("div"); d.innerHTML=h.trim(); return d.firstElementChild; }

  /* ============ HOME ============ */
  function renderHome() {
    currentScreen = renderHome;
    const best=loadJ(LS_BEST), seen=loadJ(LS_SEEN);
    const pct = Math.round((D.modes.filter(m=>seen[m]).length/D.modes.length)*100);
    const node = frag(`<div class="home"></div>`);
    // Halo
    const halo = frag(`<div class="home-halo"></div>`);
    halo.appendChild(buildRings());
    halo.appendChild(frag(`<h1>${L(I.STR.gameTitle_html) || esc(L(I.STR.gameTitle))}</h1>`));
    halo.appendChild(frag(`<div class="home-sub">${esc(L(I.STR.gameKicker))}</div>`));
    halo.appendChild(frag(`<div class="home-author">${esc(L(I.STR.fromAuthor))}</div>`));
    node.appendChild(halo);
    node.appendChild(frag(`<p class="epigraph">${esc(L(I.STR.epigraph))}</p>`));
    node.appendChild(frag(`<div class="epigraph-src">${esc(L(I.STR.epigraphSource))}</div>`));
    node.appendChild(frag(`<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>`));
    node.appendChild(frag(`<div class="eyebrow">${esc(t("chooseMode"))}</div>`));
    // Mode cards
    const grid = frag(`<div class="modes"></div>`);
    D.modes.forEach(m => {
      const md = D.modeDefs[m], title = L(I.STR["mode_"+m+"_t"]), desc = L(I.STR["mode_"+m+"_d"]);
      let meta;
      if (md.type==="memory") meta = best[m]!=null ? `${t("bestScore")}: ${best[m]} ${L(I.STR.moves).toLowerCase()}` : t("notYetPlayed");
      else meta = best[m]!=null ? `${t("bestScore")}: ${best[m]} ${t("points")}` : t("notYetPlayed");
      const card = frag(`<button class="mode-card" data-mode="${m}"><div class="mode-head"><span class="mode-roman">${md.roman}</span><span class="mode-glyph" aria-hidden="true">${md.glyph}</span><span class="mode-title">${esc(title)}</span></div><div class="mode-desc">${esc(desc)}</div><div class="mode-meta"><span>${esc(meta)}</span></div></button>`);
      card.addEventListener("click", ()=>startMode(m));
      grid.appendChild(card);
    });
    node.appendChild(grid);
    // Progress
    const init = frag(`<div class="initiation"><div class="initiation-label"><span>${esc(t("initiationProgress"))}</span><b>${pct}%</b></div><div class="bar"><i></i></div><button class="reset-btn">${esc(t("resetProgress"))}</button></div>`);
    node.appendChild(init);
    mount(node);
    requestAnimationFrame(()=>{ const b=node.querySelector(".bar i"); if(b) b.style.width=pct+"%"; });
    init.querySelector(".reset-btn").addEventListener("click",()=>{ if(confirm(t("resetConfirm"))){ localStorage.removeItem(LS_BEST); localStorage.removeItem(LS_SEEN); renderHome(); }});
  }

  function buildRings() {
    const wrap = frag(`<div class="planes-diagram" role="img"></div>`);
    [132,104,76,50].forEach((s,i)=>{ if(!D.rings[i]) return; const r=document.createElement("div"); r.className="ring"; r.style.width=s+"px"; r.style.height=s+"px"; r.style.borderColor=D.rings[i].ring; r.style.background="radial-gradient(circle at 38% 34%,"+D.rings[i].color+"cc,transparent 72%)"; wrap.appendChild(r); });
    wrap.appendChild(frag(`<div class="core"></div>`));
    return wrap;
  }

  /* ============ BUILD ITEMS ============ */
  function buildItems(modeKey) {
    const md = D.modeDefs[modeKey];
    if (md.type === "classify" || md.type === "scenario") {
      const items = shuffle(md.items);
      return items.map(p => {
        const isSit = md.type === "scenario";
        return {
          kind: modeKey,
          media: () => isSit ? frag(`<div class="q-desc">${esc(L(p.sit))}</div>`) : frag(`<div class="persona-item">${esc(L(p.item))}</div>`),
          prompt: () => L(I.STR[modeKey+"Prompt"]),
          options: md.optionKeys.map((ok,i) => ({
            it: I.STR[modeKey+"_opt"+i].it, en: I.STR[modeKey+"_opt"+i].en,
            correct: (p.correct !== undefined ? p.correct === i : p.belongs === i)
          })),
          recap: p.note ? { it: p.note.it, en: p.note.en } : { it: "", en: "" }
        };
      });
    }
    if (md.type === "quiz") {
      return pickN(md.items, md.count || 10).map(q => ({
        kind: modeKey, media: ()=>null, prompt: ()=>L(q.q),
        options: shuffle(q.options.it.map((_,k)=>({ it:q.options.it[k], en:q.options.en[k], correct:k===q.correct }))),
        recap: { it: q.note.it, en: q.note.en }
      }));
    }
    return [];
  }

  /* ============ ROUND ============ */
  let R = null;
  function startMode(mode) {
    const md = D.modeDefs[mode];
    if (md.type === "memory") { startMemory(mode); return; }
    const items = buildItems(mode);
    R = { mode, items, idx:0, score:0, streak:0, maxStreak:0, correctCount:0, answered:false, missed:[], pipStates:items.map(()=>"") };
    renderRound();
  }

  function renderRound() {
    currentScreen = renderRound;
    if(!R){ renderHome(); return; }
    const it=R.items[R.idx], total=R.items.length;
    const node = frag(`<div class="round"></div>`);
    node.appendChild(backButton());
    node.appendChild(frag(`<div class="round-head"><div class="round-title">${esc(L(I.STR["mode_"+R.mode+"_t"]))}</div><div class="round-stats"><span class="stat-chip">${esc(t("score"))} <b>${R.score}</b></span><span class="stat-chip streak${R.streak>=3?" hot":""}">${esc(t("streak"))} <b>${R.streak}</b></span></div></div>`));
    const pips = frag(`<div class="pips"></div>`);
    R.pipStates.forEach((st,i)=>{ let cls="pip"; if(st==="ok") cls+=" done"; else if(st==="no") cls+=" wrong"; else if(i===R.idx) cls+=" current"; pips.appendChild(frag(`<div class="${cls}"></div>`)); });
    node.appendChild(pips);
    const card = frag(`<div class="qcard"></div>`);
    const media=it.media(); if(media) card.appendChild(media);
    card.appendChild(frag(`<div class="q-context">${esc(t("question"))} ${R.idx+1} ${esc(t("of"))} ${total}</div>`));
    card.appendChild(frag(`<div class="q-prompt">${esc(it.prompt())}</div>`));
    const optsWrap = frag(`<div class="options"></div>`);
    it.options.forEach((o,i)=>{ const b=frag(`<button class="option" data-i="${i}"><span class="marker">${letter(i)}</span><span class="otext">${esc(L(o))}</span></button>`); b.addEventListener("click",()=>answer(i,card,optsWrap,node,it)); optsWrap.appendChild(b); });
    card.appendChild(optsWrap);
    card.appendChild(frag(`<div class="feedback"><div class="feedback-verdict"></div><div class="feedback-note"></div></div>`));
    card.appendChild(frag(`<div class="round-foot"></div>`));
    node.appendChild(card); mount(node);
    if(R.answered) restoreAnswered(card,optsWrap,it);
  }

  function answer(i,card,optsWrap,node,it) {
    if(R.answered) return; R.answered=true;
    const correct=!!it.options[i].correct;
    optsWrap.querySelectorAll(".option").forEach((b,k)=>{ b.disabled=true; if(it.options[k].correct) b.classList.add("correct"); else if(k===i) b.classList.add("wrong"); else b.classList.add("dim"); });
    if(correct){ R.streak++; R.maxStreak=Math.max(R.maxStreak,R.streak); R.score+=100+Math.min(R.streak-1,5)*20; R.correctCount++; R.pipStates[R.idx]="ok"; } else { R.streak=0; R.pipStates[R.idx]="no"; R.missed.push(it); }
    node.querySelector(".round-stats").innerHTML=`<span class="stat-chip">${esc(t("score"))} <b>${R.score}</b></span><span class="stat-chip streak${R.streak>=3?" hot":""}">${esc(t("streak"))} <b>${R.streak}</b></span>`;
    const pipEls=node.querySelectorAll(".pip"); if(pipEls[R.idx]) pipEls[R.idx].className="pip "+(correct?"done":"wrong");
    showFeedback(card,correct,it);
  }

  function showFeedback(card,correct,it) {
    const fb=card.querySelector(".feedback");
    fb.querySelector(".feedback-verdict").className="feedback-verdict "+(correct?"ok":"no");
    fb.querySelector(".feedback-verdict").innerHTML=(correct?"✦ ":"○ ")+esc(correct?t("correct"):t("wrong"));
    fb.querySelector(".feedback-note").innerHTML=L(it.recap); fb.classList.add("show");
    const foot=card.querySelector(".round-foot"); foot.innerHTML="";
    const last=R.idx>=R.items.length-1;
    const btn=frag(`<button class="btn btn-primary">${esc(last?t("seeResults"):t("next"))} →</button>`);
    btn.addEventListener("click",nextQuestion); foot.appendChild(btn);
  }

  function restoreAnswered(card,optsWrap,it){ optsWrap.querySelectorAll(".option").forEach((b,k)=>{ b.disabled=true; if(it.options[k].correct) b.classList.add("correct"); else b.classList.add("dim"); }); showFeedback(card,R.pipStates[R.idx]==="ok",it); }
  function nextQuestion(){ if(R.idx>=R.items.length-1){ finishRound(); return; } R.idx++; R.answered=false; renderRound(); }

  function finishRound() {
    const best=loadJ(LS_BEST), seen=loadJ(LS_SEEN); seen[R.mode]=true; saveJ(LS_SEEN,seen);
    let isRecord=false; if(best[R.mode]==null||R.score>best[R.mode]){ best[R.mode]=R.score; isRecord=R.score>0; saveJ(LS_BEST,best); }
    renderResult({ mode:R.mode, score:R.score, correct:R.correctCount, total:R.items.length, isRecord, missed:R.missed.slice() });
  }

  /* ============ RESULT ============ */
  function renderResult(res) {
    const pct=res.total?res.correct/res.total:0;
    let tierKey="resultLow",seal="☾";
    if(pct>=1){tierKey="resultPerfect";seal="✦";}else if(pct>=0.7){tierKey="resultGood";seal="☉";}else if(pct>=0.4){tierKey="resultMid";seal="△";}
    currentScreen=()=>renderResult(res);
    const node=frag(`<div class="result"></div>`);
    node.appendChild(frag(`<div class="result-seal">${seal}</div>`));
    node.appendChild(frag(`<h2>${esc(t(tierKey))}</h2>`));
    if(res.mode&&D.modeDefs[res.mode]&&D.modeDefs[res.mode].type==="memory") node.appendChild(frag(`<div class="result-score">${res.moves}<small>${esc(t("moves"))}</small></div>`));
    else { node.appendChild(frag(`<div class="result-score">${res.score}<small>${esc(t("points"))}</small></div>`)); node.appendChild(frag(`<div class="result-meta">${esc(t("accuracy"))}: <b>${res.correct}/${res.total}</b></div>`)); }
    if(res.isRecord) node.appendChild(frag(`<div class="result-record">✦ ${esc(t("newRecord"))}</div>`));
    if(res.missed&&res.missed.length){ const recap=frag(`<div class="recap"></div>`); recap.appendChild(frag(`<div class="recap-title">${esc(t("recap"))}</div>`)); res.missed.slice(0,6).forEach(m=>recap.appendChild(frag(`<div class="recap-item">${L(m.recap)}</div>`))); node.appendChild(recap); }
    const actions=frag(`<div class="result-actions"></div>`);
    const again=frag(`<button class="btn btn-primary">${esc(t("playAgain"))}</button>`); again.addEventListener("click",()=>startMode(res.mode));
    const menu=frag(`<button class="btn btn-ghost">${esc(t("backToMenu"))}</button>`); menu.addEventListener("click",renderHome);
    actions.appendChild(again); actions.appendChild(menu); node.appendChild(actions); mount(node);
  }

  /* ============ MEMORY ============ */
  let M=null, memMode=null;
  function startMemory(mode) {
    memMode=mode; const md=D.modeDefs[mode];
    let cards=[]; md.items.forEach((p,i)=>{ cards.push({pid:i,label:p.a}); cards.push({pid:i,label:p.b}); });
    cards=shuffle(cards).map((c,idx)=>({...c,id:idx,flipped:false,matched:false}));
    M={cards,flipped:[],moves:0,matchedCount:0,lock:false}; renderMemory();
  }

  function renderMemory() {
    currentScreen=renderMemory; if(!M){renderHome();return;}
    const md=D.modeDefs[memMode];
    const node=frag(`<div class="round"></div>`); node.appendChild(backButton());
    node.appendChild(frag(`<div class="round-head"><div class="round-title">${esc(L(I.STR["mode_"+memMode+"_t"]))}</div><div class="round-stats memory-stats"><span class="stat-chip">${esc(t("pairs"))} <b>${M.matchedCount}/${md.items.length}</b></span><span class="stat-chip">${esc(t("moves"))} <b>${M.moves}</b></span></div></div>`));
    node.appendChild(frag(`<div class="q-context" style="margin-bottom:.4rem">${esc(t("memoryPrompt"))}</div>`));
    const grid=frag(`<div class="memory-grid"></div>`);
    M.cards.forEach(c=>{ const cls="mcard"+(c.flipped?" flipped":"")+(c.matched?" matched":""); const labelText=L(c.label).replace(/\n/g,'<br>'); const b=frag(`<button class="${cls}" data-id="${c.id}" ${c.matched?"disabled":""}><span class="mcard-inner"><span class="mcard-face mcard-back">✶</span><span class="mcard-face mcard-front">${labelText}</span></span></button>`); b.addEventListener("click",()=>flipCard(c.id)); grid.appendChild(b); });
    node.appendChild(grid); mount(node);
  }

  function flipCard(id) {
    if(M.lock) return; const c=M.cards.find(x=>x.id===id); if(!c||c.flipped||c.matched) return;
    c.flipped=true; M.flipped.push(c); renderMemory();
    if(M.flipped.length===2){ M.moves++; M.lock=true; const[a,b]=M.flipped;
      if(a.pid===b.pid){ setTimeout(()=>{ a.matched=b.matched=true; M.matchedCount++; M.flipped=[]; M.lock=false; if(M.matchedCount===D.modeDefs[memMode].items.length) finishMemory(); else renderMemory(); },460); }
      else { setTimeout(()=>{ a.flipped=b.flipped=false; M.flipped=[]; M.lock=false; renderMemory(); },900); }
    }
  }

  function finishMemory() {
    const md=D.modeDefs[memMode]; const best=loadJ(LS_BEST),seen=loadJ(LS_SEEN); seen[memMode]=true; saveJ(LS_SEEN,seen);
    let isRecord=false; if(best[memMode]==null||M.moves<best[memMode]){best[memMode]=M.moves;isRecord=true;saveJ(LS_BEST,best);}
    renderResult({mode:memMode,moves:M.moves,correct:md.items.length,total:md.items.length,isRecord,missed:[]});
  }

  /* ============ CHROME ============ */
  function backButton(){ const b=frag(`<button class="btn-back">← ${esc(t("backToMenu"))}</button>`); b.addEventListener("click",()=>{R=null;M=null;memMode=null;renderHome();}); return b; }
  function setLang(lang){ localStorage.setItem(LS_LANG,lang); document.documentElement.setAttribute("lang",lang); updateChrome(); currentScreen(); }
  function updateChrome(){
    const lang=getLang();
    document.querySelectorAll(".lang-pill button").forEach(btn=>btn.classList.toggle("active",btn.dataset.lang===lang));
    document.getElementById("brandSchool").textContent=L(I.STR.school);
    const gl=document.getElementById("gamesLink"); if(gl) gl.textContent=lang==="en"?"Games":"Giochi";
    const bl=document.getElementById("brandLink"); if(bl) bl.setAttribute("title",L(I.STR.backToSite));
    updateThemeBtn(); document.title=L(I.STR.gameTitle)+" · "+L(I.STR.school);
  }
  function isLight(){ return document.documentElement.getAttribute("data-theme")==="light"; }
  var _soleSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="3.5"/><line x1="10" y1="2.5" x2="10" y2="4.5"/><line x1="10" y1="15.5" x2="10" y2="17.5"/><line x1="2.5" y1="10" x2="4.5" y2="10"/><line x1="15.5" y1="10" x2="17.5" y2="10"/><line x1="4.7" y1="4.7" x2="6.1" y2="6.1"/><line x1="13.9" y1="13.9" x2="15.3" y2="15.3"/><line x1="4.7" y1="15.3" x2="6.1" y2="13.9"/><line x1="13.9" y1="6.1" x2="15.3" y2="4.7"/></svg>';
  var _lunaSvg='<svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 13.5A6.5 6.5 0 0 1 6.5 5.7 6.5 6.5 0 1 0 14.3 13.5z"/></svg>';
  function updateThemeBtn(){ const btn=document.getElementById("themeToggle"); if(!btn) return; const light=isLight(); btn.querySelector(".ico").innerHTML=light?_lunaSvg:_soleSvg; btn.querySelector(".lbl").textContent=light?t("themeDark"):t("themeLight"); }
  function toggleTheme(){ const meta=document.getElementById("metaThemeColor"); if(isLight()){document.documentElement.removeAttribute("data-theme");localStorage.setItem(LS_THEME,"dark");if(meta)meta.content="#0d0b1a";}else{document.documentElement.setAttribute("data-theme","light");localStorage.setItem(LS_THEME,"light");if(meta)meta.content="#f5f0e8";} updateThemeBtn(); }

  function init(){
    app=document.getElementById("app"); document.documentElement.setAttribute("lang",getLang());
    document.querySelectorAll(".lang-pill button").forEach(btn=>btn.addEventListener("click",()=>setLang(btn.dataset.lang)));
    const tt=document.getElementById("themeToggle"); if(tt) tt.addEventListener("click",toggleTheme);
    updateChrome(); renderHome();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",init); else init();
})();
