
import { GoogleGenAI } from "@google/genai";

/**
 * Creative Director Agent
 * Generates brand-aligned editorial moodboards for project proposals.
 */

export async function generateProjectMoodboard(projectName: string, clientName: string, industry: string): Promise<string> {
  // Check for API Key Selection (Mandatory for Gemini 3 Pro Image)
  const hasKey = await window.aistudio.hasSelectedApiKey();
  if (!hasKey) {
    await window.aistudio.openSelectKey();
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Create a high-fidelity, professional editorial moodboard for a project called "${projectName}" for the client "${clientName}" in the ${industry} industry.
    The visual style must be "Luxury Minimalist, Architectural, Soft Natural Lighting, High-fashion editorial".
    Focus on clean lines, sophisticated textures, and a professional agency aesthetic.
    Avoid text in the image. 16:9 Aspect Ratio.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "2K"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data returned from model");
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      await window.aistudio.openSelectKey();
    }
    console.error("Creative Director Error:", error);
    throw error;
  }
}
