---
name: CR Psicologia e Saúde
description: Renda de Bilro. Green lace-pillow cloth, ivory thread, brass pins, photos pinned like small prints.
colors:
  pano: "#2B3F33"
  pano-fundo: "#223228"
  verde: "#354A3D"
  salvia: "#A7B49B"
  papelao: "#E3E8DA"
  fio: "#EFE8D8"
  fio-suave: "#CDD0BF"
  latao: "#B9965B"
  latao-claro: "#D8BB82"
  tinta: "#232C26"
  tinta-suave: "#455048"
  tinta-sobre-salvia: "#2D3A31"
  erro: "#8A2F1F"
typography:
  display:
    fontFamily: "Gilda Display, Bodoni Moda, Palatino Linotype, Georgia, serif"
    fontSize: "clamp(2.6rem, 4.7vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Gilda Display, Bodoni Moda, Palatino Linotype, Georgia, serif"
    fontSize: "clamp(2.2rem, 4.2vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Gilda Display, Bodoni Moda, Palatino Linotype, Georgia, serif"
    fontSize: "clamp(1.7rem, 2.9vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Hanken Grotesk, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Hanken Grotesk, system-ui, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1
  signature:
    fontFamily: "Herr Von Muellerhoff, Segoe Script, Brush Script MT, cursive"
    fontSize: "1.7em"
    fontWeight: 400
    lineHeight: 0.8
rounded:
  sm: "3px"
  md: "4px"
  full: "50%"
spacing:
  xs: "0.6rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "3rem"
  section: "7.5rem"
  section-mobile: "4.75rem"
components:
  button-fio:
    backgroundColor: "{colors.fio}"
    textColor: "{colors.pano-fundo}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "1rem 1.6rem"
  button-fio-hover:
    backgroundColor: "#FFFFFF"
  button-verde:
    backgroundColor: "{colors.verde}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "1rem 1.6rem"
  button-verde-hover:
    backgroundColor: "{colors.pano-fundo}"
  print:
    backgroundColor: "{colors.fio}"
    textColor: "{colors.pano-fundo}"
    padding: "12px 12px 0"
  field:
    backgroundColor: "#FFFFFF"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0.85rem 1rem"
  header:
    backgroundColor: "{colors.pano-fundo}"
    textColor: "{colors.fio}"
    height: "82px"
---

# Design System: CR Psicologia e Saúde

## Overview

**Creative North Star: "Renda de Bilro"**

The system is a bobbin-lace pillow. A deep green cloth carries a faint grid of pin holes. Ivory thread braids are drawn in SVG with real over/under crossings. Brass pins hold small ivory-bordered photographs to the cloth. Light sections are pale green "papelão" (the pricked card a lace pattern is drawn on) or flat sage. The idea behind it: child, family and school are three threads in one weave.

Tone is quiet, crafted and warm without cream. Density is generous: sections breathe at 7.5rem, text columns stay narrow, and motion is rare and slow. The thread is the only decoration that moves, and it draws once.

The brief's pinned starting palette (#F7F5EF, #A7B49B, #354A3D, #DCCBBB, #B98269, #30332F) was a starting point, not a constraint. What shipped keeps only sage (#A7B49B) and deep green (#354A3D). Cream (#F7F5EF) and terracotta (#B98269) were dropped because the user rejected the cream, terracotta and serif reading as generic. Sand (#DCCBBB) and the grey ink (#30332F) did not ship as tokens. Brass (#B9965B) replaced terracotta as the single warm accent; the ink became a green-black (#232C26).

**Key Characteristics:**
- Green cloth with pin-dot grid, never flat black or white.
- Ivory thread as the only line motif; brass as the only warm accent.
- Photos are pinned prints with ivory borders, never rounded frames.
- Hairline rules with a small brass dot at the start, like a pin on a thread.
- Self-hosted type: Gilda Display, Hanken Grotesk, Herr Von Muellerhoff.

## Colors

A green-on-green palette with ivory thread and a single brass accent. Warmth comes from ivory and brass only.

### Primary
- **Pano Green** (`pano`, #2B3F33): the cloth. Page body and dark sections, with the ivory pin-dot grid (30px pitch) on top.
- **Deep Verde** (`verde`, #354A3D): CTA on light grounds (`button-verde`), headings on papelão, serif row titles, dot grid on papelão.
- **Pano Fundo** (`pano-fundo`, #223228): header, footer, dark ink on sage, button text on ivory, hover state of verde button.

### Secondary
- **Sage** (`salvia`, #A7B49B): flat light section ground, no grid. Used for atuação and for blog or infantil variants.
- **Papelão** (`papelao`, #E3E8DA): pale green section ground with a green pin-dot grid (30px). Used for sobre, espaço, blog.

### Tertiary
- **Brass** (`latao`, #B9965B): pins (radial gradient from #F1DDAA to #7C6030), the dot on hairline rules, selection, form focus ring.
- **Light Brass** (`latao-claro`, #D8BB82): script signature in the hero, nav underline, focus ring on dark grounds, "ler" underline.

### Neutral
- **Ivory Thread** (`fio`, #EFE8D8): text and thread on cloth, print borders, ivory button, form card, WhatsApp float.
- **Soft Ivory** (`fio-suave`, #CDD0BF): secondary text on cloth and footer.
- **Ink** (`tinta`, #232C26): body text on light grounds.
- **Soft Ink** (`tinta-suave`, #455048): leads, meta, dates on papelão.
- **Ink on Sage** (`tinta-sobre-salvia`, #2D3A31): secondary text on sage, where soft ink is too weak. Hard-coded in the CSS, not a custom property.
- **Error** (`erro`, #8A2F1F): form error text only.

### Named Rules
**The One Warm Thing Rule.** Brass is the only warm hue. It appears as pins, rule dots, signature script and focus. No second warm accent.

**The Cloth-Not-Page Rule.** Dark sections are the default surface (`pano`). Light sections are papelão or sage, never white or cream. Pure white appears only inside form fields and button hover.

**The Sage-Contrast Rule.** On sage, secondary text uses #2D3A31 or #223228, not soft ink or ivory.

## Typography

**Display Font:** Gilda Display (fallbacks Bodoni Moda, Palatino Linotype, Georgia, serif)
**Body Font:** Hanken Grotesk (fallbacks system-ui, Segoe UI, Roboto, sans-serif)
**Signature Font:** Herr Von Muellerhoff (fallbacks Segoe Script, Brush Script MT, cursive)

**Character:** A thin, high-contrast serif as fine as the thread, over a humanist grotesque that stays out of the way. The script is a signature, as in the logo, and never body or heading text.

### Hierarchy
- **Display** (400, clamp(2.6rem, 4.7vw, 4.5rem), 1.06): Home h1, max 13em. Inner-page h1 uses clamp(2.4rem, 5.2vw, 4.4rem).
- **Headline** (400, clamp(2.2rem, 3.8vw to 4.2vw, 3.3rem to 3.6rem), 1.08): section h2.
- **Title** (400, clamp(1.7rem, 2.9vw, 2.5rem), 1.08): area and recorte h3. Row titles in lists run 1.4rem to 2.1rem; the three-thread titles are 2.1rem.
- **Body** (400, 1.0625rem, 1.7): default. 1rem under 640px. Long article text is 1.12rem at 1.8. Leads run 1.15rem to 1.25rem.
- **Label** (500, 0.93rem to 1rem, no tracking): buttons, nav links (0.95rem), links. Brand sublabel is the only uppercase: 0.68rem, 0.2em tracking.
- **Signature** (400, script, 1.7em at line-height 0.8 in hero; 2.5rem in print captions): one word in the hero h1 and one name in the portrait caption.

### Named Rules
**The Signature-Only Script Rule.** Script appears at most twice per page, as a signature word. Never for headings, labels or buttons.

**The Weight-400 Serif Rule.** Gilda has one weight. Hierarchy comes from size and color, never from faux bold. Bold (600) exists only in Hanken for inline emphasis and form labels.

## Layout

Single wrapper of min(1240px, 100% - 3rem). Sections are full-bleed grounds with 1.5rem side padding and 7.5rem vertical padding (4.75rem under 960px). Two-column grids use asymmetric ratios: 1.2fr/.8fr (hero), 5fr/7fr (sobre, trajetória, infantil, recorte), 1.3fr/.7fr (cta). The mural is three columns with staggered top offsets (4.5rem, 1.5rem). Header is sticky, 82px tall (72px on mobile).

Breakpoints from the CSS: 1200px (nav collapses to burger), 1100px (area rows stack, footer to 2 columns), 960px (all two-column grids stack, mural to 2 columns), 640px (single column, full-width buttons, alternating 84% print widths). Type scales with clamp, not breakpoints. Pages are not a stack of equal cards: rows are separated by hairline rules.

Content sections alternate ground: pano, papelão, sage, pano. Do not put two same-ground sections back to back without a thread or rule between them.

## Elevation & Depth

Depth is physical, not digital. Prints and the form card sit above the cloth with a long, soft, downward shadow. Headers use a blur backdrop. Nothing glows. Plain text sections have no shadow.

### Shadow Vocabulary
- **Print on cloth** (`box-shadow: 0 26px 44px -18px rgba(0,0,0,.6), 0 2px 0 rgba(0,0,0,.15)`): hero portrait.
- **Print on papelão** (`box-shadow: 0 20px 34px -18px rgba(34,50,40,.55)`): mural and gallery. Article cover and map use 0 22px 38px -20px at the same tint.
- **Pin** (`box-shadow: 0 3px 5px rgba(0,0,0,.4)`): brass pin, 15px.
- **Floating contact** (`box-shadow: 0 14px 28px -10px rgba(0,0,0,.6)`): the WhatsApp button.

### Named Rules
**The Pinned-Print Rule.** A photo is an ivory print (10px to 12px border), a brass pin at top center, a slight tilt (about 1 to 2 degrees), and one of the shadows above. On hover it straightens and lifts 6px.

## Shapes

Mostly square. Buttons are 4px, form fields 3px, the skip link 6px. Circles are used for pins, rule dots, the lightbox close and the WhatsApp float. No pills, no arches, no blobs, no rounded photo frames. Photos are cropped rectangles at 3/4 or 4/5 (hero portrait 313/399). Rules are hairlines (1px to 1.5px) in translucent green or ivory, ending in a small brass dot at the left. Thread strokes are 1.5px ivory with round caps and joins, over a 6px halo in the ground color so the over/under crossing reads.

## Components

### Buttons
- **Shape:** 4px radius, 1.5px transparent border, padding 1rem 1.6rem, 500 weight, 1rem.
- **Ivory (`button-fio`):** on cloth. Ivory ground, #223228 text. Hover turns white and lifts 2px.
- **Verde (`button-verde`):** on papelão and sage. #354A3D ground, white text. Hover darkens to #223228 and lifts 2px.
- **Icon:** line icon at 1.15em, 1.8px stroke, currentColor. Arrow glyph shifts 3px right on link hover.
- **Mobile:** full width under 640px.

### Links
- **Text link:** 500 weight, 1.5px underline at 6px offset, min height 44px. Underline fades on hover.
- **Focus:** 3px light brass outline on dark grounds, 3px verde on light (`.claro` and mural buttons).

### Navigation
- **Header:** sticky, #223228 at 94% with 10px blur, 1px ivory hairline below. Brand is the logo plus serif name and a tracked uppercase sublabel.
- **Links:** 0.95rem, 500. A 2px light brass underline grows from the left on hover and for `aria-current="page"`.
- **Mobile:** burger at 48px (3 bars to X) opens a full-width panel under the header, with hairline-separated rows.

### Prints and Mural
Signature component. See The Pinned-Print Rule. The Home mural uses 5 prints with alternating tilt; a click opens a `dialog` lightbox with a 10px ivory border and a circular ivory close.

### Hairline Rows
Used for formação, áreas, posts, canais. A 1px to 1.5px green hairline above each row, a brass dot at its left end, and a hover that shifts padding (not color). Area rows add a pale ivory wash on hover.

### Thread (Trama)
Signature component. Ivory SVG braids with halo crossings. The hero braid draws once on load using a left-to-right `clip-path` over 2.6s. The three-thread section reveals top to bottom through a clip variable. The CTA braid sits behind text at 45% opacity in the cloth ground color. All motion is removed under `prefers-reduced-motion`.

### Inputs / Fields
- **Style:** white ground, 1.5px green border at 45%, 3px radius, padding .85rem 1rem, inside an ivory card with print shadow.
- **Label:** 600 weight, verde, 0.95rem.
- **Focus:** 3px brass outline, border shifts to verde.
- **Error:** #8A2F1F, 500 weight.

### Footer
#223228, four columns (1.3fr 1fr 1fr 1fr), serif column headings in ivory, soft ivory links, legal row under an ivory hairline.

## Do's and Don'ts

### Do:
- **Do** start dark: pano green with the ivory 30px pin-dot grid, then alternate papelão and sage.
- **Do** draw rules, rows and dividers as hairlines with a brass dot at the left end.
- **Do** keep every photograph an ivory-bordered print with a pin and a slight tilt.
- **Do** use verde (#354A3D) for CTAs on light grounds, ivory buttons on cloth.
- **Do** use Gilda only at weight 400 and script only for a signature word.
- **Do** keep touch targets at 44px minimum and focus rings at 3px.
- **Do** respect `prefers-reduced-motion`: show final states, remove draw animation.

### Don't:
- **Don't** use cream, white or terracotta as a section ground or accent. They were tried in the brief and rejected.
- **Don't** add pills, arches, blobs, round photo frames or icon tiles.
- **Don't** add a second warm accent next to brass.
- **Don't** set secondary text on sage in soft ink or ivory.
- **Don't** use script for headings, buttons or more than a signature word per block.
- **Don't** replace hairline rows with equal rounded cards.
