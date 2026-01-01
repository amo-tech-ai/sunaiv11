# Phase 4: Logic, Workflows & AI Roles

## 4.1 AI Role Definition
### AI Can:
- Propose 4-phase project structures (WBS).
- Synthesize market news from URLs (Grounding).
- Calculate relationship health scores.
- Identify resource risks and timeline slippage.

### AI Cannot:
- Commit changes to the database directly.
- Send emails to clients without human review.
- Adjust budgets or deadlines autonomously.

## 4.2 Core Workflows
### A. The Blueprint Pipeline
Trigger: Step 6 of Wizard -> Call Planner Agent -> Generate WBS JSON -> Display in Right Panel -> Human "Approve" -> Commit to Execution.

### B. Risk Mitigation Loop
Trigger: Task status change -> Analyst Agent detects slippage -> Proposes date shift in Right Panel -> Human "Authorize" -> Update DB.

## 4.3 Agent Pulse
Every AI action must be accompanied by a visual "Pulse":
- **Thinking:** Active reasoning (Blue).
- **Grounding:** Fetching data (Emerald).
- **Waiting:** Human approval required (Amber).