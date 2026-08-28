# HTML & CSS Templates

## Boilerplate with Craft Floor CSS

Include these base styles to ensure high-quality typographic and interactive details.

```css
/* Base Variables - Adapt to Theme */
:root {
  --color-bg-base: #ffffff;
  --color-text-main: #333333;
  --color-primary: #8a0000;
  --color-primary-light: #d1b3b3;
  --color-border-accent: #e0e0e0;
}

/* Craft Floor Defaults */
::selection {
  background: var(--color-primary-light);
  color: var(--color-bg-base);
}

input, textarea {
  caret-color: var(--color-primary);
}

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: var(--color-bg-base);
}
::-webkit-scrollbar-thumb {
  background: var(--color-border-accent);
  border-radius: 3px;
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

a {
  text-underline-offset: 0.15em;
}

.countdown-box span, .clabe-number {
  font-variant-numeric: tabular-nums;
}

/* Base Body Styles */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: var(--color-bg-base);
  color: var(--color-text-main);
  -webkit-font-smoothing: antialiased;
}
```

## Layout Variation Guidance

When designing sections, **AVOID making every section look exactly the same** (e.g., continuous floating glass cards). Alternate layouts to create rhythm and hierarchy:

- **Hero/Cover:** Full bleed image background, asymmetric text alignment, OR perfectly centered elegant typography.
- **Our Story:** Horizontal scroll cards for a modern feel, OR a vertical timeline with alternating left/right nodes.
- **Events:** Side-by-side descriptive cards for desktop, OR stacked cards with a static map preview.
- **Itinerary:** Vertical connected timeline with icons indicating the flow of the day.
- **Dress Code:** Centered minimal text with circular color swatches representing the palette.
- **Gallery:** Masonry grid layout, OR a horizontal scrolling marquee of photos.
- **RSVP:** Clean inline form, OR a modern bottom-sheet style popup.

## HTML Section Templates

### 1. Cover Screen with Guest Personalization
Use the date `15 DE NOVIEMBRE DE 2027` and default location `La Paz, Bolivia`.

```html
<section class="hero-section" id="home">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-subtitle">NOS CASAMOS</p>
    <h1 class="hero-names">María & Alejandro</h1>
    
    <!-- Dynamic Guest Personalization -->
    <p id="guest-greeting" class="guest-name font-serif-classic"></p>
    
    <div class="hero-date">
      <p>15 DE NOVIEMBRE DE 2027</p>
      <p>LA PAZ, BOLIVIA</p>
    </div>
  </div>
</section>
```

### 2. Smart Countdown
Include a hidden celebration div to reveal when the date passes.

```html
<section class="countdown-section" id="countdown">
  <h2>Faltan</h2>
  <!-- Target date: 2027-11-15T17:00:00 -->
  <div class="countdown-container" id="countdown-timer" data-date="2027-11-15T17:00:00">
    <div class="countdown-box">
      <span id="days">00</span>
      <p>Días</p>
    </div>
    <div class="countdown-box">
      <span id="hours">00</span>
      <p>Horas</p>
    </div>
    <div class="countdown-box">
      <span id="minutes">00</span>
      <p>Min</p>
    </div>
    <div class="countdown-box">
      <span id="seconds">00</span>
      <p>Seg</p>
    </div>
  </div>
  
  <!-- Hidden Celebration Div -->
  <div id="countdown-celebration" class="hidden">
    <h3>¡Llegó el gran día!</h3>
    <p>Acompáñanos a celebrar.</p>
  </div>
</section>
```

### 3. Events Section with Calendar & Maps Buttons

```html
<section class="events-section" id="events">
  <h2>Cuándo y Dónde</h2>
  
  <div class="event-cards-container">
    <!-- Ceremony Card -->
    <div class="event-card">
      <i class="fa-solid fa-church event-icon"></i>
      <h3>Ceremonia Religiosa</h3>
      <p class="event-time">17:00 Hrs</p>
      <p class="event-location">Basílica de San Francisco</p>
      <p class="event-address">Plaza San Francisco, La Paz</p>
      
      <div class="event-actions">
        <a href="#" class="btn-primary" target="_blank">
          <i class="fa-solid fa-map-location-dot"></i> Ver en Mapa
        </a>
        <a href="#" class="btn-secondary" target="_blank">
          <i class="fa-regular fa-calendar"></i> Agendar
        </a>
      </div>
    </div>

    <!-- Party Card -->
    <div class="event-card">
      <i class="fa-solid fa-champagne-glasses event-icon"></i>
      <h3>Recepción</h3>
      <p class="event-time">19:00 Hrs</p>
      <p class="event-location">Jardín Japonés</p>
      <p class="event-address">Calle 8 de Calacoto, La Paz</p>
      
      <div class="event-actions">
        <a href="#" class="btn-primary" target="_blank">
          <i class="fa-solid fa-map-location-dot"></i> Ver en Mapa
        </a>
        <a href="#" class="btn-secondary" target="_blank">
          <i class="fa-regular fa-calendar"></i> Agendar
        </a>
      </div>
    </div>
  </div>
</section>
```

### 4. Photo Gallery with Lightbox Attributes

```html
<section class="gallery-section" id="gallery">
  <h2>Nuestros Momentos</h2>
  <div class="gallery-grid">
    <a href="assets/photo1.jpg" data-lightbox="wedding-gallery" data-title="Nuestro Compromiso">
      <img src="assets/photo1-thumb.jpg" alt="Compromiso">
    </a>
    <a href="assets/photo2.jpg" data-lightbox="wedding-gallery" data-title="Paseo por la ciudad">
      <img src="assets/photo2-thumb.jpg" alt="Paseo">
    </a>
    <a href="assets/photo3.jpg" data-lightbox="wedding-gallery" data-title="Para siempre">
      <img src="assets/photo3-thumb.jpg" alt="Juntos">
    </a>
  </div>
</section>
```

### 5. RSVP Form (Respecting URL Params)

```html
<section class="rsvp-section" id="rsvp">
  <h2>Confirmar Asistencia</h2>
  <p>Esperamos contar con tu presencia. Por favor, confirma antes del 15 de Octubre.</p>
  
  <form id="rsvp-form" class="rsvp-form">
    <div class="form-group">
      <label for="guest-name-input">Nombre Completo</label>
      <input type="text" id="guest-name-input" name="name" required>
    </div>
    
    <div class="form-group">
      <label for="attendance">¿Asistirás?</label>
      <select id="attendance" name="attendance" required>
        <option value="" disabled selected>Selecciona una opción</option>
        <option value="yes">¡Sí, ahí estaré!</option>
        <option value="no">Lo siento, no podré asistir</option>
      </select>
    </div>

    <div class="form-group">
      <label for="guests-count">Número de acompañantes</label>
      <input type="number" id="guests-count" name="guests" min="0" max="5" value="0">
    </div>

    <button type="submit" class="btn-submit">Confirmar</button>
  </form>
</section>
```
