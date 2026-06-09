# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.2] — 2025-06

### Added

- Hash table tutorial article with code examples
- Graph data structure tutorial article with code examples
- Social anxiety & college life article (大学生活记录 series)
- Binary tree implementation tutorial article with code examples
- Stack & queue implementation tutorial article with code examples

### Changed

- Upgraded to Next.js 15.3.1
- Upgraded to React 19.1.0
- Upgraded to Tailwind CSS 3.4
- Upgraded to pnpm 10.10.0
- Upgraded to Turbo 2.5.2
- Upgraded to Prisma 6.7.0

## [2.1] — 2025-02

### Added

- Series navigation component (prev/next post within a series)
- Focus mode (distraction-free reading)
- Reading progress bar
- Emoji reaction system (CLAP / THINK / AMAZED)
- Share tracking (Twitter / Clipboard)
- Comment barrage (Twikoo integration)
- Content activity feed (24h rolling window)
- New posts indicator (14-day window)
- Stats page with charts (heatmap, pie, bar, tag cloud)
- Quick access navigation panel
- Keyboard shortcuts overlay
- Blue-green Docker deployment support

### Changed

- Migrated blog posts from flat files to folder-per-post structure (`blog/<slug>/index.mdx`)
- Refactored content metadata into centralized `src/lib/meta.ts` with JSONata transforms
- Reorganized component directory structure (layouts, mdx, sections, sidebar, analytics)

## [2.0] — 2024-10

### Added

- Initial public release
- Next.js 14 with Pages Router
- MDX content with custom remark/rehype plugins
- Tailwind CSS with dark mode and accent color system
- Prisma + MongoDB for content metadata (views, shares, reactions)
- Dynamic OG image generation via `@vercel/og`
- RSS feed generation
- Sitemap generation via `next-sitemap`
- Twikoo comment system integration
- Baidu Analytics & Google Analytics integration
- Docker deployment support
- Vercel one-click deploy
- Monorepo structure with Turborepo + pnpm workspaces
- Custom MDX components (Headings with anchors, Code with file icons, Callouts, Diffs)
