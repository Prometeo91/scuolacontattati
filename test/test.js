/* Test interattivi della Scuola — test/<nome>/ e en/test/<nome>/.
   Una pagina può contenere più test, ognuno in un .test-panel con
   data-test (quale calcolo usare) e data-ls (chiave delle risposte salvate).
   Le domande stanno nell'HTML (una <fieldset class="q"> per domanda, con
   data-key = gruppo e data-max = scala); i testi dei risultati nel JSON
   .test-txt del pannello, uno per lingua. Qui c'è la parte comune
   (salvataggio, avanzamento, risposte mancanti, copia, Ricomincia, schede,
   tema) e, in SCORERS, il calcolo di ogni test: un test nuovo aggiunge lì
   la sua funzione.

   Quattro Elementi (soglie dal testo del test):
   - Qualità degli Elementi F/A/Ac/T (sezioni 1–4), 7 domande da 1 a 5:
     <18 mancante (squilibrio in difetto), ≥18 presente, ≥24 dominante.
     Sono tutte qualità positive, quindi da sole non possono dire «eccesso».
   - Eccesso degli Elementi eF/eA/eAc/eT (sezione 5), 7 domande da 1 a 5:
     ≥18 tendenza, ≥24 in eccesso, ≥30 in squilibrio. Soglie più basse
     delle qualità: sono tratti negativi, anche un punteggio medio conta.
   - Stato di ogni Elemento: i due punteggi letti insieme, l'eccesso per
     primo (le qualità alte non lo compensano). Vedi elementState().
   - Triarticolazione, 3 domande da 1 a 10 per centro: conta il centro più
     basso; ≥20 matura, ≥24 integrata, ≥27 Io operativo, ≥30 Io magico.
   - Attenzione e Volontà, 7 domande da 1 a 5: ≥24, ≥27, ≥30.

   Temperamento (Ippocrate e Galeno): quattro aree S/C/M/Fl di 15 domande
   da 1 a 5 (15–75); percentuale = punteggio / somma dei quattro × 100. */
(function () {
  'use strict';
  var PT = JSON.parse(document.getElementById('pageTxt').textContent);

  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* nel riquadro del codice ogni gruppo va a capo, e dentro un gruppo si va a
     capo solo fra una voce e l'altra (mai fra lettera e numero) */
  function codeHtml(groups) {
    return groups.map(function (g) {
      return '<span class="code-group">' + g.split(' – ').map(function (x) { return '<span class="code-item">' + esc(x) + '</span>'; }).join(' – ') + '</span>';
    }).join(' ');
  }

  var SCORERS = {
    elementi: function (s, T, ui) {
      var Lb = T.labels, N = Lb.names, els = ['F', 'A', 'Ac', 'T'];
      function level(v, steps, labels) {
        var out = Lb.none;
        steps.forEach(function (th, i) { if (v >= th) out = labels[i]; });
        return out;
      }
      function qualityStatus(v) {
        if (v >= 24) return Lb.el.dominante;
        if (v >= 18) return Lb.el.presente;
        return Lb.el.mancante;
      }
      function excessStatus(v) {
        if (v >= 30) return Lb.el.squilibrio;
        if (v >= 24) return Lb.el.eccesso;
        if (v >= 18) return Lb.el.tendenza;
        return '';
      }
      /* q = qualità (sezioni 1–4), e = eccesso (sezione 5) */
      function elementState(q, e) {
        if (e >= 30) return Lb.stato.squilibrio;
        if (e >= 24) return q < 18 ? Lb.stato.ombra : Lb.stato.eccesso;
        if (q < 18) return Lb.stato.difetto;
        if (e >= 18) return Lb.stato.osserva;
        return Lb.stato.equilibrio;
      }
      function unbalanced(q, e) { return q < 18 || e >= 24; }
      function row(name, val, max, label) {
        return '<tr><th scope="row">' + esc(name) + '</th><td class="num">' + val + ' / ' + max + '</td><td>' + esc(label) + '</td></tr>';
      }

      var triMin = Math.min(s.P, s.S, s.V);
      /* tre gruppi, come nell'esempio del test: elementi (qualità / eccesso),
         centri, attenzione e volontà */
      var groups = [els.map(function (k) { return k + ' ' + s[k] + '/' + s['e' + k]; }).join(' – '),
                    'P ' + s.P + ' – S ' + s.S + ' – V ' + s.V,
                    'A ' + s.ATT + ' · W ' + s.VOL];
      var code = groups.join(' · ');

      var top = Math.max.apply(null, els.map(function (k) { return s[k]; }));
      var dom = els.filter(function (k) { return s[k] >= 24 && s[k] === top; }).map(function (k) { return N[k]; });
      var mis = els.filter(function (k) { return s[k] < 18; }).map(function (k) { return N[k]; });
      var exc = els.filter(function (k) { return s['e' + k] >= 24; });

      var h = '<table class="result-table"><caption class="sr-only">' + esc(Lb.elements) + '</caption><tbody>';
      els.forEach(function (k) {
        h += '<tr><th scope="row">' + esc(N[k]) + '</th>' +
          '<td class="num">' + esc(Lb.quality) + ' ' + s[k] + ' / 35<br>' + esc(Lb.excess) + ' ' + s['e' + k] + ' / 35</td>' +
          '<td>' + esc(qualityStatus(s[k])) + '<br>' + esc(excessStatus(s['e' + k]) || Lb.el.nessuno) + '</td></tr>' +
          '<tr class="state-row' + (unbalanced(s[k], s['e' + k]) ? ' off' : '') + '"><td colspan="3"><strong>' + esc(Lb.statoLabel) + ':</strong> ' +
          esc(elementState(s[k], s['e' + k])) + '</td></tr>';
      });
      h += '</tbody></table>';
      h += '<p><strong>' + esc(Lb.dominant) + ':</strong> ' + esc(dom.length ? dom.join(', ') : Lb.noneDominant) + '<br>' +
           '<strong>' + esc(Lb.missingEl) + ':</strong> ' + esc(mis.length ? mis.join(', ') : Lb.noneMissing) + '<br>' +
           '<strong>' + esc(Lb.excessEl) + ':</strong> ' + esc(exc.length ? exc.map(function (k) { return N[k]; }).join(', ') : Lb.noneExcess) + '</p>';
      /* per ogni Elemento in eccesso, la descrizione della Scuola */
      exc.forEach(function (k) {
        var d = T.excess_desc[k];
        h += '<div class="excess-desc"><h3>' + esc(N[k]) + ' — ' + esc(excessStatus(s['e' + k])) + '</h3><p>' + esc(d[0]) + '</p><ul>' +
          d[1].map(function (b) { return '<li><strong>' + esc(b[0]) + ':</strong> ' + esc(b[1]) + '</li>'; }).join('') + '</ul></div>';
      });
      h += '<table class="result-table"><tbody>';
      ['P', 'S', 'V'].forEach(function (k) { h += row(N[k], s[k], 30, ''); });
      h += row(Lb.centers, triMin, 30, level(triMin, [20, 24, 27, 30], Lb.tri));
      h += row(N.ATT, s.ATT, 35, level(s.ATT, [24, 27, 30], Lb.att));
      h += row(N.VOL, s.VOL, 35, level(s.VOL, [24, 27, 30], Lb.vol));
      h += '</tbody></table>';

      /* invito alla consulenza: segnala gli Elementi mancanti (qualità <18) o
         in eccesso (eccesso ≥24, squilibrio compreso) e precompila il messaggio WhatsApp */
      var off = els.filter(function (k) { return unbalanced(s[k], s['e' + k]); })
                   .map(function (k) { return N[k] + ' ' + elementState(s[k], s['e' + k]); });
      var flag = ui.role('flag');
      flag.hidden = !off.length;
      if (off.length) flag.textContent = fmt(T.consult_flag, { list: off.join(', ') });
      var msg = encodeURIComponent(fmt(T.wa_msg, { code: code }));
      ui.role('wa-ac').href = 'https://wa.me/393929116441?text=' + msg;
      ui.role('wa-nic').href = 'https://wa.me/393349991888?text=' + msg;

      return { groups: groups, code: code, html: h };
    },

    temperamento: function (s, T) {
      var Lb = T.labels, keys = ['S', 'C', 'M', 'Fl'];
      var tot = keys.reduce(function (a, k) { return a + s[k]; }, 0);
      /* percentuali intere che sommano a 100 (metodo dei resti più grandi);
         punteggi uguali hanno sempre la stessa percentuale, anche a costo di un 99 */
      var raw = keys.map(function (k) { return s[k] * 100 / tot; });
      var pct = raw.map(Math.floor), rest = 100 - pct.reduce(function (a, b) { return a + b; }, 0);
      var byRest = keys.map(function (k, i) { return i; }).sort(function (a, b) { return (raw[b] - pct[b]) - (raw[a] - pct[a]); });
      while (rest > 0 && byRest.length) {
        var r0 = raw[byRest[0]] - pct[byRest[0]];
        var same = byRest.filter(function (i) { return raw[i] - pct[i] === r0; });
        if (same.length > rest) break;
        same.forEach(function (i) { pct[i]++; });
        rest -= same.length; byRest = byRest.slice(same.length);
      }
      var P = {}; keys.forEach(function (k, i) { P[k] = pct[i]; });
      var order = keys.slice().sort(function (a, b) { return s[b] - s[a]; });
      var top = s[order[0]];
      var pred = order.filter(function (k) { return s[k] === top; }).map(function (k) { return Lb.names[k]; });

      var groups = [order.map(function (k) { return Lb.names[k] + ' ' + P[k] + '%'; }).join(' – ')];
      var code = Lb.codePrefix + ': ' + groups[0];
      /* nel riquadro la gerarchia va a capo un temperamento per riga */
      var box = order.map(function (k) { return '<span class="code-line">' + esc(Lb.names[k]) + ' ' + P[k] + '%</span>'; }).join('');
      var h = '<h3>' + esc(Lb.predominant) + '</h3><p class="temp-predominant">' + esc(pred.join(', ')) + '</p>';
      h += '<table class="result-table temp-table"><caption class="sr-only">' + esc(Lb.hierarchy) + '</caption><tbody>';
      order.forEach(function (k, i) {
        h += '<tr><th scope="row">' + (i + 1) + '. ' + esc(Lb.names[k]) + '<span class="temp-el">' + esc(Lb.el[k]) + '</span></th>' +
          '<td class="num">' + s[k] + ' / 75<br><strong>' + P[k] + '%</strong></td>' +
          '<td class="temp-bar-cell" aria-hidden="true"><span class="temp-bar-track"><span class="temp-bar" style="width:' + Math.round(s[k] * 100 / 75) + '%"></span></span></td></tr>';
      });
      h += '</tbody></table>';
      h += '<p class="test-scale-note">' + esc(Lb.total) + ': ' + tot + '</p>';

      /* profili: per intero il predominante (o i predominanti a pari punteggio),
         gli altri chiusi, nell'ordine della gerarchia */
      var PR = T.profiles;
      var profile = function (k) {
        var p = PR.p[k];
        return '<p class="temp-profile-sub">' + esc(p.sub) + '</p><p>' + esc(p.body) + '</p>' +
          '<div class="temp-work"><h4>' + esc(PR.work) + '</h4><p>' + esc(p.work) + '</p></div>';
      };
      var tops = order.filter(function (k) { return s[k] === top; });
      h += '<section class="temp-profiles"><h3>' + esc(PR.profiles_title) + '</h3>';
      tops.forEach(function (k) { h += '<article class="temp-profile"><h4 class="temp-profile-title">' + esc(PR.p[k].title) + '</h4>' + profile(k) + '</article>'; });
      var rest = order.filter(function (k) { return s[k] !== top; });
      if (rest.length) {
        h += '<h3>' + esc(PR.others_title) + '</h3>';
        rest.forEach(function (k) {
          h += '<details class="temp-profile temp-more"><summary>' + esc(PR.p[k].title) + ' <span class="temp-more-pct">' + P[k] + '%</span></summary>' + profile(k) + '</details>';
        });
      }
      h += '</section>';
      return { groups: groups, box: box, code: code, html: h };
    }
  };

  function setupTest(panel) {
    var T = JSON.parse(panel.querySelector('.test-txt').textContent);
    var LS = panel.getAttribute('data-ls');
    var scorer = SCORERS[panel.getAttribute('data-test')];
    var ui = { role: function (r) { return panel.querySelector('[data-role="' + r + '"]'); } };
    var form = ui.role('form'), progress = ui.role('progress'), result = ui.role('result');
    var qs = [].slice.call(form.querySelectorAll('.q'));

    function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
    function save(a) { try { localStorage.setItem(LS, JSON.stringify(a)); } catch (e) {} }

    var answers = load();
    Object.keys(answers).forEach(function (name) {
      var el = form.querySelector('input[name="' + name + '"][value="' + answers[name] + '"]');
      if (el) el.checked = true;
    });

    function answered() { return qs.filter(function (q) { return q.querySelector('input:checked'); }); }
    function updateProgress() { progress.textContent = fmt(T.progress, { n: answered().length, tot: qs.length }); }
    updateProgress();

    form.addEventListener('change', function (ev) {
      var t = ev.target; if (t.type !== 'radio') return;
      answers[t.name] = +t.value; save(answers);
      t.closest('.q').classList.remove('missing');
      updateProgress();
    });

    function sums() {
      var s = {};
      qs.forEach(function (q) {
        var k = q.getAttribute('data-key'), c = q.querySelector('input:checked');
        s[k] = (s[k] || 0) + (c ? +c.value : 0);
      });
      return s;
    }

    var codeText = '';
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var missing = qs.filter(function (q) { return !q.querySelector('input:checked'); });
      missing.forEach(function (q) { q.classList.add('missing'); });
      if (missing.length) {
        progress.textContent = fmt(T.missing, { n: missing.length });
        missing[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        missing[0].querySelector('input').focus({ preventScroll: true });
        return;
      }
      var r = scorer(sums(), T, ui);
      codeText = r.code;
      ui.role('code').innerHTML = r.box || codeHtml(r.groups);
      ui.role('detail').innerHTML = r.html;
      result.hidden = false;
      result.scrollIntoView({ behavior: 'smooth', block: 'start' });
      result.focus({ preventScroll: true });
    });

    ui.role('copy').addEventListener('click', function () {
      var b = this, done = function () { var o = b.textContent; b.textContent = T.copied; setTimeout(function () { b.textContent = o; }, 1800); };
      /* riserva per i browser interni (WhatsApp, Instagram) dove clipboard non c'è o fallisce */
      var fallback = function () {
        var ta = document.createElement('textarea'); ta.value = codeText; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select();
        try { if (document.execCommand('copy')) done(); } catch (e) {}
        document.body.removeChild(ta);
      };
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(codeText).then(done, fallback);
      else fallback();
    });
    ui.role('redo').addEventListener('click', function () {
      if (!confirm(T.redo_confirm)) return;
      answers = {}; save(answers); form.reset();
      qs.forEach(function (q) { q.classList.remove('missing'); });
      result.hidden = true; updateProgress();
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  var panels = [].slice.call(document.querySelectorAll('.test-panel'));
  panels.forEach(setupTest);

  /* Schede: #temperamento nell'indirizzo apre quella scheda; il clic su una
     scheda riscrive l'indirizzo, così il link si può mandare agli studenti */
  var tabs = [].slice.call(document.querySelectorAll('.test-tabs [role="tab"]'));
  function openTab(id, focus) {
    var found = panels.some(function (p) { return p.id === id; });
    if (!found) id = panels[0].id;
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    tabs.forEach(function (t) {
      var on = t.getAttribute('aria-controls') === id;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    return id;
  }
  if (tabs.length) {
    openTab(location.hash.slice(1));
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () {
        var id = openTab(t.getAttribute('aria-controls'));
        history.replaceState(null, '', '#' + id);
      });
      t.addEventListener('keydown', function (ev) {
        var d = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        ev.preventDefault();
        var n = tabs[(i + d + tabs.length) % tabs.length];
        history.replaceState(null, '', '#' + openTab(n.getAttribute('aria-controls'), true));
      });
    });
    document.querySelectorAll('[data-tab-link]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var id = openTab(a.getAttribute('data-tab-link'));
        history.replaceState(null, '', '#' + id);
        document.querySelector('.test-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
    window.addEventListener('hashchange', function () { openTab(location.hash.slice(1)); });
  }

  /* Tema chiaro/scuro: stessa chiave (sctheme) e stessa logica del sito */
  var btn = document.getElementById('themeToggle');
  if (btn) {
    var upd = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      btn.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true">' + (light ? '☽' : '☀') + '</span><span class="lbl"> ' + esc(light ? PT.theme_dark : PT.theme_light) + '</span>';
    };
    upd();
    btn.addEventListener('click', function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      var m = document.getElementById('metaThemeColor');
      if (light) { document.documentElement.removeAttribute('data-theme'); if (m) m.content = '#0d0b1a'; }
      else { document.documentElement.setAttribute('data-theme', 'light'); if (m) m.content = '#f5f0e8'; }
      try { localStorage.setItem('sctheme', light ? 'dark' : 'light'); } catch (e) {}
      upd();
    });
  }
})();
