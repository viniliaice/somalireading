import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('school home shows the mission, stats and seven stages', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Baro Af-Soomaali', exact: true })).toBeVisible();
  await expect(page.getByText('Dhagaysi, Hadal, Akhris iyo Qoris').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Heerka 6 — Suugaan/ })).toBeVisible();
  await page.screenshot({ path: 'screenshots/school-home.png', fullPage: true });
});

test('a lesson opens with the seven-step cycle and grades work', async ({ page }) => {
  await page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ }).click();
  await page.getByRole('button', { name: /Salaanta/ }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Salaanta');
  await expect(page.getByRole('button', { name: /^Dhegayso/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /^Ku hadal/ })).toBeVisible();
  // Play the matching exercise to grade — match every pair.
  await page.getByRole('button', { name: /^Faham/ }).click();
  await page.getByRole('button', { name: 'As-salaamu calaykum', exact: true }).click();
  await page.getByRole('button', { name: 'Wa calaykumu salaam', exact: true }).click();
  await page.getByRole('button', { name: 'Iska warran?', exact: true }).click();
  await page.getByRole('button', { name: 'Waan fiicanahay', exact: true }).click();
  await page.getByRole('button', { name: 'Subax wanaagsan', exact: true }).first().click();
  await page.getByRole('button', { name: 'Subax wanaagsan', exact: true }).last().click();
  await expect(page.getByRole('status')).toContainText('Waa sax');
});

test('unapproved audio is reported honestly and never played', async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { audioPlayed: boolean }).audioPlayed = false;
    HTMLMediaElement.prototype.play = function () {
      (window as unknown as { audioPlayed: boolean }).audioPlayed = true;
      return Promise.resolve();
    };
  });
  await page.reload();
  await page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ }).click();
  await page.getByRole('button', { name: /Salaanta/ }).first().click();
  await page.getByRole('button', { name: /^Baro/ }).click();
  await page.getByRole('button', { name: 'Dhagayso', exact: true }).first().click();
  await expect(page.getByRole('status').first()).toContainText('Cod la ansixiyey weli lama hayo');
  expect(await page.evaluate(() => (window as unknown as { audioPlayed: boolean }).audioPlayed)).toBe(false);
});

test('pathways and diagnostic recommend a stage', async ({ page }) => {
  await page.getByRole('button', { name: /Jidka waxbarashada/ }).click();
  await expect(page.getByRole('heading', { name: /Hal marxalad, saddex bilow/ })).toBeVisible();
  await page.getByRole('button', { name: 'Dooro jidka B' }).click();
  await page.getByRole('button', { name: /Qaad tijaabada/ }).click();
  for (let i = 0; i < 10; i++) {
    // answer the first option every time — the flow must complete regardless
    await page.locator('.sc-options button').first().click();
    await page.getByRole('button', { name: /Su’aasha xigta|Dhammaystir/ }).click();
  }
  await expect(page.getByRole('heading', { level: 3 })).toContainText('Waxaad saxday');
});

test('stage assessment reports per-skill results', async ({ page }) => {
  await page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ }).click();
  await page.getByRole('button', { name: /Bilow tijaabada/ }).click();
  for (let i = 0; i < 8; i++) {
    await page.locator('.sc-options button').first().click();
    await page.getByRole('button', { name: /Su’aasha xigta|Dhammaystir/ }).click();
  }
  await expect(page.getByRole('status')).toContainText(/Waxaad saxday|Waxaad u baahan tahay/);
  await expect(page.locator('table').getByText('dhagaysi')).toBeVisible();
});

test('dashboard shows four skills and downloads a report', async ({ page }) => {
  await page.getByRole('main').getByRole('button', { name: /Horumarkayga/ }).click();
  await expect(page.getByRole('heading', { name: 'Bogga horumarka' })).toBeVisible();
  for (const skill of ['Dhagaysi', 'Hadal', 'Akhris', 'Qoris']) {
    await expect(page.getByText(skill, { exact: true }).first()).toBeVisible();
  }
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: /Soo dejiso warbixinta/ }).click();
  expect(await (await download).suggestedFilename()).toBe('warbixinta-horumarka.txt');
});

test('school progress survives refresh and does not touch phonics progress', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('baro-progress-v2', JSON.stringify({ lessons: {}, legacyCompleted: [1] })));
  await page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ }).click();
  await page.getByRole('button', { name: /Salaanta/ }).first().click();
  await page.getByRole('button', { name: /^Isticmaal/ }).click();
  await page.getByRole('button', { name: 'calaykumu salaam', exact: true }).click();
  await page.getByRole('button', { name: 'Hubi' }).click();
  await expect(page.getByRole('status')).toContainText('Waa sax');
  await page.reload();
  const school = await page.evaluate(() => JSON.parse(localStorage.getItem('baro-school-v1') || '{}'));
  expect(Object.keys(school.lessons || {}).length).toBeGreaterThan(0);
  const phonics = await page.evaluate(() => JSON.parse(localStorage.getItem('baro-progress-v2') || '{}'));
  expect(phonics.legacyCompleted).toEqual([1]);
});

test('school layout fits desktop, tablet and mobile with no overflow', async ({ page }) => {
  for (const size of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
    await page.setViewportSize(size);
    await page.goto('/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `home at ${size.width}`).toBe(true);
    await page.getByRole('button', { name: /Heerka 2 — Erayo iyo Weedho/ }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `stage at ${size.width}`).toBe(true);
    if (size.width === 390) await page.screenshot({ path: 'screenshots/school-mobile.png', fullPage: true });
  }
});

test('phonics experience is preserved at #/xaraf and linked from the school', async ({ page }) => {
  await page.getByRole('button', { name: /Xarfaha \(Heerka 1\)/ }).click();
  await expect(page.getByRole('heading', { name: 'Salam, saaxiib!' })).toBeVisible();
  await page.getByRole('link', { name: 'BARO AF-SOOMAALI' }).click();
  await expect(page.getByRole('heading', { name: 'Baro Af-Soomaali', exact: true })).toBeVisible();
});

test('lesson steps fit the screen — the body never scrolls', async ({ page }) => {
  await page.getByRole('button', { name: /Heerka 0 — Maqal iyo Hadal/ }).click();
  await page.getByRole('button', { name: /Salaanta/ }).first().click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Salaanta');
  for (const [w, h] of [[320, 568], [390, 844], [1280, 800]] as const) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(150);
    const fits = await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1);
    expect(fits, `lesson body must not scroll at ${w}x${h}`).toBe(true);
  }
  // the next-step footer works and keeps the fit guarantee
  await page.getByRole('button', { name: /Tallaabada xigta/ }).first().click();
  const fits2 = await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1);
  expect(fits2).toBe(true);
});
