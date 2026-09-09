# High-End Soft Visual Design Skill

$150k+ agency-level digital experiences. Premium fonts, whitespace, depth, and smooth animations.

## Core Directives

Avoid common cheap design patterns at all costs:
- No standard thick-stroked icons
- No generic 1px solid gray borders
- No default timing functions (use custom cubic-beziers)
- No oversaturated colors

## Variance Engine — Pick a Vibe

### Option A: Ethereal Glass (Tech-Focused)
- Frosted glass surfaces with backdrop-blur
- Subtle gradient meshes in background
- Light/dark with high contrast accents
- Fonts: Geist, Plus Jakarta Sans

### Option B: Editorial Luxury (Lifestyle-Oriented)
- Warm off-white canvases
- Generous whitespace, editorial rhythm
- Serif headings + geometric body
- Muted earth tones

### Option C: Premium Soft (Default)
- Soft shadows with color-tinted depth
- Smooth rounded components (12–20px radius)
- Pastel-adjacent palette, single accent
- Fonts: Outfit, Cabinet Grotesk

## Layout Patterns

- **Asymmetric bento grid:** Variable-sized cells, different column spans
- **Editorial split:** Large typographic left, visual right
- **Double-bezel architecture:** Nested hardware-like component enclosures

## Motion Standards

- Custom cubic-beziers only (no `ease`, `linear`, `ease-in-out` defaults)
- Example: `cubic-bezier(0.34, 1.56, 0.64, 1)` for spring-like entry
- GPU-safe: `transform` and `opacity` only
- Mobile: aggressive fallback to single-column below 768px

## Pre-Output Checklist (8 points)

1. Typography: distinctive font selected (not Inter/Roboto)
2. Color: single accent, desaturated, no AI purple/blue gradients
3. Layout: asymmetric, not centered-hero + 3-cards
4. Shadows: tinted to background hue, not generic gray
5. Motion: custom cubic-bezier, GPU-safe
6. Mobile: single-column below 768px, `min-h-[100dvh]`
7. Interactive states: hover, active, loading, empty, error
8. Icons: Phosphor or Heroicons — not Lucide/Feather

## When to Use This Skill

Apply for: landing pages, marketing sites, premium SaaS, portfolio showcases, high-end product pages where the design itself is part of the value proposition.
