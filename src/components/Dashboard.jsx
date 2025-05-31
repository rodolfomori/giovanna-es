import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserStats } from '../utils/achievementSystem';
import { checkAchievements } from '../utils/achievementSystem';

/**
 * Componente de Dashboard que exibe um resumo das atividades recentes
 * e progresso do usuário
 */
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState({
    unlocked: [],
    locked: [],
    newlyUnlocked: [],
    totalPoints: 0
  });
  const [recentChallenges, setRecentChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar estatísticas do usuário e conquistas
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Obter estatísticas do usuário
      const userStats = getUserStats();
      setStats(userStats);
      
      // Obter conquistas
      const achievementsData = checkAchievements(userStats);
      setAchievements(achievementsData);
      
      // Ordenar desafios por data (mais recentes primeiro)
      const sortedChallenges = [...userStats.completedChallenges].sort((a, b) => {
        return new Date(b.completedAt) - new Date(a.completedAt);
      });
      
      // Pegar apenas os 5 mais recentes
      setRecentChallenges(sortedChallenges.slice(0, 5));
      
      setIsLoading(false);
    };
    
    loadUserData();
  }, []);

  // Calcular dados de resumo
  const calculateSummary = () => {
    if (!stats) return {};
    
    // Total de desafios por tópico
    const htmlChallenges = stats.completedChallenges.filter(c => c.topic === 'html').length;
    const cssChallenges = stats.completedChallenges.filter(c => c.topic === 'css').length;
    const jsChallenges = stats.completedChallenges.filter(c => c.topic === 'javascript').length;
    
    // Calcular desafios recentes (nos últimos 7 dias)
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    const recentActivities = stats.completedChallenges.filter(c => {
      const completedDate = new Date(c.completedAt);
      return completedDate >= oneWeekAgo;
    }).length;
    
    // Calcular progresso total
    const totalProgress = Math.min(Math.round((stats.completedChallenges.length / 300) * 100), 100);
    
    return {
      total: stats.completedChallenges.length,
      html: htmlChallenges,
      css: cssChallenges,
      javascript: jsChallenges,
      recentActivities,
      totalProgress,
      streak: stats.streak || 0,
      perfectChallenges: stats.perfectChallenges || 0
    };
  };

  // Obtener día de la semana en español
  const getDayOfWeek = (date) => {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[date.getDay()];
  };

  // Calcular nível com base na pontuação
  const calculateLevel = () => {
    const points = achievements.totalPoints;
    
    if (points < 50) return { level: 1, title: 'Iniciante', nextLevel: 50, current: points };
    if (points < 150) return { level: 2, title: 'Aprendiz', nextLevel: 150, current: points };
    if (points < 300) return { level: 3, title: 'Estudante', nextLevel: 300, current: points };
    if (points < 500) return { level: 4, title: 'Programador', nextLevel: 500, current: points };
    if (points < 800) return { level: 5, title: 'Desenvolvedor', nextLevel: 800, current: points };
    return { level: 6, title: 'Mestre', nextLevel: 800, current: points };
  };

  // Formatação para datas relativas
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSeconds < 60) return 'agora mesmo';
    if (diffMinutes < 60) return `${diffMinutes} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' });
  };

  const summary = calculateSummary();
  const levelInfo = calculateLevel();

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 animate-pulse">
        <div className="h-6 bg-neutral-200 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-neutral-100 rounded-lg"></div>
          ))}
        </div>
        <div className="h-40 bg-neutral-100 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-bold text-neutral-800 mb-4">Dashboard</h2>
        
        {/* Resumo em cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary-50 rounded-lg p-4 border border-primary-100">
            <div className="flex items-start">
              <div className="mr-3 bg-primary-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-primary-700 font-medium">Desafíos</h3>
                <p className="text-2xl font-bold text-primary-800">{summary.total}</p>
                <p className="text-xs text-primary-600 mt-1">
                  {summary.recentActivities > 0 ? `+${summary.recentActivities} esta semana` : 'Ninguno esta semana'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-start">
              <div className="mr-3 bg-green-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-green-700 font-medium">Streak</h3>
                <p className="text-2xl font-bold text-green-800">{summary.streak} dias</p>
                <p className="text-xs text-green-600 mt-1">
                  {summary.streak > 0 ? 'Continue assim!' : 'Inicie sua sequência hoje!'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-start">
              <div className="mr-3 bg-purple-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-purple-700 font-medium">Conquistas</h3>
                <p className="text-2xl font-bold text-purple-800">{achievements.unlocked.length}</p>
                <p className="text-xs text-purple-600 mt-1">
                  {achievements.newlyUnlocked.length > 0 ? `+${achievements.newlyUnlocked.length} novas` : 'Desbloqueie mais!'}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
            <div className="flex items-start">
              <div className="mr-3 bg-yellow-100 rounded-lg p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm text-yellow-700 font-medium">Nível</h3>
                <p className="text-2xl font-bold text-yellow-800">{levelInfo.level}</p>
                <p className="text-xs text-yellow-600 mt-1">{levelInfo.title}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Atividades recentes e progresso */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Atividades recentes */}
          <div className="lg:col-span-2">
            <h3 className="font-medium text-neutral-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Actividades Recientes
            </h3>
            
            {recentChallenges.length > 0 ? (
              <div className="space-y-3">
                {recentChallenges.map((challenge, index) => {
                  const completedDate = new Date(challenge.completedAt);
                  
                  return (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex items-center">
                      <div className={`p-2 rounded-lg mr-3 ${
                        challenge.topic === 'html' ? 'bg-orange-100 text-orange-600' :
                        challenge.topic === 'css' ? 'bg-blue-100 text-blue-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
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
                        <p className="font-medium text-neutral-800">
                          Completou um desafio de {
                            challenge.topic === 'html' ? 'HTML' :
                            challenge.topic === 'css' ? 'CSS' :
                            'JavaScript'
                          }
                        </p>
                        <p className="text-xs text-neutral-500">
                          {challenge.type === 'multipleChoice' ? 'Desafio de múltipla escolha' : 'Desafio de código'}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-neutral-500">{getRelativeTime(challenge.completedAt)}</div>
                        <div className="text-xs text-neutral-400 mt-1">{getDayOfWeek(new Date(challenge.completedAt))}</div>
                      </div>
                    </div>
                  );
                })}
                
                <Link 
                  to="/conquistas" 
                  className="block text-center py-2 text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Ver todas as atividades
                </Link>
              </div>
            ) : (
              <div className="text-center py-8 bg-neutral-50 rounded-lg border border-neutral-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-neutral-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-neutral-600 mb-2">Ninguna actividad reciente</p>
                <Link 
                  to="/desafios" 
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Iniciar um desafio
                </Link>
              </div>
            )}
          </div>
          
          {/* Progreso general */}
          <div className="lg:col-span-1">
            <h3 className="font-medium text-neutral-700 mb-3 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Progreso
            </h3>
            
            <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-4">
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-neutral-700">Progreso General</span>
                  <span className="text-neutral-600">{summary.total}/300</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${summary.totalProgress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-neutral-500 mt-1 text-right">{summary.totalProgress}% concluído</div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-neutral-700">HTML</span>
                    <span className="text-neutral-600">{summary.html}/100</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div 
                      className="bg-orange-500 h-1.5 rounded-full" 
                      style={{ width: `${summary.html}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-neutral-700">CSS</span>
                    <span className="text-neutral-600">{summary.css}/100</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div 
                      className="bg-blue-500 h-1.5 rounded-full" 
                      style={{ width: `${summary.css}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-neutral-700">JavaScript</span>
                    <span className="text-neutral-600">{summary.javascript}/100</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1.5">
                    <div 
                      className="bg-yellow-500 h-1.5 rounded-full" 
                      style={{ width: `${summary.javascript}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <h4 className="text-sm font-medium text-neutral-700 mb-2">Próximo nível</h4>
                
                {levelInfo.level < 6 ? (
                  <>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Nível {levelInfo.level} → {levelInfo.level + 1}</span>
                      <span>{levelInfo.current}/{levelInfo.nextLevel} pontos</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-1.5">
                      <div 
                        className="bg-yellow-500 h-1.5 rounded-full" 
                        style={{ width: `${(levelInfo.current / levelInfo.nextLevel) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">
                      Mais {levelInfo.nextLevel - levelInfo.current} pontos para o próximo nível
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-neutral-700">
                    Parabéns! Você atingiu o nível máximo: <strong>Mestre Programador</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Botões de ação rápida */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/desafios"
            className="flex items-center justify-center p-3 bg-primary-50 hover:bg-primary-100 rounded-lg border border-primary-200 text-primary-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Iniciar Desafio
          </Link>
          
          <Link
            to="/"
            className="flex items-center justify-center p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Chat com Giovanna
          </Link>
          
          <Link
            to="/conquistas"
            className="flex items-center justify-center p-3 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 text-purple-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Conquistas
          </Link>
          
          <Link
            to="/perfil"
            className="flex items-center justify-center p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 text-yellow-700 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Meu Perfil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;