# Status and next steps

## Timeline of work

| Date | What happened |
|---|---|
| 2026-10-09 | Manager asked for account research: Salesforce footprint, vendors, offshore vendors, data layer into Marketing Cloud, audits. No problem statement yet. |
| 2026-10-14 | Request received for patient registration and event management. Kevin Kelly identified as contact. Top 5 questions sent. |
| 2026-10-15 | Kevin answered (see `02-discovery-and-client-answers.md`). First solution deck drafted. Manager (Sandeep) feedback: open with the solution, screens and timeline, add payments, then upsell the registration data (PEIs, campaigns, app downloads). Deck rebuilt in the Insight Global template. |
| 2026-10-15 | Surya feedback: PEI = patient engagement initiatives; registration goes into the existing My Memorial Hermann app (no new app); needs a detailed design covering high demand (100,000 clicks for 30 seats), notification of overflow demand, payment and data security, reliability, scalability, and a future AI agent harness. Design review v0.1 drafted (`08-detailed-design.md`). **Deck update waits for Surya's approval of the design.** |
| 2026-10-15 | Surya agreed the design. Asked for three new slides: demand handling (not titled "high demand"), payments and data security, AI agents in a controlled harness. Previews built (`deck/previews/`, source `deck/build/design-slides.js`). **Waiting for Surya's approval before adding them to the deck.** |
| 2026-10-15 | Surya approved the three slides and asked for sequence-diagram views of the overall solution. Deck rebuilt to 26 slides: overall solution design (sequence, slide 6), demand handling (10), registration and seat flow detail (11), payments and data security (12), payment sequence detail (13), AI agent harness (24). PEI renamed and in-app registration applied across slides. |
| 2026-10-15 | Surya: sequence slides (6, 11, 13) moved to the white background for readability. |
| 2026-10-15 | Surya asked for team and commercials: 5-person pod (2 Salesforce developers, 1 Marketing Cloud developer, 1 Scrum Master or PM, 1 QA), 2-week sprints with a milestone at each sprint end, pyramid team diagram, and pricing shown as $700,000 standard value struck through with a 50% upfront partner credit ($350,000). Previews built (`deck/build/delivery-slides.js`, `deck/previews/preview-*.jpg`). **Approved and added: deck now 28 slides (sprint plan 16, pod 17, investment 26).** |
| 2026-10-15 | Surya: Investment slide states the pricing is for an offshore delivery model (subtitle, OFFSHORE tag, footnote). |
| 2026-10-19 | Surya found class registration already runs on Experience Cloud and a mobile app registers for events. Alignment review: core ask is replacing Certain (conferences with sessions) on one Salesforce platform; deck currently over-scopes by rebuilding class registration. Reframe proposed, pending Surya's decision. |
| 2026-10-19 | Surya asked to rework the deck. Preview built (`deck/previews/reworked-deck-preview.pptx`, 29 slides): new "Build on what already works" (keep / improve / replace) slide, conferences as Phase 1 (replaces Certain), classes improved in Phase 2, 10 sprints / 20 weeks, investment resized proportionally to $580,000 standard and $290,000 partner. **Main deck unchanged until Surya approves.** |
| 2026-10-19 | Surya approved the rework (slide 3 renamed "Business opportunity") and shared draft 2 with his edits. Edits carried into the build; "What each phase delivers" restored and placed after the timeline. Main deck now 30 slides. Logo slot added on the title slide; Memorial Hermann logo file still needed (cannot be downloaded from this environment). |
| 2026-10-19 | Surya: conferences use Chase, already integrated for classes, instead of Authorize.net (which goes with Certain). Deck updated (slides 3, 4, 6, 7, 13, 14, 17, 18, 29 and the conference mockup). Finance sign-off on Chase merchant setup for conference fees [to confirm]. |

## Manager direction (Sandeep)

- First slides solve their problem, with screenshots of how we would build it, and a timeline.
- Cover payment integration.
- Then upsell: what to do with the data. Patients registered, PEIs after the class, campaigns, drive
  mobile app downloads, bring them into the network.
- Show the future plan.

## Open questions

- Why replace Certain (cost, experience, data in a separate system, payments)? What is not working with today's class registration, if anything?
- Does the mobile app use the same Experience Cloud registration? Which app is it?
- Do they want one platform for classes and conferences, or only a Certain replacement?

- Volumes, conference must-haves (CME, badges, sponsors), payment approach, Certain renewal date.
- Who built the home-built class solution (in house or a partner).
- Implementation partners and any offshore vendors on the Salesforce org.

## Next actions

1. Add the Memorial Hermann logo file, then review the 30-slide deck with Sandeep.
2. Ask Kevin for a walkthrough of the current solution with Lucky Rai's team.
3. Return with a scoped plan, team and estimate.

## Artifacts

- `deck/Memorial-Hermann-Event-Platform.pptx` (current, IG template)
- Earlier draft deck (non-template): https://claude.ai/artifact/UhZEJHafG5M55BCCFpuEUp
