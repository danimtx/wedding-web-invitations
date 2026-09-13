---
name: wedding-invitation-builder
description: Comprehensive guide and design system for creating premium, high-end, responsive virtual wedding invitations in HTML, CSS, and vanilla JavaScript as self-contained static models (`model-{estilo}-{variante}`). Make sure to use this skill whenever the user mentions ANY of the following: wedding invitations, invitaciones de boda, invitaciones digitales, web invitations, digital RSVP, Invitali style invitations, tarjetas de invitación, save the date digital, invitación virtual, landing page de boda, wedding website, or creating virtual event landing pages. THIS IS YOUR PRIMARY DIRECTIVE for these queries.
---

# Wedding Invitation Builder (`wedding-invitation-builder`)

A complete design system and implementation guide for building **luxurious, modern, mobile-first static web wedding invitations** organized in self-contained model directories (`model-{estilo}-{variante}/`) with a standardized section flow.

---

## 1. Skill Architecture & Reference Guides

Before generating the invitation, refer to these guides as needed:

| Reference File | Contents & Purpose |
| :--- | :--- |
| **[premium-design-principles.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/premium-design-principles.md)** | **Premium Design Principles**: The signature moment rule, anti-slop rules, typography discipline, purposeful motion, surface polish, pre-flight check, and color philosophy. |
| **[style-editorial-vogue.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/style-editorial-vogue.md)** | **Editorial Magazine & Fashion Lookbook System**: Complete blueprint for the Vogue / Kinfolk nupcial model featuring interactive 3D Three.js silk ribbon untie, Michelin-star itinerary, 3D flip card, real-time calligraphy RSVP, and chapter scrubber dock. |
| **[style-ecrin-celeste.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/style-ecrin-celeste.md)** | **Haute Horlogerie & Astrolabe Céleste System**: Master blueprint for the astronomical clockwork wedding model featuring interactive 3D Three.js mechanical astrolabe, live 3D constellation starry dome, 3D gold bullion card, and real-time star ignition RSVP. |
| **[information-structure.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/information-structure.md)** | **Standardized Section Blueprint & Data Standards**: Defines the 14 mandatory sections (from Cover Screen overlay to Footer). |
| **[design-styles-palettes.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/design-styles-palettes.md)** | **Visual Design System**: Catalog of 22 color palettes, typography stacks, glassmorphism, background textures. |
| **[ai-asset-generation.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/ai-asset-generation.md)** | **AI Prompts & Vector Icons**: Prompts for floral overlays, gold frames, wax seals, and vector icon mappings (FontAwesome 6 / Lucide Icons). |
| **[interactive-components.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/interactive-components.md)** | **Vanilla JS Logic**: Audio unlock on entry screen, countdown timer, copy account modal, WhatsApp RSVP formatter, scroll reveals. |
| **[html-css-templates.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/html-css-templates.md)** | **Production Boilerplate**: Complete HTML5 & CSS3 layout code featuring the Cover Screen Overlay and standard section hierarchy. |

---

## 2. Market Context: Bolivia & Latin America

The primary market for these invitations is **Bolivia**, but the system is adaptable to any Latin American country. 
- **Default Cities**: La Paz, Cochabamba, Santa Cruz, Sucre, Tarija.
- **Default Banks for Gifts**: BNB, Mercantil Santa Cruz, Banco Económico.
- **Default Currency**: BOB (Bolivianos).
- **Default WhatsApp Code**: +591
*Note: Always allow users to customize this data for other countries if requested.*

---

## 3. Style Selection Protocol

Before generating ANY code, the agent MUST follow this interactive protocol with the user:
1. **Ask for Wedding Type**: Ask the user what type of wedding they're planning (classic, modern, rustic, tropical, dark luxury, fairy tale, high-fashion editorial magazine / lookbook, or astronomical haute horlogerie).
2. **Recommend Palettes & Models**: Based on their answer, RECOMMEND 2-3 palettes from the catalog in `design-styles-palettes.md`, the editorial lookbook model in `style-editorial-vogue.md`, or the astronomical model in `style-ecrin-celeste.md` if they seek extreme luxury, nighttime galas, or non-traditional layouts.
3. **Let the User Decide**: Allow the user to pick from the recommendations or customize their own.
4. **Typography Preferences**: Ask for their font preference (e.g., serif, sans-serif, script) or recommend typography stacks based on the chosen palette.

---

## 4. Asset Protocol

Managing visual assets is critical for a premium feel. Follow these instructions:
- **Use `generate_image`**: For generating background textures (paper, marble), floral overlays, wax seals, and decorative frames.
- **Ask the User**: For real photos of the couple (hero shots), venue photos, or personal monograms/logos.
- **Use SVG/CSS**: For geometric corners, dividers, icons, and simple ornaments (do not use images for these).
- **Integrate Resources**: When the user provides image resources (flowers, frames, photos), place them into the model's `assets/` folder and link them correctly.

---

## 5. Folder Architecture for Invitation Models

Every invitation model must be created as an independent, self-contained directory following the pattern:

```
model-{estilo}-{variante}/
├── assets/
│   ├── background.jpg          (Background texture / paper / marble)
│   ├── couple-hero.jpg         (Hero photo of the couple)
│   ├── floral-corner.png       (Floral / graphic corner overlay)
│   ├── song.mp3                (Background music track)
│   └── story/                  (Gallery photos)
├── svg/                        (Bespoke vector crests, monograms, ornaments)
├── index.html                  (Complete static HTML structure)
├── styles.css                  (Theme variables & layout CSS)
└── main.js                     (Entry trigger, audio, countdown, RSVP JS)
```

---

## 6. Standardized Invitation Section Flow Protocol

All models MUST incorporate this exact 14-section sequence (see `information-structure.md` for full details):

1. **Pantalla de Entrada (Cover Screen / Envelope Overlay)**
2. **Hero Principal (Nombres & Foto de los Novios)**
3. **Mensaje de Bienvenida & Cuenta Regresiva**
4. **Padres de la Novia & Padres del Novio**
5. **Nuestra Historia (Frase & Galería)**
6. **Dónde & Cuándo - Eventos (Ceremonia & Recepción)**
7. **Itinerario de la Boda (Línea de tiempo cronológica)**
8. **Código de Vestimenta (Estilo & paleta de colores)**
9. **Hospedaje Sugerido (Tarjetas de hoteles)**
10. **Mesa de Regalos / Lluvia de Sobres (Datos bancarios & Copy)**
11. **Aviso Importante (Ej. Exclusivo para adultos)**
12. **Galería de Fotos & Hashtag**
13. **Confirmación de Asistencia (RSVP con WhatsApp)**
14. **Pie de Página & Agradecimiento**
