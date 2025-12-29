# Module: Business Automation Hub

**Version:** 1.1 (Gemini 3 Orchestration Layer)
**Theme:** "The Intelligence Factory"
**Status:** ARCHITECTURE LOCKED

---

## 🏁 Implementation Progress Tracker

### Phase 1: The Automation Engine (Orchestration)
- [ ] Implement `AutomationHub.tsx` (The Global Ticker & Queue View)
- [ ] Build **Orchestrator Agent** (Flash-based routing logic)
- [ ] Create "Agent Pulse" UI (Real-time activity indicators)
- [ ] Establish "Trigger -> Action" Logic Registry

### Phase 2: The Conversion Pipeline (Lead to Roadmap)
- [ ] Implement `LeadAccelerator.tsx` (Deep Research -> Proposal UI)
- [ ] Build **Researcher to Planner Handoff** (Context Bridge)
- [ ] Create "Logic Stepper" for multi-agent synthesis
- [ ] Implement **Controller Gate** for final proposal commitment

### Phase 3: Operational Optimization (The Analyst Swarm)
- [ ] Implement `AgencyVitals.tsx` (ROI & Burn rate charts)
- [ ] Build **Scorer Agent** (Relationship & Quality scoring)
- [ ] Integrate `codeExecution` for high-precision budget audits
- [ ] Finalize "Automated Follow-up" drafting loop

---

## 🖥 Screen & Route Inventory

| Route | Screen Name | Purpose | Main Panel View |
| :--- | :--- | :--- | :--- |
| `/app/automation` | **Operations Hub** | Monitoring all active agent swarms. | Real-time Ticker & Task Cards |
| `/app/automation/pipeline` | **Lead Accelerator** | Fast-tracking leads from data to plan. | Discovery-to-WBS Flow |
| `/app/automation/vitals` | **Agency Vitals** | Auditing financial and relationship health. | Metric Cards & Precision Charts |

---

## 📐 3-Panel Layout Logic (Business Automation)

This module enforces the **Observe · Optimize · Authorize** flow.

### 1. Panel A: Controls (Left - 20%)
*   **Content:** Workflow Categories, Active Triggers, Agent Folders.
*   **Behavior:** Selecting a workflow here populates the execution history in the Main Panel.

### 2. Panel B: Factory Surface (Main - 55%)
*   **Content:** The "Work-in-Progress" area. Shows active lead research or plan construction.
*   **Behavior:** High-density cards showing "Steps Remaining" and "Current Agent Thinking."

### 3. Panel C: Logic Detail (Right - 25%)
*   **Content:** The "Intel Drawer".
*   **Tabs:** [Thoughts] [Audit] [Approve].
*   **Behavior:** Shows the internal reasoning (Thinking logs) of the active Gemini 3 model.

---

## 🤖 Agent Matrix & Gemini 3 Tooling

| Agent Type | Gemini Model | Key Feature / Tool | Business Role |
| :--- | :--- | :--- | :--- |
| **Orchestrator** | `gemini-3-flash-preview` | `structuredOutputs` | Determines which agent is best for the specific lead context. |
| **Researcher** | `gemini-3-pro-preview` | `googleSearch`, `googleMaps` | Performs market scans and competitor mapping in <30s. |
| **Planner** | `gemini-3-pro-preview` | `thinkingBudget` (8k) | Turns research context into an 8-week execution WBS. |
| **Analyst** | `gemini-3-pro-preview` | `codeExecution` (Python) | Audits budgets vs timeline to ensure 0% drift. |
| **Scorer** | `gemini-3-pro-preview` | `thinkingBudget` (2k) | Computes relationship health from communication patterns. |

---

## 🔄 User Journeys & Workflows

### Journey 1: The 60-Second Prospect Audit
1. **Trigger:** User adds a URL to the CRM.
2. **Orchestrator:** Sees "New Lead" -> Triggers **Researcher**.
3. **Researcher:** Scans URL + Google Search news. Populates "Intelligence Report".
4. **Outcome:** User receives a notification: "Deep Research complete for [Client]. 3 news signals found."

### Journey 2: The "Zero-Draft" Proposal
1. **Trigger:** User reviews Research Report and clicks "Architect Roadmap".
2. **Planner:** Consumes the Report. Uses Reasoning to build a Phase 1-4 WBS.
3. **Analyst:** Simultaneously runs Python to verify "Phase 1" cost vs market average.
4. **Outcome:** A full proposal with timeline and budget is ready for "Human Approval" in Panel C.

### Journey 3: The At-Risk Intervention
1. **Trigger:** Project velocity drops below 70%.
2. **Scorer:** Detects "Risk" based on overdue tasks and email tone.
3. **Outcome:** Agent drafts a "Reassurance Email" and places it in the user's "Proposed Actions" queue.

---

## 💼 Use Cases (Real World)

1. **Strategic Sales:** A Boutique Agency uses the Researcher Agent to find out that a prospect just lost their lead developer, then automatically drafts a "Rescue Project" roadmap.
2. **Resource Management:** An Operations Manager uses the Analyst Agent to run a cross-project audit, identifying that 3 senior devs are double-booked for October.
3. **Client Retention:** A Director uses the Scorer Agent to find "Silence Gaps" (clients not emailed in 10 days) and triggers an automated "Weekly Insight" draft.

---

## 🛠 Multi-Step Build Prompts (UI & Logic)

### Step 1: The Operations Ticker
> Build `AutomationHub.tsx`. Layout: 3-Panel. Main Panel: A high-fidelity "Ticker" feed using a vertical list. Each item is a "Live Agent Card" showing: [Agent Icon] [Task Name] [Status: Thinking/Complete]. Use a pulsing blue ring for "Thinking" states.

### Step 2: The Conversion Bridge (Lead -> WBS)
> Design the `LeadAccelerator` view. Implement a horizontal stepper. Step 1: Research (Grounded List). Step 2: Logic Synthesis (Thinking Logs). Step 3: Proposal Output (Selectable WBS). Add a "Final Commit" button that only activates after the user reviews the WBS.

### Step 3: Financial & Sentiment Auditing
> Build the `AgencyVitals` screen. Use `Recharts` to show a "Burn Down" line graph. Add a side-panel for the Scorer Agent's "Why" analysis—displaying a text-block of the Gemini 3 reasoning for each health score.

### Step 4: The Orchestrator Router
> Create the `orchestrationService.ts`. This service should take a `leadContext` and use `gemini-3-flash-preview` with `structuredOutputs` to return which agent (Researcher or Planner) should take the next action.
