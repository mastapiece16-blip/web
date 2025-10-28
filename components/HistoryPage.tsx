import React, { useState, useEffect } from 'react';
import { ActivityRecord, InvalidSearchRecord } from '../types';
import DiagnosisResult from './DiagnosisResult';

const HistoryPage: React.FC = () => {
  const [activityHistory, setActivityHistory] = useState<ActivityRecord[]>([]);
  const [invalidSearchHistory, setInvalidSearchHistory] = useState<InvalidSearchRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<ActivityRecord | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'diagnoses' | 'invalid'>('diagnoses');

  const filterRecent = (records: (ActivityRecord | InvalidSearchRecord)[]) => {
      const now = new Date().getTime();
      const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;
      return records.filter(
        record => new Date(record.timestamp).getTime() > twentyFourHoursAgo
      );
  }

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('activityHistory');
      if (storedHistory) {
        const history: ActivityRecord[] = JSON.parse(storedHistory);
        const recentHistory = filterRecent(history) as ActivityRecord[];
        setActivityHistory(recentHistory);
        if (recentHistory.length > 0) {
          setSelectedRecord(recentHistory[0]);
        }
      }
    } catch (e) {
      console.error("Failed to parse activity history from localStorage", e);
    }

    try {
        const storedInvalidHistory = localStorage.getItem('invalidSearchHistory');
        if (storedInvalidHistory) {
            const history: InvalidSearchRecord[] = JSON.parse(storedInvalidHistory);
            setInvalidSearchHistory(filterRecent(history) as InvalidSearchRecord[]);
        }
    } catch (e) {
        console.error("Failed to parse invalid search history from localStorage", e);
    }
  }, []);

  const handleSelectRecord = (record: ActivityRecord) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    setSelectedRecord(record);
  };

  const handleTabChange = (tab: 'diagnoses' | 'invalid') => {
      if (activeSubTab === tab) return;
      setActiveSubTab(tab);
      setSelectedRecord(null);
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
  };
  
  const activeSubTabClasses = 'border-red-500 text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-900/30';
  const inactiveSubTabClasses = 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-200';
  
  const renderSidebar = () => (
     <>
      <div className="border-b border-slate-200/80 dark:border-slate-700/80 mb-4">
        <nav className="-mb-px flex space-x-2" aria-label="Tabs">
            <button
                onClick={() => handleTabChange('diagnoses')}
                className={`px-3 py-2 font-semibold text-sm rounded-t-lg border-b-2 transition-colors duration-200 ${activeSubTab === 'diagnoses' ? activeSubTabClasses : inactiveSubTabClasses}`}
            >
                Diagnósticos
            </button>
            <button
                onClick={() => handleTabChange('invalid')}
                className={`px-3 py-2 font-semibold text-sm rounded-t-lg border-b-2 transition-colors duration-200 ${activeSubTab === 'invalid' ? activeSubTabClasses : inactiveSubTabClasses}`}
            >
                Búsquedas Fallidas
            </button>
        </nav>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Mostrando registros de las últimas 24 horas.</p>
      
      <div className="max-h-[70vh] overflow-y-auto pr-2">
        {activeSubTab === 'diagnoses' && (
            activityHistory.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No hay diagnósticos recientes.</p>
            ) : (
                <ul className="space-y-2">
                {activityHistory.map((record) => (
                    <li key={record.id}>
                        <button
                        onClick={() => handleSelectRecord(record)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                            record.id === selectedRecord?.id
                            ? 'bg-red-100 dark:bg-red-900/50 ring-2 ring-red-500'
                            : 'bg-slate-100/80 dark:bg-slate-700/80 hover:bg-red-100/60 dark:hover:bg-red-900/40'
                        }`}
                        >
                          <p className="font-semibold text-slate-800 dark:text-slate-100 capitalize">{record.searchTerm}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">Por: {record.user}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{new Date(record.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</p>
                        </button>
                    </li>
                ))}
                </ul>
            )
        )}
        
        {activeSubTab === 'invalid' && (
            invalidSearchHistory.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400">No hay búsquedas fallidas recientes.</p>
            ) : (
                <ul className="space-y-2">
                {invalidSearchHistory.map((record) => (
                    <li key={record.id}>
                        <div className="w-full text-left px-4 py-3 rounded-lg bg-slate-100/80 dark:bg-slate-700/80 opacity-80">
                            <p className="font-semibold text-slate-800 dark:text-slate-100 capitalize">{record.searchTerm}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Por: {record.user}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{new Date(record.timestamp).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })}</p>
                        </div>
                    </li>
                ))}
                </ul>
            )
        )}
      </div>
     </>
  );

  const renderMainContent = () => {
    if (activeSubTab === 'invalid' || !selectedRecord) {
        return (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-4 text-xl text-slate-500 dark:text-slate-400 text-center">
                {activeSubTab === 'invalid'
                  ? 'Aquí se listan las búsquedas que no son condiciones médicas.'
                  : 'Selecciona un diagnóstico de la lista para ver los detalles.'}
              </p>
            </div>
        );
    }
    return <DiagnosisResult diagnosis={selectedRecord.diagnosis} />;
  }
  
  return (
    <div className="animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <aside className="lg:col-span-1 bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                {renderSidebar()}
            </aside>
            <section className="lg:col-span-2 bg-white/60 dark:bg-slate-800/60 p-6 md:p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 min-h-[500px]">
                {renderMainContent()}
            </section>
        </div>
    </div>
  );
};

export default HistoryPage;