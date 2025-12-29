# Sun AI Agency — Home Page Rebuild Strategy

## ROLE
**Principal Product Designer + UX Architect**.
This document outlines the exact specification to rebuild the Sun AI Agency home page (`/`), using an "Editorial Luxury" design system.

---

## 0. ROUTE VERIFICATION
- **Current Route:** `/` (presently rendering `ArchitectureOverview`)
- **Target Route:** `/` (will be replaced by the new `HomePage` component)
- **Status:** Planning phase. Logic and assets are being defined before implementation.

---

## 1. DESIGN SYSTEM (EDITORIAL LUXURY)

### 🎨 Design Tokens

**Color Palette**
- **Deep Void:** `#050508` (Primary Background - Dark)
- **Starlight White:** `#FFFFFF` (Primary Background - Light)
- **Snow Slate:** `#FAFAFA` (Secondary Background - Light)
- **Agency Emerald:** `#10B981` (Primary Accent - Success/Growth)
- **Signal Orange:** `#FF6B2C` (Secondary Accent - Velocity/Urgency)
- **Celestial Navy:** `#0A1628` (Text/Contrast)
- **Glass Border:** `rgba(255, 255, 255, 0.08)`

**Typography System**
- **Headlines:** `Playfair Display` (Serif).
  - H1: 72px / -0.02em tracking / Bold.
  - H2: 56px / -0.01em tracking / SemiBold.
- **Body/UI:** `Inter` (Sans-Serif).
  - Subhead: 20px / Light (300).
  - Label: 10-11px / Bold (700) / Uppercase / 0.2em tracking.
  - Body: 16px / Regular (400) / 1.6 leading.

**Motion Language**
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (Editorial ease).
- **Reveal:** Staggered `translate-y` + `fade-in` via IntersectionObserver.
- **Scroll:** Sticky headers and SVG progress drawing.

---

## 2. SITEMAP & SECTION ORDER

1.  **Header**: Sticky glassmorphism nav.
2.  **Hero**: Split layout (Text Left / Orbital Orbit Right).
3.  **How It Works**: Sticky scroll methodology (Wizard -> Blueprint -> Dashboard).
4.  **What We Build**: 4-column capability grid.
5.  **Tech Stack**: Dark section (#050508) tools list.
6.  **Metrics**: Split layout (Animated counters vs Velocity charts).
7.  **Velocity System**: 8-week horizontal timeline.
8.  **CTA Section**: Final conversion push.
9.  **Partners**: Monochrome logo ticker.
10. **Footer**: Navigation columns.

---

## 3. MULTI-STEP BUILD PROMPTS

### Step 1: Hero Section
> Build a Hero section (min-h-screen). Left side: 'Production-Ready AI' badge. H1: 'Build Intelligent AI Products...' with word-by-word stagger. Right side: Interactive 'Orbital System' with a glowing AI globe and 8 orbiting tech icons. Hovering pauses orbit.

### Step 2: Methodology (Sticky Scroll)
> Create a sticky-scroll section (400vh height). Left panel (Sticky): Steps 1. Scope, 2. Blueprint, 3. Dashboard. Right panel: 'Browser Frame' transitions content based on active step. Step 1: Wizard UI; Step 2: Blueprint Doc; Step 3: Agency Dashboard.

### Step 3: Capability Grid
> Create a 'What We Build' section. 8 cards with Emerald-tinted icons. Hover effect: Card lifts -4px, shadow deepens. Stagger entrance of cards by 80ms.

### Step 4: Tech Stack (Dark Theme)
> Build 'Tech Stack' with dark background (#050508). 4 columns: Frontend, AI Models, Backend, Channels. Footer: Metric stats in a horizontal flex row.

### Step 5: Metrics & Results
> Metrics section with animated counters. Left: 3 Metric Cards. Right: Velocity bar chart comparing Traditional vs Sun AI (8 Months vs 8 Weeks).

### Step 6: Velocity Timeline
> Horizontal line that draws itself on scroll. 4 nodes: Strategy, Build, Integration, Launch. Staggered text cards appear as the line passes.

### Step 7: Final CTA & Footer
> Ready to Build H2. Orange #FF6B2C button. Grayscale partner logo ticker. 4-column footer in Celestial Navy (#0A1628).

---

## 4. COMPONENT INVENTORY
- `OrbitalNode`: Circular glassmorphism icon container.
- `StatCard`: High-padding card with counters.
- `BrowserFrame`: MacOS-style mockup container.
- `GhostCursor`: Animated demo simulation cursor.
- `VelocityLine`: Scroll-triggered SVG path drawing.
