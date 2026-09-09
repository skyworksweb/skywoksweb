# Design-Taste Frontend: Premium UI/UX Engineering Framework

This comprehensive system establishes baseline configuration parameters and architectural standards for building high-end digital interfaces that resist generic AI design patterns.

## Core Configuration

The framework operates on three primary dials:
- **Design Variance (8/10):** Emphasizes asymmetric layouts and creative white-space management
- **Motion Intensity (6/10):** Enables fluid CSS transitions with selective Framer Motion choreography
- **Visual Density (4/10):** Maintains breathing space in standard web application contexts

## Architectural Foundations

The system mandates React/Next.js with Server Components as default, requiring Client Component isolation for stateful interactions. It enforces mandatory dependency verification before importing third-party libraries and establishes Tailwind CSS as the primary styling methodology.

A critical mobile safeguard states: use `min-h-[100dvh]` to prevent catastrophic layout jumping rather than `h-screen`, addressing iOS Safari viewport instability.

## Design Engineering Directives

The framework actively corrects five LLM biases through deterministic rules:

1. **Typography standardization** using premium font families (Geist, Outfit, Cabinet Grotesk)
2. **Color calibration** limiting accent colors and banning oversaturated "AI purple" aesthetics
3. **Layout diversification** preventing centered hero sections when variance exceeds 4
4. **Materiality controls** restricting generic card overuse in high-density contexts
5. **Interactive completeness** requiring loading, empty, and error states

## Critical Prohibitions

- No emojis (use Phosphor/Radix icons instead)
- No serif fonts on dashboard interfaces
- No pure black (#000000) — use zinc tones instead
- No generic startup nomenclature or placeholder data
- No three-column equal card layouts
- No oversaturated "AI purple" gradients
- No `h-screen` (use `min-h-[100dvh]`)
- No Lucide/Feather icons — use Phosphor or Heroicons
- No Lorem Ipsum placeholder text

## Typography Standards

- **Headings:** Geist, Outfit, or Cabinet Grotesk — tight tracking, weight 600–800
- **Body:** Clean geometric sans-serif, max ~65 chars per line
- **Numbers/data:** Tabular figures (`font-variant-numeric: tabular-nums`)
- Apply `text-wrap: balance` to prevent orphaned words

## Color System

- Backgrounds: off-white or warm bone (#F7F6F3, #FBFBFA) — never pure white or pure black
- Foregrounds: off-black (#111, zinc-900) — never #000000
- Accents: single muted accent, desaturated — no neon, no purple-blue AI gradients
- Shadows: tinted to match background hue

## Layout Principles

- Asymmetric bento grids preferred over centered hero + three equal cards
- Variable card heights create visual rhythm
- Max-width containers with generous padding
- Depth through strategic element overlap
- Optical padding adjustments at component edges

## Motion & Performance

- Animations restricted to `transform` and `opacity` only (GPU-safe)
- Spring physics: `stiffness: 100, damping: 20`
- Hover micro-interactions: 200–300ms transitions
- Scroll-triggered reveals with staggered grid animations
- No layout-shifting animations

## Component Requirements

Every interactive component must include:
- Hover state
- Active/pressed state (scale transform)
- Loading skeleton state
- Empty state
- Error state
- Keyboard focus ring (visible)

## Pre-Flight Checklist

Before delivering any UI:
- [ ] Mobile collapse verified (single column below 768px, `min-h-[100dvh]`)
- [ ] No banned patterns (emojis, Inter, Lucide, pure black, Lorem Ipsum)
- [ ] Single accent color only
- [ ] All interactive states implemented
- [ ] Animations GPU-safe (transform + opacity only)
- [ ] Cleanup functions in useEffect hooks
- [ ] Realistic placeholder data (not "John Doe" or "50%")
