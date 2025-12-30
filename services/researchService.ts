
import { GoogleGenAI, Type } from "@google/genai";

export interface ResearchReport {
  industry: string;
  marketCap?: string;
  competitors: { name: string; strength: string; strategy: string }[];
  newsSignals: { title: string; snippet: string; url: string; date: string }[];
  strategicInsights: string[];
}

export async function performDeepResearch(topic: string, companyUrl?: string): Promise<ResearchReport> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Perform an exhaustive market research analysis for: ${topic}. 
    ${companyUrl ? `Reference website context: ${companyUrl}` : ''}
    
    Required:
    1. Identify top 3-5 competitors and their current strategies.
    2. Extract the 5 most recent significant news signals with source URLs.
    3. Synthesize 3 high-level strategic insights for an agency looking to partner with this entity.
    
    GROUNDING: Use Google Search to ensure all news and competitor data is from the last 6 months.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            industry: { type: Type.STRING },
            marketCap: { type: Type.STRING },
            competitors: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  strength: { type: Type.STRING },
                  strategy: { type: Type.STRING }
                }
              }
            },
            newsSignals: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  snippet: { type: Type.STRING },
                  url: { type: Type.STRING },
                  date: { type: Type.STRING }
                }
              }
            },
            strategicInsights: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["industry", "competitors", "newsSignals", "strategicInsights"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Deep Research Error:", error);
    throw error;
  }
}
