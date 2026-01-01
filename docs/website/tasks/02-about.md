# Page 02: About (`/about`)

**Theme:** The Architect's Origin

## 🛠 Multi-step Prompts

### 1. Wireframe Layout
Top: Nav. Section 1: Hero (Text centered, high vertical padding). Section 2: Narrative Timeline (Vertical). Section 3: The Principles (3-column grid). Section 4: Lead Architects (Editorial profile cards). Section 5: Global Presence Map.

### 2. Visual Design System
Starlight White background. Headlines: 64px Playfair Display. Accent: Subtle Indigo-50 for section alternates. Profile cards use grayscale photography with high-contrast borders.

### 3. Component Specifications
- `ArchitectProfile`: 450px height, text overlay on hover, Serif name, Sans role.
- `TimelineNode`: SVG vertical line with pulsing nodes at key years.
- `StatCounter`: Large serif numbers that count up on scroll.

### 4. Responsive Design
Mobile: Single column profiles. Scale hero font to 40px. Tablet: 2-column grid for principles.

### 5. User Journey & Workflows
Path: "Our Philosophy" -> Scroll to "Active Projects" -> Redirect to `/projects`. CTA: "Join the Orbit" -> Booking.

### 6. Implementation Checklist
- [ ] Intersection observer for timeline reveal.
- [ ] Grayscale filter on profile images.
- [ ] SVG map connector lines.

### 7. Luxury UI/UX Styling
Apply a "Grain" texture overlay to the entire page (opacity 0.03) to give it a high-end print magazine feel.