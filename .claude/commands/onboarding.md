Give a structured onboarding tour of this codebase to a new contributor.

## 1. What it does
Cracker App: a Next.js 13 PWA for meal planning on a diet program. Users follow a program with cycling days (`'1-3'`, `'4'`, `'5'`) that affect food portion sizes. Single-page app, no backend.

## 2. Core domain concepts
Explain each concept clearly for a new contributor:

@.claude/commands/shared/domain.md

## 3. Architecture walkthrough
Walk through each key file and its single responsibility:
- `src/pages/_app.tsx` — app shell, mounts all providers
- `src/pages/index.tsx` — only page; fetches meals via `getStaticProps`
- `src/hooks/useAppContext.tsx` — global state (programDay, mealMultiplier, calculateAmount)
- `src/services/meals.ts` — all static meal + food data
- `src/services/local-storage.ts` — SSR-safe localStorage wrapper
- `src/types/index.ts` — all shared types
- `src/utils/index.ts` — pure utility functions
- `src/components/index.ts` — barrel export for all components

## 4. Development workflow
Cover the key commands and why they exist:
- `yarn dev` / `yarn build` — dev and production
- `yarn test` / `yarn test:e2e` — Jest unit tests + Playwright E2E
- `yarn commit` — Commitizen interactive conventional commit (never `git commit` directly)
- Pre-commit hooks run ESLint + Prettier via lint-staged — never `--no-verify`

## 5. Code conventions & SSR safety

@.claude/commands/shared/conventions.md

After the tour, invite the contributor to ask questions about any specific area.
