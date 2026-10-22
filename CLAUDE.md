# Memorial Hermann presales workspace

This repository is the single source of truth for the Memorial Hermann Health System opportunity
(Insight Global presales, owner: Surya Chinta). Whenever a request mentions Memorial Hermann,
read the relevant files here first and build on them instead of starting over.

## Where things are

| Need | File |
|---|---|
| Account research: systems, Salesforce footprint, vendors, contacts, compliance history | `docs/01-account-research.md` |
| Questions we asked and the client's answers (Kevin Kelly) | `docs/02-discovery-and-client-answers.md` |
| Solution design: architecture, data model, payments, phases, timeline, build vs buy, AI | `docs/03-solution-approach.md` |
| Upsell: registration data, patient engagement initiatives (PEIs), campaigns, app downloads, KPIs | `docs/04-engagement-upsell.md` |
| Terminology (classes, events, sessions, PEIs, CME) | `docs/05-glossary.md` |
| Manager direction, status, open questions, next actions | `docs/06-status-and-next-steps.md` |
| Insight Global deck template rules (colors, fonts, layouts) | `docs/07-brand-template.md` |
| Detailed design: architecture, high-demand handling, security, reliability, scalability, AI agent harness | `docs/08-detailed-design.md` (review page: `docs/08-detailed-design-review.html`) |
| Current-state discovery call questions (2026-10-20) | `docs/09-current-state-discovery-questions.md` |
| Client deck (PowerPoint) and how to rebuild it | `deck/` (see `README.md`) |

## Working rules

- Keep these docs current: when new client info, decisions or feedback arrive, update the matching
  file and the status file, then commit.
- Decks follow the Insight Global template in `reference/InsightGlobal_PowerPoint_Template.pdf`
  (Trenda IG Text, black backgrounds with brand gradients, cyan / yellow / magenta accents).
- Do not use em dashes in client-facing text.
- Mark anything not confirmed by the client as an assumption or "[to confirm]". Never invent
  client metrics; use "baseline set in discovery" instead.
- PEI means **patient engagement initiatives**.
- Class registration already exists (Sitecore listings open a home-built Experience Cloud site; a mobile app also registers). Build on it; never propose rebuilding it or a new mobile app.
- The primary ask is replacing Certain (conferences with session management). Lead with it.
- Scope after the 2026-10-20 call: add conference setup into the existing event and class solution; no data migration; reuse existing Chase cancellation and refund workflows; keep waitlist; mobile app out of scope (web screens only); virtual sessions via Zoom or Teams [platform to confirm].
- Payments: Chase for every event (reuse the class integration); Authorize.net retires with Certain.
- Plan (2026-10-22): conferences only, Phase 2 (classes) out. 8 weeks, 4 two-week sprints, 4-person pod (1 PM, 1 QA, 2 developers). Grow from week 9. Investment $60,000 partner price ($120,000 standard struck through, 50% credit).
- Certain migration: not needed (Kevin, 2026-10-20). Earlier 6-week transition plan is superseded.
- Client logo goes at `deck/assets/client/memorial-hermann-logo.png`; the build adds it to the title slide when present.
- Screens in the deck are concept mockups (`deck/mockups/*.html`), labelled as such.
