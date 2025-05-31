import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// URL base da API
const API_URL = import.meta.env.VITE_API_BASE_URL;

const GitHubCallbackPage = () => {
  const [status, setStatus] = useState('Processando autenticação...');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the authorization code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (!code) {
      setError('Código de autorização não encontrado. A autenticação falhou.');
      return;
    }

    // Exchange the code for an access token
    const exchangeCodeForToken = async () => {
      try {
        setStatus('Obtendo token de acesso...');

        // Call our backend to exchange the code for a token
        const response = await axios.post(`${API_URL}/api/github/exchange-code`, { code });

        if (response.data.access_token) {
          // Store the access token in localStorage
          localStorage.setItem('chatbot_github_token', response.data.access_token);

          setStatus('Autenticação com GitHub realizada com sucesso! Redirecionando...');

          // Redirect back to the code check page
          return setTimeout(() => {
            navigate('/correcao-codigo?tab=github');
          }, 1500);
        } else {
          setError('Não foi possível obter o token de acesso. Por favor, tente novamente.');
        }
      } catch (error) {
        console.error('Error exchanging code for token:', error);
        setError('Erro ao trocar o código por um token. Por favor, tente novamente.');
      }
    };

    exchangeCodeForToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
        <div className="text-center">
          <svg className="h-16 w-16 mx-auto mb-4 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>

          <h2 className="text-xl font-semibold mb-2 text-neutral-800 dark:text-white">
            GitHub Authentication
          </h2>

          {!error ? (
            <div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                {status}
              </p>

              <div className="flex justify-center">
                <svg className="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          ) : (
            <div>
              <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 mb-4">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>

              <button
                onClick={() => navigate('/code-check')}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
              >
                Voltar para Análise de Código
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubCallbackPage; 