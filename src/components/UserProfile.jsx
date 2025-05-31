import React, { useState, useEffect } from 'react';
import { getUserStats } from '../utils/achievementSystem';
import { checkAchievements } from '../utils/achievementSystem';
import { useLanguage } from '../utils/LanguageContext';

/**
 * Componente para exibir e gerenciar o perfil do usuário
 */
const UserProfile = () => {
  const { t } = useLanguage();
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username') || t('profile.defaultUsername'),
    avatar: localStorage.getItem('userAvatar') || '1',
    theme: localStorage.getItem('userTheme') || 'light'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [stats, setStats] = useState(null);
  const [achievements, setAchievements] = useState({
    unlocked: [],
    totalPoints: 0
  });
  
  // Carregar estatísticas e conquistas
  useEffect(() => {
    const userStats = getUserStats();
    setStats(userStats);
    
    const achievementsData = checkAchievements(userStats);
    setAchievements(achievementsData);
  }, []);
  
  // Opções de avatar
  const avatarOptions = [
    { id: '1', name: t('profile.avatars.programmer'), emoji: '👨‍💻' },
    { id: '2', name: t('profile.avatars.programmerFemale'), emoji: '👩‍💻' },
    { id: '3', name: t('profile.avatars.student'), emoji: '🧑‍🎓' },
    { id: '4', name: t('profile.avatars.scientist'), emoji: '🧑‍🔬' },
    { id: '5', name: t('profile.avatars.astronaut'), emoji: '👨‍🚀' },
    { id: '6', name: t('profile.avatars.artist'), emoji: '👨‍🎨' },
    { id: '7', name: t('profile.avatars.robot'), emoji: '🤖' },
    { id: '8', name: t('profile.avatars.ninja'), emoji: '🥷' }
  ];
  
  // Atualizar dados do perfil
  const handleUpdateProfile = () => {
    // Validar nome de usuário
    if (!formData.username.trim()) {
      alert(t('profile.validation.enterUsername'));
      return;
    }
    
    // Atualizar dados
    setUserData(formData);
    
    // Salvar no localStorage
    localStorage.setItem('username', formData.username);
    localStorage.setItem('userAvatar', formData.avatar);
    localStorage.setItem('userTheme', formData.theme);
    
    // Fechar modo de edição
    setIsEditing(false);
  };
  
  // Cancelar edição
  const handleCancelEdit = () => {
    setFormData({...userData});
    setIsEditing(false);
  };
  
  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Selección de avatar
  const handleSelectAvatar = (id) => {
    setFormData(prev => ({ ...prev, avatar: id }));
  };
  
  // Obter o emoji do avatar atual
  const getCurrentAvatarEmoji = () => {
    const avatar = avatarOptions.find(a => a.id === userData.avatar);
    return avatar ? avatar.emoji : '👨‍💻';
  };
  
  // Calcular nível com base na pontuação de conquistas
  const calculateLevel = () => {
    const points = achievements.totalPoints;
    
    if (points < 50) return { level: 1, title: t('levels.1') };
    if (points < 150) return { level: 2, title: t('levels.2') };
    if (points < 300) return { level: 3, title: t('levels.3') };
    if (points < 500) return { level: 4, title: t('levels.4') };
    if (points < 800) return { level: 5, title: t('levels.5') };
    return { level: 6, title: t('levels.6') };
  };
  
  const userLevel = calculateLevel();
  
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden transition-colors duration-200">
      {/* Cabeçalho do perfil */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 p-6 text-white">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-20 h-20 rounded-full bg-white text-center flex items-center justify-center text-4xl mb-4 md:mb-0 md:mr-6">
            {getCurrentAvatarEmoji()}
          </div>
          
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{userData.username}</h2>
            <p className="opacity-90">{t('common.level')} {userLevel.level}: {userLevel.title}</p>
            
            <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white bg-opacity-20">
              {stats && stats.completedChallenges.length} {t('profile.challengesCompleted')}
            </div>
          </div>
          
          <div className="ml-auto mt-4 md:mt-0">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                {t('profile.editProfile')}
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {t('profile.cancel')}
                </button>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-white text-primary-700 hover:bg-opacity-90 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  {t('profile.save')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenido del perfil */}
      <div className="p-6">
        {isEditing ? (
          // Formulario de edición
          <div className="max-w-lg mx-auto">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 transition-colors duration-200">{t('profile.editProfile')}</h3>
            
            <div className="mb-4">
              <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium transition-colors duration-200" htmlFor="username">
                {t('profile.username')}
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border-neutral-300 dark:border-neutral-700 rounded-lg shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:text-white transition-colors duration-200"
                placeholder={t('profile.usernamePlaceholder')}
                maxLength={20}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium transition-colors duration-200">
                {t('profile.chooseAvatar')}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleSelectAvatar(avatar.id)}
                    className={`h-16 rounded-lg flex items-center justify-center text-3xl transition-colors duration-200 ${
                      formData.avatar === avatar.id
                        ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500'
                        : 'bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                    }`}
                  >
                    {avatar.emoji}
                  </button>
                ))}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 transition-colors duration-200">
                {t('profile.clickToSelect')}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-neutral-700 dark:text-neutral-300 mb-2 font-medium transition-colors duration-200">
                {t('profile.interfaceTheme')}
              </label>
              <div className="flex space-x-3">
                <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  formData.theme === 'light' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={formData.theme === 'light'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-neutral-800 dark:text-neutral-200 transition-colors duration-200">{t('profile.light')}</span>
                </label>
                
                <label className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  formData.theme === 'dark' 
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                    : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                }`}>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={formData.theme === 'dark'}
                    onChange={handleChange}
                    className="form-radio h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-neutral-800 dark:text-neutral-200 transition-colors duration-200">{t('profile.dark')}</span>
                </label>
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 transition-colors duration-200">
                {t('profile.personalizeAppearance')}
              </div>
            </div>
          </div>
        ) : (
          // Visualização do perfil
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Conquistas recentes */}
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  {t('profile.latestAchievements')}
                </h3>
                
                {achievements.unlocked.length > 0 ? (
                  <div className="space-y-3">
                    {achievements.unlocked.slice(0, 3).map(achievement => (
                      <div key={achievement.id} className="flex items-center p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center text-xl mr-3 transition-colors duration-200">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral-800 dark:text-white transition-colors duration-200">{achievement.name}</h4>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{achievement.description}</p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 transition-colors duration-200">
                            +{achievement.points}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {achievements.unlocked.length > 3 && (
                      <div className="text-center mt-2">
                        <a href="/conquistas" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200">
                          {t('profile.viewAll')} ({achievements.unlocked.length})
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-neutral-400 dark:text-neutral-500 mb-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{t('profile.noAchievements')}</p>
                    <p className="mt-2">
                      <a href="/desafios" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium transition-colors duration-200">
                        {t('profile.startChallenge')}
                      </a>
                    </p>
                  </div>
                )}
              </div>
              
              {/* Estadísticas */}
              <div>
                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-4 flex items-center transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  {t('profile.statistics')}
                </h3>
                
                {stats ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('profile.completedChallenges')}</div>
                        <div className="text-xl font-bold mt-1 text-neutral-800 dark:text-white transition-colors duration-200">{stats.completedChallenges.length}</div>
                      </div>
                      
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('profile.consecutiveDays')}</div>
                        <div className="text-xl font-bold mt-1 text-neutral-800 dark:text-white transition-colors duration-200">{stats.streak || 0}</div>
                      </div>
                      
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('profile.perfectChallenges')}</div>
                        <div className="text-xl font-bold mt-1 text-neutral-800 dark:text-white transition-colors duration-200">{stats.perfectChallenges || 0}</div>
                      </div>
                      
                      <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-3 border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors duration-200">{t('profile.pointsEarned')}</div>
                        <div className="text-xl font-bold mt-1 text-neutral-800 dark:text-white transition-colors duration-200">{achievements.totalPoints}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                      <h4 className="font-medium text-neutral-700 dark:text-neutral-300 mb-2 transition-colors duration-200">{t('profile.techDistribution')}</h4>
                      
                      {stats.completedChallenges.length > 0 ? (
                        <div>
                          {/* HTML */}
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-700 dark:text-neutral-300 transition-colors duration-200">HTML</span>
                              <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{stats.completedChallenges.filter(c => c.topic === 'html').length}</span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 transition-colors duration-200">
                              <div 
                                className="bg-orange-500 h-1.5 rounded-full" 
                                style={{ 
                                  width: `${Math.round((stats.completedChallenges.filter(c => c.topic === 'html').length / stats.completedChallenges.length) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* CSS */}
                          <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-700 dark:text-neutral-300 transition-colors duration-200">CSS</span>
                              <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{stats.completedChallenges.filter(c => c.topic === 'css').length}</span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 transition-colors duration-200">
                              <div 
                                className="bg-blue-500 h-1.5 rounded-full" 
                                style={{ 
                                  width: `${Math.round((stats.completedChallenges.filter(c => c.topic === 'css').length / stats.completedChallenges.length) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                          
                          {/* JavaScript */}
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-neutral-700 dark:text-neutral-300 transition-colors duration-200">JavaScript</span>
                              <span className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{stats.completedChallenges.filter(c => c.topic === 'javascript').length}</span>
                            </div>
                            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1.5 transition-colors duration-200">
                              <div 
                                className="bg-yellow-500 h-1.5 rounded-full" 
                                style={{ 
                                  width: `${Math.round((stats.completedChallenges.filter(c => c.topic === 'javascript').length / stats.completedChallenges.length) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-neutral-500 dark:text-neutral-400 text-center py-2 transition-colors duration-200">
                          {t('profile.completeToSee')}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-neutral-400 dark:text-neutral-500 mb-2 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-neutral-600 dark:text-neutral-400 transition-colors duration-200">{t('profile.loadingStats')}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Badge de nível */}
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg text-white">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-4">
                  {userLevel.level}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{userLevel.title}</h3>
                  <p className="text-white text-opacity-80 text-sm">
                    {userLevel.level < 6 
                      ? t('profile.continueCompleting')
                      : t('profile.maxLevelReached')}
                  </p>
                </div>
                <div className="ml-auto">
                  <a 
                    href="/conquistas" 
                    className="px-4 py-2 bg-white text-indigo-700 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors duration-200"
                  >
                    {t('profile.viewMore')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;