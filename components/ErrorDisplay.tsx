
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onClose: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="my-6 p-4 bg-red-700/30 border border-red-500 text-red-300 rounded-md shadow-lg flex items-center justify-between animate-fadeIn">
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3 text-red-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <span>{message}</span>
      </div>
      <button 
        onClick={onClose} 
        className="p-1 rounded-full hover:bg-red-600/50 transition-colors"
        aria-label="Close error message"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
