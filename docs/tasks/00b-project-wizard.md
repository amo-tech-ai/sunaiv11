# Task 00b: Project Intake Wizard (P0)

**Feature:** Structured Intake & Architectural Planning  
**Priority:** P0  
**Status:** IMPLEMENTED (UI/Service)  
**Ref:** `pages/ProjectWizard.tsx`, `services/projectGenerator.ts`

---

## Purpose & Goals
The Wizard is the agency's "Front Door." It captures ambiguous client requirements and uses Gemini 3 Pro to architect a deterministic execution plan.

- **Goals:**
    - Capture 100% of project constraints (Budget, Deadline, Tech).
    - Use the **Retriever Agent** to ground the plan in the client's actual website data.
    - Visualize the AI's "Thinking" process to build trust.
    - Produce a 4-phase WBS (Work Breakdown Structure) ready for one-click launch.

---

## 🏗 Intake Flow (The 6-Step Law)

1.  **Identity:** Name, Client, and URL. Trigger **Retriever Agent**.
2.  **DNA:** Select Type (Web/Mobile) and define Goals/Integrations.
3.  **Constraints:** Budget and Deadline sliders. Trigger **Analyst Agent** for feasibility.
4.  **Review:** Human gate to confirm inputs.
5.  **Architecting:** **Planner Agent** (Pro Thinking) generates the WBS JSON.
6.  **Proposal:** Human reviews the WBS, unchecks tasks, and commits to DB.

---

## 🤖 AI Orchestration

| Phase | Agent | Model | Tool |
| :--- | :--- | :--- | :--- |
| **Step 1** | Retriever | `gemini-3-pro-preview` | `googleSearch` |
| **Step 3** | Analyst | `gemini-3-pro-preview` | `codeExecution` |
| **Step 5** | Planner | `gemini-3-pro-preview` | `thinkingBudget: 32k` |

---

## ✅ Corrective Action
- Ensure `localStorage` draft is cleared only after `Step 6` acceptance.
- Verify "Thinking" logs match the real-time token output from the Planner.