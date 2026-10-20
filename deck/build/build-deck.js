// Builds deck/Memorial-Hermann-Event-Platform.pptx in the Insight Global template style.
// Backgrounds come from the IG template (deck/assets/bg), screens from deck/mockups/png.
// Run: npm install && node build-deck.js
const path = require('path');
const pptxgen = require('pptxgenjs');
const { applyTheme } = require('./apply_theme.js');
const { addDemandSlide, addSecuritySlide, addHarnessSlide } = require('./design-slides.js');
const { addOverallDesignSlide, addSeatFlowSlide, addPaymentSequenceSlide } = require('./sequence-slides.js');
const { addSprintPlanSlide, addPodSlide, addInvestmentSlide } = require('./delivery-slides.js');
const { addBookingFlowSlide, addStaffSetupSlide, addInterestSlide, addCertainTransitionSlide } = require('./screen-slides.js');

const ROOT = path.join(__dirname, '..');
const BG = f => path.join(ROOT, 'assets', 'bg', f);
const IMG = f => path.join(ROOT, 'mockups', 'png', f);
const OUT = process.env.DECK_OUT || path.join(ROOT, 'Memorial-Hermann-Event-Platform.pptx');

// Insight Global palette, sampled from the template's color page.
const THEME = {
  name: 'Insight Global',
  headFontFace: 'Trenda IG Text',
  bodyFontFace: 'Trenda IG Text',
  colors: {
    dk1: '000000', lt1: 'FFFFFF', dk2: '01273C', lt2: 'F2F2F2',
    accent1: '00D6F2', accent2: 'FED700', accent3: 'FF0068',
    accent4: 'F98B34', accent5: 'D214AA', accent6: '45289F',
    hlink: 'FF0068', folHlink: 'D214AA',
  },
};
const LIGHT_FONT = 'Trenda IG Text Light';
const MUTED_DARK = 'BFBFBF'; // body copy on black
const MUTED_LIGHT = '4D4D4D'; // body copy on white
const EYEBROW = 'MEMORIAL HERMANN  ·  EVENT PLATFORM';

const W = 13.333, H = 7.5, L = 0.55, R = W - 0.55, CW = R - L;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.title = 'Memorial Hermann: One Event Platform on Salesforce';
pres.author = 'Insight Global';
pres.company = 'Insight Global';
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;

// ---------- Layouts ----------
const titlePh = (color) => ({
  placeholder: {
    options: { name: 'title', type: 'title', x: L, y: 0.72, w: CW, h: 0.9, fontSize: 32, bold: true, color, align: 'left', valign: 'top', margin: 0 },
    text: '',
  },
});
const eyebrow = (color) => ({ text: { text: EYEBROW, options: { x: L, y: 0.24, w: 8, h: 0.25, fontSize: 8, bold: true, color, charSpacing: 3, margin: 0 } } });
const slideNum = (color) => ({ x: 12.35, y: 6.93, w: 0.5, h: 0.25, fontSize: 9, color, align: 'right' });

pres.defineSlideMaster({
  title: 'IG Title', background: { path: BG('title.jpg') },
  objects: [
    { placeholder: { options: { name: 'title', type: 'title', x: 1.0, y: 2.75, w: W - 2.0, h: 1.7, fontFace: LIGHT_FONT, fontSize: 44, color: C.background1, align: 'center', valign: 'middle', charSpacing: 6, margin: 0 }, text: '' } },
    { placeholder: { options: { name: 'body', type: 'body', x: 1.0, y: 4.55, w: W - 2.0, h: 0.5, fontSize: 18, color: C.background1, align: 'center', margin: 0 }, text: '' } },
  ],
});
pres.defineSlideMaster({
  title: 'IG Agenda', background: { path: BG('agenda.jpg') },
  objects: [eyebrow(C.background1), titlePh(C.background1)], slideNumber: slideNum(C.background1),
});
for (const [name, file] of [['IG Section Blue', 'section-blue.jpg'], ['IG Section Magenta', 'section-magenta.jpg'], ['IG Section Gold', 'section-gold.jpg']]) {
  pres.defineSlideMaster({
    title: name, background: { path: BG(file) },
    objects: [
      { placeholder: { options: { name: 'title', type: 'title', x: 1.0, y: 3.0, w: W - 2.0, h: 1.1, fontFace: LIGHT_FONT, fontSize: 44, color: C.background1, align: 'center', valign: 'middle', charSpacing: 6, margin: 0 }, text: '' } },
      { placeholder: { options: { name: 'body', type: 'body', x: 1.5, y: 4.2, w: W - 3.0, h: 0.6, fontSize: 18, color: C.background1, align: 'center', margin: 0 }, text: '' } },
    ],
  });
}
pres.defineSlideMaster({ title: 'IG Dark', background: { path: BG('content-dark.jpg') }, objects: [eyebrow(C.background1), titlePh(C.background1)], slideNumber: slideNum(C.background1) });
pres.defineSlideMaster({ title: 'IG Light', background: { path: BG('content-light.jpg') }, objects: [eyebrow(C.text1), titlePh(C.text1)], slideNumber: slideNum(C.text1) });
pres.defineSlideMaster({ title: 'IG Spectrum', background: { path: BG('content-spectrum.jpg') }, objects: [eyebrow(C.background1), titlePh(C.background1)], slideNumber: slideNum(C.background1) });
pres.defineSlideMaster({ title: 'IG Closing', background: { path: BG('closing.jpg') }, objects: [] });

// ---------- Helpers ----------
const txt = (slide, text, o) => slide.addText(text, { isTextBox: true, margin: 0, valign: 'top', ...o });

function numCircle(slide, n, x, y, color, d = 0.46) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, line: { color, width: 1.25 }, fill: { type: 'none' }, objectName: `circle-${n}` });
  txt(slide, String(n), { x, y, w: d, h: d, fontSize: 14, color, align: 'center', valign: 'middle' });
}

function pill(slide, text, x, y, w, color, textColor) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.42, rectRadius: 0.21, line: { color, width: 1.5 }, fill: { type: 'none' } });
  txt(slide, text, { x, y, w, h: 0.42, fontSize: 13, bold: true, color: textColor, align: 'center', valign: 'middle' });
}

// Template "chart style" table: bold header, solid rule, dotted row rules.
function ruledTable(slide, x, y, colW, rows, { dark = false, headSize = 15, bodySize = 13, rowH = 0.62, firstColBold = true } = {}) {
  const ink = dark ? C.background1 : C.text1;
  const body = dark ? MUTED_DARK : MUTED_LIGHT;
  const totalW = colW.reduce((a, b) => a + b, 0);
  let cx = x;
  rows[0].forEach((h, i) => { txt(slide, h, { x: cx + 0.08, y, w: colW[i] - 0.16, h: 0.42, fontSize: headSize, bold: true, color: ink, valign: 'bottom' }); cx += colW[i]; });
  slide.addShape(pres.shapes.LINE, { x, y: y + 0.5, w: totalW, h: 0, line: { color: ink, width: 1.5 } });
  let cy = y + 0.5;
  rows.slice(1).forEach((r) => {
    cx = x;
    r.forEach((cell, i) => {
      txt(slide, cell, { x: cx + 0.08, y: cy + 0.08, w: colW[i] - 0.16, h: rowH - 0.12, fontSize: bodySize, color: i === 0 && firstColBold ? ink : body, bold: i === 0 && firstColBold, valign: 'middle' });
      cx += colW[i];
    });
    cy += rowH;
    slide.addShape(pres.shapes.LINE, { x, y: cy, w: totalW, h: 0, line: { color: dark ? '8C8C8C' : '8C8C8C', width: 0.75, dashType: 'sysDot' } });
  });
  return cy;
}

function bullets(slide, items, o) {
  slide.addText(items.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < items.length - 1, paraSpaceAfter: 6 } })), { isTextBox: true, margin: 0, valign: 'top', ...o });
}

function frameImage(slide, file, x, y, w, h) {
  slide.addImage({ path: IMG(file), x, y, w, h, objectName: file, shadow: { type: 'outer', blur: 8, offset: 2, angle: 90, color: '000000', opacity: 0.25 } });
}

// Shared context for the design and sequence slide modules.
const h = {
  pres, C, L, R, CW, W, txt, LIGHT_FONT, MUTED_DARK, MUTED_LIGHT,
  HEX: { cyan: '00D6F2', yellow: 'FED700', magenta: 'FF0068', magentaDark: 'C8005A' },
};

(async () => {
// ---------- Slides ----------
// 1. Title
pres.addSection({ title: 'Introduction' });
let s = pres.addSlide({ masterName: 'IG Title', sectionTitle: 'Introduction' });
s.addText('ONE EVENT PLATFORM ON SALESFORCE', { placeholder: 'title' });
s.addText('Memorial Hermann Health System  ×  Insight Global', { placeholder: 'body' });
// Client logo: drop the file at deck/assets/client/memorial-hermann-logo.png (white or reversed version for the dark title).
const LOGO = path.join(ROOT, 'assets', 'client', 'memorial-hermann-logo.png');
if (require('fs').existsSync(LOGO)) {
  const meta = await require('sharp')(LOGO).metadata();
  const lh = 0.6, lw = lh * meta.width / meta.height;
  s.addImage({ path: LOGO, x: (W - lw) / 2, y: 5.6, w: lw, h: lh, objectName: 'Memorial Hermann logo' });
}
txt(s, 'CLASSES  ·  EVENTS  ·  CONFERENCES  ·  ENGAGEMENT', { x: 1.0, y: 5.15, w: W - 2, h: 0.3, fontSize: 11, color: C.background1, align: 'center', charSpacing: 4 });
txt(s, 'OCTOBER 2026', { x: 1.0, y: 6.75, w: W - 2, h: 0.3, fontSize: 11, bold: true, color: C.background1, align: 'center', charSpacing: 5 });
s.addNotes('Thank Kevin for the detailed answers. Today: how we solve the event registration problem on the Salesforce platform they already own, how we deliver it, and how the registration data can grow engagement and the network.');

// 2. Agenda
s = pres.addSlide({ masterName: 'IG Agenda', sectionTitle: 'Introduction' });
s.addText('Agenda', { placeholder: 'title' });
const agenda = ['Business opportunity', 'The solution and design', 'Payments and data security', 'Delivery timeline', 'Beyond the event', 'Roadmap and next steps'];
agenda.forEach((a, i) => {
  const col = i < 3 ? 0 : 1, row = i % 3;
  const x = col === 0 ? 0.6 : 6.9, y = 2.2 + row * 0.95;
  numCircle(s, i + 1, x, y, C.background1);
  txt(s, a, { x: x + 0.7, y, w: 5.2, h: 0.46, fontFace: LIGHT_FONT, fontSize: 22, color: C.background1, valign: 'middle' });
});

// 3. What we heard
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Introduction' });
s.addText('Business opportunity', { placeholder: 'title' });
// Primary ask, highlighted first
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: L, y: 1.6, w: CW, h: 1.22, rectRadius: 0.12, fill: { color: '000000' }, line: { color: 'FF0068', width: 2 }, objectName: 'primary-ask' });
txt(s, 'PRIMARY ASK', { x: L + 0.3, y: 1.74, w: 4, h: 0.24, fontSize: 10, bold: true, color: 'FF0068', charSpacing: 3 });
txt(s, 'Replace Certain with conference and session management on Salesforce', { x: L + 0.3, y: 2.0, w: 8.2, h: 0.7, fontSize: 21, bold: true, color: 'FFFFFF', valign: 'middle' });
txt(s, '1 to 2 multi-day conferences a year, with session management, for providers, caregivers and consumers. Authorize.net today, moving to Chase.', { x: 9.1, y: 1.78, w: 3.45, h: 0.95, fontSize: 11.5, color: 'D9D9D9', valign: 'middle' });
txt(s, 'Also: run classes on the same platform, building on today\u2019s registration instead of rebuilding it.', { x: L, y: 3.08, w: CW, h: 0.32, fontSize: 14, bold: true, color: C.text1 });
ruledTable(s, L, 3.5, [2.45, 5.2, 4.58], [
  ['Area', 'Today', 'Where we take it'],
  ['Conferences', 'Certain for multi-day events; Authorize.net payments', 'Replace with Salesforce conference and session management, paid through Chase'],
  ['Classes and events', 'Sitecore listings open a home-built Experience Cloud site; Chase payments; confirmation up to 24 hours', 'Keep the site and improve it on one shared event model'],
  ['Mobile app', 'People can already register for events in the app', 'Keep it, connected to the same event model'],
  ['Platform', 'Health Cloud and Marketing Cloud; Epic not needed', 'Built on what Memorial Hermann already owns'],
], { rowH: 0.62, bodySize: 12.5, headSize: 14 });

// Keep, improve, replace
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Introduction' });
s.addText('Build on what already works', { placeholder: 'title' });
txt(s, 'No rebuild of today’s class registration. Replace only Certain, then bring every event onto one platform.', { x: L, y: 1.42, w: 12, h: 0.32, fontSize: 14, color: MUTED_LIGHT });
const kir = [
  ['KEEP', '00A9C0', '007C8C', ['Sitecore class listings', 'Experience Cloud registration site', 'Mobile app registration', 'Chase payments, now for conferences too', 'Health Cloud and Marketing Cloud']],
  ['IMPROVE', 'D9B200', '7A6100', ['Instant confirmation (today up to 24 hours)', 'Safe payment retries', 'Live seats and waitlists', 'Check-in and reporting', 'One shared event model']],
  ['REPLACE', 'FF0068', 'C8005A', ['Certain, with Salesforce conference and session management', 'My Agenda portal on Experience Cloud', 'Authorize.net, by reusing today’s Chase checkout', 'Certain data migrated']],
  ['ADD LATER', '8C8C96', '4D4D4D', ['Patient engagement initiatives (PEIs)', 'App adoption campaigns', 'AI agents in a controlled harness']],
];
kir.forEach(([k, line, ink, items], i) => {
  const cw4 = (CW - 3 * 0.2) / 4, x = L + i * (cw4 + 0.2), y = 1.95;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw4, h: 4.15, rectRadius: 0.12, fill: { color: i === 2 ? '000000' : 'F2F2F2' }, line: { color: line, width: 1.75 }, objectName: `kir-${k}` });
  txt(s, k, { x: x + 0.22, y: y + 0.22, w: cw4 - 0.44, h: 0.32, fontSize: 15, bold: true, color: i === 2 ? line : ink, charSpacing: 3 });
  bullets(s, items, { x: x + 0.22, y: y + 0.75, w: cw4 - 0.4, h: 3.3, fontSize: 13, color: i === 2 ? 'FFFFFF' : C.text1 });
});
txt(s, 'Lowest-risk path: what works stays, the one tool you want gone goes, and every event ends up on the same data, payments and reporting.', { x: L, y: 6.3, w: CW, h: 0.4, fontSize: 13, italic: true, color: MUTED_LIGHT });
s.addNotes('This is the core of our position. We keep the Sitecore listings, the Experience Cloud registration site and the app. We improve classes where today’s experience is weak, such as confirmations that can take up to 24 hours. We replace only Certain. Engagement and AI come later.');

// 4. Section 01
pres.addSection({ title: 'The solution' });
s = pres.addSlide({ masterName: 'IG Section Blue', sectionTitle: 'The solution' });
s.addText('01  THE SOLUTION', { placeholder: 'title' });
s.addText('Conferences first, then classes on the same Salesforce platform', { placeholder: 'body' });

// 5. Solution overview
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'The solution' });
s.addText('One event platform inside your Salesforce org', { placeholder: 'title' });
const cols = [
  ['Register', 'Your existing front doors', ['Sitecore listings and today’s Experience Cloud site', 'Existing mobile app', '“My Agenda” portal for conferences']],
  ['Manage', 'Event app in Salesforce', ['Classes, series, sessions, speakers', 'Capacity, waitlists, refunds', 'QR check-in and reporting', 'Registrants matched to Health Cloud']],
  ['Engage', 'Marketing Cloud journeys', ['Confirmations and reminders', 'Calendar invites and virtual links', 'Patient engagement initiatives (PEIs)']],
];
cols.forEach(([h, sub, items], i) => {
  const x = L + i * 4.2;
  numCircle(s, i + 1, x, 1.85, C.background1);
  txt(s, h, { x, y: 2.5, w: 3.6, h: 0.45, fontSize: 24, bold: true, color: C.background1 });
  txt(s, sub, { x, y: 2.98, w: 3.6, h: 0.35, fontSize: 15, color: [C.accent1, C.accent2, C.accent3][i] });
  bullets(s, items, { x, y: 3.45, w: 3.6, h: 1.9, fontSize: 14, color: MUTED_DARK });
  if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 3.62, y: 2.08, w: 0.45, h: 0, line: { color: C.background1, width: 1.25, endArrowType: 'triangle' } });
});
txt(s, 'CONNECTS TO', { x: L, y: 5.62, w: 2, h: 0.3, fontSize: 10, bold: true, color: C.background1, charSpacing: 3 });
const conns = ['Chase', 'Experience Cloud', 'Sitecore', 'Zoom / Teams', 'Health Cloud', 'Marketing Cloud'];
conns.forEach((c, i) => pill(s, c, L + i * 2.05, 6.0, 1.85, [C.accent1, C.accent2, C.accent3][i % 3], C.background1));
txt(s, 'Reliable, secure and scalable by design: waiting room and seat holds for busy events, encrypted data, full audit trail.', { x: L, y: 6.55, w: CW, h: 0.3, fontSize: 11, italic: true, color: C.accent1 });

// Overall solution design (sequence view)
addOverallDesignSlide(h, 'The solution');

// Concept screens: registrant booking, staff setup, interest list
addBookingFlowSlide(h, 'The solution');
addStaffSetupSlide(h, 'The solution');
addInterestSlide(h, 'The solution');

// Demand handling, seat-flow detail, payments and data security, payment detail
await addDemandSlide(h, 'The solution');
addSeatFlowSlide(h, 'The solution');
await addSecuritySlide(h, 'The solution');
addPaymentSequenceSlide(h, 'The solution');

// 10. Section 02
pres.addSection({ title: 'Delivery plan' });
s = pres.addSlide({ masterName: 'IG Section Gold', sectionTitle: 'Delivery plan' });
s.addText('02  DELIVERY PLAN', { placeholder: 'title' });
s.addText('Ten sprints: conferences live at week 12, classes improved by week 20', { placeholder: 'body' });

// 11. Timeline (template timeline style)
s = pres.addSlide({ masterName: 'IG Spectrum', sectionTitle: 'Delivery plan' });
s.addText('Delivery timeline', { placeholder: 'title' });
txt(s, 'Indicative; confirmed after the current-state walkthrough', { x: L, y: 1.45, w: 8, h: 0.35, fontSize: 14, color: MUTED_DARK });
const lineY = 3.95;
s.addShape(pres.shapes.LINE, { x: 0.68, y: lineY, w: W - 1.36, h: 0, line: { color: C.background1, width: 3 } });
[0.55, W - 0.81].forEach(x => s.addShape(pres.shapes.OVAL, { x, y: lineY - 0.13, w: 0.26, h: 0.26, fill: { color: C.background1 }, line: { color: C.background1 } }));
const blocks = [
  { x: 1.15, up: false, w: 3.3, h: 'Weeks 1-2  ·  Assess and design', b: 'Review today’s Experience Cloud site, the app and Certain; shared event model; payment decision' },
  { x: 3.85, up: true, w: 3.3, h: 'Weeks 3-12  ·  Phase 1 live', b: 'Conferences: sessions, speakers, My Agenda, badges. Certain data moved and Certain retired' },
  { x: 6.95, up: false, w: 3.3, h: 'Weeks 13-20  ·  Phase 2 live', b: 'Classes on the shared model: instant confirmation, waitlists, check-in, reporting' },
  { x: 9.7, up: true, w: 2.9, h: 'Week 21+  ·  Grow', b: 'Patient engagement initiatives, app adoption, AI agents in a controlled harness' },
];
blocks.forEach(({ x, up, w, h, b }) => {
  const y = up ? 2.45 : lineY + 0.25;
  s.addShape(pres.shapes.LINE, { x, y, w: 0, h: 1.25, line: { color: C.background1, width: 1.25, dashType: 'sysDot' } });
  txt(s, h, { x: x + 0.2, y, w, h: 0.32, fontSize: 13, bold: true, color: C.background1 });
  txt(s, b, { x: x + 0.2, y: y + 0.4, w, h: 0.85, fontSize: 12, color: C.background1 });
  s.addShape(pres.shapes.OVAL, { x: x - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18, fill: { color: C.accent2 }, line: { color: C.accent2 } });
});
// Certain transition: weeks 7-12 on the Phase 1 stretch of the line (week 3 at x 3.85, week 13 at x 6.95)
const wk = n => 3.85 + (n - 3) * 0.31;
s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: wk(7), y: lineY - 0.09, w: wk(13) - wk(7) - 0.12, h: 0.18, rectRadius: 0.09, fill: { color: C.accent3 }, line: { color: C.background1, width: 1 }, objectName: 'certain-transition' });
txt(s, 'Certain transition', { x: wk(7), y: lineY + 0.25, w: 1.85, h: 0.32, fontSize: 13, bold: true, color: C.background1 });
txt(s, 'Weeks 7-12: export, map, two trial loads, cutover', { x: wk(7), y: lineY + 0.65, w: 1.75, h: 0.7, fontSize: 11, color: C.background1 });
s.addNotes('Phase 1 replaces Certain around week 12, with a six-week Certain to Salesforce data transition in weeks 7 to 12; time it to land before the Certain renewal. Phase 2 brings classes onto the same platform and improves them by week 20, without rebuilding the registration site. Engagement work can start once classes are on the shared model.');

// What each phase delivers (restored by Surya in draft 2)
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Delivery plan' });
s.addText('What each phase delivers', { placeholder: 'title' });
ruledTable(s, L, 1.7, [2.2, 5.0, 5.03], [
  ['', 'Phase 1  ·  Conferences (replaces Certain)', 'Phase 2  ·  Classes on the shared platform'],
  ['Scope', 'Multi-day agenda, tracks, rooms and session capacity', 'Today’s classes moved onto the shared event model'],
  ['Registration', 'Providers and guests, ticket types, My Agenda on Experience Cloud', 'Existing Experience Cloud site and app, now with instant confirmation'],
  ['Payments', 'Chase checkout, reusing today’s class integration', 'Chase checkout with safe payment retries and refunds'],
  ['Engagement', 'Speaker and attendee communications, badges, CME [to confirm]', 'Reminder journeys, waitlists, QR check-in'],
  ['Data', 'Certain data moved in a six-week transition (weeks 7-12)', 'Class history kept; registrants matched to Health Cloud'],
  ['Built in', 'Load test before each conference opens', 'Live seats, waitlists, encryption, monitoring'],
  ['Retires', 'Certain', 'Nothing retired; today’s registration is improved'],
], { rowH: 0.6, bodySize: 13 });
s.addNotes('Same team and same platform across both phases, so Phase 2 builds on Phase 1 rather than starting over.');

// Certain to Salesforce transition (data migration)
addCertainTransitionSlide(h, 'Delivery plan');

// Sprint plan and delivery pod
addSprintPlanSlide(h, 'Delivery plan');
await addPodSlide(h, 'Delivery plan');

// 13. Section 03
pres.addSection({ title: 'Beyond the event' });
s = pres.addSlide({ masterName: 'IG Section Magenta', sectionTitle: 'Beyond the event' });
s.addText('03  BEYOND THE EVENT', { placeholder: 'title' });
s.addText('Turn every registration into a lasting relationship', { placeholder: 'body' });

// 14. Value proposition (template stat style)
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'Beyond the event' });
txt(s, 'Every registration tells you what a person cares about. Use it to bring them back and into the network.', { x: L, y: 2.5, w: 5.6, h: 2.6, fontFace: LIGHT_FONT, fontSize: 30, color: C.background1 });
const stats = [
  ['1 profile', 'Every registrant, caregiver and provider in one Salesforce record'],
  ['4 PEIs', 'Patient engagement initiatives after every class'],
  ['1 tap', 'App download link at confirmation, check-in and follow-up'],
  ['Closed loop', 'From class attended to visit booked, measured end to end'],
];
stats.forEach(([n, d], i) => {
  const x = 6.55 + (i % 2) * 3.2, y = 1.1 + Math.floor(i / 2) * 2.55;
  txt(s, n, { x, y, w: 3.1, h: 0.85, fontFace: LIGHT_FONT, fontSize: 34, color: C.accent1 });
  txt(s, d, { x, y: y + 0.95, w: 2.75, h: 1.0, fontSize: 14, color: C.background1 });
});
txt(s, 'Consent-based: messages go only to people who opt in at registration.', { x: L, y: 6.2, w: 5.6, h: 0.35, fontSize: 12, italic: true, color: MUTED_DARK });
s.addNotes('This is the upsell. The event platform captures first-party data about what each person is interested in. Marketing Cloud journeys turn that into patient engagement initiatives that lead to app adoption and booked visits.');

// 15. Journey
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Beyond the event' });
s.addText('After the class: patient engagement initiatives (PEIs)', { placeholder: 'title' });
frameImage(s, '05-marketing-journey.png', L, 1.75, 12.23, 4.89);
s.addNotes('Every class feeds one Marketing Cloud journey: confirmation, reminder, then four patient engagement initiatives (thank you and survey, next class, app adoption, find a doctor). The journey exits when the person books a visit or downloads the app.');

// 16. Campaign examples
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Beyond the event' });
s.addText('Campaigns built from registration data', { placeholder: 'title' });
ruledTable(s, L, 1.7, [2.85, 5.2, 4.18], [
  ['After this class', 'Follow-up PEIs', 'Network outcome'],
  ['Labor and delivery prep', 'Breastfeeding and newborn classes, choose a pediatrician', 'Delivery at Memorial Hermann, new pediatric patients'],
  ['Maternity hospital tour', 'Pre-register for delivery, prenatal class bundle', 'Delivery booked at Memorial Hermann'],
  ['CPR and first aid', 'Heart health seminar, free screening invitation', 'Primary care and cardiology visits'],
  ['Support groups and seminars', 'Education series, specialist-led events', 'Ongoing specialty care relationships'],
  ['Provider conference', 'Next CME events, referral resources', 'A stronger referral network'],
], { rowH: 0.78, bodySize: 13 });
s.addNotes('Examples to show the idea. We would pick two or three service lines with Kevin’s team to start.');

// 17. App downloads
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'Beyond the event' });
s.addText('Bring website registrants into the app', { placeholder: 'title' });
s.addImage({ path: IMG('06-confirmation-email.png'), x: L + 0.2, y: 1.7, w: 2.6, h: 5.0, objectName: 'confirmation email' });
const touch = [
  ['Confirmation email', 'App link beside the calendar invite and QR code'],
  ['Check-in', 'QR at the door and on room signage: scan to download'],
  ['SMS reminder', 'Manage or cancel your class in the app'],
  ['Post-class PEIs', 'Find a doctor, book a visit, see results in the app'],
];
touch.forEach(([h, d], i) => {
  const y = 1.85 + i * 1.08;
  numCircle(s, i + 1, 4.0, y, C.background1);
  txt(s, h, { x: 4.7, y: y - 0.04, w: 7.5, h: 0.36, fontSize: 18, bold: true, color: C.background1 });
  txt(s, d, { x: 4.7, y: y + 0.35, w: 7.5, h: 0.4, fontSize: 14, color: MUTED_DARK });
});
txt(s, 'Tracked links show which classes and service lines drive downloads and booked visits.', { x: 4.0, y: 6.25, w: 8.6, h: 0.35, fontSize: 13, italic: true, color: C.accent1 });
s.addNotes('My Memorial Hermann is their existing Epic-based patient app (scheduling, results, messaging). App users register in the app; people who register on the website get a tracked download link at every touchpoint. No new app is built.');

// 18. KPIs
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'Beyond the event' });
s.addText('How we will measure success', { placeholder: 'title' });
const kpis = [
  ['Conversion', 'Visitors who complete a registration'],
  ['Attendance', 'Registrants who show up; fewer no-shows'],
  ['Engagement', 'PEI opens, clicks and survey responses'],
  ['Downloads', 'App installs from event links'],
  ['Visits booked', 'Appointments after a class or event'],
  ['Revenue', 'Paid registrations and conference fees'],
];
kpis.forEach(([k, d], i) => {
  const x = L + (i % 3) * 4.15, y = 1.85 + Math.floor(i / 3) * 2.25;
  txt(s, k, { x, y, w: 3.9, h: 0.75, fontFace: LIGHT_FONT, fontSize: 34, color: C.accent1 });
  txt(s, d, { x, y: y + 0.8, w: 3.6, h: 0.5, fontSize: 14, color: C.background1 });
  txt(s, 'Baseline set in discovery', { x, y: y + 1.3, w: 3.6, h: 0.3, fontSize: 11, italic: true, color: MUTED_DARK });
});
s.addNotes('We set baselines during discovery from the current tools, then report these in a Salesforce dashboard.');

// 19. Roadmap
pres.addSection({ title: 'Roadmap and next steps' });
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Roadmap and next steps' });
s.addText('Roadmap: from registration to relationship', { placeholder: 'title' });
const road = [
  ['Conferences', 'Weeks 3-12', ['Sessions and speakers', 'My Agenda and badges', 'Certain retired']],
  ['Classes improved', 'Weeks 13-20', ['Shared event model', 'Instant confirmation, waitlists', 'Check-in and reporting']],
  ['Engagement', 'From Phase 2 go-live', ['PEI journeys by service line', 'App adoption campaigns', 'Find-a-doctor nurture']],
  ['AI agents', 'Week 21+', ['Agents in a controlled harness', 'Demand and campaign agents', 'Concierge on web, app and SMS']],
];
road.forEach(([h, t, items], i) => {
  const x = L + i * 3.1;
  numCircle(s, i + 1, x, 1.85, C.text1);
  txt(s, h, { x, y: 2.5, w: 2.85, h: 0.42, fontSize: 19, bold: true, color: C.text1 });
  txt(s, t, { x, y: 2.95, w: 2.85, h: 0.32, fontSize: 13, bold: true, color: [C.accent6, C.accent3, C.accent5, C.accent4][i] });
  bullets(s, items, { x, y: 3.45, w: 2.8, h: 2.4, fontSize: 14, color: MUTED_LIGHT });
});
txt(s, 'Phases 1 and 2 solve today’s problem. Phases 3 and 4 grow engagement and the network on the same platform.', { x: L, y: 5.75, w: CW, h: 0.4, fontSize: 14, bold: true, color: C.text1 });
s.addNotes('Future plan. AI agents use Agentforce and are licensed separately; we would scope them after the core platform is live.');

// AI agent harness
await addHarnessSlide(h, 'Roadmap and next steps');

// Investment
addInvestmentSlide(h, 'Roadmap and next steps');

// 20. Next steps
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'Roadmap and next steps' });
s.addText('Next steps', { placeholder: 'title' });
const steps = [
  'Walk through today’s Experience Cloud site, the app and Certain',
  'Confirm what is not working today and why Certain is being replaced',
  'Confirm yearly volumes: classes, conferences, registrants',
  'Confirm conference must-haves: sessions, badges, sponsors, CME',
  'Confirm Chase for conference payments with finance',
  'Share the Certain renewal date so Phase 2 lands before it',
  'Pick 2 to 3 service lines for the first engagement journeys',
];
steps.forEach((t, i) => {
  const y = 1.75 + i * 0.64;
  numCircle(s, i + 1, 0.6, y, C.background1);
  txt(s, t, { x: 1.3, y, w: 11, h: 0.46, fontFace: LIGHT_FONT, fontSize: 20, color: C.background1, valign: 'middle' });
});
txt(s, 'Then we return with a scoped plan, team and estimate.', { x: 1.3, y: 6.35, w: 11, h: 0.35, fontSize: 14, bold: true, color: C.accent1 });
s.addNotes('Ask Kevin to set up the walkthrough with Lucky Rai’s team. Items 2 to 7 let us firm up the timeline and estimate.');

// 21. Closing
s = pres.addSlide({ masterName: 'IG Closing', sectionTitle: 'Roadmap and next steps' });
s.addNotes('Thank you. Open for questions.');

await pres.writeFile({ fileName: OUT });
await applyTheme(OUT, THEME);
console.log('wrote', OUT);
})();
