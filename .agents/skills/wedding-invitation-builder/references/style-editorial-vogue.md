# Style: Editorial Magazine & Fashion Lookbook (`style-editorial-vogue.md`)

This guide codifies the **Editorial Magazine & Haute Couture Lookbook** design pattern for digital wedding invitations (e.g. *L'Édition Nupciale*). It provides an ultra-premium alternative to traditional stacked-card and envelope templates, transforming the invitation into an exclusive private fashion issue (inspired by Vogue, Kinfolk, and Harper's Bazaar).

---

## 1. When to Choose This Style

Recommend this style whenever the couple or client:
- Seeks something **different, innovative, and non-repetitive** compared to conventional web invitations.
- Has high-fashion, editorial, or destination wedding aesthetics (e.g., Lake Como, San Miguel de Allende, Paris, Tuscany).
- Desires a **couture entrance** that moves away from standard envelope flaps or center wax seals.
- Values typography-first layout, asymmetric magazine spreads, and storytelling over repetitive card blocks.

---

## 2. Core Architectural Pillars

| Component | Standard Model | Editorial Lookbook Model |
| :--- | :--- | :--- |
| **Entrance Experience** | Centered envelope flap with wax seal | **Haute Couture Magazine Cover** tied by an **interactive 3D silk ribbon in Three.js** with gate-fold opening. |
| **Audio Interface** | Bottom floating circular pill | **Top Editorial Ticker** with live Canvas audio frequency waveform bars. |
| **Story Layout** | Centered text paragraph | **Asymmetric 2-column feature spread** with Bodoni drop-cap, pull-quote, and full-bleed portrait with archive caption. |
| **Itinerary Sequence** | Vertical timeline with bullet dots | **"Menu Dégustation" in 6 courses** (Michelin-star gala dinner tasting menu format). |
| **Dress Code** | 4-5 color circles in a card | **Runway Fashion Moodboard** with circular textile swatches, hex codes, and silhouette guides for Damas and Caballeros. |
| **Gifts & Bank Info** | Static modal or text box | **Interactive 3D Revolving Card** (180° flip with spring physics, luxury chip on front, magnetic strip and 1-click CLABE copy on back). |
| **RSVP Interaction** | Form with submit button | **Letterpress Correspondence Card with Real-Time Calligraphy Preview** (guest's name appears live in cursive script as they type). |
| **Navigation Dock** | None / Standard navbar | **Floating Bottom Chapter Scrubber Bar** (`[ 01 · Histoire ] [ 02 · Célébration ] ...`) with ScrollSpy. |

---

## 3. Visual Tokens & Typography Stack

### Color Tokens (French Linen, Espresso & Champagne Gold)
```css
:root {
  /* Editorial Canvas */
  --vogue-cream: #FBF8F3;         /* Warm French Linen Paper */
  --vogue-paper: #F3EFE6;         /* Secondary Editorial Card Surface */
  --vogue-parchment: #EBE5D8;     /* Subtle Accent Surface */
  
  /* Ink & Noir */
  --vogue-espresso: #1A1817;      /* Deep Parisian Espresso Black */
  --vogue-charcoal: #2D2926;      /* High-contrast Subtitles & Body */
  --vogue-muted: #7E766D;         /* Secondary Metadata & Captions */

  /* Haute Couture Gold */
  --vogue-gold: #C59B51;          /* Champagne Satin Gold */
  --vogue-gold-light: #DFBA73;    /* Highlight Specular Gold */
  --vogue-gold-dark: #8C672A;     /* Antique Rich Gold */

  /* Timing & Motion */
  --ease-couture: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Typography Hierarchy
1. **Mastheads & Headlines**: `Bodoni Moda` (Google Fonts, weights 300 to 700) or `Didot` (high-contrast serifs, negative letter-spacing `-0.03em`).
2. **Subheadings & Monoline Tickers**: `Cinzel` (weights 400, 600, uppercase with tracking `0.25em` to `0.4em`).
3. **Editorial Body & Pull-Quotes**: `Cormorant Garamond` (italic 400 for quotes, normal 400 for columns) or `Montserrat` (weights 300, 400 for legible metadata).
4. **Couture Signature & Calligraphy**: `Italianno` or `Pinyon Script` (for fluid handwritten accents and live RSVP preview).

```html
<!-- Google Fonts Imports -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300..900;1,6..96,300..900&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Italianno&family=Montserrat:ital,wght@0,200..700;1,300..600&display=swap" rel="stylesheet">
```

---

## 4. Key Interactive Components

### 4.1. Three.js 3D Silk Ribbon Untie Simulation
Instead of a standard modal, overlay the cover with a Three.js canvas featuring a procedural silk ribbon with specular sheen and dynamic wave displacement.

```javascript
// Ribbon Three.js Setup Blueprint
function initThreeRibbon(canvasElement, onUntieCallback) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvasElement.clientWidth / canvasElement.clientHeight, 0.1, 1000);
  camera.position.z = 50;

  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, alpha: true, antialias: true });
  renderer.setSize(canvasElement.clientWidth, canvasElement.clientHeight);

  // Champagne Silk Material
  const silkMaterial = new THREE.MeshStandardMaterial({
    color: 0xC59B51,
    roughness: 0.3,
    metalness: 0.35,
    side: THREE.DoubleSide
  });

  // Ribbon halves (left and right)
  const geomLeft = new THREE.PlaneGeometry(35, 4, 32, 4);
  const ribbonLeft = new THREE.Mesh(geomLeft, silkMaterial);
  ribbonLeft.position.set(-17.5, 0, 0);
  scene.add(ribbonLeft);

  const geomRight = new THREE.PlaneGeometry(35, 4, 32, 4);
  const ribbonRight = new THREE.Mesh(geomRight, silkMaterial.clone());
  ribbonRight.position.set(17.5, 0, 0);
  scene.add(ribbonRight);

  // Untie interaction triggers gate-fold open
  function untie() {
    // Eased displacement outward on X axis + rotation
    // Trigger gate-fold split (translateX(-100%) and translateX(100%))
    // Call onUntieCallback()
  }
}
```

### 4.2. 3D Revolving Card for Gifts / Honeymoon Fund
Implement a virtual credit / membership card that flips 180 degrees using CSS 3D transforms.

```css
.perspective-container {
  perspective: 1200px;
}

.card-3d-flipper {
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
}

.card-3d-flipper.is-flipped {
  transform: rotateY(180deg);
}

.card-face {
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform-style: preserve-3d;
}

.card-face-back {
  transform: rotateY(180deg);
}
```

### 4.3. Real-Time Calligraphy RSVP Preview
As the guest types their name, dynamically reflect it on a luxury debossed correspondence card above the form in real time.

```javascript
const nameInput = document.getElementById('rsvp-name');
const calligraphyDisplay = document.getElementById('calligraphy-guest-name');
const statusBadge = document.getElementById('calligraphy-status-badge');

nameInput.addEventListener('input', (e) => {
  const text = e.target.value.trim();
  calligraphyDisplay.textContent = text.length > 0 ? text : 'Distinguido Invitado';
});
```

### 4.4. Michelin-Star Itinerary (Menu Dégustation)
Format the timeline as courses of a grand gala dinner:
- `SERVICE I · 16:30 HRS` / *L'Arrivée & Sainte Cérémonie*
- `SERVICE II · 18:00 HRS` / *Cocktail d'Or & Quatuor à Cordes*
- `SERVICE III · 19:30 HRS` / *Banquet de Haute Cuisine en 4 Temps*
- `SERVICE IV · 21:30 HRS` / *La Première Valse & Cascades de Champagne*
- `SERVICE V · 22:30 HRS` / *Grand Bal & DJ Set Électronique*
- `SERVICE VI · 02:00 HRS` / *Tornaboda de Medianoche & Churros Artesanales*

---

## 5. Pre-Flight Checklist for Editorial Models

- [ ] **Zero em-dashes**: Ensure no `—` characters are present anywhere in HTML, CSS, or JS.
- [ ] **Asymmetric Spreads**: Alternating column ratios (e.g., 7-to-5 or 8-to-4) instead of uniform centered containers.
- [ ] **Drop-caps & Pull-Quotes**: Correctly styled with Bodoni drop caps and italic quotes.
- [ ] **3D Ribbon & Flip Card**: Fully functional with touch and mouse events.
- [ ] **Live Audio Visualizer**: Waveform bars animate only when sound is actively playing.
- [ ] **Chapter Scrubber**: Smooth scrolling navigation dock at bottom with active state tracking.
- [ ] **Mobile Viewport Optimization**: Cover fits within `100dvh` without unwanted overflow or clipping.
