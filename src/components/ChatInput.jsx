import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const ChatInput = ({ onSendMessage, isLoading, className = '' }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  
  // Ajustar la altura del textarea dinámicamente según el contenido
  useEffect(() => {
    if (textareaRef.current) {
      // Restablecer altura a auto para obtener el scrollHeight correcto
      textareaRef.current.style.height = 'auto';
      // Establecer nueva altura basada en el scrollHeight
      const scrollHeight = textareaRef.current.scrollHeight;
      // Establecer una altura máxima para el textarea
      const maxHeight = 150;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [message]);
  
  // Manejar envío de mensaje
  const handleSendMessage = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      // Restablecer la altura del textarea
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  // Manejar pulsaciones de teclas (Enter para enviar)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Variantes de animación para el botón de envío
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { scale: 1.05, boxShadow: '0 0 8px rgba(55, 227, 89, 0.5)' },
    tap: { scale: 0.95 }
  };

  return (
    <div className={` bg-white dark:bg-secondary-800 rounded-lg shadow-md border border-gray-200 dark:border-secondary-700 transition-all duration-300 ${className}`}>
      <div className="flex items-start p-3">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Escribe tu duda de programación..."
          className="flex-grow resize-none rounded-lg border border-gray-200 dark:border-secondary-700 outline-none focus:ring-2 focus:ring-primary focus:border-primary p-3 mr-2 min-h-[120px] bg-white dark:bg-secondary-800 text-secondary-light dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-200"
          disabled={isLoading}
        />
        <motion.button
          onClick={handleSendMessage}
          disabled={message.trim() === '' || isLoading}
          className={`mt-1 p-3 rounded-lg transition-all duration-300 ${
            message.trim() === '' || isLoading
              ? 'bg-gray-200 dark:bg-secondary-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-primary hover:bg-primary-dark text-white cursor-pointer'
          }`}
          variants={buttonVariants}
          initial="idle"
          whileHover={message.trim() !== '' && !isLoading ? "hover" : "idle"}
          whileTap={message.trim() !== '' && !isLoading ? "tap" : "idle"}
        >
          {isLoading ? (
            <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </div>
      
      {/* Consejos e información */}
      <div className="px-3 pb-3">
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <span>Presiona</span>
            <kbd className="bg-gray-100 dark:bg-secondary-700 px-1.5 py-0.5 rounded font-mono text-xs">Enter</kbd>
            <span>para enviar</span>
          </div>
          <button 
            className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors duration-200"
            title="Preguntas frecuentes"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;