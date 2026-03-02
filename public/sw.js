// NexusFaith Service Worker for Offline Reading
// Version 1.0 - Optimized for apologetics content

const CACHE_NAME = 'nexusfaith-v1';
const OFFLINE_PAGE = '/offline.html';

// Essential files to cache for offline functionality
const ESSENTIAL_FILES = [
  '/',
  '/faith-answers',
  '/about',
  '/faq',
  '/offline.html',
  '/manifest.json',
  // Add critical CSS and JS files
  // Note: Astro build generates these with hashes, so we'll cache them dynamically
];

// Content that should be cached for offline reading
const CONTENT_PATTERNS = [
  /\/faith-answers/,
  /\/about/,
  /\/cosmology/,
  /\/biology/,
  /\/faq/,
  /\/conversation-trainer/
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('[SW] Install event');
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching essential files');
      return cache.addAll(ESSENTIAL_FILES).catch(err => {
        console.warn('[SW] Failed to cache some essential files:', err);
        // Don't fail installation if some files can't be cached
        return Promise.resolve();
      });
    })
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activate event');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName !== CACHE_NAME)
          .map(cacheName => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  
  try {
    // Try network first for HTML pages (for fresh content)
    if (request.headers.get('Accept')?.includes('text/html')) {
      return await networkFirstStrategy(request);
    }
    
    // Cache first for assets (CSS, JS, images)
    if (isStaticAsset(url.pathname)) {
      return await cacheFirstStrategy(request);
    }
    
    // Default: network first with cache fallback
    return await networkFirstStrategy(request);
    
  } catch (error) {
    console.error('[SW] Fetch failed:', error);
    return await handleOffline(request);
  }
}

// Network-first strategy for HTML content
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses for content pages
    if (networkResponse.ok && shouldCache(request.url)) {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
    
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Cache-first strategy for static assets
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Not in cache, fetch from network and cache
  const networkResponse = await fetch(request);
  if (networkResponse.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // Try to serve from cache first
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // For HTML requests, serve offline page
  if (request.headers.get('Accept')?.includes('text/html')) {
    const offlineResponse = await caches.match(OFFLINE_PAGE);
    if (offlineResponse) {
      return offlineResponse;
    }
  }
  
  // Return generic offline response
  return new Response(
    JSON.stringify({
      error: 'Content not available offline',
      message: 'Please check your internet connection and try again.'
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

// Helper functions
function shouldCache(url) {
  return CONTENT_PATTERNS.some(pattern => pattern.test(url));
}

function isStaticAsset(pathname) {
  return /\.(css|js|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot|ico)$/i.test(pathname);
}

// Background sync for form submissions (future enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    // Handle background tasks when connection returns
  }
});

// Handle push notifications (future enhancement)
self.addEventListener('push', (event) => {
  console.log('[SW] Push received');
  
  const options = {
    body: 'New apologetics content available!',
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    tag: 'nexusfaith-update'
  };
  
  event.waitUntil(
    self.registration.showNotification('NexusFaith Update', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service Worker loaded successfully');