// Chronos service worker
const VERSION = 'chronos-v4';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first for HTML, cache-first for static assets
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  e.respondWith(
    (async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(VERSION);
        if (req.mode === 'navigate' || /\.(html|webmanifest|svg|png)$/.test(url.pathname)) {
          cache.put(req, fresh.clone());
        }
        return fresh;
      } catch (_) {
        const cache = await caches.open(VERSION);
        const cached = await cache.match(req, { ignoreSearch: true });
        if (cached) return cached;
        if (req.mode === 'navigate') return cache.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      }
    })()
  );
});
