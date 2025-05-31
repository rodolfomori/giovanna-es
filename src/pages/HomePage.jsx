import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Dashboard from '../components/Dashboard';
import LearningPath from '../components/LearningPath';
import { checkAchievements, getUserStats } from '../utils/achievementSystem';

/**
 * Página inicial do app que exibe dashboard, progresso e sugestões personalizadas
 */
const HomePage = () => {
  const [userStats, setUserStats] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [userName, setUserName] = useState('Programador');
  const [greeting, setGreeting] = useState('');
  const [showTip, setShowTip] = useState(true);

  // Carregar dados do usuário
  useEffect(() => {
    // Carregar nome do usuário
    const storedName = localStorage.getItem('username');
    if (storedName) {
      setUserName(storedName);
    }

    // Carregar estatísticas
    const stats = getUserStats();
    setUserStats(stats);

    // Carregar conquistas
    const achievementsData = checkAchievements(stats);
    setAchievements(achievementsData);

    // Definir saudação com base na hora do dia
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  // Selecionar desafio recomendado com base no progresso
  const getRecommendedChallenge = () => {
    if (!userStats || !userStats.completedChallenges) {
      return {
        title: 'Fundamentos do HTML',
        description: 'Comece sua jornada aprendendo as tags básicas de HTML',
        path: '/desafios?topic=html'
      };
    }

    const htmlCount = userStats.completedChallenges.filter(c => c.topic === 'html').length;
    const cssCount = userStats.completedChallenges.filter(c => c.topic === 'css').length;
    const jsCount = userStats.completedChallenges.filter(c => c.topic === 'javascript').length;

    // Sugerir com base no menor progresso
    if (htmlCount < 5) {
      return {
        title: 'Fundamentos do HTML',
        description: 'Aprenda como estruturar documentos web com HTML',
        path: '/desafios?topic=html'
      };
    } else if (cssCount < 5) {
      return {
        title: 'Fundamentos do CSS',
        description: 'Aprenda a estilizar suas páginas HTML com CSS',
        path: '/desafios?topic=css'
      };
    } else if (jsCount < 5) {
      return {
        title: 'Fundamentos do JavaScript',
        description: 'Adicione interatividade às suas páginas com JavaScript',
        path: '/desafios?topic=javascript'
      };
    } else if (htmlCount < 10) {
      return {
        title: 'HTML Avançado',
        description: 'Aprenda recursos avançados de HTML e formulários',
        path: '/desafios?topic=html'
      };
    } else if (cssCount < 10) {
      return {
        title: 'CSS Avançado',
        description: 'Aprenda layouts e animações com CSS',
        path: '/desafios?topic=css'
      };
    } else {
      return {
        title: 'JavaScript Avançado',
        description: 'Domine conceitos avançados de JavaScript',
        path: '/desafios?topic=javascript'
      };
    }
  };

  // Obter dica do dia
  const getDailyTip = () => {
    const tips = [
      {
        title: 'Prática constante',
        content: 'Programação é como um músculo - quanto mais você pratica, mais forte fica. Tente dedicar pelo menos 20 minutos todos os dias.'
      },
      {
        title: 'Leia o código de outros',
        content: 'Uma ótima maneira de aprender é ler códigos escritos por outras pessoas. Isso expõe você a diferentes estilos e abordagens.'
      },
      {
        title: 'Console.log é seu amigo',
        content: 'Quando estiver confuso com JavaScript, use console.log() para ver o que está acontecendo com suas variáveis.'
      },
      {
        title: 'Inspecione elementos',
        content: 'Use a ferramenta de inspeção do navegador para entender como elementos HTML e estilos CSS funcionam em sites que você visita.'
      },
      {
        title: 'Divida problemas',
        content: 'Quando um problema parecer muito grande, divida-o em problemas menores e resolva um de cada vez.'
      },
      {
        title: 'Documente seu código',
        content: 'Adicionar comentários ao seu código é como deixar recados para seu futuro eu. Isso torna a revisão muito mais fácil.'
      },
      {
        title: 'Aprenda a pesquisar',
        content: 'Saber formular boas consultas de pesquisa é uma habilidade essencial para programadores. Seja específico nos seus termos.'
      }
    ];

    // Usar a data atual como semente para selecionar uma dica
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const tipIndex = dayOfYear % tips.length;

    return tips[tipIndex];
  };

  const recommendedChallenge = getRecommendedChallenge();
  const dailyTip = getDailyTip();

  return (
    <AppLayout>
      <div className="container py-6 md:py-8">

        {/* Cabeçalho com saudação */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800">
            {greeting}, <span className="text-primary-600">{userName}</span>!
          </h1>
          <p className="mt-2 text-neutral-600">
            Bem-vindo de volta à sua jornada de aprendizado.
          </p>
        </div>

        {/* Dica do dia (descartável) */}
        {showTip && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-5">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-blue-800">Dica do dia: {dailyTip.title}</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>{dailyTip.content}</p>
                </div>
              </div>
              <button
                onClick={() => setShowTip(false)}
                className="ml-auto flex-shrink-0 text-blue-500 hover:text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Grid principal com dashboard e recomendação */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Dashboard (2/3 da largura) */}
          <div className="lg:col-span-2">
            <Dashboard />
          </div>

          {/* Recomendações (1/3 da largura) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
              <h2 className="text-lg font-bold text-neutral-800 mb-4">Recomendado para você</h2>

              <div className="mb-4 p-4 bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg text-white">
                <h3 className="font-semibold text-xl mb-1">{recommendedChallenge.title}</h3>
                <p className="text-white text-opacity-90 mb-3">{recommendedChallenge.description}</p>
                <Link
                  to={recommendedChallenge.path}
                  className="inline-block bg-white text-primary-600 hover:bg-opacity-90 font-medium px-4 py-2 rounded-lg text-sm"
                >
                  Iniciar Aprendizado
                </Link>
              </div>

              {/* Últimas conquistas */}
              <h3 className="font-medium text-neutral-700 mb-2">Suas Últimas Conquistas</h3>

              {achievements && achievements.unlocked.length > 0 ? (
                <div className="space-y-2 mb-4">
                  {achievements.unlocked.slice(0, 3).map((achievement) => (
                    <div
                      key={achievement.id}
                      className="p-2 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center"
                    >
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-xl mr-2">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm text-yellow-800">{achievement.name}</h4>
                        <p className="text-xs text-yellow-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}

                  <Link
                    to="/conquistas"
                    className="inline-block text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    Ver todas as conquistas
                  </Link>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-neutral-50 rounded-lg text-center text-neutral-600 text-sm">
                  Complete desafios para desbloquear conquistas
                </div>
              )}

              {/* Links rápidos */}
              <h3 className="font-medium text-neutral-700 mb-2">Links Rápidos</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/perfil"
                  className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm">Meu Perfil</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span className="text-sm">Chat</span>
                </Link>

                <Link
                  to="/desafios?topic=html"
                  className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span className="text-sm">HTML</span>
                </Link>

                <Link
                  to="/desafios?topic=css"
                  className="flex items-center p-3 bg-neutral-50 hover:bg-neutral-100 rounded-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.172 2.172a2 2 0 010 2.828l-8.486 8.486a2 2 0 01-2.828 0l-2.172-2.172a2 2 0 010-2.828L7.343 11" />
                  </svg>
                  <span className="text-sm">CSS</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trilha de aprendizado */}
        <div className="mb-6">
          <LearningPath />
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;