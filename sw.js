const CACHE_NAME = 'cat-pet-v1.0';
const urlsToCache = [
  '/',
  '/cute-cat-pet.html',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Push notification event
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Time to take care of your cat!',
    icon: '/icon-192x192.png',
    badge: '/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'feed',
        title: 'Feed Cat',
        icon: '/feed-icon.png'
      },
      {
        action: 'play',
        title: 'Play with Cat',
        icon: '/play-icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Cat Care Reminder', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'feed') {
    // Open app and trigger feed action
    event.waitUntil(
      clients.openWindow('/cute-cat-pet.html?action=feed')
    );
  } else if (event.action === 'play') {
    // Open app and trigger play action
    event.waitUntil(
      clients.openWindow('/cute-cat-pet.html?action=play')
    );
  } else {
    // Default: just open the app
    event.waitUntil(
      clients.openWindow('/cute-cat-pet.html')
    );
  }
});

// Background sync for data persistence
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Sync cat data to server if needed
  try {
    const catData = await getCatData();
    await syncToServer(catData);
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

async function getCatData() {
  // Get cat data from IndexedDB or localStorage
  return new Promise((resolve) => {
    // This would be implemented with actual data retrieval
    resolve({});
  });
}

async function syncToServer(data) {
  // Sync data to server
  // This would be implemented with actual server sync
  console.log('Syncing data to server:', data);
} 