import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { useOffline } from '@/contexts/OfflineContext'; // Importar o hook de contexto offline
import { Badge } from '@/components/ui/badge';
import { WifiOff, Upload } from 'lucide-react';

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { isOnline, pendingActions } = useOffline(); // Usar o hook para obter estado offline

  // Simula carregamento inicial e também ao trocar de rota
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="flex h-screen w-full bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />

          {/* Indicador de modo offline */}
          {!isOnline && (
            <div className="bg-yellow-50 border-b border-yellow-200 py-2 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <WifiOff className="h-4 w-4 text-yellow-700 mr-2" />
                <span className="text-sm text-yellow-800 font-medium">
                  Modo Offline - Os dados serão sincronizados quando a conexão for restaurada
                </span>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                Offline
              </Badge>
            </div>
          )}

          {/* Indicador de itens pendentes para sincronização */}
          {isOnline && pendingActions > 0 && (
            <div className="bg-blue-50 border-b border-blue-200 py-2 px-4 flex items-center justify-between">
              <div className="flex items-center">
                <Upload className="h-4 w-4 text-blue-700 mr-2" />
                <span className="text-sm text-blue-800 font-medium">
                  Sincronizando dados ({pendingActions} {pendingActions === 1 ? 'item pendente' : 'itens pendentes'})
                </span>
              </div>
              <button
                className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-medium rounded transition-colors"
                onClick={() => window.location.href = '/offline-operations'}
              >
                Ver detalhes
              </button>
            </div>
          )}

          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#00529b] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent border-r-transparent border-b-transparent border-l-[#00529b] animate-spin animation-delay-150"></div>
                  </div>
                  <p className="text-sm mt-3 text-gray-500">Carregando...</p>
                </div>
              </div>
            ) : (
              <div className="animate-fade-in">
                <Outlet />
              </div>
            )}
          </main>
          <footer className="py-2 px-6 bg-white border-t text-center text-xs text-gray-500">
            OTIS LATAM Tracker © {new Date().getFullYear()} | Versão 1.0.0
          </footer>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  );
};

export default AppLayout;