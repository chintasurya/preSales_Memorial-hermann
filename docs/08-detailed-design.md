# Detailed design (draft v0.1, awaiting Surya's approval)

Review page with diagrams: https://claude.ai/artifact/SZmKrbqDdha5A6HHgVT8ku
(source copy: `docs/08-detailed-design-review.html`). The deck is updated only after approval.

## Changes from feedback (2026-10-15)

- PEI = patient engagement initiatives.
- Registration goes into the existing My Memorial Hermann app; no new mobile app.
- Detailed design added: architecture, high demand, notifications, security, reliability, scalability.
- Future state: AI agents run events and campaigns inside a controlled harness.

## Quality targets (proposed, to confirm with MH IT)

| Quality | Target |
|---|---|
| Correctness | Zero overbooking; failed payments always release the seat |
| Scalability | 100,000 visitors in 10 minutes for one event |
| Performance | Event pages under 2 s; seat answer under 3 s at peak |
| Reliability | 99.9% registration path availability; RPO 15 min, RTO 4 h |
| Security | PCI scope limited to hosted pages; HIPAA-aligned controls |
| Observability | Dashboard, alerts and runbooks for every failure mode |

## Architecture

Channels (Sitecore website, existing My Memorial Hermann app, QR / deep links) go through the edge
(CDN cache, WAF, bot defense, rate limits, virtual waiting room for hot events only), then a
registration service (API, atomic seat inventory with 10-minute holds, durable queue with retries and
dead letter) into Salesforce Health Cloud (event app, person accounts, Platform Events), then
Marketing Cloud. Payments on the gateway's hosted page (Chase or Authorize.net). Recommended host
for the registration layer: Heroku with Redis; MuleSoft or AWS as alternatives. Reason: a surge of
writes to one event record causes Salesforce record locking and API limit problems; the buffer turns
a spike into a steady stream while Salesforce stays the system of record.

## Existing app channel

- Option A (start here): menu activity in My Memorial Hermann opens our mobile registration page.
- Option B: SMART on FHIR launch from MyChart with patient identity prefill (needs Epic config).
- Reminders by SMS and email; in-app push or MyChart messages only where Epic supports them.
- Owner on the MH side: Lucky Rai's digital team.

## High demand: 100,000 clicks, 30 seats

1. CDN serves event pages; WAF, bot defense and rate limits stop scripted clicking.
2. Waiting room switches on automatically per event and admits people in arrival order (Queue-it,
   Cloudflare Waiting Room or built in).
3. Atomic seat holds for 10 minutes; unpaid or failed holds return to the pool.
4. Confirmed registrations go to Salesforce via a durable queue with idempotency keys.
5. Sold out: one tap to join the ordered waitlist (cap per event, e.g. 60) or the interest list.
6. Freed seats offered to the next waitlisted person with a 2-hour claim window.
7. Demand ratio = (waitlist + interest) / seats. Above a threshold (e.g. 3x): alert the owner,
   one-click clone of the session, offer to the waitlist first, then announce to the interest list.

## Notifications

Registered (email, app), 24 h reminder (SMS, reply to cancel), waitlist position (email), seat freed
(SMS, email, 2 h claim), new date (waitlist first, then interest list), change or cancellation, then
PEIs. Transactional messages take priority; marketing messages respect consent, frequency caps and
quiet hours.

## Payments and data security

- Card data typed directly into the gateway's hosted page; Salesforce stores only a token reference,
  last 4, amount and status. PCI DSS SAQ A target (to confirm with MH finance). Signed, idempotent
  webhooks; daily reconciliation; refunds by token.
- Data classes: public (event info), PII (name, email, phone), sensitive (class topic, caregiver
  relationship, survey answers, CME), payment (token only), consent (per channel).
- Controls: TLS 1.2+, encryption at rest, Shield Platform Encryption on sensitive fields, Event
  Monitoring, Field Audit Trail, BAA coverage (to confirm), backups with tested restores, Data Mask in
  sandboxes, SSO + MFA, least-privilege permission sets, no tracking pixels on registration or payment
  pages, bot defense, secure code review, dependency scanning, penetration test before go-live.

## Reliability (failure modes)

Gateway down: hold seat, retry, "finish payment" link. Salesforce slow: queue buffers and replays,
dead letter plus alert. Marketing Cloud delay: transactional priority, QR shown on the confirmation
page. Duplicate submits: idempotency. Virtual link failure: backup link. Traffic beyond forecast:
waiting room tuned live. Plus monitoring, synthetic tests, runbooks, on-call for launches, CI/CD,
feature flags and load tests before major conferences.

## Scalability

Elastic edge and waiting room; horizontally scaled registration service; queued, batched Salesforce
writes; events and hospitals as configuration; archive old registrations; separate transactional
and marketing sends; agents get their own rate limits.

## PEIs

Thank you and survey, next class, app adoption, find a doctor, demand re-engagement (new dates for
waitlist and interest lists). Opt-in only.

## AI agent harness (phase 4, future)

Agents: Event Ops, Demand, Campaign, Attendee concierge, Insights. Harness: action registry,
guardrails and policies (consent, PHI rules, spend limits), human approval gates, per-agent identity
and least privilege, audit log and observability, evaluations before release, kill switch, Einstein
Trust Layer (masking, zero retention). Built on Agentforce and Data Cloud (licensed separately).

## Decisions needed

App channel option; registration layer host; waiting room product; payment gateways; quality
targets; Shield and BAA; waitlist rules (cap, claim window, demand threshold).
