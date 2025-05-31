import React, { useState, useEffect } from 'react';
import { getUserStats } from '../utils/achievementSystem';
import { useLanguage } from '../utils/LanguageContext';

/**
 * Componente para exibir estatísticas detalhadas do usuário
 */
const UserStatistics = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState({
    completedChallenges: [],
    streak: 0,
    perfectChallenges: 0,
    lastActiveDay: null
  });
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Carregar estatísticas do usuário
  useEffect(() => {
    const userStats = getUserStats();
    setStats(userStats);
  }, []);
  
  // Calcular estatísticas específicas
  const calculateStats = () => {
    // Filtrar desafios por tópico
    const htmlChallenges = stats.completedChallenges.filter(c => c.topic === 'html');
    const cssChallenges = stats.completedChallenges.filter(c => c.topic === 'css');
    const jsChallenges = stats.completedChallenges.filter(c => c.topic === 'javascript');
    
    // Filtrar por tipo
    const multipleChoice = stats.completedChallenges.filter(c => c.type === 'multipleChoice');
    const codeCompletion = stats.completedChallenges.filter(c => c.type === 'codeCompletion');
    
    // Calcular percentagens
    const totalChallenges = stats.completedChallenges.length;
    const htmlPercentage = totalChallenges > 0 ? Math.round((htmlChallenges.length / totalChallenges) * 100) : 0;
    const cssPercentage = totalChallenges > 0 ? Math.round((cssChallenges.length / totalChallenges) * 100) : 0;
    const jsPercentage = totalChallenges > 0 ? Math.round((jsChallenges.length / totalChallenges) * 100) : 0;
    
    // Calcular tendências (últimos 7 dias vs anteriores)
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentChallenges = stats.completedChallenges.filter(c => {
      const completedDate = new Date(c.completedAt);
      return completedDate >= oneWeekAgo;
    });
    
    return {
      total: totalChallenges,
      html: htmlChallenges.length,
      css: cssChallenges.length,
      js: jsChallenges.length,
      multipleChoice: multipleChoice.length,
      codeCompletion: codeCompletion.length,
      htmlPercentage,
      cssPercentage,
      jsPercentage,
      streak: stats.streak || 0,
      perfectChallenges: stats.perfectChallenges || 0,
      recentChallenges: recentChallenges.length
    };
  };
  
  const calculatedStats = calculateStats();
  
  // Dados para o gráfico de progresso
  const progressData = [
    { name: 'HTML', value: calculatedStats.html, percentage: calculatedStats.htmlPercentage, color: 'bg-orange-500' },
    { name: 'CSS', value: calculatedStats.css, percentage: calculatedStats.cssPercentage, color: 'bg-blue-500' },
    { name: 'JavaScript', value: calculatedStats.js, percentage: calculatedStats.jsPercentage, color: 'bg-yellow-500' }
  ];
  
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors duration-200">
      {/* Guias/Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            {t('statistics.overview')}
          </button>
          <button
            onClick={() => setActiveTab('progress')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'progress'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            {t('statistics.progress')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${
              activeTab === 'history'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
            }`}
          >
            {t('statistics.history')}
          </button>
        </nav>
      </div>
      
      {/* Contenido de la pestaña */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 transition-colors duration-200">{t('statistics.yourStats')}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-900 transition-colors duration-200">
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-300 transition-colors duration-200">{calculatedStats.total}</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 transition-colors duration-200">{t('statistics.completedChallenges')}</div>
                {calculatedStats.recentChallenges > 0 && (
                  <div className="mt-2 text-xs text-blue-500 dark:text-blue-400 transition-colors duration-200">
                    +{calculatedStats.recentChallenges} {t('statistics.last7Days')}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900 transition-colors duration-200">
                <div className="text-2xl font-bold text-green-700 dark:text-green-300 transition-colors duration-200">{calculatedStats.streak}</div>
                <div className="text-sm text-green-600 dark:text-green-400 transition-colors duration-200">{t('statistics.consecutiveDays')}</div>
                <div className="mt-2 text-xs text-green-500 dark:text-green-400 transition-colors duration-200">
                  {calculatedStats.streak > 0 ? t('statistics.keepItUp') : t('statistics.completeChallenge')}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-900 transition-colors duration-200">
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-300 transition-colors duration-200">{calculatedStats.perfectChallenges}</div>
                <div className="text-sm text-purple-600 dark:text-purple-400 transition-colors duration-200">{t('statistics.perfectChallenges')}</div>
                <div className="mt-2 text-xs text-purple-500 dark:text-purple-400 transition-colors duration-200">
                  {calculatedStats.perfectChallenges > 0 ? t('statistics.excellentAccuracy') : t('statistics.getItRight')}
                </div>
              </div>
            </div>
            
            <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-3 transition-colors duration-200">{t('statistics.challengesByTech')}</h4>
            <div className="space-y-3 mb-6">
              {progressData.map(item => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{item.name}</span>
                    <span className="text-neutral-500 dark:text-neutral-500 transition-colors duration-200">{item.value} ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 transition-colors duration-200">
                    <div 
                      className={`${item.color} h-2 rounded-full`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-3 transition-colors duration-200">{t('statistics.challengesByType')}</h4>
            <div className="flex justify-between">
              <div className="text-center flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="mt-2 font-medium text-neutral-800 dark:text-neutral-200 transition-colors duration-200">{calculatedStats.multipleChoice}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('statistics.multipleChoice')}</div>
              </div>
              
              <div className="text-center flex-1">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600 dark:text-pink-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="mt-2 font-medium text-neutral-800 dark:text-neutral-200 transition-colors duration-200">{calculatedStats.codeCompletion}</div>
                <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('statistics.codeCompletion')}</div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'progress' && (
          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 transition-colors duration-200">{t('statistics.yourProgress')}</h3>
            
            <div className="mb-6">
              <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-200">{t('statistics.overallProgress')}</h4>
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 transition-colors duration-200">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{t('statistics.totalChallenges')}</span>
                  <span className="text-neutral-500 dark:text-neutral-500 transition-colors duration-200">{calculatedStats.total} / 300</span>
                </div>
                <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-4 transition-colors duration-200">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.round((calculatedStats.total / 300) * 100)}%` }}
                  ></div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">HTML</div>
                    <div className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">{calculatedStats.html} / 100</div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 mt-1 transition-colors duration-200">
                      <div 
                        className="bg-orange-500 h-1.5 rounded-full" 
                        style={{ width: `${calculatedStats.html}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">CSS</div>
                    <div className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">{calculatedStats.css} / 100</div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 mt-1 transition-colors duration-200">
                      <div 
                        className="bg-blue-500 h-1.5 rounded-full" 
                        style={{ width: `${calculatedStats.css}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">JavaScript</div>
                    <div className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">{calculatedStats.js} / 100</div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 mt-1 transition-colors duration-200">
                      <div 
                        className="bg-yellow-500 h-1.5 rounded-full" 
                        style={{ width: `${calculatedStats.js}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 flex-1 transition-colors duration-200">
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-3 transition-colors duration-200">{t('statistics.skillLevel')}</h4>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 transition-colors duration-200">
                  {t('statistics.basedOnResponses')}
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">HTML</span>
                      <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
                        {calculatedStats.html >= 20 ? t('statistics.intermediate') : t('statistics.beginner')}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 transition-colors duration-200">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatedStats.html * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">CSS</span>
                      <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
                        {calculatedStats.css >= 20 ? t('statistics.intermediate') : t('statistics.beginner')}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 transition-colors duration-200">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatedStats.css * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300 transition-colors duration-200">JavaScript</span>
                      <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
                        {calculatedStats.js >= 20 ? t('statistics.intermediate') : t('statistics.beginner')}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 transition-colors duration-200">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(calculatedStats.js * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 flex-1 transition-colors duration-200">
                <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-3 transition-colors duration-200">{t('statistics.challengeDistribution')}</h4>
                {calculatedStats.total > 0 ? (
                  <div className="flex flex-col items-center justify-center h-40">
                    <div className="relative w-32 h-32">
                      {/* Gráfico de pizza simplificado */}
                      <svg viewBox="0 0 36 36" className="w-full h-full">
                        {/* HTML (laranja) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#F97316"
                          strokeWidth="2"
                          strokeDasharray={`${calculatedStats.htmlPercentage}, 100`}
                          strokeDashoffset="25"
                        />
                        {/* CSS (azul) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeDasharray={`${calculatedStats.cssPercentage}, 100`}
                          strokeDashoffset={`${100 - calculatedStats.htmlPercentage + 25}`}
                        />
                        {/* JavaScript (amarelo) */}
                        <path
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="#EAB308"
                          strokeWidth="2"
                          strokeDasharray={`${calculatedStats.jsPercentage}, 100`}
                          strokeDashoffset={`${100 - (calculatedStats.htmlPercentage + calculatedStats.cssPercentage) + 25}`}
                        />
                      </svg>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 w-full text-center mt-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <div className="text-xs mt-1 text-neutral-700 dark:text-neutral-300 transition-colors duration-200">HTML</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div className="text-xs mt-1 text-neutral-700 dark:text-neutral-300 transition-colors duration-200">CSS</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="text-xs mt-1 text-neutral-700 dark:text-neutral-300 transition-colors duration-200">JS</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-40 text-neutral-500 dark:text-neutral-400 text-sm transition-colors duration-200">
                    {t('statistics.completeChallenges')}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 transition-colors duration-200">{t('statistics.activityHistory')}</h3>
            
            {stats.completedChallenges.length > 0 ? (
              <div className="space-y-4">
                {stats.completedChallenges.slice(0, 10).map((challenge, index) => {
                  const completedDate = new Date(challenge.completedAt);
                  const dateFormatted = completedDate.toLocaleDateString('pt-BR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });
                  const timeFormatted = completedDate.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  
                  return (
                    <div key={index} className="flex items-start p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                      <div className={`p-2 rounded-md mr-3 ${
                        challenge.topic === 'html' ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400' :
                        challenge.topic === 'css' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400' :
                        'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400'
                      } transition-colors duration-200`}>
                        {challenge.topic === 'html' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        )}
                        {challenge.topic === 'css' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.172-2.172a2 2 0 010-2.828L7.343 11" />
                          </svg>
                        )}
                        {challenge.topic === 'javascript' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium text-neutral-800 dark:text-white transition-colors duration-200">
                              {t('statistics.challengeOf')} {
                                challenge.topic === 'html' ? 'HTML' :
                                challenge.topic === 'css' ? 'CSS' :
                                'JavaScript'
                              } 
                              {challenge.type === 'multipleChoice' ? t('statistics.multipleChoiceLabel') : t('statistics.codeLabel')}
                            </h4>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
                              ID: {challenge.id.substring(0, 8)}...
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{dateFormatted}</div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{timeFormatted}</div>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400 transition-colors duration-200">
                            <svg className="mr-1.5 h-2 w-2 text-green-400 dark:text-green-300 transition-colors duration-200" fill="currentColor" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {t('statistics.completed')}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {stats.completedChallenges.length > 10 && (
                  <div className="text-center py-2">
                    <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200">
                      {t('statistics.viewMore')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-500 dark:text-neutral-400 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400 dark:text-neutral-500 mb-3 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p>{t('statistics.noChallenges')}</p>
                <p className="mt-2">
                  <a href="/desafios" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200">
                    {t('statistics.startChallenge')}
                  </a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStatistics;