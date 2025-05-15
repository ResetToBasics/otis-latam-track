// public/service-worker.js

// Versão do cache para atualizações
const CACHE_VERSION = 'otis-latam-v1';

// Recursos a serem armazenados em cache
const STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/static/js/main.chunk.js',
  // Adicione outros recursos essenciais aqui
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(STATIC_RESOURCES))
      .then(() => self.skipWaiting())
  );
});

// Ativação do Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_VERSION) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  // Se for uma API que precisa trabalhar offline
  if (event.request.url.includes('/api/checklists')) {
    event.respondWith(networkFirst(event.request));
  } else {
    // Para outros recursos, tente a rede primeiro, depois o cache
    event.respondWith(
      fetch(event.request)
        .catch(() => caches.match(event.request))
    );
  }
});

// Estratégia Network First para APIs
function networkFirst(request) {
  return fetch(request)
    .then(response => {
      // Se a resposta for válida, clone-a e armazene no cache
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_VERSION).then(cache => {
          cache.put(request, responseClone);
        });
      }
      return response;
    })
    .catch(() => {
      // Se falhar, tente buscar do cache
      return caches.match(request);
    });
}

// Gerenciamento das sincronizações pendentes
self.addEventListener('sync', event => {
  if (event.tag === 'sync-checklists') {
    event.waitUntil(syncChecklists());
  }
});

// Função para sincronizar checklists pendentes
async function syncChecklists() {
  const db = await openDB();
  const pendingChecklists = await db.getAll('pendingChecklists');

  for (const checklist of pendingChecklists) {
    try {
      const response = await fetch('/api/checklists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checklist),
      });

      if (response.ok) {
        // Se sincronizou com sucesso, remova da lista pendente
        await db.delete('pendingChecklists', checklist.id);
      }
    } catch (error) {
      console.error('Falha ao sincronizar checklist:', error);
      // Manterá no IndexedDB para tentar novamente posteriormente
    }
  }
}

// Função para abrir o IndexedDB
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('OtisOfflineDB', 1);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('pendingChecklists')) {
        db.createObjectStore('pendingChecklists', { keyPath: 'id' });
      }
    };

    request.onsuccess = event => resolve(event.target.result);
    request.onerror = event => reject(event.target.error);
  });
}