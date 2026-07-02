/* Kill-switch: la v2 non usa più il service worker (niente PWA offline).
   Questo file sostituisce il vecchio sw.js così i visitatori che lo hanno
   già installato ricevono l'aggiornamento, svuotano le cache del vecchio
   sito e tornano a caricare tutto dalla rete. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => caches.delete(k)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((c) => c.navigate(c.url));
    })()
  );
});
