// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Definir as traduções diretamente como objetos JS
const translationPT = {
  common: {
    search: "Buscar",
    projects: "Projetos",
    clients: "Clientes",
    dashboard: "Dashboard",
    operations: "Operações",
    quality: "Qualidade",
    feedback: "Feedback",
    settings: "Configurações",
    save: "Salvar",
    cancel: "Cancelar",
    delete: "Excluir",
    edit: "Editar",
    details: "Detalhes",
    add: "Adicionar",
    filter: "Filtrar",
    moreFilters: "Mais Filtros"
  },
  topbar: {
    searchPlaceholder: "Buscar projetos, clientes, instalações...",
    selectLanguage: "Selecione o Idioma",
    notifications: "Notificações",
    newNotifications: "novas",
    viewAllNotifications: "Ver todas as notificações",
    myProfile: "Meu Perfil",
    preferences: "Preferências",
    logout: "Sair"
  }
};

const translationES = {
  common: {
    search: "Buscar",
    projects: "Proyectos",
    clients: "Clientes",
    dashboard: "Dashboard",
    operations: "Operaciones",
    quality: "Calidad",
    feedback: "Feedback",
    settings: "Configuraciones",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    details: "Detalles",
    add: "Añadir",
    filter: "Filtrar",
    moreFilters: "Más Filtros"
  },
  topbar: {
    searchPlaceholder: "Buscar proyectos, clientes, instalaciones...",
    selectLanguage: "Seleccione Idioma",
    notifications: "Notificaciones",
    newNotifications: "nuevas",
    viewAllNotifications: "Ver todas las notificaciones",
    myProfile: "Mi Perfil",
    preferences: "Preferencias",
    logout: "Cerrar Sesión"
  }
};

const translationEN = {
  common: {
    search: "Search",
    projects: "Projects",
    clients: "Clients",
    dashboard: "Dashboard",
    operations: "Operations",
    quality: "Quality",
    feedback: "Feedback",
    settings: "Settings",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    details: "Details",
    add: "Add",
    filter: "Filter",
    moreFilters: "More Filters"
  },
  topbar: {
    searchPlaceholder: "Search projects, clients, installations...",
    selectLanguage: "Select Language",
    notifications: "Notifications",
    newNotifications: "new",
    viewAllNotifications: "View all notifications",
    myProfile: "My Profile",
    preferences: "Preferences",
    logout: "Log Out"
  }
};

// Recursos de tradução por idioma
const resources = {
  pt: {
    translation: translationPT
  },
  es: {
    translation: translationES
  },
  en: {
    translation: translationEN
  }
};

// Configuração do i18next
i18n
  .use(LanguageDetector) // Detecta automaticamente o idioma do navegador
  .use(initReactI18next) // Integração com o React
  .init({
    resources,
    fallbackLng: 'pt', // Idioma padrão caso não seja possível determinar
    debug: process.env.NODE_ENV === 'development',

    interpolation: {
      escapeValue: false, // React já escapa valores, então não é necessário
    },

    // Configurações de detecção de idioma
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;