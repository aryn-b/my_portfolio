export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  const sizes = [{ w: 1920, h: 1080 }, { w: 1440, h: 900 }, { w: 1366, h: 768 }, { w: 1280, h: 720 }, { w: 1024, h: 768 }, { w: 800, h: 600 }];
  const out = {};
  for (const s of sizes) {
    await page.setViewportSize({ width: s.w, height: s.h });
    await page.goto(base + 'family.html');
    await page.waitForTimeout(700);
    out[s.w + 'x' + s.h] = await page.evaluate(() => {
      const figs = [...document.querySelectorAll('.family-gallery__item')];
      const navTop = document.querySelector('.page-navigation').getBoundingClientRect().top;
      return {
        pageScrolls: document.body.scrollHeight > innerHeight,
        ratios: figs.map(f => {
          const i = f.querySelector('img').getBoundingClientRect();
          return i.height ? +(i.width / i.height).toFixed(2) : 'none';
        }),
        capVisible: figs.every(f => {
          const c = f.querySelector('figcaption').getBoundingClientRect();
          const r = f.getBoundingClientRect();
          return c.height > 10 && c.bottom <= r.bottom + 1;
        }),
        clearsNav: Math.round(figs[0].getBoundingClientRect().bottom) <= Math.round(navTop)
      };
    });
  }
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(base + 'family.html');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.qa-family.png' });
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto(base + 'family.html');
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.qa-family-wide.png' });
  return out;
}
