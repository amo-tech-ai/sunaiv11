# Task 19: Marketing Site Implementation (P1)

**Feature:** 21-Page Editorial Public Site  
**Priority:** P1  
**Dependencies:** Layout System (Task 00), Project Wizard (Task 00b)  
**Status:** Not Started  
**Estimated Effort:** 3 weeks

---

## Purpose & Goals
The public website is the "Visual Hook" for high-ticket agency services. It must feel like a digital luxury magazine while serving as a high-conversion lead generation engine.

- **Goals:**
    - Deploy 21 unique pages using a shared `MarketingLayout`.
    - Integrate ROI Calculators on all Service and Industry pages.
    - Connect Lead Forms directly to the CRM (Task 04).
    - Maintain < 1s page loads using Vite static optimization.

---

## 🏗 Website Architecture

| Category | Routes | Key Logic |
| :--- | :--- | :--- |
| **Main** | `/`, `/about`, `/process`, `/projects` | Brand storytelling and social proof. |
| **Services** | `/services/ai-web-dev`, `/services/ai-agents`, etc. | ROI-focused service descriptions. |
| **Industries** | `/services/chatbot/saas`, `/ecommerce`, etc. | Vertical-specific pain points & metrics. |

---

## 🤖 AI Features (Public)
- **ROI Calculators:** Use `gemini-3-flash-preview` to provide "Business Impact Projections" based on user inputs.
- **Agent Demos:** Inline "Agent Preview" cards that show mock thinking logs for specific industry workflows.

---

## ✅ Success Criteria
- [ ] Responsive design verified for Desktop, Tablet, and Mobile.
- [ ] Lead capture forms successfully inject data into `sunai_crm_contacts`.
- [ ] 100% SEO coverage for target keywords defined in `docs/website/00-summary.md`.
- [ ] Brand consistency check: Serif headers and minimal spacing across all 21 pages.