const CACHE_NAME = "my-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/src/pages/Menu.jsx"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => {
        console.error("Cache addAll failed:", error);
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/yelp")) {
    // Handle API requests
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Return cached response if available
        }
        return fetch(event.request)
          .then((response) => {
            // Clone the response to cache it
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
            return response;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            return new Response("Failed to fetch", {
              status: 503,
              statusText: "Service Unavailable",
            });
          });
      })
    );
  } else {
    // Handle other requests
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
        .catch((error) => {
          console.error("Fetch failed:", error);
        })
    );
  }
});
