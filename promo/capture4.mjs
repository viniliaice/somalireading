import { chromium as pwChromium } from 'playwright';
import sparticuz from '@sparticuz/chromium';
const browser = await pwChromium.launch({ executablePath: await sparticuz.executablePath(), args: ['--no-sandbox', '--disable-gpu'] });
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.setViewportSize({ width: 1280, height: 900 });
await page.goto('http://127.0.0.1:5173/#/xaraf?view=unit&unit=1', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);
// the trace-letter tab is real writing practice
await page.getByRole('tab', { name: 'Raac xarafka' }).click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'promo/assets/site/trace.png' });
console.log('trace ok');
// speaking/dialogue beat: lesson "Isticmaal" tab
await page.goto('http://127.0.0.1:5173/#/lesson/s1-m2-l1', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.getByRole('button', { name: 'Isticmaal', exact: true }).first().click();
await page.waitForTimeout(600);
await page.screenshot({ path: 'promo/assets/site/lesson-use.png' });
console.log('lesson-use ok');
await browser.close();
