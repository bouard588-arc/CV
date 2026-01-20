
import { GoogleGenAI, Type } from "@google/genai";
import { CVData } from "../types";

export const optimizeCV = async (data: Partial<CVData>): Promise<CVData> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Agis en tant qu'expert en recrutement. Optimise le contenu de ce CV pour le rendre plus percutant, professionnel et moderne. 
  Améliore le résumé (summary) et les descriptions d'expériences. 
  Garde les informations factuelles mais reformule-les de manière élégante en français.
  
  Données actuelles: ${JSON.stringify(data)}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          fullName: { type: Type.STRING },
          jobTitle: { type: Type.STRING },
          email: { type: Type.STRING },
          phone: { type: Type.STRING },
          address: { type: Type.STRING },
          summary: { type: Type.STRING },
          experiences: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                company: { type: Type.STRING },
                position: { type: Type.STRING },
                startDate: { type: Type.STRING },
                endDate: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            }
          },
          education: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                school: { type: Type.STRING },
                degree: { type: Type.STRING },
                year: { type: Type.STRING }
              }
            }
          },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          languages: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["fullName", "jobTitle", "summary", "experiences", "skills"]
      }
    }
  });

  try {
    return JSON.parse(response.text || '{}') as CVData;
  } catch (e) {
    console.error("Erreur parsing Gemini response", e);
    return data as CVData;
  }
};
