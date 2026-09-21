/**
 * Starter Kit - Template v2 Entry Point
 * Wires together wedding.config.js with reusable core modules.
 */

import { weddingConfig } from './wedding.config.js';
import { initAudioPlayer } from '../../core/js/audio-controller.js';
import { initCountdown } from '../../core/js/countdown.js';
import { initRSVP } from '../../core/js/rsvp-whatsapp.js';
import { initCopyButtons } from '../../core/js/copy-clipboard.js';
import { initScrollObserver } from '../../core/js/scroll-observer.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Populate Dynamic Config Data
  document.querySelectorAll('[data-bind]').forEach(el => {
    const path = el.getAttribute('data-bind').split('.');
    let value = weddingConfig;
    for (const key of path) {
      if (value && value[key] !== undefined) {
        value = value[key];
      } else {
        value = null;
        break;
      }
    }
    if (value !== null) {
      el.textContent = value;
    }
  });

  // Set maps links
  const ceremonyLink = document.querySelector('[data-link="ceremony.maps"]');
  if (ceremonyLink && weddingConfig.ceremony?.mapsUrl) {
    ceremonyLink.href = weddingConfig.ceremony.mapsUrl;
  }
  const receptionLink = document.querySelector('[data-link="reception.maps"]');
  if (receptionLink && weddingConfig.reception?.mapsUrl) {
    receptionLink.href = weddingConfig.reception.mapsUrl;
  }

  // 2. Audio Controller
  const audioController = initAudioPlayer(
    '#audio-toggle',
    weddingConfig.audio?.src || '../../shared_assets/audio/wedding-song.mp3',
    { autoPlayOnInteraction: false }
  );

  // 3. Cover / Envelope Opening
  const coverOverlay = document.getElementById('cover-overlay');
  const btnOpen = document.getElementById('btn-open-invitation');
  if (btnOpen && coverOverlay) {
    btnOpen.addEventListener('click', () => {
      coverOverlay.classList.add('is-opened');
      // Start audio after user explicitly opens the envelope
      if (audioController) {
        audioController.play();
      }
    });
  }

  // 4. Countdown Timer
  initCountdown(weddingConfig.event.date, '#countdown');

  // 5. WhatsApp RSVP
  initRSVP('#rsvp-form', { phone: weddingConfig.rsvp.whatsappPhone });

  // 6. Copy Bank Info with Toast
  initCopyButtons('[data-copy-target]');

  // 7. Scroll Reveal Animations
  initScrollObserver('[data-reveal]');
});
