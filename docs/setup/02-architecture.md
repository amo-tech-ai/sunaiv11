# Phase 2: Core Architecture & Systems

## 2.1 Core System Components
- **Auth + Protected Routes:** Secure session management and data isolation.
- **Wizard Intake:** 6-step journey extracting project DNA and constraints.
- **Main Dashboard:** High-level operational hub for monitoring velocity.
- **AI Assistant Swarm:** Background agents (Architect, Analyst, Researcher).
- **Data Persistence:** Supabase/Postgres store as the "Source of Truth."
- **Approval Gate:** Mandatory UI layer intercepting all AI-proposed actions.

## 2.2 Global Route Map
| Route | Page Name | Purpose |
| :--- | :--- | :--- |
| `/` | Marketing Home | Brand storytelling. |
| `/login` | Auth Entry | Secure access. |
| `/app/projects` | CORE Dashboard | Primary ops hub. |
| `/app/crm` | Insights Hub | Relationship intelligence. |
| `/projects/:id/wizard` | Project Wizard | Structured intake. |
| `/projects/:id/execution`| Project Stream | Command center for execution. |
| `/admin` | Admin Dashboard | Global agency settings. |

## 2.3 Persistence Strategy
- **Stage 1:** `localStorage` for rapid prototyping.
- **Stage 2:** Supabase Postgres for relational integrity.
- **Stage 3:** Real-time listeners for collaborative task updates.