self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-pwa-cache').then(cache => {
      return cache.addAll([
        '/uz10',
        '/uz10/azu.html',
        '/uz10/me.jpg',
        '/uz10/imgs/Rock-emoji.png'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
