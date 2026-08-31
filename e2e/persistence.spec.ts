import { Page, test } from '@playwright/test';

import { AppPage } from './pages/AppPage';

const COMPLETED_MEALS_KEY = 'cracker.app.completed_meals';
const todayISO = () => new Date().toISOString().slice(0, 10);

async function seedCompletedMeals(page: Page, date: string, names: string[]) {
  await page.addInitScript(
    ({ key, value }) => localStorage.setItem(key, value),
    { key: COMPLETED_MEALS_KEY, value: JSON.stringify({ date, names }) },
  );
}

// ─── meal multiplier persists across reload ───

test('meal multiplier selection persists across a page reload', async ({
  page,
}) => {
  const app = new AppPage(page);
  await app.goto();
  await app.openMenu();

  await app.selectMultiplier('x2');

  await page.reload();
  await app.goto();
  await app.expectMultiplier('x2');
});

// ─── program day is derived, not persisted ───

test('a manually selected program day reverts to the date-derived value after reload', async ({
  page,
}) => {
  const app = new AppPage(page);
  await app.goto();

  // Fresh context => start date defaults to "today" => day is always '1-3'
  await app.expectDay('1-3');

  await app.openMenu();
  await app.selectDay('4');

  await page.reload();
  await app.goto();

  // programDay is re-derived from start date on every mount (useAppContext.tsx),
  // so the manual selection above is not persisted.
  await app.expectDay('1-3');
});

// ─── completed-meals persistence & date-scoped expiry ───

test('completed meal count persists across a reload on the same day', async ({
  page,
}) => {
  const app = new AppPage(page);
  await seedCompletedMeals(page, todayISO(), ['Porridge', 'Bread']);

  await app.goto();
  await app.expectMealCount(2, 5);

  await page.reload();
  await app.goto();
  await app.expectMealCount(2, 5);
});

test('completed meal count resets when the stored record is from a previous day', async ({
  page,
}) => {
  const app = new AppPage(page);
  await seedCompletedMeals(page, '2000-01-01', ['Porridge']);

  await app.goto();
  await app.expectMealCount(0, 5);
});
