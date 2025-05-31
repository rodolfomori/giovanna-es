import PropTypes from 'prop-types';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../utils/cn';

const CodeBlockWithCopy = ({ code, children }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    // Extract text content from the code element
    const codeElement = code?.props?.children;
    if (codeElement) {
      const textToCopy = typeof codeElement === 'string'
        ? codeElement
        : Array.isArray(codeElement)
          ? codeElement.join('')
          : '';

      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative group">
      <button
        onClick={copyToClipboard}
        className={cn(
          "absolute top-2 right-2 p-1.5 rounded-md transition-all",
          "bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600",
          "focus:opacity-100",
          "text-neutral-700 dark:text-neutral-300"
        )}
        aria-label="Copiar código"
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      {children}
    </div>
  );
};

CodeBlockWithCopy.propTypes = {
  code: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const MarkdownRenderer = ({ markdown, className }) => {
  if (!markdown) return null;

  return (
    <div className={cn("markdown-content prose prose-neutral dark:prose-invert max-w-none", className)}>
      <ReactMarkdown
        components={{
          h3: ({ ...props }) => (
            <h3 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-3 pb-1 border-b border-neutral-200 dark:border-neutral-700" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-neutral-700 dark:text-neutral-300 mb-4" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal pl-5 space-y-2 mb-4" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc pl-5 space-y-2 mb-4" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="text-neutral-700 dark:text-neutral-300" {...props} />
          ),
          code: ({ inline, children, ...props }) => {
            if (inline) {
              return (
                <code className="px-1 py-0.5 rounded text-neutral-900 dark:text-neutral-200" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="text-neutral-900 dark:text-neutral-200" {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children, ...props }) => (
            <CodeBlockWithCopy code={children}>
              <pre className="p-4 my-4 rounded-lg bg-neutral-100 text-neutral-900 dark:text-neutral-200 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 overflow-auto" {...props}>
                {children}
              </pre>
            </CodeBlockWithCopy>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
};

MarkdownRenderer.propTypes = {
  markdown: PropTypes.string,
  className: PropTypes.string
};

MarkdownRenderer.defaultProps = {
  className: ''
};

export default MarkdownRenderer; 