# Premium Design Principles for Wedding Invitations

This reference codifies premium design principles specifically adapted for digital wedding invitations, ensuring interfaces that feel luxurious, intentional, and technically extraordinary.

---

## 1. The Signature Moment Rule

Every invitation must have **ONE** memorable interactive moment. Everything else stays clean and disciplined. Spend boldness in ONE place.
- Animated wax seal break
- Envelope unfold sequence
- Gold dust particles (subtle canvas effect)
- Parallax photo reveals
- Spring-physics card flip

## 2. Anti-Slop Rules (Banned Patterns)

- **Zero em-dashes (—)** anywhere on the page.
- **Never use pure #000000 or #FFFFFF**; always use off-black or off-white tinted with the theme palette.
- **No layout repetition**: don't use the same card layout in more than 2 consecutive sections. Use at least 4 distinct layout families across the 14 sections (e.g., card, timeline, grid, full-width, asymmetric, bento).
- **No decorative section numbering** (01 / 02 / 03).
- **Max 1 eyebrow** (UPPERCASE TRACKING label) per 3 sections.
- **No generic defaults**: Avoid "warm cream + brass + oxblood" defaults unless explicitly requested in the brief.
- **No scroll cues** ('Scroll ↓'), version footers, or decorative status dots.

## 3. Typography Discipline

- **Negative tracking** (-0.02em) on large couple name headings for elegance.
- **Generous line-height** (1.6-1.8) on event detail text to improve legibility.
- **Dark surface compensation**: slightly more line-height, more letter-spacing, one step heavier weight.
- **Body text max-width**: 65ch to maintain optimal reading lengths.
- **Numeric data**: Use `font-variant-numeric: tabular-nums` on countdown numbers and bank account data.

## 4. Motion with Purpose (Apple HIG Adapted)

- **Micro-feedback**: Respond on `pointerdown` (scale 0.97, transition 100ms) for buttons and interactive elements.
- **Elegant easing**: Use `cubic-bezier(0.165, 0.84, 0.44, 1)` for smooth, premium transitions.
- **Accessibility**: Respect `@media (prefers-reduced-motion)` with cross-fades instead of slides or complex reveals.
- **Scroll reveals**: `opacity` + `translateY(20-30px)`, threshold 0.12, ease-out 0.8s.
- **Cover screen**: Use interruptible spring-like transitions (not fixed duration).
- **Scroll boundaries**: Implement rubber-band effect where applicable.

## 5. Craft Floor (Surface Polish)

- **Selection**: Custom `::selection` with theme accent colors.
- **Inputs**: Custom `caret-color` on form inputs.
- **Scrollbar**: Custom `::-webkit-scrollbar` (thin, themed).
- **Focus**: Custom `:focus-visible` with theme ring color.
- **Links**: `text-underline-offset: 0.15em`.
- **Shadows**: Must have spatial offset AND soft blur (never flat zero-blur shadows). Mix colors from the background to tint shadows.

## 6. Pre-Flight Quality Checklist

A mechanical checklist that agents must run before delivering a finished invitation:
- [ ] Zero em-dashes on entire page
- [ ] Single consistent theme (no light/dark inversions mid-scroll)
- [ ] One accent color + one corner-radius system across all components
- [ ] Button & form contrast passes WCAG AA (min 4.5:1 body, 3:1 large text)
- [ ] CTA buttons fit on 1 line at desktop
- [ ] `prefers-reduced-motion` respected
- [ ] `min-h-[100dvh]` on cover screen
- [ ] Hero fits in initial viewport (mobile + desktop)
- [ ] Max 4 text elements in hero section
- [ ] All images have descriptive `alt` text
- [ ] `og:image` uses absolute HTTPS URL
- [ ] Countdown shows celebration banner when date passes
- [ ] Bank details copy button works
- [ ] WhatsApp RSVP generates correct message format
- [ ] Responsive on 375px, 768px, 1280px+

## 7. Color & Palette Selection Philosophy

- Every palette must feel intentional, not random.
- **Gold/metallic accents** should be adapted per palette (not always the same generic `#D4AF37`). Mix the gold to have undertones matching the background.
- **Dark themes** need carefully tuned glassmorphism (more blur, less opacity) to look luxurious.
- **Light themes** need subtle texture (radial gradients, paper grain) to avoid feeling flat or sterile.
- The **dress code color swatches** should derive from the invitation's own palette to create harmony.
