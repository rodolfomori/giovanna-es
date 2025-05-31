import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserStats } from '../utils/achievementSystem';

/**
 * Componente que exibe um caminho de aprendizado organizado para guiar
 * el progreso del usuario a través de contenidos en orden recomendado
 */
const LearningPath = () => {
  const [userStats, setUserStats] = useState(null);
  const [activeTab, setActiveTab] = useState('html');
  const [expandedModule, setExpandedModule] = useState(null);

  // Carregar estatísticas do usuário
  useEffect(() => {
    const stats = getUserStats();
    setUserStats(stats);
  }, []);

  // Verificar se um desafio já foi concluído
  const isCompleted = (challengeId) => {
    if (!userStats) return false;
    return userStats.completedChallenges.some(c => c.id === challengeId);
  };

  // Obter progresso de um módulo
  const getModuleProgress = (moduleChallenges) => {
    if (!userStats) return 0;
    
    const completedCount = moduleChallenges.filter(c => 
      isCompleted(c.id)
    ).length;
    
    return Math.round((completedCount / moduleChallenges.length) * 100);
  };

  // Definição dos caminhos de aprendizado por tema
  const learningPaths = {
    html: [
      {
        id: 'html-basics',
        title: 'Fundamentos de HTML',
        description: 'Aprenda la estructura básica de una página HTML y las etiquetas esenciales',
        level: 'Iniciante',
        estimatedTime: '2 horas',
        progress: 0,
        challenges: [
          { id: 'html-intro-1', title: 'Estructura HTML básica', type: 'multipleChoice' },
          { id: 'html-intro-2', title: 'Etiquetas esenciales', type: 'multipleChoice' },
          { id: 'html-intro-3', title: 'Elementos de texto', type: 'codeCompletion' },
          { id: 'html-intro-4', title: 'Enlaces y anclas', type: 'codeCompletion' },
          { id: 'html-intro-5', title: 'Imágenes y multimedia', type: 'multipleChoice' }
        ]
      },
      {
        id: 'html-forms',
        title: 'Formularios HTML',
        description: 'Aprenda a crear formularios interactivos para recopilar datos de los usuarios',
        level: 'Intermediário',
        estimatedTime: '3 horas',
        progress: 0,
        challenges: [
          { id: 'html-forms-1', title: 'Estructura de formularios', type: 'multipleChoice' },
          { id: 'html-forms-2', title: 'Tipos de input', type: 'multipleChoice' },
          { id: 'html-forms-3', title: 'Validación de formularios', type: 'codeCompletion' },
          { id: 'html-forms-4', title: 'Botones y envío', type: 'codeCompletion' },
          { id: 'html-forms-5', title: 'Elementos avanzados', type: 'multipleChoice' }
        ]
      },
      {
        id: 'html-semantic',
        title: 'HTML Semántico',
        description: 'Aprenda a estructurar su documento de forma significativa y accesible',
        level: 'Intermediário',
        estimatedTime: '2 horas',
        progress: 0,
        challenges: [
          { id: 'html-semantic-1', title: 'Etiquetas semánticas', type: 'multipleChoice' },
          { id: 'html-semantic-2', title: 'Estructura de página', type: 'codeCompletion' },
          { id: 'html-semantic-3', title: 'Accesibilidad básica', type: 'multipleChoice' },
          { id: 'html-semantic-4', title: 'SEO con HTML', type: 'multipleChoice' }
        ]
      }
    ],
    css: [
      {
        id: 'css-basics',
        title: 'Fundamentos de CSS',
        description: 'Aprenda a estilizar elementos HTML con propiedades básicas de CSS',
        level: 'Iniciante',
        estimatedTime: '3 horas',
        progress: 0,
        challenges: [
          { id: 'css-intro-1', title: 'Sintaxis CSS', type: 'multipleChoice' },
          { id: 'css-intro-2', title: 'Selectores básicos', type: 'multipleChoice' },
          { id: 'css-intro-3', title: 'Colores y fondos', type: 'codeCompletion' },
          { id: 'css-intro-4', title: 'Fuente y texto', type: 'codeCompletion' },
          { id: 'css-intro-5', title: 'Márgenes y padding', type: 'multipleChoice' }
        ]
      },
      {
        id: 'css-layout',
        title: 'Layout con CSS',
        description: 'Aprenda a posicionar elementos en la página usando diferentes técnicas',
        level: 'Intermediário',
        estimatedTime: '4 horas',
        progress: 0,
        challenges: [
          { id: 'css-layout-1', title: 'Box Model', type: 'multipleChoice' },
          { id: 'css-layout-2', title: 'Posicionamiento', type: 'multipleChoice' },
          { id: 'css-layout-3', title: 'Flexbox básico', type: 'codeCompletion' },
          { id: 'css-layout-4', title: 'Grid básico', type: 'codeCompletion' },
          { id: 'css-layout-5', title: 'Layouts responsivos', type: 'multipleChoice' }
        ]
      },
      {
        id: 'css-advanced',
        title: 'CSS Avanzado',
        description: 'Aprenda técnicas avanzadas para estilización y animaciones',
        level: 'Avançado',
        estimatedTime: '5 horas',
        progress: 0,
        challenges: [
          { id: 'css-advanced-1', title: 'Transiciones', type: 'multipleChoice' },
          { id: 'css-advanced-2', title: 'Animaciones', type: 'codeCompletion' },
          { id: 'css-advanced-3', title: 'Transformaciones', type: 'codeCompletion' },
          { id: 'css-advanced-4', title: 'Variáveis CSS', type: 'multipleChoice' },
          { id: 'css-advanced-5', title: 'Media Queries avançadas', type: 'codeCompletion' }
        ]
      }
    ],
    javascript: [
      {
        id: 'js-basics',
        title: 'Fundamentos do JavaScript',
        description: 'Aprenda os conceitos básicos de programação com JavaScript',
        level: 'Iniciante',
        estimatedTime: '4 horas',
        progress: 0,
        challenges: [
          { id: 'js-intro-1', title: 'Variáveis e tipos', type: 'multipleChoice' },
          { id: 'js-intro-2', title: 'Operadores', type: 'multipleChoice' },
          { id: 'js-intro-3', title: 'Condicionais', type: 'codeCompletion' },
          { id: 'js-intro-4', title: 'Loops', type: 'codeCompletion' },
          { id: 'js-intro-5', title: 'Funções básicas', type: 'codeCompletion' }
        ]
      },
      {
        id: 'js-dom',
        title: 'Manipulação do DOM',
        description: 'Aprenda a interagir com elementos HTML usando JavaScript',
        level: 'Intermediário',
        estimatedTime: '4 horas',
        progress: 0,
        challenges: [
          { id: 'js-dom-1', title: 'Selección de elementos', type: 'multipleChoice' },
          { id: 'js-dom-2', title: 'Manipular contenido', type: 'codeCompletion' },
          { id: 'js-dom-3', title: 'Eventos', type: 'codeCompletion' },
          { id: 'js-dom-4', title: 'Formularios con JS', type: 'codeCompletion' },
          { id: 'js-dom-5', title: 'Animaciones simples', type: 'codeCompletion' }
        ]
      },
      {
        id: 'js-advanced',
        title: 'JavaScript Avanzado',
        description: 'Aprenda conceitos avançados e técnicas modernas de JavaScript',
        level: 'Avançado',
        estimatedTime: '6 horas',
        progress: 0,
        challenges: [
          { id: 'js-advanced-1', title: 'Arrays e métodos', type: 'multipleChoice' },
          { id: 'js-advanced-2', title: 'Objetos e classes', type: 'codeCompletion' },
          { id: 'js-advanced-3', title: 'Assincronismo', type: 'codeCompletion' },
          { id: 'js-advanced-4', title: 'Fetch API', type: 'codeCompletion' },
          { id: 'js-advanced-5', title: 'ES6+ Features', type: 'multipleChoice' }
        ]
      }
    ]
  };

  // Atualizar progresso para cada módulo
  useEffect(() => {
    if (userStats) {
      Object.keys(learningPaths).forEach(pathKey => {
        learningPaths[pathKey].forEach(module => {
          module.progress = getModuleProgress(module.challenges);
        });
      });
    }
  }, [userStats]);

  // Badge de nível
  const LevelBadge = ({ level }) => {
    let bgColor = 'bg-green-100 text-green-800';
    
    if (level === 'Intermediário') {
      bgColor = 'bg-yellow-100 text-yellow-800';
    } else if (level === 'Avanzado') {
      bgColor = 'bg-red-100 text-red-800';
    }
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor}`}>
        {level}
      </span>
    );
  };

  // Toggle expand/collapse para um módulo
  const toggleModule = (moduleId) => {
    if (expandedModule === moduleId) {
      setExpandedModule(null);
    } else {
      setExpandedModule(moduleId);
    }
  };

  // Renderizar desafios de um módulo
  const renderChallenges = (challenges) => {
    return (
      <div className="mt-4 ml-6 space-y-2">
        {challenges.map((challenge, index) => (
          <div 
            key={challenge.id} 
            className={`flex items-center p-3 rounded-lg border ${
              isCompleted(challenge.id)
                ? 'bg-green-50 border-green-200'
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div className="mr-3">
              {isCompleted(challenge.id) ? (
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-medium">
                  {index + 1}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-neutral-800">{challenge.title}</h4>
              <div className="flex items-center mt-1">
                <span className={`text-xs ${
                  challenge.type === 'multipleChoice' 
                    ? 'text-indigo-600' 
                    : 'text-pink-600'
                }`}>
                  {challenge.type === 'multipleChoice' ? 'Múltipla escolha' : 'Completar código'}
                </span>
              </div>
            </div>
            
            <Link 
              to={`/desafios?id=${challenge.id}`}
              className="px-3 py-1 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
            >
              {isCompleted(challenge.id) ? 'Refazer' : 'Iniciar'}
            </Link>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      {/* Tabs para cada caminho */}
      <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-800 mb-4">Trilha de Aprendizado</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('html')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'html'
                ? 'bg-orange-100 text-orange-700 border border-orange-200'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            HTML
          </button>
          
          <button
            onClick={() => setActiveTab('css')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'css'
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            CSS
          </button>
          
          <button
            onClick={() => setActiveTab('javascript')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'javascript'
                ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
            }`}
          >
            JavaScript
          </button>
        </div>
      </div>
      
      {/* Contenido del camino activo */}
      <div className="p-6">
        <div className="space-y-6">
          {learningPaths[activeTab].map(module => {
            const isExpanded = expandedModule === module.id;
            
            return (
              <div 
                key={module.id} 
                className="border border-neutral-200 rounded-lg overflow-hidden"
              >
                {/* Cabeçalho do módulo */}
                <div 
                  className={`p-4 ${
                    module.progress === 100 
                      ? 'bg-green-50' 
                      : module.progress > 0 
                        ? 'bg-neutral-50' 
                        : 'bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {module.progress === 100 ? (
                        <div className="mr-4 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      ) : (
                        <div className="mr-4 w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-lg font-bold text-neutral-800">{module.title}</h3>
                        <p className="text-sm text-neutral-600">{module.description}</p>
                        
                        <div className="flex items-center mt-2 space-x-2">
                          <LevelBadge level={module.level} />
                          
                          <span className="text-xs text-neutral-500">
                            {module.estimatedTime}
                          </span>
                          
                          <span className="text-xs text-neutral-500">
                            {module.challenges.length} desafios
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="text-right mb-1">
                        <span className="text-sm font-medium">
                          {module.progress}% Completo
                        </span>
                      </div>
                      
                      <div className="w-32 bg-neutral-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            module.progress === 100 
                              ? 'bg-green-500' 
                              : 'bg-primary-600'
                          }`} 
                          style={{ width: `${module.progress}%` }}
                        ></div>
                      </div>
                      
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="mt-3 flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                      >
                        {isExpanded ? (
                          <>
                            <span>Ocultar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Ver desafios</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Desafíos del módulo (expandibles) */}
                {isExpanded && renderChallenges(module.challenges)}
                
                {/* Barra de separação visual */}
                {!isExpanded && (
                  <div className="h-1 bg-neutral-100 w-full"></div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Dica para o usuário */}
        <div className="mt-6 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary-800">Dica de aprendizado</h3>
              <div className="mt-2 text-sm text-primary-600">
                <p>Recomendamos seguir a ordem dos módulos para um melhor aprendizado. Cada módulo constrói sobre os conhecimentos adquiridos nos anteriores.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;