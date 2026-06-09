# Contributing to gkBlog

Thanks for your interest in contributing! 🎉

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- Node.js 22+

### Setup

1. **Fork** this repository (click the "Fork" button at the top right)
2. **Clone** your fork to your local machine:

   ```bash
   git clone https://github.com/<your_github_username>/gkBlog.git
   cd gkBlog
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Set up environment variables**:

   ```bash
   cp ./apps/gkBlog/.env.example ./apps/gkBlog/.env.local
   ```

   Edit `.env.local` with your MongoDB connection string and other values.

5. **Start the dev server**:

   ```bash
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`.

### Project Structure

```
apps/gkBlog/          # Main Next.js blog app
packages/
  remark-plugins/     # Custom remark plugins
  rehype-plugins/     # Custom rehype plugins
  tsconfig/           # Shared TypeScript configs
  eslint-config-*     # Shared ESLint configs
```

See [Project.md](Project.md) for a detailed directory structure and [CLAUDE.md](CLAUDE.md) for architecture documentation.

## Development Workflow

### Running Commands

```bash
pnpm dev          # Start dev server (all apps)
pnpm build        # Production build
pnpm lint         # Run linter
pnpm format       # Format code with Prettier
pnpm clean        # Clean build outputs
```

For single-workspace commands:

```bash
pnpm --filter gkblog lint:types    # TypeScript type check
pnpm --filter gkblog analyze       # Bundle analysis
```

### Code Style

- TypeScript for all new code
- Use the `cn()` utility from `src/lib/utils.ts` for conditional CSS classes
- Follow existing component patterns in `src/components/`
- Run `pnpm format` before committing

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(blog): add series navigation component
fix(styles): correct dark mode colors in code blocks
docs(readme): add deployment instructions
```

## Creating Blog Posts (Content Contributions)

Blog content lives in `apps/gkBlog/src/pages/blog/<slug>/index.mdx`. Each post is a folder with an MDX file:

```mdx
---
title: Your Post Title
description: "A brief description for SEO and previews"
date: "2024-01-01"
lang: en
tags:
  - tag1
  - tag2
category: Your Category
cover: https://your-cdn.com/cover.png
---

Post content in Markdown...
```

## Pull Request Guidelines

1. Create a feature branch from `main`
2. Make your changes
3. Ensure the project builds: `pnpm build`
4. Push and open a PR with a clear description
5. Link any related issues

---

如果您是中文贡献者，欢迎直接使用中文提交 issue 和 PR。
