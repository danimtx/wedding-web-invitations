# AI Asset Generation & Resources

## Asset Decision Protocol

When building an invitation, use the following guide to determine where to get assets:

**Use `generate_image` tool for:**
- Background paper/marble/linen textures
- Watercolor floral corner overlays (PNG with transparent bg)
- 3D wax seal emblems
- Golden/silver geometric frames
- Watercolor washes and splashes
- Abstract botanical illustrations

**Ask the user to provide:**
- Real couple photos (engagement, proposal, adventures)
- Venue/church photos
- Custom logos or monograms they already have
- Any specific decorative resources they've found (flowers, frames, etc.)

**Use SVG/CSS for (no image generation needed):**
- Simple geometric corner ornaments
- Line dividers and separators
- Icon badges (FontAwesome/Lucide)
- Color gradient overlays
- Simple leaf/branch line art

**When the user provides resources (flowers, frames, textures):**
- Save them in the model's `assets/` directory
- Reference them in CSS as `background-image` or `img src`
- Adapt CSS colors/filters to match the chosen palette
- Use CSS `filter` or `mix-blend-mode` to tint user-provided assets to match the theme

---

## Prompts Organized by Palette Category

Use these prompts with the `generate_image` tool, adapting the details as needed.

### Romantic Warm (Carmesí, Guindo, Burdeos, Crema Vintage)
- **Floral:** dark burgundy roses, blush pink, gold eucalyptus, watercolor illustration, isolated on white background
- **Texture:** warm cotton paper texture, subtle champagne gold dust specks, seamless background
- **Seal:** 3d deep wine red wax seal with gold monogram, macro photography, white background

### Cool Elegant (Malva, Violeta, Melocotón, Brisa Marina)
- **Floral:** lavender hydrangeas, dusty rose, silver-green foliage, elegant watercolor, isolated on white background
- **Texture:** cool linen paper texture with subtle blue-gray watercolor wash, seamless
- **Seal:** 3d dusty mauve wax seal with silver monogram, highly detailed, white background

### Dark Luxury (Dark Marble, Bosque Nocturno, Sepia)
- **Floral:** deep burgundy flowers with gold-edged petals, dark moody botanical illustration, on black background
- **Texture:** elegant black marble texture with fine gold veins, luxury background
- **Seal:** 3d obsidian black wax seal with bright gold monogram, macro, dark background

### Natural/Rustic (Botanical, Chocolate, Hygge, Marrón)
- **Floral:** olive eucalyptus branches, sage, cream gardenias, fine gold line border, isolated on white
- **Texture:** natural linen texture, kraft paper background, subtle wood grain
- **Seal:** 3d earth-toned brown wax seal with antique bronze monogram, white background

### Tropical/Festive (Tropical Vibrante, Frambuesa, Garden Party)
- **Floral:** tropical monstera leaves, bright fuchsia hibiscus blooms, coral accents, vibrant watercolor, isolated white background
- **Texture:** light sunny warm paper texture with subtle vibrant watercolor splashes
- **Seal:** 3d vibrant coral fuchsia wax seal with bright gold leaf monogram, white background

### Neutral/Pastel (Rosado Grisáceo, Nata, Boudoir)
- **Floral:** soft blush peonies, baby's breath, cream roses, delicate watercolor, isolated on white background
- **Texture:** ultra-soft blush watercolor paper texture, smooth, minimal
- **Seal:** 3d champagne colored wax seal with rose gold monogram, white background

---

## Inline SVG Ornament Library

Use these SVGs directly in the HTML. They use `currentColor` to automatically adapt to the text color of their container.

### Corner Ornaments

**Baroque Corner:**
```html
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,0 Q20,0 20,20 Q20,40 40,40" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <circle cx="20" cy="20" r="2" fill="currentColor"/>
</svg>
```

**Minimal Corner:**
```html
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,2 L20,2 L20,20" stroke="currentColor" stroke-width="1.5" fill="none"/>
</svg>
```

**Botanical Corner:**
```html
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,0 Q20,20 40,40" stroke="currentColor" stroke-width="1"/>
  <path d="M10,10 Q15,5 20,10 Q15,15 10,10" fill="currentColor"/>
  <path d="M20,20 Q25,15 30,20 Q25,25 20,20" fill="currentColor"/>
</svg>
```

**Geometric Corner:**
```html
<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2" y="2" width="36" height="36" stroke="currentColor" stroke-width="1" fill="none"/>
  <rect x="6" y="6" width="28" height="28" stroke="currentColor" stroke-width="0.5" fill="none"/>
</svg>
```

### Dividers

**Diamond Divider:**
```html
<svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" stroke-width="1"/>
  <path d="M50,5 L55,10 L50,15 L45,10 Z" fill="currentColor"/>
  <line x1="60" y1="10" x2="100" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>
```

**Heart Divider:**
```html
<svg width="100" height="20" viewBox="0 0 100 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="10" x2="35" y2="10" stroke="currentColor" stroke-width="1"/>
  <path d="M50,15 Q40,5 50,2 Q60,5 50,15 Z" fill="currentColor"/>
  <line x1="65" y1="10" x2="100" y2="10" stroke="currentColor" stroke-width="1"/>
</svg>
```

### Frames & Branches

**Laurel Wreath Monogram Frame:**
```html
<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20,80 Q5,50 50,10 Q95,50 80,80" stroke="currentColor" stroke-width="1.5" fill="none"/>
  <path d="M20,80 Q30,70 40,75" stroke="currentColor" stroke-width="1" fill="none"/>
  <path d="M80,80 Q70,70 60,75" stroke="currentColor" stroke-width="1" fill="none"/>
</svg>
```

**Leaf Branch Separator:**
```html
<svg width="80" height="20" viewBox="0 0 80 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10,10 Q40,15 70,10" stroke="currentColor" stroke-width="1" fill="none"/>
  <path d="M30,12 Q35,5 40,12" fill="currentColor"/>
  <path d="M50,12 Q55,5 60,12" fill="currentColor"/>
</svg>
```

**Double-Line Frame Border:**
```html
<svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="2%" y="2%" width="96%" height="96%" stroke="currentColor" stroke-width="1" fill="none"/>
  <rect x="4%" y="4%" width="92%" height="92%" stroke="currentColor" stroke-width="0.5" fill="none"/>
</svg>
```

---

## Icon Mapping (FontAwesome)

Use these standard FontAwesome classes for consistency across sections. Include the FA CDN in the HTML `<head>`.

| Section | Icon Class | Fallback / Alternative |
|---------|------------|------------------------|
| 1. Cover Screen | `fa-solid fa-heart` | `fa-regular fa-heart` |
| 2. Audio Player | `fa-solid fa-music`, `fa-solid fa-play`, `fa-solid fa-pause` | `fa-solid fa-compact-disc` |
| 3. Couple Intro | `fa-solid fa-rings-wedding` (Pro) | `fa-solid fa-ring` |
| 4. Story/Timeline | `fa-solid fa-clock`, `fa-solid fa-calendar-heart` | `fa-regular fa-calendar` |
| 5. Countdown | `fa-solid fa-hourglass-half` | `fa-solid fa-stopwatch` |
| 6. Events (Ceremony) | `fa-solid fa-church` | `fa-solid fa-place-of-worship` |
| 6. Events (Party) | `fa-solid fa-champagne-glasses` | `fa-solid fa-martini-glass` |
| 7. Itinerary | `fa-solid fa-list-ul` | `fa-solid fa-timeline` |
| 8. Location/Map | `fa-solid fa-map-location-dot` | `fa-solid fa-location-dot` |
| 9. Dress Code | `fa-solid fa-user-tie` | `fa-solid fa-shirt` |
| 10. Gifts | `fa-solid fa-gift` | `fa-solid fa-envelope-open-text` |
| 11. Photo Gallery | `fa-solid fa-camera-retro` | `fa-solid fa-images` |
| 12. RSVP Form | `fa-solid fa-envelope` | `fa-solid fa-paper-plane` |
| 13. Accommodation | `fa-solid fa-hotel` | `fa-solid fa-bed` |
| 14. Footer | `fa-solid fa-infinity` | `fa-solid fa-heart` |
