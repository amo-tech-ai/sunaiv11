# Task 17: Financial Ops & Billing (P1)

**Feature:** Integrated Agency Billing  
**Priority:** P1  
**Status:** Not Started

---

## Purpose & Goals
Automate the financial side of the agency by linking project plans to real money.

- **Goals:**
    - Integrate Stripe for retainer management.
    - Use **Analyst Agent** to compare "Contract Value" vs "Resource Burn".
    - Automatically flag "Over-budget" phases.

---

## 🤖 AI Logic: The Burn Audit
The **Analyst Agent** (Pro) uses `codeExecution` to:
1.  Read the `Task` status and `assignedTo` hourly rates.
2.  Run a Python script to calculate the current "Burn" vs the "Budget Constraint" in the Blueprint.
3.  Propose "Mitigation" if burn exceeds 80% of phase budget.

---

## ✅ Success Criteria
- [ ] Stripe invoices are generated upon "Proposal Approval" (Task 01).
- [ ] Real-time burn rate charts are visible in Panel C of the Execution Plan.
- [ ] Financial data is strictly isolated via RLS (Task 16).