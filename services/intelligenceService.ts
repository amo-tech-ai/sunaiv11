
import { GoogleGenAI, Type } from "@google/genai";
import { WizardBlueprint, ProjectIntelligence } from "../types";

export async function generateProjectIntelligence(blueprint: WizardBlueprint): Promise<ProjectIntelligence> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a Principal Systems Architect. Based on this confirmed Project Blueprint, generate a set of AI-native operational intelligence items.
    
    BLUEPRINT:
    Project: ${blueprint.identity.projectName} (${blueprint.intent.type})
    Goals: ${blueprint.intent.goals.join(", ")}
    Integrations: ${blueprint.intent.integrations.join(", ")}
    Budget: ${blueprint.constraints.budget} ${blueprint.constraints.currency}
    Urgency: ${blueprint.constraints.urgency}

    INSTRUCTIONS:
    1. Agents: Propose 3 specialist AI agents required for this specific project.
    2. Automations: Propose 3 event-driven triggers based on the goals and integrations.
    3. Workflows: Propose 2 core end-to-end execution workflows.
    4. User Journeys: Propose 2 critical journeys (e.g., Client, Internal Ops).
    5. Real-World Examples: Provide 2 industry-specific comparative success scenarios.
    
    Ensure the response matches the JSON schema perfectly.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            agents: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  whyNeeded: { type: Type.STRING },
                  produces: { type: Type.STRING },
                  confidence: { type: Type.NUMBER }
                },
                required: ["id", "name", "role", "whyNeeded", "produces", "confidence"]
              }
            },
            automations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  trigger: { type: Type.STRING },
                  action: { type: Type.STRING },
                  outcome: { type: Type.STRING },
                  riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
                },
                required: ["id", "trigger", "action", "outcome", "riskLevel"]
              }
            },
            workflows: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  name: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  keyOutputs: { type: Type.STRING }
                },
                required: ["id", "name", "steps", "keyOutputs"]
              }
            },
            journeys: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  actor: { type: Type.STRING },
                  steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                  value: { type: Type.STRING }
                },
                required: ["id", "actor", "steps", "value"]
              }
            },
            examples: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  scenario: { type: Type.STRING },
                  whatWasBuilt: { type: Type.STRING },
                  outcome: { type: Type.STRING }
                },
                required: ["id", "scenario", "whatWasBuilt", "outcome"]
              }
            }
          },
          required: ["agents", "automations", "workflows", "journeys", "examples"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      ...result,
      selectedItems: [],
      generatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Intelligence Generation Error:", error);
    throw error;
  }
}
