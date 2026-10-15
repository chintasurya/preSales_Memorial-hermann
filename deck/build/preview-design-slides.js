// Builds deck/previews/design-slides-preview.pptx with only the three new design slides,
// using the same Insight Global layouts as build-deck.js. For review before they join the deck.
const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
const { applyTheme } = require('./apply_theme.js');
const { addDemandSlide, addSecuritySlide, addHarnessSlide } = require('./design-slides.js');

const ROOT = path.join(__dirname, '..');
const BG = f => path.join(ROOT, 'assets', 'bg', f);
const OUT_DIR = path.join(ROOT, 'previews');
const OUT = path.join(OUT_DIR, 'design-slides-preview.pptx');
const THEME = {
  name: 'Insight Global', headFontFace: 'Trenda IG Text', bodyFontFace: 'Trenda IG Text',
  colors: { dk1: '000000', lt1: 'FFFFFF', dk2: '01273C', lt2: 'F2F2F2', accent1: '00D6F2', accent2: 'FED700', accent3: 'FF0068', accent4: 'F98B34', accent5: 'D214AA', accent6: '45289F', hlink: 'FF0068', folHlink: 'D214AA' },
};
const W = 13.333, L = 0.55, R = W - 0.55, CW = R - L;
const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const EYEBROW = 'MEMORIAL HERMANN  ·  EVENT PLATFORM';
const titlePh = color => ({ placeholder: { options: { name: 'title', type: 'title', x: L, y: 0.72, w: CW, h: 0.9, fontSize: 32, bold: true, color, align: 'left', valign: 'top', margin: 0 }, text: '' } });
const eyebrow = color => ({ text: { text: EYEBROW, options: { x: L, y: 0.24, w: 8, h: 0.25, fontSize: 8, bold: true, color, charSpacing: 3, margin: 0 } } });
const slideNum = color => ({ x: 12.35, y: 6.93, w: 0.5, h: 0.25, fontSize: 9, color, align: 'right' });
pres.defineSlideMaster({ title: 'IG Dark', background: { path: BG('content-dark.jpg') }, objects: [eyebrow(C.background1), titlePh(C.background1)], slideNumber: slideNum(C.background1) });
pres.defineSlideMaster({ title: 'IG Light', background: { path: BG('content-light.jpg') }, objects: [eyebrow(C.text1), titlePh(C.text1)], slideNumber: slideNum(C.text1) });

const h = {
  pres, C, L, R, CW, W,
  LIGHT_FONT: 'Trenda IG Text Light', MUTED_DARK: 'BFBFBF', MUTED_LIGHT: '4D4D4D',
  HEX: { cyan: '00D6F2', yellow: 'FED700', magenta: 'FF0068', magentaDark: 'C8005A' },
  txt: (slide, text, o) => slide.addText(text, { isTextBox: true, margin: 0, valign: 'top', ...o }),
};

(async () => {
  pres.addSection({ title: 'Preview' });
  await addDemandSlide(h, 'Preview');
  await addSecuritySlide(h, 'Preview');
  await addHarnessSlide(h, 'Preview');
  fs.mkdirSync(OUT_DIR, { recursive: true });
  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, THEME);
  console.log('wrote', OUT);
})();
