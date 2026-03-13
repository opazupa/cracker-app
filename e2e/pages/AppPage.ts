import { expect, Locator, Page } from '@playwright/test';

// ─── selectors ───

const SEL = {
  // navbar
  menuToggle: '[aria-label="toggle-menu"]',
  menuToggleOpen: '[aria-label="toggle-menu"][aria-pressed="true"]',
  menuToggleClosed: '[aria-label="toggle-menu"][aria-pressed="false"]',
  menuDateInput: 'input[type="date"]',
  multiplierBtn: /x meal/i,

  // program status indicators
  anyCode: 'code',
  dayCode: (day: string) => `code:has-text("Day ${day}")`,
  multiplierCode: (x: string) => `code:has-text("${x}")`,

  // active swiper slide
  activeSlide: '.swiper-slide-active',
  activeCollapseTitle: '.swiper-slide-active .nextui-collapse-title',
  activeCheckboxLabel: '.swiper-slide-active .nextui-checkbox-label',
  activeCheckboxInput: '.swiper-slide-active input[type="checkbox"]',

  // modal — ReplaceModal renders <code>replace</code> for each option via CodeLink
  replacingHeader: 'Replacing:',
  modalReplacementBtn: 'replace',

  // after replacement: original span gets .replaced; clear button swaps 👉 → ❌
  activeReplaced: '.swiper-slide-active .replaced',
  activeClearReplacementBtn: '.swiper-slide-active',
} as const;

// ─── page object ───

export class AppPage {
  readonly page: Page;

  // re-usable locators
  readonly html: Locator;
  readonly menuToggle: Locator;
  readonly dateInput: Locator;
  readonly activeCollapseTitle: Locator;
  readonly activeCheckboxLabel: Locator;
  readonly activeCheckboxInput: Locator;
  readonly activeReplaceBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.html = page.locator('html');
    this.menuToggle = page.locator(SEL.menuToggle);
    this.dateInput = page.locator(SEL.menuDateInput);
    this.activeCollapseTitle = page.locator(SEL.activeCollapseTitle).first();
    this.activeCheckboxLabel = page.locator(SEL.activeCheckboxLabel).first();
    this.activeCheckboxInput = page.locator(SEL.activeCheckboxInput).first();
    this.activeReplaceBtn = page
      .locator(SEL.activeSlide)
      .getByText('👉')
      .first();
  }

  // ─── navigation ───

  async goto() {
    await this.page.goto('/');
    // Wait past the random spinner delay; Program renders <code>Day …</code> once loaded
    await this.page.locator(SEL.anyCode).first().waitFor({ timeout: 12_000 });
  }

  // ─── navbar menu ───

  async openMenu() {
    await this.menuToggle.click();
    // aria-pressed="true" is set on the toggle once the collapse animation starts;
    // then wait for the date input to be fully interactive
    await this.page.locator(SEL.menuToggleOpen).waitFor();
    await this.dateInput.waitFor({ state: 'visible' });
  }

  async closeMenu() {
    await this.menuToggle.click();
    // aria-pressed="false" is set once the collapse is fully closed and no longer
    // intercepts pointer events on the page content below
    await this.page.locator(SEL.menuToggleClosed).waitFor();
  }

  // ─── controls ───

  async selectDay(day: '1-3' | '4' | '5') {
    await this.page.getByRole('button', { name: day }).click();
    await expect(this.page.locator(SEL.dayCode(day))).toBeVisible();
  }

  async selectMultiplier(label: string) {
    await this.page.getByRole('button', { name: SEL.multiplierBtn }).click();
    await this.page.getByText(label, { exact: true }).click();
    await expect(this.page.locator(SEL.multiplierCode(label))).toBeVisible();
  }

  async setStartDate(date: string) {
    await this.dateInput.fill(date);
  }

  // ─── meal interactions ───

  async expandFirstMeal() {
    await this.activeCollapseTitle.click();
    // Wait for the collapse content (checkbox label) to become visible
    await this.activeCheckboxLabel.waitFor({ state: 'visible' });
  }

  async checkFirstFood() {
    await expect(this.activeCheckboxInput).not.toBeChecked();
    // Click the label — the visible click target for a NextUI Checkbox
    await this.activeCheckboxLabel.click();
    await expect(this.activeCheckboxInput).toBeChecked();
  }

  async openReplaceModal() {
    await this.activeReplaceBtn.click();
    await expect(
      this.page.getByText(SEL.replacingHeader).first(),
    ).toBeVisible();
  }

  /** Clicks the first replacement option and waits for the modal to close. */
  async selectFirstReplacement() {
    await this.page
      .getByText(SEL.modalReplacementBtn, { exact: true })
      .first()
      .click();
    // Selecting a replacement calls setVisible(false) which hides the modal
    await this.page
      .getByText(SEL.replacingHeader)
      .first()
      .waitFor({ state: 'hidden' });
    // The active food item now shows the replacement (strikethrough on original)
    await expect(this.page.locator(SEL.activeReplaced).first()).toBeVisible();
  }

  /**
   * Clicks the ❌ reset button on the first replaced food item, reverting it
   * back to its original ingredient.
   */
  async clearFirstReplacement() {
    await this.page
      .locator(SEL.activeClearReplacementBtn)
      .getByText('❌')
      .first()
      .click();
    // Strikethrough span should be gone — original food is active again
    await expect(
      this.page.locator(SEL.activeReplaced).first(),
    ).not.toBeVisible();
    // ❌ reverts to 👉, confirming the reset
    await expect(this.activeReplaceBtn).toBeVisible();
  }

  // ─── theme ───

  async toggleDarkMode() {
    const before = await this.html.getAttribute('class');
    await this.page.getByRole('switch').click();
    await expect(async () => {
      expect(await this.html.getAttribute('class')).not.toBe(before);
    }).toPass({ timeout: 3_000 });
  }
}
