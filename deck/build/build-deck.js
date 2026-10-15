// Builds deck/Memorial-Hermann-Event-Platform.pptx in the Insight Global template style.
// Backgrounds come from the IG template (deck/assets/bg), screens from deck/mockups/png.
// Run: npm install && node build-deck.js
const path = require('path');
const pptxgen = require('pptxgenjs');
const { applyTheme } = require('./apply_theme.js');
const { addDemandSlide, addSecuritySlide, addHarnessSlide } = require('./design-slides.js');
const { addOverallDesignSlide, addSeatFlowSlide, addPaymentSequenceSlide } = require('./sequence-slides.js');
const { addSprintPlanSlide, addPodSlide, addInvestmentSlide } = require('./delivery-slides.js');

const ROOT = path.join(__dirname, '..');
const BG = f => path.join(ROOT, 'assets', 'bg', f);
const IMG = f => path.join(ROOT, 'mockups', 'png', f);
const OUT = path.join(ROOT, 'Memorial-Hermann-Event-Platform.pptx');

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
txt(s, 'CLASSES  ·  EVENTS  ·  CONFERENCES  ·  ENGAGEMENT', { x: 1.0, y: 5.15, w: W - 2, h: 0.3, fontSize: 11, color: C.background1, align: 'center', charSpacing: 4 });
txt(s, 'OCTOBER 2026', { x: 1.0, y: 6.75, w: W - 2, h: 0.3, fontSize: 11, bold: true, color: C.background1, align: 'center', charSpacing: 5 });
s.addNotes('Thank Kevin for the detailed answers. Today: how we solve the event registration problem on the Salesforce platform they already own, how we deliver it, and how the registration data can grow engagement and the network.');

// 2. Agenda
s = pres.addSlide({ masterName: 'IG Agenda', sectionTitle: 'Introduction' });
s.addText('Agenda', { placeholder: 'title' });
const agenda = ['What we heard', 'The solution and design', 'Payments and data security', 'Delivery timeline', 'Beyond the event', 'Roadmap and next steps'];
agenda.forEach((a, i) => {
  const col = i < 3 ? 0 : 1, row = i % 3;
  const x = col === 0 ? 0.6 : 6.9, y = 2.2 + row * 0.95;
  numCircle(s, i + 1, x, y, C.background1);
  txt(s, a, { x: x + 0.7, y, w: 5.2, h: 0.46, fontFace: LIGHT_FONT, fontSize: 22, color: C.background1, valign: 'middle' });
});
s.addNotes('Sections 1 to 4 solve the problem Kevin described. Section 5 is the value we add on top: using registration data to keep people engaged and bring them into the Memorial Hermann network.');

// 3. What we heard
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'Introduction' });
s.addText('What we heard', { placeholder: 'title' });
ruledTable(s, L, 1.75, [2.6, 4.9, 4.73], [
  ['Area', 'Today', 'With one platform'],
  ['Classes and events', 'Home-built on Salesforce + Sitecore; payments through Chase', 'One Salesforce event app for every class, tour and seminar'],
  ['Conferences', 'Certain for 1 to 2 multi-day events a year; Authorize.net', 'Same app with sessions, tracks and speakers; Certain retired'],
  ['Who registers', 'Consumers, caregivers and providers', 'One profile per person, matched to Health Cloud'],
  ['Platform', 'Health Cloud and Marketing Cloud', 'Built on what Memorial Hermann already owns'],
  ['Epic', 'Not needed for this use case', 'Lucky Rai’s team if an integration is ever required'],
], { rowH: 0.72 });
txt(s, 'Goal: one platform for simple classes (free or paid, in person or online) and multi-day conferences with session management.', { x: L, y: 6.25, w: CW, h: 0.4, fontSize: 15, bold: true, color: C.text1 });
s.addNotes('Play back Kevin’s answers so he can correct anything. Two systems and two payment gateways today; the goal is one platform.');

// 4. Section 01
pres.addSection({ title: 'The solution' });
s = pres.addSlide({ masterName: 'IG Section Blue', sectionTitle: 'The solution' });
s.addText('01  THE SOLUTION', { placeholder: 'title' });
s.addText('One Salesforce event app for classes, events and conferences', { placeholder: 'body' });

// 5. Solution overview
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'The solution' });
s.addText('An event app inside your Salesforce org', { placeholder: 'title' });
const cols = [
  ['Register', 'Website and My MH app', ['Sign-up on Sitecore pages and inside the existing My Memorial Hermann app', 'Secure hosted checkout', '“My Agenda” portal for conferences']],
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
const conns = ['Chase', 'Authorize.net', 'Sitecore', 'Zoom / Teams', 'Health Cloud', 'Marketing Cloud'];
conns.forEach((c, i) => pill(s, c, L + i * 2.05, 6.0, 1.85, [C.accent1, C.accent2, C.accent3][i % 3], C.background1));
txt(s, 'Reliable, secure and scalable by design: waiting room and seat holds for busy events, encrypted data, full audit trail.', { x: L, y: 6.55, w: CW, h: 0.3, fontSize: 11, italic: true, color: C.accent1 });
s.addNotes('One app on the Health Cloud org they already own. Sitecore and the existing My Memorial Hermann app are the front doors, Salesforce runs events, Marketing Cloud sends every message. This retires both the home-built class tool and Certain.');

// Overall solution design (sequence view)
addOverallDesignSlide(h, 'The solution');

// 6. Registration screens
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'The solution' });
s.addText('One registration flow for website and app', { placeholder: 'title' });
frameImage(s, '01-web-registration.png', L, 1.85, 5.95, 3.72);
frameImage(s, '02-mobile-flow.png', 6.83, 1.85, 5.95, 3.72);
txt(s, 'Website', { x: L, y: 5.75, w: 5.95, h: 0.3, fontSize: 15, bold: true, color: C.text1 });
txt(s, 'Search by topic, location, date, format and price. Seats left and waitlists update live.', { x: L, y: 6.07, w: 5.95, h: 0.55, fontSize: 13, color: MUTED_LIGHT });
txt(s, 'Existing My Memorial Hermann app', { x: 6.83, y: 5.75, w: 5.95, h: 0.3, fontSize: 15, bold: true, color: C.text1 });
txt(s, 'A Classes & Events entry in the app people already use. No new app to download [Epic setup to confirm].', { x: 6.83, y: 6.07, w: 5.95, h: 0.55, fontSize: 13, color: MUTED_LIGHT });
s.addNotes('Concept screens, sample data. One registration flow serves the Sitecore website and the existing My Memorial Hermann app (Epic MyChart), so nothing is built twice. How it appears in the app (menu link or SMART on FHIR launch) is confirmed with Lucky Rai’s team.');

// 7. Staff console
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'The solution' });
s.addText('Staff run every class from one Salesforce console', { placeholder: 'title' });
frameImage(s, '03-salesforce-console.png', L, 1.95, 8.6, 3.87);
txt(s, 'What staff can do', { x: 9.55, y: 1.95, w: 3.25, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
bullets(s, ['Set up a class once and repeat it as a series', 'Watch capacity and waitlists fill in real time', 'Match registrants to existing Health Cloud records', 'Check people in with a QR scan', 'Email attendees and track revenue'], { x: 9.55, y: 2.5, w: 3.25, h: 3.4, fontSize: 14, color: MUTED_LIGHT });
txt(s, 'Concept mockup, sample data', { x: L, y: 6.0, w: 5, h: 0.3, fontSize: 11, italic: true, color: MUTED_LIGHT });
s.addNotes('This is a standard Salesforce Lightning app, so their in-house Salesforce admins can own it after launch.');

// 8. Conference screens
s = pres.addSlide({ masterName: 'IG Light', sectionTitle: 'The solution' });
s.addText('Conferences with full session management', { placeholder: 'title' });
frameImage(s, '04-conference-agenda.png', L, 1.85, 7.5, 4.69);
txt(s, 'Replaces Certain', { x: 8.5, y: 1.85, w: 4.3, h: 0.4, fontSize: 18, bold: true, color: C.text1 });
bullets(s, ['Multi-day agenda with tracks and rooms', 'Attendees build their own “My Agenda”', 'Session capacity and waitlists', 'Speaker profiles and assignments', 'Ticket types for providers and guests', 'Badges and CME credit tracking [to confirm]'], { x: 8.5, y: 2.4, w: 4.3, h: 3.6, fontSize: 14, color: MUTED_LIGHT });
s.addNotes('Conferences use the same app and data as classes, so attendees, payments and reporting stay in one place. CME requirements to be confirmed with Kevin.');

// Demand handling, seat-flow detail, payments and data security, payment detail
await addDemandSlide(h, 'The solution');
addSeatFlowSlide(h, 'The solution');
await addSecuritySlide(h, 'The solution');
addPaymentSequenceSlide(h, 'The solution');

// 10. Section 02
pres.addSection({ title: 'Delivery plan' });
s = pres.addSlide({ masterName: 'IG Section Gold', sectionTitle: 'Delivery plan' });
s.addText('02  DELIVERY PLAN', { placeholder: 'title' });
s.addText('Two phases, about 24 weeks to both platforms live', { placeholder: 'body' });

// 11. Timeline (template timeline style)
s = pres.addSlide({ masterName: 'IG Spectrum', sectionTitle: 'Delivery plan' });
s.addText('Delivery timeline', { placeholder: 'title' });
txt(s, 'Indicative; confirmed after the current-state walkthrough', { x: L, y: 1.45, w: 8, h: 0.35, fontSize: 14, color: MUTED_DARK });
const lineY = 3.95;
s.addShape(pres.shapes.LINE, { x: 0.68, y: lineY, w: W - 1.36, h: 0, line: { color: C.background1, width: 3 } });
[0.55, W - 0.81].forEach(x => s.addShape(pres.shapes.OVAL, { x, y: lineY - 0.13, w: 0.26, h: 0.26, fill: { color: C.background1 }, line: { color: C.background1 } }));
const blocks = [
  { x: 1.15, up: false, w: 3.3, h: 'Weeks 1-3  ·  Discover and design', b: 'Walkthrough of the current build, requirements, data model, payment decision' },
  { x: 3.85, up: true, w: 3.3, h: 'Weeks 4-14  ·  Phase 1 live', b: 'Classes and events: registration, payments, journeys, check-in. Home-built tool retired' },
  { x: 6.95, up: false, w: 3.3, h: 'Weeks 15-24  ·  Phase 2 live', b: 'Conferences: sessions, speakers, My Agenda, badges. Certain retired' },
  { x: 9.7, up: true, w: 2.9, h: 'Week 25+  ·  Grow', b: 'Patient engagement initiatives, app adoption, AI agents in a controlled harness' },
];
blocks.forEach(({ x, up, w, h, b }) => {
  const y = up ? 2.45 : lineY + 0.25;
  s.addShape(pres.shapes.LINE, { x, y, w: 0, h: 1.25, line: { color: C.background1, width: 1.25, dashType: 'sysDot' } });
  txt(s, h, { x: x + 0.2, y, w, h: 0.32, fontSize: 13, bold: true, color: C.background1 });
  txt(s, b, { x: x + 0.2, y: y + 0.4, w, h: 0.85, fontSize: 12, color: C.background1 });
  s.addShape(pres.shapes.OVAL, { x: x - 0.09, y: lineY - 0.09, w: 0.18, h: 0.18, fill: { color: C.accent2 }, line: { color: C.accent2 } });
});
s.addNotes('Phase 1 replaces the home-built class registration around week 14. Phase 2 replaces Certain around week 24; time it to land before the Certain renewal. Engagement work can start as soon as Phase 1 is live.');

// Sprint plan and delivery pod (replace the phase scope table)
addSprintPlanSlide(h, 'Delivery plan');
await addPodSlide(h, 'Delivery plan');

// 13. Section 03
pres.addSection({ title: 'Beyond the event' });
s = pres.addSlide({ masterName: 'IG Section Magenta', sectionTitle: 'Beyond the event' });
s.addText('03  BEYOND THE EVENT', { placeholder: 'title' });
s.addText('Turn every registration into a lasting relationship', { placeholder: 'body' });

// 14. Value proposition (template stat style)
s = pres.addSlide({ masterName: 'IG Dark', sectionTitle: 'Beyond the event' });
txt(s, 'Every registration tells you what a person cares about. Use it to bring them back and into the network.', { x: L, y: 1.1, w: 5.6, h: 2.6, fontFace: LIGHT_FONT, fontSize: 30, color: C.background1 });
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
  ['Classes and events', 'Weeks 1-14', ['Registration and payments', 'Marketing Cloud reminders', 'QR check-in and reporting']],
  ['Conferences', 'Weeks 15-24', ['Sessions and speakers', 'My Agenda and badges', 'Certain retired']],
  ['Engagement', 'From Phase 1 go-live', ['PEI journeys by service line', 'App download campaigns', 'Find-a-doctor nurture']],
  ['AI agents', 'Week 25+', ['Agents in a controlled harness', 'Demand and campaign agents', 'Concierge on web, app and SMS']],
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
  'Walk through the current class solution with Lucky Rai’s team',
  'Confirm how registration opens inside the My Memorial Hermann app',
  'Confirm yearly volumes: classes, conferences, registrants',
  'Confirm conference must-haves: sessions, badges, sponsors, CME',
  'Agree the payment approach: keep both gateways or consolidate',
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
