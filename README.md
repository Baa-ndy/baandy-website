# Baandy

Trade homes, not money. A fairer way to travel.

## Stack

- Next.js 15 (App Router)
- React 19
- TypeScript (strict)
- Tailwind v4 (CSS-first config in `app/globals.css`)
- ESLint flat config + Prettier (with Tailwind class sorting)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start dev server             |
| `npm run build`     | Production build             |
| `npm run start`     | Run production build         |
| `npm run lint`      | Lint                         |
| `npm run typecheck` | TS check without emit        |
| `npm run format`    | Format with Prettier         |

## Structure

```
app/              Routes, layouts, global CSS
components/       Reusable UI
lib/              Utilities (cn, etc.)
public/           Static assets
```

Path alias: `@/*` maps to project root.

## Conventions

- No comments in code unless explicitly needed for context that can't be expressed in naming
- No mock data or placeholders — wire to real data sources, use TS interfaces for shape
- Surface theme tokens via CSS variables in `globals.css`, reference with `var(--color-...)`
- Prefer surgical edits over rewrites
