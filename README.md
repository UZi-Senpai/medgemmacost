# MedGemma Hosting Guide

A single-page React site presenting the **MedGemma Hosting Guide — Cloud vs. Own Hardware**,
with a light theme, blue-neon gradient accents, and a live **rent-vs-buy break-even calculator**.

Built with **Vite + React 18**. Deploys to **Vercel** in one click (zero config).

## Quick start

```bash
npm install
npm run dev      # local dev server → http://localhost:5173
```

Build for production:

```bash
npm run build    # outputs to ./dist
npm run preview  # preview the production build locally
```

## One-click deploy to Vercel

You have two options:

### Option 1 — Vercel Dashboard (no CLI)

1. Push this folder to a GitHub/GitLab/Bitbucket repo.
2. Go to <https://vercel.com/new> and **Import** the repo.
3. Vercel auto-detects Vite. Defaults are already correct:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Done in ~30 seconds.

`vercel.json` is included, so even if auto-detect fails the settings are locked in.

### Option 2 — Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

## Project structure

```
├── index.html              # HTML entry (title, meta, fonts)
├── vercel.json             # Vercel config (Vite preset)
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg         # Neon-gradient "M" favicon
└── src/
    ├── main.jsx            # React entry
    ├── index.css           # Light theme + blue-neon gradient design system
    ├── App.jsx             # All guide content, rendered into sections
    └── components/
        ├── Nav.jsx
        ├── Section.jsx
        ├── DataTable.jsx
        ├── Callout.jsx
        └── BreakEvenCalculator.jsx   # Interactive rent-vs-buy calculator
```

## Editing the content

All guide copy lives in **`src/App.jsx`** as section components. Each table is a
`<DataTable columns={[...]} rows={[...]} />` — edit the arrays to tweak data.

The **break-even calculator** presets (rental rates + hardware costs) live at the top of
`src/components/BreakEvenCalculator.jsx`.

---

*Prepared July 2026. GPU prices move fast; treat figures as current-but-approximate.*
