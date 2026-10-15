# Memorial Hermann: Event Platform on Salesforce (presales)

Insight Global presales workspace for Memorial Hermann Health System (Houston, TX).

**The ask (from Kevin Kelly, Director, Marketing Operations):** one event platform on Salesforce that
handles simple classes and events (free or paid, in person or online) and one or two multi-day
conferences a year with session management. Today they use a home-built Salesforce + Sitecore
solution for classes (Chase payments) and Certain for conferences (Authorize.net), which they want
to replace.

**Our position:** build a Salesforce event app on their existing Health Cloud org in two phases
(classes, then conferences), then upsell an engagement layer: Marketing Cloud journeys with
patient engagement initiatives (PEIs) that drive My Memorial Hermann app downloads and booked visits.

## Contents

```
docs/
  01-account-research.md            Systems, Salesforce footprint, vendors, contacts, compliance
  02-discovery-and-client-answers.md Questions asked and Kevin's answers
  03-solution-approach.md           Architecture, data model, payments, phases, timeline
  04-engagement-upsell.md           PEIs, campaigns, app downloads, KPIs
  05-glossary.md                    Terms used with the client
  06-status-and-next-steps.md       Manager direction, open questions, next actions
  07-brand-template.md              Insight Global template rules
  08-detailed-design.md             Detailed design (draft v0.1, awaiting approval)
deck/
  Memorial-Hermann-Event-Platform.pptx  Client deck (21 slides, IG template)
  mockups/                          Concept screens (HTML source + PNG renders)
  assets/bg/                        Backgrounds taken from the IG template
  build/                            Scripts that render mockups and build the deck
reference/
  InsightGlobal_PowerPoint_Template.pdf
```

## Rebuild the deck

```bash
cd deck/build
npm install
node render-mockups.js   # only if a mockup HTML changed (needs Playwright + Chromium)
node build-deck.js       # writes deck/Memorial-Hermann-Event-Platform.pptx
```

Open the deck in desktop PowerPoint with the Trenda IG Text fonts installed; other machines
substitute a default font.
