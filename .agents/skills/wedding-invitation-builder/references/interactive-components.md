# Interactive Components & JavaScript Logic (`interactive-components.md`)

This guide contains complete, production-ready Vanilla JavaScript code for cover screen audio unlock, countdown calculations, RSVP WhatsApp formatting, copy-to-clipboard modals, scroll reveal animations, lightboxes, and smart URL personalization.

---

## 1. Complete Main JavaScript Script (`main.js`)

Copy or reference this clean vanilla JS script in your static model project:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initCoverOverlay();
  initCountdown();
  initRsvpForm();
  initCopyClabe();
  initScrollAnimations();
  initLightbox();
});

/* ==========================================================================
   0. PERSONALIZATION ENGINE (URL PARAMS)
   ========================================================================== */
function initPersonalization() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('invitado');
  const maxPasses = parseInt(params.get('pases')) || 4;
  
  // Update cover screen greeting
  if (guestName) {
    const greetingEl = document.getElementById('guest-greeting');
    if (greetingEl) {
      greetingEl.textContent = `Querido/a ${decodeURIComponent(guestName)}`;
    }
    
    // Pre-fill RSVP name
    const nameInput = document.getElementById('rsvp-name-input');
    if (nameInput) {
      nameInput.value = decodeURIComponent(guestName);
    }
  }
  
  // Limit passes in RSVP
  const passBoxes = document.querySelectorAll('.pass-box');
  if (passBoxes.length > 0) {
    passBoxes.forEach((box, index) => {
      // Assuming passBoxes are ordered 1, 2, 3...
      if (index >= maxPasses) {
        box.style.display = 'none';
      }
    });
  } else {
    // Fallback if using a select input instead of boxes
    const passSelect = document.getElementById('rsvp-guests-count');
    if (passSelect) {
      Array.from(passSelect.options).forEach(option => {
        if (parseInt(option.value) > maxPasses) {
          option.style.display = 'none';
        }
      });
    }
  }
}

/* ==========================================================================
   1. COVER OVERLAY & AUDIO UNLOCK TRIGGER
   ========================================================================== */
function initCoverOverlay() {
  const coverOverlay = document.getElementById('cover-overlay');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const bgMusic = document.getElementById('bg-music');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');

  let isPlaying = false;

  function playAudio() {
    if (bgMusic) {
      bgMusic.play().then(() => {
        isPlaying = true;
        if (audioToggleBtn) {
          audioToggleBtn.classList.add('playing');
          audioToggleBtn.setAttribute('aria-label', 'Pausar Música');
        }
      }).catch(err => {
        console.log('Autoplay audio prevented by browser:', err);
      });
    }
  }

  function toggleAudio() {
    if (!bgMusic) return;
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
      if (audioToggleBtn) audioToggleBtn.classList.remove('playing');
    } else {
      playAudio();
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleAudio);
  }

  if (enterBtn && coverOverlay) {
    enterBtn.addEventListener('click', () => {
      // 1. Try to start background music
      playAudio();

      // 2. Animate cover screen fade out
      coverOverlay.classList.add('fade-out');

      // 3. Remove overlay from DOM flow after animation finishes
      setTimeout(() => {
        coverOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling
      }, 800);
    });
  }
}

/* ==========================================================================
   2. SMART COUNTDOWN TIMER CALCULATOR
   ========================================================================== */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  const countdownContainer = document.getElementById('countdown-container');
  if (!countdownEl || !countdownContainer) return;

  const weddingDateStr = countdownEl.dataset.date || '2027-11-15T17:00:00';
  const targetDate = new Date(weddingDateStr).getTime();
  
  // Confetti overlay or celebration banner element
  const celebrationBanner = document.getElementById('celebration-banner');

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    const oneDay = 1000 * 60 * 60 * 24;

    if (distance <= 0 && distance > -oneDay) {
      // It's the wedding day!
      countdownContainer.style.display = 'none';
      if (celebrationBanner) {
        celebrationBanner.style.display = 'block';
        celebrationBanner.innerHTML = '<h2>¡HOY ES NUESTRO GRAN DÍA!</h2>';
        celebrationBanner.classList.add('celebration-state');
      }
      return;
    } else if (distance <= -oneDay) {
      // Date has passed
      countdownContainer.style.display = 'none';
      if (celebrationBanner) {
        celebrationBanner.style.display = 'block';
        celebrationBanner.innerHTML = `<h2>Ya nos casamos ❤️</h2><p>${new Date(weddingDateStr).toLocaleDateString()}</p>`;
      }
      return;
    }

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  // Only set interval if the event hasn't passed
  if (targetDate - new Date().getTime() > - (1000 * 60 * 60 * 24)) {
    setInterval(updateTimer, 1000);
  }
}

/* ==========================================================================
   3. WHATSAPP RSVP FORM GENERATOR
   ========================================================================== */
function initRsvpForm() {
  const rsvpForm = document.getElementById('rsvp-form');
  if (!rsvpForm) return;

  // Bolivia format +591
  const whatsappPhone = '59170000000';

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name-input')?.value || 'Invitado';
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Sí, asistiré';
    const guestsCount = document.querySelector('input[name="guests-count"]:checked')?.value || '1';
    const notes = document.getElementById('rsvp-notes')?.value || 'Ninguna';

    const message = `¡Hola! Confirmación de asistencia para la Boda 💒✨%0A%0A` +
      `👤 *Nombre:* ${encodeURIComponent(name)}%0A` +
      `🎟️ *¿Asistirá?:* ${encodeURIComponent(attendance)}%0A` +
      `👥 *Pases a usar:* ${encodeURIComponent(guestsCount)}%0A` +
      `📝 *Notas / Alergias:* ${encodeURIComponent(notes)}`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${message}`;
    window.open(whatsappUrl, '_blank');
  });
}

/* ==========================================================================
   4. COPY BANK DATA TO CLIPBOARD
   ========================================================================== */
function initCopyClabe() {
  const copyBtns = document.querySelectorAll('.btn-copy-clabe');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const accountNumber = btn.dataset.account || '100000012345';
      navigator.clipboard.writeText(accountNumber).then(() => {
        showToast('¡Número de cuenta copiado al portapapeles!');
      }).catch(err => {
        console.error('Error al copiar: ', err);
      });
    });
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 100);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================================================
   5. SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ==========================================================================
   6. ADD TO CALENDAR GENERATOR
   ========================================================================== */
window.generateCalendarLinks = function(eventName, dateTimeStart, dateTimeEnd, location, description) {
  // Google Calendar
  const googleUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${dateTimeStart}/${dateTimeEnd}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(description)}`;
  
  // .ics file content
  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${eventName}\nDTSTART:${dateTimeStart}\nDTEND:${dateTimeEnd}\nLOCATION:${location}\nDESCRIPTION:${description}\nEND:VEVENT\nEND:VCALENDAR`;
  
  return { googleUrl, icsContent };
};

window.downloadICS = function(filename, icsContent) {
  const blob = new Blob([icsContent], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

/* Attach event listeners for calendar buttons in your HTML */
function initCalendarButtons() {
  const calendarBtns = document.querySelectorAll('.btn-add-calendar');
  calendarBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.dataset.title || 'Nuestra Boda';
      const start = btn.dataset.start || '20271115T170000Z';
      const end = btn.dataset.end || '20271116T020000Z';
      const loc = btn.dataset.location || 'Santa Cruz, Bolivia';
      const desc = btn.dataset.description || '¡Acompáñanos en nuestro gran día!';
      
      const { googleUrl, icsContent } = generateCalendarLinks(title, start, end, loc, desc);
      
      if (btn.classList.contains('ics')) {
        downloadICS('boda.ics', icsContent);
      } else {
        window.open(googleUrl, '_blank');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initCalendarButtons);

/* ==========================================================================
   7. LIGHTWEIGHT PHOTO LIGHTBOX
   ========================================================================== */
function initLightbox() {
  const galleryImages = document.querySelectorAll('.gallery-img');
  if (galleryImages.length === 0) return;

  // Create overlay
  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <div class="lightbox-content">
      <img class="lightbox-img" src="" alt="Gallery Image">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev">&#10094;</button>
      <button class="lightbox-next">&#10095;</button>
    </div>
  `;
  document.body.appendChild(lightboxOverlay);

  const lightboxImg = lightboxOverlay.querySelector('.lightbox-img');
  const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

  let currentIndex = 0;
  const images = Array.from(galleryImages).map(img => img.src || img.dataset.src);

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex];
    lightboxOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.src = images[currentIndex];
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });

  // Swipe logic for touch
  let touchStartX = 0;
  let touchStartY = 0;
  lightboxOverlay.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  });
  
  lightboxOverlay.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    if (touchStartX - touchEndX > 50) showNext(); // Swipe left
    if (touchEndX - touchStartX > 50) showPrev(); // Swipe right
    if (touchEndY - touchStartY > 50) closeLightbox(); // Swipe down
  });
}
```

---

## 2. Supporting CSS Animations, Lightbox & Craft Floor

```css
/* ==========================================================================
   CRAFT FLOOR (NEW CSS UTILITIES)
   ========================================================================== */
::selection {
  background-color: var(--color-primary, #9a804f);
  color: #fff;
}

input, textarea {
  caret-color: var(--color-primary, #9a804f);
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg-base, #fafafa);
}

::-webkit-scrollbar-thumb {
  background: var(--color-primary-light, #d3c4a1);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-primary, #9a804f);
}

:focus-visible {
  outline: 2px solid var(--color-primary, #9a804f);
  outline-offset: 2px;
}

a {
  text-underline-offset: 4px;
}

.countdown-numbers, .bank-data {
  font-variant-numeric: tabular-nums;
}

/* ==========================================================================
   EXISTING STYLES (COVER OVERLAY, TOAST, SCROLL)
   ========================================================================== */
.cover-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: var(--color-bg-base);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.cover-overlay.fade-out {
  opacity: 0;
  transform: scale(1.05);
  pointer-events: none;
}

.toast-notification {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--color-primary-dark, #4A0E17);
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 50px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  box-shadow: 0 10px 25px rgba(0,0,0,0.25);
  z-index: 99999;
  opacity: 0;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toast-notification.show {
  transform: translateX(-50%) translateY(0);
  opacity: 1;
}

.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* ==========================================================================
   CELEBRATION BANNER (SMART COUNTDOWN)
   ========================================================================== */
.celebration-state {
  animation: popIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  color: var(--color-primary, #9a804f);
  text-align: center;
  padding: 2rem;
}

@keyframes popIn {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

/* ==========================================================================
   LIGHTBOX OVERLAY
   ========================================================================== */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.lightbox-overlay.active {
  opacity: 1;
  pointer-events: auto;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);
}

.lightbox-close, .lightbox-prev, .lightbox-next {
  position: absolute;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
  z-index: 2;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  transition: transform 0.2s ease;
}

.lightbox-close {
  top: -40px;
  right: 0;
}

.lightbox-prev {
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
}

.lightbox-next {
  right: -50px;
  top: 50%;
  transform: translateY(-50%);
}

.lightbox-prev:hover, .lightbox-next:hover, .lightbox-close:hover {
  transform: scale(1.2) translateY(calc(-50% / 1.2));
}
.lightbox-close:hover {
  transform: scale(1.2);
}

@media (max-width: 768px) {
  .lightbox-prev { left: 10px; }
  .lightbox-next { right: 10px; }
}
```

---

## 9. Advanced 3D & Editorial Components

For high-fashion and editorial magazine models requiring cutting-edge interactivity:
- **Three.js 3D Silk Ribbon Simulation**: Interactive physical cloth ribbon untie sequence that replaces traditional envelope flaps.
- **3D Revolving Card (Flip Card 180°)**: Virtual credit/membership card with spring physics for wedding gifts and CLABE copying.
- **Real-Time Calligraphy RSVP Preview**: Live debossed envelope that renders the guest's name dynamically in script typography as they type.
- **Floating Chapter Scrubber Bar**: Dock with ScrollSpy tracking section progression.

Refer to the complete blueprints and code snippets in:
**[style-editorial-vogue.md](file:///c:/Users/72873/Desktop/invitaciones/.agents/skills/wedding-invitation-builder/references/style-editorial-vogue.md)**.

