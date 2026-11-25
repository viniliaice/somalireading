import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('networkidle');
});

test('homepage explains the product and shows both exact prices', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Baro Af-Soomaali. Akhri. Hadal. Faham.');
  await expect(page.getByText('Learn Somali. Read confidently. Speak naturally.')).toBeVisible();
  await expect(page.getByText('Wax Ka Baro Af-Soomaaliga', { ignoreCase: true })).toBeVisible();
  // pricing — exactly the two plans with the exact amounts and USD
  await expect(page.getByRole('heading', { name: 'Website Access', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Website Access + Lessons', exact: true })).toBeVisible();
  await expect(page.locator('.ph-plan').nth(0)).toContainText('$5.99');
  await expect(page.locator('.ph-plan').nth(1)).toContainText('$25');
  await expect(page.locator('.ph-plan .ph-currency').first()).toHaveText('USD');
  await expect(page.getByText('Waqti lacag-bixinta weli lama go’aamin').or(page.getByText('Waqti lacag-bixinta weli lama go\'aamin'))).toBeVisible();
  await expect(page.locator('.ph-plan')).toHaveCount(2);
  await expect(page.locator('.ph-plan.featured')).toHaveCount(1); // $25 plan gets stronger emphasis
});

test('all navigation links are functional', async ({ page }) => {
  await page.getByRole('link', { name: 'Learn Somali' }).first().click();
  await expect(page.getByText('KU SOO DHAWOOW · DUGSIGA AF-SOOMAALIGA')).toBeVisible();
  await page.goto('/');
  await page.getByRole('link', { name: 'Reading Books' }).first().click();
  await expect(page.getByRole('heading', { name: 'Toob buugaag ah oo Af-Soomaali ah' })).toBeVisible();
  await page.goto('/');
  await page.getByRole('link', { name: 'Phonics' }).first().click();
  await expect(page.getByRole('heading', { name: 'Salam, saaxiib!' })).toBeVisible();
  await page.goto('/');
  await page.getByRole('link', { name: 'Somali Literature' }).first().click();
  await expect(page.getByRole('heading', { name: /Hadraawi/ }).first()).toBeVisible();
  await page.goto('/');
  await page.getByRole('link', { name: 'Speaking' }).first().click();
  await expect(page).toHaveURL(/#\/stage\//);
});

test('book cards link straight into the reader and all covers load', async ({ page }) => {
  await expect(page.locator('.ph-book')).toHaveCount(10);
  const broken = await page.locator('.ph-book img').evaluateAll(imgs => imgs.filter(i => (i as HTMLImageElement).naturalWidth === 0).length);
  expect(broken, 'every book cover must load').toBe(0);
  await page.getByRole('link', { name: /Akhri buugga/ }).first().click();
  await expect(page.getByText('Bogga 1 / 5').first()).toBeVisible();
});

test('checkout and account entry points open honestly without simulating payment', async ({ page }) => {
  await page.getByRole('button', { name: 'Hel Website Access', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('lama xidhin');
  await expect(page.getByRole('dialog')).toContainText('never simulates a payment');
  await expect(page.getByRole('dialog')).toContainText('$5.99');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Create Account' }).click();
  await expect(page.getByRole('dialog')).toContainText('akoon-yaraynta weli lama xidhin');
});

test('faq accordion works', async ({ page }) => {
  const q = page.getByRole('button', { name: /Waa maxay SomaliReading/ });
  await expect(q).toHaveAttribute('aria-expanded', 'true'); // first item open by default
  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: /Sideen ku bixin karaa lacagta/ }).click();
  await expect(page.getByText('Nidaamka lacag-bixinta weli lama dhammaystirin')).toBeVisible();
});

test('parents page fits phone and desktop with no horizontal overflow', async ({ page }) => {
  for (const size of [{ width: 390, height: 844 }, { width: 1280, height: 800 }] as const) {
    await page.setViewportSize(size);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
      document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
      return Promise.all(Array.from(document.images).map(i => i.decode().catch(() => undefined)));
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `no overflow at ${size.width}`).toBe(true);
    await page.screenshot({ path: `screenshots/parents-home-${size.width}.png`, fullPage: true });
  }
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.locator('#qiimaha').scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll('.rv').forEach(el => el.classList.add('in')));
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/parents-pricing-1280.png' });
});

test('homepage raises no critical console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(String(e)));
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: /Su'aalaha laga jawaabayo|Waa maxay farqiga/ }).first().click().catch(() => undefined);
  expect(errors).toEqual([]);
});
