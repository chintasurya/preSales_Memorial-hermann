// Delivery slides: sprint plan with milestones, delivery pod pyramid, investment.
// White (IG Light) layout. Figures on the investment slide are indicative.
const { icon } = require('./design-slides.js');

const INK = '000000', MUTED = '4D4D4D', CARD = 'F2F2F2', CARD_LINE = 'D0D0D6';
// Phase colors: outline (darkened brand accent for white) and text (darker still for contrast).
const PHASES = {
  design: { name: 'Assess and design', line: '00A9C0', ink: '007C8C' },
  build: { name: 'Build, test and go live', line: 'FF0068', ink: 'C8005A' },
};

// [phase, card label, weeks, scope, milestone]
const SPRINTS = [
  ['design', 'SPRINT 1', 'Weeks 1-2', 'Walk through today’s Experience Cloud site, event objects and Certain setup. Design the conference extension; confirm Zoom or Teams.', 'Design sign-off'],
  ['build', 'SPRINT 2', 'Weeks 3-4', 'Conferences, sessions, tracks, rooms and speakers in Salesforce. Ticket types and pricing.', 'Conference setup demo'],
  ['build', 'SPRINT 3', 'Weeks 5-6', 'My Agenda on the Experience Cloud site. Session seat limits and waitlists. Chase checkout and Zoom or Teams join links.', 'Book and pay end to end'],
  ['build', 'SPRINT 4', 'Weeks 7-8', 'Badges, check-in and confirmations. Load and user testing. Go-live and hypercare.', 'Live, Certain retired'],
];
const GO_LIVE = new Set([3]);
const SPRINT_COUNT = SPRINTS.length;

function addSprintPlanSlide(h, sectionTitle) {
  const { pres, txt, L, R, CW } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText(`Delivery plan: ${SPRINT_COUNT} two-week sprints, live in 8 weeks`, { placeholder: 'title' });
  txt(s, 'A working demo and a milestone sign-off with Memorial Hermann at the end of every sprint', { x: L, y: 1.42, w: 9.5, h: 0.32, fontSize: 14, color: MUTED });

  // legend
  let lx = L;
  for (const p of Object.values(PHASES)) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 1.9, w: 0.32, h: 0.16, rectRadius: 0.08, fill: { color: p.line }, line: { color: p.line } });
    const w = p.name.length * 0.085 + 0.2;
    txt(s, p.name, { x: lx + 0.42, y: 1.84, w, h: 0.28, fontSize: 11, bold: true, color: p.ink, valign: 'middle' });
    lx += 0.42 + w + 0.35;
  }
  s.addShape(pres.shapes.DIAMOND, { x: R - 1.95, y: 1.89, w: 0.18, h: 0.18, fill: { color: INK }, line: { color: INK } });
  txt(s, 'Sprint-end milestone', { x: R - 1.7, y: 1.84, w: 1.7, h: 0.28, fontSize: 11, color: MUTED, valign: 'middle' });

  // one row of tall cards
  const n = SPRINTS.length, gap = 0.2, cw = (CW - (n - 1) * gap) / n, ch = 3.3, y = 2.35, pad = 0.22;
  SPRINTS.forEach(([ph, label, weeks, scope, milestone], i) => {
    const x = L + i * (cw + gap);
    const p = PHASES[ph], live = GO_LIVE.has(i);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: live ? INK : CARD }, line: { color: p.line, width: 1.75 }, objectName: `sprint-${i + 1}` });
    const ink = live ? 'FFFFFF' : INK, muted = live ? 'D9D9D9' : MUTED;
    txt(s, label, { x: x + pad, y: y + 0.2, w: cw - 2 * pad, h: 0.28, fontSize: 13, bold: true, color: live ? p.line : p.ink, charSpacing: 2 });
    txt(s, weeks, { x: x + pad, y: y + 0.52, w: cw - 2 * pad, h: 0.26, fontSize: 12, color: muted });
    txt(s, scope, { x: x + pad, y: y + 0.95, w: cw - 2 * pad, h: 1.55, fontSize: 13, color: ink });
    s.addShape(pres.shapes.LINE, { x: x + pad, y: y + ch - 0.7, w: cw - 2 * pad, h: 0, line: { color: live ? '555555' : CARD_LINE, width: 0.75 } });
    s.addShape(pres.shapes.DIAMOND, { x: x + pad, y: y + ch - 0.47, w: 0.18, h: 0.18, fill: { color: live ? p.line : INK }, line: { color: live ? p.line : INK } });
    txt(s, milestone, { x: x + pad + 0.3, y: y + ch - 0.55, w: cw - 2 * pad - 0.3, h: 0.34, fontSize: 12.5, bold: true, color: ink, valign: 'middle' });
  });
  txt(s, 'After go-live (week 9+): patient engagement initiatives, app adoption campaigns and AI agents, scoped separately.', { x: L, y: 5.95, w: CW, h: 0.32, fontSize: 12, italic: true, color: MUTED });
  s.addNotes('Four two-week sprints, each closing with a demo and a milestone Memorial Hermann signs off. Sprint 1 walks through today’s Experience Cloud site and Certain and designs the conference extension. Sprints 2 and 3 build conference and session setup, My Agenda, seat limits and waitlists, Chase checkout and Zoom or Teams links. Sprint 4 tests and goes live, and Certain is retired. No data migration is needed. Cancellations and refunds reuse today’s Chase workflows.');
  return s;
}

async function addPodSlide(h, sectionTitle) {
  const { pres, txt, L } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('A dedicated four-person delivery pod', { placeholder: 'title' });

  // Pyramid: three stacked triangles give three bands; white rules separate them.
  const cx = 2.75, top = 1.85, base = 6.3, bw = 4.4, H = base - top;
  const widthAt = y => bw * (y - top) / H;
  const tiers = [
    { y: base, color: 'FF0068' },
    { y: top + H * 2 / 3, color: 'D9B200' },
    { y: top + H / 3, color: '00A9C0' },
  ];
  for (const t of tiers) {
    const w = widthAt(t.y);
    s.addShape(pres.shapes.ISOSCELES_TRIANGLE, { x: cx - w / 2, y: top, w, h: t.y - top, fill: { color: t.color }, line: { color: t.color } });
  }
  [top + H / 3, top + H * 2 / 3].forEach(y => {
    const w = widthAt(y);
    s.addShape(pres.shapes.LINE, { x: cx - w / 2 - 0.05, y, w: w + 0.1, h: 0, line: { color: 'FFFFFF', width: 5 } });
  });
  // headcounts inside the bands
  const counts = [['1', top + H / 3 - 0.62, '000000'], ['1', top + H * 2 / 3 - 0.72, '000000'], ['2', base - 0.82, 'FFFFFF']];
  counts.forEach(([n, y, col]) => txt(s, n, { x: cx - 0.6, y, w: 1.2, h: 0.6, fontFace: h.LIGHT_FONT, fontSize: 32, color: col, align: 'center', valign: 'middle' }));

  // tier labels with leader lines
  const labels = [
    { y: top + H / 6 + 0.12, k: 'LEAD', t: 'Project Manager', d: 'Runs sprints, milestones, risks and status', col: '007C8C' },
    { y: top + H / 2, k: 'QUALITY', t: 'QA Engineer', d: 'Test plans, automation, load tests, user testing support', col: '7A6100' },
    { y: top + H * 5 / 6, k: 'BUILD', t: '2 Developers: Salesforce and Marketing Cloud', d: 'Conference setup, registration, Chase, Zoom or Teams, emails', col: 'C8005A' },
  ];
  labels.forEach(({ y, k, t, d, col }) => {
    const edge = cx + widthAt(y) / 2;
    s.addShape(pres.shapes.LINE, { x: edge + 0.08, y, w: 5.3 - edge - 0.08, h: 0, line: { color: 'A0A0A8', width: 1, dashType: 'sysDot' } });
    s.addShape(pres.shapes.OVAL, { x: 5.3, y: y - 0.05, w: 0.1, h: 0.1, fill: { color: col }, line: { color: col } });
    txt(s, k, { x: 5.5, y: y - 0.42, w: 3.2, h: 0.22, fontSize: 9.5, bold: true, color: col, charSpacing: 2 });
    txt(s, t, { x: 5.5, y: y - 0.2, w: 3.2, h: 0.5, fontSize: 13, bold: true, color: INK });
    txt(s, d, { x: 5.5, y: y + (t.length > 32 ? 0.3 : 0.1), w: 3.2, h: 0.45, fontSize: 10.5, color: MUTED });
  });

  // right panel: how each sprint runs
  const px = 9.15, pw = 3.63;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px - 0.2, y: 1.85, w: pw + 0.2, h: 4.45, rectRadius: 0.12, fill: { color: CARD }, line: { color: CARD_LINE, width: 1 } });
  txt(s, 'Every two-week sprint', { x: px, y: 2.0, w: pw - 0.2, h: 0.32, fontSize: 15, bold: true, color: INK });
  const rituals = [
    ['FaListCheck', 'Plan', 'Sprint planning with your product owner'],
    ['FaUsers', 'Build and test', 'Daily stand-ups; QA inside the sprint'],
    ['FaChartLine', 'Demo', 'Sprint review and milestone sign-off'],
    ['FaArrowsRotate', 'Improve', 'Retrospective; adjust the next sprint'],
  ];
  for (let i = 0; i < rituals.length; i++) {
    const [ic, t, d] = rituals[i];
    const y = 2.5 + i * 0.72;
    s.addShape(pres.shapes.OVAL, { x: px, y, w: 0.42, h: 0.42, fill: { color: 'FFFFFF' }, line: { color: 'C8C8CE', width: 1 } });
    s.addImage({ data: await icon(ic, '000000'), x: px + 0.11, y: y + 0.11, w: 0.2, h: 0.2 });
    txt(s, t, { x: px + 0.55, y: y - 0.02, w: pw - 0.75, h: 0.24, fontSize: 12, bold: true, color: INK });
    txt(s, d, { x: px + 0.55, y: y + 0.22, w: pw - 0.75, h: 0.36, fontSize: 10.5, color: MUTED });
  }
  txt(s, 'FROM MEMORIAL HERMANN', { x: px, y: 5.42, w: pw - 0.2, h: 0.22, fontSize: 9, bold: true, color: '007C8C', charSpacing: 2 });
  txt(s, 'A product owner, plus an Epic and app contact from Lucky Rai’s team', { x: px, y: 5.66, w: pw - 0.25, h: 0.5, fontSize: 10.5, color: INK });

  txt(s, '4 people  ·  4 sprints  ·  8 weeks', { x: L, y: 6.45, w: 4.4, h: 0.3, fontSize: 13, bold: true, color: INK, align: 'center' });
  s.addNotes('A small, dedicated pod: one Project Manager leading delivery and running the sprints, one QA engineer embedded in every sprint, and two developers covering Salesforce and Marketing Cloud. Memorial Hermann provides a product owner and an Epic and app contact.');
  return s;
}

function addInvestmentSlide(h, sectionTitle) {
  const { pres, txt, L } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Investment', { placeholder: 'title' });
  txt(s, 'Offshore delivery model: fixed scope, four-person pod, 8 weeks', { x: L, y: 1.42, w: 9, h: 0.32, fontSize: 14, color: MUTED });

  // price card
  const cx = L, cy = 1.95, cw = 4.6, chh = 4.45;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: cy, w: cw, h: chh, rectRadius: 0.14, fill: { color: INK }, line: { color: INK }, objectName: 'price-card' });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + cw - 1.55, y: cy + 0.3, w: 1.2, h: 0.32, rectRadius: 0.16, fill: { type: 'none' }, line: { color: '00D6F2', width: 1.25 } });
  txt(s, 'OFFSHORE', { x: cx + cw - 1.55, y: cy + 0.3, w: 1.2, h: 0.32, fontSize: 9.5, bold: true, color: '00D6F2', align: 'center', valign: 'middle', charSpacing: 2 });
  txt(s, 'STANDARD PROGRAM VALUE', { x: cx + 0.35, y: cy + 0.35, w: cw - 2.0, h: 0.24, fontSize: 10, bold: true, color: 'BFBFBF', charSpacing: 2 });
  s.addText('$120,000', { isTextBox: true, x: cx + 0.35, y: cy + 0.62, w: cw - 0.7, h: 0.6, fontFace: h.LIGHT_FONT, fontSize: 30, color: '8C8C8C', strike: 'sngStrike', margin: 0, valign: 'top' });
  s.addShape(pres.shapes.LINE, { x: cx + 0.35, y: cy + 1.45, w: cw - 0.7, h: 0, line: { color: '444444', width: 0.75 } });
  txt(s, 'STRATEGIC PARTNER INVESTMENT', { x: cx + 0.35, y: cy + 1.65, w: cw - 0.7, h: 0.24, fontSize: 10, bold: true, color: '00D6F2', charSpacing: 2 });
  txt(s, '$60,000', { x: cx + 0.35, y: cy + 1.95, w: cw - 0.7, h: 1.0, fontFace: h.LIGHT_FONT, fontSize: 54, color: 'FFFFFF' });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx + 0.35, y: cy + 3.1, w: 3.4, h: 0.42, rectRadius: 0.21, fill: { color: 'FF0068' }, line: { color: 'FF0068' } });
  txt(s, '50% partnership credit, applied upfront', { x: cx + 0.35, y: cy + 3.1, w: 3.4, h: 0.42, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  txt(s, 'You save $60,000 on the full program', { x: cx + 0.35, y: cy + 3.72, w: cw - 0.7, h: 0.3, fontSize: 12, color: 'D9D9D9' });

  // breakdown table
  const tx = 5.55, colW = [3.6, 1.1, 1.3, 1.23];
  const rows = [
    ['Phase', 'Weeks', 'Standard', 'Partner'],
    ['Assess and design', '1-2', '$30,000', '$15,000'],
    ['Build, test and go live', '3-8', '$90,000', '$45,000'],
    ['Total program', '8', '$120,000', '$60,000'],
  ];
  const totalW = colW.reduce((a, b) => a + b, 0);
  let y = 1.95;
  rows.forEach((r, ri) => {
    let x = tx;
    const head = ri === 0, total = ri === rows.length - 1;
    r.forEach((c, ci) => {
      const right = ci >= 2;
      const opts = { x: x + 0.06, y, w: colW[ci] - 0.12, h: head ? 0.36 : 0.5, fontSize: head ? 12 : 12, bold: head || total || ci === 3, color: ci === 2 && !head ? '8C8C8C' : INK, align: right ? 'right' : 'left', valign: 'middle' };
      if (ci === 2 && !head) s.addText(c, { isTextBox: true, margin: 0, strike: 'sngStrike', ...opts });
      else txt(s, c, opts);
      x += colW[ci];
    });
    y += head ? 0.36 : 0.5;
    s.addShape(pres.shapes.LINE, { x: tx, y, w: totalW, h: 0, line: head || ri === rows.length - 2 ? { color: INK, width: 1.25 } : { color: 'A0A0A8', width: 0.75, dashType: 'sysDot' } });
  });

  // included / not included
  const iy = 4.05;
  txt(s, 'Included', { x: tx, y: iy, w: 3.5, h: 0.3, fontSize: 14, bold: true, color: INK });
  s.addText([
    { text: 'Dedicated four-person offshore pod for 8 weeks', options: { bullet: true, breakLine: true } },
    { text: 'Sprint demos and milestone sign-offs', options: { bullet: true, breakLine: true } },
    { text: 'Testing, load testing, go-live and hypercare', options: { bullet: true, breakLine: true } },
    { text: 'Documentation and handover to your admins', options: { bullet: true } },
  ], { isTextBox: true, x: tx, y: iy + 0.36, w: 3.6, h: 1.6, fontSize: 11, color: MUTED, margin: 0, valign: 'top', paraSpaceAfter: 4 });
  txt(s, 'Not included', { x: tx + 3.85, y: iy, w: 3.4, h: 0.3, fontSize: 14, bold: true, color: INK });
  s.addText([
    { text: 'Salesforce licenses', options: { bullet: true, breakLine: true } },
    { text: 'Zoom or Teams licenses', options: { bullet: true, breakLine: true } },
    { text: 'Payment gateway transaction fees', options: { bullet: true, breakLine: true } },
    { text: 'Waiting room subscription', options: { bullet: true } },
  ], { isTextBox: true, x: tx + 3.85, y: iy + 0.36, w: 3.38, h: 1.6, fontSize: 11, color: MUTED, margin: 0, valign: 'top', paraSpaceAfter: 4 });
  txt(s, 'Pricing is for an offshore delivery model. Indicative, billed at sprint milestones; final commercials in the statement of work.', { x: tx, y: 6.1, w: totalW, h: 0.3, fontSize: 10.5, italic: true, color: MUTED });
  s.addNotes('Pricing is for an offshore delivery model. Standard program value is $120,000 for a four-person pod over 8 weeks. As a strategic partner, Memorial Hermann receives a 50% partnership credit applied upfront, for an investment of $60,000. Billing follows sprint milestones. Licenses (Salesforce, Zoom or Teams) and third-party fees are outside this price.');
  return s;
}

module.exports = { addSprintPlanSlide, addPodSlide, addInvestmentSlide };
