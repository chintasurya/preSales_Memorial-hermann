// Design slides: demand handling, payments and data security, AI agent harness.
// Exported as functions so both the preview script and build-deck.js can add them.
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const fa = require('react-icons/fa6');
const sharp = require('sharp');

const iconCache = {};
async function icon(name, color) {
  const key = name + color;
  if (!iconCache[key]) {
    const svg = renderToStaticMarkup(React.createElement(fa[name], { color: '#' + color, size: 256 }));
    const png = await sharp(Buffer.from(svg)).png().toBuffer();
    iconCache[key] = 'image/png;base64,' + png.toString('base64');
  }
  return iconCache[key];
}

// h = { pres, txt, C, L, R, CW, W, LIGHT_FONT, MUTED_DARK, MUTED_LIGHT, HEX }
async function addDemandSlide(h, sectionTitle) {
  const { pres, txt, C, L, R, LIGHT_FONT, MUTED_DARK, HEX } = h;
  const s = pres.addSlide({ masterName: 'IG Dark', sectionTitle });
  s.addText('Every seat filled, no interested person lost', { placeholder: 'title' });
  txt(s, 'When interest outruns seats: a popular class or a conference opening', { x: L, y: 1.45, w: 9, h: 0.35, fontSize: 14, color: MUTED_DARK });

  const steps = [
    ['FaGlobe', 'Edge protection', 'Cached pages, bot defense, rate limits'],
    ['FaHourglassHalf', 'Fair waiting room', 'Admits people in arrival order'],
    ['FaTicket', 'Seat hold', '10-minute hold; a seat can never be sold twice'],
    ['FaCreditCard', 'Hosted payment', 'Paid = confirmed; unpaid seats return'],
    ['FaDatabase', 'Salesforce', 'Queued and retried; never lost'],
  ];
  const accents = [HEX.cyan, HEX.yellow, HEX.magenta, HEX.yellow, HEX.cyan];
  const nodeW = 2.2, gap = 0.3, y0 = 2.05, nodeH = 1.45;
  for (let i = 0; i < steps.length; i++) {
    const [ic, title, desc] = steps[i];
    const x = L + i * (nodeW + gap);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: y0, w: nodeW, h: nodeH, rectRadius: 0.12, line: { color: accents[i], width: 1.5 }, fill: { color: '111114' }, objectName: `step-${i + 1}` });
    s.addImage({ data: await icon(ic, accents[i]), x: x + 0.18, y: y0 + 0.18, w: 0.32, h: 0.32 });
    txt(s, String(i + 1), { x: x + nodeW - 0.45, y: y0 + 0.16, w: 0.3, h: 0.3, fontSize: 12, color: MUTED_DARK, align: 'right' });
    txt(s, title, { x: x + 0.18, y: y0 + 0.6, w: nodeW - 0.3, h: 0.3, fontSize: 14, bold: true, color: C.background1 });
    txt(s, desc, { x: x + 0.18, y: y0 + 0.92, w: nodeW - 0.3, h: 0.5, fontSize: 11, color: MUTED_DARK });
    if (i < steps.length - 1) s.addShape(pres.shapes.LINE, { x: x + nodeW + 0.03, y: y0 + nodeH / 2, w: gap - 0.06, h: 0, line: { color: C.background1, width: 1.25, endArrowType: 'triangle' } });
  }

  txt(s, 'WHERE EVERY CLICK ENDS UP', { x: L, y: 3.85, w: 6, h: 0.3, fontSize: 10, bold: true, color: C.background1, charSpacing: 3 });
  const outcomes = [
    ['30', 'Confirmed seats', 'Paid, ticketed, QR check-in sent', HEX.cyan],
    ['60', 'On the waitlist', 'Freed seats offered by SMS with a 2-hour claim window', HEX.yellow],
    ['All others', 'On the interest list', 'Told the moment a new date opens', HEX.magenta],
  ];
  outcomes.forEach(([n, t, d, col], i) => {
    const x = L + i * 2.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.2, w: 2.75, h: 1.95, rectRadius: 0.12, line: { color: '3A3A42', width: 1 }, fill: { color: '17171B' } });
    txt(s, n, { x: x + 0.22, y: 4.32, w: 2.5, h: 0.7, fontFace: LIGHT_FONT, fontSize: 32, color: col });
    txt(s, t, { x: x + 0.22, y: 5.05, w: 2.5, h: 0.3, fontSize: 14, bold: true, color: C.background1 });
    txt(s, d, { x: x + 0.22, y: 5.38, w: 2.35, h: 0.65, fontSize: 11, color: MUTED_DARK });
  });

  // Overflow loop
  const lx = L + 3 * 2.95 + 0.2, lw = R - (L + 3 * 2.95 + 0.2);
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: lx, y: 4.2, w: lw, h: 1.95, rectRadius: 0.12, line: { color: HEX.magenta, width: 1.5, dashType: 'dash' }, fill: { type: 'none' } });
  s.addImage({ data: await icon('FaArrowsRotate', HEX.magenta), x: lx + 0.2, y: 4.36, w: 0.3, h: 0.3 });
  txt(s, 'Turn overflow into sessions', { x: lx + 0.6, y: 4.34, w: lw - 0.75, h: 0.34, fontSize: 13, bold: true, color: C.background1 });
  s.addText([
    { text: 'Demand passes 3× the seats', options: { bullet: { type: 'number' }, breakLine: true } },
    { text: 'Staff add a session in one click', options: { bullet: { type: 'number' }, breakLine: true } },
    { text: 'Waitlist offered first, then the interest list', options: { bullet: { type: 'number' } } },
  ], { isTextBox: true, x: lx + 0.2, y: 4.78, w: lw - 0.35, h: 1.3, fontSize: 11, color: MUTED_DARK, margin: 0, valign: 'top', paraSpaceAfter: 4 });
  s.addShape(pres.shapes.LINE, { x: L + 2 * 2.95 + 2.77, y: 5.17, w: lx - (L + 2 * 2.95 + 2.77) - 0.03, h: 0, line: { color: HEX.magenta, width: 1.25, dashType: 'dash', endArrowType: 'triangle' } });

  txt(s, 'Reliable: queued, idempotent writes and auto-released holds.   Scalable: only admitted traffic reaches Salesforce.   Secure: bot defense on every hot event.', { x: L, y: 6.35, w: 12.2, h: 0.35, fontSize: 11, italic: true, color: C.accent1 });
  s.addNotes('A popular class can draw far more interest than seats. The platform answers every click within seconds, never oversells, never charges someone who did not get a seat, and keeps everyone who missed out on a waitlist or interest list. When demand passes a threshold, staff add a session in one click and the people waiting get first access. Numbers are an example; caps and thresholds are set per event.');
  return s;
}

async function addSecuritySlide(h, sectionTitle) {
  const { pres, txt, C, L, MUTED_LIGHT, HEX } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Payments and data security by design', { placeholder: 'title' });

  // Left: payment flow
  txt(s, 'Card data never enters our systems', { x: L, y: 1.6, w: 5.8, h: 0.4, fontSize: 17, bold: true, color: C.text1 });
  const flow = [
    ['FaUser', 'Registrant', 'Website, Experience Cloud or app'],
    ['FaCreditCard', 'Gateway hosted page', 'Card typed here (Chase or Authorize.net)'],
    ['FaKey', 'Signed webhook', 'Token, last 4 digits, approval code'],
    ['FaDatabase', 'Salesforce payment record', 'Token reference, last 4, amount, status'],
  ];
  const fx = L + 0.25, fw = 3.2, fh = 0.8, fy0 = 2.3, fgap = 0.3;
  // card-data zone around the first two steps
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: L, y: fy0 - 0.15, w: 3.7, h: 2 * fh + fgap + 0.3, rectRadius: 0.1, line: { color: HEX.magenta, width: 1.25, dashType: 'dash' }, fill: { type: 'none' } });
  for (let i = 0; i < flow.length; i++) {
    const [ic, t, d] = flow[i];
    const y = fy0 + i * (fh + fgap) + (i >= 2 ? 0.12 : 0);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: fx, y, w: fw, h: fh, rectRadius: 0.08, line: { color: 'D0D0D6', width: 1 }, fill: { color: 'F2F2F2' } });
    s.addImage({ data: await icon(ic, '000000'), x: fx + 0.15, y: y + 0.25, w: 0.3, h: 0.3 });
    txt(s, t, { x: fx + 0.58, y: y + 0.09, w: fw - 0.68, h: 0.28, fontSize: 12, bold: true, color: C.text1 });
    txt(s, d, { x: fx + 0.58, y: y + 0.37, w: fw - 0.68, h: 0.4, fontSize: 10.5, color: MUTED_LIGHT });
    if (i < flow.length - 1) {
      const ay = y + fh + 0.02, ah = fgap - 0.04 + (i === 1 ? 0.12 : 0);
      s.addShape(pres.shapes.LINE, { x: fx + fw / 2, y: ay, w: 0, h: ah, line: { color: '000000', width: 1.25, endArrowType: 'triangle' } });
    }
  }
  txt(s, 'CARD DATA ZONE', { x: 4.45, y: 2.3, w: 2.1, h: 0.3, fontSize: 9, bold: true, color: HEX.magentaDark, charSpacing: 2 });
  txt(s, 'Card numbers go straight to the payment gateway. PCI scope stays at the simplest level (SAQ A) [to confirm].', { x: 4.45, y: 2.6, w: 2.1, h: 1.4, fontSize: 11, color: MUTED_LIGHT });
  txt(s, 'OUR SYSTEMS', { x: 4.45, y: 4.6, w: 2.1, h: 0.3, fontSize: 9, bold: true, color: C.text1, charSpacing: 2 });
  txt(s, 'No card number, CVV or expiry stored. Refunds by token. Signed, idempotent webhooks. Daily reconciliation.', { x: 4.45, y: 4.9, w: 2.1, h: 1.4, fontSize: 11, color: MUTED_LIGHT });

  // Right: defense in depth
  const rx = 6.85, rw = 5.93;
  txt(s, 'Registrant and patient data, protected in layers', { x: rx, y: 1.6, w: rw, h: 0.4, fontSize: 17, bold: true, color: C.text1 });
  const layers = [
    ['FaGlobe', 'Edge', 'TLS 1.2+, web application firewall, bot defense, rate limits'],
    ['FaIdBadge', 'Access', 'SSO with MFA for staff; least-privilege permission sets'],
    ['FaLock', 'Data', 'Shield Platform Encryption on sensitive fields; field-level security'],
    ['FaEye', 'Monitoring', 'Event Monitoring, Field Audit Trail, real-time alerts'],
    ['FaScaleBalanced', 'Governance', 'BAA [to confirm], data retention, no tracking pixels, pen tests'],
  ];
  const ly0 = 2.1, lh = 0.74, lgap = 0.1;
  for (let i = 0; i < layers.length; i++) {
    const [ic, t, d] = layers[i];
    const y = ly0 + i * (lh + lgap), inset = i * 0.12;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: rx + inset, y, w: rw - inset, h: lh, rectRadius: 0.1, line: { color: 'D0D0D6', width: 1 }, fill: { color: i === 2 ? '000000' : 'F2F2F2' }, objectName: `layer-${t}` });
    const ink = i === 2 ? 'FFFFFF' : '000000';
    s.addShape(pres.shapes.OVAL, { x: rx + inset + 0.16, y: y + 0.15, w: 0.44, h: 0.44, fill: { color: i === 2 ? HEX.cyan : 'FFFFFF' }, line: { color: i === 2 ? HEX.cyan : 'C8C8CE', width: 1 } });
    s.addImage({ data: await icon(ic, '000000'), x: rx + inset + 0.27, y: y + 0.26, w: 0.22, h: 0.22 });
    txt(s, t, { x: rx + inset + 0.75, y: y + 0.1, w: 1.4, h: 0.3, fontSize: 13, bold: true, color: ink });
    txt(s, d, { x: rx + inset + 0.75, y: y + 0.38, w: rw - inset - 0.9, h: 0.32, fontSize: 11, color: i === 2 ? 'D9D9D9' : MUTED_LIGHT });
  }
  txt(s, 'Class topics are treated as sensitive: signing up for a diabetes class implies a health condition.', { x: rx, y: 6.4, w: rw, h: 0.3, fontSize: 11, italic: true, color: MUTED_LIGHT });
  s.addNotes('Two messages. First, card numbers never touch Memorial Hermann or Salesforce systems: the gateway hosts the payment page and returns a token. Second, registrant and patient data is protected in layers from the edge to governance. Shield licensing, BAA coverage and PCI level to be confirmed with Memorial Hermann IT and finance.');
  return s;
}

async function addHarnessSlide(h, sectionTitle) {
  const { pres, txt, C, L, MUTED_DARK, HEX } = h;
  const s = pres.addSlide({ masterName: 'IG Dark', sectionTitle });
  s.addText('Future state: AI agents in a controlled harness', { placeholder: 'title' });

  txt(s, 'Phase 4, after the core platform is stable. Agentforce and Data Cloud [to confirm].', { x: L, y: 1.45, w: 9, h: 0.35, fontSize: 14, color: MUTED_DARK });
  const cx = 4.4, cy = 4.35, R = 2.0;
  // orbit
  s.addShape(pres.shapes.OVAL, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, line: { color: '5A5A64', width: 1, dashType: 'sysDot' }, fill: { type: 'none' } });
  // harness ring and core
  s.addShape(pres.shapes.OVAL, { x: cx - 1.3, y: cy - 1.3, w: 2.6, h: 2.6, line: { color: HEX.cyan, width: 2.25 }, fill: { color: '0E1A1D' }, objectName: 'harness' });
  txt(s, 'HARNESS', { x: cx - 1.0, y: cy - 1.12, w: 2.0, h: 0.28, fontSize: 10, bold: true, color: HEX.cyan, align: 'center', charSpacing: 4 });
  s.addShape(pres.shapes.OVAL, { x: cx - 0.8, y: cy - 0.72, w: 1.6, h: 1.6, fill: { color: HEX.cyan }, line: { color: HEX.cyan }, objectName: 'platform' });
  txt(s, 'Event platform + Marketing Cloud', { x: cx - 0.68, y: cy - 0.5, w: 1.36, h: 1.16, fontSize: 11.5, bold: true, color: '000000', align: 'center', valign: 'middle' });

  const agents = [
    ['FaCalendarCheck', 'Event Ops', 'Sessions, capacity, reminders', -90, HEX.yellow],
    ['FaChartLine', 'Demand', 'Spots surges, drafts new dates', -18, HEX.magenta],
    ['FaBullhorn', 'Campaign', 'Builds PEI journeys', 54, HEX.yellow],
    ['FaComments', 'Concierge', 'Registers and answers on web, app, SMS', 126, HEX.magenta],
    ['FaLightbulb', 'Insights', 'Summarizes feedback and results', 198, HEX.yellow],
  ];
  const d = 0.9;
  for (const [ic, name, role, deg, col] of agents) {
    const a = deg * Math.PI / 180, nx = cx + R * Math.cos(a), ny = cy + R * Math.sin(a);
    // spoke from node to harness ring
    const sx = cx + 1.3 * Math.cos(a), sy = cy + 1.3 * Math.sin(a);
    const ex = cx + (R - d / 2) * Math.cos(a), ey = cy + (R - d / 2) * Math.sin(a);
    s.addShape(pres.shapes.LINE, { x: Math.min(sx, ex), y: Math.min(sy, ey), w: Math.abs(ex - sx), h: Math.abs(ey - sy), flipH: (ex < sx) !== (ey < sy), line: { color: col, width: 1.25, dashType: 'dash' } });
    s.addShape(pres.shapes.OVAL, { x: nx - d / 2, y: ny - d / 2, w: d, h: d, fill: { color: '15151A' }, line: { color: col, width: 1.75 }, objectName: `agent-${name}` });
    s.addImage({ data: await icon(ic, col), x: nx - 0.19, y: ny - 0.19, w: 0.38, h: 0.38 });
    const right = Math.cos(a) > 0.1 || deg === -90;
    const lw = right ? Math.min(2.0, 8.2 - (nx + d / 2 + 0.12)) : Math.min(2.0, nx - d / 2 - 0.12 - L);
    const lx = right ? nx + d / 2 + 0.12 : nx - d / 2 - 0.12 - lw;
    const ly = ny - 0.32;
    txt(s, name, { x: lx, y: ly, w: lw, h: 0.3, fontSize: 13, bold: true, color: C.background1, align: right ? 'left' : 'right' });
    txt(s, role, { x: lx, y: ly + 0.3, w: lw, h: 0.66, fontSize: 10.5, color: MUTED_DARK, align: right ? 'left' : 'right' });
  }

  // Right panel: harness controls
  const px = 8.35, pw = 4.43;
  txt(s, 'What the harness controls', { x: px, y: 1.75, w: pw, h: 0.4, fontSize: 17, bold: true, color: C.background1 });
  const controls = [
    ['FaListCheck', 'Approved actions only'],
    ['FaShieldHalved', 'Guardrails: consent, patient data, spend limits'],
    ['FaUserCheck', 'Staff approve anything sent or published'],
    ['FaIdBadge', 'Least-privilege identity per agent'],
    ['FaClipboardList', 'Full audit trail of every action'],
    ['FaVial', 'Tested and evaluated before each release'],
    ['FaLock', 'Einstein Trust Layer: masking, zero data retention'],
    ['FaPowerOff', 'Kill switch for any agent'],
  ];
  for (let i = 0; i < controls.length; i++) {
    const [ic, t] = controls[i];
    const y = 2.3 + i * 0.47;
    s.addImage({ data: await icon(ic, HEX.cyan), x: px, y: y + 0.03, w: 0.26, h: 0.26 });
    txt(s, t, { x: px + 0.42, y, w: pw - 0.42, h: 0.34, fontSize: 12, color: C.background1, valign: 'middle' });
  }
  // autonomy scale
  txt(s, 'AUTONOMY GROWS WITH TRUST', { x: px, y: 6.17, w: pw, h: 0.25, fontSize: 9, bold: true, color: MUTED_DARK, charSpacing: 2 });
  const tiers = ['Suggest', 'Act with approval', 'Act within limits'];
  tiers.forEach((t, i) => {
    const x = px + i * 1.5;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 6.45, w: 1.38, h: 0.34, rectRadius: 0.17, line: { color: [HEX.cyan, HEX.yellow, HEX.magenta][i], width: 1.25 }, fill: { type: 'none' } });
    txt(s, t, { x, y: 6.45, w: 1.38, h: 0.34, fontSize: 10, bold: true, color: C.background1, align: 'center', valign: 'middle' });
  });
  return s;
}

module.exports = { addDemandSlide, addSecuritySlide, addHarnessSlide, icon };
