import React, { useState } from 'react';

interface WelcomeScreenProps {
  onLogin: (name: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-800 dark:text-slate-200 font-sans p-4">
      <div className="w-full max-w-md text-center">
        <header className="mb-10">
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
                  <div className="w-16 h-1.5 bg-slate-900 dark:bg-slate-200"></div>
                  <div className="w-8 h-8 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
              BAYMAX: Asistente Médico Personal
            </h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Bienvenido. Por favor, introduce tu nombre para continuar.
          </p>
        </header>
        <main>
          <div 
            className="bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50"
          >
            <form onSubmit={handleSubmit}>
              <label htmlFor="fullName" className="block text-left text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Nombre Completo
              </label>
              <input
                id="fullName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                autoFocus
                required
              />
              <button
                type="submit"
                className="mt-6 w-full px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-800 disabled:bg-slate-400 disabled:dark:bg-slate-600 transition duration-200"
              >
                Continuar
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default WelcomeScreen;