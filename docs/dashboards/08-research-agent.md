# Module: Deep Research & Strategy Orchestration

**Version:** 1.0 (Gemini 3 Grounded Architecture)
**Theme:** "Intelligence to Action"
**Status:** DESIGN LOCKED

---

## 🏁 Implementation Progress Tracker

### Phase 1: Research Lab (The Grounding Layer)
- [ ] Implement `MarketReportView.tsx` (The Main Analysis Surface)
- [ ] Integrate **Researcher Agent** (Google Search + Maps Grounding)
- [ ] Build "Source Attribution" UI (Displaying Grounding Chunks & Citations)
- [ ] Create "Researching..." Active State with Real-time Thought Logs

### Phase 2: The Strategy Engine (The Planner Agent)
- [ ] Implement `StrategyRoom.tsx` (Proposed Roadmaps View)
- [ ] Build Research -> Plan Bridge (RAG-style context passing)
- [ ] Integrate **Planner Agent** with `thinkingBudget: 8000`
- [ ] Create "Approval Gate" UI for batch task conversion

### Phase 3: Orchestration Hub (System Visibility)
- [ ] Build `OrchestratorDashboard.tsx` (Global Agent Health)
- [ ] Implement "Agent Ticker" in Main Layout
- [ ] Build "Resource Conflict" Detection (Analyst Agent)
- [ ] Finalize "Human-in-the-loop" Controller Gate for all write actions

---

## 📐 3-Panel Layout Logic (Research & Strategy)

The Research module strictly adheres to the **Select · Analyze · Act** flow.

### 1. Panel A: Context (Left - 20%)
*   **Content:** Research Queues, Saved Reports, Lead Segments.
*   **Behavior:** Selecting a report here updates the "Full Report" in the Main Panel.

### 2. Panel B: Analysis Surface (Main - 55%)
*   **Content:** The "Intelligence Report" (Industry Trends, Competitive Landscape, Maps).
*   **Behavior:** Rich, editorial-style layout with high-fidelity charts and grounded links.

### 3. Panel C: Agent Intel (Right - 25%)
*   **Content:** The "Strategy Drawer".
*   **Behavior:** Tabs for [Actions] [Insights] [Audit]. Shows the Planner's roadmap based on the report.

---

## 🖥 Screen & Route Inventory

| Route | Screen Name | Layout | Core Purpose |
| :--- | :--- | :--- | :--- |
| `/app/research` | **Intelligence Lab** | 3-Panel | Deep market analysis & competitive grounding. |
| `/app/strategy` | **Strategy Room** | 2-Panel (Wide) | Converting research into 4-week executable roadmaps. |
| `/app/orchestra` | **Orchestrator Hub** | Dashboard | Real-time monitoring of all active agent swarms. |

---

## 🤖 Gemini 3 Agent & Tool Matrix

| Agent Type | Gemini Model | Core Feature / Tool | Output Responsibility |
| :--- | :--- | :--- | :--- |
| **Researcher** | `gemini-3-pro-preview` | `googleSearch`, `googleMaps` | Industry trends, competitor locations, news. |
| **Planner** | `gemini-3-pro-preview` | `thinkingConfig` (8k) | 4-week WBS, milestones, task dependencies. |
| **Analyst** | `gemini-3-pro-preview` | `codeExecution` (Python) | Risk scores, budget burn projections, ROI. |
| **Orchestrator** | `gemini-3-flash-preview` | `structuredOutputs` | Routing user intent to specialized agents. |
| **Controller** | N/A (Human UI) | UI Action Gate | Final "Commit to DB" authorization. |

---

## 🔄 User Journeys & Workflows

### Journey 1: The High-Fidelity Market Scan
1. **Trigger:** User selects a new lead in CRM and clicks "Deep Research".
2. **Orchestrator Action:** Calls Researcher Agent with Google Search tool.
3. **Researcher Action:** Scans lead's URL + Competitor URL. Extracts news & trends.
4. **Visual:** Main Panel populates "Intelligence Report" with citation links.
5. **Outcome:** User has grounded data to personalize their pitch.

### Journey 2: The Instant Proposal (Research-to-Plan)
1. **Trigger:** User reviews the Market Scan and clicks "Generate Proposal Roadmap".
2. **Planner Action:** Consumes the Market Scan JSON. Uses "Thinking" to architect a 4-week plan.
3. **Analyst Action:** Runs Python code to verify the proposed timeline fits lead's budget.
4. **Visual:** Right Panel displays 4 phases with checkboxes.
5. **Controller Action:** User unchecks one task, clicks "Approve". Tasks write to Project DB.

### Journey 3: The System Monitor
1. **Trigger:** Multiple agents running across 10 leads.
2. **UI:** Orchestrator Dashboard shows a "Radar" view of agent utilization.
3. **Visual:** Progress bars show "Thinking..." logs from Gemini 3 in a terminal-style UI.

---

## 💼 Use Cases (Real World)

1. **The Venture Studio:** Use the Researcher Agent to map out the competitive landscape of a new startup idea in 30 seconds.
2. **The Growth Agency:** Use the Planner Agent to generate a custom 8-week onboarding roadmap for a new enterprise client.
3. **The Tech Ops Team:** Use the Analyst Agent to run budget audits across 50 active projects to find resource leaks.

---

## 🛠 Multi-Step Build Prompts (Guideline)

### Step 1: The Research Interface
> Build `MarketReportView.tsx`. Use an "Editorial" layout with sticky headers. Section 1: "Signal Strength" (Donut Chart). Section 2: "Competitive Map" (Grid of cards). Section 3: "Grounded Insights" (List with URL chips).

### Step 2: Google Search/Maps Integration
> Integrate `googleSearch` and `googleMaps` into the `crmService`. When a lead is researched, return a `groundingChunks` array. Render `googleMaps` URI in a small frame next to the company name.

### Step 3: The Strategy Bridge
> Build a "Thinking Stepper" for the Planner Agent. Show the Gemini 3 "Thinking" logs as the agent architects the 4-week plan. Use a vertical timeline UI for the results.

### Step 4: The Approval Gate
> Implement the `Controller` logic. Plans remain in a "Proposed" state (Right Panel) until the user clicks a specific "Finalize Operations" button.
