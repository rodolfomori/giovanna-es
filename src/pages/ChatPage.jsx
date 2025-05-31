import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import AppLayout from '../components/AppLayout';
import EnhancedChatInput from '../components/ChatInput';
import Logo from '../components/Logo';
import EnhancedMessage from '../components/Message';
import EnhancedSuggestedTopics from '../components/SuggestedTopics';
import WelcomeModal from '../components/WelcomeModal';

// URL base da API
// const API_BASE_URL = 'https://chatbot-api.launchcontrol.com.br';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [error, setError] = useState(null);
  const [llmInfo, setLlmInfo] = useState(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const messagesEndRef = useRef(null);

  // Verificar se é o primeiro acesso para mostrar o modal de boas-vindas
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setShowWelcomeModal(true);
    }
  }, []);

  // Função para fechar o modal de boas-vindas
  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  // Obter informações do LLM sendo usado
  const fetchLLMInfo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/llm-info`);
      setLlmInfo(response.data);
    } catch (error) {
      console.error('Erro ao obter informações do LLM:', error);
    }
  };

  // Rolagem automática para o final das mensagens quando novas mensagens chegarem
  useEffect(() => {
    if (messagesEndRef.current) {
      // Usar uma pequena pausa para garantir que o conteúdo foi renderizado
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [messages]);

  // Obter informações do LLM e iniciar conversa ao carregar
  useEffect(() => {
    fetchLLMInfo();
    startConversation();
  }, []);

  // Iniciar uma nova conversa
  const startConversation = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/start-conversation`);
      setConversationId(response.data.conversationId);
      setError(null);
    } catch (error) {
      console.error('Erro ao iniciar conversa:', error);
      setError('Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.');
    }
  };

  // Enviar mensagem para o backend
  const sendMessage = async (inputMessage) => {
    if (!inputMessage.trim() || isLoading) return;

    // Adiciona a mensagem do usuário
    const userMessage = { role: 'user', content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      // Envia a mensagem para o servidor e aguarda a resposta
      const response = await axios.post(`${API_BASE_URL}/api/chat`, {
        message: inputMessage,
        conversationId
      });

      // Adiciona a resposta do assistente
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: response.data.message }
      ]);

      // Atualiza o ID da conversa se necessário
      if (response.data.conversationId) {
        setConversationId(response.data.conversationId);
      }

      // Atualiza as informações do provedor se incluídas na resposta
      if (response.data.provider) {
        setLlmInfo(prev => ({
          ...prev,
          provider: response.data.provider
        }));
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setError('Não foi possível enviar sua mensagem. Verifique sua conexão e tente novamente.');

      // Adiciona mensagem de erro ao chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente em alguns instantes.\n\nGiovanna 👩‍💻'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para lidar com a seleção de um tópico sugerido
  const handleSelectTopic = (prompt) => {
    sendMessage(prompt);
  };

  // Componente de animação de loading
  const LoadingIndicator = () => (
    <div className="flex justify-start mb-6">
      <div className="max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 bg-white dark:bg-secondary-800 border border-gray-100 dark:border-secondary-700 rounded-tl-none shadow-sm transition-colors duration-200">
        <div className="flex items-center mb-3">
          <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 transition-colors duration-200">
            <span className="text-primary text-sm font-bold">G</span>
          </div>
          <span className="font-medium text-sm text-secondary-light dark:text-gray-200 transition-colors duration-200">Giovanna</span>
          <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 dark:bg-primary/20 rounded text-primary">AI</span>
        </div>
        <div className="flex items-center text-secondary-light dark:text-gray-300 transition-colors duration-200">
          <div className="flex space-x-1">
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
            <span className="loading-dot"></span>
          </div>
          <span className="ml-3 text-sm">Digitando...</span>
        </div>
      </div>
    </div>
  );

  // Estado de erro da conexão
  const renderErrorMessage = () => {
    if (!error) return null;

    return (
      <motion.div
        className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 transition-colors duration-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Renderizar estado vazio (sem mensagens)
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="max-w-xl mx-auto text-center py-12"
    >
      <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3 transition-colors duration-200">
        Como posso ajudar você hoje?
      </h2>
      <p className="text-secondary-light dark:text-gray-300 mb-6 max-w-md mx-auto transition-colors duration-200">
        Estou aqui para responder suas dúvidas sobre programação e desenvolvimento web.
        Pergunte sobre HTML, CSS, JavaScript ou qualquer outro conceito!
      </p>

      {/* Tópicos sugeridos */}
      <EnhancedSuggestedTopics onSelectTopic={handleSelectTopic} />
    </motion.div>
  );

  return (
    <AppLayout>
      {/* Modal de boas-vindas */}
      <AnimatePresence>
        {showWelcomeModal && <WelcomeModal onClose={handleCloseWelcomeModal} />}
      </AnimatePresence>

      <div className="container py-8">
        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-center">
            <Logo size="lg" animated={true} className="mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-2 transition-colors duration-300">
              <span className="text-gradient">Giovanna</span> - Assistente de Programação
            </h1>
            <p className="text-lg text-secondary-light dark:text-gray-300 max-w-2xl mx-auto mb-2 transition-colors duration-300">
              Tire suas dúvidas sobre programação e desenvolvimento web
            </p>
            {llmInfo && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 dark:bg-primary/20 text-primary">
                Rodando com {llmInfo.provider === 'groq' ? 'Groq' : 'OpenAI'}
                {llmInfo.model && ` (${llmInfo.model})`}
              </div>
            )}
          </div>
        </motion.div>

        {/* Mostrar erro de conexão se houver */}
        <AnimatePresence>
          {error && renderErrorMessage()}
        </AnimatePresence>

        {/* Área de chat - sem scroll interno */}
        <div className="max-w-4xl mx-auto relative mb-24">
          {/* Background decorativo */}
          <div className="absolute -top-10 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

          <motion.div
            className="bg-white/200 dark:bg-secondary-900/80 backdrop-blur-sm rounded-xl shadow-xl border border-gray-200 dark:border-secondary-800 overflow-hidden transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Conteúdo do chat - sem altura fixa e sem overflow */}
            <div className="p-6 relative">
              {messages.length === 0 ? (
                renderEmptyState()
              ) : (
                <>
                  {/* Mensagens */}
                  {messages.map((message, index) => (
                    <EnhancedMessage
                      key={index}
                      message={message}
                      isUser={message.role === 'user'}
                    />
                  ))}

                  {/* Show loading indicator while waiting for response */}
                  {isLoading && <LoadingIndicator />}

                  {/* Referência para scroll automático */}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Área de digitação - fixada na parte inferior do chat */}
            <div className="sticky bottom-0 p-6 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-secondary-700">
              <EnhancedChatInput
                onSendMessage={sendMessage}
                isLoading={isLoading}
              />
            </div>
          </motion.div>

          {/* Dicas sobre o assistente */}
          <motion.div
            className="text-center mt-6 text-secondary-light dark:text-gray-400 text-sm transition-colors duration-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <p className="mb-1">
              Giovanna é uma assistente especializada em HTML, CSS, JavaScript e conceitos básicos de programação.
            </p>
            {llmInfo && (
              <p>
                Utilizando: {llmInfo.provider === 'groq' ? 'Groq' : 'OpenAI'}
                {llmInfo.model && ` (${llmInfo.model})`}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ChatPage;