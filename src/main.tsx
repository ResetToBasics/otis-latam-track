import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Renderizar a aplicação React
createRoot(document.getElementById("root")!).render(<App />);

// Registrar o Service Worker para funcionalidade offline
if ('serviceWorker' in navigator && 'SyncManager' in window) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration.scope);
      })
      .catch(error => {
        console.log('Falha ao registrar o Service Worker:', error);
      });
  });
}