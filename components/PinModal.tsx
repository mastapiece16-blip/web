import React, { useState, useEffect } from 'react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (pin: string) => string; // Returns an error message string or ""
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Reset state when modal opens
    if (isOpen) {
      setPin('');
      setError('');
    }
  }, [isOpen]);
  
  const handleConfirmClick = () => {
    const errorMsg = onConfirm(pin);
    if (errorMsg) {
      setError(errorMsg);
      setPin('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleConfirmClick();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 w-full max-w-sm m-4 text-center transform transition-all duration-300 scale-100">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Acceso Restringido</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Por favor, introduce tu PIN para ver el historial de actividad.
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          onKeyPress={handleKeyPress}
          maxLength={4}
          className={`w-full text-center text-2xl tracking-[1rem] px-4 py-3 rounded-lg border ${error ? 'border-red-500' : 'border-slate-300 dark:border-slate-600'} bg-slate-50/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200`}
          autoFocus
        />
        {error && <p className="text-red-500 dark:text-red-400 mt-2 text-sm">{error}</p>}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-300 dark:hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 dark:focus:ring-offset-slate-800 transition duration-200"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirmClick}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 transition duration-200"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinModal;
