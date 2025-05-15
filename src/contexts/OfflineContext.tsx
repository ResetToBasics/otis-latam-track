// src/contexts/OfflineContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';

interface OfflineContextType {
  isOnline: boolean;
  saveOfflineData: (storeName: string, data: any) => Promise<void>;
  getOfflineData: (storeName: string, id?: string) => Promise<any>;
  syncPendingData: () => Promise<void>;
  pendingActions: number;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline deve ser usado dentro de um OfflineProvider');
  }
  return context;
};

export const OfflineProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState(0);
  const [db, setDb] = useState<IDBDatabase | null>(null);

  // Inicializar o banco de dados IndexedDB
  useEffect(() => {
    const request = indexedDB.open('OtisOfflineDB', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Lojas para diferentes tipos de dados
      if (!db.objectStoreNames.contains('pendingChecklists')) {
        db.createObjectStore('pendingChecklists', { keyPath: 'id' });
      }

      if (!db.objectStoreNames.contains('formResponses')) {
        db.createObjectStore('formResponses', { keyPath: 'id' });
      }

      // Adicione outras stores conforme necessário
    };

    request.onsuccess = (event) => {
      setDb((event.target as IDBOpenDBRequest).result);

      // Contar ações pendentes
      countPendingActions((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      console.error('Erro ao abrir o banco de dados:', (event.target as IDBOpenDBRequest).error);
    };

    // Limpar ao desmontar
    return () => {
      if (db) {
        db.close();
      }
    };
  }, []);

  // Monitorar o estado da conexão
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (db) {
        // Tentar sincronizar quando voltar online
        syncPendingData();
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [db]);

  // Contar ações pendentes de todas as stores
  const countPendingActions = async (database: IDBDatabase) => {
    let count = 0;

    for (const storeName of database.objectStoreNames) {
      const transaction = database.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const countRequest = store.count();

      countRequest.onsuccess = () => {
        count += countRequest.result;
        setPendingActions(count);
      };
    }
  };

  // Salvar dados para uso offline
  const saveOfflineData = async (storeName: string, data: any): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Banco de dados não inicializado'));
        return;
      }

      try {
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);

        const request = store.put(data);

        request.onsuccess = () => {
          // Atualizar contador de ações pendentes
          countPendingActions(db);
          resolve();
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  // Obter dados armazenados offline
  const getOfflineData = async (storeName: string, id?: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject(new Error('Banco de dados não inicializado'));
        return;
      }

      try {
        const transaction = db.transaction(storeName, 'readonly');
        const store = transaction.objectStore(storeName);

        let request;

        if (id) {
          // Buscar um item específico
          request = store.get(id);
        } else {
          // Buscar todos os itens
          request = store.getAll();
        }

        request.onsuccess = () => {
          resolve(request.result);
        };

        request.onerror = () => {
          reject(request.error);
        };
      } catch (error) {
        reject(error);
      }
    });
  };

  // Sincronizar dados pendentes com o servidor
  const syncPendingData = async (): Promise<void> => {
    if (!db || !isOnline) return;

    try {
      // Sincronizar checklists pendentes
      const pendingChecklists = await getOfflineData('pendingChecklists');

      for (const checklist of pendingChecklists) {
        try {
          // Tenta enviar para o servidor
          const response = await fetch('/api/checklists', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(checklist),
          });

          if (response.ok) {
            // Se sucesso, remove do armazenamento local
            const transaction = db.transaction('pendingChecklists', 'readwrite');
            const store = transaction.objectStore('pendingChecklists');
            store.delete(checklist.id);
          }
        } catch (error) {
          console.error('Erro ao sincronizar checklist:', error);
          // Falhou, mantém no banco para tentar depois
        }
      }

      // Adicione sincronização para outros tipos de dados...

      // Atualizar contagem de pendências após sincronização
      countPendingActions(db);
    } catch (error) {
      console.error('Erro durante sincronização:', error);
    }
  };

  // Registrar para Background Sync se disponível
  useEffect(() => {
    if ('serviceWorker' in navigator && 'SyncManager' in window && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('sync-checklists');
      });
    }
  }, [pendingActions]);

  const value = {
    isOnline,
    saveOfflineData,
    getOfflineData,
    syncPendingData,
    pendingActions
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};