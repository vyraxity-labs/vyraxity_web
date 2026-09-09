# Vyraxity.com — Implementation Guide

A phased, step-by-step build plan for vyraxity.com, written to be handed to an AI coding agent (Google Antigravity) one step at a time. Every step is scoped to be small enough to implement, review, test, commit, push, and merge on its own before moving to the next.

---

## 0. How to use this guide

- Give Antigravity **one step at a time**, in order. Do not batch multiple steps into one prompt.
- Each step lists exactly which files are created and which are edited — hold Antigravity to that scope. If it touches other files, that's a signal to review carefully before merging.
- Each step has a **Test/Acceptance** checklist — use it as your manual QA pass before committing.
- **Git workflow:** The user will manually manage git branching, checking out respective branches, and handling commits/pushes/merges before and after each step. Antigravity will focus strictly on the code changes and verification within each step.
- Content blocks marked **Content** are copied verbatim from the Vyraxity Brand & Website Foundation doc — do not let Antigravity invent or paraphrase copy. Where a step says "add to `messages/en.json`," give Antigravity that exact JSON to insert.

---

## 1. Stack summary

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, TypeScript, Turbopack |
| Styling | Tailwind CSS v4 (CSS-first config via `@theme`, no `tailwind.config.js` needed) |
| Fonts | Geist Sans + Geist Mono loaded natively via `next/font/google` (no separate npm package needed) |
| Motion | `motion` (the current package name for what was Framer Motion) |
| Generative visuals | Native HTML5 Canvas (no 3D library needed for the particle/network hero — kept lightweight) |
| i18n | `next-intl`, locale-prefixed routing (`/en`, `/fr`, …) |
| Forms | `react-hook-form` + `zod` |
| Email delivery | `resend` |
| Package manager | pnpm |
| Hosting | Vercel |
| Domain | vyraxity.com (currently on Namecheap, will be pointed to Vercel in Phase 14) |

This mirrors a standard modern Next.js setup; adjust any individual package below if your Airacter codebase already standardized on a different equivalent (e.g. a different form library) — the phase/step structure doesn't depend on the exact package names.

---

## 2. Project conventions (apply throughout)

- **Server Components by default.** Add `'use client'` only where interactivity, browser APIs, motion hooks, or state are required (nav scroll behavior, mobile menu, generative canvas, contact form, language switcher).
- **One component per file, PascalCase filenames** (`Hero.tsx`, `EyebrowLabel.tsx`).
- **All page copy lives in `messages/en.json`** (and later other locale files), accessed via `next-intl`'s `useTranslations` / `getTranslations` — never hardcode English strings directly in components once i18n is wired in Phase 0.
- **Design tokens live in `styles/globals.css`** as CSS custom properties, consumed by Tailwind v4's `@theme inline` block — components use Tailwind utility classes bound to those tokens, not raw hex values.
- **Route structure:** `app/[locale]/...` for all public pages, `app/api/...` for route handlers (contact form). `middleware.ts` at the project root handles locale detection/routing.

---

## PHASE 0 — Project Setup & Foundations

### Step 0.1 — Initialize the Next.js project

**Goal:** Scaffold a clean Next.js 16 + TypeScript + Tailwind v4 project directly into the repository root (`vyraxity_web/`).

**New files:** entire default `create-next-app` output (`app/`, `public/`, `package.json`, `tsconfig.json`, `next.config.ts`, `.eslintrc`/`eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`).

**Edited files:** none (fresh scaffold).

**Command:**
```
pnpm create next-app@latest . --typescript --tailwind --eslint --app --turbopack --src-dir=false --import-alias "@/*"
```
*(Note: Run directly inside the `vyraxity_web` repository root so no nested folder is created).*

**New packages:** `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `eslint` (all installed by the scaffold command — no manual install needed).

**New env vars:** none yet.

**Test/Acceptance:**
- [ ] `pnpm dev` runs and the default Next.js starter page loads at `localhost:3000`.
- [ ] `pnpm build` completes with no errors.
- [ ] Initial commit made, repo pushed to GitHub, `main` branch protected/set as default.

---

### Step 0.2 — Clean the starter and set up base folder structure

**Goal:** Remove starter boilerplate and lay down the folder skeleton the rest of the guide will build into.

**New files:**
- `components/.gitkeep`
- `components/layout/.gitkeep`
- `components/ui/.gitkeep`
- `components/sections/.gitkeep`
- `components/visuals/.gitkeep`
- `lib/.gitkeep`
- `messages/en.json` (empty object `{}` for now)

**Edited files:**
- `app/page.tsx` — replace default starter content with a plain placeholder (`<main>Vyraxity</main>`).
- `app/globals.css` — strip default starter styles down to Tailwind's base import only.

**New packages:** none.

**New env vars:** none.

**Test/Acceptance:**
- [ ] `pnpm dev` shows a blank page with just "Vyraxity" text, no starter branding remains.
- [ ] Folder structure matches the skeleton above.

---

### Step 0.3 — Configure Geist fonts via `next/font/google`

**Goal:** Load Geist Sans (display/body) and Geist Mono (technical/labels) per the Visual Direction doc's typography system using Next.js's built-in font loader (no separate npm package required).

**New files:** none.

**Edited files:**
- `app/layout.tsx` — import `Geist` and `Geist_Mono` from `next/font/google`, apply their CSS variable classes to `<html>` or `<body>`.

**New packages:** none (built into Next.js).

**New env vars:** none.

**Implementation details:**
```ts
import { Geist, Geist_Mono } from 'next/font/google';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
// apply `${geistSans.variable} ${geistMono.variable}` to <html> className
```

**Test/Acceptance:**
- [ ] Inspecting the page in devtools shows `--font-geist-sans` and `--font-geist-mono` CSS variables on `<html>`.
- [ ] Placeholder text visibly renders in Geist Sans.

---

### Step 0.4 — Define design tokens in `globals.css`

**Goal:** Encode the exact color, radius, and border tokens from the Visual Direction doc's design system table as CSS variables, wired into Tailwind v4 via `@theme`.

**New files:** none.

**Edited files:**
- `app/globals.css`

**New packages:** none.

**New env vars:** none.

**Implementation details — exact tokens from the brand docs:**
```css
:root {
  /* Vyraxity core palette */
  --vx-black: #080808;   /* Void — primary dark background */
  --vx-ink: #111111;     /* Surface on dark */
  --vx-white: #F4F3EE;   /* Paper — primary text on dark / light bg */
  --vx-paper: #EAE9E2;   /* Warm off-white light-mode background */
  --vx-muted: #A4A39D;   /* Secondary text on dark */
  --vx-line: #292929;    /* Hairline borders on dark */
  --vx-amber: #F2A93B;   /* The single brand accent */

  /* Light-mode ink (used inside light sections) */
  --vx-ink-text: #111111;
  --vx-ink-secondary: #6E6E68;
  --vx-ink-accent: #C77D25;

  /* Radius scale — restrained, no pills */
  --vx-radius-sm: 2px;
  --vx-radius-md: 4px;
  --vx-radius-lg: 8px;

  /* Border */
  --vx-border-width: 1px;
}

@theme inline {
  --color-vx-black: var(--vx-black);
  --color-vx-ink: var(--vx-ink);
  --color-vx-white: var(--vx-white);
  --color-vx-paper: var(--vx-paper);
  --color-vx-muted: var(--vx-muted);
  --color-vx-line: var(--vx-line);
  --color-vx-amber: var(--vx-amber);
  --color-vx-ink-text: var(--vx-ink-text);
  --color-vx-ink-secondary: var(--vx-ink-secondary);
  --color-vx-ink-accent: var(--vx-ink-accent);
  --radius-vx-sm: var(--vx-radius-sm);
  --radius-vx-md: var(--vx-radius-md);
  --radius-vx-lg: var(--vx-radius-lg);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```
This makes classes like `bg-vx-black`, `text-vx-white`, `text-vx-amber`, `rounded-vx-md` available across the app.

**Guardrail to give Antigravity explicitly:** no drop shadows anywhere in the system (`shadow-*` utilities are not to be used except a very light `backdrop-blur` on the sticky nav, added in Phase 2). Depth comes from contrast, spacing and layering only.

**Test/Acceptance:**
- [ ] A test div with `bg-vx-black text-vx-amber` renders the correct exact colors (verify with devtools color picker against `#080808` / `#F2A93B`).

---

### Step 0.5 — Typography scale and base global styles

**Goal:** Set up the responsive display-headline scale and body-copy defaults described in the Visual Direction doc.

**New files:** none.

**Edited files:**
- `app/globals.css`

**New packages:** none. **New env vars:** none.

**Implementation details:**
- Hero/display headline size: `clamp(4rem, 8vw, 9rem)`, `line-height: 0.95`–`1.0`, heavy weight (700–800).
- Section headlines (non-hero): a secondary clamp scale, roughly `clamp(2rem, 4vw, 3.5rem)`, same tight line-height.
- Body copy: `18–20px` font size, `1.5–1.6` line-height, uses `--vx-muted` on dark backgrounds and `--vx-ink-secondary` on light backgrounds — never full-contrast white/black for paragraph-length text.
- Eyebrow labels: small (12–13px), uppercase, wide letter-spacing (`0.12em`–`0.16em`), set in `font-mono`.
- Add utility classes (or Tailwind `@utility` definitions) for `.vx-h1`, `.vx-h2`, `.vx-body`, `.vx-eyebrow` so section components stay consistent without repeating raw Tailwind clamp values everywhere.

**Test/Acceptance:**
- [ ] Resizing the browser from mobile to desktop widths shows the hero headline scaling fluidly between the clamp bounds.
- [ ] Body text is visibly muted, not full white/black, on a dark test background.

---

### Step 0.6 — Motion tokens and reduced-motion handling

**Goal:** Centralize the four motion categories from the Visual Direction doc so every animated component pulls from the same vocabulary instead of ad-hoc values.

**New files:**
- `lib/motion.ts`

**Edited files:** none.

**New packages:**
- `motion` — the animation library used for all standard/narrative/micro motion in the app (hover states, section reveals, mobile menu transitions, hero headline entrance). Ambient/generative motion (Step 3.2) is handled with native Canvas, not this library, since it's a continuous particle simulation rather than a discrete transition.

**New env vars:** none.

**Implementation details — exact durations from the brand docs:**
```ts
// lib/motion.ts
export const motionDurations = {
  micro: 0.18,      // 150–200ms — button hover, link states
  linkHover: 0.15,  // 120–180ms
  standard: 0.5,    // 400–600ms — cards/content entering viewport
  narrative: 1.0,   // 800–1200ms — hero / major visual transitions
  ambientMin: 8,     // seconds — generative background, slow end
  ambientMax: 30,    // seconds — generative background, slow end
} as const;

export const easeStandard = [0.16, 1, 0.3, 1] as const; // confident, non-bouncy ease-out

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: motionDurations.standard, ease: easeStandard } },
};
```
- Add a `prefers-reduced-motion` check (either a `useReducedMotion` hook from `motion/react` or a manual `matchMedia` hook in `lib/`) that every animated component must respect — reduce ambient/narrative motion to instant or near-static states when the user has requested reduced motion.
- **Explicitly avoid the "everything fades up" problem** called out in the Visual Direction doc: not every entering element should use the same generic fade. Vary it deliberately per element type as later steps specify (typography can slide horizontally, numbers count upward, diagrams draw themselves, cards remain mostly static rather than animating in).

**Test/Acceptance:**
- [ ] `lib/motion.ts` exports the tokens above and is importable with no errors.
- [ ] Enabling "reduce motion" at the OS level (or via devtools emulation) is confirmed to be checkable in the app (a temporary test component can log the value).

---

### Step 0.7 — i18n scaffolding with next-intl

**Goal:** Stand up locale-aware routing before any real content is written, so every subsequent content step writes directly into translation files instead of hardcoded strings.

**New files:**
- `i18n/routing.ts` — defines supported locales and default locale.
- `i18n/request.ts` — next-intl request config, loads the right `messages/{locale}.json`.
- `middleware.ts` (project root) — locale detection/redirect middleware from next-intl.
- `messages/en.json` — already created in 0.2, now structured with top-level empty namespaces: `{ "nav": {}, "footer": {}, "home": {}, "products": {}, "airacter": {}, "labsPage": {}, "vision": {}, "about": {}, "careers": {}, "contact": {}, "meta": {} }`

**Edited files:**
- `app/layout.tsx` → move to `app/[locale]/layout.tsx` (all pages built in later phases live under `app/[locale]/`), wrap with `NextIntlClientProvider`.
- `app/page.tsx` → move to `app/[locale]/page.tsx`.
- `next.config.ts` — wrap config with `createNextIntlPlugin()`.

**New packages:**
- `next-intl` — locale routing, message loading, `useTranslations`/`getTranslations` hooks for Server and Client Components. Chosen over `react-i18next` because it's purpose-built for the App Router (server-side translation resolution, typed messages, locale-prefixed routing out of the box).

**New env vars:** none.

**Implementation details:**
- Locales for launch: `en` only, with the structure ready to add `fr` in Phase 12 (French, given relevance to Francophone West Africa) and optionally `pt`/`es` later. Set `defaultLocale: 'en'`.
- Use `localePrefix: 'as-needed'` (so `en` doesn't force `/en` in the URL at launch, but the structure supports prefixed locales once a second language ships) — confirm this matches your SEO preference; the alternative (`always`) is also valid if you'd rather every locale be explicit from day one.

**Test/Acceptance:**
- [ ] `pnpm dev` still renders the placeholder homepage with no routing errors.
- [ ] Manually visiting `/fr` (even with no French messages yet) doesn't crash the app — falls back gracefully.

---

### Step 0.8 — Environment variable scaffolding

**Goal:** Establish the `.env.local` pattern and a typed/validated env access point before any feature needs one.

**New files:**
- `.env.local.example`
- `lib/env.ts` — small runtime validation (e.g. with `zod`) that throws a clear error if a required var is missing, rather than failing silently deep in a route handler.

**Edited files:**
- `.gitignore` — confirm `.env*.local` is ignored (default in Next.js scaffold, verify it's present).

**New packages:** none yet (zod is introduced formally in Step 10.2, but if you want `lib/env.ts` validated from this step, pull `zod` in now instead — either point works).

**New env vars introduced in this step (declared, not yet used):**

| Variable | Purpose | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, used for metadata, OpenGraph tags, and sitemap generation | Set manually — `http://localhost:3000` in development, `https://vyraxity.com` in production (Vercel env settings) |

**Test/Acceptance:**
- [ ] `.env.local.example` committed with a placeholder value and a comment explaining each var.
- [ ] Running the app without `.env.local` present still works in dev (falls back to a sane default for `NEXT_PUBLIC_SITE_URL`), but `lib/env.ts` is ready to enforce required vars once real integrations (Phase 10) depend on them.

---

## PHASE 1 — Design System Components

### Step 1.1 — `Container` and `Section` layout primitives

**Goal:** Build the two components every page section will be composed from: a max-width content wrapper and a full-bleed section with dark/light theme variants.

**New files:**
- `components/ui/Container.tsx`
- `components/ui/Section.tsx`

**Edited files:** none.

**New packages:** none. **New env vars:** none.

**Implementation details:**
- `Container`: max-width (e.g. `max-w-7xl`), horizontal padding that scales with viewport (`px-6 md:px-10 lg:px-16`), centered.
- `Section`: accepts a `theme` prop (`'dark' | 'light'`), applies `bg-vx-black text-vx-white` or `bg-vx-paper text-vx-ink-text` accordingly, plus consistent vertical padding (generous — e.g. `py-24 md:py-32`) to create the "editorial pacing" the Visual Direction doc calls for. This is the component that implements the dark→light→dark rhythm across the homepage and other pages.

**Test/Acceptance:**
- [ ] A test page stacking one dark `Section` and one light `Section` shows a clean, correctly-colored transition with no shadow/border artifacts between them.

---

### Step 1.2 — `EyebrowLabel` component

**Goal:** The small uppercase mono label that opens every major section (`VYRAXITY`, `WHY WE EXIST`, `OUR FIRST PRODUCT`, etc.).

**New files:**
- `components/ui/EyebrowLabel.tsx`

**Edited files:** none.

**New packages/env vars:** none.

**Implementation details:** renders `children` in `font-mono`, uppercase, wide letter-spacing, small size, using `text-vx-amber` for the accent variant (used sparingly — most eyebrows should use muted color, only specific ones per later steps get amber) and `text-vx-muted`/`text-vx-ink-secondary` otherwise.

**Test/Acceptance:**
- [ ] Renders `<EyebrowLabel>VYRAXITY</EyebrowLabel>` correctly styled on both dark and light test backgrounds.

---

### Step 1.3 — `Button` component (Primary/Secondary)

**Goal:** The two button variants used across the whole site, per the exact spec in the Visual Direction doc's design system.

**New files:**
- `components/ui/Button.tsx`

**Edited files:** none.

**New packages:**
- `clsx` (or `tailwind-merge` + `clsx` combined into a `cn()` helper in `lib/utils.ts`) — for conditionally composing className strings across variants without messy template literals.

**New env vars:** none.

**Implementation details — exact spec:**
- Primary: `background: var(--vx-amber)`, `color: #080808` (black text on amber), height `48–52px`, small radius (`--vx-radius-md`, not a pill), medium letter-spacing.
- Secondary: transparent background, `border: 1px solid #333` (map to `--vx-line` or a dedicated `--vx-border-secondary: #333`), text color `--vx-white`.
- Hover: subtle opacity/brightness shift using `motionDurations.micro` (150–200ms) — explicitly **not** a hard color swap.
- Link-style CTA variant: text + trailing arrow (`→`), used for in-copy CTAs like "Explore Airacter →" — the arrow should shift slightly on hover as the interaction cue, not the text color.

**Test/Acceptance:**
- [ ] Primary and Secondary buttons render pixel-correct against the spec (measure height in devtools).
- [ ] Hover states are smooth, not abrupt; verified visually.
- [ ] Reduced-motion users still see a (instant) hover state, just without the animated transition.

---

### Step 1.4 — Base `useReducedMotion` + `useInViewOnce` hooks

**Goal:** Shared hooks so every section-reveal animation in later phases is written consistently.

**New files:**
- `lib/hooks/useReducedMotion.ts` (or use `motion/react`'s built-in `useReducedMotion` directly and skip this file — note the choice to Antigravity)
- `lib/hooks/useInViewOnce.ts` — thin wrapper around `motion/react`'s `useInView` configured to trigger once per element (`{ once: true, margin: "-10% 0px" }`), used for the "Standard" motion category (cards/content entering viewport).

**Edited files:** none. **New packages:** none (uses `motion` from Step 0.6). **New env vars:** none.

**Test/Acceptance:**
- [ ] A test block using `useInViewOnce` animates in once when scrolled into view and does not re-trigger when scrolling back up and down again.

---

## PHASE 2 — Global Navigation & Footer

### Step 2.1 — Static navigation bar (desktop)

**Goal:** Build the nav structure and content, no scroll behavior yet.

**New files:**
- `components/layout/Nav.tsx`

**Edited files:**
- `app/[locale]/layout.tsx` — render `<Nav />` above `{children}`.

**New packages:** none. **New env vars:** none.

**Content — Primary navigation (from Brand & Website Foundation, Section 7):**
```json
{
  "nav": {
    "logo": "VYRAXITY",
    "links": {
      "products": "Products",
      "labs": "Labs",
      "vision": "Vision",
      "about": "About",
      "careers": "Careers"
    },
    "contact": "Contact"
  }
}
```
Add this into `messages/en.json` under the `nav` key.

**Implementation details:**
- Logo/wordmark "VYRAXITY" links to `/`.
- Links: Products, Labs, Vision, About, Careers, plus **Contact** set visually apart — bracketed style `[ Contact ]`, per the Visual Direction doc's nav sketch.
- Minimal height. No mega-menu, no dropdown — this is intentionally "almost invisible" per the brand doc.

**Test/Acceptance:**
- [ ] Nav renders on every page with correct links (targets can 404 until later phases build those routes — that's expected at this step).
- [ ] Logo links to `/`.

---

### Step 2.2 — Scroll-aware floating nav

**Goal:** On scroll, the nav bar transitions from full-width/static to a slim, translucent floating pill with backdrop blur, per the Visual Direction doc.

**New files:** none.

**Edited files:**
- `components/layout/Nav.tsx` — add `'use client'`, scroll-position state (via a small scroll hook or `motion`'s `useScroll`), conditional styling.

**New packages:** none (uses `motion`). **New env vars:** none.

**Implementation details:**
- Below a scroll threshold (e.g. `40px`): full-width bar, solid `bg-vx-black`.
- Above the threshold: nav shrinks, becomes a floating rounded bar (uses `--vx-radius-lg`, the only place larger radius is appropriate), `backdrop-blur` at a **subtle** level (Tailwind's `backdrop-blur-sm` or `md`, not a heavy frosted-glass effect), semi-transparent background (e.g. `bg-vx-black/70`).
- Transition duration: `motionDurations.standard` (400–600ms), eased with `easeStandard` — this is infrastructure, not a showy animation.

**Test/Acceptance:**
- [ ] Scrolling down smoothly transitions the nav into the floating state; scrolling back to top reverses it.
- [ ] No layout shift/jank during the transition.
- [ ] Effect is disabled/instant under reduced motion.

---

### Step 2.3 — Mobile navigation (full-screen menu)

**Goal:** Editorial-style mobile menu, not a cramped hamburger drawer — per the Visual Direction doc's explicit mobile guidance.

**New files:**
- `components/layout/MobileNav.tsx`

**Edited files:**
- `components/layout/Nav.tsx` — render a "MENU" trigger below a breakpoint (e.g. `md:hidden`), render `<MobileNav />`.

**New packages:** none. **New env vars:** none.

**Implementation details:**
- Trigger: wordmark left, "MENU" text-button right (not a hamburger icon — consistent with the site's typography-first identity).
- Open state: full-screen overlay, `bg-vx-black`, large stacked links (reuse the `.vx-h2`-scale type), generous spacing between items, Contact visually distinct at the bottom.
- Entrance/exit motion: narrative category (800–1200ms) fade/slide, respecting reduced motion (instant show/hide if reduced).

**Test/Acceptance:**
- [ ] On a mobile viewport (or devtools responsive mode), tapping "MENU" opens a full-screen link list; tapping a link or a close control closes it.
- [ ] No horizontal scroll or layout bugs at common breakpoints (375px, 390px, 414px).

---

### Step 2.4 — Footer

**Goal:** Build the global footer per Section 16 of the brand doc.

**New files:**
- `components/layout/Footer.tsx`

**Edited files:**
- `app/[locale]/layout.tsx` — render `<Footer />` after `{children}`.

**New packages/env vars:** none.

**Content (from Brand & Website Foundation, Section 16):**
```json
{
  "footer": {
    "wordmark": "VYRAXITY",
    "tagline": "Technology, built from Africa.\nBuilt for the world.",
    "linksHeading": "",
    "links": {
      "products": "Products",
      "labs": "Labs",
      "vision": "Vision",
      "about": "About",
      "careers": "Careers",
      "contact": "Contact"
    },
    "social": {
      "github": "GitHub",
      "linkedin": "LinkedIn",
      "x": "X",
      "instagram": "Instagram"
    },
    "copyright": "© 2026 Vyraxity. All rights reserved.",
    "signature": "Built in Nigeria."
  }
}
```

**Implementation details:**
- Dark background (`bg-vx-black`).
- Structure top to bottom: wordmark + tagline → link columns → social row (plain text/wordmarks, not icon-in-circle buttons, per the Visual Direction doc's anti-icon-cliché stance) → copyright line → the quiet "Built in Nigeria." signature line, small and understated, no flag icon.

**Test/Acceptance:**
- [ ] Footer renders on every page with all links, correct copy, and the signature line.
- [ ] Social links can point to placeholder URLs for now (`#` or real handles if you have them) — flag to Antigravity that real URLs should be swapped in before launch.

---

### Step 2.5 — Section-aware active nav indicator (homepage only)

**Goal:** As the user scrolls the homepage, subtly indicate which nav section is "active" — a 1–2px indicator and slight text-weight change, nothing flashy, per the Visual Direction doc.

**New files:**
- `lib/hooks/useActiveSection.ts` — Intersection Observer–based hook that tracks which `id`'d section is currently most in view.

**Edited files:**
- `components/layout/Nav.tsx` — accept/consume active-section state (only meaningfully used once homepage sections exist — this step can be built and tested against placeholder sections, then re-verified once Phase 3 sections are real).

**New packages/env vars:** none.

**Test/Acceptance:**
- [ ] With 2–3 placeholder `<section id="...">` blocks on the homepage, scrolling updates a visible (but subtle) indicator under the matching nav link.
- [ ] No indicator "flicker" between adjacent sections at their boundaries.

---

## PHASE 3 — Homepage Sections

The homepage narrative moves **Ambition → Belief → Company → Product → Future → Invitation** across 9 sections, alternating dark/light per the established rhythm: Hero (dark) → Belief (light) → What is Vyraxity (dark) → Current Product (dark) → Labs (dark) → Origin (dark) → Principles (light) → Bigger Ambition (dark) → Closing CTA (dark).

Each section below is its own component and its own step — build, review, and merge one before starting the next.

### Step 3.1 — Hero section: layout and copy (no generative visual yet)

**Goal:** Get the hero's text content, layout, and CTAs in place with a static placeholder where the generative visual will go.

**New files:**
- `components/sections/home/Hero.tsx`

**Edited files:**
- `app/[locale]/page.tsx` — render `<Hero />` as the first section.

**New packages/env vars:** none.

**Content (from Brand & Website Foundation, Section 8, Section 1):**
```json
{
  "home": {
    "hero": {
      "eyebrow": "VYRAXITY",
      "headline": "Technology, built from Africa. Built for the world.",
      "supportingCopy": "Vyraxity is a technology company building ambitious products and exploring the technologies that will shape tomorrow — starting in Nigeria, growing across Africa, and reaching the world.",
      "primaryCta": "Explore our products",
      "secondaryCta": "Our vision",
      "supportingStatement": "Africa doesn't just have to adopt the future. We can build it.",
      "scrollHint": "SCROLL"
    }
  }
}
```

**Implementation details:**
- Layout: two-column on desktop (left: eyebrow/headline/copy/CTAs; right: visual placeholder — a plain bordered box for now, replaced in Step 3.2). Stacks to single column on mobile, with the visual placeholder appearing below the text (per the Visual Direction doc's mobile hero sketch).
- Headline uses `.vx-h1` (the `clamp(4rem, 8vw, 9rem)` scale), very tight line-height.
- Primary CTA → `Button` variant="primary", links toward `/products` (route doesn't exist yet — fine at this step). Secondary CTA → `Button` variant="secondary", links toward `/vision`.
- `↓ SCROLL` indicator: small, centered at the bottom of the viewport, `font-mono`, subtle.

**Test/Acceptance:**
- [ ] Hero renders full-viewport-height (or close to it) on both desktop and mobile with correct copy pulled from `messages/en.json`.
- [ ] Both CTA buttons render with correct variants.

---

### Step 3.2 — Hero generative network visual

**Goal:** Replace the placeholder box with the ambient generative visual — a minimal node-and-line network with one bright origin point radiating outward, per the Visual Direction doc's "hero concept 2" (chosen over the pure particle-field concept for the initial build, since it most directly expresses "Built from Africa. Built for the world.").

**New files:**
- `components/visuals/GenerativeNetwork.tsx`

**Edited files:**
- `components/sections/home/Hero.tsx` — swap the placeholder box for `<GenerativeNetwork />`.

**New packages:** none — implemented with native Canvas 2D API to keep this lightweight (no `three.js`/WebGL needed for a 2D point-and-line system).

**New env vars:** none.

**Implementation details:**
- `'use client'` component, renders a `<canvas>` sized to its container, using `requestAnimationFrame`.
- Visual language: a small number of nodes (points), one designated as the "origin" (rendered slightly larger, in `--vx-amber`), thin lines (`--vx-line`-ish, low opacity) connecting nearby nodes. Nodes drift very slowly. This is **ambient motion** — per `lib/motion.ts`, cycle length should sit in the 8–30 second range, "almost subconscious," not a fast/flashy animation.
- Must **not** look like a literal geographic map — abstract point-and-line only, no continent outline.
- Respect `prefers-reduced-motion`: render a static frame (nodes/lines in a fixed arrangement) instead of animating when reduced motion is requested.
- Keep this performant: cap node count (e.g. 40–80 depending on viewport size), use `opacity`/position transforms only (GPU-friendly), pause the animation loop when the tab is not visible (`document.visibilitychange`) and when the canvas is scrolled out of view (pair with `useInViewOnce`-style visibility check, but continuous rather than once).

**Test/Acceptance:**
- [ ] Canvas renders and animates smoothly (check devtools performance — should not spike CPU/GPU significantly).
- [ ] Reduced-motion mode shows a static, still-attractive frame instead of animating.
- [ ] Animation pauses when switching browser tabs and resumes on return.
- [ ] Looks intentional and abstract, not like a map or a generic particle background template.

---

### Step 3.3 — Hero narrative entrance motion

**Goal:** Add the "Narrative" motion category (800–1200ms) to the hero's headline/copy entrance — the one deliberately cinematic beat on the page, per the Visual Direction doc's "one major wow interaction" guidance (this step implements a restrained version of that idea at the hero level; the full multi-stage scroll sequence described in the doc is optional future scope, noted at the end of this phase).

**New files:** none.

**Edited files:**
- `components/sections/home/Hero.tsx` — wrap headline/copy/CTAs in `motion` components with a staggered entrance using `motionDurations.narrative` and `easeStandard`.

**New packages/env vars:** none.

**Implementation details:**
- Headline enters first (e.g. subtle upward slide + fade), copy and CTAs follow with a short stagger (~100–150ms offset each) — avoid the generic "everything fades up identically" pattern; consider having the headline's entrance differ subtly from the CTA row's entrance (e.g. headline slides, CTAs simply fade) to vary the motion vocabulary as instructed in the brand docs.
- Runs once on initial page load, not on every re-render.

**Test/Acceptance:**
- [ ] On a fresh page load, headline/copy/CTAs animate in with a visible but non-bouncy, confident entrance.
- [ ] Reduced motion shows content immediately with no animation.

---

### Step 3.4 — Section 2: "The belief" (light section)

**Goal:** First light-mode "breath" of the homepage.

**New files:**
- `components/sections/home/Belief.tsx`

**Edited files:**
- `app/[locale]/page.tsx` — add `<Belief />` after `<Hero />`.

**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 8, Section 2):**
```json
{
  "home": {
    "belief": {
      "eyebrow": "WHY WE EXIST",
      "headline": "Africa should build more of the technology it depends on.",
      "copy": [
        "For decades, some of the world's most influential technologies have been conceived and built outside Africa.",
        "We believe Africa can become more than a market for those technologies.",
        "We can create them.",
        "We can build companies around them.",
        "We can own the intellectual property behind them.",
        "And we can build products that people everywhere choose to use.",
        "That is the opportunity Vyraxity exists to pursue."
      ]
    }
  }
}
```

**Implementation details:**
- `<Section theme="light">`. No imagery — large type and whitespace carry the section, per the brand doc.
- Copy lines render as short, separated paragraphs (not one dense block) to preserve the declarative rhythm of the source text.
- Entrance motion: `useInViewOnce` + `fadeUp` (Standard category), but consider giving the short one-line statements ("We can create them.", "We can build companies around them.") a slight stagger so they read almost like a countdown/build-up, differentiating this section's motion from a generic block fade.

**Test/Acceptance:**
- [ ] Section renders in light theme with correct ink text colors (not the dark-mode palette).
- [ ] Content animates in once when scrolled into view.

---

### Step 3.5 — Section 3: "What is Vyraxity?"

**New files:** `components/sections/home/WhatIsVyraxity.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 3):**
```json
{
  "home": {
    "whatIsVyraxity": {
      "eyebrow": "VYRAXITY",
      "headline": "One company. Many possibilities.",
      "copy": [
        "Vyraxity is not built around a single product.",
        "We are building a technology company capable of creating products across different markets and exploring different areas of technology.",
        "Today, that means software.",
        "Tomorrow, it may include entirely new categories of technology.",
        "The common thread is simple:",
        "Build meaningful technology. Build it exceptionally well. Build it from Africa."
      ]
    }
  }
}
```

**Implementation details:** `<Section theme="dark">`. Text-only, or paired with one restrained abstract diagram (a single node branching into two or three, reusing the visual language of `GenerativeNetwork` at a much smaller/simpler scale) — no icon grid. The closing line ("Build meaningful technology...") should be visually set apart (e.g. larger size or amber-accented) as the section's takeaway.

**Test/Acceptance:**
- [ ] Section renders correctly with dark theme and the closing statement visually distinguished from the rest of the copy.

---

### Step 3.6 — Section 4: Current product (Airacter)

**Goal:** The most commercially important section on the homepage — give it the most visual weight.

**New files:** `components/sections/home/CurrentProduct.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 4):**
```json
{
  "home": {
    "currentProduct": {
      "eyebrow": "OUR FIRST PRODUCT",
      "headline": "Airacter",
      "subheadline": "AI conversations, shaped by personality.",
      "copy": "Airacter is the first product being developed under Vyraxity. It explores a different way of interacting with AI — one where conversations can feel more personal, expressive and character-driven. Launching November 2026.",
      "cta": "Discover Airacter →"
    }
  }
}
```

**Implementation details:**
- `<Section theme="dark">`, but visually distinct: larger imagery area than any other homepage section.
- CTA links to `/products/airacter` (route built in Phase 5).
- Visual: a large, dominant placeholder frame implying a real Airacter product screenshot (use a bordered rectangle with a subtle label like "Product preview" for now — swap for the real screenshot asset once available). Add a **subtle hint of Airacter's own violet-to-coral gradient glow** behind/around this one frame only (introduce two CSS variables scoped to this component, e.g. `--ar-primary: #8B5CF6; --ar-secondary: #FF7A59;`, used only for a soft radial-gradient glow — do not apply these as text/button colors here, that's reserved for the dedicated Airacter page in Phase 5). This is the one place on the homepage where the amber-only rule bends slightly, intentionally, to foreshadow Airacter's distinct identity.

**Test/Acceptance:**
- [ ] Section is visually the largest/heaviest section on the page so far.
- [ ] The violet/coral glow is subtle — it should read as a hint, not compete with the amber system.

---

### Step 3.7 — Section 5: The Labs

**New files:** `components/sections/home/Labs.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 5):**
```json
{
  "home": {
    "labs": {
      "eyebrow": "VYRAXITY LABS",
      "headline": "Where ideas become technology.",
      "copy": "Not every idea starts as a product. Some begin as questions. Some become experiments. Some become research. And some eventually become companies or products. Vyraxity Labs is where we explore emerging technologies, develop prototypes, experiment with new ideas and investigate what could come next.",
      "areas": [
        "Artificial Intelligence",
        "Data & Computing",
        "Developer Technology",
        "Infrastructure",
        "Robotics & Hardware",
        "Emerging Technologies"
      ],
      "cta": "Explore Vyraxity Labs →"
    }
  }
}
```

**Implementation details:** `<Section theme="dark">`. Render `areas` as a simple mono-styled list (vertical or wrapped inline list with separators), explicitly **not** an icon-card grid. CTA links to `/labs` (Phase 6).

**Test/Acceptance:**
- [ ] All six exploration areas render in the mono list style, no icons/cards.

---

### Step 3.8 — Section 6: Origin and ambition

**New files:** `components/sections/home/Origin.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 6):**
```json
{
  "home": {
    "origin": {
      "eyebrow": "OUR STARTING POINT",
      "headline": "Nigeria is where we begin. Not where we stop.",
      "copy": "Vyraxity is being built in Nigeria because this is where our story begins. Nigeria gives us a unique environment: a huge population, complex problems, exceptional talent and enormous room for technological innovation. We intend to build from that environment — while designing with the ambition to compete beyond it.",
      "visualSteps": ["NIGERIA", "AFRICA", "THE WORLD"]
    }
  }
}
```

**Implementation details:** `<Section theme="dark">`. Render `visualSteps` as large stacked type connected by simple downward arrows (↓) — pure typography, not a graphic/illustration:
```
NIGERIA
   ↓
AFRICA
   ↓
THE WORLD
```
Consider animating each word/arrow in sequence (Standard category, staggered) rather than all at once, so it reads as a progression.

**Test/Acceptance:**
- [ ] The three-step visual renders correctly stacked with arrows, legible at all breakpoints.

---

### Step 3.9 — Section 7: Principles (light section)

**New files:** `components/sections/home/Principles.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 7):**
```json
{
  "home": {
    "principles": {
      "eyebrow": "HOW WE BUILD",
      "headline": "Think globally. Build deliberately.",
      "items": [
        { "title": "Build", "description": "Ideas matter only when someone turns them into reality." },
        { "title": "Solve", "description": "We build for real problems, real people and measurable outcomes." },
        { "title": "Own", "description": "We believe African technology should be created and owned here." },
        { "title": "Explore", "description": "We remain curious about what technology can become." }
      ]
    }
  }
}
```

**Implementation details:** `<Section theme="light">` — second pacing "breath." Render the four principles as a clean four-part list (numbered `01–04` in mono type works well), not cards with borders/shadows.

**Test/Acceptance:**
- [ ] All four principles render correctly in light theme with no card/shadow styling.

---

### Step 3.10 — Section 8: The bigger ambition

**New files:** `components/sections/home/BiggerAmbition.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 8):**
```json
{
  "home": {
    "biggerAmbition": {
      "eyebrow": "THE LONG VIEW",
      "headline": "Airacter is only the beginning.",
      "copy": "One product cannot change an industry. A company built to keep creating can. Vyraxity is being built for the long term — to create products, develop technology, support ambitious ideas and eventually expand into areas beyond software. We are starting small. Our ambition is not small."
    }
  }
}
```

**Implementation details:** `<Section theme="dark">`. The final two short lines ("We are starting small. Our ambition is not small.") should be visually set apart — larger type or increased spacing — as the section's emotional punchline.

**Test/Acceptance:**
- [ ] Section renders with the closing lines visually distinguished from the rest of the paragraph.

---

### Step 3.11 — Section 9: Closing CTA

**New files:** `components/sections/home/ClosingCta.tsx`
**Edited files:** `app/[locale]/page.tsx`
**New packages/env vars:** none.

**Content (Section 8, Section 9):**
```json
{
  "home": {
    "closingCta": {
      "headline": "The future can be built from anywhere.",
      "copy": "We are building it from here.",
      "primaryCta": "Follow Vyraxity",
      "secondaryCta": "Get in touch →"
    }
  }
}
```

**Implementation details:** `<Section theme="dark">`, full-bleed, centered, maximal whitespace, minimal elements — deliberately the quietest, most confident moment on the page (fewer motion flourishes than any other section; a simple fade is appropriate here specifically, in contrast to the rest of the page's varied motion vocabulary). Primary CTA → `Button` variant="primary" (destination: social/follow link or `/about`, your call — flag for a decision if undecided). Secondary CTA → links to `/contact` (Phase 10).

**Test/Acceptance:**
- [ ] Section renders as the final block on the homepage, visually calmer than preceding sections.
- [ ] Both CTAs are present and correctly styled.

---

### Step 3.12 — Homepage assembly QA + section-aware nav wiring

**Goal:** Now that all 9 real sections exist, wire the Step 2.5 active-section nav indicator to them and do a full end-to-end pass of the homepage.

**New files:** none.

**Edited files:**
- Each `components/sections/home/*.tsx` — add stable `id` attributes matching nav targets where relevant (Products/Labs/Vision links can point to in-page anchors and/or the real routes — confirm intended behavior: likely the nav should link to the dedicated pages, not homepage anchors, so this step may mainly be about verifying `useActiveSection` still behaves correctly with real content rather than rewiring nav hrefs).
- `app/[locale]/page.tsx` — final assembly check, correct section order.

**New packages/env vars:** none.

**Test/Acceptance:**
- [ ] Full homepage scroll-through, top to bottom, on desktop and mobile: correct copy, correct dark/light rhythm (Dark → Light → Dark → Dark → Dark → Dark → Light → Dark → Dark, per sections 1–9 above), no layout breaks.
- [ ] Lighthouse/devtools performance check: generative network canvas doesn't tank scroll performance.
- [ ] All CTAs point to the correct (even if not-yet-built) routes.

**Note for later:** the Visual Direction doc also describes a more ambitious single continuous "cinematic" scroll sequence (one luminous point evolving into a full network with staged text reveals: "ONE PRODUCT CAN START A JOURNEY" → "A COMPANY CAN KEEP BUILDING" → "THIS IS VYRAXITY"). Treat that as a **post-launch enhancement**, not part of this initial build — the 9-section structure above delivers the same narrative arc in a more implementable, testable way. Revisit the cinematic version as its own future phase once the core site is live.

---

## PHASE 4 — Products Page (`/products`)

### Step 4.1 — Products hero

**New files:** `components/sections/products/ProductsHero.tsx`
**Edited files:** `app/[locale]/products/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 9):**
```json
{
  "products": {
    "hero": {
      "eyebrow": "PRODUCTS",
      "headline": "We build technology products for the real world.",
      "copy": "Vyraxity develops products that solve meaningful problems and explore new possibilities in technology. Our first product is only the beginning."
    }
  }
}
```

**Test/Acceptance:**
- [ ] `/products` route renders with nav/footer and this hero section.

---

### Step 4.2 — Airacter product card

**New files:** `components/sections/products/AiracterCard.tsx`
**Edited files:** `app/[locale]/products/page.tsx`
**New packages/env vars:** none.

**Content (Section 9, "Product card — Airacter"):**
```json
{
  "products": {
    "airacterCard": {
      "label": "01 / CURRENT",
      "name": "Airacter",
      "description": "A persona-based AI experience designed to make conversations with artificial intelligence more expressive, personal and engaging.",
      "status": "Launching November 2026",
      "cta": "Explore Airacter →"
    }
  }
}
```

**Implementation details:** Give this card more size/weight than the placeholder cards in Step 4.3 — include an implied product-screen visual and the same subtle violet-to-coral glow treatment established in Step 3.6, for visual consistency between the homepage and this page. Links to `/products/airacter`.

**Test/Acceptance:**
- [ ] Card renders larger/heavier than the future-product placeholders once Step 4.3 is merged.

---

### Step 4.3 — Future product placeholder cards

**New files:** `components/sections/products/FutureProductCard.tsx`
**Edited files:** `app/[locale]/products/page.tsx`
**New packages/env vars:** none.

**Content (Section 9, "Future products"):**
```json
{
  "products": {
    "future": [
      { "label": "02 / NEXT", "lines": ["Something is being built.", "A new idea is taking shape inside Vyraxity.", "Coming soon."] },
      { "label": "03 / FUTURE", "lines": ["More technology.", "New products and experiments will emerge as Vyraxity grows.", "Stay tuned."] }
    ]
  }
}
```

**Implementation details:** Dashed hairline border, muted text — intentionally sparse so these read as "in progress," not broken/empty. Reuse `FutureProductCard` for both entries via the `future` array.

**Test/Acceptance:**
- [ ] Both placeholder cards render distinctly more muted/sparse than the Airacter card.

---

### Step 4.4 — Products closing statement

**New files:** `components/sections/products/ProductsClosing.tsx`
**Edited files:** `app/[locale]/products/page.tsx`
**New packages/env vars:** none.

**Content (Section 9, "Closing statement"):**
```json
{
  "products": {
    "closing": {
      "headline": "One company. Many ideas. A long horizon.",
      "copy": "Vyraxity is being built to create repeatedly — not around one product, but around the ability to identify important problems and build technology to solve them."
    }
  }
}
```

**Test/Acceptance:**
- [ ] Full `/products` page QA: hero → Airacter card → two future cards → closing statement, correct order, responsive at mobile widths.

---

## PHASE 5 — Airacter Product Page (`/products/airacter`)

This page is a deliberate exception to the site's single-accent rule: its hero/showcase area uses Airacter's own "Prism" identity, while the global nav and footer stay in Vyraxity's system. This physically demonstrates the relationship the brand doc describes: *"Vyraxity should say: Built by Vyraxity. Airacter can say: A Vyraxity product."*

### Step 5.1 — Airacter design tokens ("Prism" system), scoped to this page only

**Goal:** Define Airacter's own palette without leaking it into the global design system.

**New files:**
- `app/[locale]/products/airacter/airacter.css` (or a scoped `<style>`/CSS Module — either works; a dedicated stylesheet imported only into this route keeps the scoping explicit) — defines Airacter-only tokens.

**Edited files:** none globally.

**New packages/env vars:** none.

**Implementation details — Prism tokens:**
```css
.airacter-scope {
  --ar-base: #0B0A10;      /* near-black, faint violet undertone — distinct from Vyraxity's neutral #080808 */
  --ar-surface: #16141C;   /* card/chat-bubble surface */
  --ar-text: #F3F1F7;
  --ar-muted: #9C97A8;
  --ar-primary: #8B5CF6;   /* violet */
  --ar-secondary: #FF7A59; /* warm coral */
  --ar-gradient: linear-gradient(135deg, #8B5CF6 0%, #FF7A59 100%);
  --ar-radius-card: 16px;  /* noticeably more generous than Vyraxity's 2–8px scale */
}
```
Apply the `airacter-scope` class to the page's hero/showcase wrapper only — the `<Nav>` and `<Footer>` rendered by the shared layout remain outside this scope and keep using `--vx-*` tokens.

**Test/Acceptance:**
- [ ] Inspecting the nav/footer on this page confirms they still use Vyraxity's amber/black system.
- [ ] The scoped tokens are available inside the hero wrapper and nowhere else.

---

### Step 5.2 — Airacter hero (Prism identity)

**New files:** `components/sections/airacter/AiracterHero.tsx`
**Edited files:** `app/[locale]/products/airacter/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 10):**
```json
{
  "airacter": {
    "hero": {
      "headerTag": "A VYRAXITY PRODUCT",
      "headline": "Meet Airacter.",
      "subheadline": "AI conversations, shaped by personality.",
      "copy": "Airacter is an AI chat experience built around the idea that artificial intelligence does not have to feel purely transactional. Instead of interacting with AI as a generic assistant, Airacter explores conversations through distinct personas, identities and personalities.",
      "cta": "Visit Airacter →",
      "launchIndicator": "Launching November 2026"
    }
  }
}
```

**Implementation details:**
- `headerTag` ("A VYRAXITY PRODUCT") renders in Vyraxity's own eyebrow style (amber/mono) even though it sits above the Prism-scoped hero — a deliberate small bridge between the two systems.
- Headline can use the `--ar-gradient` treatment on one key word (e.g. "personality" if worked into the headline, or applied to "Airacter" in the header tag area) — sparingly, per the identity spec: never a full-bleed gradient background.
- Primary button uses `--ar-primary`/gradient background, per Airacter's own button treatment (distinct from the site-wide `Button` component — build an `AiracterButton` variant or a prop-driven theme override, Antigravity's choice, but keep it visually consistent with the Prism spec).
- Hero visual: a large placeholder implying Airacter's actual chat interface, soft violet-to-coral glow behind it (reuse the glow technique from Step 3.6, now using the real `--ar-*` tokens instead of the homepage's inline hint values). If depicting multiple personas, use abstract color-tinted identity markers, not illustrated faces/characters.
- Corner radius throughout this hero: `--ar-radius-card` (12–20px) — noticeably warmer/friendlier than the rest of the site.

**Test/Acceptance:**
- [ ] Hero renders with the Prism palette, correct copy, working CTA and launch indicator.
- [ ] Visual clearly differentiates from the rest of the site while the "A VYRAXITY PRODUCT" tag keeps it anchored to the brand.

---

### Step 5.3 — "Relationship to Vyraxity" section (back to Vyraxity system)

**New files:** `components/sections/airacter/RelationshipToVyraxity.tsx`
**Edited files:** `app/[locale]/products/airacter/page.tsx`
**New packages/env vars:** none.

**Content (Section 10, "Relationship to Vyraxity"):**
```json
{
  "airacter": {
    "relationship": {
      "heading": "Built by Vyraxity.",
      "copy": "Airacter is the first product being developed under Vyraxity. It represents the beginning of Vyraxity's journey to build globally relevant technology from Africa. Airacter is the product. Vyraxity is the company building what comes next."
    }
  }
}
```

**Implementation details:** This section sits **outside** the `airacter-scope` wrapper — back to standard `<Section theme="dark">` with Vyraxity's amber system. This is the visual "re-anchor" moment before the shared footer.

**Test/Acceptance:**
- [ ] Full `/products/airacter` page QA: header tag → Prism hero → re-anchored Vyraxity section → shared footer. Confirm the palette switch between hero and this section is deliberate-looking, not jarring/broken.

---

## PHASE 6 — Labs Page (`/labs`)

### Step 6.1 — Labs hero

**New files:** `components/sections/labs/LabsHero.tsx`
**Edited files:** `app/[locale]/labs/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 11):**
```json
{
  "labsPage": {
    "hero": {
      "eyebrow": "VYRAXITY LABS",
      "headline": "We don't know what we'll build next. That's the point.",
      "copy": "The future rarely arrives as a finished product. It begins as an experiment. Vyraxity Labs is our space for research, experimentation, prototypes and technological exploration."
    }
  }
}
```

**Test/Acceptance:** [ ] `/labs` route renders hero correctly.

---

### Step 6.2 — "What happens here?" section

**New files:** `components/sections/labs/WhatHappensHere.tsx`
**Edited files:** `app/[locale]/labs/page.tsx`
**New packages/env vars:** none.

**Content (Section 11):**
```json
{
  "labsPage": {
    "whatHappensHere": {
      "heading": "What happens here?",
      "items": [
        { "title": "Research", "description": "We investigate technologies that could unlock new possibilities." },
        { "title": "Experimentation", "description": "We build prototypes to test ideas quickly." },
        { "title": "Open source", "description": "Where appropriate, we share tools and technology with the wider developer community." },
        { "title": "Product discovery", "description": "Some experiments become products. Some become infrastructure. Some simply teach us something valuable." }
      ]
    }
  }
}
```

**Implementation details:** Four items as a clean list, not icon cards — consistent with the site-wide anti-card-grid stance.

**Test/Acceptance:** [ ] All four items render correctly, list style (not cards).

---

### Step 6.3 — Technical readout / experiment card component

**Goal:** Build the reusable "status readout" pattern the Visual Direction doc specifies for the Labs page's more technical aesthetic.

**New files:** `components/sections/labs/ExperimentCard.tsx`
**Edited files:** `app/[locale]/labs/page.tsx`
**New packages/env vars:** none.

**Content (exact pattern from Visual Direction doc, Table 34):**
```json
{
  "labsPage": {
    "experimentExample": {
      "system": "VYRAXITY LABS",
      "id": "EXPERIMENT / 014",
      "status": "SYSTEM: ACTIVE",
      "description": "Exploring computational approaches to...",
      "meta": {
        "status": "PROTOTYPE",
        "version": "0.3.2",
        "updated": "03 SEP 2026"
      }
    }
  }
}
```

**Implementation details:** Mono type throughout, thin hairline divider between the description and the meta block, label/value pairs right- or column-aligned:
```
VYRAXITY LABS
EXPERIMENT / 014
SYSTEM: ACTIVE

Exploring computational approaches to...
────────────────────────
STATUS       PROTOTYPE
VERSION      0.3.2
UPDATED      03 SEP 2026
```
Build this as a genuinely reusable component (props for id/status/description/meta) even though only one example renders at launch — it should be trivial to add more experiment cards later without touching the component itself.

**Test/Acceptance:**
- [ ] Card renders in the exact mono/hairline style described, with correct example content.
- [ ] Component accepts props and would correctly render a second, different experiment if one were added.

---

### Step 6.4 — Labs closing line

**New files:** `components/sections/labs/LabsClosing.tsx`
**Edited files:** `app/[locale]/labs/page.tsx`
**New packages/env vars:** none.

**Content (Section 11, "Closing"):**
```json
{
  "labsPage": {
    "closing": "Not every experiment needs to become a company. But every experiment can teach us something about what should be built next."
  }
}
```

**Implementation details:** Centered, quieter styling than the rest of the page.

**Test/Acceptance:** [ ] Full `/labs` page QA, all four sub-steps assembled in order.

---

## PHASE 7 — Vision Page (`/vision`)

The most substantial, manifesto-like page — pace it deliberately slower: fewer elements per screen, larger type, more whitespace, almost no imagery.

### Step 7.1 — Vision hero (paused two-line headline)

**New files:** `components/sections/vision/VisionHero.tsx`
**Edited files:** `app/[locale]/vision/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 12):**
```json
{
  "vision": {
    "hero": {
      "headline": "Africa should not only consume the future.",
      "headlineTwo": "Africa should help build it.",
      "copy": "Technology has transformed the world, but the geographic distribution of technology creation has never been equal. Vyraxity believes Africa can play a much larger role in the technology industry — not simply as a destination for products created elsewhere, but as a source of products, companies, intellectual property and ideas that influence the world. That is the future we want to contribute to."
    }
  }
}
```

**Implementation details:** Render `headline` and `headlineTwo` as two huge lines with a deliberate whitespace gap between them (a genuine paused beat — generous vertical margin, possibly a slight scroll-triggered delay between the two lines appearing) rather than as one continuous headline.

**Test/Acceptance:** [ ] The pause between the two headline lines is visually obvious and intentional, not just line-wrapping.

---

### Step 7.2 — "Our ambition" section

**New files:** `components/sections/vision/OurAmbition.tsx`
**Edited files:** `app/[locale]/vision/page.tsx`
**New packages/env vars:** none.

**Content (Section 12, "Our ambition"):**
```json
{
  "vision": {
    "ourAmbition": {
      "heading": "From consumer to creator.",
      "lines": [
        "Africa has enormous technological challenges.",
        "But those challenges can also produce extraordinary innovation.",
        "A solution built to work under African conditions can become useful elsewhere.",
        "A product designed for African users can become globally relevant.",
        "An engineer trained in Nigeria can build software used by someone in Europe.",
        "The opportunity is not to copy what already exists.",
        "The opportunity is to build what should exist."
      ]
    }
  }
}
```

**Implementation details:** Preserve the short declarative rhythm — render as separate short lines/paragraphs, not merged into one dense block.

**Test/Acceptance:** [ ] Each line renders distinctly, generous spacing between them.

---

### Step 7.3 — "Nigeria" section

**New files:** `components/sections/vision/NigeriaSection.tsx`
**Edited files:** `app/[locale]/vision/page.tsx`
**New packages/env vars:** none.

**Content (Section 12, "Nigeria"):**
```json
{
  "vision": {
    "nigeria": {
      "heading": "We start in Nigeria.",
      "copy": "Nigeria is our starting point. It is home to the people, problems, opportunities and talent that shape the first chapter of Vyraxity. But geography should not define the ceiling of our ambition."
    }
  }
}
```

**Test/Acceptance:** [ ] Renders correctly, consistent slower pacing with the rest of the page.

---

### Step 7.4 — "Africa" section

**New files:** `components/sections/vision/AfricaSection.tsx`
**Edited files:** `app/[locale]/vision/page.tsx`
**New packages/env vars:** none.

**Content (Section 12, "Africa"):**
```json
{
  "vision": {
    "africa": {
      "heading": "Africa is part of the mission.",
      "copy": "We want Vyraxity to contribute to an ecosystem where African talent creates globally competitive technology companies. That means:",
      "list": ["Products", "Research", "Engineering", "Intellectual property", "Jobs", "Knowledge"]
    }
  }
}
```

**Implementation details:** `list` renders as a compact stacked list following the intro copy line.

**Test/Acceptance:** [ ] List renders correctly, all six items present.

---

### Step 7.5 — "The world" section (closing)

**New files:** `components/sections/vision/WorldSection.tsx`
**Edited files:** `app/[locale]/vision/page.tsx`
**New packages/env vars:** none.

**Content (Section 12, "The world"):**
```json
{
  "vision": {
    "world": {
      "heading": "Global is the goal.",
      "copy": "We do not want to build products that succeed merely because they are African. We want to build products that succeed because they are excellent.",
      "closingLines": ["Africa is where we build.", "The world is where we compete."]
    }
  }
}
```

**Implementation details:** `closingLines` rendered as the final, largest-type moment on the page.

**Test/Acceptance:** [ ] Full `/vision` page QA, all five sections in order, pacing feels noticeably slower/more spacious than `/products`.

---

## PHASE 8 — About Page (`/about`)

### Step 8.1 — About hero

**New files:** `components/sections/about/AboutHero.tsx`
**Edited files:** `app/[locale]/about/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 13):**
```json
{
  "about": {
    "hero": {
      "headline": "We are building a technology company for the long term.",
      "copy": "Vyraxity is a technology company founded on a simple belief: Africa can build technology for the world. We are creating a company designed to develop products, explore emerging technologies and turn ambitious ideas into reality."
    }
  }
}
```

**Test/Acceptance:** [ ] `/about` route renders hero correctly.

---

### Step 8.2 — "Our story" section

**New files:** `components/sections/about/OurStory.tsx`
**Edited files:** `app/[locale]/about/page.tsx`
**New packages/env vars:** none.

**Content (Section 13, "Our story"):**
```json
{
  "about": {
    "ourStory": {
      "heading": "Why Vyraxity exists",
      "copy": "The global technology industry has produced remarkable companies and technologies. Africa has benefited from many of them. But we believe the next chapter should include more technology created here, by people here, and exported from here to the rest of the world. Vyraxity is our attempt to contribute to that future.",
      "closingLines": ["Not through slogans.", "Through products."]
    }
  }
}
```

**Test/Acceptance:** [ ] Section renders with closing lines visually set apart.

---

### Step 8.3 — "What we are" section

**New files:** `components/sections/about/WhatWeAre.tsx`
**Edited files:** `app/[locale]/about/page.tsx`
**New packages/env vars:** none.

**Content (Section 13, "What we are"):**
```json
{
  "about": {
    "whatWeAre": ["A technology company.", "Software first.", "Technology beyond software when the opportunity demands it.", "African in origin.", "Global in ambition."]
  }
}
```

**Implementation details:** Short stacked declarative list, large type.

**Test/Acceptance:** [ ] All five lines render as a clean stacked list.

---

### Step 8.4 — "What we believe" section

**New files:** `components/sections/about/WhatWeBelieve.tsx`
**Edited files:** `app/[locale]/about/page.tsx`
**New packages/env vars:** none.

**Content (Section 13, "What we believe"):**
```json
{
  "about": {
    "whatWeBelieve": {
      "lines": ["Talent exists everywhere.", "Opportunity does not."],
      "copy": "We want to help demonstrate what is possible when African talent is given the opportunity to build at global standards and with global ambition."
    }
  }
}
```

**Test/Acceptance:** [ ] Section renders correctly, `lines` visually set apart from `copy`.

---

### Step 8.5 — "What we are building toward" section

**New files:** `components/sections/about/BuildingToward.tsx`
**Edited files:** `app/[locale]/about/page.tsx`
**New packages/env vars:** none.

**Content (Section 13, "What we are building toward"):**
```json
{
  "about": {
    "buildingToward": [
      "A company capable of repeatedly creating valuable technology.",
      "A company whose products can cross borders.",
      "A company whose intellectual property originates in Africa and creates value globally.",
      "A company that can grow far beyond its first product."
    ]
  }
}
```

**Test/Acceptance:** [ ] Full `/about` page QA, all five sections in order, calmer/more institutional pacing than the homepage as specified.

---

## PHASE 9 — Careers Page (`/careers`)

Keep this page intentionally simple — hiring is limited/non-existent at this stage.

### Step 9.1 — Careers hero

**New files:** `components/sections/careers/CareersHero.tsx`
**Edited files:** `app/[locale]/careers/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 14):**
```json
{
  "careers": {
    "hero": {
      "headline": "Build the future with us.",
      "copy": "We are looking for people who are curious enough to explore difficult problems and ambitious enough to build solutions that matter. Vyraxity is being built in Africa with global standards and global ambition."
    }
  }
}
```

**Test/Acceptance:** [ ] `/careers` route renders hero correctly.

---

### Step 9.2 — "Who we want" section

**New files:** `components/sections/careers/WhoWeWant.tsx`
**Edited files:** `app/[locale]/careers/page.tsx`
**New packages/env vars:** none.

**Content (Section 14, "Who we want"):**
```json
{
  "careers": {
    "whoWeWant": {
      "roles": ["Engineers.", "Designers.", "Researchers.", "Product thinkers.", "Builders."],
      "closingLine": "People who look at difficult problems and think: \"Let's build something.\""
    }
  }
}
```

**Test/Acceptance:** [ ] Roles render as a simple stacked list, closing line set apart.

---

### Step 9.3 — "Working here" section

**New files:** `components/sections/careers/WorkingHere.tsx`
**Edited files:** `app/[locale]/careers/page.tsx`
**New packages/env vars:** none.

**Content (Section 14, "Working here"):**
```json
{
  "careers": {
    "workingHere": "You won't be joining a company with everything figured out. You will be joining a company that is still being built. That means more uncertainty. But it also means more opportunity to shape what Vyraxity becomes."
  }
}
```

**Test/Acceptance:** [ ] Section renders correctly.

---

### Step 9.4 — Openings CTA slot (empty state, future-proofed)

**New files:** `components/sections/careers/OpeningsCta.tsx`
**Edited files:** `app/[locale]/careers/page.tsx`
**New packages/env vars:** none.

**Content (Section 14, "CTA"):**
```json
{
  "careers": {
    "openings": {
      "empty": "There are currently no open positions.",
      "cta": "View open positions →"
    }
  }
}
```

**Implementation details:** Build this as a component that can render two states via a prop (e.g. `hasOpenings: boolean`, defaulting to `false`): empty state shows the plain quiet text; the (currently unused) filled state would show the `cta` button plus a simple job-listing pattern reusing the Labs `ExperimentCard`'s hairline-list style (role title, location/remote tag, link) — sketch this filled state now so swapping it in later requires no redesign, even though only the empty state ships at launch.

**Test/Acceptance:**
- [ ] Empty state renders correctly by default.
- [ ] Manually toggling the component's prop to the filled state in a local test renders a plausible job-list layout, confirming the future-proofing works.
- [ ] Full `/careers` page QA, all four sub-steps assembled.

---

## PHASE 10 — Contact Page (`/contact`)

### Step 10.1 — Contact hero + direct email

**New files:** `components/sections/contact/ContactHero.tsx`
**Edited files:** `app/[locale]/contact/page.tsx` (new route)
**New packages/env vars:** none.

**Content (Brand & Website Foundation, Section 15):**
```json
{
  "contact": {
    "hero": {
      "headline": "Let's build something meaningful.",
      "copy": "Whether you want to work with us, build with us, partner with us, invest in us, or simply start a conversation, we'd love to hear from you.",
      "email": "hello@vyraxity.com"
    }
  }
}
```

**Implementation details:** Email address rendered prominently, `mailto:` link, with a click-to-copy affordance (small "copy" button/icon) since the brand doc emphasizes this should be "easy to copy, not buried."

**Test/Acceptance:** [ ] Email is prominent, clickable, and copyable.

---

### Step 10.2 — Contact form UI (client-side validation)

**Goal:** Build the form fields and client-side validation, no backend submission yet (submit can log to console at this step).

**New files:**
- `components/sections/contact/ContactForm.tsx`
- `lib/validations/contact.ts` — Zod schema.

**Edited files:**
- `app/[locale]/contact/page.tsx`

**New packages:**
- `react-hook-form` — form state/validation handling.
- `zod` — schema validation, shared between client and (in Step 10.3) server.
- `@hookform/resolvers` — connects `zod` schemas to `react-hook-form`.

**New env vars:** none.

**Content (Section 15, "Form fields" + "Submit button"):**
```json
{
  "contact": {
    "form": {
      "name": "Name",
      "email": "Email",
      "company": "Company (optional)",
      "reason": "Reason for contacting us",
      "reasonOptions": ["Partnership", "Careers", "Press/Media", "Investment", "General inquiry"],
      "message": "Message",
      "submit": "Send message",
      "successMessage": "Thanks — we've received your message and will be in touch soon.",
      "errorMessage": "Something went wrong. Please try again or email us directly."
    }
  }
}
```

**Implementation details:**
- Fields, in order: Name (text, required) → Email (text, required, valid email) → Company (text, optional) → Reason for contacting us (this is specified as a plain field in the brand doc but is clearly better as a **dropdown/select** — implement it as a `<select>` with the `reasonOptions` above; this is a deliberate recommended improvement over the source doc, flag it as such in the PR description) → Message (textarea, required, reasonable min length).
- Style inputs minimally: thin hairline borders (`--vx-line`), no heavy boxes, generous label spacing, small radius, consistent with the `Button` component's restraint.
- Submit button: primary `Button` variant, label "Send message."

**Test/Acceptance:**
- [ ] All fields render with correct labels/placeholders from `messages/en.json`.
- [ ] Client-side validation correctly blocks submission with clear inline errors (empty required fields, invalid email).
- [ ] Submitting a valid form currently just logs the payload to console (backend wired in 10.3).

---

### Step 10.3 — Contact form backend (API route + email delivery)

**Goal:** Wire the form to actually send an email to Vyraxity via Resend.

**New files:**
- `app/api/contact/route.ts` — POST handler: validate payload with the shared Zod schema, send via Resend, return success/error JSON.
- `lib/email.ts` — Resend client initialization.

**Edited files:**
- `components/sections/contact/ContactForm.tsx` — replace the console-log submit handler with a real `fetch('/api/contact', ...)` call, show `successMessage`/`errorMessage` based on the response.

**New packages:**
- `resend` — the SDK used to send the contact-form email from the API route.

**New env vars:**

| Variable | Purpose | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Authenticates server-side calls to the Resend API to send the contact-form email | Sign up at resend.com → Dashboard → **API Keys** → Create API Key. Requires verifying a sending domain (Dashboard → **Domains** → Add Domain, then add the DNS records Resend provides to Namecheap's DNS for `vyraxity.com`) before you can send from a `@vyraxity.com` address |
| `CONTACT_TO_EMAIL` | The inbox that receives contact-form submissions | Set manually — `hello@vyraxity.com` |
| `CONTACT_FROM_EMAIL` | The verified sending address Resend sends *from* | Must match a domain verified in Resend's **Domains** section, e.g. `no-reply@vyraxity.com` |

Add these to `.env.local.example` (with placeholder/blank values and comments) and to `lib/env.ts`'s required-var validation from Step 0.8.

**Implementation details:**
- Route handler re-validates the incoming payload server-side with the same Zod schema (never trust client-side validation alone).
- Basic rate-limiting/spam consideration: at minimum, a honeypot field (hidden input that should stay empty; reject submissions where it's filled) is cheap to add now — note Cloudflare Turnstile as a stronger option to add later (Phase 13/14) if spam becomes a problem.
- On success, return `200` with a simple JSON body; on validation failure, `400` with field errors; on Resend/network failure, `500`.

**Test/Acceptance:**
- [ ] Submitting the form in dev with `RESEND_API_KEY` set actually delivers an email to `CONTACT_TO_EMAIL`.
- [ ] Submitting with the honeypot field filled (simulate via devtools) is silently rejected.
- [ ] Server-side validation errors surface correctly to the user (not just a generic failure).
- [ ] `.env.local` is confirmed **not** committed to git.

---

### Step 10.4 — "Follow the journey" section

**New files:** `components/sections/contact/FollowTheJourney.tsx`
**Edited files:** `app/[locale]/contact/page.tsx`
**New packages/env vars:** none.

**Content (Section 15, "Secondary section"):**
```json
{
  "contact": {
    "followTheJourney": {
      "heading": "Follow the journey",
      "links": { "github": "GitHub", "linkedin": "LinkedIn", "x": "X", "instagram": "Instagram" }
    }
  }
}
```

**Implementation details:** Plain text row, consistent with the footer's social-link treatment (not icon-in-circle buttons).

**Test/Acceptance:** [ ] Full `/contact` page QA: hero/email → form (submits successfully end-to-end) → follow section.

---

## PHASE 11 — SEO, Metadata & Structured Data

### Step 11.1 — Per-page metadata

**Goal:** Wire the exact SEO titles/descriptions from the brand doc into each route via Next.js's `generateMetadata`.

**New files:** none.

**Edited files:** every `app/[locale]/*/page.tsx` built so far, adding `generateMetadata` exports.

**New packages/env vars:** none (uses `NEXT_PUBLIC_SITE_URL` from Step 0.8 for canonical URLs).

**Content (Brand & Website Foundation, Section 17 — add under a `meta` namespace per page):**
```json
{
  "meta": {
    "home": { "title": "Vyraxity — Technology, Built from Africa. Built for the World.", "description": "Vyraxity is a technology company building ambitious software and exploring emerging technologies from Africa for the world." },
    "products": { "title": "Products — Vyraxity", "description": "Explore the technology products being built by Vyraxity, beginning with Airacter." },
    "airacter": { "title": "Airacter — A Vyraxity Product", "description": "Airacter is a persona-based AI experience built by Vyraxity. Launching November 2026." },
    "labs": { "title": "Vyraxity Labs — Exploring What Comes Next", "description": "Research, experiments and prototypes from Vyraxity." },
    "vision": { "title": "Our Vision — Vyraxity", "description": "We believe Africa should not only consume technology, but help build the technologies that shape the future." },
    "about": { "title": "About Vyraxity", "description": "Learn about Vyraxity, a technology company building globally relevant products from Africa." },
    "careers": { "title": "Careers — Vyraxity", "description": "Join Vyraxity and help build globally relevant technology from Africa." },
    "contact": { "title": "Contact Vyraxity", "description": "Get in touch with Vyraxity about partnerships, opportunities, products and technology." }
  }
}
```

**Test/Acceptance:**
- [ ] Each route's `<title>` and meta description match the table above exactly (verify via view-source or devtools).

---

### Step 11.2 — OpenGraph / Twitter card images

**New files:**
- `app/[locale]/opengraph-image.tsx` (and per-key routes as needed, e.g. `app/[locale]/products/airacter/opengraph-image.tsx`) using Next.js's built-in `ImageResponse` for generated OG images, OR static images in `public/og/` if you prefer designed-in-Figma assets.

**Edited files:** none beyond the new files above.

**New packages:** none (Next.js's `next/og` is built in).

**New env vars:** none.

**Implementation details:** Keep OG images consistent with the brand system — black background, amber accent, wordmark + page-specific headline, no stock imagery. Airacter's OG image may use the Prism gradient instead, consistent with Phase 5.

**Test/Acceptance:** [ ] Sharing a link preview tool (e.g. pasting the URL into a Slack DM or using an OG-preview debugger) shows correctly branded images per page.

---

### Step 11.3 — Sitemap and robots

**New files:**
- `app/sitemap.ts`
- `app/robots.ts`

**Edited files:** none. **New packages:** none (both are native Next.js App Router conventions). **New env vars:** uses `NEXT_PUBLIC_SITE_URL`.

**Test/Acceptance:**
- [ ] `/sitemap.xml` lists all routes across all live locales.
- [ ] `/robots.txt` correctly references the sitemap and allows crawling (with any admin/api paths disallowed as appropriate).

---

### Step 11.4 — Organization structured data (JSON-LD)

**New files:** `lib/structuredData.ts`
**Edited files:** `app/[locale]/layout.tsx` — inject the JSON-LD `<script type="application/ld+json">` tag.
**New packages/env vars:** none.

**Implementation details:** `Organization` schema — name "Vyraxity," url, logo, `sameAs` array pointing to the real social profiles once available, description matching the homepage meta description.

**Test/Acceptance:** [ ] Validate via Google's Rich Results Test (or equivalent) with no errors.

---

## PHASE 12 — Internationalization: Additional Locales & Language Switcher

The i18n infrastructure and message-key structure has been in place since Phase 0; every content step above already wrote into `messages/en.json`. This phase adds real additional languages and the UI to switch between them.

### Step 12.1 — Add French locale

**New files:** `messages/fr.json` — full French translation of every key currently in `messages/en.json`.
**Edited files:** `i18n/routing.ts` — add `'fr'` to the supported locales list.
**New packages/env vars:** none.

**Implementation details:** French is prioritized first given its relevance across Francophone West/Central Africa. Translate all copy faithfully — this is a good moment to have a native French speaker (or careful review) check tone, since the brand voice (confident, restrained, declarative) needs to survive translation, not just literal accuracy.

**Test/Acceptance:**
- [ ] Visiting `/fr` (or the configured French path) renders every page correctly in French, no missing-key fallbacks to English by accident, no layout breaks from longer/shorter French strings (check the hero headline especially, since French renders longer).

---

### Step 12.2 — Language switcher component

**New files:** `components/layout/LanguageSwitcher.tsx`
**Edited files:** `components/layout/Nav.tsx` — render the switcher (desktop) and `components/layout/MobileNav.tsx` (mobile).
**New packages/env vars:** none.

**Implementation details:** Small, unobtrusive control (e.g. "EN / FR" text toggle in `font-mono`, consistent with the site's restrained UI language — not a flag-icon dropdown). Preserves the current path when switching locale (uses next-intl's locale-aware `Link`/`usePathname`).

**Test/Acceptance:** [ ] Switching language from any page lands on the same page in the other language, not the homepage.

---

### Step 12.3 — Additional locale (optional, e.g. Portuguese)

**New files:** `messages/pt.json` (if pursuing — Portuguese is relevant given Lusophone Africa, e.g. Angola, Mozambique).
**Edited files:** `i18n/routing.ts`.
**New packages/env vars:** none.

**Test/Acceptance:** same as Step 12.1, for the new locale. Treat this step as optional/deferrable — ship with English + French first, add further locales based on actual audience data post-launch.

---

## PHASE 13 — Polish, Accessibility, Performance

### Step 13.1 — Reduced-motion audit

**Goal:** Systematically verify every animated component built in Phases 2–7 correctly respects `prefers-reduced-motion`.

**New files:** none. **Edited files:** any component found not correctly respecting reduced motion. **New packages/env vars:** none.

**Test/Acceptance:** [ ] With OS/browser reduced-motion enabled, walk every page: nav transitions, mobile menu, generative network, section reveals, hero entrance — all should be instant/static, none should animate.

---

### Step 13.2 — Accessibility pass

**Goal:** Focus states, semantic HTML, aria-labels, color contrast.

**New files:** none. **Edited files:** as needed across components. **New packages:** consider `eslint-plugin-jsx-a11y` if not already part of the Next.js ESLint config. **New env vars:** none.

**Implementation details:** Specifically verify: amber (`#F2A93B`) on black (`#080808`) contrast is fine for buttons/large text but confirm it is **not** used for small/fine body text anywhere (per the design system guardrail from the earlier design brief); all interactive elements have visible focus rings (the site's minimal-shadow aesthetic still needs a clear, on-brand focus indicator — e.g. a 1–2px amber outline, not a browser-default blue ring); form fields have proper `<label>` associations; nav/mobile menu are keyboard-navigable.

**Test/Acceptance:**
- [ ] Full keyboard-only pass through the site (Tab/Shift+Tab/Enter) reaches and operates every interactive element, with visible focus states throughout.
- [ ] Automated contrast check (e.g. axe DevTools) shows no critical violations.

---

### Step 13.3 — Performance pass

**New files:** none. **Edited files:** as needed (image formats/sizes, font loading strategy, canvas node counts). **New packages:** optionally `@vercel/analytics` and `@vercel/speed-insights` for ongoing monitoring post-launch. **New env vars:** none (Vercel's analytics packages auto-configure on Vercel-hosted projects, no manual key needed).

**Test/Acceptance:**
- [ ] Lighthouse (mobile + desktop) scores reviewed on the homepage (heaviest page due to the generative canvas) and at least one other page — flag and address any major regressions, particularly around Largest Contentful Paint and total blocking time from the canvas animation.

---

### Step 13.4 — Custom cursor (optional enhancement)

**Goal:** The Visual Direction doc suggests a subtle custom cursor as a nice-to-have, explicitly **not** a prerequisite — build it last, and only if time allows.

**New files:** `components/ui/CustomCursor.tsx`
**Edited files:** `app/[locale]/layout.tsx` — render conditionally on desktop/pointer-fine devices only (never on touch devices).
**New packages/env vars:** none.

**Implementation details:** Three states — normal (small dot), hovering a link (slightly larger ring), hovering a product card (larger still, perhaps showing a small "→" or "View" hint). Must not interfere with native cursor behavior for accessibility tools, and must be fully disabled on any touch/coarse-pointer device (`@media (pointer: fine)` check) and under reduced motion.

**Test/Acceptance:** [ ] Cursor enhancement only appears on desktop with a fine pointer; entirely absent on mobile/tablet; doesn't break native text selection or link clicking.

---

## PHASE 14 — Deployment

### Step 14.1 — Vercel project setup

**Goal:** Connect the GitHub repo to Vercel and configure environment variables for production.

**New files:** none (may add `vercel.json` only if custom config is needed — usually not required for a standard Next.js app).

**New env vars to configure in Vercel (Project Settings → Environment Variables), mirroring `.env.local.example`:**
- `NEXT_PUBLIC_SITE_URL` → `https://vyraxity.com`
- `RESEND_API_KEY` → same value from resend.com
- `CONTACT_TO_EMAIL` → `hello@vyraxity.com`
- `CONTACT_FROM_EMAIL` → your verified Resend sending address

**Test/Acceptance:**
- [ ] A Vercel preview deployment (from a PR) builds successfully and the contact form works end-to-end against the preview environment's env vars.

---

### Step 14.2 — Domain connection (Namecheap → Vercel)

**Goal:** Point vyraxity.com (currently just sitting on Namecheap) at the Vercel deployment.

**Implementation details:**
- In Vercel: Project → Settings → Domains → Add `vyraxity.com` (and `www.vyraxity.com`, redirecting to the apex or vice versa per your preference).
- In Namecheap: Domain → Advanced DNS → add the A/CNAME records Vercel provides (typically an `A` record for the apex pointing to Vercel's IP, and a `CNAME` for `www` pointing to `cname.vercel-dns.com`).
- Also add the Resend domain-verification DNS records here (from Step 10.3) at the same time, since both changes happen in the same Namecheap DNS panel.

**Test/Acceptance:**
- [ ] `https://vyraxity.com` resolves to the live site with a valid SSL certificate (Vercel auto-provisions this).
- [ ] `hello@vyraxity.com` sending works (Resend domain shows "Verified").

---

### Step 14.3 — Production QA checklist

**Goal:** Final full-site pass before calling this "launched" (in the sense of the marketing site being live — Airacter itself still targets November 2026).

**Test/Acceptance:**
- [ ] Every route in both `en` and `fr` loads correctly on the production domain.
- [ ] Contact form delivers real emails in production.
- [ ] All internal nav/footer/CTA links resolve correctly, no `#` placeholders left over from earlier phases (swap in real social URLs if not already done).
- [ ] Metadata/OG images verified on the production domain (social previews often behave differently than in dev).
- [ ] Full responsive pass (mobile/tablet/desktop) on the production build, not just local dev.
- [ ] Reduced-motion and keyboard-accessibility passes re-verified on production.

---

## Appendix A — Full package list

| Package | Introduced in | Purpose |
|---|---|---|
| `next`, `react`, `react-dom` | 0.1 | Core framework |
| `typescript` | 0.1 | Type safety |
| `tailwindcss` | 0.1 | Utility-first styling, design token system |
| `next/font/google` (built-in) | 0.3 | Geist Sans / Geist Mono fonts (no extra package) |
| `motion` | 0.6 | UI animation (hover, reveal, transitions) |
| `next-intl` | 0.7 | Internationalization / locale routing |
| `clsx` (+ optionally `tailwind-merge`) | 1.3 | Conditional className composition |
| `react-hook-form` | 10.2 | Contact form state/validation |
| `zod` | 10.2 | Schema validation (shared client/server) |
| `@hookform/resolvers` | 10.2 | Bridges Zod ↔ react-hook-form |
| `resend` | 10.3 | Transactional email delivery for the contact form |
| `eslint-plugin-jsx-a11y` (optional) | 13.2 | Accessibility linting |
| `@vercel/analytics`, `@vercel/speed-insights` (optional) | 13.3 | Post-launch performance/usage monitoring |

## Appendix B — Full environment variable list

| Variable | Required from | Purpose | Source |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Phase 0 | Canonical URL for metadata/sitemap/OG | Manual — `localhost:3000` (dev) / `https://vyraxity.com` (prod, set in Vercel) |
| `RESEND_API_KEY` | Phase 10 | Send contact-form emails | resend.com → Dashboard → API Keys (after verifying the sending domain under Domains) |
| `CONTACT_TO_EMAIL` | Phase 10 | Inbox that receives submissions | Manual — `hello@vyraxity.com` |
| `CONTACT_FROM_EMAIL` | Phase 10 | Verified sending address | Must match a domain verified in Resend → Domains, e.g. `no-reply@vyraxity.com` |

## Appendix C — Deferred / future scope (explicitly out of this guide)

These are called out in the source docs but intentionally deferred to keep this guide shippable in small steps:

- The full continuous "cinematic" homepage scroll sequence (single evolving network + staged text reveals) — the 9-section structure in Phase 3 delivers the same narrative more incrementally; revisit the cinematic version post-launch.
- Real photography (Category 3 imagery from the Visual Direction doc) — placeholder/abstract visuals only for this build; swap in real photography once available, without needing a structural redesign.
- Cloudflare Turnstile or similar stronger spam protection on the contact form — a honeypot field ships at launch; upgrade if spam becomes an issue.
- Careers page's filled "open positions" state — the empty state ships; the component is built to support the filled state later (Step 9.4).
- Additional locales beyond English/French(/Portuguese) — expand based on real audience data.
