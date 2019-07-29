var cacheName = 'KidsasobibaShell';

 // オフライン用にキャッシュするファイルリスト
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/jquery-3.4.1.min.js',
    '/styles/app.css'
];

  // PWAとして動かすには以下の３つのイベントに対するリスナーが必須

  //１．installイベント。オフライン用のキャッシュの保存などを実行
self.addEventListener('install', function(event) {
  console.log('ServiceWorker installing');
  // キャッシュのインストール終わるまで非同期で待つ
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service Worker caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

  //２．activateイベント。ServiceWorker起動時。キャッシュの更新チェックなど
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating');
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('Service Worker removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

  // ３．fetchイベント。HTMLファイル等からのリクエスト時に発生。
  //   リクエストを横取りしてキャッシュファイルに渡す。（キャッシュになければネットワークに取りに行く）
self.addEventListener('fetch', function(event) {
  console.log('Service Worker fetching ', event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

  // ４． プッシュ通知受信イベント。
self.addEventListener('push',function(event) {
  console.log('Push Notification Recieved', event);
  if (Notification.permission == 'granted') {
    event.waitUntil(
      self.registration.showNotification('プッシュ通知を受信しました！！', {
        body: "お知らせです",
        icon: "kid60.png"
      }).then(function(showEvent) {
        console.log('お知らせです', showEvent)
      }, function(error) {
        console.log(error);
      })
    );
  }
});

  // 5.　通知表示をタップしたイベント
self.addEventListener('notificationclick', function(event) {
  console.log('Notification Clicked.', event.notification.tag);
  event.notification.close();
});
