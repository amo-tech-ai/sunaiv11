# Page 13: SaaS Chatbot Solutions (`/services/chatbot/saas`)

**Status:** PLANNING
**Theme:** Instant Activation

## 🛠 Multi-step Prompts

### 1. Wireframe Layout
Section 1: Hero ("68% Faster Activation"). Section 2: "User Journey" flowchart. Section 3: Feature Matrix (RAG, Multi-tenant, SSO). Section 4: "Analyst Audit" mockup. Section 5: SaaS-specific CTA.

### 2. Visual Design System
Deep Celestial Navy (#0A1628) base. Neon Blue (#60A5FA) accents for "Technical" features. Playfair Display headlines in Starlight White.

### 3. Component Specifications
- `ActivationMeter`: Radial progress bar showing time saved.
- `JourneyMap`: Animated SVG connector lines showing user -> bot -> resolution flow.
- `FeaturePill`: High-tracking uppercase labels in a flex container.

### 4. Responsive Design
Mobile: Verticalize the Journey Map. Scale ActivationMeter to 50% width. Tablet: Side-by-side Feature Matrix.

### 5. User Journey & Workflows
Entry from Home Page "Expertise" grid. Path: View SaaS Metrics -> Click "Schedule Discovery" -> Open Booking Wizard with "SaaS" context pre-selected.

### 6. Implementation Checklist
- [ ] SVG Journey Map animation.
- [ ] ActivationMeter counter logic.
- [ ] Pre-fill booking wizard context.
- [ ] RLS Security section implementation.

### 7. Luxury UI/UX Styling
Include a "Terminal-style" sidebar that shows a mock Gemini 3 reasoning log: `[SYSTEM] Analyzing SaaS User Churn... [PLANNER] Proposing Retention Flow...` to demonstrate underlying value.