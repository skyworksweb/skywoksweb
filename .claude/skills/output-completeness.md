# Full-Output Enforcement Policy

Every output must be production-complete. A partial output is a broken output.

## Core Principle

Treat every task as production-critical. Deliver complete, working code — never truncated, never stubbed, never placeholder-filled.

## Prohibited Shortcuts

**In code:**
- `// ...rest of component`
- `// TODO: implement`
- `/* ... */` as a shortcut
- Bare ellipsis `...` inside code blocks
- Skeleton implementations when full code was requested

**In prose:**
- "for brevity"
- "the rest follows the same pattern"
- "similar to above"
- "and so on"
- "etc." when specific items were requested

## Process

1. Define scope — count all deliverables before starting
2. Generate each item completely
3. Verify nothing was omitted before responding

## Token Limit Handling

When approaching capacity limits:
- Stop at natural breakpoints (end of a component, end of a function)
- Mark the pause: `[PAUSED — 2 of 5 components complete]`
- On resume: continue without recapping previous sections

## Verification Checklist

Before finalizing any response:
- [ ] No banned truncation patterns appear anywhere
- [ ] All requested items are included and complete
- [ ] All code blocks contain executable content (not descriptions of code)
- [ ] Nothing was shortened for space savings
- [ ] Every function/component has a complete implementation
