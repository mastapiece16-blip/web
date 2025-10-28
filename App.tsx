import React, { useState, useCallback } from 'react';
import { Diagnosis } from './types';
import { getDiseaseInfo } from './services/geminiService';
import DiseaseInput from './components/DiseaseInput';
import DiagnosisResult from './components/DiagnosisResult';
import ChatAssistant from './components/ChatAssistant';
import AlexaIntegrationPage from './components/AlexaIntegrationPage';

type Tabs = 'symptoms' | 'chat' | 'alexa';

const App: React.FC = () => {
  const [currentDiagnosis, setCurrentDiagnosis] = useState<Diagnosis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [notFoundMessage, setNotFoundMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tabs>('symptoms');
  
  const userName = "Usuario"; // Hardcoded user name

  const handleDiagnose = useCallback(async (diseaseName: string) => {
    if (!diseaseName.trim()) return;

    setIsLoading(true);
    setError(null);
    setCurrentDiagnosis(null);
    setNotFoundMessage(null);

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    try {
      const result = await getDiseaseInfo(diseaseName);

      if (result) {
        setCurrentDiagnosis(result);
        // History saving logic removed
      } else {
        // La API determinó que no es una condición médica.
        setNotFoundMessage(`No se encontraron resultados para "${diseaseName}". Asegúrate de que sea una condición médica y vuelve a intentarlo.`);
      }
      
    } catch (err) {
      console.error(err);
      setError("Ocurrió un error al comunicarnos con el asistente. Por favor, inténtalo de nuevo más tarde.");
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleTabChange = (tab: Tabs) => {
    setActiveTab(tab);
  };

  const activeTabClasses = 'border-red-500 text-red-600 dark:text-red-400';
  const inactiveTabClasses = 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:border-slate-600';
  
  const renderContent = () => {
    switch (activeTab) {
      case 'symptoms':
        return (
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <h2 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">¿En qué puedo ayudarte, {userName}?</h2>
                <DiseaseInput onSubmit={handleDiagnose} isLoading={isLoading} />
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 min-h-[400px]">
              {isLoading && (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="w-16 h-16 border-4 border-t-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">La IA está pensando...</p>
                </div>
              )}
              {error && (
                <div className="flex flex-col items-center justify-center h-full bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="mt-4 text-lg font-semibold text-red-700 dark:text-red-300">Ocurrió un Error</p>
                  <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                </div>
              )}
              {notFoundMessage && (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 10l4 4m0-4l-4 4" />
                   </svg>
                  <p className="text-xl font-semibold text-slate-700 dark:text-slate-300">Búsqueda sin resultados</p>
                  <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md">{notFoundMessage}</p>
                </div>
              )}
              {!isLoading && !error && !notFoundMessage && !currentDiagnosis && (
                 <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="p-5 bg-white/50 dark:bg-slate-900/50 rounded-full shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 mb-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-slate-800 dark:bg-slate-200 rounded-full"></div>
                            <div className="w-20 h-2 bg-slate-800 dark:bg-slate-200"></div>
                            <div className="w-10 h-10 bg-slate-800 dark:bg-slate-200 rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-2xl font-semibold text-slate-700 dark:text-slate-300">Hola, soy BAYMAX</p>
                    <p className="mt-2 text-lg text-slate-500 dark:text-slate-400 max-w-md">Tu asistente de salud personal. Describe un síntoma o una condición médica arriba para comenzar.</p>
                </div>
              )}
              {!isLoading && !error && !notFoundMessage && currentDiagnosis && (
                <DiagnosisResult diagnosis={currentDiagnosis} />
              )}
            </div>
          </div>
        );
      case 'chat':
        return <ChatAssistant />;
      case 'alexa':
        return <AlexaIntegrationPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-screen text-slate-800 dark:text-slate-200 font-sans">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <header className="text-center mb-10">
            <div className="flex flex-col items-center justify-center gap-4 mb-2">
              <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center">
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
                    <div className="w-8 h-1 md:w-10 md:h-1.5 bg-slate-900 dark:bg-slate-200"></div>
                    <div className="w-4 h-4 md:w-6 md:h-6 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                BAYMAX: Asistente Médico Personal
              </h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
              Bienvenido, <span className="font-semibold text-red-600 dark:text-red-400">{userName}</span>.
            </p>
          </header>
          <main>
            <div className="mb-8 flex justify-center border-b border-slate-200/80 dark:border-slate-700/80">
              <button
                onClick={() => handleTabChange('symptoms')}
                className={`px-4 py-3 font-semibold text-lg border-b-2 transition-colors duration-200 ${activeTab === 'symptoms' ? activeTabClasses : inactiveTabClasses}`}
                aria-current={activeTab === 'symptoms' ? 'page' : undefined}
              >
                Verificador de Síntomas
              </button>
              <button
                onClick={() => handleTabChange('chat')}
                className={`px-4 py-3 font-semibold text-lg border-b-2 transition-colors duration-200 ${activeTab === 'chat' ? activeTabClasses : inactiveTabClasses}`}
                aria-current={activeTab === 'chat' ? 'page' : undefined}
              >
                Asistente de Chat
              </button>
              <button
                onClick={() => handleTabChange('alexa')}
                className={`px-4 py-3 font-semibold text-lg border-b-2 transition-colors duration-200 ${activeTab === 'alexa' ? activeTabClasses : inactiveTabClasses}`}
                aria-current={activeTab === 'alexa' ? 'page' : undefined}
              >
                Integración con Alexa
              </button>
            </div>
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
