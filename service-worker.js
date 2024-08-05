self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-pwa-cache').then(cache => {
      return cache.addAll([
        '/',
        '/azu.html',
        '/me.jpg',
        '/Rock-emoji.png'
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
