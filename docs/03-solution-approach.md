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
