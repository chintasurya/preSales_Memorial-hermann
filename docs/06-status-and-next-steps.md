# Status and next steps

## Timeline of work

| Date | What happened |
|---|---|
| 2026-10-09 | Manager asked for account research: Salesforce footprint, vendors, offshore vendors, data layer into Marketing Cloud, audits. No problem statement yet. |
| 2026-10-14 | Request received for patient registration and event management. Kevin Kelly identified as contact. Top 5 questions sent. |
| 2026-10-15 | Kevin answered (see `02-discovery-and-client-answers.md`). First solution deck drafted. Manager (Sandeep) feedback: open with the solution, screens and timeline, add payments, then upsell the registration data (PEIs, campaigns, app downloads). Deck rebuilt in the Insight Global template. |
| 2026-10-15 | Surya feedback: PEI = patient engagement initiatives; registration goes into the existing My Memorial Hermann app (no new app); needs a detailed design covering high demand (100,000 clicks for 30 seats), notification of overflow demand, payment and data security, reliability, scalability, and a future AI agent harness. Design review v0.1 drafted (`08-detailed-design.md`). **Deck update waits for Surya's approval of the design.** |
| 2026-10-15 | Surya agreed the design. Asked for three new slides: demand handling (not titled "high demand"), payments and data security, AI agents in a controlled harness. Previews built (`deck/previews/`, source `deck/build/design-slides.js`). **Waiting for Surya's approval before adding them to the deck.** |

## Manager direction (Sandeep)

- First slides solve their problem, with screenshots of how we would build it, and a timeline.
- Cover payment integration.
- Then upsell: what to do with the data. Patients registered, PEIs after the class, campaigns, drive
  mobile app downloads, bring them into the network.
- Show the future plan.

## Open questions

- Volumes, conference must-haves (CME, badges, sponsors), payment approach, Certain renewal date.
- Who built the home-built class solution (in house or a partner).
- Implementation partners and any offshore vendors on the Salesforce org.

## Next actions

1. Surya reviews the detailed design (https://claude.ai/artifact/SZmKrbqDdha5A6HHgVT8ku); on approval, update every slide with reliability, security, scalability and the agent harness.
2. Review the deck with Sandeep.
3. Ask Kevin for a walkthrough of the current solution with Lucky Rai's team.
4. Return with a scoped plan, team and estimate.

## Artifacts

- `deck/Memorial-Hermann-Event-Platform.pptx` (current, IG template)
- Earlier draft deck (non-template): https://claude.ai/artifact/UhZEJHafG5M55BCCFpuEUp
