import { chromium } from 'playwright';
import sparticuz from '@sparticuz/chromium';
const OUT='promo/assets/site';
const browser=await chromium.launch({executablePath:await sparticuz.executablePath(),args:['--no-sandbox','--disable-gpu']});
const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true});
const page=await ctx.newPage();
async function shot(name,hash,prep){
 await page.goto('http://127.0.0.1:5173/'+hash,{waitUntil:'networkidle'});
 await page.evaluate(()=>window.scrollTo(0,0));
 await page.evaluate(()=>document.querySelectorAll('.rv').forEach(e=>e.classList.add('in')));
 await page.evaluate(()=>Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,4000))]));
 if(prep) await prep();
 await page.waitForTimeout(350);
 await page.screenshot({path:`${OUT}/${name}.png`});
 console.log('captured',name,'tabs:',(await page.locator('[role=tab]').allTextContents()).join('|'));
}
await shot('mobile-home','#/');
await shot('mobile-reader','#/book/b01');
await shot('mobile-trace','#/xaraf?view=unit&unit=1',async()=>{
 const tab=page.locator('[role=tab]').filter({hasText:'Raac xarafka'}); await tab.first().click({timeout:10000});
});
await shot('mobile-lesson-use','#/lesson/s1-m2-l1',async()=>{
 const btn=page.getByRole('button',{name:'Isticmaal',exact:true}).first(); if(await btn.count()) await btn.click({timeout:10000});
});
await shot('mobile-culture','#/xaraf?view=culture');
await browser.close();
