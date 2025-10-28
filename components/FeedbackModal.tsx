import React, { useEffect } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onSubmit: (rating: number) => void; // Called when submitting feedback
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onSubmit }) => {

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-lg m-4 text-center transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">¿Qué te pareció el proyecto?</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          En una escala del 1 al 10, ¿qué tan útil te resultó esta aplicación? <br/>
          <strong>Presiona un número para calificar y salir.</strong>
        </p>
        
        <div className="flex justify-center flex-wrap gap-2 my-6">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => onSubmit(num)}
              className="w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg transition-all duration-200 border-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:border-red-500 hover:scale-110 hover:bg-red-600 hover:text-white"
              aria-label={`Calificar con ${num}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
