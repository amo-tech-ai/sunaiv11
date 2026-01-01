# 🛠️ SunAI Troubleshooting & Fix Log

**System Status:** V1.2 (Post-Infrastructure Lock)
**Last Resolved:** January 27, 2025

---

## 🛑 Resolved Issues

### 1. Broken Styles & Layout (Vite Sovereignty)
*   **Status:** ✅ RESOLVED
*   **Cause:** Presence of an `importmap` in `index.html` conflicted with Vite's module resolution.
*   **Fix:** Removed the `importmap` and ensured `main.tsx` is the sole entry point. Removed redundant CDN scripts.
*   **Verification:** Verified styles render correctly without external blocking scripts.

### 2. Redundant Entry Points
*   **Status:** ✅ RESOLVED
*   **Cause:** Both `index.tsx` and `main.tsx` existed at the root.
*   **Fix:** Pointed `index.html` exclusively to `main.tsx`.

---

## 📐 Current Design Enforcement (3-Panel Law)

*   **Rule:** Every operational screen must render exactly three panels: LEFT (Nav), MAIN (Work), and RIGHT (Intelligence).
*   **Constraint:** The Right Panel must use a tabbed system (`Activity` | `Scoped Context`) to prevent a 4th column.
*   **Visual Check:** Layouts must be tested at 1440px width to ensure zero horizontal overflow.

---

## ✅ Pre-flight Checklist for New Modules
- [ ] No `importmap` or CDN scripts in `index.html`.
- [ ] Sole entry point is `main.tsx`.
- [ ] 3-Panel layout verified (Left | Main | Right).
- [ ] Gemini API calls use `process.env.API_KEY`.
- [ ] Models follow `gemini-3-*` naming convention.