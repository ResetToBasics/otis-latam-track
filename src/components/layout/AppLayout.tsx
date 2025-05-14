import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

const AppLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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