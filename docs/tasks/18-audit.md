# Task 18: Technical Architecture & AI Integration Audit

**Date:** January 27, 2025  
**Auditor:** Principal Product Architect  
**Scope:** Architecture, Routing, AI SDK Compliance, Layout Laws  
**Status:** ⚠️ ACTION REQUIRED

---

## 📊 Executive Summary

The SunAI Agency platform demonstrates a high level of adherence to the **3-Panel Layout Law** and sophisticated use of the **Gemini 3 SDK**. However, there are critical violations of the **Vite Sovereignty** rules and architectural inconsistencies that will prevent production-grade deployment and build stability.

---

## 🛑 Critical Architecture Violations

### 1. Import Maps in `index.html`
*   **Finding:** The `index.html` file contains a `<script type="importmap">` block.
*   **Rule Violation:** "Vite Sovereignty: MUST NOT use importmap in index.html."
*   **Impact:** This bypasses the Vite build pipeline, leading to dependency version mismatches and broken production bundles.
*   **Fix:** Remove the `importmap`. All dependencies must be managed via `package.json` and resolved by Vite.

### 2. Entry Point Inconsistency
*   **Finding:** The project uses `index.tsx` as the entry point at the root.
*   **Rule Violation:** "Entry point is Always `src/main.tsx` via `<script type="module">`."
*   **Impact:** Standard Vite configurations expect the `src/` directory. While the prompt allows root-level treating, production CI/CD (like Vercel) will fail if the standard `src/main.tsx` contract isn't respected.
*   **Fix:** Migrate root files into a `src/` directory and rename `index.tsx` to `main.tsx`.

### 3. Tailwind CDN Usage
*   **Finding:** `index.html` loads Tailwind via `<script src="https://cdn.tailwindcss.com"></script>`.
*   **Rule Violation:** "No CDNs: Tailwind MUST be installed via npm and processed via PostCSS."
*   **Impact:** No purge logic, massive CSS payloads, and lack of custom configuration support.
*   **Fix:** Use standard Tailwind PostCSS installation.

---

## 🤖 Gemini 3 SDK Compliance Audit

| Feature | Implementation | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Model Naming** | `gemini-3-pro-preview` | ✅ Correct | Follows the latest naming convention. |
| **API Key** | `process.env.API_KEY` | ✅ Correct | Correctly isolated from client state. |
| **Thinking** | `thinkingBudget: 4000` | ✅ Correct | Used in `projectGenerator.ts` and `analystService.ts`. |
| **Code Execution** | `tools: [{codeExecution: {}}]` | ✅ Correct | Successfully leveraged in `analystService.ts`. |
| **Search Grounding** | `tools: [{googleSearch: {}}]` | ✅ Correct | Integrated into `researchService.ts`. |
| **Image Gen** | `gemini-3-pro-image-preview` | ✅ Correct | Correctly checks for `hasSelectedApiKey()`. |
| **Text Extraction** | `response.text` | ✅ Correct | Correctly accessed as a property (not a method). |
| **Schema Types** | `Type.OBJECT`, etc. | ✅ Correct | Uses the non-deprecated `Type` enum from `@google/genai`. |

### ⚠️ Improvement Area: `thinkingBudget`
The `generateProjectPlan` service uses a budget of `4000`. For complex agency-grade WBS generation, this should be increased to `16000` or `32768` to maximize architectural reasoning.

---

## 📐 3-Panel Law & Routing

### 1. Layout Implementation
*   **Status:** ✅ EXCELLENT.
*   **Observation:** `MainLayout.tsx` correctly implements the 3-panel scaffold. The `CRMContacts` and `ProjectExecutionPlan` modules strictly follow the "Select -> Context" logic.

### 2. Routing Strategy
*   **Status:** ✅ CORRECT.
*   **Observation:** Uses `HashRouter` as required by **Stage 2** rules for static reload stability.

---

## 🔍 Troubleshooting & Fix Roadmap

1.  **Refactor index.html (P0):**
    *   Remove `<script type="importmap">`.
    *   Remove Tailwind CDN script.
    *   Remove Google Fonts if possible (move to CSS `@import` or Vite plugin).
    *   Change `<script type="module" src="index.tsx">` to `<script type="module" src="/src/main.tsx">`.

2.  **Standardize Directory Structure (P0):**
    *   Move all components, pages, services, layouts, and `App.tsx` into a `src/` folder.
    *   Move global styles to `src/index.css`.

3.  **Harden Multi-Tenant Context (P1):**
    *   The current `localStorage` based `verifyProjectAccess` is a mock.
    *   **Recommendation:** Move to JWT-based tenant validation as per `Task 16`.

4.  **Enhance Image Generation Safety (P1):**
    *   In `creativeService.ts`, the catch block for "Requested entity was not found" should explicitly clear the current key before re-opening the selection dialog.

---

**Audit Summary:** The application logic is robust and the AI integration is state-of-the-art. Addressing the **Vite Sovereignty** violations is the only remaining blocker to a professional production build.

**Approved by:** Principal Product Architect