import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const AboutPage = () => {
  return (
    <AppLayout>
      <div className="container py-6 md:py-8">
        {/* Cabeçalho */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-white">
            Sobre o Assistente Giovanna
          </h1>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Conheça mais sobre este assistente de programação e como ele pode ajudar você
          </p>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto">
          {/* Seção de introdução */}
          <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 mb-8 transition-colors duration-200">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">O que é o Assistente Giovanna?</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              O <strong>Assistente Giovanna</strong> é uma ferramenta educacional criada para ajudar alunos da <em>Missão Programação do Zero</em> a aprenderem programação de forma mais eficiente e interativa. Utilizando inteligência artificial, a Giovanna pode responder a perguntas, explicar conceitos e oferecer orientação para ajudar você a dominar HTML, CSS e JavaScript.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300 mb-4">
              Projetado especialmente para pessoas em transição de carreira e iniciantes em programação, o assistente explica conceitos técnicos de forma simples e acessível, utilizando analogias do dia a dia e exemplos práticos.
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Link to="/" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors duration-200">
                Iniciar conversa
              </Link>
              <Link to="/desafios" className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-medium transition-colors duration-200">
                Ver desafios
              </Link>
            </div>
          </section>

          {/* Como usar */}
          <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 mb-8 transition-colors duration-200">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Como usar o Assistente</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
                <div className="flex items-center mb-3">
                  <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">Chat com Giovanna</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Faça perguntas sobre HTML, CSS, JavaScript ou programação em geral. A Giovanna responderá com explicações claras e exemplos práticos adaptados para iniciantes.
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Pergunte sobre conceitos específicos</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Peça explicações de códigos</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Solicite exemplos práticos</span>
                  </li>
                </ul>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-5 bg-neutral-50 dark:bg-neutral-800 transition-colors duration-200">
                <div className="flex items-center mb-3">
                  <div className="bg-secondary-100 dark:bg-secondary-900 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-600 dark:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-800 dark:text-white">Desafios de Programação</h3>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Pratique seus conhecimentos com desafios interativos de múltipla escolha e completar código. Receba feedback imediato e solicite dicas quando precisar de ajuda.
                </p>
                <ul className="mt-3 space-y-1">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Escolha entre HTML, CSS ou JavaScript</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Obtenha dicas quando estiver travado</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-600 dark:text-secondary-400 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">Veja explicações das soluções</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Perguntas frequentes */}
          <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 mb-8 transition-colors duration-200">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Perguntas Frequentes</h2>

            <div className="space-y-4">
              <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                <h3 className="font-semibold text-neutral-800 dark:text-white mb-2">O assistente Giovanna pode me ajudar com outras linguagens além de HTML, CSS e JavaScript?</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  O Assistente Giovanna é especializado em tecnologias web fundamentais: HTML, CSS e JavaScript. Esta especialização permite oferecer explicações mais detalhadas e focadas para iniciantes nessas tecnologias. No futuro, poderemos expandir para outras linguagens.
                </p>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                <h3 className="font-semibold text-neutral-800 dark:text-white mb-2">Posso fazer perguntas sobre assuntos não relacionados à programação?</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  A Giovanna foi projetada especificamente para auxiliar em questões relacionadas à programação e desenvolvimento web. Ela não está equipada para responder perguntas sobre outros tópicos e irá educadamente redirecionar a conversa para assuntos de programação.
                </p>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-700 pb-4">
                <h3 className="font-semibold text-neutral-800 dark:text-white mb-2">Como posso aproveitar melhor as respostas da Giovanna?</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Para obter respostas mais úteis, seja específico em suas perguntas. Se possível, forneça contexto ou exemplos do que você está tentando entender. Você também pode pedir para simplificar explicações se achar que estão muito complexas, ou solicitar exemplos adicionais.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-neutral-800 dark:text-white mb-2">Os desafios são atualizados com frequência?</h3>
                <p className="text-neutral-700 dark:text-neutral-300">
                  Sim, nossa equipe trabalha constantemente para adicionar novos desafios e manter o conteúdo atualizado com as melhores práticas do mercado. Recomendamos verificar regularmente a seção de desafios para encontrar novos exercícios.
                </p>
              </div>
            </div>
          </section>

          {/* Tecnologias usadas */}
          <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-6 md:p-8 transition-colors duration-200">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-white mb-4">Tecnologias Utilizadas</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-6">
              O Assistente Giovanna foi desenvolvido com as seguintes tecnologias:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm transition-all bg-white dark:bg-neutral-800">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.93zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z" />
                  </svg>
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">React</span>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm transition-all bg-white dark:bg-neutral-800">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
                  </svg>
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Tailwind CSS</span>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm transition-all bg-white dark:bg-neutral-800">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
                  </svg>
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Node.js</span>
              </div>

              <div className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4 text-center hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-sm transition-all bg-white dark:bg-neutral-800">
                <div className="bg-neutral-100 dark:bg-neutral-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-7 h-7 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z" />
                  </svg>
                </div>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">Express</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 transition-colors duration-200">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  Este assistente utiliza Ollama, uma API de IA local e open-source, para fornecer respostas. O projeto foi estruturado para permitir fácil substituição por outras APIs de IA como OpenAI, Anthropic ou Google AI caso necessário.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutPage;