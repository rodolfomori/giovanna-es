import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ReactMarkdown from 'react-markdown';

const Message = ({ message, isUser, animate = true }) => {
  const messageRef = useRef(null);

  // Detectar elementos de código para aplicar resaltado sintáctico
  useEffect(() => {
    if (messageRef.current) {
      const codeBlocks = messageRef.current.querySelectorAll('pre code');
      if (codeBlocks.length > 0) {
        // Prism.highlightAll(); // Descomentar si estás usando Prism directamente
      }
    }
  }, [message]);

  // Variantes de animación para entrada de mensajes
  const messageVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 30,
        mass: 1
      }
    }
  };

  // Formatear contenido del mensaje con Markdown
  const formatMessageContent = (content) => {
    if (!content) return content;

    return (
      <ReactMarkdown
        components={{
          // Formatear bloques de código con sintaxis resaltada
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                style={tomorrow}
                PreTag="div"
                className="rounded-lg my-4 overflow-hidden"
                showLineNumbers={true}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className="inline-code font-mono text-sm px-1.5 py-0.5 rounded bg-gray-100 dark:bg-secondary-light text-secondary dark:text-gray-100 transition-colors duration-200" {...props}>
                {children}
              </code>
            );
          },
          // Estilizar párrafos
          p: ({ children }) => <p className="mb-4 last:mb-0 transition-colors duration-200">{children}</p>,
          // Estilizar listas
          ul: ({ children }) => <ul className="list-disc ml-6 mb-4 space-y-1 transition-colors duration-200">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 space-y-1 transition-colors duration-200">{children}</ol>,
          // Estilizar encabezados
          h1: ({ children }) => <h1 className="text-xl font-bold mb-4 text-secondary dark:text-white transition-colors duration-200">{children}</h1>,
          h2: ({ children }) => <h2 className="text-lg font-bold mb-3 text-secondary dark:text-white transition-colors duration-200">{children}</h2>,
          h3: ({ children }) => <h3 className="text-base font-bold mb-2 text-secondary dark:text-white transition-colors duration-200">{children}</h3>,
          // Estilizar enlaces
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary underline transition-colors duration-200"
            >
              {children}
            </a>
          ),
          // Estilizar bloques de cita
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-gray-600 dark:text-gray-300 transition-colors duration-200">
              {children}
            </blockquote>
          ),
          // Estilizar imágenes
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt || "Image"} 
              className="max-w-full h-auto rounded-lg my-4 shadow-md"
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    );
  };

  return (
    <motion.div 
      ref={messageRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}
      variants={animate ? messageVariants : {}}
      initial={animate ? "hidden" : "visible"}
      animate="visible"
    >
      <div 
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 shadow-sm transition-all duration-300 ${
          isUser 
            ? 'bg-primary text-white rounded-tr-none' 
            : 'bg-white dark:bg-secondary-800 border border-gray-100 dark:border-secondary-700 rounded-tl-none'
        }`}
      >
        {!isUser && (
          <div className="flex items-center mb-3">
            <div className="bg-primary bg-opacity-10 dark:bg-opacity-20 rounded-full w-8 h-8 flex items-center justify-center mr-3 transition-colors duration-200">
              <span className="text-primary text-sm font-bold">G</span>
            </div>
            <span className="font-medium text-sm text-secondary-light dark:text-gray-200 transition-colors duration-200">Giovanna</span>
            
            {/* Indicador de asistente IA */}
            <span className="ml-2 text-xs px-1.5 py-0.5 bg-primary/10 dark:bg-primary/20 rounded text-primary">IA</span>
          </div>
        )}
        
        <div className={`${isUser ? 'text-white' : 'text-secondary-light dark:text-gray-200'} transition-colors duration-200`}>
          {formatMessageContent(message.content)}
        </div>
        
        {/* Decoración de esquinas */}
        {isUser ? (
          // Decoración para mensajes del usuario
          <div className="absolute top-0 right-0 border-primary-dark border-t-8 border-r-8 border-b-0 border-l-0"></div>
        ) : (
          // Decoración para mensajes del asistente
          <div className="absolute top-0 left-0 border-gray-100 dark:border-secondary-700 border-t-8 border-l-8 border-b-0 border-r-0 transition-colors duration-200"></div>
        )}
      </div>
    </motion.div>
  );
};

export default Message;