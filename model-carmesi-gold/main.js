document.addEventListener('DOMContentLoaded', () => {
  initGoldDustCanvas();
  initAudioController();
  initCoverOverlay();
  initCountdown();
  initRsvpForm();
  initCopyClabeAndCodes();
  initScrollAnimations();
  initDressCodeInteractions();
  initParallaxDecorations();
  initCardGlowEffect();
  initScrollAmbientLighting();
  initLightbox();
  initCalendarExport();
  initHashtagCopy();
  initTiltCards();
});

/* ==========================================================================
   1. GOLD DUST CANVAS & DIAMOND SPARKLE ENGINE (60 FPS FLUIDITY)
   ========================================================================== */
function initGoldDustCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  const pCanvas = document.createElement('canvas');
  pCanvas.width = 32;
  pCanvas.height = 32;
  const pCtx = pCanvas.getContext('2d');
  const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 245, 200, 0.95)');
  gradient.addColorStop(0.35, 'rgba(212, 175, 55, 0.6)');
  gradient.addColorStop(0.7, 'rgba(139, 41, 66, 0.25)');
  gradient.addColorStop(1, 'rgba(139, 41, 66, 0)');
  pCtx.fillStyle = gradient;
  pCtx.fillRect(0, 0, 32, 32);

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 55);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      s: Math.random() * 1.8 + 0.6,
      vx: 0,
      vy: Math.random() * 0.45 + 0.15,
      life: Math.random() * Math.PI * 2,
      swaySpeed: Math.random() * 0.018 + 0.008,
      swayAmt: Math.random() * 1.8 + 0.6,
      baseX: Math.random() * width
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];

      p.life += p.swaySpeed;
      p.x = p.baseX + Math.sin(p.life) * p.swayAmt * 12;
      p.y -= p.vy;

      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 110) {
        let force = (110 - dist) / 110;
        p.x += (dx / dist) * force * 3;
        p.baseX += (dx / dist) * force * 3;
      }

      if (p.y < -32) {
        p.y = height + 32;
        p.baseX = Math.random() * width;
      }

      ctx.globalAlpha = (Math.sin(p.life) + 1.6) * 0.28;
      ctx.drawImage(pCanvas, p.x - 16 * p.s, p.y - 16 * p.s, 32 * p.s, 32 * p.s);
    }

    requestAnimationFrame(render);
  }
  render();
}

/* ==========================================================================
   2. DYNAMIC ISLAND & AUDIO CONTROLLER (ROCK-SOLID PLAY / PAUSE)
   ========================================================================== */
function initAudioController() {
  const bgMusic = document.getElementById('bg-music');
  const dynamicIsland = document.getElementById('dynamic-island');
  const playBtn = document.getElementById('di-play-btn');
  const menuBtn = document.getElementById('di-menu-btn');
  const diDropdown = document.getElementById('di-dropdown');
  const playIcon = playBtn ? playBtn.querySelector('i') : null;

  function updateAudioState(isPlaying) {
    if (dynamicIsland) {
      if (isPlaying) dynamicIsland.classList.add('is-playing');
      else dynamicIsland.classList.remove('is-playing');
    }
    if (playIcon) {
      if (isPlaying) {
        playIcon.className = 'fa-solid fa-pause';
        playBtn.setAttribute('aria-label', 'Pausar Música');
      } else {
        playIcon.className = 'fa-solid fa-play';
        playBtn.setAttribute('aria-label', 'Reproducir Música');
      }
    }
  }

  function toggleAudio() {
    if (!bgMusic) return;

    if (!bgMusic.paused) {
      bgMusic.pause();
      updateAudioState(false);
    } else {
      bgMusic.volume = 0.5;
      bgMusic.play().then(() => {
        updateAudioState(true);
      }).catch(err => {
        console.warn('Playback error:', err);
        updateAudioState(false);
      });
    }
  }

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAudio();
    });
  }

  if (menuBtn && diDropdown) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      diDropdown.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!diDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        diDropdown.classList.remove('show');
      }
    });

    diDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        diDropdown.classList.remove('show');
      });
    });
  }

  window.startWeddingMusic = function() {
    if (!bgMusic) return;
    bgMusic.volume = 0.05;
    bgMusic.play().then(() => {
      updateAudioState(true);
      let vol = 0.05;
      const fadeInterval = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          bgMusic.volume = Math.min(vol, 0.5);
        } else {
          clearInterval(fadeInterval);
        }
      }, 150);
    }).catch(err => {
      console.warn('Autoplay prevented:', err);
      updateAudioState(false);
    });
  };
}

/* ==========================================================================
   3. COVER OVERLAY — 3D TILT & INNOVATIVE UNVEILING
   ========================================================================== */
function initCoverOverlay() {
  const coverOverlay = document.getElementById('cover-overlay');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const waxSealTrigger = document.getElementById('wax-seal-trigger');
  const waxSealImg = document.getElementById('wax-seal-img');
  const royalCard = document.getElementById('royal-invitation-card');
  const cardGlare = document.getElementById('card-light-glare');

  // Interactive 3D tilt & glare on the card
  if (royalCard) {
    royalCard.addEventListener('mousemove', (e) => {
      const rect = royalCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      royalCard.style.transform = `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      if (cardGlare) {
        cardGlare.style.left = `${x}px`;
        cardGlare.style.top = `${y}px`;
      }
    });

    royalCard.addEventListener('mouseleave', () => {
      royalCard.style.transform = 'perspective(1400px) rotateX(0deg) rotateY(0deg)';
    });
  }

  let isOpening = false;

  function executeGrandUnveiling() {
    if (isOpening) return;
    isOpening = true;

    // 1. Break wax seal & trigger 3D burst
    if (waxSealImg) {
      waxSealImg.classList.add('seal-break');
      createGoldenStardustBurst(waxSealImg);
    }

    // 2. Trigger unveiling animation on card and overlay
    if (coverOverlay) {
      coverOverlay.classList.add('is-opening');
    }

    // 3. Start music
    if (window.startWeddingMusic) {
      window.startWeddingMusic();
    }

    // 4. Immediately reveal hero elements so they are visible right when unboxing
    document.querySelectorAll('#section-hero .reveal-on-scroll, #section-hero .stagger-child').forEach(el => {
      el.classList.add('animate-in', 'is-revealed');
    });

    // 5. Fade out overlay smoothly & unlock scroll
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
      }
      document.body.style.overflowY = 'auto';
      document.body.style.overflowX = 'hidden';
    }, 700);

    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.style.display = 'none';
      }
    }, 1500);
  }

  if (enterBtn) enterBtn.addEventListener('click', executeGrandUnveiling);
  if (waxSealTrigger) waxSealTrigger.addEventListener('click', executeGrandUnveiling);
}

function createGoldenStardustBurst(anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  for (let i = 0; i < 30; i++) {
    const spark = document.createElement('div');
    const angle = (Math.PI * 2 * i) / 30 + (Math.random() - 0.5) * 0.35;
    const dist = 60 + Math.random() * 120;
    const tx = Math.cos(angle) * dist;
    const ty = Math.sin(angle) * dist;
    const size = 3.5 + Math.random() * 5.5;

    Object.assign(spark.style, {
      position: 'fixed',
      left: `${cx}px`,
      top: `${cy}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: Math.random() > 0.3 
        ? 'radial-gradient(circle, #FFFFFF 0%, #FFE575 40%, #D4AF37 100%)' 
        : 'radial-gradient(circle, #FFF 0%, #FF6B8B 40%, #8B2942 100%)',
      pointerEvents: 'none',
      zIndex: '100000',
      boxShadow: '0 0 15px rgba(212, 175, 55, 1)',
      transition: `all ${0.7 + Math.random() * 0.4}s cubic-bezier(0.16, 1, 0.3, 1)`,
      opacity: '1'
    });

    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
      spark.style.opacity = '0';
    });

    setTimeout(() => spark.remove(), 1200);
  }
}

/* ==========================================================================
   4. 3D TILT PHYSICS FOR VIP CARDS
   ========================================================================== */
function initTiltCards() {
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* ==========================================================================
   5. SWISS CHRONO COUNTDOWN TIMER
   ========================================================================== */
function initCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const targetDateStr = countdownEl.getAttribute('data-date') || '2027-11-20T17:00:00';
  const targetDate = new Date(targetDateStr).getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function update() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = d.toString().padStart(2, '0');
    if (hoursEl) hoursEl.textContent = h.toString().padStart(2, '0');
    if (minutesEl) minutesEl.textContent = m.toString().padStart(2, '0');
    if (secondsEl) secondsEl.textContent = s.toString().padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   6. RSVP FORM VIA WHATSAPP
   ========================================================================== */
function initRsvpForm() {
  const rsvpForm = document.getElementById('rsvp-form');
  if (!rsvpForm) return;

  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('rsvp-name-input');
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
    const passesRadio = document.querySelector('input[name="guests-count"]:checked');
    const notesInput = document.getElementById('rsvp-notes');

    const name = nameInput ? nameInput.value.trim() : '';
    const attendance = attendanceRadio ? attendanceRadio.value : 'Confirmado';
    const passes = passesRadio ? passesRadio.value : '1 pase';
    const notes = notesInput ? notesInput.value.trim() : 'Ninguna';

    if (!name) {
      alert('Por favor ingresa tu nombre completo.');
      return;
    }

    const phoneNumber = '525555555555';
    const message = `✨ *CONFIRMACIÓN DE ASISTENCIA — BODA SOFÍA & ALEJANDRO* ✨%0A%0A` +
      `👤 *Invitado(s):* ${encodeURIComponent(name)}%0A` +
      `💌 *Asistencia:* ${encodeURIComponent(attendance)}%0A` +
      `🎟️ *Pases reservados:* ${encodeURIComponent(passes)}%0A` +
      `📝 *Notas / Dieta / Canción:* ${encodeURIComponent(notes || 'Sin observaciones')}%0A%0A` +
      `¡Nos vemos en el gran día! 🥂`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  });
}

/* ==========================================================================
   7. CLIPBOARD COPIER (HOTELS & CLABE)
   ========================================================================== */
function initCopyClabeAndCodes() {
  const codeBtns = document.querySelectorAll('.btn-copy-code');
  codeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.getAttribute('data-code');
      if (code) {
        navigator.clipboard.writeText(code).then(() => {
          showLuxuryToast(`Código copiado: ${code}`);
        });
      }
    });
  });

  const clabeBtn = document.querySelector('.btn-copy-clabe');
  if (clabeBtn) {
    clabeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const clabe = clabeBtn.getAttribute('data-clabe');
      if (clabe) {
        navigator.clipboard.writeText(clabe).then(() => {
          showLuxuryToast(`CLABE copiada: ${clabe}`);
        });
      }
    });
  }
}

function showLuxuryToast(msg) {
  let toast = document.getElementById('luxury-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'luxury-toast';
    toast.className = 'luxury-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-check gold-icon"></i> ${msg}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/* ==========================================================================
   8. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .stagger-child');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in', 'is-revealed');
      }
    });
  }, { threshold: 0.08 });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   9. DRESS CODE INTERACTIVE PALETTE
   ========================================================================== */
function initDressCodeInteractions() {
  const swatches = document.querySelectorAll('.swatch-wrap');
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const colorName = swatch.getAttribute('data-color-name');
      if (colorName) {
        showLuxuryToast(`Tono seleccionado: ${colorName}`);
      }
    });
  });
}

/* ==========================================================================
   10. PARALLAX DECORATIONS (SUBTLE GYRO & SCROLL)
   ========================================================================== */
function initParallaxDecorations() {
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    const crests = document.querySelectorAll('.hero-crest-img');
    crests.forEach(crest => {
      crest.style.transform = `translateY(${scrollY * 0.12}px)`;
    });
  }, { passive: true });
}

/* ==========================================================================
   11. CARD GLOW INTERACTIVE EFFECT
   ========================================================================== */
function initCardGlowEffect() {
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   12. SCROLL AMBIENT LIGHTING
   ========================================================================== */
function initScrollAmbientLighting() {
  const sections = document.querySelectorAll('section');
  const themes = [
    { top: 'rgba(139, 41, 66, 0.35)', left: 'rgba(212, 175, 55, 0.12)', right: 'rgba(46, 12, 22, 0.5)' },
    { top: 'rgba(212, 175, 55, 0.25)', left: 'rgba(139, 41, 66, 0.3)', right: 'rgba(20, 6, 12, 0.6)' },
    { top: 'rgba(110, 25, 45, 0.4)', left: 'rgba(212, 175, 55, 0.15)', right: 'rgba(139, 41, 66, 0.35)' }
  ];

  let activeIndex = 0;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(sections).indexOf(entry.target);
        if (idx !== -1 && idx !== activeIndex) {
          activeIndex = idx;
          const theme = themes[idx % themes.length];
          document.body.style.setProperty('--bg-glow-top', theme.top);
          document.body.style.setProperty('--bg-glow-bottom-left', theme.left);
          document.body.style.setProperty('--bg-glow-bottom-right', theme.right);
        }
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => observer.observe(sec));
}

/* ==========================================================================
   13. LIGHTBOX PREVIEW
   ========================================================================== */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!modal || !modalImg) return;

  const triggerItems = document.querySelectorAll('[data-lightbox]');
  triggerItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-lightbox');
      const capText = item.getAttribute('data-caption') || '';
      modalImg.src = src;
      if (caption) caption.textContent = capText;
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   14. CALENDAR EXPORT (ICS)
   ========================================================================== */
function initCalendarExport() {
  const calBtn = document.getElementById('add-to-calendar-btn');
  if (!calBtn) return;

  calBtn.addEventListener('click', () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nuestra Boda//Sofia y Alejandro//ES',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:Boda Sofía & Alejandro (Ceremonia y Recepción de Gala)',
      'DESCRIPTION:Acompáñanos a celebrar nuestra unión matrimonial en Ciudad de México.',
      'LOCATION:Parroquia de San Juan Bautista / Hacienda San José de las Palmas, CDMX',
      'DTSTART:20271120T230000Z',
      'DTEND:20271121T100000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Boda-Sofia-y-Alejandro.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showLuxuryToast('Evento añadido a tu calendario');
  });
}

/* ==========================================================================
   15. HASHTAG COPIER
   ========================================================================== */
function initHashtagCopy() {
  const hashtagTrigger = document.getElementById('hashtag-trigger');
  if (!hashtagTrigger) return;

  hashtagTrigger.addEventListener('click', () => {
    const textEl = hashtagTrigger.querySelector('.hashtag-text');
    const hashtag = textEl ? textEl.textContent.trim() : '#BodaSofiaYAlejandro';
    navigator.clipboard.writeText(hashtag).then(() => {
      showLuxuryToast(`Hashtag copiado: ${hashtag}`);
    });
  });
}
