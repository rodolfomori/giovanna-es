import React, { createContext, useState, useContext } from 'react';
import { translations } from './translations';

// Creando el contexto de idioma
const LanguageContext = createContext();

// Provider para el contexto de idioma
export const LanguageProvider = ({ children }) => {
  // No necesitamos cambiar el idioma, siempre será español
  const [language] = useState('es-LATAM');

  // Función para obtener una traducción específica
  const t = (key) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Retornar la clave si la traducción no se encuentra
        return key;
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto de idioma
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};