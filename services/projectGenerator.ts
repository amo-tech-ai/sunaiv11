
import { GoogleGenAI, Type } from "@google/genai";
import { WizardBlueprint, ProjectPhase, RiskFactor, TaskStatus, TaskPriority } from "../types";

export async function generateProjectPlan(blueprint: WizardBlueprint): Promise<{
  wbs: ProjectPhase[];
  riskAnalysis: RiskFactor[];
  estimatedTimeline: number;
  thoughts: string[];
}> {
  // These thoughts align with the visual stepper in Step 5
  const thoughts: string[] = [
    "Analyzing Context: Grounding blueprint in industry patterns...",
    "Analyzing Context: Evaluating constraints and feasibility scores...",
    "Structuring Phases: Designing Work Breakdown Structure...",
    "Structuring Phases: Mapping dependencies and modularity...",
    "Optimizing Resources: Running ROI projection algorithms...",
    "Optimizing Resources: Balancing urgency vs structural integrity...",
    "Finalizing Proposal: Sanitizing AI outputs for human review..."
  ];

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const prompt = `
      You are a Principal Project Architect. Based on the following Project Blueprint, generate a comprehensive Work Breakdown Structure (WBS) and Risk Analysis.
      
      IDENTITY:
      Project Name: ${blueprint.identity.projectName}
      Client: ${blueprint.identity.clientName}
      
      SCOPE:
      Type: ${blueprint.intent.type}
      Goals: ${blueprint.intent.goals.join(", ")}
      Integrations: ${blueprint.intent.integrations.join(", ")}
      
      CONSTRAINTS:
      Budget: ${blueprint.constraints.budget} ${blueprint.constraints.currency}
      Deadline: ${blueprint.constraints.deadline}
      Urgency: ${blueprint.constraints.urgency}

      INSTRUCTIONS:
      1. Create 3-5 distinct project phases.
      2. For each phase, generate 2-4 granular tasks.
      3. Ensure the WBS is professional and tailored to the project type (${blueprint.intent.type}).
      4. Return the response as a valid JSON object matching the defined schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            wbs: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  tasks: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        id: { type: Type.STRING },
                        title: { type: Type.STRING },
                        description: { type: Type.STRING },
                        priority: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] }
                      }
                    }
                  }
                },
                required: ["id", "title", "description", "tasks"]
              }
            },
            riskAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  impact: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                  description: { type: Type.STRING },
                  mitigation: { type: Type.STRING }
                }
              }
            },
            estimatedTimeline: { type: Type.NUMBER }
          },
          required: ["wbs", "riskAnalysis", "estimatedTimeline"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    // Process results to ensure internal type safety
    const wbs: ProjectPhase[] = (result.wbs || []).map((phase: any) => ({
      id: phase.id || Math.random().toString(36).substr(2, 9),
      title: phase.title,
      description: phase.description,
      tasks: (phase.tasks || []).map((t: any) => ({
        id: t.id || Math.random().toString(36).substr(2, 9),
        projectId: '', // Handled by project creation logic
        title: t.title,
        description: t.description,
        status: TaskStatus.TODO,
        priority: t.priority === 'High' ? TaskPriority.HIGH : t.priority === 'Low' ? TaskPriority.LOW : TaskPriority.MEDIUM
      }))
    }));

    return {
      wbs,
      riskAnalysis: result.riskAnalysis || [],
      estimatedTimeline: result.estimatedTimeline || 30,
      thoughts
    };
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      wbs: [
        {
          id: 'fallback-p1',
          title: 'Foundation & Setup',
          description: 'Initial requirements and environmental configuration.',
          tasks: [
            { id: 'f-t1', projectId: '', title: 'Architectural Review', description: 'Review the generated blueprint for missing dependencies.', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
            { id: 'f-t2', projectId: '', title: 'Resource Allocation', description: 'Assign team members to the initial phase tasks.', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM }
          ]
        }
      ],
      riskAnalysis: [{ impact: 'Medium', description: 'AI Architect was unavailable', mitigation: 'Manual review required' }],
      estimatedTimeline: 14,
      thoughts: ["AI Architect encountered an error. Falling back to deterministic template."]
    };
  }
}
