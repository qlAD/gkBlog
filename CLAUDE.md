# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

- **Monorepo**: Turborepo + pnpm workspaces (`apps/*`, `packages/*`)
- **Framework**: Next.js 15 (Pages Router), React 19, TypeScript
- **Styling**: Tailwind CSS 3 with `tailwindcss-accent` (violet/blue), `@headlessui/tailwindcss`, class-based dark mode
- **Content**: MDX with custom remark/rehype plugins
- **Database**: MongoDB via Prisma ORM (content metadata: views, shares, reactions)
- **Package manager**: pnpm 10

## Commands

```bash
pnpm dev          # Start all apps in dev mode (runs prisma generate first)
pnpm build        # Build all apps (runs prisma generate first)
pnpm lint         # Lint all apps
pnpm format       # Format all files with Prettier
pnpm start        # Start production server
pnpm clean        # Clean all build outputs
```

Run commands for a single workspace from root: `pnpm --filter gkblog <script>`. Common scripts inside `apps/gkBlog`:
- `db:generate` — `prisma generate`
- `lint:types` — `tsc --noEmit`
- `analyze` — build with `@next/bundle-analyzer` (set `ANALYZE=true`)

## Architecture

### Monorepo structure

```
apps/gkBlog/          # Main Next.js blog app
packages/
  remark-plugins/     # Custom remark plugins (frontmatter, layout, strict mode)
  rehype-plugins/     # Custom rehype plugins (code attributes, inline highlights)
  tsconfig/           # Shared TypeScript config (base.json, nextjs.json)
  eslint-config-*     # Shared ESLint configs
```

### Content model

Blog posts live as directories under `src/pages/blog/<slug>/index.mdx`. Each post is a self-contained folder with its MDX file. Frontmatter is parsed at build time via `front-matter` package, with the schema defined in `TPostFrontMatter` ([src/types/index.ts](apps/gkBlog/src/types/index.ts)). Key fields: `title`, `date`, `tags`, `category`, `cover`, `series`, `seriesOrder`, `lang`.

Other content types (pages, TILs, essays, albums) follow the same pattern under `src/pages/` — each MDX file becomes a Next.js page route.

**Blog post creation workflow**: Create a folder `src/pages/blog/<slug>/` containing `index.mdx` with YAML frontmatter. Images referenced in `cover` should point to the CDN (`cdn.qladgk.com`).

### Data flow

1. **Posts**: Filesystem read → `front-matter` parsing → sorted by date. Logic in [src/lib/posts.ts](apps/gkBlog/src/lib/posts.ts). Aggregations by category/tag available.
2. **Series**: Posts declare `series` + `seriesOrder` in frontmatter. Centralized config in [src/data/series.ts](apps/gkBlog/src/data/series.ts) overrides auto-extracted metadata (slug, description, cover, ordering). Logic in [src/lib/series.ts](apps/gkBlog/src/lib/series.ts).
3. **Content metadata** (views, shares, reactions): Stored in MongoDB via Prisma, keyed by content slug. API routes under `src/pages/api/` handle CRUD. Session tracking uses hashed IP + salt ([src/helpers/server.ts](apps/gkBlog/src/helpers/server.ts)).
4. **RSS**: Generated at build time via [src/lib/rss.ts](apps/gkBlog/src/lib/rss.ts), served at `/rss.xml`.

### Provider hierarchy

Wrapped in `_app.tsx` → [src/providers/index.tsx](apps/gkBlog/src/providers/index.tsx):

```
FramerMotionProvider
  └─ ThemeProvider (next-themes, class-based dark mode)
       └─ FocusModeProvider
            └─ ColorAccentProvider (violet/blue via tailwindcss-accent)
                 └─ GlobalStateProvider
                      └─ MDXProvider (custom component overrides)
```

### MDX rendering pipeline

Next.js config ([next.config.mjs](apps/gkBlog/next.config.mjs)) wires MDX through `@next/mdx` with:

**Remark plugins** (parse phase):
- `remark-frontmatter` / `remark-gfm` / `remark-math`
- `withFrontMatter` — custom, strips frontmatter from rendered output
- `withStrict` — custom
- `withLayout` — custom, applies layout wrapper

**Rehype plugins** (HTML transform phase):
- `rehype-prism-plus` — syntax highlighting
- `rehype-katex` — math rendering
- `withInlineHighlights` — custom
- `withCodeAttributes` — custom

**Custom MDX components** ([src/components/mdx/custom-components/index.tsx](apps/gkBlog/src/components/mdx/custom-components/index.tsx)) override: `a`, `h2`, `h3`, `hr`, `pre`, `table`.

`h2`/`h3` auto-generate slug IDs and anchor links with hashtag icons. `pre` wraps code blocks with file-type icons via `formatLang()` in [src/helpers/mdx.tsx](apps/gkBlog/src/helpers/mdx.tsx).

### Page layout system

Uses the Next.js Pages Router pattern with per-page layouts. `_app.tsx` checks for `Component.getLayout` — if defined, uses it; otherwise wraps in `WithNavigationFooter` (sidebar nav + footer). Pages can opt into `?simpleLayout` query param for minimal layout.

### API routes (Pages Router API)

| Route | Purpose |
|---|---|
| `api/content/[slug]` | GET content metadata (views, shares, reactions) |
| `api/content/latest` | Recent posts (14-day window) |
| `api/content/index` | All content meta aggregation |
| `api/activity/index` | Last 24h activity feed |
| `api/reactions/[slug]` | POST reactions |
| `api/shares/[slug]` | POST shares |
| `api/views/[slug]` | POST views |
| `api/categories` | List categories |
| `api/tags` | List tags |
| `api/og-page` / `api/og-post` | Dynamic OG image generation via `@vercel/og` |

### Key patterns

- **`cn()` utility** ([src/lib/utils.ts](apps/gkBlog/src/lib/utils.ts)): `clsx` + `tailwind-merge` wrapper, always use for conditional classes
- **Session tracking**: `getSessionId()` hashes `x-forwarded-for` IP + `SALT_IP_ADDRESS` for anonymous analytics
- **Reactions**: Three types — `CLAPPING`, `THINKING`, `AMAZED`. Per-session caps in [src/constants/app.ts](apps/gkBlog/src/constants/app.ts)
- **JSONata**: Used for Prisma query result transformation in [src/lib/meta.ts](apps/gkBlog/src/lib/meta.ts)
- **Route aliases**: `@/*` maps to `src/*`, `@public/*` maps to `public/*`
- **Images**: `unoptimized: true` in Next config — all images served from external CDN

### Styling conventions

- Tailwind utility classes preferred; custom CSS in `src/styles/` for complex components
- Dark mode via `dark:` prefix (class-based strategy)
- Focus mode variant `fm:` for focus-mode-specific styles
- `bg-grid` utility for grid background patterns
- Heading anchor links hidden by default, visible on group hover

### Prisma + MongoDB

Schema at [prisma/schema.prisma](apps/gkBlog/prisma/schema.prisma). Main model: `ContentMeta` (slug, type, title). Related: `View`, `Share`, `Reaction` with session-based dedup. Always run `prisma generate` after schema changes — Turbo pipeline runs it automatically before `dev`/`build`.

### Deployment

- **Vercel**: Auto-deploys from GitHub main branch
- **Docker**: `docker compose build && docker compose up -d`. Blue-green deployment pattern for zero-downtime updates on domestic servers.
- **Node.js**: `pnpm install && pnpm build && pnpm start` (requires Node 22+)
