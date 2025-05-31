import React from 'react';
import { motion } from 'framer-motion';

const SuggestedTopics = ({ onSelectTopic }) => {
  // Lista de tópicos sugeridos com ícones e descrições
  const topics = [
    {
      id: 'html-tags',
      title: 'Principais tags HTML',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'Conheça as tags HTML essenciais para criar sua primeira página',
      prompt: 'Quais são as principais tags HTML que eu preciso conhecer como iniciante? Explique para que serve cada uma delas.'
    },
    {
      id: 'css-basics',
      title: 'Propriedades CSS',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.172-2.172a2 2 0 010-2.828L7.343 11" />
        </svg>
      ),
      description: 'Aprenda a estilizar suas páginas com as propriedades CSS mais úteis',
      prompt: 'Quais são as principais propriedades de CSS que todo iniciante deveria aprender? Por favor, dê exemplos básicos de uso.'
    },
    {
      id: 'understand-code',
      title: 'Entendendo Código',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      description: 'Aprenda a entender e analisar códigos existentes',
      prompt: 'Como posso aprender a ler e entender códigos existentes em HTML, CSS e JavaScript? Quais são as principais partes que devo observar e como posso praticar isso?'
    },
    {
      id: 'js-basics',
      title: 'JavaScript Básico',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: 'Comece com JavaScript e torne suas páginas interativas',
      prompt: 'Quais são os conceitos básicos de JavaScript que eu deveria aprender como iniciante? Por favor, explique variáveis, funções, condicionais e eventos de forma simples.'
    },
    {
      id: 'responsive-design',
      title: 'Design Responsivo',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Aprenda a criar sites que funcionam em qualquer dispositivo',
      prompt: 'O que é design responsivo e como posso fazer com que meu site se adapte a diferentes tamanhos de tela? Quais são as técnicas básicas que eu deveria conhecer?'
    },
    {
      id: 'first-project',
      title: 'Projeto Iniciante',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      description: 'Ideias e dicas para seu primeiro projeto web',
      prompt: 'Quais são bons projetos simples para iniciantes em desenvolvimento web? Preciso de ideias para praticar HTML, CSS e JavaScript básico.'
    }
  ];

  // Variantes para animação de container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Variantes para animação dos cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 transition-colors duration-200">
        Tópicos Sugeridos
      </h3>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topics.map((topic) => (
          <motion.button
            key={topic.id}
            className="flex flex-col h-full p-5 bg-white dark:bg-secondary-800 rounded-xl border border-gray-100 dark:border-secondary-700 hover:border-primary dark:hover:border-primary shadow-sm transition-all duration-300 text-left"
            onClick={() => onSelectTopic(topic.prompt)}
            variants={cardVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <div className="text-primary mb-3">{topic.icon}</div>
            <div>
              <h4 className="font-bold text-secondary dark:text-white mb-2 transition-colors duration-200">{topic.title}</h4>
              <p className="text-sm text-secondary-light dark:text-gray-400 transition-colors duration-200">{topic.description}</p>
            </div>
            
    
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
};

export default SuggestedTopics;