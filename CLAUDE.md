# CLAUDE.md

## Project
Next.js 13 PWA — a meal planning/diet tracker ("Cracker App"). Users follow a program with cycling days (1-3, 4, 5) that affect food amounts. Single-page app, no backend.

## Commands
- `yarn dev` — start dev server
- `yarn build` — production build
- `yarn test` — run Jest (jsdom environment)
- `yarn test:watch` — Jest watch mode
- `yarn test:coverage` — Jest with coverage
- `yarn test:e2e` — Playwright E2E tests (headless Chromium)
- `yarn test:e2e:ui` — Playwright UI mode
- `yarn lint` — ESLint check
- `yarn format` — Prettier write
- `yarn commit` — Commitizen interactive commit (use this, not `git commit`)

## Architecture
- `src/pages/_app.tsx` — app shell, mounts all providers
- `src/pages/index.tsx` — only page; fetches meals via `getStaticProps`
- `src/hooks/useAppContext.tsx` — global state (programDay, mealMultiplier, calculateAmount)
- `src/services/meals.ts` — all static meal + conversion data
- `src/services/local-storage.ts` — SSR-safe localStorage wrapper (check `typeof window`)
- `src/types/index.ts` — all shared types
- `src/utils/index.ts` — pure utility functions
- `src/components/index.ts` — barrel export for all components

## Code Conventions
- **Components**: PascalCase files, barrel-exported via `components/index.ts`
- **Services/utils**: camelCase files, barrel-exported via `services/index.ts`
- **Types**: PascalCase (`ProgramDay`, `Meal`, `Food`)
- **Constants**: UPPER_SNAKE_CASE (`PROGRAM_DAYS`, `KEYS`)
- **Quotes**: single quotes everywhere (enforced by Prettier + ESLint)
- **Trailing commas**: required in all contexts
- **Strict TS**: `strict: true` — no implicit any

## Key Domain Concepts
- `ProgramDay`: `'1-3' | '4' | '5'` — cycles based on program start date
- `Food.amount` is in grams; `day4x`/`day5x` are multipliers for those days
- `mealMultiplierPercentage` scales all food amounts (default 100)
- `calculateAmount(food)` = `amount × (multiplier/100) × dayMultiplier`, rounded to nearest 5
- Meal `type: 'all'` means all components required; `type: 'one-of'` means one per category
- `unConvertible: true` on a food means it has no conversion multiplier

## Unit Testing
Full conventions in `/tester`. Key gotcha: **never reference external `const` variables inside `jest.mock()` factory functions** — babel-jest hoists mock calls before `const` declarations (TDZ error). Use `jest.fn()` in the factory and set return values in `beforeEach` via `jest.mocked(fn).mockReturnValue(...)`.

## Git Workflow
- Conventional commits enforced by commitlint (`feat:`, `fix:`, `chore:`, etc.)
- Pre-commit: lint-staged runs ESLint + Prettier on staged `src/` files
- Use `yarn commit` for interactive message builder
- Never skip hooks (`--no-verify`)

## SSR Safety
Always guard browser-only APIs with `typeof window !== 'undefined'`. See `services/local-storage.ts` for the pattern used throughout.
