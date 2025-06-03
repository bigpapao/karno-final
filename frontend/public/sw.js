// Advanced Service Worker for Karno with background sync and push notifications
const CACHE_NAME = 'karno-v1.0.0';
const API_CACHE = 'karno-api-v1.0.0';
const IMAGE_CACHE = 'karno-images-v1.0.0';

// Resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/favicon.ico'
];

// Network-first resources (always try network, fallback to cache)
const NETWORK_FIRST = [
  '/api/products',
  '/api/cart',
  '/api/orders',
  '/api/auth'
];

// Cache-first resources (images, fonts, static assets)
const CACHE_FIRST = [
  /\.(?:jpg|jpeg|png|gif|svg|webp|avif)$/,
  /\.(?:woff|woff2|eot|ttf|otf)$/,
  /\/images\//,
  /\/static\//
];

// Install event - cache static resources
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_RESOURCES)),
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      caches.keys().then(cacheNames => 
        Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== CACHE_NAME && 
              cacheName !== API_CACHE && 
              cacheName !== IMAGE_CACHE
            )
            .map(cacheName => caches.delete(cacheName))
        )
      ),
      self.clients.claim()
    ])
  );
});

// Fetch event - intelligent caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle API requests with network-first strategy
  if (NETWORK_FIRST.some(pattern => url.pathname.includes(pattern))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Handle images and static assets with cache-first strategy
  if (CACHE_FIRST.some(pattern => pattern.test ? pattern.test(url.pathname) : url.pathname.includes(pattern))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Default to stale-while-revalidate for HTML pages
  event.respondWith(staleWhileRevalidateStrategy(request));
});

// Network-first strategy with offline fallback
async function networkFirstStrategy(request) {
  const cacheName = request.url.includes('/api/') ? API_CACHE : CACHE_NAME;
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Cache-first strategy with network fallback
async function cacheFirstStrategy(request) {
  const cache = await caches.open(IMAGE_CACHE);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('Failed to fetch resource:', request.url);
    throw error;
  }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidateStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCart());
  } else if (event.tag === 'order-sync') {
    event.waitUntil(syncOrders());
  }
});

// Sync cart when back online
async function syncCart() {
  try {
    const cart = await getStoredData('pending-cart');
    if (cart) {
      await fetch('/api/cart/sync', {
        method: 'POST',
        body: JSON.stringify(cart),
        headers: { 'Content-Type': 'application/json' }
      });
      await clearStoredData('pending-cart');
    }
  } catch (error) {
    console.error('Cart sync failed:', error);
  }
}

// Sync orders when back online
async function syncOrders() {
  try {
    const orders = await getStoredData('pending-orders');
    if (orders && orders.length > 0) {
      for (const order of orders) {
        await fetch('/api/orders', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: { 'Content-Type': 'application/json' }
        });
      }
      await clearStoredData('pending-orders');
    }
  } catch (error) {
    console.error('Orders sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/badge-72x72.png',
    image: data.image,
    data: data.data,
    actions: [
      {
        action: 'view',
        title: 'مشاهده',
        icon: '/icons/view.png'
      },
      {
        action: 'dismiss',
        title: 'بستن',
        icon: '/icons/close.png'
      }
    ],
    tag: data.tag || 'default',
    renotify: true,
    requireInteraction: false,
    silent: false,
    dir: 'rtl',
    lang: 'fa'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      self.clients.openWindow(url)
    );
  }
});

// Utility functions for IndexedDB
async function getStoredData(key) {
  return new Promise((resolve) => {
    const request = indexedDB.open('karno-offline', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['data'], 'readonly');
      const store = transaction.objectStore('data');
      const getRequest = store.get(key);
      
      getRequest.onsuccess = () => resolve(getRequest.result?.value);
      getRequest.onerror = () => resolve(null);
    };
    
    request.onerror = () => resolve(null);
  });
}

async function clearStoredData(key) {
  return new Promise((resolve) => {
    const request = indexedDB.open('karno-offline', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['data'], 'readwrite');
      const store = transaction.objectStore('data');
      store.delete(key);
      
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => resolve();
    };
    
    request.onerror = () => resolve();
  });
} 