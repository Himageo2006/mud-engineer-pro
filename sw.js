/* Mud Engineer Pro — service worker (network-first so updates always win; cache = offline fallback) */
const CACHE = 'mudeng-pro-v28';
const ASSETS = ['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-maskable.svg','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./jspdf.umd.min.js','./jspdf.autotable.min.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // network-first: get the freshest copy, fall back to cache only when offline
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
  );
});
