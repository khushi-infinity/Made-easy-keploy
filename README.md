# Test a Go App with Keploy

A single-page documentation site built with Next.js 16 and MDX. It contains an
original, beginner-friendly tutorial on recording and replaying integration
tests for a Go application with [Keploy](https://keploy.io), using the Gin +
MongoDB URL shortener quickstart
([samples-go/gin-mongo](https://github.com/keploy/samples-go/tree/main/gin-mongo)).

**Live site:** https://keploy-docs-site.vercel.app
**Repo:** https://github.com/khushi-infinity/Made-easy-keploy

This project is a Keploy DevRel candidate assignment.

## Preview

Full-page captures of the finished site in both themes, taken from the static
build. The theme toggle in the header persists the choice in `localStorage`
and defaults to the system preference.

Light mode:

![Screenshot of the tutorial site in light mode](docs/screenshots/screenshot-light.png)

Dark mode:

![Screenshot of the tutorial site in dark mode](docs/screenshots/screenshot-dark.png)

## What the tutorial covers

The MDX page walks a Go developer through:

1. What problem Keploy solves, and why replaying real API traffic is simpler
   than writing mocks by hand.
2. Prerequisites: Go, Docker, and the `gin-mongo` URL shortener sample app.
3. Record mode: running `keploy record` and exercising the API with `curl`.
4. The generated test suite: request/response pairs in `test-*.yml` and
   MongoDB data mocks in `mocks/`.
5. Test mode: replaying the suite with `keploy test`, reading failures, and
   fixing them with the `noise` field.
6. Seeing Keploy catch a deliberate regression, and what to do next.

## Implementation

- `app/page.mdx`: the tutorial, written in MDX.
- `components/callout.tsx`: info, tip, warning, and note callouts.
- `components/steps.tsx`: numbered step blocks.
- `components/flow-diagram.tsx`: a diagram contrasting record and test modes.
- `components/codeblock.tsx`: code block wrapper with a copy button.
- `components/toc.tsx`: "On this page" sidebar with scroll-spy highlighting.
- Dark and light mode with a toggle in the sticky header.
- Syntax highlighting via `rehype-highlight` at build time.
- Tailwind CSS v4 with CSS custom properties for theming.
- Keploy brand palette: charcoal text with signal orange accents, matching
  keploy.io.

## Project structure

```
keploy-docs-site/
├── app/
│   ├── layout.tsx        root layout, header, TOC sidebar, footer
│   ├── globals.css       Tailwind v4, theme tokens, code theme
│   └── page.mdx          the tutorial (MDX)
├── components/
│   ├── callout.tsx
│   ├── steps.tsx
│   ├── flow-diagram.tsx
│   ├── codeblock.tsx
│   ├── toc.tsx
│   └── theme-toggle.tsx
├── docs/screenshots/     full-page PNGs used by this README
├── scripts/              static server and screenshot tooling
├── next.config.ts        output: "export", static HTML in out/
└── package.json
```

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production build

The site is fully static (`output: "export"` in `next.config.ts`):

```bash
npm run build
node scripts/serve-static.mjs
```

The server serves `out/` at http://localhost:3333.

### Regenerate the README screenshots

```bash
npm run build
npm run screenshot:readme
```

This captures full-page PNGs of the site in light and dark mode and writes
them to `docs/screenshots/`.

## Deploy to Vercel

The repo is already connected to Vercel, so pushes to `main` deploy
automatically. To deploy manually:

```bash
npm i -g vercel
vercel --prod
```

Or import the repo at [vercel.com/new](https://vercel.com/new) with the
default Next.js settings. No environment variables are needed.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16, App Router |
| Content | MDX with `remark-gfm` and `rehype-highlight` |
| Styling | Tailwind CSS v4 with CSS custom properties |
| Fonts | Geist Sans and Geist Mono |
| Output | Static HTML, CSS, and JS |
| Tooling | Playwright for README screenshots |

## Credits

Tutorial content is original, written after running the
[Keploy Gin + MongoDB quickstart](https://keploy.io/docs/quickstart/samples-gin/).
