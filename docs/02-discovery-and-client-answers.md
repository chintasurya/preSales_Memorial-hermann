# Discovery questions and client answers

## Questions sent to Kevin Kelly (top 5)

1. What problem are you trying to solve with patient registration and event management?
2. By "patient registration," do you mean sign-ups for classes and events, or a registry of patients
   with a specific condition? Who registers (patients, caregivers, providers, community)?
3. What kinds of events do you run today, and how do registration and event management work now,
   including the tools you use?
4. How does data from Epic currently reach Salesforce? Who owns that integration?
5. Which Salesforce products are you using today?

## Kevin's answers (client, verbatim summary)

1. **Problem:** General event registration and management: simple classes and events (free or small
   fee, in person or online) and multi-day conference registration including session management.
2. **Who registers:** Primarily consumers (may include patients, though MH would not necessarily know
   they are patients), plus caregivers and providers (especially for conferences). It is class and
   event sign-up, not a clinical registry.
3. **Events today:** Mostly simple, part-day events, free and paid (hospital tours, CPR classes, labor
   and delivery classes), plus one or two major conferences a year. Classes run on a home-built
   solution using Salesforce and Sitecore. Certain manages conferences and multi-day events.
4. **Epic:** Not sure there is a need. If an Epic integration exists, it is Lucky Rai's area on the
   digital team.
5. **Salesforce:** Health Cloud and Marketing Cloud are the main products. Unsure whether the classes
   solution was a separate project or built in house. Certain is used for conferences and they are
   looking to replace it. Payments: Chase for Salesforce-based classes, Authorize.net for Certain
   events.

## Follow-up questions (for the next meeting)

1. About how many classes, conferences and registrants per year?
2. What is not working with the home-built solution and with Certain?
3. Conference must-haves: session selection, speakers, badges, sponsors, CME credits?
4. Keep both Chase and Authorize.net, or consolidate on one gateway?
5. When does the Certain contract renew? Can we review the current setup with Lucky Rai's team?
6. Which 2 to 3 service lines should the first engagement journeys target?

Parked for now at the user's request: consent, HIPAA and budget questions.

## Current state observed (2026-10-19)

- Class listings live on Sitecore (memorialhermann.org/patients-visitors/classes-events). "Register Now"
  redirects to a separate site to finish registration; Surya confirms this is a Salesforce Experience
  Cloud site (the home-built solution Kevin mentioned).
- Payment is taken at sign-up; listings warn that confirmation can take up to 24 hours and not to
  resubmit payment after an error. Some classes are phone-only (713-222-CARE).
- Surya reports a mobile app where people can register for events (not yet verified which app; the
  site also lists an "Everyday Well" app).
- Implication: class registration already exists on Salesforce. The only tool Kevin said they want to
  replace is Certain (conferences). Reframe: replace Certain with Salesforce conference and session
  management and unify classes on the same model, enhancing (not rebuilding) the existing class flow.
