# Element Farm Solutions — Developer Welcome & Claude Code Guide

This file serves as the CLAUDE.md equivalent for this project. Claude Code loads it automatically. New developers should read it top to bottom before touching any code.

---

## Project Overview

**Element Farm Solutions** is a South African agricultural consultancy website. The business helps small to medium commercial farms adopt regenerative farming systems — reducing dependence on chemical fertilisers, improving soil health, and building long-term land productivity.

The website is a marketing and lead-generation tool. It explains the company's service offerings, educates farmers on the problems with conventional farming, and directs visitors to contact forms.

**Live domain:** elementfarmsolutions.co.za

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| React | 18.2 | UI framework |
| Vite | 5.x | Dev server and build tool |
| React Router DOM | 7.x | Client-side routing |
| Framer Motion | 11.x | Animations and transitions |
| Plain CSS (per-component) | — | Styling (no CSS framework) |

No TypeScript. No state management library. No backend. Pure frontend SPA.

---

## Running the Project

```bash
npm install
npm run dev       # dev server at localhost:5173
npm run build     # production build → /dist
npm run preview   # preview production build locally
```

---

## Project Structure

```
/
├── src/
│   ├── main.jsx                  # React entry point
│   ├── App.jsx                   # Router + page composition
│   ├── App.css                   # Minimal app-level styles
│   ├── index.css                 # Global styles, CSS variables, reset
│   └── components/
│       ├── Header.jsx / .css     # Sticky nav with dropdown menus
│       ├── Footer.jsx / .css     # Site-wide footer
│       ├── CallToAction.jsx / .css   # Green CTA strip (#0e5a36)
│       │
│       │── HOME PAGE SECTIONS
│       ├── HeroSection.jsx / .css        # Hero banner
│       ├── MissionSection.jsx / .css     # "Our Mission" with 3 pillars
│       ├── SoilTypesSection.jsx / .css   # Regional soil type cards
│       ├── OurApproachSection.jsx / .css # 3-step approach
│       │
│       │── LAND REJUVENATION PAGE (sub-sections)
│       ├── LandRejuvenationPage.jsx / .css   # Page shell + hero
│       ├── StatsSection.jsx / .css           # Top stat figures
│       ├── ErosionRiskSection.jsx / .css     # Erosion risk map + stats
│       ├── ProblemSection.jsx / .css         # "The Problem With Modern Farming"
│       ├── TailoredSolutionSection.jsx / .css # "Your Tailored Solution"
│       ├── VideoSection.jsx / .css           # Embedded video
│       ├── WhatToExpectSection.jsx / .css    # Results timeline
│       ├── OurProcessSection.jsx / .css      # Process steps
│       ├── ResultsSection.jsx / .css         # Outcome stats cards
│       │
│       │── SOLUTION PAGES (self-contained)
│       ├── AntiFloodingPage.jsx / .css
│       ├── UVProtectionPage.jsx / .css
│       ├── WasteManagementPage.jsx / .css
│       ├── PoultryPage.jsx / .css
│       ├── OrganicFarmingPage.jsx / .css
│       │
│       │── CONTACT
│       └── ContactPage.jsx / .css    # Renders different forms by `type` prop
│
├── public/                        # Static assets (images, logo)
├── docs/
│   └── agent-teams-reference.md   # Full Claude Code agent teams reference
├── .claude/
│   └── settings.local.json        # Project-level Claude Code settings
├── index.html
├── vite.config.js
└── package.json
```

---

## Routing

All routes are defined in `src/App.jsx`:

| Path | Component | Notes |
|---|---|---|
| `/` | `HomePage` | Hero + Mission + SoilTypes + OurApproach + CTA |
| `/solutions/land-rejuvenation` | `LandRejuvenationPage` | Full sub-section page |
| `/solutions/uv-protection` | `UVProtectionPage` | |
| `/solutions/anti-flooding` | `AntiFloodingPage` | |
| `/solutions/waste-management` | `WasteManagementPage` | |
| `/solutions/poultry` | `PoultryPage` | |
| `/contact/poultry-dairy` | `ContactPage` (type prop) | |
| `/contact/agri-farms` | `ContactPage` (type prop) | |
| `/contact/organic` | `OrganicFarmingPage` | |
| `*` | `HomePage` | Catch-all fallback |

---

## Design System

All CSS custom properties are defined in `src/index.css`. Always use these tokens — never hardcode colours.

### Colour Tokens

| Variable | Hex | Usage |
|---|---|---|
| `--green-dark` | `#0e5a36` | CTA buttons, key accent elements |
| `--green-mid` | `#3fae5a` | Secondary green accents |
| `--orange-main` | `#f36f21` | Primary brand orange — headings, highlights |
| `--mustard` | `#e0a526` | Supporting warm accent |
| `--charcoal` | `#2b2b2b` | Page backgrounds (dark sections), body text |
| `--cream` | `#d9cdb8` | Warm neutral |
| `--white-warm` | `#f7f5f0` | Default page background |
| `--off-white` | `#f1eee8` | Card backgrounds |
| `--light-grey` | `#e6e8e6` | Borders, subtle dividers |

### Typography

| Variable | Value |
|---|---|
| `--font-heading` | `'Montserrat', sans-serif` |
| `--font-body` | `'Source Sans 3', sans-serif` |

### Layout

- `--page-max-width: 1320px` — use this to constrain page content width
- `--page-side-padding: 1.25rem` — standard horizontal padding

### Page Header Pattern (Solution Pages)

All solution pages use **orange text on charcoal background** for their hero/header section. See `AntiFloodingPage.css` as the reference implementation. When adding new solution pages, match this pattern.

---

## Key Conventions

### Language & Copy
- Never abbreviate: use **"KwaZulu-Natal"** not "KZN", **"South Africa"** not "SA"
- All percentages get a `~` prefix to indicate approximation: `~30%`, `~50%+`
- Headings use sentence case unless they are brand names
- Bold text in body copy uses `<strong>` tags

### CSS
- Each component has its own `.css` file co-located with the `.jsx` file
- BEM-style class naming: `.component-name__element--modifier`
- No inline styles except for Framer Motion `style` props (parallax transforms)
- Never hardcode hex values — always use CSS variables

### Animations
- Framer Motion is used throughout. Entry animations use `initial` / `animate` / `transition` props
- Scroll-linked parallax uses `useScroll` + `useTransform` from Framer Motion
- Keep animations subtle: standard `duration: 0.6–0.7`, `ease: 'easeOut'`

### Components
- Each solution page is self-contained and includes `<Header />` and `<Footer />`
- `LandRejuvenationPage` is the most complex — it imports ~7 sub-section components
- `ContactPage` accepts a `type` prop (`"poultry-dairy"` or `"agri-farms"`) to render different form variants

---

## Claude Code Setup

### Settings file

`.claude/settings.local.json` — project-level config already committed:

```json
{
  "permissions": {
    "allow": [
      "Bash(npm install:*)",
      "Bash(npm run:*)"
    ]
  },
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

This pre-approves `npm install` and `npm run` commands and enables the experimental agent teams feature.

---

## Working with Agent Teams (Dev 1 + Dev 2)

This project uses a **two-developer parallel agent pattern**. When a batch of edits arrives (e.g. from a designer review), work is split across two agents running simultaneously.

### Roles

| Agent | Responsibility |
|---|---|
| **Dev 1 (Lead)** | Home page components + site-wide changes. Also reviews Dev 2's output. NOT just a reviewer — carries independent implementation tasks. |
| **Dev 2** | Solution page components (Land Rejuvenation, Anti-Flooding, etc.) |

### How to split work

- Identify which files each task touches
- Assign non-overlapping file sets to each agent — **never have both agents edit the same file**
- Dev 1 and Dev 2 can communicate directly via `SendMessage` when context needs to be shared
- After both complete, Lead synthesizes and reports back

### Spawn pattern

Always launch both agents in the same message with `run_in_background: true` so they run truly in parallel:

```
[Single message with two Agent tool calls, both run_in_background: true]
```

### Full reference

See [docs/agent-teams-reference.md](docs/agent-teams-reference.md) for complete documentation on agent teams: setup, architecture, communication, task lists, hooks, and troubleshooting.

---

## Common Tasks

### Adding a new solution page

1. Create `src/components/NewSolutionPage.jsx` and `NewSolutionPage.css`
2. Model the header/hero after `AntiFloodingPage` (orange on charcoal)
3. Include `<Header />` and `<Footer />` inside the page component
4. Add a `<Route>` in `src/App.jsx` under `/solutions/`
5. Add a dropdown item in `src/components/Header.jsx` under the correct category

### Adding a new section to Land Rejuvenation

1. Create the component file + co-located CSS
2. Import it into `LandRejuvenationPage.jsx` and place it in page order
3. Ensure section headings use `var(--orange-main)`

### Updating copy or content

Read the relevant `.jsx` file first. Copy lives directly in JSX — there is no CMS or content layer. For large copy changes use Dev 1 / Dev 2 pattern to work in parallel across multiple files.

---

## Public Assets

All images and static files live in `/public/`. Reference them with absolute paths from root, e.g.:

```jsx
<img src="/Element Farm Solutions_Final_Logo_Side_PNG.png" alt="..." />
<img src="/erode_map.png" alt="..." />
```

Key assets:
- `Element Farm Solutions_Final_Logo_Side_PNG.png` — main logo
- `erode_map.png` — South Africa erosion risk map (used in ErosionRiskSection)
- `thermal-high-temp.png` / `thermal-low-temp.png` — thermal imagery (UVProtectionPage)
- `field-crops.png`, `herbs-tunnels.png`, `orchards.png` — farm photography
