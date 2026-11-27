export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  const out = {};

  // Personal Information (about view inside index.html)
  await page.goto(base + 'index.html');
  await page.evaluate(() => {
    location.hash = 'about';
  });
  await page.waitForTimeout(900);
  out.about = await page.evaluate(() => {
    const sec = document.querySelector('#about');
    const visible = sec && !sec.hasAttribute('hidden');
    const r = sec ? sec.getBoundingClientRect() : null;
    const pds = document.querySelector('.pds');
    const pr = pds ? pds.getBoundingClientRect() : null;
    return {
      visible,
      hScroll: document.documentElement.scrollWidth > innerWidth,
      vScroll: document.documentElement.scrollHeight > innerHeight,
      sectionTop: r && Math.round(r.top),
      sectionBottom: r && Math.round(r.bottom),
      pdsLeft: pr && Math.round(pr.left),
      pdsRight: pr && Math.round(pr.right),
      vw: innerWidth,
      vh: innerHeight
    };
  });
  await page.screenshot({ path: '.qa-about.png' });

  // Family
  await page.goto(base + 'family.html');
  await page.waitForTimeout(700);
  out.family = await page.evaluate(() => {
    const g = document.querySelector('.family-gallery').getBoundingClientRect();
    const items = [...document.querySelectorAll('.family-gallery__item')].map(el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), left: Math.round(r.left) };
    });
    return {
      hScroll: document.documentElement.scrollWidth > innerWidth,
      vScroll: document.documentElement.scrollHeight > innerHeight,
      gallery: { left: Math.round(g.left), right: Math.round(g.right), h: Math.round(g.height) },
      items,
      vw: innerWidth,
      vh: innerHeight
    };
  });
  await page.screenshot({ path: '.qa-family.png' });

  // Achievements
  await page.goto(base + 'achievements.html');
  await page.waitForTimeout(700);
  out.achievements = await page.evaluate(() => {
    const m = document.querySelector('main').getBoundingClientRect();
    return {
      hScroll: document.documentElement.scrollWidth > innerWidth,
      main: { left: Math.round(m.left), right: Math.round(m.right) },
      vw: innerWidth,
      vh: innerHeight,
      bodyH: document.documentElement.scrollHeight
    };
  });
  await page.screenshot({ path: '.qa-achievements.png' });

  return out;
}
