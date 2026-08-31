## Unit tests (Jest + Testing Library)

**File placement:** co-locate as `*.test.ts` / `*.test.tsx` next to the source file.

**Mocking rules (critical):**
- Use `jest.mock('...')` at the top — never reference external `const` variables inside factory functions (babel-jest hoists mocks before `const` declarations → TDZ error)
- Set return values in `beforeEach` via `jest.mocked(fn).mockReturnValue(...)`
- Use `jest.mocked(fn)` for typed mock access; assign to a named `const` for reuse
- Use `jest.requireActual` to preserve untouched exports; `jest.requireMock` to reach mock instances mid-test
- Import mocked modules **after** `jest.mock(...)` calls, not before

**Hooks:** use `renderHook` + `wrapper` for context-dependent hooks; wrap state mutations in `act()`

**Components:** use `render`, `screen`, `fireEvent` from `@testing-library/react`; `jest.clearAllMocks()` in `beforeEach`; if `useAppContext` is used, wrap with `AppContextProvider` in `wrapper` option

**Time-dependent logic:** `jest.useFakeTimers()` + `jest.setSystemTime(new Date(...))` in `beforeEach`; restore with `jest.useRealTimers()` in `afterEach`

**localStorage:** `localStorage.clear()` in `beforeEach` (jsdom provides it)

**Structure:**
- Group related tests with ASCII section dividers: `// ─── section name ───`
- Use `it.each` for parameterised cases (amounts, ProgramDay multipliers, utility functions)
- Suppress React error boundary noise: `jest.spyOn(console, 'error').mockImplementation(() => {})`

**Domain coverage to prioritise:**
- All three `ProgramDay` values (`'1-3'`, `'4'`, `'5'`) for anything touching `calculateAmount`
- Both meal types (`'all'` and `'one-of'`)
- `unConvertible` foods handled correctly
- SSR-safe paths (simulate `typeof window === 'undefined'` where relevant)

## E2E tests (Playwright)

**Config:** `playwright.config.ts` — two projects (`chromium` desktop, `mobile-chromium` Pixel 5 emulation — both Chromium-engine, since CI only installs the `chromium` browser binary), auto-starts `yarn dev`, reuses server locally

**File:** `e2e/app.spec.ts` using the `AppPage` page object (`e2e/pages/AppPage.ts`)
- Add selectors to the `SEL` const; build locators in the constructor
- No `waitForTimeout` — use `waitFor({ state })` or check `aria-pressed` attribute
- Scope selectors to `.swiper-slide-active` for Swiper content, except gram-amount
  assertions — scope those to a uniquely-named food's containing list instead
  (see `SEL.eveningBreadFoodList`), since which slide is `.swiper-slide-active`
  depends on real wall-clock time of day
- Click `.nextui-checkbox-label`, not the hidden `<input>`
- No `{ force: true }` — always wait for the correct element state first
- NextUI Navbar toggle: `aria-pressed="true/false"` signals open/closed (no `aria-expanded`)
- `next-themes` sets a NextUI-generated class on `<html>` (not `data-theme`) for theme switching
- Tests are split into `describe('App — <facet>')` blocks, one focused `test()`
  each (page load / day toggle & multiplier / start date persistence / meal &
  replacement interactions / theme) — each `test()` gets a fresh browser
  context (fresh localStorage) automatically, so each needs its own `goto()`
  (+ `openMenu()` where relevant)

## Running and fixing tests

1. Run `yarn test -- --testPathPattern=<file>` for the specific unit test file, or `yarn test:e2e` for E2E
2. `e2e/` is linted/formatted by the same `yarn lint`/`yarn format` scripts as `src/` — run them before committing e2e changes
3. Read the output carefully — fix type errors, import issues, and failing assertions
4. Re-run until all tests pass
5. Run the full suite (`yarn test`) to confirm no regressions before finishing
