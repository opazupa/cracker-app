## TypeScript
- No `any` — ever. Use proper types from `src/types/index.ts`
- `strict: true` compliance — no implicit any, no unsafe assignments
- Correct use of domain types: `ProgramDay`, `Meal`, `Food`, `MealMultiplier`

## Code conventions
- PascalCase component files; new components barrel-exported via `src/components/index.ts`
- camelCase service/util files; barrel-exported via `src/services/index.ts`
- Constants: UPPER_SNAKE_CASE (`PROGRAM_DAYS`, `KEYS`)
- Single quotes, trailing commas in all contexts
- Functional patterns; no unnecessary classes

## SSR safety
- All browser-only APIs (`localStorage`, `window`, `document`) guarded with `typeof window !== 'undefined'`
- No direct `localStorage` calls outside of `services/local-storage.ts`
