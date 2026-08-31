import { describe, expect, test } from '@playwright/test';

import { AppPage } from './pages/AppPage';

// Mirrors `calculateAmount` (src/hooks/useAppContext.tsx) so expected gram
// values dodge float-rounding noise instead of relying on hand-typed numbers.
const expectedGrams = (
  baseAmount: number,
  dayMultiplier: number,
  mealMultiplierPercentage = 100,
) =>
  Math.round(
    (baseAmount * (mealMultiplierPercentage / 100) * dayMultiplier) / 5,
  ) * 5;

describe('App — page load', () => {
  test('renders program status and all three meal slides', async ({ page }) => {
    const app = new AppPage(page);
    await app.goto();

    await expect(page.getByText('Crack it')).toBeVisible();
    await expect(page.locator('code').first()).toContainText('Day');

    await expect(page.getByText('morning').first()).toBeVisible();
    await expect(page.getByText('afternoon').first()).toBeVisible();
    await expect(page.getByText('evening').first()).toBeVisible();
  });
});

describe('App — day toggle & multiplier', () => {
  test('switching days and multiplier updates status labels and rendered food-gram amounts', async ({
    page,
  }) => {
    const app = new AppPage(page);
    await app.goto();
    await app.openMenu();

    // ─── day toggle ───
    await app.selectDay('1-3'); // deterministic baseline — programDay isn't persisted
    await expect(app.foodAmount('Pineapple')).toHaveText(
      `${expectedGrams(100, 1)}g Pineapple`,
    ); // 100g
    await expect(app.foodAmount('Banana')).toHaveText('120g Banana'); // no day multiplier defined

    await app.selectDay('4');
    await expect(app.foodAmount('Pineapple')).toHaveText(
      `${expectedGrams(100, 1.1)}g Pineapple`,
    ); // 110g
    await expect(app.foodAmount('Banana')).toHaveText('120g Banana'); // unchanged — no day4x

    await app.selectDay('5');
    await expect(app.foodAmount('Pineapple')).toHaveText(
      `${expectedGrams(100, 1.2)}g Pineapple`,
    ); // 120g
    await expect(app.foodAmount('Banana')).toHaveText('120g Banana'); // unchanged — no day5x

    // ─── meal multiplier ───
    await app.selectMultiplier('x2');
    await expect(app.foodAmount('Pineapple')).toHaveText(
      `${expectedGrams(100, 1.2, 200)}g Pineapple`,
    ); // 240g
    await expect(app.foodAmount('Banana')).toHaveText('240g Banana'); // multiplier applies even without a day multiplier

    await app.selectDay('1-3');
    await expect(app.foodAmount('Pineapple')).toHaveText(
      `${expectedGrams(100, 1, 200)}g Pineapple`,
    ); // 200g

    await app.closeMenu();
  });
});

describe('App — start date persistence', () => {
  test('start date persists across reload', async ({ page }) => {
    const app = new AppPage(page);
    await app.goto();
    await app.openMenu();

    await app.setStartDate('2025-01-01');
    await page.reload();
    await app.goto();
    await app.openMenu();
    await expect(app.dateInput).toHaveValue('2025-01-01');
    await app.closeMenu();
  });
});

describe('App — meal & replacement interactions', () => {
  test('checks a food, replaces it, then clears the replacement', async ({
    page,
  }) => {
    const app = new AppPage(page);
    await app.goto();

    await app.expandFirstMeal();
    await app.checkFirstFood();

    await app.openReplaceModal();
    await app.selectFirstReplacement();
    await app.clearFirstReplacement();
  });
});

describe('App — theme', () => {
  test('toggles dark mode', async ({ page }) => {
    const app = new AppPage(page);
    await app.goto();

    await app.toggleDarkMode();
  });
});
