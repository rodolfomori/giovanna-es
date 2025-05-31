import React, { useState } from 'react';

const DarkModeDemo = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`p-6 ${darkMode ? 'dark bg-neutral-950' : 'bg-neutral-50'} transition-colors duration-200`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
            Demonstração do Tema Escuro
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg flex items-center ${
              darkMode 
                ? 'bg-neutral-800 text-yellow-300 hover:bg-neutral-700' 
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } border ${darkMode ? 'border-neutral-700' : 'border-neutral-200'} transition-colors duration-200`}
          >
            {darkMode ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Modo Claro
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Modo Escuro
              </>
            )}
          </button>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className={`p-6 rounded-xl shadow-sm border ${
            darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
          } transition-colors duration-200`}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
              Card de Exemplo 1
            </h2>
            <p className={`mb-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Este é um exemplo de como os cartões vão aparecer no modo escuro.
              Os textos e cores de fundo são ajustados para melhor legibilidade.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Botão Primário
            </button>
          </div>
          
          <div className={`p-6 rounded-xl shadow-sm border ${
            darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
          } transition-colors duration-200`}>
            <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
              Card de Exemplo 2
            </h2>
            <p className={`mb-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Os componentes mantêm sua aparência visual, mas com paletas de cores otimizadas para o tema escuro.
            </p>
            <button className="bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-800 dark:text-neutral-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
              Botão Secundário
            </button>
          </div>
        </div>

        {/* Form Example */}
        <div className={`p-6 rounded-xl shadow-sm border mb-8 ${
          darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        } transition-colors duration-200`}>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
            Exemplo de Formulário
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                Nome de Usuário
              </label>
              <input 
                type="text" 
                className={`w-full px-3 py-2 rounded-lg ${
                  darkMode 
                    ? 'bg-neutral-800 border-neutral-700 text-white focus:border-primary-500' 
                    : 'bg-white border-neutral-300 text-neutral-900 focus:border-primary-500'
                } border focus:ring-2 focus:ring-primary-200 transition-colors duration-200`}
                placeholder="Seu nome de usuário"
              />
            </div>
            
            <div>
              <label className={`block mb-2 text-sm font-medium ${darkMode ? 'text-neutral-200' : 'text-neutral-700'}`}>
                Tema Preferido
              </label>
              <div className="flex space-x-4">
                <label className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                  !darkMode 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600'
                } transition-colors duration-200`}>
                  <input
                    type="radio"
                    name="theme"
                    value="light"
                    checked={!darkMode}
                    onChange={() => setDarkMode(false)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2">Claro</span>
                </label>
                
                <label className={`flex items-center p-3 rounded-lg border cursor-pointer ${
                  darkMode 
                    ? 'border-primary-500 bg-primary-900 text-primary-400' 
                    : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300'
                } transition-colors duration-200`}>
                  <input
                    type="radio"
                    name="theme"
                    value="dark"
                    checked={darkMode}
                    onChange={() => setDarkMode(true)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2">Escuro</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Progress and Stats Example */}
        <div className={`p-6 rounded-xl shadow-sm border ${
          darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        } transition-colors duration-200`}>
          <h2 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
            Progresso e Estatísticas
          </h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={`font-medium ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>HTML</span>
                <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>65%</span>
              </div>
              <div className={`w-full ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'} rounded-full h-2.5 transition-colors duration-200`}>
                <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={`font-medium ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>CSS</span>
                <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>45%</span>
              </div>
              <div className={`w-full ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'} rounded-full h-2.5 transition-colors duration-200`}>
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className={`font-medium ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>JavaScript</span>
                <span className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>30%</span>
              </div>
              <div className={`w-full ${darkMode ? 'bg-neutral-800' : 'bg-neutral-200'} rounded-full h-2.5 transition-colors duration-200`}>
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            } border transition-colors duration-200`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>42</div>
              <div className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Desafios</div>
            </div>
            
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            } border transition-colors duration-200`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>7</div>
              <div className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Dias Consecutivos</div>
            </div>
            
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            } border transition-colors duration-200`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>12</div>
              <div className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Conquistas</div>
            </div>
            
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
            } border transition-colors duration-200`}>
              <div className={`text-2xl font-bold ${darkMode ? 'text-neutral-100' : 'text-neutral-800'}`}>320</div>
              <div className={darkMode ? 'text-neutral-400' : 'text-neutral-600'}>Pontos</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeDemo;