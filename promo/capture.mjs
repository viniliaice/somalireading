import { chromium as pwChromium } from 'playwright';
import sparticuz from '@sparticuz/chromium';
import fs from 'fs';

const OUT = 'promo/assets/site';
const exe = await sparticuz.executablePath();
const browser = await pwChromium.launch({ executablePath: exe, args: ['--no-sandbox', '--disable-gpu'] });

const prep = async (page) => {
  await page.evaluate(() => document.querySelectorAll('.rv').forEach(el => el.classList.add('in')));
  await page.evaluate(() => Promise.race([
    Promise.all(Array.from(document.images).map(i => i.decode().catch(() => undefined))),
    new Promise(r => setTimeout(r, 4000)),
  ]));
  await page.waitForTimeout(500);
};

const shots = [
  // name, hash, viewport, selector (null = viewport shot), scrollIntoView selector
  ['home-hero-desktop', '#/', { width: 1280, height: 800 }, null],
  ['home-tools', '#/', { width: 1280, height: 800 }, '.ph-carousel', '.ph-books-section'],
  ['home-pricing', '#/', { width: 1280, height: 900 }, '.ph-plans', '.ph-pricing-section'],
  ['home-hero-mobile', '#/', { width: 390, height: 844 }, null],
  ['school-home', '#/dugsi', { width: 1280, height: 900 }, null],
  ['dashboard', '#/dashboard', { width: 1280, height: 900 }, null],
  ['books-shelf', '#/books', { width: 1280, height: 1000 }, null],
  ['reader-page', '#/book/b01', { width: 1280, height: 800 }, null],
  ['phonics', '#/xaraf', { width: 1280, height: 900 }, null],
  ['culture', '#/xaraf?view=culture', { width: 1280, height: 1000 }, null],
];

const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();

for (const [name, hash, vp, sel, scroll] of shots) {
  await page.setViewportSize(vp);
  await page.goto('http://127.0.0.1:5173/' + hash, { waitUntil: 'networkidle' });
  await prep(page);
  if (scroll) {
    await page.locator(scroll).scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
  }
  if (sel) {
    await page.locator(sel).screenshot({ path: `${OUT}/${name}.png` });
  } else {
    await page.screenshot({ path: `${OUT}/${name}.png` });
  }
  console.log('captured', name);
}

// book covers + reader page art
await browser.close(); console.log('done');
