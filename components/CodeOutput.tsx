
import React, { useState, useEffect } from 'react';

interface CodeOutputProps {
  code: string;
  language: string;
}

export const CodeOutput: React.FC<CodeOutputProps> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers or if navigator.clipboard is not available
      const textArea = document.createElement("textarea");
      textArea.value = code;
      textArea.style.position = "fixed"; //avoid scrolling to bottom
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
      } catch (execErr) {
        console.error('Fallback failed to copy text: ', execErr);
        alert("Failed to copy code. Please copy it manually.");
      }
      document.body.removeChild(textArea);
    }
  };
  
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div className="mt-8 bg-slate-900/70 rounded-lg shadow-inner">
      <div className="flex justify-between items-center px-4 py-2 border-b border-slate-700">
        <h3 className="text-lg font-semibold text-purple-300">Generated Code ({language})</h3>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-sm font-medium rounded-md flex items-center transition-colors duration-150
                     bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-slate-100
                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-purple-500"
        >
          {copied ? (
             <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5 text-green-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto whitespace-pre-wrap break-words">
        <code className={`language-${language} text-slate-200`}>{code}</code>
      </pre>
    </div>
  );
};
