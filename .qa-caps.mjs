export default async function run(page) {
  const base = 'file:///c:/Users/blaid/OneDrive/Documents/GitHub/my_portfolio/';
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto(base + 'family.html');
  await page.waitForTimeout(900);
  return await page.evaluate(() => {
    return [...document.querySelectorAll('.family-gallery__item')].map(fig => {
      const img = fig.querySelector('img');
      const cap = fig.querySelector('figcaption');
      const fr = fig.getBoundingClientRect();
      const ir = img.getBoundingClientRect();
      const cr = cap.getBoundingClientRect();
      const cs = getComputedStyle(cap);
      return {
        name: fig.querySelector('strong')?.textContent,
        figH: Math.round(fr.height),
        imgH: Math.round(ir.height),
        capH: Math.round(cr.height),
        capTop: Math.round(cr.top),
        capBottom: Math.round(cr.bottom),
        capDisplay: cs.display,
        capOverflow: cs.overflow,
        capFont: cs.fontSize,
        natural: img.naturalWidth + 'x' + img.naturalHeight,
        objectPos: getComputedStyle(img).objectPosition
      };
    });
  });
}
