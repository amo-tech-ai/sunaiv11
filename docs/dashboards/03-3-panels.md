
# System: The 3-Panel Unified Layout

**Objective:** Enforce a strict 3-panel operational interface across all primary modules to ensure aesthetic consistency, focus, and avoidance of information overload.

## 1. CRM Layout Blueprint

The Relationship Intelligence module has been migrated from a legacy 4-5 column hybrid to a strict 3-panel orchestration system.

### Panel Configuration (Horizontal)
1. **LEFT PANEL (256px / w-64 equivalent)**: Segment Navigation & Filters.
2. **MAIN PANEL (Fluid)**: The Primary Database (Editorial Contact Table).
3. **RIGHT PANEL (320px / w-80 equivalent)**: Unified Intelligence (Activity + Contact Detail).

### The Right Panel Tab System
The Right Panel now handles dual responsibility through a high-fidelity tabbed interface.
- **Tab A: Activity (Default)**
  - Aggregated Health Index (Gemini 3 analysis).
  - Recent Orchestration Feed (Audit log of automated and human actions).
  - Platform Strategy hints.
- **Tab B: Contact**
  - Contextual selection triggered by row click in the Main Panel.
  - Active Intelligence: Sentiment scoring, Market signals (Google Search grounding), and Proposed Actions (Flash drafting).

## 2. Project Wizard Layout Blueprint

The Architectural intake flow is now locked into a 3-panel system.

### Panel Configuration (Horizontal)
1. **LEFT PANEL (256px / w-64 equivalent)**: Wizard Step Navigation.
2. **MAIN PANEL (Fluid)**: Intent Capture Forms & Progress.
3. **RIGHT PANEL (320px / w-80 equivalent)**: Unified Context (Activity + Blueprint DNA).

### The Right Panel Tab System
- **Tab A: Activity (Default)**
  - Live Monitor signals.
  - Recent Orchestration feed for the intake process.
  - Integrity logs (Audit trail).
- **Tab B: Blueprint**
  - Root Identity & Project DNA.
  - Plan Feasibility & Agent Confidence scores.
  - System Readiness status.

## 3. Global Guardrails
- **No 4th Column**: The global "Activity & Context" sidebar from `MainLayout.tsx` is suppressed in favor of module-specific tabbed panels.
- **Human-in-the-Loop**: All AI proposals (Drafting, Scoring, Planning) remain in Panel C for review before being committed.
- **Visual Sync**: All primary modules must verify layout at 1440px width to ensure no horizontal overflow.

## 4. Wireframe Schematic
```text
┌─────────────────┬─────────────────────────────────┬──────────────────────────┐
│ GLOBAL SIDEBAR  │ MODULE WORKSPACE                │                          │
│ (Agency Context)│ (CRM / Dashboard / Wizard)       │ INTEGRATED RIGHT PANEL   │
│                 │                                 │ (ACTIVITY | CONTEXT)     │
│ [Projects]      │ ┌────────────┐ ┌──────────────┐ │                          │
│ [CRM]           │ │ LEFT       │ │ MAIN         │ │ ┌──────────────────────┐ │
│ [Insights]      │ │ (Nav/Steps)│ │ (Work Surf)  │ │ │ Tabs: [Act] [Context]│ │
│                 │ │            │ │              │ │ ├──────────────────────┤ │
│ [Settings]      │ │ Filters    │ │ Forms        │ │ │                      │ │
│                 │ │ Sub-Nav    │ │ Tables       │ │ │ Context-Aware Logic  │ │
│ [User]          │ └────────────┘ └──────────────┘ │ └──────────────────────┘ │
└─────────────────┴─────────────────────────────────┴──────────────────────────┘
```
