# Pablo Cunha — Portfolio

A blueprint/schematic-themed personal portfolio for a backend & security engineer.
Dark by default, light mode optional. Built to make recruiters stop scrolling.

**Live hook:** _"I build backend systems that don't break at 3 AM."_

---

## Stack

- **Vite + React 18 + TypeScript** — fast dev, static build, deploy anywhere
- **Tailwind CSS** — design system via CSS variables (themeable dark/light)
- **Framer Motion** — scroll reveals, magnetic buttons, custom cursor, layout animations
- **Lenis** — smooth scrolling (auto-disabled for `prefers-reduced-motion`)

No backend. No database. Ships as static files.

---

## Design system

| Token        | Dark        | Light       |
| ------------ | ----------- | ----------- |
| Base bg      | `#0a0e12`   | `#f4f1ea`   |
| Accent       | `#22d3ee`   | `#0891b2`   |
| Type — serif | Newsreader  | Newsreader  |
| Type — mono  | JetBrains Mono |          |
| Type — sans  | Inter       |             |

The "blueprint" language: fine grid backgrounds, corner ticks, dimension labels
(`FIG.00`, coordinates, `scale 1:1`), measurement lines, and monospace annotations
mixed with an editorial serif.

### Signature touches

- **Context-aware custom cursor** (dot + lagging ring, changes per `data-cursor` target)
- **Decode-on-view text** — headings resolve from cipher glyphs (`DecodeText`)
- **Self-typing terminal** demoing `pip install envsafe` + a live scan (`Terminal`)
- **Magnetic buttons**, scroll-progress rail, animated mesh accent, grain overlay
- **Console easter egg** — open dev tools 👀

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
```

### Build & preview

```bash
npm run build      # type-checks then builds to /dist
npm run preview    # serve the production build locally
```

---

## Customizing content

**All copy and data live in one file:** [`src/data/content.ts`](src/data/content.ts).
Edit `profile`, `projects`, `experience`, `skills`, `education`, `languages` there —
the components read from it. No need to touch JSX for content changes.

### Add your photo

Drop a 4:5 image at `public/pablo.jpg`, then swap the placeholder block in
`src/components/sections/About.tsx` for an `<img src="/pablo.jpg" />`.

### Social preview image

Add `public/og.png` (1200×630) for rich link previews. Meta tags already point to it
in `index.html` — update the `pablocunha.dev` URLs to your real domain.

---

## Deployment

### Vercel

```bash
npm i -g vercel
vercel            # follow prompts; framework auto-detected (Vite)
```

`vercel.json` is included (SPA rewrites + clean URLs).

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

`netlify.toml` is included (build command, publish dir, SPA redirect, asset caching).

Either way: build command `npm run build`, output directory `dist`.

---

## Accessibility & performance

- Semantic landmarks, skip link, focus-visible rings, `aria-label`s on icon buttons
- Respects `prefers-reduced-motion` (cursor, smooth scroll, decode, terminal all degrade)
- Custom cursor only activates on fine-pointer devices
- Fonts preconnected + `display=swap`; no images shipped by default
- Targets Lighthouse 90+ across the board

---

Built with ♥ in Berlin.
