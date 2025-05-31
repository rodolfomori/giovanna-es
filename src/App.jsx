import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import ToastNotifications from './components/ToastNotifications';
import './index.css';
import { LanguageProvider } from './utils/LanguageContext';

// Páginas
import ChatPage from './pages/ChatPage';
import CodeCheckPage from './pages/CodeCheckPage';
import GitHubCallbackPage from './pages/GitHubCallbackPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <LanguageProvider>
      <Router>
        {/* Configuración global de las notificaciones toast */}
        <ToastNotifications />

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/correcao-codigo" element={<CodeCheckPage />} />
          <Route path="/github-callback" element={<GitHubCallbackPage />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;