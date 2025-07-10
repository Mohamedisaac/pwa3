
const CACHE_NAME = 'pwa-dictionary-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') {
      return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request)
        .then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            // If the request is for an asset or a dictionary, cache it
            if (event.request.url.includes('/dictionaries/') || event.request.url.includes('/assets/')) {
               cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });

          return response || fetchPromise;
        });
    })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
