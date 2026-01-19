# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Warp is a monorepo-based React component library and design system using Turborepo with pnpm workspaces.

## Commands

```bash
# Development (all packages)
pnpm dev

# Development (specific app)
pnpm dev --filter=docs    # Docs site on port 3001
pnpm dev --filter=web     # Web app on port 3000

# Build
pnpm build
pnpm build --filter=@warp/react

# Linting and type checking
pnpm lint
pnpm check-types

# Format code
pnpm format
```

## Architecture

### Package Structure

- **`@warp/core`** - Platform-agnostic theme system (palette, typography, spacing, breakpoints, transitions, z-index). Exports types and default theme tokens.
- **`@warp/react`** - Web React components with Tailwind CSS styling. Depends on `@warp/core` for theme types.
- **`@warp/react-native`** - React Native components (mobile)
- **`@warp/tailwind-config`** - Shared Tailwind v4 configuration
- **`@warp/eslint-config`** - Shared ESLint configuration
- **`@warp/typescript-config`** - Shared TypeScript configurations

### Apps

- **`docs`** - Next.js documentation site showcasing components
- **`web`** - Next.js demo application
- **`mobile`** - React Native application

### Theme System

The theme system uses CSS custom properties for runtime theming:

1. **`@warp/core`** defines theme structure and default values (palette colors, typography scales, etc.)
2. **`@warp/react`** provides `ThemeProvider` which:
   - Manages light/dark/system mode
   - Updates CSS variables via `updateThemeCSSVariables()`
   - Persists preferences to localStorage
3. **Apps define CSS variables** in `globals.css` using `@theme` directive (Tailwind v4) and `:root`/`.dark` overrides

Theme variable naming convention:
- `--palette-*` - Raw palette values (e.g., `--palette-error-main: 0 84.2% 60.2%`)
- `--color-*` - Tailwind theme colors (e.g., `--color-error: hsl(var(--palette-error-main))`)

### Component Pattern

Components in `@warp/react` follow this pattern:
- Located in `packages/react/src/components/{name}/`
- Use `cn()` utility (clsx + tailwind-merge) for class composition
- Export component, props type, and variant types from index.ts
- Use `"use client"` directive for client-side interactivity

### Tailwind v4

This project uses Tailwind CSS v4 with a hybrid JS + CSS approach:
- `@warp/tailwind-config` defines colors referencing CSS variables (e.g., `hsl(var(--palette-error-main) / <alpha-value>)`)
- `globals.css` defines actual values in `:root` and `.dark` for runtime theming
- Colors support opacity modifiers (e.g., `bg-error/10`) via the `<alpha-value>` pattern

## Design Philosophy

Inspired by **Mantine**, **shadcn/ui**, and **Material UI**. Key principles:
- Keep components lightweight and simple
- Maximize customizability
- Mantine's component API is the primary reference for prop naming and patterns
- `@warp/react` and `@warp/react-native` components should look visually similar and share similar APIs

### Styling
- All styling via Tailwind (web) and NativeWind (mobile) - no custom CSS
- `globals.css` should only contain theme/design tokens, not component styles

### Docs App
- The docs app is built with Warp + Tailwind CSS (dogfooding)
- Always use `@warp/react` components when available - don't create custom versions
- Extend Warp components with additional Tailwind classes when needed

## Code Conventions

### Imports
- Package/npm imports first, then local imports below (separated by blank line)
- Alphabetize imports within each group when order doesn't affect functionality

### TypeScript
- Never use `any` type - use `unknown`, generics, or proper types instead
