import React, { useState, useEffect } from 'react';

/**
 * Componente para exibir uma notificação quando o usuário desbloqueia uma nova conquista
 * Pode ser usado em qualquer parte da aplicação
 */
const AchievementNotification = ({ achievement, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Fechar automaticamente após 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  if (!isVisible || !achievement) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm bg-white rounded-lg shadow-lg border border-green-200 overflow-hidden">
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-2 text-white">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zM13 10a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span className="font-bold">Nova Conquista Desbloqueada!</span>
        </div>
      </div>
      
      <div className="p-4 flex items-start">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
          <span className="text-2xl">{achievement.icon}</span>
        </div>
        <div>
          <h3 className="font-bold text-neutral-800">{achievement.name}</h3>
          <p className="text-sm text-neutral-600">{achievement.description}</p>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              +{achievement.points} pontos
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="absolute top-2 right-2 text-white hover:text-green-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default AchievementNotification;