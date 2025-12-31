# Task 16: Security & Multi-Tenant Architecture (P0)

**Feature:** Data Isolation & Security  
**Priority:** P0  
**Status:** Not Started

---

## Purpose & Goals
Ensure that the agency platform can scale to multiple "Tenants" (different agency departments or sub-agencies) without data leaks.

- **Goals:**
    - Implement `tenant_id` on every table.
    - Configure Supabase **Row Level Security (RLS)**.
    - Secure environment variables for Gemini API keys.

---

## 🔒 Security Guardrails

1.  **RLS Policy:** `SELECT * FROM projects WHERE tenant_id = auth.uid().tenant_id`.
2.  **API Keys:** `GOOGLE_API_KEY` must never be exposed to the client. All AI calls route through Edge Functions.
3.  **Audit Logs:** Every "Approve" click in Panel C creates an entry in the `audit_logs` table with `user_id` and `timestamp`.

---

## ✅ Success Criteria
- [ ] User A cannot see User B's projects via URL manipulation.
- [ ] Edge Functions successfully proxy Gemini 3 requests.
- [ ] Audit trail captures all human-in-the-loop decisions.