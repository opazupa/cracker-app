Scaffold a new React component called $ARGUMENTS following project conventions.

If the component purpose or props are unclear from the name alone, ask before generating.

## Steps

### 1. Create `src/components/$ARGUMENTS.tsx`
- Functional component with an explicit TypeScript `Props` interface — no `any`
- Single quotes, trailing commas
- Use NextUI components where appropriate
- If it reads browser APIs, guard with `typeof window !== 'undefined'`
- If it needs global state, import `useAppContext` from `@/hooks/useAppContext`

### 2. Create `src/components/$ARGUMENTS.test.tsx`
- Use `@testing-library/react`: `render`, `screen`, `fireEvent`
- If the component uses `useAppContext`, wrap with the `AppContextProvider` in a `wrapper` option
- At minimum cover: renders without crashing, key user interactions, any conditional rendering paths
- `jest.clearAllMocks()` in `beforeEach` if mocked callbacks are used
- Group tests with ASCII section dividers: `// ─── section name ───`

### 3. Update `src/components/index.ts`
- Add a named export: `export { default as $ARGUMENTS } from './$ARGUMENTS'`

## Checklist before finishing
- [ ] TypeScript compiles: `yarn build`
- [ ] Tests pass: `yarn test`
- [ ] No `any` types
- [ ] Barrel export added
- [ ] SSR guard in place if needed
