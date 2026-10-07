/* Test iniziatico dei Quattro Elementi — test/quattro-elementi/ e en/test/quattro-elementi/.
   Le domande stanno nell'HTML (una <fieldset class="q"> per domanda, con
   data-key = gruppo e data-max = scala); i testi dei risultati nel JSON
   #testTxt della pagina, uno per lingua. Qui solo calcolo e interfaccia.

   Soglie (dal testo del test):
   - Elementi F/A/Ac/T, 7 domande da 1 a 5: <18 mancante, ≥18 presente,
     ≥24 dominante, ≥27 in eccesso, ≥30 in squilibrio.
   - Triarticolazione, 3 domande da 1 a 10 per centro: conta il centro più
     basso; ≥20 matura, ≥24 integrata, ≥27 Io operativo, ≥30 Io magico.
   - Attenzione e Volontà, 7 domande da 1 a 5: ≥24, ≥27, ≥30. */
(function () {
  'use strict';
  var T = JSON.parse(document.getElementById('testTxt').textContent);
  var Lb = T.labels;
  var LS = 'sc-test-elementi';
  var form = document.getElementById('testForm');
  var qs = [].slice.call(form.querySelectorAll('.q'));
  var progress = document.getElementById('testProgress');
  var result = document.getElementById('testResult');

  function fmt(s, o) { return s.replace(/\{(\w+)\}/g, function (_, k) { return o[k]; }); }
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
  function level(v, steps, labels) {
    var out = Lb.none;
    steps.forEach(function (th, i) { if (v >= th) out = labels[i]; });
    return out;
  }
  function elementStatus(v) {
    if (v >= 30) return Lb.el.squilibrio;
    if (v >= 27) return Lb.el.eccesso;
    if (v >= 24) return Lb.el.dominante;
    if (v >= 18) return Lb.el.presente;
    return Lb.el.mancante;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function row(name, val, max, label) {
    return '<tr><th scope="row">' + esc(name) + '</th><td class="num">' + val + ' / ' + max + '</td><td>' + esc(label) + '</td></tr>';
  }

  var codeText = '';
  function show() {
    var s = sums(), N = Lb.names, els = ['F', 'A', 'Ac', 'T'];
    var triMin = Math.min(s.P, s.S, s.V);
    /* tre gruppi, come nell'esempio del test: elementi, centri, attenzione e volontà;
       nel riquadro ogni gruppo va a capo intero, la copia resta su una riga */
    var groups = ['F ' + s.F + ' – A ' + s.A + ' – Ac ' + s.Ac + ' – T ' + s.T,
                  'P ' + s.P + ' – S ' + s.S + ' – V ' + s.V,
                  'A ' + s.ATT + ' · W ' + s.VOL];
    codeText = groups.join(' · ');
    document.getElementById('codeBox').innerHTML = groups.map(function (g) { return '<span class="code-group">' + esc(g) + '</span>'; }).join(' ');

    var top = Math.max.apply(null, els.map(function (k) { return s[k]; }));
    var dom = els.filter(function (k) { return s[k] >= 24 && s[k] === top; }).map(function (k) { return N[k]; });
    var mis = els.filter(function (k) { return s[k] < 18; }).map(function (k) { return N[k]; });

    var h = '<table class="result-table"><caption class="sr-only">' + esc(Lb.elements) + '</caption><tbody>';
    els.forEach(function (k) { h += row(N[k], s[k], 35, elementStatus(s[k])); });
    h += '</tbody></table>';
    h += '<p><strong>' + esc(Lb.dominant) + ':</strong> ' + esc(dom.length ? dom.join(', ') : Lb.noneDominant) + '<br>' +
         '<strong>' + esc(Lb.missingEl) + ':</strong> ' + esc(mis.length ? mis.join(', ') : Lb.noneMissing) + '</p>';
    h += '<table class="result-table"><tbody>';
    ['P', 'S', 'V'].forEach(function (k) { h += row(N[k], s[k], 30, ''); });
    h += row(Lb.centers, triMin, 30, level(triMin, [20, 24, 27, 30], Lb.tri));
    h += row(N.ATT, s.ATT, 35, level(s.ATT, [24, 27, 30], Lb.att));
    h += row(N.VOL, s.VOL, 35, level(s.VOL, [24, 27, 30], Lb.vol));
    h += '</tbody></table>';
    document.getElementById('resDetail').innerHTML = h;

    /* invito alla consulenza: segnala gli Elementi mancanti (<18) o in
       eccesso (≥27, squilibrio compreso) e precompila il messaggio WhatsApp */
    var off = els.filter(function (k) { return s[k] < 18 || s[k] >= 27; })
                 .map(function (k) { return N[k] + ' ' + elementStatus(s[k]); });
    var flag = document.getElementById('consultFlag');
    flag.hidden = !off.length;
    if (off.length) flag.textContent = fmt(T.consult_flag, { list: off.join(', ') });
    var msg = encodeURIComponent(fmt(T.wa_msg, { code: codeText }));
    document.getElementById('waAC').href = 'https://wa.me/393929116441?text=' + msg;
    document.getElementById('waNic').href = 'https://wa.me/393349991888?text=' + msg;

    result.hidden = false;
    result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    result.focus({ preventScroll: true });
  }

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
    show();
  });

  document.getElementById('copyBtn').addEventListener('click', function () {
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
  document.getElementById('redoBtn').addEventListener('click', function () {
    if (!confirm(T.redo_confirm)) return;
    answers = {}; save(answers); form.reset();
    qs.forEach(function (q) { q.classList.remove('missing'); });
    result.hidden = true; updateProgress();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Tema chiaro/scuro: stessa chiave (sctheme) e stessa logica del sito */
  var btn = document.getElementById('themeToggle');
  if (btn) {
    var upd = function () {
      var light = document.documentElement.getAttribute('data-theme') === 'light';
      btn.innerHTML = '<span class="theme-toggle-icon" aria-hidden="true">' + (light ? '☽' : '☀') + '</span><span class="lbl"> ' + esc(light ? T.theme_dark : T.theme_light) + '</span>';
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
