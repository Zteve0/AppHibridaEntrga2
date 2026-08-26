// Service worker: la app funciona sin conexion despues de la primera visita.
// Estrategia: network-first para la navegacion (asi siempre se ve la version nueva)
// y cache-first para los assets con hash en el nombre (nunca cambian).
const CACHE = 'minevera-v2';

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(['./', './index.html'])).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function guardar(req, res) {
  if (res && res.ok && req.url.startsWith(self.location.origin)) {
    const copia = res.clone();
    caches.open(CACHE).then((c) => c.put(req, copia));
  }
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // Documento (navegacion): primero la red, y si no hay conexion, el cache.
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then((res) => guardar(req, res))
        .catch(() => caches.match(req).then((hit) => hit || caches.match('./index.html')))
    );
    return;
  }

  // Assets: primero el cache (son inmutables porque llevan hash en el nombre).
  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => guardar(req, res)))
  );
});
