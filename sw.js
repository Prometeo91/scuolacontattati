/* ═══════════════════════════════════════════════════
   Scuola ContattaTi — Service Worker
   Strategia:
   · navigazioni (HTML): network-first, fallback alla cache
     → contenuti sempre freschi online, pagine già visitate
       disponibili offline
   · asset statici (css/js/font/immagini): stale-while-revalidate
     → risposta immediata dalla cache, aggiornamento in background
   I giochi visitati almeno una volta funzionano offline.
   Per invalidare tutto: incrementare VERSION.
   MANUTENZIONE: i ?v= della lista CORE e VERSION li aggiorna
   node scripts/versione.js (impronta del contenuto di ogni file).
   ═══════════════════════════════════════════════════ */
var VERSION = 'sc-cache-v101';
var CORE = [
  '/',
  '/style.css?v=8ce130b4',
  '/app.js?v=782a1593',
  '/lezioni.js?v=0f24d52e',
  '/data/citazioni.js?v=d93b9e6a',
  '/data/eventi.js?v=27b0078a',
  '/site.webmanifest'
];

self.addEventListener('install', function(e){
  e.waitUntil(
    caches.open(VERSION).then(function(c){ return c.addAll(CORE); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.filter(function(k){ return k!==VERSION; }).map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* GA, YouTube ecc.: rete */

  if (req.mode === 'navigate') {
    /* HTML: prima la rete, poi la cache (pagina già visitata), poi la home */
    e.respondWith(
      fetch(req).then(function(resp){
        var copy = resp.clone();
        caches.open(VERSION).then(function(c){ c.put(req, copy); });
        return resp;
      }).catch(function(){
        return caches.match(req).then(function(hit){ return hit || caches.match('/'); });
      })
    );
    return;
  }

  /* Asset: stale-while-revalidate */
  e.respondWith(
    caches.match(req).then(function(hit){
      var update = fetch(req).then(function(resp){
        if (resp && resp.ok) {
          var copy = resp.clone();
          caches.open(VERSION).then(function(c){ c.put(req, copy); });
        }
        return resp;
      }).catch(function(){ return hit; });
      return hit || update;
    })
  );
});
