import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';
import StethoscopeIcon from './icons/StethoscopeIcon';

interface DiseaseInputProps {
  onSubmit: (diseaseName: string) => void;
  isLoading: boolean;
}

const DiseaseInput: React.FC<DiseaseInputProps> = ({ onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="flex items-center w-full p-2 rounded-full bg-slate-100/80 dark:bg-slate-700/80 border border-slate-300/80 dark:border-slate-600/80 shadow-inner focus-within:ring-2 focus-within:ring-red-500 transition-all duration-300">
        <div className="pl-3 pr-2 text-slate-400 dark:text-slate-500">
            <StethoscopeIcon className="h-6 w-6" />
        </div>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isLoading ? "BAYMAX está pensando..." : "Describe un síntoma o condición..."}
            className="w-full px-2 py-3 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none"
            disabled={isLoading}
        />
        <div className="pr-2">
            {isLoading ? (
                <div className="flex items-center justify-center h-12 w-12">
                    <div className="w-6 h-6 border-2 border-t-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <button
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="h-12 w-12 rounded-full bg-red-600 text-white flex items-center justify-center transition-all duration-300 transform enabled:hover:bg-red-700 enabled:hover:scale-110 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:scale-95 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800"
                    aria-label="Analizar"
                >
                    <SendIcon className="h-6 w-6" />
                </button>
            )}
        </div>
      </div>
    </form>
  );
};

export default DiseaseInput;