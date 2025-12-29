# Module: Project Orchestration & Execution

**Version:** 2.2 (Gemini 3 Integrated Matrix)  
**Theme:** "Quiet Execution"  
**Status:** ARCHITECTURE LOCKED

---

## 🏁 Enhancement Progress Tracker

### Phase 1: The Operational Skeleton
- [ ] Implement SPA Route Structure (`/app/projects`)
- [ ] Build 3-Panel Project Scaffold (List | Surface | Brain)
- [ ] Create Fluid View Switcher (Grid, Kanban, Timeline)
- [ ] Establish Selection-Driven State Management

### Phase 2: The Planning Engine (The Planner Agent)
- [ ] Integrate `gemini-3-pro-preview` with Thinking Config
- [ ] Build "Project DNA" to WBS Transformation Logic
- [ ] Implement Multi-Step Intake Wizard (Scope -> Constraints -> Review)

### Phase 3: The Risk & Resource Shield (Analyst Swarm)
- [ ] Implement `Risk Analyst` (Timeline Slippage Reasoning)
- [ ] Build `Budget Analyst` (Python-powered Burn Rate Audits)
- [ ] Create Conflict Resolution Logic for Shared Resources

### Phase 4: Creative & Reporting Suite
- [ ] Integrate `Creative Director` (Image Generation for Briefs)
- [ ] Build `Status Reporter` (Automated Editorial Summaries)
- [ ] Implement "Human-in-the-Loop" Approval Workflows

---

## 🖥 Screen Inventory

| Screen Name | Purpose | Default Work View (Main Panel) |
| :--- | :--- | :--- |
| **Portfolio Dashboard** | High-level agency health and active streams. | High-Fidelity Project Cards (Grid) |
| **Task Kanban** | Daily operational execution and task velocity. | Drag-and-Drop Column Board |
| **Resource Timeline** | Long-term roadmap and dependency mapping. | Horizontal Gantt / Timeline |
| **Project Wizard** | The intake engine for new agency engagements. | Multi-Step Stepper UI |

---

## 📊 Features & Agents Matrix

| Feature | Primary Agent | Gemini 3 Config | UI Location |
| :--- | :--- | :--- | :--- |
| **WBS Generation** | Planner Agent | `thinkingBudget: 4000` | Wizard (Step 5) |
| **Burn Rate Audit** | Budget Analyst | `tools: [codeExecution]` | Right Panel (Intelligence) |
| **Market Grounding** | Grounding Agent | `tools: [googleSearch]` | Wizard (Step 1) |
| **Brief Visuals** | Creative Director | `gemini-2.5-flash-image` | Task Detail (Right Panel) |
| **Health Scoring** | Risk Analyst | `thinkingBudget: 2000` | Portfolio Grid (Main) |
| **Status Summaries** | Status Reporter | `responseMimeType: json` | Activity Feed (Right Panel) |

---

## 📐 3-Panel Law (PM Implementation)

### 1. Panel A: Context (Left)
- **Content:** Project List, Client Segments, "At Risk" Filters.
- **Action:** Selecting a project here filters the work in Panel B.

### 2. Panel B: Work Surface (Main)
- **Content:** The "Canvas". Grid of projects or Kanban of tasks.
- **Action:** Clicking a specific Card (Project or Task) triggers the detail view in Panel C.

### 3. Panel C: Intelligence (Right)
- **Tab A (Activity):** Real-time log of transitions and agent thoughts.
- **Tab B (Ops Intel):** Contextual recommendations for the selected entity (e.g., "Resource conflict detected in Phase 2").

---

## 🛡 Design & Safety Guardrails
1. **Selection Lock:** Panel C must stay synced with the active item in Panel B.
2. **Quiet Alerts:** Critical risks are indicated by subtle color-coded rings in Panel B; detailed reasoning is reserved for Panel C.
3. **Draft Gating:** Any AI-generated status report or email must be marked as "Draft" and require a "Human Approval" click before committing to the DB.
4. **No Modals for Logic:** Intelligence happens in the Right Panel, keeping the Main Panel focus on work execution.
