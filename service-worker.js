// Service Worker básico para PC Master Zone (PWA)
const CACHE_NAME = "pcmasterzone-cache-v1";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./app.js",
  "./data.js",
  "./manifest.json",
  "./imagenes/logo.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

// Instalación: guarda los archivos principales en caché
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activación: limpia cachés antiguas
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch: responde desde caché si existe, si no va a la red
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    })
  );
});
