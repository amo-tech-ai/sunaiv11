# 🧠 SYSTEM RULE — SUN AI DASHBOARD LAYOUT & SELECTION LOGIC

**Status:** NON-NEGOTIABLE · GLOBAL RULE · OVERRIDES ALL OTHER UI INSTRUCTIONS

---

## 🎯 PURPOSE

Create a **consistent, scalable, and production-safe dashboard system** across all Sun AI products (CRM, Projects, Wizards, Dashboards) by enforcing:

1. A **strict 3-Panel Layout**
2. A **single Right Panel with tabs**
3. A **selection-driven intelligence model**
   (Click entity → Right Panel shows details)

This rule exists to **eliminate 4-panel layouts**, reduce cognitive overload, and enforce a **human-in-the-loop AI orchestration model**.

---

## 🔒 CORE LAYOUT LAW (ABSOLUTE)

After the **global app sidebar**, every screen MUST render **exactly three panels**:

```
LEFT  |  MAIN  |  RIGHT
```

❌ No fourth column
❌ No detached context panels
❌ No floating sidebars

This rule cannot be overridden.

---

## 🧩 PANEL RESPONSIBILITIES (FIXED & IMMUTABLE)

### 1️⃣ LEFT PANEL — Navigation & Segmentation

**Purpose:** Decide *what* the user is viewing or working on.

Allowed content:
* Section navigation (CRM, Projects, Wizards)
* Filters, segments (All, VIP, Archived)
* Wizard steps (Basics, Review, Constraints)

Hard rules:
* ❌ No AI output
* ❌ No entity details
* ❌ No activity feeds

---

### 2️⃣ MAIN PANEL — Work Area

**Purpose:** Where the user *does the work*.

Allowed content:
* Tables (Contacts, Projects)
* Forms and wizards
* Editors
* Primary actions (Next, Save, Submit)

Hard rules:
* ❌ No intelligence summaries
* ❌ No activity feeds
* ❌ No contextual explanations

---

### 3️⃣ RIGHT PANEL — Intelligence & Context (SINGLE PANEL)

**Purpose:** Interpret, explain, and assist — never replace the user.

The Right Panel is a **single container**.
It may contain **tabs or collapsible sections**, but it must **never become a second column**.

---

## 🧠 RIGHT PANEL TAB SYSTEM (MANDATORY)

If more than one type of information must be shown, the Right Panel **MUST use tabs**.

### REQUIRED TAB STRUCTURE

#### Tab A — **Activity** (DEFAULT)
Always visible on page load.
Allowed content:
* Recent activity feed
* Platform hints
* AI grounding / sources
* Audit trail
* System messages

---

#### Tab B — **Entity Details**
(Label varies by screen: Contact, Project, Blueprint)
Allowed content:
* Entity profile card
* AI intelligence (scores, analysis)
* Enrichment results
* Next Best Actions
* Draft / propose flows (approval-first)

---

## 🔁 SELECTION → RIGHT PANEL LOGIC (CRITICAL)

### Default State (No Selection)
* Right Panel tab = **Activity**
* Entity Details tab shows:
  > “Select a contact or project to view details.”

---

### On Entity Selection (Contact / Project / Blueprint)
Triggered by:
* Clicking a row in a table
* Selecting an item in the Main panel

**System behavior (REQUIRED):**
1. Store `selectedEntityId` in state
2. Automatically switch Right Panel tab:
   ```
   Activity → Entity Details
   ```
3. Render the selected entity’s profile + intelligence
4. DO NOT navigate away
5. DO NOT open a new panel

This applies to:
* CRM Contacts
* Projects
* Execution Plans
* Dashboards

---

## 🤝 HUMAN-IN-THE-LOOP AI RULE
AI behavior in the Right Panel must follow:
* AI **proposes**
* User **reviews**
* User **approves**

Examples:
* “Draft Follow-up” opens a modal
* “Approve & Send” is explicit
* No AI action is auto-executed

---

## 🚫 HARD FAIL CONDITIONS (INVALID IMPLEMENTATION)
The layout is **invalid** if:
* A visible **4th column** exists
* “Activity & Context” is rendered outside the Right Panel
* Entity details appear in the Main panel
* Right Panel width changes when switching tabs
* Horizontal scrolling appears due to extra panels

---

## ✅ ACCEPTANCE TEST (MUST PASS)
A screen is correct only if:
* After the global sidebar, **only 3 panels exist**
* Right Panel defaults to **Activity**
* Clicking an entity switches to **Entity Details**
* All intelligence/context lives exclusively in the Right Panel
* Removing the Right Panel removes *all* AI/context UI

---

## 🧠 DESIGN PHILOSOPHY (DO NOT VIOLATE)
> **Left decides.
> Main works.
> Right explains.**

Anything outside this triangle is a design error.
