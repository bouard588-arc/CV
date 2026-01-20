
import React, { useState } from 'react';
import { CVData, Step } from './types';
import CVForm from './components/CVForm';
import CVPreview from './components/CVPreview';
import { optimizeCV } from './services/geminiService';

const INITIAL_DATA: CVData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  address: '',
  summary: '',
  experiences: [
    { company: '', position: '', startDate: '', endDate: '', description: '' }
  ],
  education: [
    { school: '', degree: '', year: '' }
  ],
  skills: ['Management', 'Communication', 'Adaptabilité'],
  languages: ['Français (Natif)', 'Anglais (B2)']
};

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.INPUT);
  const [cvData, setCvData] = useState<CVData>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CVData) => {
    setLoading(true);
    try {
      // Use Gemini to optimize the content before preview
      const optimized = await optimizeCV(data);
      setCvData(optimized);
      setStep(Step.PREVIEW);
    } catch (error) {
      console.error("Erreur lors de l'optimisation", error);
      setCvData(data); // Fallback to raw data
      setStep(Step.PREVIEW);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100">
      {/* Header */}
      <header className="no-print bg-white border-b border-slate-200 py-6 px-4 mb-8">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">CV Genius <span className="text-blue-600">AI</span></h1>
              <p className="text-xs text-slate-500 font-medium">Générez un CV professionnel en 1 minute</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-blue-700">Propulsé par Gemini 3</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 pb-20">
        {step === Step.INPUT ? (
          <div className="space-y-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Préparez votre avenir</h2>
              <p className="text-slate-500">Remplissez vos informations et laissez notre IA sublimer votre parcours.</p>
            </div>
            <CVForm 
              initialData={cvData} 
              onSubmit={handleSubmit} 
              isOptimizing={loading}
            />
          </div>
        ) : (
          <CVPreview 
            data={cvData} 
            onEdit={() => setStep(Step.INPUT)} 
          />
        )}
      </main>

      {/* Footer Info (Hidden on print) */}
      <footer className="no-print border-t border-slate-200 mt-20 py-8 text-center text-slate-400 text-sm">
        <p>&copy; 2024 CV Genius AI - Outil de création intelligente</p>
      </footer>
    </div>
  );
};

export default App;
