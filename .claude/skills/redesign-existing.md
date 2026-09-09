# Redesign Skill — Upgrade Existing Projects

Audits existing websites/apps, identifies generic AI patterns, applies high-end design standards while preserving all functionality. Works with any CSS framework or vanilla CSS.

## Core Workflow

1. **Scan** — Identify frameworks, styling methods, component library
2. **Diagnose** — Audit design weaknesses (see categories below)
3. **Fix** — Apply improvements using the existing stack (never migrate frameworks)
4. **Prioritize** — High-impact, low-risk changes first

## Fix Priority Order

1. **Font selection** — Highest visual impact, lowest risk
2. **Color palette refinement** — Remove clashing or AI-generic colors
3. **Interactive states** — Add hover and active feedback everywhere
4. **Layout structure** — Fix grids, spacing, max-width
5. **Component replacement** — Eliminate generic patterns
6. **State design** — Add loading, empty, error experiences
7. **Typography polish** — Final refinement pass

## Audit Categories

### Typography Issues
- Replace browser defaults with Geist, Outfit, or Cabinet Grotesk
- Increase headline prominence (weight 600–800)
- Limit paragraph width to ~65 characters
- Add weight variety (500/600 for subheadings)
- Use tabular figures for numbers
- Apply `text-wrap: balance` to prevent orphaned words

### Color & Surface Problems
- Replace pure blacks with off-blacks (#111, zinc-900)
- Desaturate accent colors (ban AI purple/blue gradients)
- Enforce single accent color throughout
- Use consistent gray family (zinc or slate — not mixed)
- Tint shadows to match background hue
- Add subtle texture to flat/empty backgrounds
- Prevent abrupt dark/light mode shifts mid-page

### Layout Concerns
- Break centered symmetry — introduce asymmetry
- Replace generic three-equal-card columns
- Replace `height: 100vh` with `min-height: 100dvh`
- Add proper max-width containers
- Vary card heights for visual rhythm
- Create depth through strategic overlap
- Adjust optical padding at component edges
- Align interactive elements vertically across columns

### Interactivity Requirements
- Hover states on all clickable elements
- Active/pressed state (scale: 0.97 transform)
- Smooth 200–300ms transitions
- Visible keyboard focus rings
- Skeleton loaders for async content
- Empty state designs
- Error state designs
- Current page indicators in navigation
- `scroll-behavior: smooth`
- GPU-accelerated transforms only (no positional properties)

### Content Standards
- Diverse realistic names (not "John Doe", "Jane Smith")
- Organic data values (e.g., "47.2%" not "50%")
- Contextual brand names matching industry
- Plain language — no "seamless", "unleash", "revolutionize"
- Active voice
- Varied dates (not all the same)
- Unique avatars per user
- Real copy replacing Lorem Ipsum
- Sentence case headers (not TITLE CASE)

## Component Patterns to Replace

| Generic | Upgrade To |
|---------|-----------|
| Card with border + shadow | Clean card with single subtle border |
| Multiple button styles (5+) | 2 max: primary + ghost |
| Pill badges everywhere | Inline text labels or dot indicators |
| Accordion FAQ | Progressive disclosure / inline expand |
| Carousel testimonials | Masonry wall or stacked cards |
| Equal pricing tiers | Highlighted recommended tier |
| Modal for simple edits | Inline editing |
| Circle avatars | Rounded square avatars |
| Footer with 40+ links | Streamlined 3-column max |
| Lucide/Feather icons | Phosphor or Heroicons |

## Critical Rules

- Preserve the existing tech stack — never migrate frameworks
- Maintain all functionality through testing
- Verify dependencies exist before importing libraries
- Check Tailwind version before modifying config
- Keep changes focused and reviewable — not a comprehensive rewrite
