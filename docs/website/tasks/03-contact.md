# Page 03: Contact (`/contact`)

**Theme:** Open Signal

## 🛠 Multi-step Prompts

### 1. Wireframe Layout
Split Screen Layout. Left: Intake Form (Large inputs). Right: Global Offices & Direct Signal (Chat/Email chips). Bottom: "The Intelligence Buffer" (Explanation of Retriever scan).

### 2. Visual Design System
Deep Void (#050508) for the right panel. Snow Slate (#FAFAFA) for the form panel. Inputs: No borders, bottom-line only, 24px label.

### 3. Component Specifications
- `SignalInput`: Large text input with floating labels.
- `OfficeCard`: Minimalist typography with Maps grounding links.
- `RetrieverNotice`: Animated pulsing icon with "Scanning intent..." text.

### 4. Responsive Design
Mobile: Stack panels. Form first. Tablet: Maintain split but reduce padding.

### 5. User Journey & Workflows
Trigger: Blur URL input -> Start Retriever Scan. Action: Submit form -> Redirect to `/booking` with pre-filled context.

### 6. Implementation Checklist
- [ ] Real-time input validation.
- [ ] Integration with `retrieverService.ts`.
- [ ] Form success animations.

### 7. Luxury UI/UX Styling
Use a "Cursor Follower" in the Void panel that glows emerald when hovering over contact links.