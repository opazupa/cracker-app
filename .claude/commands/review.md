Review the code changes in this session (or the file/diff specified in $ARGUMENTS) against the project's standards.

Check each of the following and report findings with file + line references:

@.claude/commands/shared/conventions.md

@.claude/commands/shared/domain.md

## Domain correctness
- `calculateAmount(food)` applied correctly — check multipliers per `ProgramDay`
- `unConvertible` foods not passed through conversion logic
- Meal `type: 'all'` vs `type: 'one-of'` handled correctly in rendering

## Test coverage
- New logic has co-located unit tests (`*.test.ts` / `*.test.tsx`)
- E2E tests updated in `e2e/app.spec.ts` if UI behaviour changed
- No untested branches in domain-critical functions

## Error handling
- Explicit error handling — no silent `catch` blocks
- No swallowed promise rejections

## Quality
- No over-engineering or speculative abstractions
- No `any` workarounds or `// @ts-ignore`
- Flag all technical debt explicitly — do not paper over it

Security issues are Priority 1. For each issue found, explain why it's a problem and suggest a concrete fix.
