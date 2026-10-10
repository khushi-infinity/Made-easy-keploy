# Test a Go App with Keploy — a beginner-friendly tutorial

A single-page, static documentation site built with **Next.js 16 + MDX**, containing an original, beginner-friendly tutorial on recording and replaying integration tests for a Go application with [Keploy](https://keploy.io) — using the Gin + MongoDB URL-shortener quickstart ([samples-go/gin-mongo](https://github.com/keploy/samples-go/tree/main/gin-mongo)).

🔗 **Live repo:** [github.com/khushi-infinity/Made-easy-keploy](https://github.com/khushi-infinity/Made-easy-keploy)

This is the code for a Keploy DevRel candidate assignment.

---

## Live site preview

Full-page captures of the finished site, in both themes (taken from the static `out/` build — exactly what Vercel serves). Click an image to expand it.

### ☀️ Light mode

![Screenshot of the tutorial site in light mode, 1440px wide, full page](docs/screenshots/screenshot-light.png)

### 🌙 Dark mode

![Screenshot of the tutorial site in dark mode, 1440px wide, full page](docs/screenshots/screenshot-dark.png)

> Toggle themes yourself with the ☀️/🌙 button in the sticky header — the choice is persisted in `localStorage` and defaults to your system preference.

---

## Deliverables

When you submit, include **both** links:

1. **Public GitHub repo** — [github.com/khushi-infinity/Made-easy-keploy](https://github.com/khushi-infinity/Made-easy-keploy) ✅
2. **Live Vercel deployment** — import the repo in Vercel (deploys zero-config, free) for a live URL. Steps below.

---

## What the tutorial covers

The MDX page walks a complete Go beginner through:

1. **The problem Keploy solves** — why replaying *real* integration traffic beats hand-written mocks
2. **Prerequisites & clone** — Go, Docker, and the `gin-mongo` URL-shortener sample app
3. **Record mode** — running `keploy record -c "go run main.go"` and exercising the API with `curl` calls
4. **The generated test suite** — what's inside `keploy/tests/` (mocked MongoDB responses, request/response pairs) with a-ha! callouts explaining the magic
5. **Test mode & replay** — `keploy test -c "go run main.go"`, CI-ready exit codes, and the coverage report
6. **Next steps** — links into Keploy docs for deeper topics

Along the way there are verification checkpoints, common gotchas (port conflicts, Docker required), and a visual **FlowDiagram** contrasting record mode vs. test mode.

## What's inside (the code)

- 📄 **`app/page.mdx`** — the tutorial itself, written in MDX. Remixing the
  [official Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/)
  into a beginner-focused walkthrough with personal a-ha! moments.
- 🎨 **Custom MDX components** (in `components/`):
  - `Callout` — five variants: `info`, `tip`, `warning`, `note`, `aha` (used to flag
    a-ha! moments, gotchas, and verification tips)
  - `Steps` / `Step` — numbered walkthrough blocks
  - `FlowDiagram` — a CSS diagram showing **record** vs **test** modes
- 🌗 **Dark / light mode toggle** — persisted in `localStorage`, defaults to system
  preference. The toggle is in the sticky header.
- ✨ **Syntax highlighting** — `rehype-highlight` at MDX-compile time, with
  `hljs`-classed `<pre>` blocks and language tags baked into the static HTML.
- 🪟 **Tailwind CSS v4** + CSS custom properties for theming (design tokens in
  `:root` / `[data-theme="dark"]`), so the site is clean, professional, and
  responsive.
- 🧰 **`scripts/`** — small utilities used while developing:
  - `serve-static.mjs` — zero-dependency static file server for `out/`
  - `screenshot-readme.js` — Playwright script that captures the light/dark
    full-page screenshots into `docs/screenshots/` (`npm run screenshot:readme`)

## Project structure

```
keploy-docs-site/
├── app/
│   ├── layout.tsx        # Root layout, fonts, theme boot script
│   ├── globals.css       # Tailwind v4 + design tokens (light/dark)
│   └── page.mdx          # The tutorial (MDX)
├── components/
│   ├── callout.tsx       # info / tip / warning / note / aha
│   ├── steps.tsx         # Numbered Steps / Step blocks
│   ├── flow-diagram.tsx  # CSS record-vs-test diagram
│   └── theme-toggle.tsx  # Dark/light toggle (localStorage)
├── docs/screenshots/     # Full-page PNGs used by this README
├── scripts/              # Static server + screenshot tooling
├── next.config.ts        # output: "export" → static HTML in out/
└── package.json
```

---

## Local development

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Production build

The site is fully static (`output: "export"` in `next.config.ts`), so a build produces
plain HTML in `out/`:

```bash
npm run build
# verify the static output locally
node scripts/serve-static.mjs   # serves out/ at http://localhost:3333
```

A browser hitting `http://localhost:3333` will see the fully rendered tutorial —
exactly what Vercel serves.

### Regenerating the README screenshots

```bash
npm run build          # refresh out/ first
npm run screenshot:readme
```

This starts the static server, captures full-page PNGs of the site in light and dark
mode, and writes them to `docs/screenshots/screenshot-{light,dark}.png`.

## Deploying to Vercel

1. **Push this repo to a public GitHub repository** (deliverable #1 — done ✅):

   ```bash
   git init
   git add .
   git commit -m "Keploy DevRel assignment: tutorial site"
   git remote add origin git@github.com:khushi-infinity/Made-easy-keploy.git
   git push -u origin main
   ```

2. **Import the repo in Vercel** (deliverable #2):

   - Go to [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub and import **khushi-infinity/Made-easy-keploy**
   - **All defaults work as-is** — Next.js is auto-detected, no environment variables
     are needed, no build overrides
   - Framework preset: *Next.js* · Build command: `next build` (default) ·
     Install command: `npm install` (default) · Node.js version: 20+ (default)
   - Hit **Deploy**. In about 40 seconds you'll have a live URL.

   Or from the CLI:

   ```bash
   npm i -g vercel
   vercel --prod
   ```

Because the site is pre-rendered to static HTML, Vercel serves it from the edge with
zero server-side cost.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Content | MDX (`@next/mdx`, `remark-gfm`, `rehype-highlight`) |
| Styling | Tailwind CSS v4 + CSS custom properties for theming |
| Typography | Geist Sans / Geist Mono (web fonts) |
| Export | Fully static HTML/JS/CSS (`output: "export"`) |
| Screenshot tooling | Playwright (dev-only, `scripts/`) |

## Credits

Tutorial content is original, informed by running the
[Keploy Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/)
with [samples-go/gin-mongo](https://github.com/keploy/samples-go/tree/main/gin-mongo)
and informed by the assignment PDF (DevRel candidate assignment — Next.js + MDX, Go
quickstart, dark/light toggle, callouts).
