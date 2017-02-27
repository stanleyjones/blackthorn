const cacheName = 'static-v0.0.1';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll([
        './',
        './static/js/bundle.js',
      ])
      .then(() => { self.skipWaiting(); })
    )
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((response) => response ? response : fetch(e.request))
  )
});
