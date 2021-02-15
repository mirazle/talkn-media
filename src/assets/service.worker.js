/* eslint-disable */
const cacheName = 'pwa-talkn';

const filesToCache = ['/', '**/*'];

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service.worker.js')
    .then(function (registration) {
      // 登録成功
      console.log('[www]ServiceWorker registration successful with scope: ', registration.scope);
    })
    .catch(function (err) {
      // 登録失敗 :(
      console.log('[www]ServiceWorker registration failed: ', err);
    });
}

//console.log("SW");
// Install Service Worker
self.addEventListener('install', function (event) {
  //    console.log('[INSTALL]Service Worker: Installing.... ' + cacheName);

  event.waitUntil(
    // Open the Cache
    caches.open(cacheName).then(function (cache) {
      //            console.log('[INSTALLED]Service Worker: Caching App Shell at the moment...... ' + cacheName);

      // Add Files to the Cache
      return cache.addAll(filesToCache);
    }),
  );
});

// Fired when the Service Worker starts up
self.addEventListener('activate', function (event) {
  //console.log('Service Worker: Activating....');
  var cacheWhitelist = ['dependencies-cache-**v1**', 'dependencies-2-cache-**v1**']; // Version for your cache list
  //console.log("A");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      //            console.log("B");
      return Promise.all(
        cacheNames.map(function (cacheName) {
          //                    console.log("C");
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            //                        console.log("D");
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  //    console.log('Service Worker: Fetch', event.request.url);
  //    console.log("Url", event.request.url);

  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        if (event.request.cache !== 'only-if-cached') {
          return fetch(event.request);
        } else {
          return false;
        }
      }
    }),
  );
});
