# Style: Haute Horlogerie & Astrolabe Céleste (`style-ecrin-celeste.md`)

This guide codifies the **Haute Horlogerie & Astronomical Astrolabe** design pattern for digital wedding invitations (e.g. *L'Écrin Céleste*). It transforms the invitation into a bespoke Swiss astronomical timepiece and live cosmic constellation dome (inspired by Van Cleef & Arpels Midnight Poetic Astronomy, Patek Philippe Celestial, and Breguet).

---

## 1. When to Choose This Style

Recommend this style whenever the couple or client:
- Seeks an **unprecedented, awe-inspiring, and theatrical** digital invitation.
- Has a nocturnal gala, celestial, or black-tie evening wedding under the stars.
- Appreciates Swiss watchmaking precision, astronomy, or classical luxury aesthetics.
- Desires a signature mechanical entrance with gears, winding crown, and live 3D constellation interaction.

---

## 2. Core Architectural Pillars

| Component | Traditional Model | Haute Horlogerie Model |
| :--- | :--- | :--- |
| **Entrance Experience** | Standard envelope flap with wax seal | **Astronomical Astrolabe 3D in Three.js** with concentric counter-rotating gears, planet spheres, and a tactile winding crown. |
| **Live Astronomy** | Static background photo | **Interactive 3D Starry Sky Dome** in Three.js showing real constellations on the wedding night (Cygnus, Lyra, Orion) and binary stars for the couple. |
| **Countdown** | 4 flat numeric boxes | **Chronomètre de Précision** with horological escapement, tourbillon motion, and sweeping second hand. |
| **Itinerary Sequence** | Vertical bullet dots | **"Le Carnet Nocturne" in 6 Celestial Alignments** (Ceremonia Solemne, Crépuscule d'Or, Banquete Imperial, Valse Lunaire, Bal Cosmique, L'Aurore). |
| **Dress Code** | Color swatches in a card | **Nocturne Royal Moodboard** with orbital planetary swatches (*Nuit, Lapis, Or, Lune, Onyx*) and Black Tie guidance. |
| **Gifts & Bank Info** | Static modal / text | **Lingot d'Or 3D (Revolving Bullion Card)** with 24K purity hallmarks on front, magnetic strip and 1-click CLABE copy on back. |
| **RSVP Interaction** | Form with submit button | **"L'Étoile des Vœux" (Enciende Tu Estrella)**: Real-time script name rendering + igniting a live 3D star in the wedding sky dome upon confirmation. |
| **Navigation Dock** | Generic top navbar | **Floating Celestial Astrolabe Dock** (`[ 01 · Histoire ] [ 02 · Bóveda ] ...`) with ScrollSpy. |

---

## 3. Visual Tokens & Typography Stack

### Color Tokens (Cosmic Void, Midnight Lapis & Star Gold)
```css
:root {
  /* Cosmic Backgrounds */
  --celestial-void: #05070D;       /* Deep Cosmic Space */
  --celestial-midnight: #090E1A;   /* Midnight Observatory Blue */
  --celestial-lapis: #0E172A;      /* Royal Lapis Lazuli Surface */
  --celestial-nebula: #1A233A;     /* Soft Starlight Nebula */
  
  /* Haute Horlogerie Gold */
  --celestial-gold: #E5C158;       /* Liquid Star Gold */
  --celestial-gold-light: #F5DC92; /* Highlight Specular Gold */
  --celestial-dark-gold: #9A7532;  /* Horological Bronze Gold */

  /* Celestial Accents */
  --celestial-ivory: #F7F8FA;      /* Pure Celestial Starlight Text */
  --celestial-moonlight: #C8D1DC;  /* Moonlight Silver-Blue Subtitles */
  --celestial-muted: #8A95A5;      /* Secondary Astronomical Coordinates */

  /* Timing & Easing */
  --ease-horology: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Typography Hierarchy
1. **Astronomic Titles & Numbers**: `Cinzel Decorative` and `Cinzel` (weights 600, 700, 900, tracking `0.25em` to `0.4em`).
2. **Editorial Headlines & Serifs**: `Bodoni Moda` and `Cormorant Garamond` (italic 400 for poetic quotes).
3. **Couture Calligraphy Signature**: `Italianno` (for real-time RSVP guest pass cursive script).
4. **Astronomical Metadata & Coordinates**: `Montserrat` and tabular monospace for chronometer numbers.

```html
<!-- Google Fonts Imports -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Italianno&family=Montserrat:ital,wght@0,200..700;1,300..600&display=swap" rel="stylesheet">
```

---

## 4. Key Interactive Modules

### 4.1. Three.js Mechanical Astrolabe Simulation
Overlay with 3 concentric gears and orbiting planet spheres rotating continuously. A winding crown button triggers rapid acceleration, gold particle explosion, and aperture iris expansion.

### 4.2. Three.js Live 3D Constellation Sky Dome
Spherical star field with 1,200 stars distributed on a 3D sphere. User drag rotates the night sky. Highlights binary stars for the bride and groom, plus real-time star addition on RSVP.

### 4.3. 3D Lingot d'Or (Revolving Bullion Card)
Virtual 24K gold bullion bar that flips 180° in 3D using CSS `preserve-3d` and spring physics, revealing bank account transfer credentials.

### 4.4. Real-time Constellation RSVP
Live calligraphy display that writes the guest's name dynamically as they type and spawns a new star in the sky upon submission.

---

## 5. Pre-Flight Checklist

- [ ] **Zero em-dashes**: Ensure no `—` characters exist anywhere in the codebase.
- [ ] **Three.js Performance**: Dual WebGL canvas contexts managed cleanly without memory leaks.
- [ ] **Mobile Touch Support**: Sky dome supports single-touch rotation without interfering with vertical page scrolling.
- [ ] **High Contrast**: Gold and moonlight text pass WCAG AA on dark cosmic backgrounds.
- [ ] **1-Click CLABE Copy**: Clipboard API with visual toast feedback.
