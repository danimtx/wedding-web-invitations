/**
 * THE PINK PALACE / MAIN RUNWAY ENGINE
 * Model: Barbie Glam (Haute Barbiecore & Disco Couture)
 * Couple: Valentina Ferraro & Rodrigo De La Tour
 * Zero em-dashes constraint strictly enforced
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. CONFIGURATION & STATE
  // =========================================================================
  const WEDDING_DATE = new Date('2026-12-12T16:30:00-06:00'); // Cabo San Lucas (UTC-6)
  const CLABE_NUMBER = '012180019284710293';

  // DOM Elements Cache
  const entrance = document.getElementById('barbie-entrance');
  const btnUnbox = document.getElementById('btn-unbox');

  const audio = document.getElementById('wedding-audio');
  const btnAudioToggle = document.getElementById('btn-toggle-audio');
  const audioIcon = document.getElementById('audio-icon');
  const barbieEqualizer = document.getElementById('barbie-equalizer');

  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');

  const cardContainer = document.getElementById('barbie-platinum-card');
  const btnCopyClabe = document.getElementById('btn-copy-clabe');

  const rsvpForm = document.getElementById('barbie-rsvp-form');
  const rsvpName = document.getElementById('rsvp-name');
  const rsvpPasses = document.getElementById('rsvp-passes');
  const vipGuestName = document.getElementById('vip-guest-name');
  const vipPassCount = document.getElementById('vip-pass-count');
  const vipGuestStatus = document.getElementById('vip-guest-status');

  const galleryLightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  const toastContainer = document.getElementById('toast-container');
  const dockLinks = document.querySelectorAll('.dock-link');

  // =========================================================================
  // 2. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message, duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-sparkles text-barbie-hot mr-2"></i> ${message}`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 400);
    }, duration);
  }

  // =========================================================================
  // 3. HAUTE COUTURE 2D GALA UNBOXING & UNVEILING
  // =========================================================================
  function unboxCelebration() {
    if (!entrance || entrance.classList.contains('is-opened')) return;

    // Start Upbeat Audio Safely
    playAudioSafely();

    // 2D Celebratory Confetti Explosion (Hot Pink, Magenta, Gold, White Stars)
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 130,
        spread: 110,
        origin: { y: 0.6 },
        colors: ['#FF1493', '#FF69B4', '#FF85C1', '#FFFFFF', '#FFE4F0', '#FF007F']
      });
    }

    entrance.classList.add('is-opened');
    showToast('¡BIENVENIDO A THE PINK PALACE!');

    setTimeout(() => {
      entrance.style.display = 'none';
    }, 900);
  }

  if (btnUnbox) {
    btnUnbox.addEventListener('click', unboxCelebration);
  }

  // =========================================================================
  // 5. AUDIO CONTROLLER & EQUALIZER
  // =========================================================================
  function updateAudioUI(playing) {
    if (playing) {
      if (audioIcon) {
        audioIcon.classList.remove('fa-play');
        audioIcon.classList.add('fa-pause');
      }
      if (barbieEqualizer) {
        barbieEqualizer.classList.add('is-playing');
      }
    } else {
      if (audioIcon) {
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
      }
      if (barbieEqualizer) {
        barbieEqualizer.classList.remove('is-playing');
      }
    }
  }

  function playAudioSafely() {
    if (!audio) return;
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          updateAudioUI(true);
        })
        .catch(() => {
          updateAudioUI(false);
        });
    }
  }

  function toggleAudio() {
    if (!audio) return;
    if (audio.paused) {
      playAudioSafely();
    } else {
      audio.pause();
      updateAudioUI(false);
    }
  }

  if (btnAudioToggle) {
    btnAudioToggle.addEventListener('click', toggleAudio);
  }

  if (barbieEqualizer) {
    barbieEqualizer.addEventListener('click', toggleAudio);
  }

  // =========================================================================
  // 6. GLAMOUR DIGITAL FLIP COUNTDOWN
  // =========================================================================
  function updateCountdown() {
    if (!countdownDays || !countdownHours || !countdownMinutes || !countdownSeconds) return;

    const now = new Date();
    const diff = WEDDING_DATE.getTime() - now.getTime();

    if (diff <= 0) {
      countdownDays.textContent = '00';
      countdownHours.textContent = '00';
      countdownMinutes.textContent = '00';
      countdownSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    countdownDays.textContent = String(days).padStart(2, '0');
    countdownHours.textContent = String(hours).padStart(2, '0');
    countdownMinutes.textContent = String(minutes).padStart(2, '0');
    countdownSeconds.textContent = String(seconds).padStart(2, '0');
  }

  // =========================================================================
  // 7. 3D BARBIE PLATINUM CARD & CLABE CLIPBOARD COPY
  // =========================================================================
  if (cardContainer) {
    cardContainer.addEventListener('click', function () {
      cardContainer.classList.toggle('is-flipped');
    });
  }

  function copyClabeToClipboard() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(CLABE_NUMBER).then(() => {
        showToast('CLABE INTERBANCARIA COPIADA AL PORTAPAPELES');
      }).catch(() => {
        fallbackCopy(CLABE_NUMBER);
      });
    } else {
      fallbackCopy(CLABE_NUMBER);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('CLABE COPIADA CON ÉXITO');
    } catch (e) {
      showToast('CLABE: ' + text);
    }
    document.body.removeChild(textArea);
  }

  if (btnCopyClabe) {
    btnCopyClabe.addEventListener('click', function (e) {
      e.stopPropagation();
      copyClabeToClipboard();
    });
  }

  // =========================================================================
  // 8. REAL-TIME VIP PASS LIVE CALLIGRAPHY RSVP
  // =========================================================================
  if (rsvpName && vipGuestName) {
    rsvpName.addEventListener('input', function (e) {
      const val = e.target.value.trim();
      if (val.length > 0) {
        vipGuestName.textContent = val;
      } else {
        vipGuestName.textContent = 'Distinguido Invitado';
      }
    });
  }

  if (rsvpPasses && vipPassCount) {
    rsvpPasses.addEventListener('change', function (e) {
      const count = e.target.value;
      vipPassCount.textContent = count === '1' ? '1 Boleto' : count + ' Boletos';
    });
  }

  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function (e) {
      if (!vipGuestStatus) return;
      if (e.target.value === 'accepted') {
        vipGuestStatus.textContent = '¡Nos llena de emoción verte brillar con nosotros en Los Cabos!';
        vipGuestStatus.className = 'font-outfit text-xs tracking-wider text-barbie-powder font-medium';
      } else {
        vipGuestStatus.textContent = 'Te extrañaremos en la pista, pero brindaremos por ti desde Cabo.';
        vipGuestStatus.className = 'font-outfit text-xs tracking-wider text-white/70 italic';
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const guestName = rsvpName ? rsvpName.value.trim() : 'Invitado VIP';
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'accepted';

      if (typeof confetti === 'function' && attendance === 'accepted') {
        confetti({
          particleCount: 140,
          spread: 100,
          origin: { y: 0.7 },
          colors: ['#FF1493', '#FF69B4', '#FF85C1', '#FFFFFF', '#FF007F']
        });
      }

      showToast(`¡PASE VIP CONFIRMADO PARA ${guestName.toUpperCase()}!`);

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> ACCESO VIP CONFIRMADO';
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
      }
    });
  }

  // =========================================================================
  // 9. LIGHTBOX MODAL FOR GALLERY
  // =========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', function () {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption') || '';

      if (galleryLightbox && lightboxImg && lightboxCaption) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        galleryLightbox.classList.remove('hidden');
        galleryLightbox.classList.add('flex');
      }
    });
  });

  function closeLightbox() {
    if (!galleryLightbox) return;
    galleryLightbox.classList.remove('flex');
    galleryLightbox.classList.add('hidden');
    if (lightboxImg) lightboxImg.src = '';
  }

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closeLightbox);
  }

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', function (e) {
      if (e.target === galleryLightbox) {
        closeLightbox();
      }
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && galleryLightbox && !galleryLightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // =========================================================================
  // 10. CALENDAR EXPORT (.ICS GENERATOR)
  // =========================================================================
  window.downloadBarbieCalendar = function (type) {
    let title, description, location, dtStart, dtEnd;

    if (type === 'ceremony') {
      title = 'Boda Valentina & Rodrigo / Sunset Vows';
      description = 'Consagración nupcial al atardecer frente al mar en Capilla Las Palmas.';
      location = 'Capilla de Cristal Las Palmas, Cabo San Lucas, B.C.S., México';
      dtStart = '20261212T163000';
      dtEnd = '20261212T180000';
    } else {
      title = 'Boda Valentina & Rodrigo / The Pink Disco Gala';
      description = 'Banquete de gala junto a la alberca, cócteles de autor y fiesta hasta el amanecer.';
      location = 'The Pink Beach Club, Playa El Médano, Cabo San Lucas, B.C.S., México';
      dtStart = '20261212T183000';
      dtEnd = '20261213T050000';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//The Pink Palace//Valentina y Rodrigo//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `Boda-Valentina-Rodrigo-${type}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    showToast('EVENTO AÑADIDO AL CALENDARIO');
  };

  // =========================================================================
  // 11. DOCK SCROLLSPY (BOTTOM NAVIGATION)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  function updateDockActiveState() {
    let currentId = '';
    const scrollPosition = window.scrollY + 240;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    // If near the bottom of the page, ensure RSVP is highlighted
    if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 180)) {
      currentId = 'rsvp';
    }

    if (currentId) {
      dockLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateDockActiveState, { passive: true });

  dockLinks.forEach(link => {
    link.addEventListener('click', () => {
      dockLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // =========================================================================
  // 12. INITIALIZATION ROUTINE
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    updateDockActiveState();
  });

})();
