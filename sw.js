self.addEventListener('install', e => {
  e.waitUntil(
    caches.open("static").then(cache => {
      return cache.addAll(["./", "./public/index.html", "./public/login.html", "./public/register.html", "./public/404.html", "./public/script/index.js", "./public/script/taskClass.js"]);
    })
  );
});


self.addEventListener("fetch", e => {
  e.respondWith(
      caches.match(e.request).then(response => {
          return response || fetch(e.request);
      })
  );
});
