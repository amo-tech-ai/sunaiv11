# Task 15: CRM Pipeline & Deal Logic (P0)

**Feature:** Operationalized Sales Pipeline  
**Priority:** P0  
**Dependencies:** CRM Contacts (Task 04)  
**Status:** Not Started

---

## Purpose & Goals
Transform the CRM from a static directory into an active sales engine. Leads should move through stages based on AI-enriched "Discovery Signals."

- **Goals:**
    - Implement "Deal Stages": [Lead, Discovery, Research, Proposal, Closed].
    - Use **Scorer Agent** to suggest stage transitions.
    - Track "Estimated Deal Value" vs "Actual Project Budget".

---

## 📐 3-Panel Layout (Pipeline View)

| Panel | Content | Behavior |
| :--- | :--- | :--- |
| **A (Left)** | **Pipeline Stages** | Filters: [High Velocity] [At Risk] [VIP]. |
| **B (Main)** | **Deal Board** | Kanban of leads organized by stage. |
| **C (Right)** | **Deal Intel** | **Tabs:** [Research] (Grounded News) | [Next Action] (Drafting). |

---

## 🤖 AI Automation: The Lead Grade
When a lead is enriched (Task 04), the **Scorer Agent** must output a `LeadGrade` (A-F).
- **Grade A:** High budget + Recent funding news + High urgency.
- **Grade F:** Low budget + No website + Vague goals.

---

## ✅ Success Criteria
- [ ] Users can drag leads between stages in Panel B.
- [ ] Changing a stage triggers a specific **Comms Lead** draft (e.g., "Intro" vs "Follow-up").
- [ ] Total Pipeline Value is calculated in the `AgencyVitals` dashboard.