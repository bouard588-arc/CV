
import React from 'react';
import { CVData } from '../types';

interface CVPreviewProps {
  data: CVData;
  onEdit: () => void;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data, onEdit }) => {
  return (
    <div className="max-w-4xl mx-auto mb-20 animate-in slide-in-from-bottom-10 duration-700">
      <div className="flex justify-between items-center mb-6 no-print px-4">
        <button onClick={onEdit} className="flex items-center space-x-2 text-slate-600 hover:text-blue-600 font-medium transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
          <span>Modifier</span>
        </button>
        <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow-md transition-all active:scale-95">
          Imprimer en PDF
        </button>
      </div>

      {/* A4 Format Container */}
      <div id="cv-content" className="bg-white shadow-2xl rounded-none md:rounded-lg overflow-hidden flex flex-col md:flex-row min-h-[1122px]">
        {/* Left Column / Sidebar */}
        <div className="w-full md:w-1/3 bg-slate-800 text-white p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold leading-tight mb-2 uppercase tracking-wider">{data.fullName}</h1>
            <p className="text-blue-400 font-medium text-lg uppercase tracking-widest border-b border-slate-700 pb-4">{data.jobTitle}</p>
          </div>

          <div className="space-y-6">
            <Section title="Contact">
              <ContactItem icon="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" text={data.email} />
              <ContactItem icon="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.815 4.815l.773-1.548a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" text={data.phone} />
              <ContactItem icon="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" text={data.address} />
            </Section>

            {data.skills.length > 0 && (
              <Section title="Compétences">
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((s, i) => (
                    <span key={i} className="bg-slate-700 px-3 py-1 rounded text-sm font-light tracking-wide">{s}</span>
                  ))}
                </div>
              </Section>
            )}

            {data.languages.length > 0 && (
              <Section title="Langues">
                <ul className="space-y-1 text-sm font-light">
                  {data.languages.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </Section>
            )}
          </div>
        </div>

        {/* Right Column / Main Content */}
        <div className="w-full md:w-2/3 p-10 bg-white">
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-blue-600 inline-block mb-4 uppercase tracking-tighter">Profil</h2>
            <p className="text-slate-600 leading-relaxed text-sm italic">{data.summary}</p>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-blue-600 inline-block mb-6 uppercase tracking-tighter">Expériences</h2>
            <div className="space-y-8">
              {data.experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-blue-600 before:rounded-full">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-1">
                    <h3 className="font-bold text-slate-800 uppercase tracking-tight">{exp.position}</h3>
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 mb-2">{exp.company}</p>
                  <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 border-b-2 border-blue-600 inline-block mb-6 uppercase tracking-tighter">Formation</h2>
            <div className="space-y-4">
              {data.education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{edu.degree}</h3>
                    <p className="text-slate-500 text-xs italic">{edu.school}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">{edu.year}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-10 text-slate-400 text-xs no-print">
        Généré avec ❤️ par CV Genius AI
      </div>
    </div>
  );
};

const Section = ({ title, children }: any) => (
  <div className="mb-6">
    <h3 className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">{title}</h3>
    {children}
  </div>
);

const ContactItem = ({ icon, text }: any) => (
  <div className="flex items-center space-x-3 text-sm font-light text-slate-300 mb-2">
    <svg className="w-4 h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path d={icon} /></svg>
    <span className="truncate">{text}</span>
  </div>
);

export default CVPreview;
