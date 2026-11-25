import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.waitForLoadState('networkidle');
});

test('parents homepage explains the product and shows both prices', async ({ page }) => {
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Af-Soomaali');
  await expect(page.getByText('GOORTA WAALIDIINTA')).toBeVisible();
  await expect(page.getByText('Website access', { exact: true })).toBeVisible();
  await expect(page.getByText('Website + live lessons', { exact: true })).toBeVisible();
  await expect(page.getByText('$5.99')).toBeVisible();
  await expect(page.getByText('$25')).toBeVisible();
  await expect(page.getByText('Casharro toos ah oo macallin Soomaali ah')).toBeVisible();
  await expect(page.locator('.ph-cover img')).toHaveCount(10);
  const broken = await page.locator('.ph-cover img').evaluateAll(imgs => imgs.filter(i => (i as HTMLImageElement).naturalWidth === 0).length);
  expect(broken, 'every book cover must load').toBe(0);
});

test('the call to action enters the school', async ({ page }) => {
  await page.getByRole('link', { name: /Gal dugsi/ }).first().click();
  await expect(page.getByText('KU SOO DHAWOOW · DUGSIGA AF-SOOMAALIGA')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Baro Af-Soomaali', exact: true })).toBeVisible();
});

test('parents page fits phone and desktop with no horizontal overflow', async ({ page }) => {
  for (const size of [{ width: 390, height: 844 }, { width: 1280, height: 800 }] as const) {
    await page.setViewportSize(size);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => Promise.all(Array.from(document.images).map(i => i.decode().catch(() => undefined))));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `no overflow at ${size.width}`).toBe(true);
    await page.screenshot({ path: `screenshots/parents-home-${size.width}.png`, fullPage: true });
  }
});
