
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800/30 text-center p-4 mt-12">
      <p className="text-sm text-slate-400">
        &copy; {new Date().getFullYear()} AI Code Assistant. Powered by Gemini.
      </p>
    </footer>
  );
};
