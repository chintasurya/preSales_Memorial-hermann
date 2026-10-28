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
4. Can conference payments move to Chase (our recommendation), retiring Authorize.net with Certain?
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

## Call with Kevin Kelly (2026-10-20), as reported by Surya

- **Scope:** add conference setup (conferences with sessions) into the existing Salesforce event and
  class solution. Not a new platform, not a rebuild of classes.
- **Data migration:** not needed. No Certain data moves to Salesforce.
- **Payments:** Chase integration for conference payments. Cancellations and refunds reuse the
  existing workflows in today's class solution.
- **Waitlist:** keep the waitlist / interest list feature in scope.
- **Mobile app:** not in scope. Screens should be web based.
- **Virtual sessions:** Certain provides a conference video link today; access is IP restricted, so
  not everyone can join. Proposal (Surya): integrate Zoom or Microsoft Teams so the join link works
  for attendees anywhere. Which platform MH licenses is [to confirm].

## Discovery summary: questions and customer responses (as of 2026-10-26)

**1. What problem are you trying to solve with patient registration and event management?**
They want to replace Certain for conferences by adding conferences to the existing Classes and Events
solution that already runs in Salesforce.

**2. Who registers for classes, events and conferences?**
Patients, plus caregivers and providers.

**3. Which Salesforce products do you use?**
Marketing Cloud and Health Cloud.

**4. Is the current solution an AppExchange product or a custom build? Who built it?**
Custom built, not AppExchange.

**5. How is attendance tracked today?**
There is no tracking today, and they do not want it in scope.

**6. How are registrants contacted, and from which tool?**
Salesforce emails.

**7. Zoom or Teams, and IT rules for external attendees?**
Still to be clarified.

**8. When does the Certain contract renew, and when is the next conference?**
June 2027.

**9. Are payments made through Chase or Authorize.net?**
Classes and events use Chase today. They want conferences to follow the same Chase process.

**10. How are cancellations and refunds handled?**
Classes and events already have a cancellation and refund workflow. Conferences should use the same one.

**11. Is data migration from Certain needed?**
No. They do not want any data migration.

**Additional points from the customer**
- Conference sessions must be open to attendees outside the US, with no IP restrictions. If that is
  too complex to implement, they are open to other options.
- Their priority is to bring conferences into the existing solution and follow the same process that
  classes and events follow today.
- Conferences happen once or twice a year. They spend a six-figure amount each year on Certain and want
  to replace it at the lowest cost.

Still open: conference volumes (sessions, attendees, online audience); must-haves such as badges,
sponsors and CME credits; Zoom or Teams and IT rules.

## Clarifications from the architect Q&A (2026-10-28, as reported by Surya)

- **Virtual sessions:** Kevin did not ask for Zoom or Teams specifically. Classes and events already run
  online and in person with an existing virtual meeting integration (which one is not known). Reuse it
  for conferences; the only requirement is that people outside the US can join. Kevin's stance: do not
  over-engineer this, conferences happen about twice a year.
- **Waitlist:** not asked for right now; offered as an optional extra.
- **Registrant changes and cancellations:** public site, no login; secure link in the confirmation email
  opens the registration on the Experience Cloud site with change and cancel options.
- **Attendance:** QR check-in and no-show follow-up emails were suggested and declined for now.
- **Email:** Marketing Cloud notifications were suggested; Kevin said volumes are low, so Salesforce
  email stays (under the 5,000 a day limit).
