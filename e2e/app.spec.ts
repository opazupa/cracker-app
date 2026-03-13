import { expect, test } from '@playwright/test';

import { AppPage } from './pages/AppPage';

test('full app flow', async ({ page }) => {
  const app = new AppPage(page);

  await app.goto();

  // ─── page loaded ───
  await expect(page.getByText('Crack it')).toBeVisible();
  await expect(page.locator('code').first()).toContainText('Day');

  // ─── meal slides ───
  await expect(page.getByText('morning').first()).toBeVisible();
  await expect(page.getByText('afternoon').first()).toBeVisible();
  await expect(page.getByText('evening').first()).toBeVisible();

  // ─── day toggle ───
  await app.openMenu();
  await app.selectDay('4');
  await app.selectDay('5');
  await app.selectDay('1-3');

  // ─── meal multiplier ───
  await app.selectMultiplier('x2');

  // ─── start date persists across reload ───
  await app.setStartDate('2025-01-01');
  await page.reload();
  await app.goto();
  await app.openMenu();
  await expect(app.dateInput).toHaveValue('2025-01-01');
  await app.closeMenu();

  // ─── meal interaction ───
  await app.expandFirstMeal();
  await app.checkFirstFood();

  // ─── replace food + clear replacement ───
  await app.openReplaceModal();
  await app.selectFirstReplacement();
  await app.clearFirstReplacement();

  // ─── dark mode ───
  await app.toggleDarkMode();
});
