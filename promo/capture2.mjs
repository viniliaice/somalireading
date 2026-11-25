import { chromium as pwChromium } from 'playwright';
import sparticuz from '@sparticuz/chromium';

const OUT = 'promo/assets/site';
const exe = await sparticuz.executablePath();
const browser = await pwChromium.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-gpu'] });
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();

const prep = async () => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.evaluate(() => document.querySelectorAll('.rv').forEach(el => el.classList.add('in')));
  await page.evaluate(() => Promise.race([
    Promise.all(Array.from(document.images).map(i => i.decode().catch(() => undefined))),
    new Promise(r => setTimeout(r, 5000)),
  ]));
  await page.waitForTimeout(600);
};

const go = async (hash, vp) => {
  await page.setViewportSize(vp);
  await page.goto('http://127.0.0.1:5173/' + hash, { waitUntil: 'networkidle' });
  await prep();
};

// bookshelf from the top
await go('#/books', { width: 1280, height: 1100 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: `${OUT}/books-shelf.png` });
console.log('books-shelf');

// logo lockup from the header (transparent-ish, high res)
await go('#/', { width: 1280, height: 800 });
await page.locator('.ph-brand').first().screenshot({ path: `${OUT}/logo-lockup.png` });
await page.locator('.ph-logo').first().screenshot({ path: `${OUT}/logo-mark.png` });
console.log('logos');

// home sections
await page.locator('.ph-books-section').screenshot({ path: `${OUT}/home-books-section.png` });
await page.locator('.ph-plans').screenshot({ path: `${OUT}/home-plans.png` });
console.log('home sections');

// school path + a lesson
await go('#/dugsi', { width: 1280, height: 900 });
await page.screenshot({ path: `${OUT}/school-home.png` });
console.log('school');

// culture module (Hadraawi)
await go('#/xaraf?view=culture', { width: 1280, height: 1100 });
await page.screenshot({ path: `${OUT}/culture.png` });
console.log('culture');

await browser.close();
console.log('done');
