# Solution approach: one event platform on Salesforce

## Summary

A Salesforce event app built inside Memorial Hermann's existing Health Cloud org that runs both
simple classes and multi-day conferences, with Marketing Cloud for every message. Delivered in two
phases: Phase 1 replaces the home-built class registration; Phase 2 replaces Certain.

> **Current scope (2026-10-22):** conferences only, added to the existing event and class solution, in 8
> weeks; no data migration; Chase with today's refund workflows; Zoom or Teams for online sessions. The
> original two-phase plan and timeline below are kept for history and are superseded.

## Architecture

| Layer | What it does | Technology |
|---|---|---|
| Register | Public listings, sign-up, checkout, conference "My Agenda" | Sitecore pages calling Salesforce APIs (matches today), or a Salesforce Experience Cloud site (better for the attendee portal; needs licenses) |
| Manage | Events, series, sessions, speakers, capacity, waitlists, refunds, check-in, reporting | Custom Salesforce Lightning app on the Health Cloud org |
| Engage | Confirmations, reminders, calendar invites, virtual links (transactional, one per registration) | Salesforce email (Flow email alerts); Marketing Cloud for PEIs, campaigns and SMS [to confirm] |
| Pay | Hosted checkout; card data never stored in Salesforce | Chase (already used for classes) |
| Connect | Virtual sessions, website, records | Zoom / Teams, Sitecore, Health Cloud person accounts |

## Data model (custom objects)

Event (or series), Session, Track, Speaker, Session Speaker, Venue / Room, Ticket Type, Registration,
Session Registration, Payment, Check-in, Waitlist Entry, CME Credit [to confirm]. Registrants are
Health Cloud person accounts flagged as consumer, caregiver or provider, matched to existing records
to avoid duplicates. No Epic dependency (per Kevin).

## Features

**Without AI (core):** free or paid, in person or online, recurring classes, capacity and waitlists,
cancellations and refunds, group / family registration, multi-day agendas with tracks, sessions,
speakers and rooms, attendee session selection, badges, CME [to confirm], QR check-in, attendance,
reporting by event / service line / location.

**With AI (later):** Agentforce registration assistant on the website or SMS ("find a CPR class near
Katy on Saturday"), session and class recommendations, AI-drafted event pages and emails, no-show
prediction, survey summaries, staff assistant for reporting. Agentforce and Data Cloud are licensed
separately.

## Payments

Flow: registrant checks out, Chase hosted payment page, payment record in
Salesforce, receipts / refunds / daily reconciliation. Supports free, paid, discount codes and
per-couple pricing, full and partial refunds.

- **Decision (Surya, 2026-10-19): one gateway, Chase.** Chase already takes class payments in
  Salesforce, so conferences reuse that integration and Authorize.net retires with Certain. One
  gateway, one reconciliation.
- [to confirm] with MH finance: Chase merchant setup for conference fees (same or separate merchant ID).

## Phases and timeline (indicative)

| Window | Milestone |
|---|---|
| Weeks 1-3 | Discover and design: walkthrough of the current build, requirements, data model, payment decision |
| Weeks 4-14 | Phase 1 live: classes and events, registration, payments, journeys, check-in. Home-built tool retired |
| Weeks 15-24 | Phase 2 live: conferences, sessions, speakers, My Agenda, badges, Certain history migrated. Certain retired |
| Week 25+ | Grow: engagement journeys, app downloads, AI features |

Team: architect, 2 developers, admin, business analyst, QA. Time Phase 2 to land before the Certain
renewal.

## Certain to Salesforce transition (data migration)

Six-week workstream, weeks 15-20, at the end of Phase 1, delivered by the same pod (no price change for a
modest, clean history window). Impacts on the solution:

- **Data model:** a sample Certain export is reviewed in Sprint 1 so the event model fits Certain's
  data (custom questions, sponsors, CME). Every migrated record keeps its Certain ID (external ID) for
  traceability and safe re-runs.
- **Automation:** loads run with triggers, emails and Marketing Cloud journeys switched off. Migrated
  contacts join journeys only if consent carries over.
- **Cutover timing:** planned between conferences so only history moves. If a conference is open at
  cutover, its registrations move with session picks, new QR codes and a welcome email.
- **Payments:** Authorize.net tokens cannot move to Chase. Payment history moves as a summary marked
  Authorize.net; Authorize.net stays open only until refunds on pre-cutover payments are done.
- **Phase 2 classes:** the shared model extends today's class objects where possible, so classes need
  no second migration [to confirm once we see the objects].
- **Storage:** only the agreed history window is loaded; older history stays in an archive export.
- **Contract:** Certain must stay read-only past cutover; check the renewal date.
- History window (how many years) is a client question; not stated on slides.
- Larger or messier history, or live in-flight conferences, would be a change request.

## Build vs buy

| | Custom build (recommended lead) | AppExchange app (Blackthorn Events, AC Events Enterprise) | Standalone (Cvent, Swoogo) |
|---|---|---|---|
| Fit | Exact workflows, Health Cloud, both gateways, Sitecore, CME | Salesforce native, some workarounds; Blackthorn supports Authorize.net and Stripe, Chase not confirmed | Strong conference features, separate system to sync (like Certain) |
| Cost | Build cost, no per-transaction fees | Subscription and transaction fees | Subscription |
| Speed | Longer | Faster | Fast |

Rationale for leading with build: MH already built on Salesforce in house, and one app retires both the
home-built tool and Certain. Present AppExchange as the faster alternative.

## Concept screens (deck/mockups)

1. Website class finder and registration
2. Mobile flow: choose class, register and pay, confirmation with QR and app link
3. Salesforce staff console: series, sessions, capacity, registrations, follow-up journey
4. Conference agenda: tracks, session capacity, CME badges, My Agenda
5. Marketing Cloud journey with patient engagement initiatives

## Deck structure (30 slides, 2026-10-22, conferences only)

1 Title, 2 Agenda, 3 Business opportunity, 4 Build on what already works (keep / add / replace / later),
5 Section 01, 6 Conferences inside your Salesforce org, 7 Overall solution design, 8 Registrant view
(web only: Sitecore listing, sessions, Chase payment, confirmation with calendar and Zoom or Teams link),
9 Staff view, 10 Fully booked: waitlist and interest list, 11 Every seat filled, 12 Seat flow detail,
13 Payments and data security, 14 Payment sequence, 15 Section 02, 16 Timeline (8 weeks), 17 What the
eight weeks deliver, 18 Sprint plan (4 sprints), 19 Delivery team (3 people), 20 Section 03, 21 Value
statement, 22 PEI journey, 23 Campaigns, 24 Website registrants into the app, 25 KPIs, 26 Roadmap,
27 AI agents in a controlled harness, 28 Commercials, 29 Next steps, 30 Thank you.

Surya's draft 2 edits carried forward: "Business opportunity" heading and agenda item, restored
"What each phase delivers" slide, value statement moved lower, "Salesforce licenses" wording,
speaker notes removed on agenda, slide 3, slide 6 and the AI harness slide. Source copy:
`reference/Memorial_Hermann_Event_Platform_draft_2_Surya_edits.pptx`.

## Team and commercials (approved by Surya, 2026-10-15)

- Pod of 4 (Surya, 2026-10-20): 1 Project Manager (runs the sprints), 1 QA engineer, 2 developers
  covering Salesforce and Marketing Cloud. Memorial Hermann provides a product owner and an Epic/app contact.
- 8 weeks (Surya, 2026-10-22), conferences only; Phase 2 (classes) out of scope. Sprint 1 assess and
  design; sprint 2 conference, session, speaker and ticket setup; sprint 3 My Agenda, seat limits and
  waitlists, Chase checkout, Zoom or Teams links; sprint 4 badges, check-in, testing, go-live (Certain
  retired). Grow from week 9. No data migration; refunds reuse today's Chase workflows.
- Pricing is for an **offshore delivery model** (labelled on the Investment slide).
- Commercials (Surya, 2026-10-22): $60,000 for 8 weeks, offshore. No strikethrough, no partner credit,
  no rate cards. Team table: 1 Project Manager, 1 Salesforce Developer, 1 QA Engineer (3 people).
- Not included: Salesforce licenses (Shield, Agentforce, Data Cloud), Zoom or Teams licenses, gateway
  fees, waiting room subscription.
