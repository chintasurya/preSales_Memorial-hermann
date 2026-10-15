// Renders deck/mockups/*.html to deck/mockups/png/*.png at 2x for crisp slides.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const fs = require('fs');
const path = require('path');
(async () => {
  const dir = path.join(__dirname, '..', 'mockups');
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(dir, f), 'utf8');
    const w = +(html.match(/body\{width:(\d+)px/) || [0, 1600])[1];
    const h = +(html.match(/height:(\d+)px;font-family/) || [0, 1000])[1];
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await page.goto('file://' + path.join(dir, f));
    await page.screenshot({ path: path.join(dir, 'png', f.replace('.html', '.png')) });
    await page.close();
    console.log('rendered', f, w + 'x' + h);
  }
  await browser.close();
})();
