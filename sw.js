const CACHE_NAME = 'prompt-ocean-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/blog.html',
  '/prompts.html',
  '/post-chatgpt-beginner.html',
  '/privacy-policy.html',
  '/terms-of-service.html',
  '/cookie-policy.html',
  '/assets/css/styles.css',
  '/assets/css/about.css',
  '/assets/css/blog.css',
  '/assets/css/prompt.css',
  '/assets/js/script.js',
  '/assets/js/about.js',
  '/assets/js/blog.js',
  '/assets/js/prompt.js',
  '/assets/js/logo-redirect.js',
  '/assets/img/logo.png',
  '/assets/img/favicon.png',
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
      .catch(error => {
        console.log('Cache install failed:', error);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(() => {
          // If both cache and network fail, show offline page
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any offline actions when connection is restored
  console.log('Background sync triggered');
  return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New content available!',
    icon: '/assets/img/favicon.png',
    badge: '/assets/img/favicon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Prompts',
        icon: '/assets/img/favicon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/img/favicon.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Prompt Ocean', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/prompts.html')
    );
  }
});
