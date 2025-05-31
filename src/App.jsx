import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotifications from './components/ToastNotifications';
import './index.css';
import { LanguageProvider } from './utils/LanguageContext';

// Páginas
import AboutPage from './pages/AboutPage';
import AchievementsPage from './pages/AchievementsPage';
import ChallengesPage from './pages/ChallengesPage';
import ChatPage from './pages/ChatPage';
import CodeCheckPage from './pages/CodeCheckPage';
import GitHubCallbackPage from './pages/GitHubCallbackPage';
import ProfilePage from './pages/ProfilePage';
function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Configuração global das notificações toast */}
        <ToastNotifications />

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/desafios" element={<ChallengesPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/conquistas" element={<AchievementsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/correcao-codigo" element={<CodeCheckPage />} />
          <Route path="/github-callback" element={<GitHubCallbackPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;