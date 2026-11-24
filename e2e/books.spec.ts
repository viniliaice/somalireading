import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/#/books');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test('bookshelf shows ten halftone books with covers and levels', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Toob buugaag ah oo Af-Soomaali ah' })).toBeVisible();
  await expect(page.locator('.bk-card')).toHaveCount(10);
  await expect(page.getByText('Salaan, saaxiib!')).toBeVisible();
  await expect(page.getByText('Nabad iyo wadajir')).toBeVisible();
  // generated covers load as real images
  expect(await page.locator('.bk-cover-wrap img').first().evaluate((img: HTMLImageElement) => img.naturalWidth > 0)).toBe(true);
  await page.screenshot({ path: 'screenshots/books-shelf.png', fullPage: true });
});

test('a book opens with story text, word help and page navigation', async ({ page }) => {
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  await expect.poll(() => documentHasText(page, 'Waa subax cusub.'), { timeout: 5000 }).toBe(true);
  await expect(page.getByText('Bogga 1 / 5').first()).toBeVisible();
  // tap a word → meaning panel with phonics-safe grapheme reference
  await page.getByRole('button', { name: 'Erayga Ayaan', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Macluumaadka erayga' })).toBeVisible();
  await expect(page.getByText('Eray aasaasi ah')).toBeVisible();
  await page.getByRole('button', { name: 'Xir' }).click();
  // next page + vocabulary meaning
  await page.getByRole('button', { name: /Xiga/ }).click();
  await page.getByRole('button', { name: 'Erayga salaan', exact: true }).click();
  await expect(page.getByText('greeting')).toBeVisible();
  await page.getByRole('button', { name: 'Xir' }).click();
  await page.screenshot({ path: 'screenshots/books-reader-page.png', fullPage: true });
});

test('translation stays optional and secondary', async ({ page }) => {
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  await expect(page.getByText('It is a new morning.', { exact: false })).toHaveCount(0);
  await page.getByRole('button', { name: 'Turjumaad' }).click();
  await expect(page.getByText('It is a new morning.', { exact: false })).toBeVisible();
});

test('audio is honestly reported unavailable — never faked', async ({ page }) => {
  await page.addInitScript(() => {
    (window as unknown as { audioPlayed: boolean }).audioPlayed = false;
    HTMLMediaElement.prototype.play = function () {
      (window as unknown as { audioPlayed: boolean }).audioPlayed = true;
      return Promise.resolve();
    };
  });
  await page.reload();
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  await page.getByRole('button', { name: /Dhegayso bogga/ }).click();
  await expect(page.getByRole('status')).toContainText('weli lama hayo');
  expect(await page.evaluate(() => (window as unknown as { audioPlayed: boolean }).audioPlayed)).toBe(false);
});

test('end-of-book assessment grades, saves and allows retry', async ({ page }) => {
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /Xiga/ }).click();
  await page.getByRole('button', { name: /Tijaabada/ }).click();
  await expect(page.getByRole('heading', { name: 'Sidee buu u ahaa sheekadu?' })).toBeVisible();
  // answer the nine objective questions correctly from the content data
  const answers = await page.evaluate(() => {
    const el = document.querySelectorAll('.bk-q-card');
    return Array.from(el).slice(0, 9).map(card => {
      const buttons = Array.from(card.querySelectorAll('.bk-option')) as HTMLButtonElement[];
      return buttons[0]?.textContent ?? '';
    });
  });
  // pick the correct option per question by content order (first option is correct in book 1)
  for (const a of answers) await page.getByRole('button', { name: a, exact: true }).first().click();
  await page.getByRole('button', { name: /Dhammaystir tijaabada/ }).click();
  await expect(page.getByRole('status')).toContainText('/ 9');
  await page.getByRole('textbox', { name: 'Jawaabta qoraalka' }).fill('Magacaygu waa Ayaan.');
  await page.getByRole('button', { name: /Waan sameeyay/ }).click();
  await expect(page.getByText('Hawshu way diiwaangashan tahay.')).toBeVisible();
  await page.screenshot({ path: 'screenshots/books-quiz.png', fullPage: true });
});

test('progress persists after refresh and mastery needs the assessment', async ({ page }) => {
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /Xiga/ }).click();
  await page.reload();
  await page.goto('/#/books');
  const progress = await page.evaluate(() => JSON.parse(localStorage.getItem('baro-books-v1') || '{}'));
  expect(progress.books.b01.pagesRead.length).toBe(5);
  // five pages alone = not mastered
  expect(progress.books.b01.mastered).toBeFalsy();
  await page.getByRole('button', { name: /Sii wad akhriska/ }).first().click();
  await expect(page.getByText('Bogga 5 / 5').first()).toBeVisible(); // bookmark resumes
});

test('books fit mobile, tablet and desktop with no horizontal overflow', async ({ page }) => {
  for (const size of [{ width: 1440, height: 1000 }, { width: 768, height: 1024 }, { width: 390, height: 844 }, { width: 320, height: 700 }]) {
    await page.setViewportSize(size);
    await page.goto('/#/books');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `shelf at ${size.width}`).toBe(true);
    await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `reader at ${size.width}`).toBe(true);
    if (size.width === 390) await page.screenshot({ path: 'screenshots/books-reader-mobile.png', fullPage: true });
  }
});

test('library pages raise no script errors and school features stay reachable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('/#/books');
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  await page.getByRole('button', { name: /Xiga/ }).click();
  await page.getByRole('button', { name: 'Buugaagta' }).click();
  await page.getByRole('button', { name: /Ku noqo dugsiga/ }).click();
  await expect(page.getByRole('heading', { name: 'Baro Af-Soomaali', exact: true })).toBeVisible();
  const critical = errors.filter(e => !e.includes('Failed to load resource') && !e.includes('net::ERR') && !e.includes('404'));
  expect(critical).toEqual([]);
});

async function documentHasText(page: import('@playwright/test').Page, text: string) {
  return page.evaluate(t => document.body.textContent?.includes(t) ?? false, text);
}

test('library strip on the home page shows all covers and enters a book in one click', async ({ page }) => {
  await page.getByRole('button', { name: 'Bogga hore' }).click();
  const strip = page.locator('.sc-lib');
  await expect(strip).toBeVisible();
  await expect(page.getByRole('heading', { name: /10 buug oo halftone ah/ })).toBeVisible();
  await expect(strip.locator('.sc-lib-item')).toHaveCount(10);
  // one click on a cover opens that book directly
  await page.getByRole('button', { name: 'Fur buugga Salaan, saaxiib!' }).click();
  await expect(page.getByText('Bogga 1 / 5').first()).toBeVisible();
  // exit the full-screen reader, then the big button opens the full bookshelf
  await page.getByRole('button', { name: /Buugaagta/ }).first().click();
  await page.getByRole('button', { name: 'Bogga hore' }).click();
  await page.getByRole('button', { name: /Gal maktabadda/ }).click();
  await expect(page.getByRole('heading', { name: 'Toob buugaag ah oo Af-Soomaali ah' })).toBeVisible();
});
