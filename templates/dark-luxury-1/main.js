document.addEventListener('DOMContentLoaded', () => {
  initCoverOverlay();
  initAmbientCanvas();
  initDynamicIsland();
  initTiltCards();
  initScrollAnimations();
  initCountdown();
  initCopyAccount();
  initRsvpForm();
  initPointerFeedback();
});

/* ══════════════════════════════════════════════
   1. Ceremonial 3D Gatefold Presentation Opening
   ══════════════════════════════════════════════ */
function initCoverOverlay() {
  const coverOverlay = document.getElementById('cover-overlay');
  const enterBtn = document.getElementById('enter-btn');
  const seal = document.getElementById('ceremony-seal');
  
  if (!coverOverlay || !enterBtn) return;

  let isOpened = false;

  const openCeremony = () => {
    if (isOpened) return;
    isOpened = true;

    // Trigger 3D CSS Gatefold Opening Animation
    coverOverlay.classList.add('is-opening');
    
    // Start Audio Fade-In early so it syncs with the doors opening
    setTimeout(playWeddingMusicWithFadeIn, 400);

    // After animation completes, smoothly hide overlay and enable scroll
    setTimeout(() => {
      coverOverlay.style.opacity = '0';
      coverOverlay.style.visibility = 'hidden';
      coverOverlay.style.pointerEvents = 'none';
      document.body.classList.remove('no-scroll');

      // Fully remove from render tree after fade to free 100% GPU
      setTimeout(() => {
        coverOverlay.style.display = 'none';
      }, 600);
    }, 1600);
  };

  enterBtn.addEventListener('click', openCeremony);
  if (seal) seal.addEventListener('click', openCeremony);

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (!isOpened && (e.key === 'Enter' || e.key === ' ')) {
      openCeremony();
    }
  });
}

/* ══════════════════════════════════════════════
   2. Apple HIG Dynamic Island & Audio System
   ══════════════════════════════════════════════ */
let weddingAudio = null;
let isMusicPlaying = false;

function initDynamicIsland() {
  weddingAudio = document.getElementById('wedding-audio');
  const islandBtn = document.getElementById('di-play-btn');
  const menuBtn = document.getElementById('di-menu-btn');
  const container = document.querySelector('.dynamic-island-container');
  const eq = document.querySelector('.di-equalizer');
  const dropdownLinks = document.querySelectorAll('.di-dropdown a');
  
  if (!islandBtn || !menuBtn) return;

  // Audio Toggle
  islandBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isMusicPlaying) {
      weddingAudio.pause();
      isMusicPlaying = false;
      islandBtn.classList.remove('playing');
      if (eq) eq.classList.remove('active');
    } else {
      weddingAudio.play().then(() => {
        isMusicPlaying = true;
        islandBtn.classList.add('playing');
        if (eq) eq.classList.add('active');
      }).catch(() => {});
    }
  });

  // Menu Dropdown Toggle
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    container.classList.toggle('menu-open');
  });

  // Smooth scroll & close dropdown when clicking an anchor
  dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
      container.classList.remove('menu-open');
    });
  });

  // Close menu on click outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      container.classList.remove('menu-open');
    }
  });
}

function playWeddingMusicWithFadeIn() {
  if (!weddingAudio) return;
  const islandBtn = document.getElementById('di-play-btn');
  const eq = document.querySelector('.di-equalizer');
  
  weddingAudio.volume = 0;
  weddingAudio.play().then(() => {
    isMusicPlaying = true;
    if (islandBtn) islandBtn.classList.add('playing');
    if (eq) eq.classList.add('active');

    let vol = 0;
    const fadeInterval = setInterval(() => {
      if (vol < 0.65) { // Elegant 65% ceiling
        vol += 0.05;
        weddingAudio.volume = Math.min(vol, 0.65);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  }).catch(() => {
    // Autoplay prevented by browser, waiting for user click
  });
}

/* ══════════════════════════════════════════════
   3. Extreme Performance Ambient Canvas Particles
   ══════════════════════════════════════════════ */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  
  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  // Cursor tracking for repulsion
  let mouse = { x: -1000, y: -1000 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
  }, { passive: true });
  window.addEventListener('mouseout', () => { mouse.x = -1000; mouse.y = -1000; });

  // Memory Pre-allocation: Pre-render golden luminous particle sprite
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = 44; spriteCanvas.height = 44;
  const sCtx = spriteCanvas.getContext('2d');
  const grad = sCtx.createRadialGradient(22, 22, 0, 22, 22, 22);
  grad.addColorStop(0, 'rgba(212, 175, 55, 0.85)'); // Gold core
  grad.addColorStop(0.35, 'rgba(247, 232, 181, 0.35)'); // Silk halo
  grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  sCtx.fillStyle = grad;
  sCtx.fillRect(0, 0, 44, 44);

  // Particle System
  const particleCount = window.innerWidth < 768 ? 26 : 48;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 7 + 4,
      speedY: Math.random() * 0.45 + 0.2,
      baseX: Math.random() * w,
      angle: Math.random() * Math.PI * 2,
      angleSpeed: Math.random() * 0.018 + 0.008,
      opacity: Math.random() * 0.55 + 0.25,
      vx: 0, vy: 0
    });
  }

  function render() {
    ctx.clearRect(0, 0, w, h);
    
    for (let i = 0; i < particleCount; i++) {
      let p = particles[i];

      // Sinusoidal upward movement
      p.angle += p.angleSpeed;
      p.baseX += p.vx;
      p.y -= p.speedY + p.vy;
      p.x = p.baseX + Math.sin(p.angle) * 16;

      // Elastic friction
      p.vx *= 0.92;
      p.vy *= 0.92;

      // Cursor Repulsion Physics
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 130) {
        let force = (130 - dist) / 130;
        p.vx += (dx / dist) * force * 1.8;
        p.vy += (dy / dist) * force * 1.8;
      }

      // Seamless screen wrapping
      if (p.y < -30) {
        p.y = h + 30;
        p.baseX = Math.random() * w;
        p.vx = 0; p.vy = 0;
      }
      if (p.x < -30) p.baseX = w + 30;
      if (p.x > w + 30) p.baseX = -30;

      // Draw cached sprite texture
      ctx.globalAlpha = p.opacity;
      ctx.drawImage(spriteCanvas, p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
    }
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* ══════════════════════════════════════════════
   4. 3D Tilt Cards (Vanilla JS Performance)
   ══════════════════════════════════════════════ */
function initTiltCards() {
  const cards = document.querySelectorAll('.tilt-card');
  if (window.matchMedia('(pointer: coarse)').matches) return; // Disable on touch for pure 60fps

  cards.forEach(card => {
    let ticking = false;
    
    card.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = ((y - centerY) / centerY) * -7;
          const rotateY = ((x - centerX) / centerX) * 7;
          
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
          ticking = false;
        });
        ticking = true;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)';
    });
    
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });
}

/* ══════════════════════════════════════════════
   5. Scroll Reveals
   ══════════════════════════════════════════════ */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════
   6. Countdown Timer
   ══════════════════════════════════════════════ */
function initCountdown() {
  const targetDate = new Date('2027-11-15T17:00:00').getTime();
  const container = document.querySelector('.countdown-container');
  if (!container) return;

  function update() {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) return;

    const d = Math.floor(distance / 86400000);
    const h = Math.floor((distance % 86400000) / 3600000);
    const m = Math.floor((distance % 3600000) / 60000);
    const s = Math.floor((distance % 60000) / 1000);

    const elD = document.getElementById('cd-days');
    const elH = document.getElementById('cd-hours');
    const elM = document.getElementById('cd-minutes');
    const elS = document.getElementById('cd-seconds');

    if (elD) elD.textContent = String(d).padStart(2, '0');
    if (elH) elH.textContent = String(h).padStart(2, '0');
    if (elM) elM.textContent = String(m).padStart(2, '0');
    if (elS) elS.textContent = String(s).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ══════════════════════════════════════════════
   7. Copy Account Number with Feedback Toast
   ══════════════════════════════════════════════ */
function initCopyAccount() {
  const copyBtn = document.getElementById('copy-account-btn');
  const toast = document.getElementById('copy-toast');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const account = copyBtn.getAttribute('data-account') || '100000012345';
    navigator.clipboard.writeText(account).then(() => {
      if (toast) {
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2600);
      }
    }).catch(() => {
      prompt('Copia el número de cuenta:', account);
    });
  });
}

/* ══════════════════════════════════════════════
   8. RSVP WhatsApp Integration
   ══════════════════════════════════════════════ */
function initRsvpForm() {
  const form = document.getElementById('rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const pases = document.getElementById('rsvp-pases').value;
    const comments = document.getElementById('rsvp-comments').value.trim();

    const isAttending = status === 'si' ? '¡Sí, confirmo con alegría mi asistencia!' : 'Lamentablemente no podré asistir.';
    let message = `Hola Isabella & Mateo, soy *${name}*.\n\n${isAttending}\n👥 Pases: ${pases}`;
    if (comments) {
      message += `\n💬 Mensaje: ${comments}`;
    }

    const whatsappNumber = '59170000000'; // Target phone number
    const encodedUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
    window.open(encodedUrl, '_blank');
  });
}

/* ══════════════════════════════════════════════
   9. Instant Tactile Feedback
   ══════════════════════════════════════════════ */
function initPointerFeedback() {
  const interactiveEls = document.querySelectorAll('.btn-gold, .btn-outline, .btn-royal-open, .color-circle, .di-play-btn, .di-right');
  interactiveEls.forEach(el => {
    el.addEventListener('pointerdown', () => el.style.transform = 'scale(0.95)');
    const reset = () => el.style.transform = '';
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => el.addEventListener(ev, reset));
  });
}
