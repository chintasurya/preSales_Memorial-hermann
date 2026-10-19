// Sequence-diagram slides drawn as native, editable PowerPoint shapes:
// overall solution design, registration and seat flow, payment sequence.

// Draws a sequence diagram. rows: { from, to, label, dashed, phase } | { type: 'self', at, label }
// | { type: 'alt' | 'else', label } | { type: 'end' } | { type: 'note', over: [id, id], label }
// Colors tuned for the white template background.
const INK = '000000', LINE_SOLID = '1A1A1A', LINE_DASH = '6B7280', LABEL_DASH = '4D4D4D', LIFELINE = 'B0B0B8';
const BOX_FILL = 'F2F2F2', BOX_LINE = 'B8B8C0', FRAME = '9A9AA2', PHASE = '007C8C';
// Brand accents darkened slightly so outlines stay visible on white.
const ACCENT = { cyan: '00A9C0', yellow: 'D9B200', magenta: 'FF0068' };

function sequence(s, h, { x, y, w, bottom, parts, rows, phaseX }) {
  const { pres, txt, HEX } = h;
  const n = parts.length, colW = w / n;
  const px = parts.map((_, i) => x + colW * (i + 0.5));
  const at = id => {
    const i = parts.findIndex(p => p.id === id);
    if (i < 0) throw new Error('unknown participant ' + id);
    return px[i];
  };
  const boxH = 0.52;
  parts.forEach((p, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px[i] - colW / 2 + 0.06, y, w: colW - 0.12, h: boxH, rectRadius: 0.08, line: { color: p.color || BOX_LINE, width: p.color ? 1.75 : 1.25 }, fill: { color: BOX_FILL }, objectName: `participant-${p.id}` });
    txt(s, p.label, { x: px[i] - colW / 2 + 0.1, y, w: colW - 0.2, h: boxH, fontSize: 10.5, bold: true, color: INK, align: 'center', valign: 'middle' });
    s.addShape(pres.shapes.LINE, { x: px[i], y: y + boxH, w: 0, h: bottom - y - boxH, line: { color: LIFELINE, width: 1, dashType: 'dash' } });
  });
  const weight = r => ({ msg: 1, self: 1.25, note: 1, alt: 0.75, else: 0.75, end: 0.35 })[r.type || 'msg'];
  const top = y + boxH + 0.1;
  const unit = (bottom - top) / rows.reduce((a, r) => a + weight(r), 0);
  const frameX = px[0] - colW * 0.47, frameW = px[n - 1] - px[0] + colW * 0.94;
  let cy = top, num = 0, frameTop = null, firstPhase = true;

  const tag = (label, ty) => {
    const tw = Math.max(1.4, label.length * 0.075 + 0.3);
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: frameX + 0.06, y: ty, w: tw, h: 0.24, rectRadius: 0.05, line: { color: ACCENT.yellow, width: 1 }, fill: { color: 'FFF6CC' } });
    txt(s, label, { x: frameX + 0.06, y: ty, w: tw, h: 0.24, fontSize: 9.5, bold: true, color: '6B5600', align: 'center', valign: 'middle' });
  };

  for (const r of rows) {
    const t = r.type || 'msg';
    const rh = weight(r) * unit;
    if (r.phase && phaseX != null) {
      if (!firstPhase) s.addShape(pres.shapes.LINE, { x: phaseX, y: cy, w: frameX + frameW - phaseX, h: 0, line: { color: 'D4D4DA', width: 0.75, dashType: 'sysDot' } });
      txt(s, r.phase.toUpperCase(), { x: phaseX, y: cy + 0.06, w: 0.95, h: 0.25, fontSize: 9.5, bold: true, color: PHASE, charSpacing: 2 });
      firstPhase = false;
    }
    if (t === 'msg') {
      num++;
      const a = at(r.from), b = at(r.to), ly = cy + rh * 0.66;
      const line = { color: r.dashed ? LINE_DASH : LINE_SOLID, width: 1.25 };
      if (r.dashed) line.dashType = 'dash';
      if (b > a) line.endArrowType = 'triangle'; else line.beginArrowType = 'triangle';
      s.addShape(pres.shapes.LINE, { x: Math.min(a, b), y: ly, w: Math.abs(b - a), h: 0, line });
      s.addShape(pres.shapes.OVAL, { x: a - 0.11, y: ly - 0.11, w: 0.22, h: 0.22, fill: { color: ACCENT.cyan }, line: { color: ACCENT.cyan } });
      txt(s, String(num), { x: a - 0.11, y: ly - 0.11, w: 0.22, h: 0.22, fontSize: 8, bold: true, color: '000000', align: 'center', valign: 'middle' });
      // label starts after the number badge and runs toward the arrow head, sized to its text
      const lw = Math.max(Math.abs(b - a) - 0.2, r.label.length * 0.074 + 0.25);
      const lx = b > a ? a + 0.16 : a - 0.16 - lw;
      txt(s, r.label, { x: lx, y: ly - 0.27, w: lw, h: 0.24, fontSize: 10, color: r.dashed ? LABEL_DASH : INK, align: 'center', valign: 'bottom' });
    } else if (t === 'self') {
      num++;
      const a = at(r.at), y1 = cy + rh * 0.35, y2 = cy + rh * 0.8;
      s.addShape(pres.shapes.LINE, { x: a, y: y1, w: 0.35, h: 0, line: { color: LINE_SOLID, width: 1.25 } });
      s.addShape(pres.shapes.LINE, { x: a + 0.35, y: y1, w: 0, h: y2 - y1, line: { color: LINE_SOLID, width: 1.25 } });
      s.addShape(pres.shapes.LINE, { x: a, y: y2, w: 0.35, h: 0, line: { color: LINE_SOLID, width: 1.25, beginArrowType: 'triangle' } });
      s.addShape(pres.shapes.OVAL, { x: a - 0.11, y: y1 - 0.11, w: 0.22, h: 0.22, fill: { color: ACCENT.cyan }, line: { color: ACCENT.cyan } });
      txt(s, String(num), { x: a - 0.11, y: y1 - 0.11, w: 0.22, h: 0.22, fontSize: 8, bold: true, color: '000000', align: 'center', valign: 'middle' });
      txt(s, r.label, { x: a + 0.48, y: y1 - 0.02, w: 2.6, h: y2 - y1 + 0.04, fontSize: 10, color: INK, valign: 'middle' });
    } else if (t === 'alt') {
      frameTop = cy + 0.04;
      tag(r.label, cy + (rh - 0.24) / 2);
    } else if (t === 'else') {
      s.addShape(pres.shapes.LINE, { x: frameX, y: cy + 0.04, w: frameW, h: 0, line: { color: FRAME, width: 1, dashType: 'dash' } });
      tag(r.label, cy + 0.04 + (rh - 0.28) / 2);
    } else if (t === 'end') {
      s.addShape(pres.shapes.RECTANGLE, { x: frameX, y: frameTop, w: frameW, h: cy + rh * 0.5 - frameTop, line: { color: FRAME, width: 1, dashType: 'dash' }, fill: { type: 'none' } });
    } else if (t === 'note') {
      const x1 = at(r.over[0]) - colW * 0.45, x2 = at(r.over[r.over.length - 1]) + colW * 0.45;
      s.addShape(pres.shapes.RECTANGLE, { x: x1, y: cy + rh * 0.15, w: x2 - x1, h: rh * 0.7, fill: { color: HEX.yellow }, line: { color: HEX.yellow } });
      txt(s, r.label, { x: x1 + 0.08, y: cy + rh * 0.15, w: x2 - x1 - 0.16, h: rh * 0.7, fontSize: 10, bold: true, color: '000000', align: 'center', valign: 'middle' });
    }
    cy += rh;
  }
}

function addOverallDesignSlide(h, sectionTitle) {
  const { pres, txt, L, R, MUTED_LIGHT } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Overall solution design', { placeholder: 'title' });
  txt(s, 'One flow for conferences and classes on your existing Experience Cloud site and app; replaces Certain', { x: L, y: 1.42, w: 12, h: 0.32, fontSize: 14, color: MUTED_LIGHT });
  sequence(s, h, {
    x: 1.55, y: 1.92, w: R - 1.55, bottom: 6.62, phaseX: L,
    parts: [
      { id: 'p', label: 'Registrant' },
      { id: 'ch', label: 'Website or app', color: ACCENT.cyan },
      { id: 'reg', label: 'Registration service', color: ACCENT.yellow },
      { id: 'pay', label: 'Payment gateway' },
      { id: 'sf', label: 'Salesforce event app', color: ACCENT.cyan },
      { id: 'mc', label: 'Marketing Cloud', color: ACCENT.magenta },
      { id: 'st', label: 'Event staff' },
    ],
    rows: [
      { phase: 'Register', from: 'p', to: 'ch', label: 'Find a class or conference' },
      { from: 'ch', to: 'reg', label: 'Register and hold a seat' },
      { from: 'reg', to: 'p', dashed: true, label: 'Seat held for 10 minutes' },
      { phase: 'Pay', from: 'p', to: 'pay', label: 'Pay on hosted page (free events skip this)' },
      { from: 'pay', to: 'reg', dashed: true, label: 'Signed webhook, token only' },
      { from: 'reg', to: 'sf', label: 'Create registration (queued, idempotent)' },
      { phase: 'Confirm', from: 'sf', to: 'mc', label: 'Registration event' },
      { from: 'mc', to: 'p', dashed: true, label: 'Confirmation, QR code, calendar invite, reminders' },
      { phase: 'Attend', from: 'st', to: 'sf', label: 'QR check-in at the door' },
      { phase: 'Engage', from: 'sf', to: 'mc', label: 'Attendance and interests' },
      { from: 'mc', to: 'p', dashed: true, label: 'PEIs: thank you, next class, app, find a doctor' },
      { phase: 'Grow', from: 'sf', to: 'st', dashed: true, label: 'Dashboards, waitlist and demand alerts' },
      { from: 'st', to: 'sf', label: 'Add a session in one click' },
    ],
  });
  txt(s, 'Classes and conferences share this flow; conferences add sessions, speakers and My Agenda.', { x: L, y: 6.68, w: 9, h: 0.26, fontSize: 10.5, italic: true, color: MUTED_LIGHT });
  s.addNotes('This is the whole solution on one page, in the order a registrant experiences it. Register: website or the existing My Memorial Hermann app, with a seat held while they pay. Pay: the gateway hosts the card page; we receive only a token. Confirm: Salesforce records the registration and Marketing Cloud sends confirmation and reminders. Attend: QR check-in. Engage: patient engagement initiatives. Grow: staff see demand and add sessions. It replaces Certain and builds on today’s Experience Cloud site and app.');
  return s;
}

function addSeatFlowSlide(h, sectionTitle) {
  const { pres, txt, R } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Design detail: registration and seat flow', { placeholder: 'title' });
  sequence(s, h, {
    x: 0.55, y: 1.6, w: R - 0.55, bottom: 6.75,
    parts: [
      { id: 'p', label: 'Registrant' },
      { id: 'edge', label: 'Edge and waiting room', color: ACCENT.cyan },
      { id: 'reg', label: 'Registration service', color: ACCENT.yellow },
      { id: 'inv', label: 'Seat inventory', color: ACCENT.yellow },
      { id: 'pay', label: 'Payment page' },
      { id: 'sf', label: 'Salesforce', color: ACCENT.cyan },
      { id: 'mc', label: 'Marketing Cloud', color: ACCENT.magenta },
    ],
    rows: [
      { from: 'p', to: 'edge', label: 'Click Register' },
      { from: 'edge', to: 'p', dashed: true, label: 'Place in line shown' },
      { from: 'edge', to: 'reg', label: 'Admit at a safe rate' },
      { from: 'reg', to: 'inv', label: 'Hold one seat (atomic)' },
      { type: 'alt', label: 'If a seat is available' },
      { from: 'inv', to: 'reg', dashed: true, label: 'Hold granted, 10 minutes' },
      { from: 'reg', to: 'p', dashed: true, label: 'Your seat is held, pay now' },
      { from: 'p', to: 'pay', label: 'Pay on hosted page' },
      { from: 'pay', to: 'reg', dashed: true, label: 'Signed payment webhook' },
      { from: 'reg', to: 'sf', label: 'Create registration (idempotent, via queue)' },
      { from: 'sf', to: 'mc', label: 'Registration event' },
      { from: 'mc', to: 'p', dashed: true, label: 'Confirmation, QR code, calendar invite' },
      { type: 'else', label: 'If sold out' },
      { from: 'inv', to: 'reg', dashed: true, label: 'No seats left' },
      { from: 'reg', to: 'p', dashed: true, label: 'Join waitlist or get notified of new dates' },
      { from: 'reg', to: 'sf', label: 'Waitlist or interest record' },
      { type: 'end' },
      { type: 'note', over: ['reg', 'inv'], label: 'Unpaid holds expire and return to the pool' },
    ],
  });
  s.addNotes('Step by step for a busy event. The waiting room admits people fairly, seat holds are atomic so a seat is never sold twice, writes to Salesforce are queued and idempotent so nothing is lost or duplicated, and everyone who misses a seat lands on the waitlist or interest list.');
  return s;
}

function addPaymentSequenceSlide(h, sectionTitle) {
  const { pres, txt, C, MUTED_LIGHT } = h;
  const s = pres.addSlide({ masterName: 'IG Light', sectionTitle });
  s.addText('Design detail: payment sequence', { placeholder: 'title' });
  sequence(s, h, {
    x: 0.55, y: 1.65, w: 8.2, bottom: 6.6,
    parts: [
      { id: 'p', label: 'Registrant (web or app)' },
      { id: 'reg', label: 'Registration service', color: ACCENT.yellow },
      { id: 'gw', label: 'Gateway hosted page', color: ACCENT.magenta },
      { id: 'sf', label: 'Salesforce', color: ACCENT.cyan },
    ],
    rows: [
      { from: 'reg', to: 'gw', label: 'Create payment session (amount, reference)' },
      { from: 'gw', to: 'reg', dashed: true, label: 'Session token' },
      { from: 'reg', to: 'p', dashed: true, label: 'Open hosted payment page' },
      { from: 'p', to: 'gw', label: 'Card details typed into the gateway page' },
      { from: 'gw', to: 'p', dashed: true, label: 'Approved' },
      { from: 'gw', to: 'reg', label: 'Signed webhook (token, last 4, approval code)' },
      { type: 'self', at: 'reg', label: 'Verify signature, idempotency check' },
      { from: 'reg', to: 'sf', label: 'Payment record: token, last 4, amount, status' },
      { type: 'note', over: ['gw', 'sf'], label: 'No card number, CVV or expiry is ever stored' },
    ],
  });
  const px = 9.2, pw = 3.58;
  txt(s, 'Gateway choice', { x: px, y: 1.7, w: pw, h: 0.35, fontSize: 16, bold: true, color: C.text1 });
  [['OPTION A', 'Keep both', 'Chase for classes, Authorize.net for conferences', '007C8C'], ['OPTION B', 'Consolidate on one', 'One gateway for every event; simpler reconciliation', 'C8005A']].forEach(([k, t, d, col], i) => {
    const y = 2.15 + i * 1.32;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: px, y, w: pw, h: 1.18, rectRadius: 0.1, line: { color: 'D0D0D6', width: 1 }, fill: { color: 'F2F2F2' } });
    txt(s, k, { x: px + 0.2, y: y + 0.12, w: pw - 0.4, h: 0.22, fontSize: 9, bold: true, color: col, charSpacing: 2 });
    txt(s, t, { x: px + 0.2, y: y + 0.36, w: pw - 0.4, h: 0.3, fontSize: 13, bold: true, color: C.text1 });
    txt(s, d, { x: px + 0.2, y: y + 0.68, w: pw - 0.4, h: 0.45, fontSize: 11, color: MUTED_LIGHT });
  });
  txt(s, 'After payment', { x: px, y: 4.95, w: pw, h: 0.35, fontSize: 16, bold: true, color: C.text1 });
  s.addText([
    { text: 'Full and partial refunds by token from Salesforce', options: { bullet: true, breakLine: true } },
    { text: 'Automatic receipts', options: { bullet: true, breakLine: true } },
    { text: 'Daily settlement reconciliation', options: { bullet: true } },
  ], { isTextBox: true, x: px, y: 5.35, w: pw, h: 1.2, fontSize: 12, color: MUTED_LIGHT, margin: 0, valign: 'top', paraSpaceAfter: 4 });
  s.addNotes('The card is typed directly into the gateway page; the registration service only creates the session and receives a signed webhook with a token. Salesforce stores the token reference, last 4 digits, amount and status. Gateway choice is Memorial Hermann finance\'s decision; both are supported.');
  return s;
}

module.exports = { sequence, addOverallDesignSlide, addSeatFlowSlide, addPaymentSequenceSlide };
