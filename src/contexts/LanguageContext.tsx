// src/contexts/LanguageContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import i18n from '../i18n/i18n';

type LanguageContextType = {
  currentLanguage: string;
  changeLanguage: (lang: string) => void;
  languages: { code: string; name: string; flag: string }[];
};

const defaultLanguages = [
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'pt',
  changeLanguage: () => {},
  languages: defaultLanguages
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'pt');

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  };

  useEffect(() => {
    const handleLanguageChanged = () => {
      setCurrentLanguage(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages: defaultLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);