
import { GoogleGenAI, Type } from "@google/genai";

export const generateQuizQuestions = async (moduleTitle: string, moduleDesc: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Δημιούργησε 3 ερωτήσεις πολλαπλής επιλογής για την εκπαιδευτική ενότητα με τίτλο "${moduleTitle}" και περιγραφή "${moduleDesc}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              options: { type: Type.ARRAY, items: { type: Type.STRING } },
              correctAnswer: { type: Type.STRING }
            },
            required: ["text", "options", "correctAnswer"]
          }
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
