export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  await page.goto(base + 'index.html');
  await page.waitForTimeout(400);
  await page.evaluate(() => { document.querySelector('.intro-screen').hidden = true; });
  await page.evaluate(() => { location.hash = 'about'; });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: '.qa-about.png' });

  // family
  await page.goto(base + 'family.html');
  await page.waitForTimeout(900);
  const family = await page.evaluate(() => ({
    scrollY, docH: document.documentElement.scrollHeight, vh: innerHeight,
    gallery: document.querySelector('.family-gallery').getBoundingClientRect().toJSON(),
    nav: document.querySelector('.page-navigation').getBoundingClientRect().toJSON()
  }));
  await page.screenshot({ path: '.qa-family.png' });

  // achievements
  await page.goto(base + 'achievements.html');
  await page.waitForTimeout(900);
  const ach = await page.evaluate(() => ({
    scrollY, docH: document.documentElement.scrollHeight, vh: innerHeight,
    main: document.querySelector('main').getBoundingClientRect().toJSON()
  }));
  await page.screenshot({ path: '.qa-achievements.png' });

  // source page
  await page.goto(base + 'projects/calculator/source.html');
  await page.waitForTimeout(900);
  const src = await page.evaluate(() => ({
    scrollY, docH: document.documentElement.scrollHeight, vh: innerHeight,
    page: document.querySelector('.source-page').getBoundingClientRect().toJSON()
  }));

  return { family, ach, src };
}
