
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { CodeOutput } from './components/CodeOutput';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Footer } from './components/Footer';
import { generateCodeWithGemini } from './services/geminiService';
import { SUPPORTED_LANGUAGES } from './constants';
import { LanguageOption } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageOption>(SUPPORTED_LANGUAGES[0]);
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Prompt cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedCode('');

    try {
      const code = await generateCodeWithGemini(prompt, selectedLanguage.value);
      setGeneratedCode(code);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt, selectedLanguage]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <p className="text-lg text-slate-300 mb-8 text-center max-w-2xl">
          Describe the code you need, select a language, and let our AI assistant craft it for you. Note: This tool is for generating code snippets and conceptual examples. Always review and test generated code.
        </p>
        <div className="w-full max-w-3xl bg-slate-800 shadow-2xl rounded-lg p-6 md:p-8">
          <PromptInput
            prompt={prompt}
            onPromptChange={setPrompt}
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
            onSubmit={handleGenerateCode}
            isLoading={isLoading}
            languages={SUPPORTED_LANGUAGES}
          />
          {error && <ErrorDisplay message={error} onClose={() => setError(null)} />}
          {isLoading && <LoadingSpinner />}
          {generatedCode && !isLoading && <CodeOutput code={generatedCode} language={selectedLanguage.value} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
