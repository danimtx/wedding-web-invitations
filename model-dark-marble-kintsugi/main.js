/* ==========================================================================
   BODA VALERIA & FERNANDO · main.js
   Haute-Couture Wedding Experience · Dark Marble & Kintsugi Gold
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPersonalization();
  initCoverOverlay();
  initDynamicIsland();
  initCountdown();
  initRsvpForm();
  initCopyTriggers();
  initQrModal();
  initCalendarActions();
  initScrollAnimations();
  initLightbox();
  initGlobalGoldDust();
  initCoverParticles();
  init3DTiltCards();
});

/* ==========================================================================
   0. MOTOR DE PERSONALIZACIÓN DINÁMICA (URL PARAMS)
   ========================================================================== */
function initPersonalization() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('invitado') || params.get('invitada') || params.get('familia');
  const maxPasses = parseInt(params.get('pases'), 10) || 4;

  if (guestName) {
    const cleanName = decodeURIComponent(guestName.replace(/\+/g, ' '));
    const greetingEl = document.getElementById('guest-greeting');
    if (greetingEl) {
      greetingEl.textContent = `Querido/a ${cleanName}`;
    }

    const nameInput = document.getElementById('rsvp-name-input');
    if (nameInput) {
      nameInput.value = cleanName;
    }
  }

  // Filtrar pases visibles según parámetro
  const passOptions = document.querySelectorAll('.pass-option');
  if (passOptions.length > 0) {
    passOptions.forEach((option, index) => {
      if (index >= maxPasses) {
        option.style.display = 'none';
      }
    });
  }
}

/* ==========================================================================
   1. APERTURA CINEMÁTICA DEL SOBRE 3D & AUDIO FADE-IN
   ========================================================================== */
let audioController = {
  audio: null,
  isPlaying: false,
  fadeInterval: null
};

function initCoverOverlay() {
  const coverOverlay = document.getElementById('cover-overlay');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const bgMusic = document.getElementById('bg-music');

  audioController.audio = bgMusic;

  if (!coverOverlay) return;

  function openInvitation() {
    // 1. Activar animación de solapa 3D
    coverOverlay.classList.add('opening');

    // 2. Iniciar audio con fade in suave
    playAudioWithFade();

    // 3. Transición de desvanecimiento del sobre
    setTimeout(() => {
      coverOverlay.classList.add('fade-out');
    }, 600);

    setTimeout(() => {
      coverOverlay.style.display = 'none'; if (window.stopCoverParticles) window.stopCoverParticles();
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    }, 1400);
  }

  if (enterBtn) enterBtn.addEventListener('click', openInvitation);
  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', openInvitation);
    waxSealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvitation();
      }
    });
  }
}

function playAudioWithFade() {
  const audio = audioController.audio;
  if (!audio) return;

  audio.volume = 0;
  const playPromise = audio.play();

  if (playPromise !== undefined) {
    playPromise.then(() => {
      audioController.isPlaying = true;
      updateDynamicIslandState(true);

      // Fade In progresivo y cálido
      let vol = 0;
      clearInterval(audioController.fadeInterval);
      audioController.fadeInterval = setInterval(() => {
        if (vol < 0.85) {
          vol += 0.05;
          audio.volume = Math.min(vol, 0.85);
        } else {
          clearInterval(audioController.fadeInterval);
        }
      }, 100);
    }).catch(err => {
      console.log('Autoplay bloqueado por políticas del navegador:', err);
      updateDynamicIslandState(false);
    });
  }
}

function toggleAudio() {
  const audio = audioController.audio;
  if (!audio) return;

  if (audioController.isPlaying) {
    audio.pause();
    audioController.isPlaying = false;
    updateDynamicIslandState(false);
  } else {
    audio.play().then(() => {
      audio.volume = 0.85;
      audioController.isPlaying = true;
      updateDynamicIslandState(true);
    }).catch(console.error);
  }
}

function updateDynamicIslandState(playing) {
  const island = document.getElementById('dynamic-island');
  const toggleBtn = document.getElementById('island-audio-toggle');
  if (!island) return;

  if (playing) {
    island.classList.add('playing');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  } else {
    island.classList.remove('playing');
    if (toggleBtn) toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

/* ==========================================================================
   2. DYNAMIC ISLAND · VINILO DE ORO & AUDIO FLOTANTE (APPLE STYLE)
   ========================================================================== */
function initDynamicIsland() {
  const island = document.getElementById('dynamic-island');
  const audioToggle = document.getElementById('island-audio-toggle');
  const expandBtn = document.getElementById('island-expand-btn');
  const closeDrawer = document.getElementById('island-close-drawer');
  const navLinks = document.querySelectorAll('.island-link');

  if (!island) return;

  if (audioToggle) {
    audioToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  function toggleDrawer(e) {
    if (e) e.stopPropagation();
    island.classList.toggle('expanded');
  }

  if (expandBtn) expandBtn.addEventListener('click', toggleDrawer);

  if (closeDrawer) {
    closeDrawer.addEventListener('click', (e) => {
      e.stopPropagation();
      island.classList.remove('expanded');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      island.classList.remove('expanded');
    });
  });

  document.addEventListener('click', (e) => {
    if (!island.contains(e.target)) {
      island.classList.remove('expanded');
    }
  });
}

/* ==========================================================================
   3. CUENTA REGRESIVA DE ALTA PRECISIÓN
   ========================================================================== */
function initCountdown() {
  const countdownEl = document.getElementById('countdown-container');
  const celebrationBanner = document.getElementById('celebration-banner');
  if (!countdownEl) return;

  const weddingDateStr = countdownEl.dataset.date || '2027-11-06T18:00:00';
  const targetDate = new Date(weddingDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const oneDay = 1000 * 60 * 60 * 24;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0 && distance > -oneDay) {
      countdownEl.style.display = 'none';
      if (celebrationBanner) {
        celebrationBanner.classList.remove('hidden');
        celebrationBanner.innerHTML = '<div class="celebration-icon"><i class="fa-solid fa-champagne-glasses"></i></div><h3>¡HOY ES NUESTRO GRAN DÍA!</h3><p>Nos vemos en el altar para celebrar nuestro amor.</p>';
      }
      return;
    } else if (distance <= -oneDay) {
      countdownEl.style.display = 'none';
      if (celebrationBanner) {
        celebrationBanner.classList.remove('hidden');
        celebrationBanner.innerHTML = '<div class="celebration-icon"><i class="fa-solid fa-heart"></i></div><h3>¡Nuestra historia continúa!</h3><p>06 · 11 · 2027</p>';
      }
      return;
    }

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const days = Math.floor(distance / oneDay);
    const hours = Math.floor((distance % oneDay) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================================
   4. FORMULARIO RSVP INTELIGENTE VÍA WHATSAPP
   ========================================================================== */
function initRsvpForm() {
  const rsvpForm = document.getElementById('rsvp-form');
  if (!rsvpForm) return;

  const whatsappPhone = '59170000000'; // Número oficial de los novios / organizadores

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name-input')?.value.trim() || 'Invitado/a';
    const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'Sí, asistiré con mucho gusto';
    const guestsCount = document.querySelector('input[name="guests-count"]:checked')?.value || '1';
    const notes = document.getElementById('rsvp-notes')?.value.trim() || 'Ninguna';

    const message = `✨ *CONFIRMACIÓN DE ASISTENCIA* ✨%0A` +
      `💍 *Boda Valeria & Fernando*%0A` +
      `📅 *Fecha:* 06 de Noviembre de 2027%0A` +
      `📍 *Ciudad:* La Paz, Bolivia%0A%0A` +
      `👤 *Titular:* ${encodeURIComponent(name)}%0A` +
      `🎟️ *Estado:* ${encodeURIComponent(attendance)}%0A` +
      `👥 *Pases Confirmados:* ${encodeURIComponent(guestsCount)}%0A` +
      `🎶 *Canción / Dedicatoria:* ${encodeURIComponent(notes)}%0A%0A` +
      `¡Muchas gracias por invitarnos a celebrar con ustedes! 🥂✨`;

    window.open(`https://api.whatsapp.com/send?phone=${whatsappPhone}&text=${message}`, '_blank');
  });
}

/* ==========================================================================
   5. COPIADO DE DATOS BANCARIOS Y CÓDIGOS DE HOTEL
   ========================================================================== */
function initCopyTriggers() {
  // Cuentas bancarias
  document.querySelectorAll('.btn-copy-account, .btn-modal-copy').forEach(btn => {
    btn.addEventListener('click', () => {
      const account = btn.dataset.account || '100000012345';
      copyToClipboard(account, '¡Número de cuenta copiado al portapapeles! 💳');
    });
  });

  // Códigos de convenios de hoteles
  document.querySelectorAll('.copy-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const text = trigger.dataset.copy || 'BODA-VF';
      copyToClipboard(text, '¡Código de descuento copiado! 🏨');
    });
  });
}

function copyToClipboard(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage);
  }).catch(() => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(successMessage);
  });
}

function showToast(message) {
  let toast = document.querySelector('.toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ==========================================================================
   6. MODAL DE CÓDIGO QR BANCARIO
   ========================================================================== */
function initQrModal() {
  const openBtn = document.getElementById('open-qr-modal-btn');
  const modal = document.getElementById('qr-modal');
  const closeBtn = document.getElementById('close-qr-modal');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. AGREGAR A CALENDARIOS (GOOGLE CALENDAR)
   ========================================================================== */
function initCalendarActions() {
  document.querySelectorAll('.btn-calendar-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const title = btn.dataset.title || 'Boda Valeria & Fernando';
      const start = btn.dataset.start || '20271106T180000';
      const end = btn.dataset.end || '20271107T040000';
      const loc = btn.dataset.location || 'La Paz, Bolivia';
      const desc = btn.dataset.description || 'Acompáñanos a celebrar nuestro gran día de boda.';

      const googleUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${start}/${end}&location=${encodeURIComponent(loc)}&details=${encodeURIComponent(desc)}`;

      window.open(googleUrl, '_blank');
    });
  });
}

/* ==========================================================================
   8. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('animate-in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. GALERÍA CON VISOR LIGHTBOX DE LUJO (SWIPE & TOUCH)
   ========================================================================== */
function initLightbox() {
  const galleryItems = document.querySelectorAll('.gallery-item-interactive');
  if (galleryItems.length === 0) return;

  const lightboxOverlay = document.createElement('div');
  lightboxOverlay.className = 'lightbox-overlay';
  lightboxOverlay.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Cerrar">&times;</button>
      <button class="lightbox-prev" aria-label="Anterior">&#10094;</button>
      <button class="lightbox-next" aria-label="Siguiente">&#10095;</button>
      <img class="lightbox-img" src="" alt="Fotografía ampliada">
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightboxOverlay);

  const imgEl = lightboxOverlay.querySelector('.lightbox-img');
  const captionEl = lightboxOverlay.querySelector('.lightbox-caption');
  const closeBtn = lightboxOverlay.querySelector('.lightbox-close');
  const prevBtn = lightboxOverlay.querySelector('.lightbox-prev');
  const nextBtn = lightboxOverlay.querySelector('.lightbox-next');

  let currentIndex = 0;
  const items = Array.from(galleryItems).map(fig => {
    const img = fig.querySelector('img');
    return {
      src: img ? (img.src || img.getAttribute('src')) : '',
      alt: img ? img.alt : 'Recuerdo de Boda'
    };
  });

  function render(index) {
    currentIndex = index;
    const item = items[currentIndex];
    imgEl.src = item.src;
    captionEl.textContent = item.alt;
  }

  function open(index) {
    render(index);
    lightboxOverlay.classList.add('active');
  }

  function close() {
    lightboxOverlay.classList.remove('active');
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    render(currentIndex);
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    render(currentIndex);
  }

  galleryItems.forEach((fig, idx) => {
    fig.addEventListener('click', () => open(idx));
  });

  closeBtn.addEventListener('click', close);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightboxOverlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });

  // Gestos táctiles Swipe
  let startX = 0;
  lightboxOverlay.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightboxOverlay.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].screenX;
    if (diff > 45) next();
    if (diff < -45) prev();
  }, { passive: true });
}

/* ==========================================================================
   10. POLVO DE ORO GLOBAL ASCENDENTE DE ALTO RENDIMIENTO (60-120 FPS FLUIDOS)
   ========================================================================== */
function initGlobalGoldDust() {
  const canvas = document.getElementById('global-gold-dust');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let particles = [];
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
  let rafId = null;

  // Pre-renderizado de sprites de partículas para 0 Garbage Collection en render loop
  const spriteCanvas = document.createElement('canvas');
  const spriteCtx = spriteCanvas.getContext('2d');
  spriteCanvas.width = 64;
  spriteCanvas.height = 32;

  // Sprite 1: Chispa Dorada Brillante
  const g1 = spriteCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g1.addColorStop(0, 'rgba(255, 255, 255, 1)');
  g1.addColorStop(0.3, 'rgba(255, 245, 194, 0.9)');
  g1.addColorStop(0.7, 'rgba(246, 226, 122, 0.45)');
  g1.addColorStop(1, 'rgba(212, 163, 115, 0)');
  spriteCtx.fillStyle = g1;
  spriteCtx.beginPath();
  spriteCtx.arc(16, 16, 16, 0, Math.PI * 2);
  spriteCtx.fill();

  // Sprite 2: Mota Áurea Suave
  const g2 = spriteCtx.createRadialGradient(48, 16, 0, 48, 16, 16);
  g2.addColorStop(0, 'rgba(255, 245, 194, 0.95)');
  g2.addColorStop(0.5, 'rgba(246, 226, 122, 0.6)');
  g2.addColorStop(0.85, 'rgba(212, 163, 115, 0.25)');
  g2.addColorStop(1, 'rgba(212, 163, 115, 0)');
  spriteCtx.fillStyle = g2;
  spriteCtx.beginPath();
  spriteCtx.arc(48, 16, 16, 0, Math.PI * 2);
  spriteCtx.fill();

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn() {
    // 55 partículas perfectamente balanceadas (cero lag y alta densidad visual)
    const count = Math.min(60, Math.max(35, Math.floor(window.innerWidth / 24)));
    particles = Array.from({ length: count }, () => {
      const isSparkle = Math.random() > 0.65;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: isSparkle ? (Math.random() * 12 + 10) : (Math.random() * 8 + 5),
        spriteX: isSparkle ? 0 : 32,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(Math.random() * 0.45 + 0.18),
        baseAlpha: Math.random() * 0.5 + 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.015
      };
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.0018;

    // Suavizado de mouse
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.vy;
      p.x += Math.sin(time + p.twinklePhase) * 0.28 + p.vx;

      if (p.y < -20) {
        p.y = canvas.height + 20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -20) p.x = canvas.width + 20;
      if (p.x > canvas.width + 20) p.x = -20;

      // Interacción elástica con cursor
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < 10000 && distSq > 0) { // dist < 100px
        const dist = Math.sqrt(distSq);
        p.x -= (dx / dist) * 1.5;
        p.y -= (dy / dist) * 1.5;
      }

      const alpha = p.baseAlpha * (0.65 + 0.35 * Math.sin(time * 2 + p.twinklePhase));
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.drawImage(spriteCanvas, p.spriteX, 0, 32, 32, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(animate);
  }

  resize();
  spawn();
  animate();

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      resize();
      spawn();
    }, 150);
  }, { passive: true });

  window.addEventListener('mousemove', e => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
    }
  }, { passive: true });
}

/* ==========================================================================
   11. PARTÍCULAS EN PANTALLA DE APERTURA CEREMONIAL
   ========================================================================== */
function initCoverParticles() {
  const canvas = document.getElementById('cover-particles');
  if (!canvas) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn() {
    particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      vy: -(Math.random() * 0.35 + 0.1),
      alpha: Math.random() * 0.45 + 0.2
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y += p.vy;
      if (p.y < -5) {
        p.y = canvas.height + 5;
        p.x = Math.random() * canvas.width;
      }
      ctx.fillStyle = `rgba(246, 226, 122, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    rafId = requestAnimationFrame(draw);
  }

  resize();
  spawn();
  draw();
  window.addEventListener('resize', resize, { passive: true });

  window.stopCoverParticles = () => {
    if (rafId) cancelAnimationFrame(rafId);
  };
}

/* ==========================================================================
   12. FÍSICA DE GIRO 3D (TILT) EN TARJETAS VIP DE TITANIO
   ========================================================================== */
function init3DTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (cards.length === 0) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}
