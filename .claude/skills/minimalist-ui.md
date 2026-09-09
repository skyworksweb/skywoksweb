# Premium Utilitarian Minimalism UI Protocol

Refined, editorial-style interface framework. Notion/Linear aesthetic. Strict monochrome with muted pastels.

## Typography Architecture

- **Headings:** Serif fonts (editorial feel) — tight letter-spacing, line-height ~1.1
- **Body/UI/Buttons:** 'SF Pro Display', 'Geist Sans', or clean geometric sans-serif
- **NEVER use:** Inter, Roboto

## Color Strategy

- **Canvas:** Pure White `#FFFFFF` or Warm Bone `#F7F6F3` / `#FBFBFA`
- **Foreground:** Near-black (#111111 or zinc-900)
- **Accents (use sparingly, semantic only):**
  - Pale red: #FDEBEC
  - Pale blue: #E1F3FE
  - Pale green: #EDF3EC
  - Pale yellow: #FBF3DB

## Critical Prohibitions

- No Inter or Roboto typefaces
- No generic icon libraries (Lucide, Feather) — use Phosphor or Heroicons
- No heavy Tailwind shadows
- No bright primary backgrounds
- No gradients
- No neon colors
- No emojis

## Component Standards

- **Cards:** `border: 1px solid #EAEAEA`, border-radius 8px–12px, no shadow
- **Primary buttons:** Solid black (#111111) background, minimal radius, no shadow
- **Inputs:** Minimal border, no focus glow — subtle underline or thin ring only

## Motion Philosophy

- Scroll-triggered fades: 600ms duration
- Hover micro-lifts (subtle translateY)
- Staggered grid reveals
- Exclusively `transform` and `opacity` (GPU-safe)

## Layout Rules

- Strong whitespace — breathing room over density
- Editorial asymmetry preferred
- Max paragraph width ~65 characters
- Sentence case headers (not Title Case)
- Tabular figures for numbers

## When to Use This Skill

Apply when building: documentation sites, productivity tools, note-taking apps, dashboards with editorial feel, portfolio sites, SaaS tools inspired by Notion/Linear/Vercel design language.
