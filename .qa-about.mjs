export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  const sizes = [
    { w: 1440, h: 900 }, { w: 1366, h: 768 }, { w: 1280, h: 720 },
    { w: 1024, h: 768 }, { w: 1024, h: 600 }, { w: 800, h: 600 },
    { w: 1280, h: 560 }, { w: 375, h: 667 }
  ];
  const out = {};
  for (const s of sizes) {
    await page.setViewportSize({ width: s.w, height: s.h });
    await page.goto(base + 'index.html');
    await page.waitForTimeout(300);
    await page.evaluate(() => { document.querySelector('.intro-screen').hidden = true; });
    await page.evaluate(() => { location.hash = 'about'; });
    await page.waitForTimeout(1000);
    out[s.w + 'x' + s.h] = await page.evaluate(() => {
      const secs = [...document.querySelectorAll('.pds__section')];
      return {
        scrollY,
        bodyH: document.body.scrollHeight,
        vh: innerHeight,
        pdsBottom: Math.round(document.querySelector('.pds').getBoundingClientRect().bottom),
        overflowing: secs.map(el => el.scrollHeight - el.clientHeight)
      };
    });
  }
  await page.setViewportSize({ width: 800, height: 600 });
  await page.goto(base + 'index.html');
  await page.waitForTimeout(300);
  await page.evaluate(() => { document.querySelector('.intro-screen').hidden = true; });
  await page.evaluate(() => { location.hash = 'about'; });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.qa-about-small.png' });
  return out;
}
