# Current-state discovery call: questions for Memorial Hermann

Call purpose (2026-10-20): understand how today's systems work in detail. The solution overview
follows next week, so this call is about their system, not ours. Answers go into
`02-discovery-and-client-answers.md`.

## If time is short, ask these 12 first

1. Is today's class registration an AppExchange product, Salesforce custom build, or a mix? Who built it and who supports it?
2. Walk us through one class from creation to attendance: who sets it up, where, and what happens after someone registers.
3. How do you track attendance today for classes and conferences: QR code, sign-in sheet, manual check-in, nothing?
4. How are registrants contacted today (confirmations, reminders, changes, cancellations) and from which tool?
5. What does Certain do for you today that you must keep, and what frustrates you about it?
6. How many years of Certain data do you want to keep, and which data (events, sessions, attendees, payments, CME)?
7. How many classes, conferences and registrants a year? What is the largest single event?
8. What happens today when a class or session is full: waitlist, interest list, nothing?
9. How does the mobile app register people: same Experience Cloud pages, an API, or its own flow? Which app is it?
10. When does the Certain contract end, and are any conferences already being planned in Certain?
11. Who are the decision makers and day-to-day users (marketing, education, conference team, IT)?
12. What would make this project a success for you in the first year?

## 1. Current class and event solution (Salesforce + Sitecore)

1. Is the class solution an AppExchange package (which one), a Salesforce custom build, or both?
2. Who built it (in house, partner) and who maintains it today? Is documentation available?
3. Which Salesforce objects hold classes, sessions, registrations and payments? Standard, Health Cloud or custom?
4. Is it on the Health Cloud org or a separate org? How many Salesforce orgs do you run?
5. How do Sitecore listings get their data: entered in Sitecore, or pulled from Salesforce?
6. Which Experience Cloud site handles registration? Is it authenticated or guest-user?
7. Can registrants log in to see, change or cancel their registrations?
8. Who creates a class today and how long does it take? Can staff copy or schedule recurring classes?
9. What types of offerings exist (single class, series, tours, support groups, virtual), and how differently are they handled?
10. Do you support group or family registrations (for example, a couple for a childbirth class)?
11. Why can confirmation take up to 24 hours? Is there a manual step or a batch job?
12. Which classes are phone-only today, and why?
13. What breaks most often or creates the most support calls?

## 2. Conferences on Certain

1. How many conferences a year, how many days, sessions and attendees each?
2. Who attends (providers, nurses, caregivers, public) and do different groups pay different rates?
3. Which Certain features do you use: agenda builder, session selection, speakers, abstracts, sponsors, exhibitors, badges, housing, surveys, mobile event app?
4. Do attendees choose sessions in advance? Are session seats capped?
5. Do you offer CME or CE credits? Who is the accrediting body and how are credits certified and reported?
6. How are speakers managed (invitations, bios, presentations, travel, payments)?
7. Do you sell sponsorships or exhibitor booths through Certain?
8. Are any conferences hybrid or virtual? Which platform streams them?
9. Does Certain connect to Salesforce or Marketing Cloud today? How does data flow, if at all?
10. What do you like about Certain that the replacement must match?
11. What is not working with Certain (cost, usability, data separation, payments, reporting)?
12. When does the Certain contract renew, and what notice period applies?

## 3. Registration experience and mobile app

1. Which mobile app registers for events (My Memorial Hermann / MyChart, Everyday Well, another)? Who owns it?
2. Does the app use the same Experience Cloud pages, an API, or its own registration flow?
3. What does a registrant need to provide (name, contact, date of birth, MRN, insurance, due date)?
4. Do you collect any health information at registration (for example due date, condition)?
5. Do you need accessibility, language (Spanish) or interpreter options?
6. What happens when an event is full today: waitlist, interest list, phone call?
7. Do you notify interested people when a new date opens? How, and does it work?
8. Can people cancel or transfer online? What is the refund policy?

## 4. Attendance and check-in

1. How do you track attendance today for classes: QR code, sign-in sheet, instructor marks it, nothing?
2. How do you track attendance at conferences and at each session (badge scan, app, manual)?
3. Is attendance recorded back in Salesforce? Who uses it (instructors, CME, reporting)?
4. How do you handle no-shows? Do you track and follow up?
5. Who checks people in (front desk, instructors, volunteers) and on what devices?
6. Are certificates of attendance sent after a class or session?

## 5. Communications

1. How are registrants contacted today: confirmations, reminders, updates, cancellations, post-event surveys?
2. Which tool sends them: Salesforce email, Marketing Cloud, Certain, Sitecore, manual email?
3. Do you send SMS today? Through which provider?
4. Are there Marketing Cloud journeys tied to classes today? Who builds them?
5. Do you follow up after a class (survey, next class, service-line offers, app download)?
6. How are virtual links (Zoom / Teams) sent today?
7. How do you capture consent and unsubscribe preferences across email and SMS?

## 6. Payments and finance

1. How is Chase connected to the class solution: hosted page, API, which Chase product (Orbital, Paymentech)?
2. Is Authorize.net used for anything besides Certain?
3. Would finance accept conference payments through Chase? Same or separate merchant account?
4. How are refunds, discount codes, comps and fee waivers handled today?
5. How does finance reconcile payments (daily report, GL codes, cost centers by service line)?
6. Who handles payment disputes and failed payments?
7. Are any events invoiced to organizations instead of paid by card?

## 7. Data and migration from Certain

1. How many years of Certain data do you need to keep available after the move?
2. Which data must come across: events, sessions, speakers, attendees, payments history, CME credits, surveys?
3. Is there a legal or accreditation retention period (for example CME records)?
4. Can Certain export everything (reports, API, full database export)? Who has admin access?
5. How clean is the data: duplicates, test records, inconsistent fields?
6. Should historical attendees be matched to existing Salesforce person accounts?
7. Is older history better kept as an archive (export file) rather than loaded into Salesforce?
8. How will open refunds on historical Authorize.net payments be handled after the switch?
9. Is any conference registration open during the planned cutover window?
10. Which class history from the current solution needs to stay as is?

## 8. Reporting and data use

1. Which reports do you run today (registrations, revenue, attendance, demand, by service line or location)?
2. Who uses them (marketing, service lines, finance, leadership) and how often?
3. Do you measure what registrants do next (book appointments, download the app, join MyChart)?
4. Do you track demand you cannot meet (sold-out classes, waitlists)?
5. Is Data Cloud, Tableau or another analytics tool in use?

## 9. Platform, integrations and security

1. Which Salesforce editions and add-ons do you have (Health Cloud, Experience Cloud licenses, Shield, Agentforce, Data Cloud)?
2. How many Experience Cloud member or login licenses are available?
3. What other systems connect to Salesforce today (Sitecore, Epic via Lucky Rai's team, Zoom, data warehouse)?
4. Is there a middleware or integration platform (MuleSoft, Boomi, Azure)?
5. How do staff sign in (SSO provider) and what release process do you follow (sandboxes, DevOps tools, change board)?
6. Are there security reviews or standards a new solution must pass (data classification, PCI, BAA scope)?

## 10. People, process and timing

1. Who owns events today: Marketing Operations, service lines, education, a conference team?
2. How many staff create and manage events, and how many instructors?
3. Who will be the product owner and decision maker on our side of the table?
4. Is there an internal Salesforce team, and what role would they like in the build?
5. Are there dates we must hit (Certain renewal, next conference, budget cycle)?
6. Have you looked at other options (Cvent, Blackthorn, AC Events)? What did you think?
7. What would make this project a success for you?
