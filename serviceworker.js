const CACHE_NAME = 'my-pwa-cache-v1';
const urlsToCache = [
  '/rps.html',
  '/rps.css',
  '/rps.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if available, otherwise fetch from network
        return response || fetch(event.request);
      }).catch(() => {
        // If both fail, show a fallback offline page
        return caches.match('/rps.html');
      })
  );
});

// Activate event to delete old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});