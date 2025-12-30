
import { GoogleGenAI, Type } from "@google/genai";
import { Task, WizardBlueprint } from "../types";

export interface AuditResult {
  velocityScore: number;
  burnRate: string;
  projectedEnd: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  reasoning: string;
}

/**
 * Risk Analyst Agent
 * Uses Python Code Execution to calculate project trajectory with mathematical precision.
 */
export async function runRiskAudit(tasks: Task[], blueprint: WizardBlueprint | null): Promise<AuditResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    You are a Strategic Risk Analyst. Use Python to perform a precision audit of project velocity.
    
    DATASET:
    Tasks: ${JSON.stringify(tasks)}
    Budget: ${blueprint?.constraints.budget || 0}
    Deadline: ${blueprint?.constraints.deadline || 'Undefined'}
    
    PYTHON MISSION:
    1. Calculate % of tasks completed.
    2. Estimate daily burn rate assuming $${blueprint?.constraints.budget || 10000} budget.
    3. Project the completion date based on current task velocity.
    4. Determine if the current trajectory violates the deadline of ${blueprint?.constraints.deadline || 'Unknown'}.
    
    Return a structured JSON report.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        tools: [{ codeExecution: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            velocityScore: { type: Type.NUMBER },
            burnRate: { type: Type.STRING },
            projectedEnd: { type: Type.STRING },
            riskLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
            reasoning: { type: Type.STRING }
          },
          required: ["velocityScore", "burnRate", "projectedEnd", "riskLevel", "reasoning"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Risk Audit Error:", error);
    return {
      velocityScore: 0,
      burnRate: "Unknown",
      projectedEnd: "Stalled",
      riskLevel: 'High',
      reasoning: "Audit engine timed out. Resource verification failed."
    };
  }
}
