# Solution approach: one event platform on Salesforce

## Summary

A Salesforce event app built inside Memorial Hermann's existing Health Cloud org that runs both
simple classes and multi-day conferences, with Marketing Cloud for every message. Delivered in two
phases: Phase 1 replaces the home-built class registration; Phase 2 replaces Certain.

## Architecture

| Layer | What it does | Technology |
|---|---|---|
| Register | Public listings, sign-up, checkout, conference "My Agenda" | Sitecore pages calling Salesforce APIs (matches today), or a Salesforce Experience Cloud site (better for the attendee portal; needs licenses) |
| Manage | Events, series, sessions, speakers, capacity, waitlists, refunds, check-in, reporting | Custom Salesforce Lightning app on the Health Cloud org |
| Engage | Confirmations, reminders, calendar invites, virtual links, patient engagement initiatives | Marketing Cloud journeys |
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

## Deck structure (30 slides, 2026-10-19, reworked)

1 Title, 2 Agenda, 3 Business opportunity (primary ask: replace Certain), 4 Build on what already
works (keep / improve / replace / add later), 5 Section 01, 6 One event platform inside your org,
7 Overall solution design (sequence), 8 Phase 1: conferences, 9 Phase 2: today's class registration
improved, 10 Staff console, 11 Every seat filled, 12 Registration and seat flow detail, 13 Payments
and data security, 14 Payment sequence detail, 15 Section 02, 16 Timeline, 17 What each phase
delivers, 18 Sprint plan (10 sprints), 19 Delivery pod, 20 Section 03, 21 Value statement, 22 PEI
journey, 23 Campaigns, 24 Website registrants into the app, 25 KPIs, 26 Roadmap, 27 AI agents in a
controlled harness, 28 Investment, 29 Next steps, 30 Thank you.

Surya's draft 2 edits carried forward: "Business opportunity" heading and agenda item, restored
"What each phase delivers" slide, value statement moved lower, "Salesforce licenses" wording,
speaker notes removed on agenda, slide 3, slide 6 and the AI harness slide. Source copy:
`reference/Memorial_Hermann_Event_Platform_draft_2_Surya_edits.pptx`.

## Team and commercials (approved by Surya, 2026-10-15)

- Pod of 5: 1 Scrum Master or Project Manager, 1 QA engineer, 2 Salesforce developers,
  1 Marketing Cloud developer. Memorial Hermann provides a product owner and an Epic/app contact.
- 10 two-week sprints (20 weeks), demo and milestone sign-off at every sprint end. Sprint 1 assess,
  2-6 Phase 1 conferences (live week 12, Certain retired), 7-10 Phase 2 classes improved (live week 20).
- Pricing is for an **offshore delivery model** (labelled on the Investment slide).
- Standard program value $580,000 (struck through, placeholder scaled from the $700,000 example);
  strategic partner investment $290,000 after a 50% partnership credit applied upfront. Phase 1
  $350,000 to $175,000, Phase 2 $230,000 to $115,000. Indicative, billed at sprint milestones, final in the SOW.
- Not included: Salesforce licenses (Shield, Agentforce, Data Cloud), gateway fees, waiting room
  subscription.
