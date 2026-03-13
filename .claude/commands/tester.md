Write tests for $ARGUMENTS following the project's testing conventions. Read the source file first, then generate comprehensive tests.

## Unit tests (Jest + Testing Library)

**File placement:** co-locate as `*.test.ts` / `*.test.tsx` next to the source file.

**Mocking rules (critical):**
- Use `jest.mock('...')` at the top — never reference external `const` variables inside factory functions (babel-jest hoists mocks before `const` declarations → TDZ error)
- Set return values in `beforeEach` via `jest.mocked(fn).mockReturnValue(...)`
- Use `jest.mocked(fn)` for typed mock access; assign to a named `const` for reuse

**Hooks:** use `renderHook` + `wrapper` for context-dependent hooks; wrap state mutations in `act()`

**Components:** use `render`, `screen`, `fireEvent` from `@testing-library/react`; `jest.clearAllMocks()` in `beforeEach`

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

**File:** `e2e/app.spec.ts` using the `AppPage` page object (`e2e/pages/AppPage.ts`)
- Add selectors to the `SEL` const; build locators in the constructor
- No `waitForTimeout` — use `waitFor({ state })` or check `aria-pressed` attribute
- Scope selectors to `.swiper-slide-active` for Swiper content
- Click `.nextui-checkbox-label`, not the hidden `<input>`
- No `{ force: true }` — always wait for the correct element state first

## Running and fixing tests

After writing the tests:
1. Run `yarn test -- --testPathPattern=<file>` for the specific unit test file, or `yarn test:e2e` for E2E
2. Read the output carefully — fix type errors, import issues, and failing assertions
3. Re-run until all tests pass
4. Run the full suite (`yarn test`) to confirm no regressions before finishing
