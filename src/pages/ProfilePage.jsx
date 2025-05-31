import { useState } from 'react';
import AppLayout from '../components/AppLayout';
import UserProfile from '../components/UserProfile';
import UserStatistics from '../components/UserStatistics';
import { useLanguage } from '../utils/LanguageContext';

/**
 * Página de perfil do usuário
 */
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { t } = useLanguage();

  return (
    <AppLayout>
      <div className="container py-6 md:py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white transition-colors duration-200">
            {t('profile.yourProfile')}
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400 transition-colors duration-200">
            {t('profile.manageInfo')}
          </p>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6 transition-colors duration-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'profile'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
              >
                {t('profile.profile')}
              </button>
              <button
                onClick={() => setActiveTab('statistics')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === 'statistics'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
              >
                {t('profile.statistics')}
              </button>
            </nav>
          </div>

          {/* Conteúdo da tab ativa */}
          {activeTab === 'profile' && <UserProfile />}
          {activeTab === 'statistics' && <UserStatistics />}
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;