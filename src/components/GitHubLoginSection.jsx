import axios, { AxiosError } from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const GitHubLoginSection = ({ onCodeSelect, isAnalyzing }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [repositories, setRepositories] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState('');
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [files, setFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Common image folder names to filter out
    const imagesFolderNames = [
        'images', 'imgs', 'img', 'pictures', 'pics', 'assets/images',
        'assets/img', 'static/images', 'static/img', 'public/images',
        'public/img', 'src/assets/images', 'src/assets/img', 'media',
        'icons', 'thumbnails', 'photos', 'avatars'
    ];

    // GitHub OAuth settings
    const GITHUB_CLIENT_ID = 'Ov23li3INAAPPidJ2X7X';
    const REDIRECT_URI = window.location.origin + '/github-callback';

    // Check if user is already authenticated on component mount
    useEffect(() => {
        const token = localStorage.getItem('chatbot_github_token');
        if (token) {
            fetchUserData(token);
        }

        async function fetchUserData(token) {
            try {
                setLoading(true);
                // Use the token to fetch user data from GitHub API
                const response = await axios.get('https://api.github.com/user', {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                setUser(response.data);
                setIsAuthenticated(true);
                fetchUserRepositories(token);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Falha ao carregar dados do usuário. Por favor, tente fazer login novamente.');
                // If there's an error, the token might be invalid or expired
                localStorage.removeItem('chatbot_github_token');
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
    }, []);


    // Fetch user repositories
    const fetchUserRepositories = async (token) => {
        try {
            setLoading(true);
            const response = await axios.get('https://api.github.com/user/repos', {
                headers: {
                    Authorization: `token ${token}`,
                },
                params: {
                    sort: 'updated',
                    per_page: 100,
                },
            });

            setRepositories(response.data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
            setError('Falha ao carregar repositórios. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Handle GitHub login
    const handleLogin = () => {
        // Redirect user to GitHub OAuth authorization page
        const authUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=repo,read:user`;
        window.location.href = authUrl;
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('chatbot_github_token');
        setIsAuthenticated(false);
        setUser(null);
        setRepositories([]);
        setBranches([]);
        setFiles([]);
        setSelectedRepo('');
        setSelectedBranch('');
        setSelectedFiles([]);
    };

    // Handle repository selection
    const handleRepoSelect = async (e) => {
        const repoFullName = e.target.value;
        setSelectedRepo(repoFullName);
        setSelectedBranch('');
        setSelectedFiles([]);
        setFiles([]);

        if (!repoFullName) return;

        try {
            setLoading(true);
            const token = localStorage.getItem('chatbot_github_token');
            const response = await axios.get(`https://api.github.com/repos/${repoFullName}/branches`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            setBranches(response.data);
            // Auto-select default branch if it exists
            const defaultBranch = response.data.find(branch =>
                branch.name === repositories.find(repo => repo.full_name === repoFullName)?.default_branch
            );

            if (defaultBranch) {
                setSelectedBranch(defaultBranch.name);
                fetchFiles(repoFullName, defaultBranch.name);
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setError('Falha ao carregar branches. Por favor, tente novamente.');
            setBranches([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle branch selection
    const handleBranchSelect = async (e) => {
        const branchName = e.target.value;
        setSelectedBranch(branchName);
        setSelectedFiles([]);

        if (!branchName || !selectedRepo) return;

        fetchFiles(selectedRepo, branchName);
    };

    // Fetch files from repository
    const fetchFiles = async (repoFullName, branchName) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('chatbot_github_token');
            const response = await axios.get(`https://api.github.com/repos/${repoFullName}/git/trees/${branchName}?recursive=1`, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            // Filter to include only files, not directories, and exclude image folders
            const filesList = response.data.tree.filter(item => {
                // Filter out directories, except for checking image folders
                if (item.type !== 'blob') return false;

                // Only include code files with these extensions
                const isCodeFile = item.path.endsWith('.js') ||
                    item.path.endsWith('.jsx') ||
                    item.path.endsWith('.ts') ||
                    item.path.endsWith('.tsx') ||
                    item.path.endsWith('.html') ||
                    item.path.endsWith('.css') ||
                    item.path.endsWith('.py') ||
                    item.path.endsWith('.java') ||
                    item.path.endsWith('.php') ||
                    item.path.endsWith('.c') ||
                    item.path.endsWith('.cpp');

                // Filter out image folders
                const isInImageFolder = imagesFolderNames.some(folder =>
                    item.path.toLowerCase().includes(`/${folder.toLowerCase()}/`) ||
                    item.path.toLowerCase().startsWith(`${folder.toLowerCase()}/`)
                );

                return isCodeFile && !isInImageFolder;
            });

            setFiles(filesList);
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Falha ao carregar arquivos. Por favor, tente novamente.');
            setFiles([]);
        } finally {
            setLoading(false);
        }
    };

    // Handle file selection with checkboxes
    const handleFileSelect = (filePath) => {
        setSelectedFiles(prev => {
            // If file is already selected, remove it
            if (prev.includes(filePath)) {
                return prev.filter(path => path !== filePath);
            }

            // If trying to add more than 5 files, show error
            if (prev.length >= 5) {
                setError('Você só pode selecionar até 5 arquivos de cada vez.');
                return prev;
            }

            // Add the file to selected files
            return [...prev, filePath];
        });
    };

    // Handle analyzing selected files
    const handleAnalyzeSelectedFiles = async () => {
        if (!selectedFiles.length) {
            setError('Por favor, selecione pelo menos um arquivo para analisar.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('chatbot_github_token');
            const fileContents = [];

            // Fetch content for each selected file
            for (const filePath of selectedFiles) {
                const response = await axios.get(`https://api.github.com/repos/${selectedRepo}/contents/${filePath}?ref=${selectedBranch}`, {
                    headers: {
                        Authorization: `token ${token}`,
                    },
                });

                const content = atob(response.data.content);
                fileContents.push({
                    path: filePath,
                    content: content
                });
            }

            // If only one file is selected, use the existing pattern
            if (fileContents.length === 1) {
                onCodeSelect(fileContents[0].content);
            } else {
                // For multiple files, create a combined code string with file headers
                const combinedContent = fileContents.map(file =>
                    `------- Arquivo: ${file.path} -------\n\n${file.content}\n\n`
                ).join('\n');

                onCodeSelect(combinedContent);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 401) {
                    setError('Token inválido. Por favor, tente fazer login novamente.');
                    handleLogout();
                }
            }
            console.error('Error fetching file content:', error);
            setError('Falha ao carregar conteúdo dos arquivos. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    // Render the component
    return (
        <div>
            {!isAuthenticated ? (
                <div className="text-center py-6">
                    <h3 className="text-neutral-700 dark:text-neutral-300 font-medium mb-4">
                        Conecte-se ao GitHub para analisar seus repositórios
                    </h3>
                    <button
                        onClick={handleLogin}
                        disabled={isAnalyzing}
                        className="flex items-center justify-center mx-auto px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
                    >
                        <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        Entrar com GitHub
                    </button>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-3">
                        Iremos solicitar permissão apenas para ler seus repositórios públicos e privados
                    </p>
                </div>
            ) : (
                <div>
                    {/* User info section */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            {user?.avatar_url && (
                                <img
                                    src={user.avatar_url}
                                    alt={`${user.login}'s avatar`}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                            )}
                            <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                {user?.login}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                            Sair
                        </button>
                    </div>

                    {/* Repository selection */}
                    <div className="mb-4">
                        <label htmlFor="repository-select" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                            Selecione um repositório
                        </label>
                        <select
                            id="repository-select"
                            value={selectedRepo}
                            onChange={handleRepoSelect}
                            disabled={loading || isAnalyzing}
                            className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                        >
                            <option value="">Selecione um repositório...</option>
                            {repositories.map(repo => (
                                <option key={repo.id} value={repo.full_name}>
                                    {repo.name} {repo.private ? '(Privado)' : '(Público)'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Branch selection */}
                    {selectedRepo && branches.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="branch-select" className="block text-neutral-700 dark:text-neutral-300 font-medium mb-2">
                                Selecione uma branch
                            </label>
                            <select
                                id="branch-select"
                                value={selectedBranch}
                                onChange={handleBranchSelect}
                                disabled={loading || isAnalyzing}
                                className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
                            >
                                <option value="">Selecione uma branch...</option>
                                {branches.map(branch => (
                                    <option key={branch.name} value={branch.name}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {/* Files selection with checkboxes */}
                    {selectedBranch && files.length > 0 && (
                        <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-neutral-700 dark:text-neutral-300 font-medium">
                                    Selecione até 5 arquivos
                                </label>
                                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {selectedFiles.length}/5 arquivos selecionados
                                </span>
                            </div>

                            <div className="border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 max-h-60 overflow-y-auto p-2">
                                <ul className="divide-y divide-neutral-200 dark:divide-neutral-700">
                                    {files.map(file => (
                                        <li key={file.path} className="py-2 px-1">
                                            <label className="flex items-center cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700 p-1 rounded">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFiles.includes(file.path)}
                                                    onChange={() => handleFileSelect(file.path)}
                                                    disabled={!selectedFiles.includes(file.path) && selectedFiles.length >= 5 || loading || isAnalyzing}
                                                    className="mr-3 h-4 w-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                                />
                                                <span className="text-neutral-800 dark:text-neutral-200 text-sm truncate">
                                                    {file.path}
                                                </span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="mt-4">
                                    <button
                                        onClick={handleAnalyzeSelectedFiles}
                                        disabled={loading || isAnalyzing}
                                        className="py-2 px-4 bg-primary-600 text-white rounded font-medium hover:bg-primary-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading || isAnalyzing ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Analisando arquivos...
                                            </span>
                                        ) : (
                                            <>Analisar {selectedFiles.length} {selectedFiles.length === 1 ? 'arquivo' : 'arquivos'}</>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Loading spinner */}
                    {loading && !selectedFiles.length && (
                        <div className="flex justify-center py-4">
                            <svg className="animate-spin h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
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
                </div>
            )}
        </div>
    );
};

export default GitHubLoginSection;

GitHubLoginSection.propTypes = {
    onCodeSelect: PropTypes.func.isRequired,
    isAnalyzing: PropTypes.bool.isRequired,
};

