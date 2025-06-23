
import React from 'react';
import { LanguageOption } from '../types';

interface PromptInputProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  selectedLanguage: LanguageOption;
  onLanguageChange: (language: LanguageOption) => void;
  onSubmit: () => void;
  isLoading: boolean;
  languages: LanguageOption[];
}

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  onPromptChange,
  selectedLanguage,
  onLanguageChange,
  onSubmit,
  isLoading,
  languages,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-purple-300 mb-1">
          Describe what code you want to generate:
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={5}
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-slate-100 placeholder-slate-400 transition duration-150"
          placeholder="e.g., A Python function to reverse a string, or a React component for a contact form with validation..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label htmlFor="language" className="block text-sm font-medium text-purple-300 mb-1">
          Select Programming Language:
        </label>
        <select
          id="language"
          name="language"
          className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-slate-100 h-12 transition duration-150"
          value={selectedLanguage.value}
          onChange={(e) => {
            const lang = languages.find(l => l.value === e.target.value);
            if (lang) onLanguageChange(lang);
          }}
          disabled={isLoading}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 group"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.25 12V7.5a4.5 4.5 0 0 0-4.5-4.5H9.75M18.25 12H15V9.75M18.25 12A2.25 2.25 0 0 1 16 14.25h-2.25m0-1.5H12a2.25 2.25 0 0 1-2.25-2.25V7.5M15 12A2.25 2.25 0 0 1 12.75 15h-1.5A2.25 2.25 0 0 1 9 12.75V12m0-1.5V7.5m1.5-1.5h-1.5" />
            </svg>
            Generate Code
          </>
        )}
      </button>
    </div>
  );
};
