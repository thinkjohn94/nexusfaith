// Service Worker for NexusFaith - Enhanced Performance & Offline Support
const CACHE_NAME = 'nexusfaith-v1.0.0';
const STATIC_CACHE = 'nexusfaith-static-v1';
const DYNAMIC_CACHE = 'nexusfaith-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/faith-answers',
  '/about',
  '/favicon.svg',
  '/favicon.ico',
  // Add critical CSS and JS files here
];

// Assets to cache on request
const CACHEABLE_EXTENSIONS = ['html', 'css', 'js', 'json', 'woff2', 'svg', 'jpg', 'png', 'webp'];

// Network-first patterns (for dynamic content)
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\/search/
];

// Cache-first patterns (for static assets)
const CACHE_FIRST_PATTERNS = [
  /\.(css|js|woff2|svg|jpg|jpeg|png|webp|avif)$/,
  /\/assets\//
];

self.addEventListener('install', event => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully');
        return self.skipWaiting(); // Activate immediately
      })
      .catch(err => {
        console.error('[SW] Failed to cache static assets:', err);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    // Clean up old caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Service worker activated');
      return self.clients.claim(); // Take control immediately
    })
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (!url.origin.includes(self.location.origin)) return;

  // Handle different request types with appropriate strategies
  if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // Network-first for API calls and dynamic content
    event.respondWith(networkFirstStrategy(request));
  } else if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // Cache-first for static assets
    event.respondWith(cacheFirstStrategy(request));
  } else {
    // Stale-while-revalidate for pages
    event.respondWith(staleWhileRevalidateStrategy(request));
  }
});

// Network-first strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.destination === 'document') {
      return caches.match('/offline.html') || new Response('You are offline', {
        status: 503,
        statusText: 'Service Unavailable'
      });
    }
    
    throw error;
  }
}

// Cache-first strategy
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    fetch(request).then(networkResponse => {
      if (networkResponse.ok) {
        caches.open(STATIC_CACHE).then(cache => {
          cache.put(request, networkResponse);
        });
      }
    }).catch(err => console.log('[SW] Background update failed:', err));
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch asset:', request.url);
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      const cache = caches.open(DYNAMIC_CACHE);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(err => {
    console.log('[SW] Network request failed:', request.url);
    return null;
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return fetchPromise || new Response('Content unavailable offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  console.log('[SW] Background sync triggered:', event.tag);
  
  if (event.tag === 'question-submission') {
    event.waitUntil(syncQuestionSubmissions());
  }
});

async function syncQuestionSubmissions() {
  // Handle offline question submissions
  const submissions = await getStoredSubmissions();
  
  for (const submission of submissions) {
    try {
      await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission)
      });
      
      await removeStoredSubmission(submission.id);
      console.log('[SW] Synced submission:', submission.id);
    } catch (error) {
      console.error('[SW] Failed to sync submission:', submission.id, error);
    }
  }
}

async function getStoredSubmissions() {
  // Implementation would depend on IndexedDB or similar storage
  return [];
}

async function removeStoredSubmission(id) {
  // Implementation would depend on storage mechanism
}

// Push notification handling
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body || 'New content available on NexusFaith',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    tag: 'nexusfaith-notification',
    data: data.url || '/',
    actions: [
      {
        action: 'open',
        title: 'View Content',
        icon: '/favicon.svg'
      },
      {
        action: 'close',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'NexusFaith Update', options)
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// Periodic background updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'content-update') {
    event.waitUntil(updateContent());
  }
});

async function updateContent() {
  try {
    // Pre-cache new content in background
    const response = await fetch('/api/latest-content');
    if (response.ok) {
      const content = await response.json();
      const cache = await caches.open(DYNAMIC_CACHE);
      
      // Pre-cache new articles/questions
      for (const item of content.items || []) {
        cache.add(item.url);
      }
      
      console.log('[SW] Content updated in background');
    }
  } catch (error) {
    console.error('[SW] Background content update failed:', error);
  }
}

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PERFORMANCE_REPORT') {
    // Handle performance metrics from client
    console.log('[SW] Performance report:', event.data.metrics);
    
    // In production, send to analytics endpoint
    // fetch('/api/analytics/performance', {
    //   method: 'POST',
    //   body: JSON.stringify(event.data.metrics)
    // });
  }
});

// Cache usage monitoring
setInterval(async () => {
  try {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const clone = response.clone();
          const buffer = await clone.arrayBuffer();
          totalSize += buffer.byteLength;
        }
      }
    }
    
    console.log(`[SW] Total cache size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Clean up if cache gets too large (>50MB)
    if (totalSize > 50 * 1024 * 1024) {
      console.log('[SW] Cache size exceeded limit, cleaning up...');
      await cleanupOldCaches();
    }
  } catch (error) {
    console.error('[SW] Cache monitoring failed:', error);
  }
}, 60000); // Check every minute

async function cleanupOldCaches() {
  const cache = await caches.open(DYNAMIC_CACHE);
  const requests = await cache.keys();
  
  // Remove oldest 25% of cached items
  const toRemove = requests.slice(0, Math.floor(requests.length * 0.25));
  
  for (const request of toRemove) {
    await cache.delete(request);
  }
  
  console.log(`[SW] Removed ${toRemove.length} old cache entries`);
}