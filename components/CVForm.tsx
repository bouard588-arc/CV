
import React, { useState } from 'react';
import { CVData, Experience, Education } from '../types';

interface CVFormProps {
  initialData: CVData;
  onSubmit: (data: CVData) => void;
  isOptimizing: boolean;
}

const CVForm: React.FC<CVFormProps> = ({ initialData, onSubmit, isOptimizing }) => {
  const [formData, setFormData] = useState<CVData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index: number, field: string, value: string, type: 'experiences' | 'education') => {
    const newArray = [...formData[type]] as any[];
    newArray[index] = { ...newArray[index], [field]: value };
    setFormData(prev => ({ ...prev, [type]: newArray }));
  };

  const addItem = (type: 'experiences' | 'education') => {
    if (type === 'experiences') {
      setFormData(prev => ({
        ...prev,
        experiences: [...prev.experiences, { company: '', position: '', startDate: '', endDate: '', description: '' }]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { school: '', degree: '', year: '' }]
      }));
    }
  };

  const removeItem = (index: number, type: 'experiences' | 'education') => {
    const newArray = (formData[type] as any[]).filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [type]: newArray }));
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-semibold mb-4 text-blue-600 border-b pb-2">Informations Personnelles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Nom Complet" name="fullName" value={formData.fullName} onChange={handleChange} />
          <Input label="Poste Souhaité" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
          <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} />
          <div className="md:col-span-2">
            <Input label="Adresse" name="address" value={formData.address} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Résumé Professionnel</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Décrivez votre parcours en quelques lignes..."
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Expériences Professionnelles</h2>
          <button type="button" onClick={() => addItem('experiences')} className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
            + Ajouter
          </button>
        </div>
        {formData.experiences.map((exp, idx) => (
          <div key={idx} className="mb-6 p-4 border border-slate-100 rounded-xl relative bg-slate-50/50">
            <button type="button" onClick={() => removeItem(idx, 'experiences')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Entreprise" value={exp.company} onChange={(e) => handleArrayChange(idx, 'company', e.target.value, 'experiences')} />
              <Input label="Poste" value={exp.position} onChange={(e) => handleArrayChange(idx, 'position', e.target.value, 'experiences')} />
              <Input label="Début" value={exp.startDate} placeholder="ex: 2020" onChange={(e) => handleArrayChange(idx, 'startDate', e.target.value, 'experiences')} />
              <Input label="Fin" value={exp.endDate} placeholder="ex: Présent" onChange={(e) => handleArrayChange(idx, 'endDate', e.target.value, 'experiences')} />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Description / Réalisations</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => handleArrayChange(idx, 'description', e.target.value, 'experiences')}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-blue-600">Formation</h2>
          <button type="button" onClick={() => addItem('education')} className="text-sm font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">
            + Ajouter
          </button>
        </div>
        {formData.education.map((edu, idx) => (
          <div key={idx} className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-slate-100 rounded-xl relative">
             <button type="button" onClick={() => removeItem(idx, 'education')} className="absolute top-2 right-2 text-slate-400 hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>
            <Input label="École" value={edu.school} onChange={(e) => handleArrayChange(idx, 'school', e.target.value, 'education')} />
            <Input label="Diplôme" value={edu.degree} onChange={(e) => handleArrayChange(idx, 'degree', e.target.value, 'education')} />
            <Input label="Année" value={edu.year} onChange={(e) => handleArrayChange(idx, 'year', e.target.value, 'education')} />
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 left-0 right-0 flex justify-center pb-4 px-4 z-50">
        <button
          type="submit"
          disabled={isOptimizing}
          className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl transform transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isOptimizing ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Optimisation par l'IA en cours...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              <span>Générer mon CV avec l'IA</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
    />
  </div>
);

export default CVForm;
