# CLAUDE.md — Beep Boop Fonts

A hobbyist font foundry site by Ally Mac. Houses custom typefaces built from modular/grid-based systems. The aesthetic is nostalgic early-internet, pixel-y, warm, and playful — but kept clean and minimal in layout. Think: love letters to the 90s web, not a corporate type specimen.

**Environment:** VS Code

---

## Project Overview

**Site name:** Beep Boop (`bb.otf` on Instagram)
**Live URL:** https://ally-gator.github.io/beep-boop/
**Stack:** Plain HTML, CSS, vanilla JS — no frameworks, no build tools
**Hosting:** GitHub Pages

The site is always growing — new fonts, new pages, and new sections will be added over time. Don't assume the current file structure is fixed or complete. When in doubt about where something new belongs, ask.

### Visual Assets
Assets live under `assets/` and are organised by type and context (logos, svgs, font-specific folders, etc.). This structure may evolve — always check what's actually in the repo rather than assuming a specific path exists. If assets are being added or renamed, flag it.

---

## Design Language

### Personality
Nostalgic early-internet energy. Pixel borders, playful SVG logos, modular/grid-inspired type. The site should feel like discovering something small and special in a corner of the internet — not polished in a corporate way, but intentional and full of personality.

### Aesthetic Principles
- **Clean & minimal** layouts — generous whitespace, no clutter
- **Pixel/grid details** used as decoration (borders, icons, logos)
- **Playful but not childish** — there's craft and care behind the fun
- **Easter eggs encouraged** — hidden clickable/tappable/draggable surprises are a deliberate feature, not a bug. The about page explicitly invites users to explore 🔍

---

## HTML & CSS

The site owner is not a professional developer — lead with good practice and explain choices where helpful. Aim for code that is readable and easy to build on, not just technically correct.

- Semantic HTML throughout — use `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>` appropriately
- Keep markup lean — avoid unnecessary wrapper divs
- Images have descriptive `alt` text
- Plain CSS — no preprocessors, no utility frameworks
- CSS custom properties (variables) for colours, spacing, and type scale — define at `:root`
- Mobile-first responsive design
- Animations should feel considered — subtle on load, more expressive on interaction
- Avoid: gradients that feel "AI-generated", purple-on-white, generic sans-serifs like Inter or Roboto

If there's a more robust or accessible way to approach something, suggest it — this is a collaborative project and improvements are welcome.

---

## JavaScript

Scripts are for **interactivity and delight**, not heavy logic. Keep them small, scoped, and well-commented so the intent is always clear. Prefer `DOMContentLoaded` wrappers.

Core uses include:
- Type tester controls (font-size, line-height, font-weight updating live via `input` events)
- Easter eggs and hidden interactions
- Anything that makes the page feel alive and worth poking around in

### Libraries — Use When They Earn It

Vanilla JS is the default, but two libraries are in scope when they're the right tool:

**Rive** — for interactive, stateful animations (great for characters, logos, or UI elements that react to user input). Use when an animation needs to feel alive or respond to events in a way CSS can't easily handle.

**Matter.js** — for physics-based interactions (gravity, collisions, draggable objects with weight). Use when something should feel satisfyingly physical — tumbling letters, bouncing elements, objects that stack or scatter.

When suggesting interactions, feel free to propose where either of these could add something special. Don't reach for them out of habit — but don't avoid them either.

---

## Font Pages

Each font page is its own thing. They should feel **distinct and designed** — not stamped from a template. The typeface itself should inform the layout, interactions, and mood of its page.

Work collaboratively on font pages: start by understanding what makes the font unique, then propose a layout and interaction concept that fits. The type tester (size, leading, weight controls) is a consistent feature, but everything around it is open to interpretation.

Don't use "the quick brown fox" — write specimen text that's fun and suits the font.

---

## Tone & Copy

- Warm, personal, first-person — Ally's voice is present throughout
- Light humour, genuine enthusiasm for type and craft
- References: modular systems, grid logic, chess as a metaphor for constraint-led creativity
- 90s web nostalgia: MSN, early Sims, Yahoo yodel, cheat codes
- Sign-offs like "LOTS OF LOVE, Ally Mac xx" are on-brand

When writing copy for new pages or font descriptions, mirror this tone: conversational, a little nerdy about type, fond of a tangent.

---

## Easter Eggs

A core part of the site's identity. There should always be something to find. Ideas that fit the brief:
- Draggable elements that snap or do something unexpected
- Hidden text that appears on hover or after a sequence of clicks
- SVG elements that animate when poked
- Keyboard shortcuts that do something fun
- Elements that respond to cursor position

Keep them subtle enough to reward curiosity without being annoying.

---

## What to Avoid

- Generic "clean tech" aesthetics — this is a craft project, not a SaaS
- Over-engineering — if plain HTML/CSS does it, use that
- Losing the pixel/handmade quality in pursuit of polish
- Lorem ipsum — use real or font-appropriate specimen text
- Assuming the site structure is fixed — it's always growing
