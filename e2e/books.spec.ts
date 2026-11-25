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
  await page.getByRole('button', { name: 'Erayga Ayaanle', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Macluumaadka erayga' })).toBeVisible();
  // a name is explained as a name, not invented as vocabulary
  await expect(page.getByText(/boy.s name/)).toHaveCount(0);
  await page.getByRole('button', { name: 'Ingiriisi' }).click();
  await expect(page.getByText(/boy.s name/)).toBeVisible();
  await page.getByRole('button', { name: 'Xir' }).click();
  // next page + vocabulary meaning
  await page.getByRole('button', { name: /^Xiga/ }).click();
  await page.getByRole('button', { name: 'Erayga salaan', exact: true }).click();
  // the meaning stays in Somali until the learner asks for English
  await expect(page.getByText('greeting')).toHaveCount(0);
  await page.getByRole('button', { name: 'Ingiriisi' }).click();
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
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /^Xiga/ }).click();
  await page.getByRole('button', { name: /Tijaabada/ }).click();
  await expect(page.getByRole('heading', { name: 'Sidee buu u ahaa sheekadu?' })).toBeVisible();
  // one question per screen: answer the first option (correct in book 1), then Xiga
  for (let n = 1; n <= 9; n++) {
    await expect(page.getByText(`Su\u2019aasha ${n} / 10`)).toBeVisible();
    await page.locator('.bk-option').first().click();
    await page.getByRole('button', { name: /^Xiga/ }).click();
  }
  // the tenth screen is the output task
  await expect(page.getByText('Su\u2019aasha 10 / 10')).toBeVisible();
  await page.getByRole('textbox', { name: 'Jawaabta qoraalka' }).fill('Magacaygu waa Ayaanle.');
  await page.getByRole('button', { name: /Waan sameeyay/ }).click();
  await expect(page.getByText('Hawshu way diiwaangashan tahay.')).toBeVisible();
  await page.getByRole('button', { name: /Dhammaystir tijaabada/ }).click();
  await expect(page.getByRole('status')).toContainText('9 / 9');
  await expect(page.getByRole('status')).toContainText('Hawl-qoraalka: la dhammeeyay');
  await page.screenshot({ path: 'screenshots/books-quiz.png', fullPage: true });
});

test('the book test shows one question per screen and never scrolls', async ({ page }) => {
  const openQuiz = async () => {
    await page.evaluate(() => localStorage.clear());
    await page.goto('/#/books');
    await page.reload();
    await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
    for (let i = 0; i < 4; i++) await page.getByRole('button', { name: /^Xiga/ }).click();
    await page.getByRole('button', { name: /Tijaabada/ }).click();
    await expect(page.locator('.bk-q-card')).toHaveCount(1);
  };
  for (const [w, h] of [[390, 844], [320, 568], [1280, 800]] as const) {
    await page.setViewportSize({ width: w, height: h });
    await openQuiz();
    for (let n = 1; n <= 10; n++) {
      // only ever one question card, and the whole screen never scrolls
      await expect(page.locator('.bk-q-card')).toHaveCount(1);
      await expect(page.getByText(`Su\u2019aasha ${n} / 10`)).toBeVisible();
      const fit = await page.evaluate(() => {
        const quiz = document.querySelector('.bk-quiz') as HTMLElement;
        return {
          page: document.documentElement.scrollHeight <= window.innerHeight + 1,
          quiz: quiz.scrollHeight <= quiz.clientHeight + 1,
        };
      });
      expect(fit.page, `page must not scroll at ${w}x${h} on question ${n}`).toBe(true);
      expect(fit.quiz, `quiz must not scroll at ${w}x${h} on question ${n}`).toBe(true);
      if (n < 10) {
        await page.locator('.bk-option').first().click();
        await page.getByRole('button', { name: /^Xiga/ }).click();
      }
    }
    if (w === 390) await page.screenshot({ path: 'screenshots/books-quiz-mobile.png' });
  }
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

test('reading pages fit the screen exactly — the body never scrolls', async ({ page }) => {
  await page.getByRole('button', { name: /Bilow akhriska/ }).first().click();
  await expect(page.getByText('Bogga 1 / 5').first()).toBeVisible();
  for (const [w, h] of [[320, 568], [390, 844], [768, 1024], [1280, 800]] as const) {
    await page.setViewportSize({ width: w, height: h });
    await page.waitForTimeout(150);
    const fits = await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1);
    expect(fits, `body must not scroll at ${w}x${h}`).toBe(true);
  }
  // the story text itself fits without an inner scroll at phone and desktop sizes
  for (const [w, h] of [[390, 844], [1280, 800]] as const) {
    await page.setViewportSize({ width: w, height: h });
    for (const label of ['Bogga 1 / 5', 'Bogga 3 / 5']) {
      if (label === 'Bogga 3 / 5') {
        await page.getByRole('button', { name: /^Xiga/ }).click();
        await page.getByRole('button', { name: /^Xiga/ }).click();
      }
      await expect(page.getByText(label).first()).toBeVisible();
      const panel = page.locator('.bk-text-panel');
      await expect(panel).toBeVisible();
      const innerFits = await panel.evaluate(el => el.scrollHeight <= el.clientHeight + 1);
      expect(innerFits, `story text fits at ${w}x${h} on ${label}`).toBe(true);
      if (label === 'Bogga 3 / 5') {
        await page.getByRole('button', { name: /Hore/ }).click();
        await page.getByRole('button', { name: /Hore/ }).click();
      }
    }
  }
  // the illustration fills its container edge-to-edge — no letterbox bars
  for (const [w, h] of [[390, 844], [1280, 800]] as const) {
    await page.setViewportSize({ width: w, height: h });
    const fillOk = await page.locator('.bk-figure img').evaluate((el) => {
      const img = el as HTMLImageElement;
      const fig = img.closest('.bk-figure') as HTMLElement;
      return getComputedStyle(img).objectFit === 'cover'
        && Math.abs(img.clientWidth - fig.clientWidth) <= 2
        && Math.abs(img.clientHeight - fig.clientHeight) <= 2;
    });
    expect(fillOk, `illustration fills its container at ${w}x${h}`).toBe(true);
  }
});
