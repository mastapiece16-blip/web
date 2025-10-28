import React, { useState, useEffect } from 'react';
import { FeedbackRecord } from '../types';
import StarIcon from './icons/StarIcon';
import UsersIcon from './icons/UsersIcon';

const FeedbackView: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);

  useEffect(() => {
    try {
      const storedFeedback = localStorage.getItem('projectFeedback');
      if (storedFeedback) {
        setFeedback(JSON.parse(storedFeedback));
      }
    } catch (e) {
      console.error("Failed to parse feedback from localStorage", e);
    }
  }, []);

  const totalRatings = feedback.length;
  const averageRating = totalRatings > 0 
    ? (feedback.reduce((sum, record) => sum + record.rating, 0) / totalRatings)
    : 0;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-8">
      <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Resumen de Calificaciones</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">Feedback de los usuarios sobre la aplicación.</p>
      </div>

      {totalRatings === 0 ? (
        <div className="bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center justify-center min-h-[300px]">
          <UsersIcon className="h-16 w-16 text-slate-400 dark:text-slate-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Aún no hay calificaciones</h3>
          <p className="text-slate-500 dark:text-slate-400">Cuando los usuarios dejen su feedback, aparecerá aquí.</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-6">
              <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-full">
                  <StarIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Calificación Promedio</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{averageRating.toFixed(1)} / 10</p>
              </div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-6">
              <div className="bg-red-100 dark:bg-red-900/50 p-4 rounded-full">
                  <UsersIcon className="h-8 w-8 text-red-500 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total de Valoraciones</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalRatings}</p>
              </div>
            </div>
          </div>
          
          {/* Individual Ratings List */}
          <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Calificaciones Individuales</h3>
            <ul className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
              {feedback.map((record, index) => (
                <li key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-100/80 dark:bg-slate-700/80">
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-100">{record.user}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(record.timestamp).toLocaleString('es-ES', { dateStyle: 'long', timeStyle: 'short' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold text-red-600 dark:text-red-400">
                     <StarIcon className="h-5 w-5 text-amber-400" />
                     <span>{record.rating}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default FeedbackView;
