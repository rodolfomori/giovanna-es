import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import GitHubLoginSection from '../components/GitHubLoginSection';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useLanguage } from '../utils/LanguageContext';
import { cn } from '../utils/cn';

// Define enum for tabs
const TABS = {
  PASTE: 'paste',
  UPLOAD: 'upload',
  GITHUB: 'github'
};

// URL base de la API
const API_URL = import.meta.env.VITE_API_BASE_URL;

const CodeCheckPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(TABS.PASTE);
  const [code, setCode] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState('');

  // Initialize tab from URL query parameter
  useEffect(() => {
    const tabParam = searchParams.get('tab')?.toLowerCase();
    if (tabParam && Object.values(TABS).includes(tabParam)) {
      setActiveTab(tabParam);

      // Clear the tab param without page reload
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('tab');
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setAnalysis(null);
    setCode('');
    setError(null);
  };

  // Handle code change in textarea
  const handleCodeChange = (e) => {
    setCode(e.target.value);
    setAnalysis(null);
    setError(null);
  };

  const supportedExtensions = [
    '.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.py',
    '.java', '.php', '.c', '.cpp', '.rb', '.json',
    '.md', '.txt', '.sql', '.sh', '.xml', '.yml', '.yaml',
    '.go', '.cs', '.swift', '.kt', '.rs', '.dart'
  ];
  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Verificar si el archivo tiene una extensión soportada
      let fileExtension = '';
      if (file.name.includes('.')) {
        fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      }

      // Si no tiene extensión o no es soportada, intentamos detectar por el tipo MIME
      let isValidFile = supportedExtensions.includes(fileExtension);

      // Si no tiene extensión válida, verificamos por el tipo MIME para archivos de texto
      if (!isValidFile && file.type.startsWith('text/')) {
        isValidFile = true;
        // Si es texto sin extensión, definimos una extensión predeterminada
        if (!fileExtension) {
          fileExtension = '.txt';
        }
      }

      if (!isValidFile) {
        setError(`Tipo de archivo no soportado. Por favor, envía solo archivos de código o texto.`);
        e.target.value = ''; // Limpiar el input de archivo
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target.result;

          // Verifica si el contenido es texto válido
          if (typeof content === 'string') {
            setCode(content);
            setError(null);
          } else {
            throw new Error('El contenido del archivo no es texto válido');
          }
        } catch (error) {
          console.error('Error al leer el archivo:', error);
          setError('No fue posible leer el contenido del archivo. Asegúrate de que es un archivo de texto válido.');
          setCode('');
        }

        setAnalysis(null);
      };

      reader.onerror = () => {
        setError('Error al leer el archivo. Por favor, intenta nuevamente con otro archivo.');
        setCode('');
        setAnalysis(null);
      };

      // Leer como texto
      reader.readAsText(file);
    }
  };


  // Handle analyze code button click
  const handleAnalyzeCode = async (codeContent) => {
    try {
      // Verificar si el contenido es un elemento DOM o evento (que causaría error circular)
      let codeToAnalyze;

      // Si recibimos un parámetro externo
      if (codeContent) {
        // Tratar diferentes tipos de entrada
        if (typeof codeContent === 'string') {
          codeToAnalyze = codeContent;
        } else if (codeContent instanceof Event || codeContent?.target) {
          // Es un evento - ignorar y usar el estado interno
          codeToAnalyze = code;
        } else if (codeContent?.toString) {
          // Intentar convertir a string si es posible
          codeToAnalyze = codeContent.toString();
        } else {
          // Fallback: ignorar entrada inválida y usar el estado
          console.warn('Tipo de entrada no soportado para análisis de código:', typeof codeContent);
          codeToAnalyze = code;
        }
      } else {
        // Sin parámetro externo, usar el estado interno
        codeToAnalyze = code;
      }

      // Verificación final
      if (!codeToAnalyze || typeof codeToAnalyze !== 'string' || !codeToAnalyze.trim()) {
        setError('Por favor, añade algún código para analizar.');
        return;
      }

      setIsAnalyzing(true);
      setError(null);
      setAnalysis(null);

      let response;

      if (activeTab === TABS.PASTE) {
        // Analyze pasted code
        response = await axios.post(`${API_URL}/api/code-check/analyze`, {
          code: codeToAnalyze
        });
      } else if (activeTab === TABS.UPLOAD) {
        // Get file extension for better language detection
        const fileExtension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();

        // Format the code with file info if it's not already formatted
        const fileContent = !codeToAnalyze.startsWith('------- Archivo:')
          ? `------- Archivo: ${fileName} -------\n\n${codeToAnalyze}\n\n`
          : codeToAnalyze;

        // Analyze uploaded file
        response = await axios.post(`${API_URL}/api/code-check/analyze-file`, {
          fileContent: fileContent,
          fileName: fileName || 'unnamed_file',
          fileType: fileExtension.replace('.', '') // Remove the dot from extension
        });
      } else if (activeTab === TABS.GITHUB) {
        // GitHub code might already be formatted with file headers
        response = await axios.post(`${API_URL}/api/code-check/analyze`, {
          code: codeToAnalyze
        });
      }

      if (!response || !response.data) {
        throw new Error('Respuesta inválida del servidor');
      }

      setAnalysis(response.data.analysis);
    } catch (err) {
      console.error('Error analyzing code:', err);
      setError(
        err.response?.data?.message ||
        'No fue posible analizar el código en este momento. Por favor, intenta nuevamente más tarde.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <AppLayout>
      <div className="container py-6 md:py-8">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
            {t('common.codeCheck')}
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Encuentra bugs, recibe consejos y aprende a mejorar tu código
          </p>
        </div>

        {/* Main content */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden transition-colors duration-200">
          {/* Tabs */}
          <div className="flex border-b border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => handleTabChange(TABS.PASTE)}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${activeTab === TABS.PASTE
                ? 'text-primary-600 dark:text-primary-500 border-b-2 border-primary-600 dark:border-primary-500'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-500'
                }`}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Pegar Código
              </div>
            </button>

            <button
              onClick={() => handleTabChange(TABS.UPLOAD)}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${activeTab === TABS.UPLOAD
                ? 'text-primary-600 dark:text-primary-500 border-b-2 border-primary-600 dark:border-primary-500'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-500'
                }`}
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Subir Archivo
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Content based on active tab */}
            {activeTab === TABS.PASTE && (
              <div>
                <label htmlFor="code-input" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                  Pega tu código aquí
                </label>
                <textarea
                  id="code-input"
                  value={code}
                  onChange={handleCodeChange}
                  className={cn(
                    "w-full h-64 p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg",
                    "bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200",
                    isAnalyzing && "animate-pulse pointer-events-none opacity-80"
                  )}
                  placeholder="// Pega tu código javascript aquí para análisis&#10;// Ejemplo:&#10;function suma(a, b) {&#10;  return a + b&#10;}"
                ></textarea>
              </div>
            )}

            {activeTab === TABS.UPLOAD && (
              <div>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept={supportedExtensions.join(',')}
                />
                {!code && (
                  <>
                    <label className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                      Sube tu archivo de código
                    </label>
                    <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg p-8 text-center">
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-neutral-400 dark:text-neutral-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span className="text-neutral-700 dark:text-neutral-300 font-medium">Haz clic para elegir un archivo</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">o arrastra y suelta aquí</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs mt-2">
                          Soporta diversos tipos de archivos de código y texto
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs mt-1">
                          (JavaScript, Python, Java, C/C++, HTML, CSS, y más)
                        </span>
                      </label>
                    </div>
                  </>
                )}

                {code && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-neutral-700 dark:text-neutral-300 font-medium mb-2">Archivo cargado: {fileName}</h3>
                      <label className={cn(
                        "flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg p-2",
                        "text-neutral-700 dark:text-neutral-300 font-medium mb-2 transition-colors duration-200",
                        "hover:text-primary-600 hover:border-primary-600 dark:hover:text-primary-500 dark:hover:border-primary-500 cursor-pointer",
                      )} htmlFor='file-upload'
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Reemplazar código
                      </label>
                    </div>
                    <div className="p-4 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-mono text-sm max-h-48 overflow-y-auto">
                      {code}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === TABS.GITHUB && (
              <GitHubLoginSection
                onCodeSelect={codeContent => handleAnalyzeCode(codeContent)}
                isAnalyzing={isAnalyzing}
              />
            )}

            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Analysis Results */}
            {analysis && (
              <div className="mt-6 p-6 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg">
                <div className="flex items-center mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-primary-600 dark:text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    Análisis de Código
                  </h3>
                </div>
                <MarkdownRenderer markdown={analysis} />
              </div>
            )}

            {/* Analyze button */}
            {!analysis && activeTab !== TABS.GITHUB && (
              <div className="mt-6">
                <button
                  onClick={handleAnalyzeCode}
                  disabled={!code || isAnalyzing}
                  className={`py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${code && !isAnalyzing
                    ? 'bg-primary-600 text-white hover:bg-primary-700'
                    : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed'
                    }`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analizando...
                    </span>
                  ) : (
                    'Analizar Código'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Tips section */}
          {!analysis && (
            <div className="p-6 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
              <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
                Consejos para Solucionar Bugs
              </h3>

              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    Lee atentamente los mensajes de error - generalmente señalan el problema exacto.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    Usa console.log() para verificar valores de variables en diferentes puntos del código.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    Divide el problema en partes más pequeñas y prueba cada parte por separado.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    Verifica errores comunes como: paréntesis no cerrados, errores de tipeo en nombres de variables, y confusión entre = (asignación) y == o === (comparación).
                  </span>
                </li>
              </ul>

              <div className="mt-4 p-4 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300">
                    ¿Necesitas más ayuda? Conversa con Giovanna
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default CodeCheckPage;