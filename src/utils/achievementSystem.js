/**
 * Sistema de conquistas para a plataforma de desafios
 * Este arquivo define conquistas e funções para gerenciá-las
 */

// Definição das conquistas disponíveis no sistema
const achievements = [
    {
      id: 'first_html',
      name: 'Primeiro HTML',
      description: 'Complete seu primeiro desafio de HTML',
      icon: '🔍',
      category: 'html',
      condition: (stats) => stats.completedChallenges.some(c => c.topic === 'html'),
      points: 10
    },
    {
      id: 'first_css',
      name: 'Estilista Iniciante',
      description: 'Complete seu primeiro desafio de CSS',
      icon: '🎨',
      category: 'css',
      condition: (stats) => stats.completedChallenges.some(c => c.topic === 'css'),
      points: 10
    },
    {
      id: 'first_js',
      name: 'Lógica Iniciante',
      description: 'Complete seu primeiro desafio de JavaScript',
      icon: '⚙️',
      category: 'javascript',
      condition: (stats) => stats.completedChallenges.some(c => c.topic === 'javascript'),
      points: 10
    },
    {
      id: 'html_master_5',
      name: 'Estruturador HTML',
      description: 'Complete 5 desafios de HTML',
      icon: '📄',
      category: 'html',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'html').length >= 5,
      points: 25
    },
    {
      id: 'css_master_5',
      name: 'Estilista CSS',
      description: 'Complete 5 desafios de CSS',
      icon: '🖌️',
      category: 'css',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'css').length >= 5,
      points: 25
    },
    {
      id: 'js_master_5',
      name: 'Programador JavaScript',
      description: 'Complete 5 desafios de JavaScript',
      icon: '💻',
      category: 'javascript',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'javascript').length >= 5,
      points: 25
    },
    {
      id: 'html_master_10',
      name: 'Especialista HTML',
      description: 'Complete 10 desafios de HTML',
      icon: '🏆',
      category: 'html',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'html').length >= 10,
      points: 50
    },
    {
      id: 'css_master_10',
      name: 'Especialista CSS',
      description: 'Complete 10 desafios de CSS',
      icon: '🏆',
      category: 'css',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'css').length >= 10,
      points: 50
    },
    {
      id: 'js_master_10',
      name: 'Especialista JavaScript',
      description: 'Complete 10 desafios de JavaScript',
      icon: '🏆',
      category: 'javascript',
      condition: (stats) => stats.completedChallenges.filter(c => c.topic === 'javascript').length >= 10,
      points: 50
    },
    {
      id: 'total_5',
      name: 'Aprendiz de Programação',
      description: 'Complete 5 desafios no total',
      icon: '🌱',
      category: 'general',
      condition: (stats) => stats.completedChallenges.length >= 5,
      points: 15
    },
    {
      id: 'total_10',
      name: 'Estudante Dedicado',
      description: 'Complete 10 desafios no total',
      icon: '📚',
      category: 'general',
      condition: (stats) => stats.completedChallenges.length >= 10,
      points: 30
    },
    {
      id: 'total_25',
      name: 'Programador em Ascensão',
      description: 'Complete 25 desafios no total',
      icon: '🚀',
      category: 'general',
      condition: (stats) => stats.completedChallenges.length >= 25,
      points: 100
    },
    {
      id: 'total_50',
      name: 'Desenvolvedor Web',
      description: 'Complete 50 desafios no total',
      icon: '👨‍💻',
      category: 'general',
      condition: (stats) => stats.completedChallenges.length >= 50,
      points: 200
    },
    {
      id: 'streak_3',
      name: 'Trilha Constante',
      description: 'Complete desafios por 3 dias seguidos',
      icon: '🔥',
      category: 'streak',
      condition: (stats) => stats.streak >= 3,
      points: 20
    },
    {
      id: 'streak_7',
      name: 'Semana Perfeita',
      description: 'Complete desafios por 7 dias seguidos',
      icon: '📅',
      category: 'streak',
      condition: (stats) => stats.streak >= 7,
      points: 50
    },
    {
      id: 'all_topics',
      name: 'Desenvolvedor Full-Stack',
      description: 'Complete pelo menos 1 desafio de cada tópico',
      icon: '🌐',
      category: 'general',
      condition: (stats) => 
        stats.completedChallenges.some(c => c.topic === 'html') && 
        stats.completedChallenges.some(c => c.topic === 'css') && 
        stats.completedChallenges.some(c => c.topic === 'javascript'),
      points: 25
    },
    {
      id: 'perfect_score_5',
      name: 'Resolução Perfeita',
      description: 'Complete 5 desafios sem errar',
      icon: '✅',
      category: 'general',
      condition: (stats) => stats.perfectChallenges >= 5,
      points: 30
    }
  ];
  
  /**
   * Verifica as conquistas atuais do usuário com base nos stats fornecidos
   * @param {Object} userStats Estatísticas do usuário
   * @returns {Object} Objeto com listas de conquistas obtidas e não obtidas
   */
  export const checkAchievements = (userStats) => {
    // Garantir que temos estatísticas válidas
    const stats = {
      completedChallenges: [],
      streak: 0,
      perfectChallenges: 0,
      ...userStats
    };
    
    // Lista de IDs de conquistas já obtidas pelo usuário
    const unlockedAchievementsIds = localStorage.getItem('unlockedAchievements') 
      ? JSON.parse(localStorage.getItem('unlockedAchievements')) 
      : [];
    
    // Verificar todas as conquistas
    const newlyUnlocked = [];
    const unlocked = [];
    const locked = [];
    
    achievements.forEach(achievement => {
      // Verificar se a conquista já foi desbloqueada antes
      if (unlockedAchievementsIds.includes(achievement.id)) {
        unlocked.push(achievement);
      } 
      // Verificar se a condição da conquista foi atendida agora
      else if (achievement.condition(stats)) {
        newlyUnlocked.push(achievement);
        unlocked.push(achievement);
        unlockedAchievementsIds.push(achievement.id);
      } 
      // Conquista ainda bloqueada
      else {
        locked.push(achievement);
      }
    });
    
    // Atualizar conquistas desbloqueadas no localStorage
    if (newlyUnlocked.length > 0) {
      localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievementsIds));
    }
    
    return {
      newlyUnlocked,  // Conquistas desbloqueadas nesta verificação
      unlocked,       // Todas as conquistas desbloqueadas
      locked,         // Conquistas ainda bloqueadas
      totalPoints: unlocked.reduce((sum, achievement) => sum + achievement.points, 0)
    };
  };
  
  /**
   * Processa um desafio completo e atualiza estatísticas do usuário
   * @param {Object} challengeData Dados do desafio completado
   * @param {boolean} firstAttempt Indica se foi completado na primeira tentativa
   * @returns {Object} Estatísticas atualizadas e novas conquistas
   */
  export const processCompletedChallenge = (challengeData, firstAttempt = false) => {
    // Obter estatísticas atuais
    const userStats = getUserStats();
    
    // Verificar se o desafio já foi completado
    const alreadyCompleted = userStats.completedChallenges.some(
      challenge => challenge.id === challengeData.id
    );
    
    // Se não foi completado, adicionar à lista
    if (!alreadyCompleted) {
      userStats.completedChallenges.push({
        id: challengeData.id,
        topic: challengeData.topic,
        type: challengeData.type,
        completedAt: new Date().toISOString()
      });
    }
    
    // Atualizar streak (dias consecutivos)
    updateStreak(userStats);
    
    // Incrementar desafios perfeitos (completados na primeira tentativa)
    if (firstAttempt) {
      userStats.perfectChallenges = (userStats.perfectChallenges || 0) + 1;
    }
    
    // Salvar estatísticas atualizadas
    saveUserStats(userStats);
    
    // Verificar conquistas
    const achievementsResult = checkAchievements(userStats);
    
    return {
      stats: userStats,
      achievements: achievementsResult
    };
  };
  
  /**
   * Atualiza o streak (dias consecutivos) do usuário
   * @param {Object} userStats Estatísticas do usuário
   */
  const updateStreak = (userStats) => {
    const today = new Date().toDateString();
    const lastActiveDay = userStats.lastActiveDay || '';
    
    // Converter para objetos Date para comparação
    const todayDate = new Date(today);
    const lastDate = lastActiveDay ? new Date(lastActiveDay) : null;
    
    // Verificar se é o mesmo dia
    if (lastActiveDay === today) {
      // Mesma dia, não faz nada
      return;
    }
    
    // Verificar se é o dia seguinte
    if (lastDate) {
      const oneDayMs = 24 * 60 * 60 * 1000;
      const diffDays = Math.round((todayDate - lastDate) / oneDayMs);
      
      if (diffDays === 1) {
        // Dia consecutivo, aumentar streak
        userStats.streak = (userStats.streak || 0) + 1;
      } else if (diffDays > 1) {
        // Streak quebrado, reiniciar
        userStats.streak = 1;
      }
    } else {
      // Primeiro dia, iniciar streak
      userStats.streak = 1;
    }
    
    // Atualizar último dia ativo
    userStats.lastActiveDay = today;
  };
  
  /**
   * Obtém as estatísticas do usuário do localStorage
   * @returns {Object} Estatísticas do usuário
   */
  export const getUserStats = () => {
    const statsJson = localStorage.getItem('userStats');
    
    if (!statsJson) {
      // Inicializar com valores padrão
      return {
        completedChallenges: [],
        streak: 0,
        perfectChallenges: 0,
        lastActiveDay: null
      };
    }
    
    return JSON.parse(statsJson);
  };
  
  /**
   * Salva as estatísticas do usuário no localStorage
   * @param {Object} stats Estatísticas do usuário
   */
  export const saveUserStats = (stats) => {
    localStorage.setItem('userStats', JSON.stringify(stats));
  };
  
  export default {
    achievements,
    checkAchievements,
    processCompletedChallenge,
    getUserStats,
    saveUserStats
  };