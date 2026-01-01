# Page 07: Services Hub (`/services`)

**Theme:** The Intelligence Factory

## 🛠 Multi-step Prompts

### 1. Wireframe Layout
Section 1: Hero (Playfair headline: "Intelligence-First Services"). Section 2: Core 8 Service Grid (3-column cards). Section 3: Featured Service Spotlight (Alternating 50/50). Section 4: 3 Pillars (Categorization). Section 5: Process Timeline.

### 2. Visual Design System
FashionOS Luxury style. Cards: White, 40px radius, 1px border #EEEEEE. Icons: Indigo-500 in 64px circular backgrounds. Hover: 1.02 scale + subtle shadow.

### 3. Component Specifications
- `ServiceCardBoutique`: Icon (Top), Name (Serif), Desc (Sans), Feature Pills, CTA Link.
- `FeaturedSpotlight`: 50/50 split, large mockup image vs editorial text.
- `CategoryPillar`: Vertical card with category icon and nested service list.

### 4. Responsive Design
Desktop: 3 cols. Tablet: 2 cols. Mobile: 1 col. Vertical process timeline for mobile.

### 5. User Journey & Workflows
Entry: Nav "Services". Action: Click "Lead Intelligence" -> Redirect `/services/lead-intelligence-engine`.

### 6. Implementation Checklist
- [ ] Build 8-card grid.
- [ ] Horizontal-to-Vertical timeline transition.
- [ ] Service detail routing verification.

### 7. Luxury UI/UX Styling
Illustrated visual cards with "Blueprint" SVG overlays that animate on hover. Use 1000ms eases for all entrance transitions.