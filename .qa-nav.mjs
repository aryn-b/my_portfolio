export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  await page.goto(base + 'index.html');
  await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('.intro-screen').hidden = true; });
  await page.evaluate(() => { location.hash = 'about'; });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const nav = document.querySelector('.page-navigation');
    const cs = getComputedStyle(nav);
    return {
      position: cs.position, right: cs.right, bottom: cs.bottom, left: cs.left,
      top: cs.top, width: cs.width, margin: cs.margin, transform: cs.transform,
      rect: nav.getBoundingClientRect().toJSON(), vh: innerHeight
    };
  });
  return info;
}
