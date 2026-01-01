# Page 07: AI Web Development Hub (`/services`)

**Status:** PLANNING
**Theme:** The Intelligence Factory

## 🛠 Multi-step Prompts

### 1. Wireframe Layout
Section 1: Service Hero with "Production Ready" badge. Section 2: 5-Card Service Hub (The Core Five). Section 3: "The Stack" diagram with animated lines. Section 4: Vertical ROI timeline. Section 5: Industry Vertical selector.

### 2. Visual Design System
Luxury White-to-Slate gradient backgrounds. Headlines use high-contrast Playfair Display. Featured cards use a "Glassmorphism" effect with 1px border-white/20. Use Signal Orange (#FF6B2C) for "MVP" accents.

### 3. Component Specifications
- `ServiceCardLarge`: Hover-reveal description, "View Blueprint" button, background image with 20% opacity.
- `ROIChart`: SVG bar chart comparing Traditional vs AI velocity.
- `LogicOverlay`: Absolute positioned 0.1 opacity code snippets (JSON) as decorative elements.

### 4. Responsive Design
Stack Service Cards vertically on Mobile. Maintain 2-column grid on Tablet. Ensure the "Stack Diagram" converts to a simple list on screens < 768px.

### 5. User Journey & Workflows
Trigger: Clicks "Services" in nav. Action: User scrolls through the "Core Five". Outcome: Clicking any card navigates to the detailed service subpage (e.g., `/services/ai-agents`).

### 6. Implementation Checklist
- [ ] Build the 5-Card Grid.
- [ ] Animate ROIChart on entry.
- [ ] Implement industry vertical filtering logic.
- [ ] Ensure all routes match `App.tsx`.

### 7. Luxury UI/UX Styling
Apply a "Parallax" effect to the Service Hero image. Use `text-transparent bg-clip-text bg-gradient-to-r` for the main "Web Development" headline to give it a celestial glow.