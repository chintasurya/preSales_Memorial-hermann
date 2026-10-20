// Concept screen slides (registrant booking, staff setup, interest list) and the Certain transition slide.
// White (IG Light) layout; screens come from deck/mockups/png.
const path = require('path');

const IMG = f => path.join(__dirname, '..', 'mockups', 'png', f);
const INK = '000000', MUTED = '4D4D4D', CARD = 'F2F2F2', CARD_LINE = 'D0D0D6';
const PURPLE = '45289F', MAGENTA = 'C8005A';

function frame(s, file, x, y, w, h) {
  s.addImage({ path: IMG(file), x, y, w, h, objectName: file, shadow: { type: 'outer', blur: 8, offset: 2, angle: 90, color: '000000', opacity: 0.25 } });
}

function stepLabel(s, h, n, text, x, y, w) {
  const { pres, txt } = h;
  s.addShape(pres.shapes.OVAL, { x, y, w: 0.34, h: 0.34, fill: { color: INK }, line: { color: INK } });
  txt(s, String(n), { x, y, w: 0.34, h: 0.34, fontSize: 12, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  txt(s, text, { x: x + 0.45, y, w: w - 0.45, h: 0.34, fontSize: 14, bold: true, color: INK, valign: 'middle' });
}

function addBookingFlowSlide(h, sectionTitle) {
  const { pres, txt, L, R } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Registrant view: find it, book it, pay, add to calendar', { placeholder: 'title' });
  const lw = 4.98, lh = lw * 1000 / 1120;
  const rx = L + lw + 0.3, rw = R - rx, rh = rw * 840 / 1320;
  stepLabel(s, h, 1, 'Sitecore page: conferences, classes and events', L, 1.5, lw + 0.3);
  stepLabel(s, h, 2, 'Click Book on a conference: session details, pay, add to calendar', rx, 1.5, rw);
  frame(s, '07-sitecore-listing.png', L, 2.0, lw, lh);
  frame(s, '08-conference-booking.png', rx, 2.0, rw, rh);
  txt(s, 'Concept mockup, sample data. Listings stay on Sitecore; booking runs on the existing Experience Cloud site and app; payment on Chase’s hosted page.', { x: L, y: 6.58, w: R - L, h: 0.28, fontSize: 10.5, italic: true, color: MUTED });
  s.addNotes('One listing for conferences, classes and events, on the Sitecore page people already use. Book on a conference opens the registration site: pick sessions by day (seats are held while paying), pay on Chase’s hosted page, then get an instant confirmation with a QR code for check-in and add-to-calendar links. Classes and events use the same flow without the session step.');
  return s;
}

function addStaffSetupSlide(h, sectionTitle) {
  const { pres, txt, L } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Staff view: set up a conference and its sessions', { placeholder: 'title' });
  const iw = 8.9, ih = iw / 2;
  frame(s, '09-staff-conference-setup.png', L, 1.75, iw, ih);
  const px = L + iw + 0.35, pw = 12.78 - px;
  txt(s, 'How organizers work', { x: px, y: 1.75, w: pw, h: 0.4, fontSize: 18, bold: true, color: INK });
  const items = [
    ['One form for every event', 'Pick class, event or conference; dates, venue, capacity'],
    ['Ticket types per audience', 'Provider, nurse, caregiver and community prices'],
    ['Sessions in minutes', 'Day, time, room, track, speaker, seat limit, CME [to confirm]'],
    ['Payment and journey', 'Chase checkout and a Marketing Cloud journey set per event'],
    ['Publish', 'The agenda appears on the website and app'],
  ];
  items.forEach(([t, d], i) => {
    const y = 2.3 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, { x: px, y: y + 0.04, w: 0.06, h: 0.6, fill: { color: MAGENTA }, line: { color: MAGENTA } });
    txt(s, t, { x: px + 0.2, y, w: pw - 0.2, h: 0.28, fontSize: 13, bold: true, color: INK });
    txt(s, d, { x: px + 0.2, y: y + 0.29, w: pw - 0.2, h: 0.42, fontSize: 11, color: MUTED });
  });
  txt(s, 'Concept mockup, sample data. A standard Salesforce Lightning app, so Memorial Hermann’s admins can own it after launch.', { x: L, y: 6.4, w: iw, h: 0.3, fontSize: 10.5, italic: true, color: MUTED });
  s.addNotes('Organizers create a class, event or conference from one form, add ticket types, then build the agenda session by session: day, time, room, track, speaker and seat limit. Payment (Chase) and the Marketing Cloud journey are set per event. Publishing puts the agenda on the website and app. This replaces the conference setup done in Certain today.');
  return s;
}

function addInterestSlide(h, sectionTitle) {
  const { txt, L, CW } = h;
  const s = h.pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Fully booked? Capture interest and invite them first', { placeholder: 'title' });
  const ih = CW / 2.5;
  frame(s, '10-interest-list.png', L, 1.62, CW, ih);
  txt(s, 'Concept mockup, sample data. Works for classes, events and conference sessions. Head-start window [to confirm].', { x: L, y: 6.6, w: CW, h: 0.28, fontSize: 10.5, italic: true, color: MUTED });
  s.addNotes('When a class, event or session is full, people register interest with their preferred location and time, and consent to be contacted. Organizers see demand beyond capacity by event, location and time, which tells them where to add dates. When a new date opens, the interest list is invited first with a head start before seats go public. The length of the head start is Memorial Hermann’s choice.');
  return s;
}

function addCertainTransitionSlide(h, sectionTitle) {
  const { pres, txt, L, CW } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Certain to Salesforce transition', { placeholder: 'title' });
  txt(s, 'Six weeks (weeks 7 to 12) alongside Phase 1, with cutover planned between conferences. Certain stays live until sign-off.', { x: L, y: 1.42, w: CW, h: 0.32, fontSize: 14, color: MUTED });

  const steps = [
    ['WEEKS 7-8', 'Inventory and export', 'Data sample reviewed in Sprint 1 to shape the model; full export; history window agreed'],
    ['WEEKS 7-8', 'Map and cleanse', 'Certain IDs kept for traceability; duplicates removed; attendees matched'],
    ['WEEKS 9-10', 'Trial loads', 'Two rehearsal loads with emails and journeys switched off; counts and totals reconciled'],
    ['WEEKS 11-12', 'Cutover', 'Between conferences, so only history moves; final delta load; go live on Salesforce'],
    ['WEEK 12+', 'Retire Certain', 'Read-only until the contract ends; Authorize.net open only for past refunds'],
  ];
  const gap = 0.15, cw = (CW - 4 * gap) / 5, y0 = 1.9, ch = 1.55;
  steps.forEach(([wk, t, d], i) => {
    const x = L + i * (cw + gap), col = i === 3 ? MAGENTA : PURPLE, dark = i === 3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: y0, w: cw, h: ch, rectRadius: 0.1, fill: { color: dark ? INK : CARD }, line: { color: col, width: 1.75 }, objectName: `transition-${i + 1}` });
    txt(s, `${i + 1}  ·  ${wk}`, { x: x + 0.15, y: y0 + 0.13, w: cw - 0.3, h: 0.24, fontSize: 10, bold: true, color: dark ? 'FF0068' : col, charSpacing: 2 });
    txt(s, t, { x: x + 0.15, y: y0 + 0.4, w: cw - 0.3, h: 0.3, fontSize: 14, bold: true, color: dark ? 'FFFFFF' : INK });
    txt(s, d, { x: x + 0.15, y: y0 + 0.74, w: cw - 0.3, h: 0.8, fontSize: 10.5, color: dark ? 'D9D9D9' : MUTED });
  });

  // What moves (template ruled-table style)
  const tx = L, ty = 3.62, cols = [3.15, 4.25], rh = 0.45;
  txt(s, 'Data', { x: tx + 0.08, y: ty, w: cols[0], h: 0.3, fontSize: 13, bold: true, color: INK, valign: 'bottom' });
  txt(s, 'How it moves', { x: tx + cols[0] + 0.08, y: ty, w: cols[1], h: 0.3, fontSize: 13, bold: true, color: INK, valign: 'bottom' });
  s.addShape(pres.shapes.LINE, { x: tx, y: ty + 0.36, w: cols[0] + cols[1], h: 0, line: { color: INK, width: 1.5 } });
  const rows = [
    ['Past events, sessions, speakers, attendees', 'Loaded for the agreed history window'],
    ['Attendance and CME records', 'Loaded and kept for retention needs [to confirm]'],
    ['Payment history', 'Summary marked as Authorize.net; card data never moves'],
    ['Open registrations at cutover', 'Ideally none. If any: moved with sessions, new QR codes, welcome email'],
    ['Older history', 'Archive export, outside Salesforce storage'],
    ['Today\u2019s classes (Phase 2)', 'Shared model extends today\u2019s class objects, so no second migration [to confirm]'],
  ];
  let cy = ty + 0.36;
  rows.forEach(([a, b]) => {
    txt(s, a, { x: tx + 0.08, y: cy + 0.03, w: cols[0] - 0.16, h: rh - 0.06, fontSize: 10.5, bold: true, color: INK, valign: 'middle' });
    txt(s, b, { x: tx + cols[0] + 0.08, y: cy + 0.03, w: cols[1] - 0.16, h: rh - 0.06, fontSize: 10.5, color: MUTED, valign: 'middle' });
    cy += rh;
    s.addShape(pres.shapes.LINE, { x: tx, y: cy, w: cols[0] + cols[1], h: 0, line: { color: '8C8C8C', width: 0.75, dashType: 'sysDot' } });
  });

  // Safeguards
  const bx = L + cols[0] + cols[1] + 0.35, bw = L + CW - bx;
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: bx, y: ty, w: bw, h: 0.36 + rows.length * rh, rectRadius: 0.1, fill: { color: CARD }, line: { color: CARD_LINE, width: 1 } });
  txt(s, 'Safeguards', { x: bx + 0.2, y: ty + 0.15, w: bw - 0.4, h: 0.3, fontSize: 14, bold: true, color: INK });
  s.addText([
    'Reconciliation report signed off before cutover',
    'Rollback ready: Certain stays live until sign-off',
    'No emails or journeys fire for migrated records',
    'Certain contract covers the read-only period [to confirm]',
    'Delivered by the same five-person pod',
  ].map((t, i, a) => ({ text: t, options: { bullet: true, breakLine: i < a.length - 1 } })), { isTextBox: true, x: bx + 0.2, y: ty + 0.55, w: bw - 0.4, h: 2.2, fontSize: 11.5, color: MUTED, margin: 0, valign: 'top', paraSpaceAfter: 5 });

  s.addNotes('Data migration from Certain is planned as its own six-week workstream inside Phase 1 (weeks 7 to 12), so conferences go live on Salesforce with their data. A sample Certain export is reviewed in Sprint 1 so the event model fits Certain’s data; every record keeps its Certain ID. Two trial loads run with emails and journeys switched off and are reconciled before the final load. Cutover is planned between conferences so only history moves; if a conference is open, its registrations move with new QR codes and a welcome email. How many years of history to bring across is Memorial Hermann’s decision, agreed in discovery; older history can stay in an archive export. Card data is never migrated: payment history moves as a summary marked Authorize.net, and Authorize.net stays open only until refunds on past payments are done. For Phase 2 the shared model extends today’s class objects where possible, so classes need no second migration.');
  return s;
}

module.exports = { addBookingFlowSlide, addStaffSetupSlide, addInterestSlide, addCertainTransitionSlide };
