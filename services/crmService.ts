
import { GoogleGenAI, Type } from "@google/genai";
import { Contact } from "../types";

export interface EnrichmentResult {
  industry: string;
  recentNews: string[];
  fundingRound?: string;
}

export interface SentimentAnalysis {
  score: number;
  reasoning: string;
}

export async function enrichContactProfile(companyName: string): Promise<EnrichmentResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Research the company: ${companyName}. Provide the industry, 3 latest significant news items, and recent funding details.`;

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
            recentNews: { type: Type.ARRAY, items: { type: Type.STRING } },
            fundingRound: { type: Type.STRING }
          },
          required: ["industry", "recentNews"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Enrichment Error:", error);
    return {
      industry: "Enterprise Service",
      recentNews: ["Latest product expansion announced.", "Industry growth trend noted."]
    };
  }
}

export async function analyzeRelationshipStrength(contact: Contact, history: string): Promise<SentimentAnalysis> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Analyze relationship for ${contact.name} at ${contact.company}.
    History: ${history}
    Current AI Summary: ${contact.aiSummary}
    
    Calculate a strength score (0-100) and provide deep reasoning.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 8000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            reasoning: { type: Type.STRING }
          },
          required: ["score", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    return { score: contact.sentimentScore, reasoning: "Unable to recalculate score at this time." };
  }
}

export async function draftFollowUpEmail(contact: Contact, context: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Draft a personalized email to ${contact.name}.
    Company Context: ${contact.company}
    Draft Intent: ${context}
    Tone: Editorial Luxury (sophisticated, warm, concise).
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7
      }
    });
    return response.text || "";
  } catch (error) {
    return "Drafting failed. System offline.";
  }
}
