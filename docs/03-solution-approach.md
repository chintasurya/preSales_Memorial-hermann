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
| Pay | Hosted checkout; card data never stored in Salesforce | Chase and/or Authorize.net |
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

Flow: registrant checks out, hosted payment page, Chase or Authorize.net, payment record in
Salesforce, receipts / refunds / daily reconciliation. Supports free, paid, discount codes and
per-couple pricing, full and partial refunds.

- Option A: keep both gateways (Chase for classes, Authorize.net for conferences).
- Option B: consolidate on one gateway. Decision for MH finance.

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

## Deck structure (28 slides, 2026-10-15)

1 Title, 2 Agenda, 3 What we heard, 4 Section 01, 5 Event app inside your org, 6 Overall solution
design (sequence), 7 One registration flow for website and app, 8 Staff console, 9 Conferences,
10 Every seat filled (demand handling), 11 Design detail: registration and seat flow, 12 Payments and
data security, 13 Design detail: payment sequence, 14 Section 02, 15 Timeline, 16 Delivery plan:
12 two-week sprints, 17 Five-person delivery pod, 18 Section 03, 19 Value statement, 20 PEI journey,
21 Campaigns, 22 Website registrants into the app, 23 KPIs, 24 Roadmap, 25 AI agents in a controlled
harness, 26 Investment, 27 Next steps, 28 Thank you.

Sequence diagrams: `deck/build/sequence-slides.js`. Design slides: `deck/build/design-slides.js`.
Sprint plan, pod and investment: `deck/build/delivery-slides.js`.

## Team and commercials (approved by Surya, 2026-10-15)

- Pod of 5: 1 Scrum Master or Project Manager, 1 QA engineer, 2 Salesforce developers,
  1 Marketing Cloud developer. Memorial Hermann provides a product owner and an Epic/app contact.
- 12 two-week sprints (24 weeks), demo and milestone sign-off at every sprint end. Sprints 1-2
  discover and design, 3-7 Phase 1 (live week 14), 8-12 Phase 2 (live week 24, Certain retired).
- Standard program value $700,000 (struck through); strategic partner investment $350,000 after a
  50% partnership credit applied upfront. Phase split by sprint weeks: Phase 1 $410,000 to $205,000,
  Phase 2 $290,000 to $145,000. Indicative, billed at sprint milestones, final in the SOW.
- Not included: Salesforce licenses (Shield, Agentforce, Data Cloud), gateway fees, waiting room
  subscription.
