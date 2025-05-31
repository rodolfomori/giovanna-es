import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from './translations';

// Criando o contexto de idioma
const LanguageContext = createContext();

// Provider para o contexto de idioma
export const LanguageProvider = ({ children }) => {
  // Verificar se há uma preferência de idioma salva ou usar o português como padrão
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'pt-BR';
  });

  // Atualizar o localStorage quando o idioma mudar
  useEffect(() => {
    localStorage.setItem('language', language);
    // Poderia adicionar aqui também um atributo lang no elemento HTML
    document.documentElement.lang = language;
  }, [language]);

  // Função para alternar entre os idiomas
  const toggleLanguage = () => {
    setLanguage(prevLang => prevLang === 'pt-BR' ? 'es-LATAM' : 'pt-BR');
  };

  // Função para obter uma tradução específica
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Retornar a chave se a tradução não for encontrada
        return key;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar o contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return context;
};