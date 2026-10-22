// Concept screen slides: registrant booking, staff setup, interest list.
// White (IG Light) layout; screens come from deck/mockups/png.
const path = require('path');

const IMG = f => path.join(__dirname, '..', 'mockups', 'png', f);
const INK = '000000', MUTED = '4D4D4D', CARD = 'F2F2F2', CARD_LINE = 'D0D0D6';
const MAGENTA = 'C8005A';

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
  const { txt, L, CW } = h;
  const s = h.pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Registrant view: find it, book it, pay, add to calendar', { placeholder: 'title' });
  const iw = 11.6, ih = iw * 1010 / 2400;
  frame(s, '11-web-booking-flow.png', L + (CW - iw) / 2, 1.58, iw, ih);
  txt(s, 'Concept mockup, sample data. Web only: listings stay on Sitecore, booking runs on the existing Experience Cloud site, payment on Chase\u2019s hosted page.', { x: L, y: 6.55, w: CW, h: 0.28, fontSize: 10.5, italic: true, color: MUTED });
  s.addNotes('One listing for conferences, classes and events, on the Sitecore page people already use. Book on a conference opens the registration site: pick sessions by day (seats are held while paying), pay on Chase\u2019s hosted page, then get an instant confirmation with a QR code for check-in, add-to-calendar links and, for online attendees, a personal Zoom or Teams join link. Cancellations and refunds use today\u2019s Chase workflows. Classes and events use the same flow without the session step.');
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
    ['Publish', 'The agenda appears on the website'],
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

module.exports = { addBookingFlowSlide, addStaffSetupSlide, addInterestSlide };
