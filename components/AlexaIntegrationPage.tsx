import React from 'react';
import AlexaIcon from './icons/AlexaIcon';
import VoiceCommandIcon from './icons/VoiceCommandIcon';

const AlexaIntegrationPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-6">
      <div className="bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 text-center">
        <div className="flex justify-center items-center gap-4 mb-6">
            <div className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center">
                  <div className="w-8 h-8 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
                  <div className="w-16 h-1.5 bg-slate-900 dark:bg-slate-200"></div>
                  <div className="w-8 h-8 bg-slate-900 dark:bg-slate-200 rounded-full"></div>
              </div>
            </div>
            <span className="text-2xl font-bold text-slate-400 dark:text-slate-500">+</span>
            <div className="p-4 bg-white/80 dark:bg-slate-800/80 rounded-full shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
                <AlexaIcon className="h-10 w-10 text-cyan-500" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Integra a BAYMAX con Amazon Alexa</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Usa tu voz para acceder a información médica de forma rápida y sencilla a través de tu dispositivo Alexa.
        </p>
      </div>

      <div className="bg-white/60 dark:bg-slate-800/60 p-8 rounded-2xl shadow-lg backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">¿Cómo funcionaría?</h3>
        <p className="text-slate-600 dark:text-slate-300 mb-6">
          Una vez que actives la "Skill" de BAYMAX en tu app de Alexa, podrías usar comandos de voz como los siguientes para interactuar con el asistente:
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-4 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-700/80">
            <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                <VoiceCommandIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="font-mono text-lg text-slate-800 dark:text-slate-100">"Alexa, abre Asistente Médico"</p>
              <p className="text-slate-500 dark:text-slate-400">Para iniciar la aplicación y recibir un saludo de BAYMAX.</p>
            </div>
          </li>
          <li className="flex items-start gap-4 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-700/80">
            <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                <VoiceCommandIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="font-mono text-lg text-slate-800 dark:text-slate-100">"Alexa, pregunta a Asistente Médico sobre la migraña"</p>
              <p className="text-slate-500 dark:text-slate-400">Para obtener una descripción completa, causas, síntomas y tratamientos comunes de una condición específica.</p>
            </div>
          </li>
           <li className="flex items-start gap-4 p-4 rounded-lg bg-slate-100/80 dark:bg-slate-700/80">
            <div className="bg-red-100 dark:bg-red-900/50 p-3 rounded-full">
                <VoiceCommandIcon className="h-6 w-6 text-red-500 dark:text-red-400" />
            </div>
            <div>
              <p className="font-mono text-lg text-slate-800 dark:text-slate-100">"Alexa, dile a Asistente Médico que tengo tos"</p>
              <p className="text-slate-500 dark:text-slate-400">Para obtener información relevante sobre un síntoma que estés experimentando.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-500/50 flex items-start gap-3">
        <span className="text-xl mt-1 text-amber-600 dark:text-amber-400">💡</span>
        <div>
          <p className="font-bold text-amber-800 dark:text-amber-200">Función Conceptual:</p>
          <p className="text-amber-700 dark:text-amber-300">Ten en cuenta que esta es una demostración conceptual. La integración completa con Alexa requiere desarrollo adicional y la publicación de una Skill oficial en la tienda de Amazon, lo cual no está implementado en esta versión.</p>
        </div>
      </div>
    </div>
  );
};

export default AlexaIntegrationPage;
