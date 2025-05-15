// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Operations from "./pages/Operations";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Quality from "./pages/Quality";
import ClientPortal from "./pages/ClientPortal";
import Feedback from "./pages/Feedback";
import CountryComparisonAnalytics from "./pages/CountryComparisonAnalytics";
import LoginPage from "./pages/LoginPage";
import OfflineOperations from "./pages/OfflineOperations"; // Importe a nova página de operações offline
// Adicione estes imports para i18n
import { LanguageProvider } from "./contexts/LanguageContext";
import { OfflineProvider } from "./contexts/OfflineContext"; // Importe o novo provider
import "./i18n/i18n"; // Importe a configuração do i18n

// Páginas temporárias para as rotas não implementadas
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6">
    <h1 className="text-3xl font-bold mb-4">{title}</h1>
    <p className="text-muted-foreground">Esta página está em desenvolvimento.</p>
  </div>
);

// Componente para proteger rotas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Verificar se o usuário está autenticado
  const isAuthenticated = localStorage.getItem("otis-auth") !== null;

  // Redirecionar para login se não estiver autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  // Estado para controlar autenticação no aplicativo
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar autenticação ao iniciar o aplicativo
  useEffect(() => {
    const authData = localStorage.getItem("otis-auth");
    setIsAuthenticated(authData !== null);

    // Listener para mudanças no localStorage (logout em outras abas)
    const handleStorageChange = () => {
      const authData = localStorage.getItem("otis-auth");
      setIsAuthenticated(authData !== null);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <OfflineProvider> {/* Adicione o OfflineProvider aqui para habilitar funcionalidade offline */}
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Rota de Login - acessível sem autenticação */}
                <Route path="/login" element={<LoginPage />} />

                {/* Portal do Cliente - mantido fora do AppLayout */}
                <Route path="/client-portal" element={<ClientPortal />} />

                {/* Rotas protegidas dentro do AppLayout */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Index />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="operations" element={<Operations />} />
                  <Route path="offline-operations" element={<OfflineOperations />} /> {/* Nova rota para operações offline */}
                  <Route path="quality" element={<Quality />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="feedback" element={<Feedback />} />
                  <Route path="countries" element={<CountryComparisonAnalytics />} />
                  <Route path="settings" element={<Settings />} />
                </Route>

                {/* Rota de página não encontrada */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </OfflineProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;