const cacheName = "tipitaka-v1";
const staticAssets = [
  "./",
  "./index.html",
  "./index.js",
  "./css/style.css",
  "./css/layout.css",
  "./manifest.json",
  "./fonts/Verajja-Regular.ttf",
  "./assets/dhammawheel.svg",
  "./icons/menu-burger.svg",
  "./icons/menu-dots.svg",
  "./cscd/tipitaka_tree.json",
  "./cscd/vin01m.cscd.xml",
  "./helpers/",
  "./utils/",
  "./lib/",
];

self.addEventListener("install", async (e) => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  self.clients.claim();
});

self.addEventListener("fetch", async (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
