import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/devclub-logo.png';
import NetworkAnimation from '../components/NetworkAnimation';
import { checkAchievements, getUserStats } from '../utils/achievementSystem';
import { useLanguage } from '../utils/LanguageContext';

// Componente de Layout Principal con Soporte Completo para Dark Mode
const AppLayout = ({ children }) => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const [userData] = useState({
    username: localStorage.getItem('username') || t('profile.defaultUsername'),
    avatar: localStorage.getItem('userAvatar') || '1'
  });
  const [userLevel, setUserLevel] = useState({ level: 1, title: t('levels.1') });

  // Estado para el tema (dark/light)
  const [darkMode, setDarkMode] = useState(() => {
    // Verificar el localStorage al montar el componente y también la preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    } else {
      // Si no hay preferencia guardada, usar la del sistema
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  });

  // Función para alternar el tema
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      // Guardar la preferencia en localStorage
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  // Actualizar la clase en el elemento HTML cuando el tema cambie
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    // También definir una variable CSS para facilitar la transición
    htmlElement.style.colorScheme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  // Actualizar dark mode cuando la preferencia del sistema cambie
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Solo actualizar automáticamente si el usuario no ha guardado una preferencia
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    // Agregar listener para cambios
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Obtener el emoji del avatar actual
  const getCurrentAvatarEmoji = () => {
    const avatarOptions = [
      { id: '1', emoji: '👨‍💻' },
      { id: '2', emoji: '👩‍💻' },
      { id: '3', emoji: '🧑‍🎓' },
      { id: '4', emoji: '🧑‍🔬' },
      { id: '5', emoji: '👨‍🚀' },
      { id: '6', emoji: '👨‍🎨' },
      { id: '7', emoji: '🤖' },
      { id: '8', emoji: '🥷' }
    ];

    const avatar = avatarOptions.find(a => a.id === userData.avatar);
    return avatar ? avatar.emoji : '👨‍💻';
  };

  // Cargar nivel del usuario con base en los logros
  useEffect(() => {
    const userStats = getUserStats();
    const achievementsData = checkAchievements(userStats);

    // Calcular nivel con base en la puntuación
    const points = achievementsData.totalPoints;

    let level = { level: 1, title: t('levels.1') };
    if (points < 50) level = { level: 1, title: t('levels.1') };
    else if (points < 150) level = { level: 2, title: t('levels.2') };
    else if (points < 300) level = { level: 3, title: t('levels.3') };
    else if (points < 500) level = { level: 4, title: t('levels.4') };
    else if (points < 800) level = { level: 5, title: t('levels.5') };
    else level = { level: 6, title: t('levels.6') };

    setUserLevel(level);
  }, [t]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Cerrar dropdown del perfil si está abierto
    if (isProfileDropdownOpen) setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    // Cerrar menú mobile si está abierto
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Cerrar dropdowns al hacer clic fuera de ellos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen &&
        !event.target.closest('#profile-dropdown') &&
        !event.target.closest('#profile-button')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  return (
    <div className={`min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200`}>
      {/* Navegación */}
      <NetworkAnimation />

      <nav className="bg-white dark:bg-neutral-900 shadow-sm border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
        <div className="container py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img src={Logo} className="w-10 rounded-sm" />

              <div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">{t('common.appName')}</h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('common.appTagline')}</p>
              </div>
            </Link>

            {/* Menu - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`font-medium ${isActivePath('/')
                  ? 'text-primary-600 dark:text-primary-500'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500'}`}
              >
                {t('common.chat')}
              </Link>
              <Link
                to="/correcao-codigo"
                className={`font-medium ${isActivePath('/correcao-codigo')
                  ? 'text-primary-600 dark:text-primary-500'
                  : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500'}`}
              >
                {t('common.codeCheck')}
              </Link>
             
              <Link
                to="https://go.rodolfomori.com.br/suporte"
                className={'font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-500'}
              >
                Soporte
              </Link>

              {/* Botón para alternar tema */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label={darkMode ? t('common.lightMode') : t('common.darkMode')}
              >
                {darkMode ? (
                  // Ícono del sol (para tema claro)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  // Ícono de la luna (para tema oscuro)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Perfil dropdown */}
              <div className="relative">
                <button
                  id="profile-button"
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-lg">
                    {getCurrentAvatarEmoji()}
                  </div>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">{userData.username}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-neutral-500 dark:text-neutral-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isProfileDropdownOpen && (
                  <div
                    id="profile-dropdown"
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 py-1 z-10 transition-colors duration-200"
                  >
                    <div className="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
                      <p className="font-medium text-neutral-800 dark:text-neutral-200">{userData.username}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{t('common.level')} {userLevel.level}: {userLevel.title}</p>
                    </div>
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {t('navigation.myProfile')}
                      </div>
                    </Link>

                  </div>
                )}
              </div>
            </div>

            {/* Menu Mobile - Toggle */}
            <div className="flex items-center md:hidden">
              {/* Botón para alternar tema (mobile) */}
              <button
                onClick={toggleDarkMode}
                className="p-2 mr-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label={darkMode ? t('common.lightMode') : t('common.darkMode')}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Perfil (Mobile) */}
              <Link
                to="/perfil"
                className="mr-2 p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200"
                aria-label={t('navigation.myProfile')}
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-800 flex items-center justify-center text-lg">
                  {getCurrentAvatarEmoji()}
                </div>
              </Link>

              {/* Menu toggle */}
              <button
                className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 transition-colors duration-200"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-neutral-600 dark:text-neutral-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Menu Mobile - Content */}
          {isMenuOpen && (
            <div className="mt-4 md:hidden">
              <div className="flex flex-col space-y-3 py-3 transition-colors duration-200">
                <Link
                  to="/"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.chat')}
                </Link>
                <Link
                  to="/desafios"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/desafios')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.challenges')}
                </Link>
                <Link
                  to="/conquistas"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/conquistas')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.achievements')}
                </Link>
                <Link
                  to="/sobre"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/sobre')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.about')}
                </Link>
                <Link
                  to="https://go.rodolfomori.com.br/suporte"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/sobre')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Soporte
                </Link>
                <Link
                  to="/correcao-codigo"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/correcao-codigo')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('common.codeCheck')}
                </Link>
                <Link
                  to="/perfil"
                  className={`font-medium px-4 py-2 rounded-lg ${isActivePath('/perfil')
                    ? 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('navigation.myProfile')}
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow bg-neutral-50 dark:bg-neutral-950 transition-colors duration-200">
        {children}
      </main>

      {/* Pie de página */}
      <footer className="bg-neutral-800 dark:bg-neutral-950 text-white border-t border-neutral-700 dark:border-neutral-800 transition-colors duration-200 py-8">
        <div className="container">
          <div className="text-center">
            <h2 className="text-lg font-semibold">{t('common.footer.title')}</h2>
            <p className="mt-2 text-neutral-400">
              {t('common.footer.subtitle')}
            </p>
            <p className="mt-6 text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} {t('common.footer.title')}. {t('common.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;