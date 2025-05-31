import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../assets/devclub-logo.png'
import Giovanna from '../assets/giovanna.png'

const WelcomeModal = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  // Features que o usuário pode usar
  const features = [
    {
      title: "Tire dúvidas de código",
      description: "Pergunte sobre HTML, CSS, JavaScript ou qualquer conceito de programação",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Pratique programação",
      description: "Receba exercícios e desafios para praticar suas habilidades de codificação",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: "Receba explicações detalhadas",
      description: "Entenda conceitos complexos com explicações passo a passo e exemplos práticos",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Melhore seus projetos",
      description: "Obtenha sugestões para melhorar seu código e boas práticas de desenvolvimento",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  // Avançar para o próximo passo
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  // Voltar ao passo anterior
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Variantes de animação para o modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Variantes de animação para o conteúdo do passo
  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-secondary-900/70 backdrop-blur-sm">
      <motion.div 
        className="bg-white dark:bg-secondary-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-md"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white">
          <div className="flex items-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mr-4">
                <img src={Logo} className="w-12 rounded-full"/>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bem-vindo ao Chat Giovanna</h2>
              <p className="text-white/80">Sua assistente de programação</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="welcome"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
                <div className="w-full h-60 rounded-full overflow-hidden border-2 transition-all duration-300 border-primary">
                <img src={Giovanna} className='w-full h-full object-cover'/>
                </div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">Olá! Sou a Giovanna</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Estou aqui para ajudar em sua jornada de aprendizado em programação. 
                  Vamos ver o que podemos fazer juntos!
                </p>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="features"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">O que você pode fazer aqui:</h3>
                <div className="space-y-4">
                  {features.slice(0, 2).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-secondary dark:text-white">{feature.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="more-features"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">E também:</h3>
                <div className="space-y-4">
                  {features.slice(2, 4).map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {feature.icon}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-secondary dark:text-white">{feature.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="get-started"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center"
              >
           <div className="w-full h-60 rounded-full overflow-hidden border-2 transition-all duration-300 border-primary">
                <img src={Giovanna} className='w-full h-full object-cover'/>
                </div>
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">Vamos começar!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Estou pronta para responder suas perguntas sobre programação.
                  Basta digitar sua dúvida no campo abaixo e vamos iniciar nossa conversa!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Rodapé com navegação */}
        <div className="p-4 bg-gray-50 dark:bg-secondary-900 border-t border-gray-200 dark:border-secondary-700 flex justify-between items-center">
          {/* Indicadores de passo */}
          <div className="flex space-x-1">
            {[...Array(totalSteps)].map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full ${
                  i + 1 === step 
                    ? 'bg-primary' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          {/* Botões */}
          <div className="flex space-x-2">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
              >
                Voltar
              </button>
            )}
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
            >
              {step < totalSteps ? 'Próximo' : 'Começar'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Decoração de fundo */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
    </div>
  );
};

export default WelcomeModal;