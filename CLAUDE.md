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

## E2E Testing (Playwright)
- Config: `playwright.config.ts` — single Chromium project, auto-starts `yarn dev`, reuses server locally
- Tests: `e2e/app.spec.ts` — single flow test covering the whole app
- Page Object: `e2e/pages/AppPage.ts` — all selectors in `SEL` const, locators pre-built in constructor
- No `waitForTimeout` — use `waitFor({ state })` or `aria-pressed` attribute to detect menu open/closed
- No `{ force: true }` — always wait for the correct element state before clicking
- Swiper clips off-slide content; scope selectors to `.swiper-slide-active`
- NextUI Checkbox: click the `.nextui-checkbox-label`, not the hidden input
- NextUI Navbar toggle: `aria-pressed="true/false"` signals open/closed (no `aria-expanded`)
- `next-themes` sets a NextUI-generated class on `<html>` (not `data-theme`) for theme switching

## Unit Testing Patterns (Jest)
- Test files co-located: `*.test.ts` / `*.test.tsx` next to source files
- Component tests use `@testing-library/react`: `render`, `screen`, `fireEvent`
- Use `renderHook` + `wrapper` for context-dependent hooks; wrap state mutations in `act()`
- Mock modules with `jest.mock(...)` — use `jest.requireActual` to preserve untouched exports
- Import mocked modules **after** `jest.mock(...)` calls, not before
- Use `jest.mocked(fn)` for typed access to mocks; assign to a named const for reuse: `const mockFn = jest.mocked(fn)`
- Use `jest.requireMock('../module')` to reach mock instances mid-test when needed
- Browser APIs (`localStorage`) mocked by jsdom; call `localStorage.clear()` in `beforeEach`
- Time-dependent tests: `jest.useFakeTimers()` + `jest.setSystemTime(new Date(...))` in `beforeEach`; restore with `jest.useRealTimers()` in `afterEach`
- Suppress React error boundary noise with `jest.spyOn(console, 'error').mockImplementation(() => {})`, restore in the same test
- Use `jest.clearAllMocks()` in `beforeEach` for component tests that use mocked callbacks
- Use `it.each` for parameterized cases (see `roundToNearest5`, `getMealForTimeOfTheDay`, `getCurrentDay`)
- Group related tests with ASCII section dividers: `// ─── section name ───`
- Path alias `@/` → `src/` works in tests (mapped in jest.config.ts)

## Git Workflow
- Conventional commits enforced by commitlint (`feat:`, `fix:`, `chore:`, etc.)
- Pre-commit: lint-staged runs ESLint + Prettier on staged `src/` files
- Use `yarn commit` for interactive message builder
- Never skip hooks (`--no-verify`)

## SSR Safety
Always guard browser-only APIs with `typeof window !== 'undefined'`. See `services/local-storage.ts` for the pattern used throughout.
