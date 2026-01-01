# Phase 5: Technical Standards & Safety

## 5.1 Vite Sovereignty
- No CDNs for dependencies.
- No `importmap` in `index.html`.
- Main entry point: `src/main.tsx`.
- All styling via local Tailwind PostCSS.

## 5.2 React Best Practices
- **Routing:** Use `HashRouter` for Stage 2 stability.
- **State:** Prefer Context/Reducers for global orchestration.
- **Perf:** `React.memo` for heavy charting and orbital systems.
- **A11y:** Full keyboard navigation support for the Wizard.

## 5.3 Environment Security
- **API Keys:** Obtain exclusively from `process.env.API_KEY`.
- **Visibility:** Never expose the API key in client-side code bundles.
- **Isolation:** Proxy all LLM calls through secure service layers or edge functions.

## 5.4 AI SDK Compliance
- Use `@google/genai` (Not deprecated types).
- Model: `gemini-3-pro-preview` for complex reasoning.
- Access property `response.text` (No method call).