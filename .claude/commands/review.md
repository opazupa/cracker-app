Review the code changes in this session (or the file/diff specified in $ARGUMENTS) against the project's standards.

Check each of the following and report findings with file + line references:

## TypeScript
- No `any` — ever. Use proper types from `src/types/index.ts`
- `strict: true` compliance — no implicit any, no unsafe assignments
- Correct use of domain types: `ProgramDay`, `Meal`, `Food`, `MealMultiplier`

## Domain correctness
- `calculateAmount(food)` = `amount × (mealMultiplierPercentage / 100) × dayMultiplier`, rounded to nearest 5
- `day4x` / `day5x` multipliers applied correctly per `ProgramDay`
- `unConvertible` foods not passed through conversion logic
- Meal `type: 'all'` vs `type: 'one-of'` handled correctly in rendering

## SSR safety
- All browser-only APIs (`localStorage`, `window`, `document`) guarded with `typeof window !== 'undefined'`
- No direct `localStorage` calls outside of `services/local-storage.ts`

## Test coverage
- New logic has co-located unit tests (`*.test.ts` / `*.test.tsx`)
- E2E tests updated in `e2e/app.spec.ts` if UI behaviour changed
- No untested branches in domain-critical functions

## Code conventions
- PascalCase component files; new components barrel-exported via `src/components/index.ts`
- camelCase service/util files; barrel-exported via `src/services/index.ts`
- Single quotes, trailing commas in all contexts
- Functional patterns; no unnecessary classes

## Error handling
- Explicit error handling — no silent `catch` blocks
- No swallowed promise rejections

## Quality
- No over-engineering or speculative abstractions
- No `any` workarounds or `// @ts-ignore`
- Flag all technical debt explicitly — do not paper over it

Security issues are Priority 1. For each issue found, explain why it's a problem and suggest a concrete fix.
