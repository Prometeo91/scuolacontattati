/* ============================================================
   OFFICINA ALKEMICA — motore di gioco (vanilla JS)
   Stesso impianto di "I Mondi Spirituali".
   ============================================================ */
(function () {
  "use strict";

  const D = window.OA_DATA;
  const I = window.OA_I18N;

  const LS = { lang: "sc-lang", theme: "sctheme", best: "sc-oa-best", seen: "sc-oa-seen" };

  function getLang() { return localStorage.getItem(LS.lang) === "en" ? "en" : "it"; }
  const t = I.makeT(getLang);
  function L(obj) { const l = getLang(); return obj && obj[l] != null ? obj[l] : (obj ? obj.it : ""); }

  function loadBest() { try { return JSON.parse(localStorage.getItem(LS.best)) || {}; } catch (e) { return {}; } }
  function saveBest(o) { try { localStorage.setItem(LS.best, JSON.stringify(o)); } catch (e) {} }
  function loadSeen() { try { return JSON.parse(localStorage.getItem(LS.seen)) || {}; } catch (e) { return {}; } }
  function saveSeen(o) { try { localStorage.setItem(LS.seen, JSON.stringify(o)); } catch (e) {} }

  const MODES = ["specchio", "persona", "infsup", "quiz", "memoria"];
  const ROMAN = { specchio: "I", persona: "II", infsup: "III", quiz: "IV", memoria: "V" };
  const GLYPH = { specchio: "◇", persona: "☉", infsup: "△", quiz: "✦", memoria: "❖" };

  let app;
  let currentScreen = renderHome;

  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function pickN(arr, n) { return shuffle(arr).slice(0, n); }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }
  function letter(i) { return String.fromCharCode(65 + i); }
  function clear() { app.innerHTML = ""; }
  function mount(node) { clear(); app.appendChild(node); }
  function frag(html) { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; }

  // ============================================================
  //  HOME
  // ============================================================
  function renderHome() {
    currentScreen = renderHome;
    const best = loadBest();
    const seen = loadSeen();
    const playedCount = MODES.filter(m => seen[m]).length;
    const pct = Math.round((playedCount / MODES.length) * 100);

    const node = frag(`<div class="home"></div>`);
    const halo = frag(`<div class="home-halo"></div>`);
    halo.appendChild(buildPhasesDiagram());
    const words = L(I.STR.gameTitle).split(" ");
    const lastW = words.pop();
    halo.appendChild(frag(`<h1>${esc(words.join(" "))} <span class="accent">${esc(lastW)}</span></h1>`));
    halo.appendChild(frag(`<div class="home-sub">${esc(L(I.STR.gameKicker))}</div>`));
    halo.appendChild(frag(`<div class="home-author">${esc(L(I.STR.fromAuthor))}</div>`));
    node.appendChild(halo);

    node.appendChild(frag(`<p class="epigraph">${esc(L(I.STR.epigraph))}</p>`));
    node.appendChild(frag(`<div class="epigraph-src">${esc(L(I.STR.epigraphSource))}</div>`));
    node.appendChild(frag(`<div class="gold-rule"><span class="g">◆ ◆ ◆</span></div>`));
    node.appendChild(frag(`<div class="eyebrow">${esc(t("chooseMode"))}</div>`));

    const grid = frag(`<div class="modes"></div>`);
    MODES.forEach(m => {
      const title = L(I.STR["mode_" + m + "_t"]);
      const desc = L(I.STR["mode_" + m + "_d"]);
      let meta;
      if (m === "memoria") meta = best[m] != null ? `${t("bestScore")}: ${best[m]} ${L(I.STR.moves).toLowerCase()}` : t("notYetPlayed");
      else meta = best[m] != null ? `${t("bestScore")}: ${best[m]} ${t("points")}` : t("notYetPlayed");
      const card = frag(`
        <button class="mode-card" data-mode="${m}">
          <div class="mode-head">
            <span class="mode-roman">${ROMAN[m]}</span>
            <span class="mode-glyph" aria-hidden="true">${GLYPH[m]}</span>
            <span class="mode-title">${esc(title)}</span>
          </div>
          <div class="mode-desc">${esc(desc)}</div>
          <div class="mode-meta"><span>${esc(meta)}</span></div>
        </button>`);
      card.addEventListener("click", () => startMode(m));
      grid.appendChild(card);
    });
    node.appendChild(grid);

    const init = frag(`
      <div class="initiation">
        <div class="initiation-label"><span>${esc(t("initiationProgress"))}</span><b>${pct}%</b></div>
        <div class="bar"><i></i></div>
        <button class="reset-btn">${esc(t("resetProgress"))}</button>
      </div>`);
    node.appendChild(init);
    mount(node);
    requestAnimationFrame(() => { const bar = node.querySelector(".bar i"); if (bar) bar.style.width = pct + "%"; });
    init.querySelector(".reset-btn").addEventListener("click", () => {
      if (confirm(t("resetConfirm"))) { localStorage.removeItem(LS.best); localStorage.removeItem(LS.seen); renderHome(); }
    });
  }

  function buildPhasesDiagram() {
    const wrap = frag(`<div class="planes-diagram" role="img" aria-label="${esc(L(I.STR.gameTitle))}"></div>`);
    const sizes = [132, 96, 62];
    D.PHASES.forEach((ph, i) => {
      const ring = document.createElement("div");
      ring.className = "ring";
      ring.style.width = sizes[i] + "px";
      ring.style.height = sizes[i] + "px";
      ring.style.borderColor = ph.ring;
      ring.style.background = "radial-gradient(circle at 38% 34%, " + ph.color + "cc, transparent 72%)";
      wrap.appendChild(ring);
    });
    wrap.appendChild(frag(`<div class="core"></div>`));
    return wrap;
  }

  // ============================================================
  //  COSTRUZIONE DOMANDE
  // ============================================================
  function mcOptions(itArr, enArr, correctIdx) {
    return shuffle(itArr.map((_, k) => ({ it: itArr[k], en: enArr[k], correct: k === correctIdx })));
  }

  function buildSpecchio() {
    return shuffle(D.SPECCHIO).map(s => ({
      kind: "specchio",
      media: () => frag(`<div class="q-desc">${esc(L(s.sit))}</div>`),
      prompt: () => t("specchioPrompt"),
      options: mcOptions(s.options.it, s.options.en, s.correct),
      recap: { it: s.note.it, en: s.note.en }
    }));
  }

  function buildPersona() {
    return shuffle(D.PERSONA_ANIMA).map(p => ({
      kind: "persona",
      media: () => frag(`<div class="persona-item">${esc(L(p.item))}</div>`),
      prompt: () => t("personaPrompt"),
      options: [
        { it: I.STR.persona_opt0.it, en: I.STR.persona_opt0.en, correct: p.belongs === 0 },
        { it: I.STR.persona_opt1.it, en: I.STR.persona_opt1.en, correct: p.belongs === 1 }
      ],
      recap: { it: `<b>${p.item.it}</b> — ${p.note.it}`, en: `<b>${p.item.en}</b> — ${p.note.en}` }
    }));
  }

  function buildInfSup() {
    return shuffle(D.INF_SUP).map(p => ({
      kind: "infsup",
      media: () => frag(`<div class="persona-item">${esc(L(p.item))}</div>`),
      prompt: () => t("infsupPrompt"),
      options: [
        { it: I.STR.infsup_opt0.it, en: I.STR.infsup_opt0.en, correct: p.belongs === 0 },
        { it: I.STR.infsup_opt1.it, en: I.STR.infsup_opt1.en, correct: p.belongs === 1 }
      ],
      recap: { it: `<b>${p.item.it}</b> — ${p.note.it}`, en: `<b>${p.item.en}</b> — ${p.note.en}` }
    }));
  }

  function buildQuiz() {
    return pickN(D.QUIZ, 10).map(q => ({
      kind: "quiz",
      media: () => null,
      prompt: () => L(q.q),
      options: mcOptions(q.options.it, q.options.en, q.correct),
      recap: { it: q.note.it, en: q.note.en }
    }));
  }

  // ============================================================
  //  ROUND (engine condiviso)
  // ============================================================
  let R = null;

  function startMode(mode) {
    if (mode === "memoria") { startMemory(); return; }
    let items;
    if (mode === "specchio") items = buildSpecchio();
    else if (mode === "persona") items = buildPersona();
    else if (mode === "infsup") items = buildInfSup();
    else if (mode === "quiz") items = buildQuiz();
    R = { mode, items, idx: 0, score: 0, streak: 0, maxStreak: 0, correctCount: 0, answered: false, missed: [], pipStates: items.map(() => "") };
    renderRound();
  }

  function renderRound() {
    currentScreen = renderRound;
    if (!R) { renderHome(); return; }
    const it = R.items[R.idx];
    const total = R.items.length;

    const node = frag(`<div class="round"></div>`);
    node.appendChild(backButton());
    node.appendChild(frag(`
      <div class="round-head">
        <div class="round-title">${esc(L(I.STR["mode_" + R.mode + "_t"]))}</div>
        <div class="round-stats">
          <span class="stat-chip">${esc(t("score"))} <b>${R.score}</b></span>
          <span class="stat-chip streak${R.streak >= 3 ? " hot" : ""}">${esc(t("streak"))} <b>${R.streak}</b></span>
        </div>
      </div>`));

    const pips = frag(`<div class="pips"></div>`);
    R.pipStates.forEach((st, i) => {
      let cls = "pip";
      if (st === "ok") cls += " done"; else if (st === "no") cls += " wrong"; else if (i === R.idx) cls += " current";
      pips.appendChild(frag(`<div class="${cls}"></div>`));
    });
    node.appendChild(pips);

    const card = frag(`<div class="qcard"></div>`);
    const media = it.media();
    if (media) card.appendChild(media);
    const ctxExtra = "";
    card.appendChild(frag(`<div class="q-context">${esc(t("question"))} ${R.idx + 1} ${esc(t("of"))} ${total}${ctxExtra}</div>`));
    card.appendChild(frag(`<div class="q-prompt">${esc(it.prompt())}</div>`));

    const optsWrap = frag(`<div class="options"></div>`);
    it.options.forEach((o, i) => {
      const b = frag(`<button class="option" data-i="${i}"><span class="marker">${letter(i)}</span><span class="otext">${esc(L(o))}</span></button>`);
      b.addEventListener("click", () => answer(i, card, optsWrap, node, it));
      optsWrap.appendChild(b);
    });
    card.appendChild(optsWrap);
    card.appendChild(frag(`<div class="feedback"><div class="feedback-verdict"></div><div class="feedback-note"></div></div>`));
    card.appendChild(frag(`<div class="round-foot"></div>`));
    node.appendChild(card);
    mount(node);

    if (R.answered) restoreAnswered(card, optsWrap, it);
  }

  function answer(i, card, optsWrap, node, it) {
    if (R.answered) return;
    R.answered = true;
    const correct = !!it.options[i].correct;
    optsWrap.querySelectorAll(".option").forEach((b, k) => {
      b.disabled = true;
      if (it.options[k].correct) b.classList.add("correct");
      else if (k === i) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    if (correct) {
      R.streak += 1; R.maxStreak = Math.max(R.maxStreak, R.streak);
      R.score += 100 + Math.min(R.streak - 1, 5) * 20;
      R.correctCount += 1; R.pipStates[R.idx] = "ok";
    } else { R.streak = 0; R.pipStates[R.idx] = "no"; R.missed.push(it); }

    const sc = node.querySelector(".round-stats");
    if (sc) sc.innerHTML = `<span class="stat-chip">${esc(t("score"))} <b>${R.score}</b></span>
      <span class="stat-chip streak${R.streak >= 3 ? " hot" : ""}">${esc(t("streak"))} <b>${R.streak}</b></span>`;
    const pipEls = node.querySelectorAll(".pip");
    if (pipEls[R.idx]) pipEls[R.idx].className = "pip " + (correct ? "done" : "wrong");
    showFeedback(card, correct, it);
  }

  function showFeedback(card, correct, it) {
    const fb = card.querySelector(".feedback");
    fb.querySelector(".feedback-verdict").className = "feedback-verdict " + (correct ? "ok" : "no");
    fb.querySelector(".feedback-verdict").innerHTML = (correct ? "✦ " : "○ ") + esc(correct ? t("correct") : t("wrong"));
    fb.querySelector(".feedback-note").innerHTML = L(it.recap);
    fb.classList.add("show");
    const foot = card.querySelector(".round-foot");
    foot.innerHTML = "";
    const last = R.idx >= R.items.length - 1;
    const btn = frag(`<button class="btn btn-primary">${esc(last ? t("seeResults") : t("next"))} →</button>`);
    btn.addEventListener("click", nextQuestion);
    foot.appendChild(btn);
  }

  function restoreAnswered(card, optsWrap, it) {
    optsWrap.querySelectorAll(".option").forEach((b, k) => {
      b.disabled = true;
      if (it.options[k].correct) b.classList.add("correct"); else b.classList.add("dim");
    });
    showFeedback(card, R.pipStates[R.idx] === "ok", it);
  }

  function nextQuestion() {
    if (R.idx >= R.items.length - 1) { finishRound(); return; }
    R.idx += 1; R.answered = false; renderRound();
  }

  function finishRound() {
    const best = loadBest(); const seen = loadSeen();
    seen[R.mode] = true; saveSeen(seen);
    let isRecord = false;
    if (best[R.mode] == null || R.score > best[R.mode]) { best[R.mode] = R.score; isRecord = R.score > 0; saveBest(best); }
    renderResult({ mode: R.mode, score: R.score, correct: R.correctCount, total: R.items.length, isRecord, missed: R.missed.slice() });
  }

  // ============================================================
  //  RISULTATO
  // ============================================================
  function renderResult(res) {
    const pct = res.total ? res.correct / res.total : 0;
    let tierKey = "resultLow", seal = "☾";
    if (pct >= 1) { tierKey = "resultPerfect"; seal = "✦"; }
    else if (pct >= 0.7) { tierKey = "resultGood"; seal = "☉"; }
    else if (pct >= 0.4) { tierKey = "resultMid"; seal = "△"; }
    currentScreen = () => renderResult(res);

    const node = frag(`<div class="result"></div>`);
    node.appendChild(frag(`<div class="result-seal">${seal}</div>`));
    node.appendChild(frag(`<h2>${esc(t(tierKey))}</h2>`));
    if (res.mode === "memoria") node.appendChild(frag(`<div class="result-score">${res.moves}<small>${esc(t("moves"))}</small></div>`));
    else {
      node.appendChild(frag(`<div class="result-score">${res.score}<small>${esc(t("points"))}</small></div>`));
      node.appendChild(frag(`<div class="result-meta">${esc(t("accuracy"))}: <b>${res.correct}/${res.total}</b></div>`));
    }
    if (res.isRecord) node.appendChild(frag(`<div class="result-record">✦ ${esc(t("newRecord"))}</div>`));

    if (res.missed && res.missed.length) {
      const recap = frag(`<div class="recap"></div>`);
      recap.appendChild(frag(`<div class="recap-title">${esc(t("recap"))}</div>`));
      res.missed.slice(0, 6).forEach(m => recap.appendChild(frag(`<div class="recap-item">${L(m.recap)}</div>`)));
      node.appendChild(recap);
    }

    const actions = frag(`<div class="result-actions"></div>`);
    const again = frag(`<button class="btn btn-primary">${esc(t("playAgain"))}</button>`);
    again.addEventListener("click", () => startMode(res.mode));
    const menu = frag(`<button class="btn btn-ghost">${esc(t("backToMenu"))}</button>`);
    menu.addEventListener("click", renderHome);
    actions.appendChild(again); actions.appendChild(menu);
    node.appendChild(actions);
    mount(node);
  }

  // ============================================================
  //  MEMORIA ALCHEMICA
  // ============================================================
  let M = null;
  function startMemory() {
    let cards = [];
    D.MEMORY.forEach((p, i) => { cards.push({ pid: i, label: p.a }); cards.push({ pid: i, label: p.b }); });
    cards = shuffle(cards).map((c, idx) => ({ ...c, id: idx, flipped: false, matched: false }));
    M = { cards, flipped: [], moves: 0, matchedCount: 0, lock: false };
    renderMemory();
  }

  function renderMemory() {
    currentScreen = renderMemory;
    if (!M) { renderHome(); return; }
    const node = frag(`<div class="round"></div>`);
    node.appendChild(backButton());
    node.appendChild(frag(`
      <div class="round-head">
        <div class="round-title">${esc(L(I.STR.mode_memoria_t))}</div>
        <div class="round-stats memory-stats">
          <span class="stat-chip">${esc(t("pairs"))} <b>${M.matchedCount}/${D.MEMORY.length}</b></span>
          <span class="stat-chip">${esc(t("moves"))} <b>${M.moves}</b></span>
        </div>
      </div>`));
    node.appendChild(frag(`<div class="q-context" style="margin-bottom:.4rem">${esc(t("memoryPrompt"))}</div>`));

    const grid = frag(`<div class="memory-grid"></div>`);
    M.cards.forEach(c => {
      const cls = "mcard" + (c.flipped ? " flipped" : "") + (c.matched ? " matched" : "");
      const b = frag(`
        <button class="${cls}" data-id="${c.id}" ${c.matched ? "disabled" : ""}>
          <span class="mcard-inner">
            <span class="mcard-face mcard-back">❖</span>
            <span class="mcard-face mcard-front">${esc(L(c.label))}</span>
          </span>
        </button>`);
      b.addEventListener("click", () => flipCard(c.id));
      grid.appendChild(b);
    });
    node.appendChild(grid);
    mount(node);
  }

  function flipCard(id) {
    if (M.lock) return;
    const c = M.cards.find(x => x.id === id);
    if (!c || c.flipped || c.matched) return;
    c.flipped = true; M.flipped.push(c); renderMemory();
    if (M.flipped.length === 2) {
      M.moves += 1; M.lock = true;
      const [a, b] = M.flipped;
      if (a.pid === b.pid) {
        setTimeout(() => {
          a.matched = b.matched = true; M.matchedCount += 1; M.flipped = []; M.lock = false;
          if (M.matchedCount === D.MEMORY.length) finishMemory(); else renderMemory();
        }, 460);
      } else {
        setTimeout(() => { a.flipped = b.flipped = false; M.flipped = []; M.lock = false; renderMemory(); }, 900);
      }
    }
  }

  function finishMemory() {
    const best = loadBest(); const seen = loadSeen();
    seen.memoria = true; saveSeen(seen);
    let isRecord = false;
    if (best.memoria == null || M.moves < best.memoria) { best.memoria = M.moves; isRecord = true; saveBest(best); }
    renderResult({ mode: "memoria", moves: M.moves, correct: D.MEMORY.length, total: D.MEMORY.length, isRecord, missed: [] });
  }

  // ============================================================
  //  CHROME
  // ============================================================
  function backButton() {
    const b = frag(`<button class="btn-back">← ${esc(t("backToMenu"))}</button>`);
    b.addEventListener("click", () => { R = null; M = null; renderHome(); });
    return b;
  }

  function setLang(lang) {
    localStorage.setItem(LS.lang, lang);
    document.documentElement.setAttribute("lang", lang);
    updateChrome();
    currentScreen();
  }

  function updateChrome() {
    const lang = getLang();
    document.querySelectorAll(".lang-pill button").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === lang));
    document.getElementById("brandGame").textContent = L(I.STR.gameTitle);
    document.getElementById("brandSchool").textContent = L(I.STR.school);
    const bl = document.getElementById("brandLink"); if (bl) bl.setAttribute("title", L(I.STR.backToSite));
    updateThemeBtn();
    document.title = L(I.STR.gameTitle) + " · " + L(I.STR.school);
  }

  function isLight() { return document.documentElement.getAttribute("data-theme") === "light"; }
  function updateThemeBtn() {
    const btn = document.getElementById("themeToggle"); if (!btn) return;
    const light = isLight();
    btn.querySelector(".ico").textContent = light ? "\u263D" : "\u2600";
    btn.querySelector(".lbl").textContent = light ? t("themeDark") : t("themeLight");
  }
  function toggleTheme() {
    const meta = document.getElementById("metaThemeColor");
    if (isLight()) { document.documentElement.removeAttribute("data-theme"); localStorage.setItem(LS.theme, "dark"); if (meta) meta.content = "#0d0b1a"; }
    else { document.documentElement.setAttribute("data-theme", "light"); localStorage.setItem(LS.theme, "light"); if (meta) meta.content = "#f5f0e8"; }
    updateThemeBtn();
  }

  function init() {
    app = document.getElementById("app");
    document.documentElement.setAttribute("lang", getLang());
    document.querySelectorAll(".lang-pill button").forEach(btn => btn.addEventListener("click", () => setLang(btn.dataset.lang)));
    const tt = document.getElementById("themeToggle"); if (tt) tt.addEventListener("click", toggleTheme);
    updateChrome();
    renderHome();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
