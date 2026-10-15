# Insight Global deck template rules

Source: `reference/InsightGlobal_PowerPoint_Template.pdf` (June 2026 user guide).

## Typography (Trenda IG Text)

| Use | Weight / case | Size |
|---|---|---|
| Large text callout | Light, loose spacing | 34-56 pt |
| Primary headline | Bold, sentence case | 28-40 pt |
| Large stat | Light | 22-28 pt (larger for stat slides) |
| Secondary headline | Light, all caps, loose spacing | 18-28 pt |
| Body | Regular | 15-28 pt |
| Tertiary headline | Bold, title case | 14 pt |
| Caption | Regular italic | 12 pt |

## Colors

Primary: yellow `FED700`, cyan `00D6F2`, magenta `FF0068`, black `000000`, navy `01273C`, white.
Secondary (use sparingly): orange `F98B34`, pink-purple `D214AA`, purple `45289F`, green `56E23B`,
light gray `F2F2F2`.

## Layout conventions

- Title: black with green / blue and magenta / gold corner gradients, logo top center, light all-caps title.
- Section dividers: blue, magenta or gold gradient with logo.
- Content: black or white, small spaced all-caps eyebrow top left, bold title, IG dot mark bottom left,
  page number bottom right.
- Agenda: numbered outlined circles. Tables: bold header, solid rule, dotted row rules.
- Timeline: white line with end dots, dotted connectors, blocks above and below.
- Closing: three overlapping gradient circles with "THANK YOU".
- Buttons: rounded pills in one color family per deck.
- Open in desktop PowerPoint; browser versions do not support the embedded fonts.

The build script (`deck/build/build-deck.js`) encodes these as slide layouts: IG Title, IG Agenda,
IG Section Blue / Magenta / Gold, IG Dark, IG Light, IG Spectrum, IG Closing.
