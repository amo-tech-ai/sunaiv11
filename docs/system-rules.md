# SunAI Agency — AI Orchestration & Safety Rules

**Status:** ACTIVE · NON-NEGOTIABLE  
**Role:** Principal Product Architect

---

## 🔒 THE SUPREME LAW: HUMAN-IN-THE-LOOP (HITL)
1. **AI can only PROPOSE.** It is a draft engine, never a commit engine.
2. **Humans must APPROVE.** No database write, external email, or financial calculation is final until a Human Controller clicks "Approve".
3. **The Controller Agent:** A specialized logic gate that enforces the "Human Approval" step before any `function_call` or DB mutation.

---

## 🤖 APPROVED AI STACK

### 1. Gemini 3 Models
| Model | Use Case |
| :--- | :--- |
| **Gemini 3 Pro** | High-ticket strategy, complex WBS planning, deep architectural reasoning. |
| **Gemini 3 Flash** | UI copy, real-time summaries, lightweight drafts, status updates. |
| **gemini-3-pro-preview** | Explicit high-fidelity reasoning sessions (Thinking Config > 16k). |

### 2. Specialized Agents
- **Orchestrator:** Routes intent to sub-agents. (Flash)
- **Planner:** Converts intent into structured tasks/WBS. (Pro Thinking)
- **Analyst:** Identifies risks, scores health, audits numbers. (Pro Code Exec)
- **Ops Automation:** Manages triggers and schedules. (Flash)
- **Content/Comms:** Editorial drafting for proposals and emails. (Flash)
- **Retriever (RAG):** Context gathering from agency SOPs/Docs. (Pro RAG)
- **Extractor:** Strict data mapping from raw inputs/PDFs. (Flash)
- **Optimizer:** Timeline and resource balancing. (Pro Thinking)
- **Scorer:** High-fidelity ROI and quality assessments. (Flash)
- **Controller:** The mandatory Approval Gate. (Human UI)

---

## 🛠 APPROVED TOOLS
- **Text Generation:** Standard response.
- **Gemini Thinking:** Logical depth (Thinking Budget).
- **Structured Outputs:** Rigid JSON schemas for system state.
- **Function Calling:** Executing system mutations.
- **Grounding (Search/Maps):** Real-world news and location intel.
- **URL Context:** Direct website analysis.
- **Code Execution:** Mathematical and logical precision (Python).
- **Image Generation:** Visual briefs and moodboards (Nano Banana Pro).

---

## 📐 SCREEN TYPES & PLACEMENT
- **Dashboard:** Persistent status and data viz.
- **Wizard:** Structured intake and planning.
- **Chatbot:** Conversational intent parsing and quick actions.
- **Right Panel:** The exclusive home for Context, AI Analysis, and Approvals.

---

## 📝 RESPONSE PROTOCOL
Every feature update MUST include the **AI Mapping Table**, **User Journeys**, and **Mermaid Workflow**.

### Required Mapping Template
| Item | Screen | Model | Gemini Tools | Agents | Inputs | Output | Approval |
|---|---|---|---|---|---|---|---|
| [Feature] | [Type] | [Model] | [Tools] | [Agents] | [Source] | [Artifact] | Controller + Human |