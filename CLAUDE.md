# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.5 blog application using the App Router, TypeScript, and Tailwind CSS v4. The project includes markdown processing capabilities and search functionality but is currently in initial setup phase.

## Essential Commands

```bash
# Development
npm run dev        # Start development server with Turbopack

# Production
npm run build      # Build for production
npm run start      # Start production server

# Code Quality
npm run lint       # Run ESLint
```

## Architecture

### Tech Stack
- **Framework**: Next.js 15.3.5 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with Typography plugin
- **Markdown**: remark, remark-html, gray-matter
- **Search**: Fuse.js
- **Dates**: date-fns

### Directory Structure
- `/src/app/` - Next.js App Router pages and layouts
- `/posts/` - Blog post content (markdown files)
- `/public/` - Static assets

### Key Configuration
- **Path Alias**: `@/*` maps to `./src/*`
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js Core Web Vitals rules

### Blog-Specific Dependencies
The project includes these blog-related packages that need implementation:
- `gray-matter` - Front matter parsing
- `remark` & `remark-html` - Markdown to HTML
- `reading-time` - Post reading time calculation
- `feed` - RSS/Atom feed generation
- `fuse.js` - Fuzzy search

## Development Notes

When implementing blog functionality:
1. Markdown posts should go in `/posts/` directory
2. Use gray-matter for front matter parsing
3. Use remark for markdown processing
4. Implement search with Fuse.js
5. Generate RSS feeds with the feed package