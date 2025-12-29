# Module: Relationship Intelligence (CRM)

**Status:** PRODUCTION READY
**Progress Tracker:**
- [x] Phase 1: UI Skeleton & Navigation
- [x] Phase 2: The Researcher Agent (Enrichment via Search Grounding)
- [x] Phase 3: The Scorer Agent (Relationship Strength via Thinking Config)
- [x] Phase 4: The Comms Lead (Drafting Agent)
- [x] Phase 5: Pipeline Integration (Blueprint Sync)

**Route:** `/app/crm`
**Theme:** "From Database to Orchestration"

## 1. System Architecture

The CRM is built on a 3-Panel "Sun AI" layout driven by specialized agents.

### Agent Configuration (Gemini 3 Stack)

| Agent Archetype | Model | Config | Responsibility |
| :--- | :--- | :--- | :--- |
| **The Scorer** | `gemini-3-pro-preview` | `thinkingBudget: 8000` | Analyzes interaction history to determine "Relationship Strength" (0-100) and "Churn Risk". |
| **The Researcher** | `gemini-3-pro-preview` | `tools: [{googleSearch: {}}]` | Enriches contact profiles with real-time news, funding rounds, and recent activity. |
| **The Comms Lead** | `gemini-3-flash-preview` | `temperature: 0.7` | Drafts personalized follow-up emails based on specific context triggers. |
| **The Controller** | **Human UI** | N/A | The "Approve/Reject" gate. AI never sends emails automatically. |

## 2. Decision Logic
- **Relationship Score < 40**: Automatically flags as "Risk" and suggests a "Reassurance" draft.
- **Relationship Score > 80**: Flags as "VIP" and suggests "Upsell" or "Loyalty" workflows.
- **Blueprint Sync**: Clicking a linked blueprint in the CRM table routes the user to the Execution Plan with the specific project context.

## 3. Security & Safety
- **Grounding Visibility**: All enriched data displays "Source: Google Search" to maintain transparency.
- **Human-in-the-Loop**: All AI-generated emails require manual editing and approval before being "Committed" to the mailer.
