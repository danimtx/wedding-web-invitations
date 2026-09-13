/**
 * ============================================================================
 * MODEL IMPERIAL NOIR · LÓGICA MAESTRA & EXPERIENCIA 3D DE ULTRA-LUJO
 * Three.js 3D WebGL · Dynamic Island · Countdown Inteligente · RSVP WhatsApp
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Configuración Maestra del Evento
  const CONFIG = {
    weddingDate: new Date('2027-11-06T16:30:00-04:00'), // Hora oficial Bolivia
    whatsappNumber: '59170000000', // Modificar con el número de los novios
    coupleNames: 'Valeria & Fernando',
    city: 'La Paz, Bolivia',
    audioVolume: 0.75
  };

  // --------------------------------------------------------------------------
  // 1. GESTIÓN DE AUDIO & DYNAMIC ISLAND FLOTANTE (APPLE STYLE)
  // --------------------------------------------------------------------------
  const bgMusic = document.getElementById('bg-music');
  const islandPill = document.getElementById('island-pill-trigger');
  const islandPlayBtn = document.getElementById('island-play-pause');
  const islandIcon = document.getElementById('island-icon-state');
  const islandVinyl = document.getElementById('island-vinyl');
  const islandWave = document.getElementById('island-wave');

  let isAudioPlaying = false;

  function setAudioState(play) {
    if (!bgMusic) return;

    if (play) {
      bgMusic.volume = 0;
      const playPromise = bgMusic.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            isAudioPlaying = true;
            fadeAudioIn(bgMusic, CONFIG.audioVolume, 2000);
            updateIslandUI(true);
          })
          .catch((err) => {
            console.warn('Autoplay bloqueado por el navegador:', err);
            isAudioPlaying = false;
            updateIslandUI(false);
          });
      }
    } else {
      bgMusic.pause();
      isAudioPlaying = false;
      updateIslandUI(false);
    }
  }

  function toggleAudio() {
    setAudioState(!isAudioPlaying);
  }

  function updateIslandUI(playing) {
    if (islandIcon) {
      islandIcon.className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
    }
    if (islandVinyl) {
      islandVinyl.classList.toggle('spinning', playing);
    }
    if (islandWave) {
      islandWave.classList.toggle('active', playing);
    }
  }

  function fadeAudioIn(audioEl, targetVol, durationMs) {
    const stepTime = 50;
    const steps = durationMs / stepTime;
    const volIncrement = targetVol / steps;
    let currentVol = 0;

    const fadeInterval = setInterval(() => {
      currentVol = Math.min(targetVol, currentVol + volIncrement);
      audioEl.volume = currentVol;
      if (currentVol >= targetVol) {
        clearInterval(fadeInterval);
      }
    }, stepTime);
  }

  if (islandPill) {
    islandPill.addEventListener('click', toggleAudio);
  }

  // --------------------------------------------------------------------------
  // 2. THREE.JS 3D WEBGL EXPERIENCE · PANTALLA DE ENTRADA & CONSTELACIÓN
  // --------------------------------------------------------------------------
  const coverCanvas = document.getElementById('cover-webgl-canvas');
  let scene, camera, renderer, particles, particleGeo, particleMat;
  let animFrameId = null;
  let isCoverActive = true;

  function initThreeJS() {
    if (!coverCanvas || typeof THREE === 'undefined') return;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 80;

      renderer = new THREE.WebGLRenderer({
        canvas: coverCanvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });

      const isMobile = window.innerWidth <= 768;
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Creación de Constelación de Oro 3D
      const particleCount = isMobile ? 250 : 500;
      particleGeo = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const scales = new Float32Array(particleCount);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 160;
        positions[i + 1] = (Math.random() - 0.5) * 160;
        positions[i + 2] = (Math.random() - 0.5) * 120;
        scales[i / 3] = Math.random() * 2.2 + 0.6;
      }

      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeo.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

      // Shaders y Textura Circular de Brillo
      const canvasSprite = document.createElement('canvas');
      canvasSprite.width = 32;
      canvasSprite.height = 32;
      const ctxSprite = canvasSprite.getContext('2d');
      const grad = ctxSprite.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 248, 214, 1)');
      grad.addColorStop(0.3, 'rgba(243, 220, 124, 0.85)');
      grad.addColorStop(0.7, 'rgba(212, 175, 55, 0.25)');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctxSprite.fillStyle = grad;
      ctxSprite.fillRect(0, 0, 32, 32);

      const particleTexture = new THREE.CanvasTexture(canvasSprite);

      particleMat = new THREE.PointsMaterial({
        size: 3.2,
        map: particleTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: new THREE.Color(0xd4af37)
      });

      particles = new THREE.Points(particleGeo, particleMat);
      scene.add(particles);

      // Luces Ambientales de Oro
      const ambientLight = new THREE.AmbientLight(0xfff5c2, 0.8);
      scene.add(ambientLight);

      // Eventos de Parallax y Redimensión
      window.addEventListener('resize', onWindowResize, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      animateThreeJS();
    } catch (e) {
      console.warn('WebGL no disponible, utilizando respaldo estándar:', e);
    }
  }

  let mouseX = 0, mouseY = 0;
  function onPointerMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animateThreeJS() {
    if (!isCoverActive) return;

    animFrameId = requestAnimationFrame(animateThreeJS);

    if (particles) {
      particles.rotation.y += 0.0012;
      particles.rotation.x += 0.0006;

      // Parallax sutil con el cursor
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 8 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }

  // --------------------------------------------------------------------------
  // 3. SECUENCIA CINEMÁTICA DE APERTURA (SIGNATURE UNBOXING SEQUENCE)
  // --------------------------------------------------------------------------
  const coverOverlay = document.getElementById('cover-overlay');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const envelopeFlap = document.getElementById('envelope-flap');

  let hasOpened = false;

  function executeOpenCeremony() {
    if (hasOpened) return;
    hasOpened = true;

    // 1. Activar música de fondo
    setAudioState(true);

    // 2. Desdoble de la solapa 3D
    if (envelopeFlap) {
      envelopeFlap.classList.add('flap-open');
    }

    // 3. Estallido de chispas doradas en Three.js
    if (particles) {
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] *= 1.4;
        positions[i + 1] *= 1.4;
        positions[i + 2] *= 1.4;
      }
      particles.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Transición suave de salida
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
      }

      // Detener Three.js después del desvanecimiento para ahorrar GPU
      setTimeout(() => {
        isCoverActive = false;
        if (animFrameId) cancelAnimationFrame(animFrameId);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', onWindowResize);
      }, 1400);
    }, 700);
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', executeOpenCeremony);
  }
  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', executeOpenCeremony);
    waxSealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeOpenCeremony();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. CANVAS GLOBAL DE POLVO DE ORO ASCENDENTE EN TODA LA PÁGINA
  // --------------------------------------------------------------------------
  const globalCanvas = document.getElementById('global-gold-dust');
  if (globalCanvas) {
    const gCtx = globalCanvas.getContext('2d');
    let gWidth = (globalCanvas.width = window.innerWidth);
    let gHeight = (globalCanvas.height = window.innerHeight);

    const dustMotes = [];
    const moteCount = window.innerWidth <= 768 ? 40 : 80;

    for (let i = 0; i < moteCount; i++) {
      dustMotes.push({
        x: Math.random() * gWidth,
        y: Math.random() * gHeight,
        radius: Math.random() * 1.8 + 0.4,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      });
    }

    function renderGlobalDust() {
      gCtx.clearRect(0, 0, gWidth, gHeight);

      for (let i = 0; i < moteCount; i++) {
        const m = dustMotes[i];
        m.y -= m.speedY;
        m.x += m.speedX;
        m.opacity += Math.sin(Date.now() * m.pulseSpeed) * 0.005;

        if (m.y < -10) {
          m.y = gHeight + 10;
          m.x = Math.random() * gWidth;
        }

        gCtx.beginPath();
        gCtx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        gCtx.fillStyle = `rgba(243, 220, 124, ${Math.max(0.1, Math.min(0.8, m.opacity))})`;
        gCtx.shadowBlur = 8;
        gCtx.shadowColor = 'rgba(212, 175, 55, 0.5)';
        gCtx.fill();
      }

      requestAnimationFrame(renderGlobalDust);
    }

    window.addEventListener(
      'resize',
      () => {
        gWidth = globalCanvas.width = window.innerWidth;
        gHeight = globalCanvas.height = window.innerHeight;
      },
      { passive: true }
    );

    renderGlobalDust();
  }

  // --------------------------------------------------------------------------
  // 5. CUENTA REGRESIVA INTELIGENTE & ESTADO DE CELEBRACIÓN
  // --------------------------------------------------------------------------
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');
  const countdownClock = document.getElementById('countdown-clock');
  const celebrationBanner = document.getElementById('celebration-banner');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = CONFIG.weddingDate.getTime() - now;

    if (distance <= 0) {
      if (countdownClock) countdownClock.style.display = 'none';
      if (celebrationBanner) celebrationBanner.style.display = 'block';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (timerDays) timerDays.textContent = String(days).padStart(2, '0');
    if (timerHours) timerHours.textContent = String(hours).padStart(2, '0');
    if (timerMinutes) timerMinutes.textContent = String(minutes).padStart(2, '0');
    if (timerSeconds) timerSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --------------------------------------------------------------------------
  // 6. PERSONALIZACIÓN DINÁMICA POR URL (?invitado=...&pases=...)
  // --------------------------------------------------------------------------
  function applyURLPersonalization() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get('invitado');
    const passesParam = urlParams.get('pases');

    const guestGreetingEl = document.getElementById('guest-greeting');
    const guestNameInput = document.getElementById('guest-name');
    const guestCountSelect = document.getElementById('guest-count');

    if (guestParam) {
      const decodedGuest = decodeURIComponent(guestParam.replace(/\+/g, ' '));
      if (guestGreetingEl) {
        guestGreetingEl.textContent = `Querida/o ${decodedGuest}, tenemos el honor de invitarte`;
      }
      if (guestNameInput) {
        guestNameInput.value = decodedGuest;
      }
    }

    if (passesParam && guestCountSelect) {
      const numPasses = parseInt(passesParam, 10);
      if (!isNaN(numPasses) && numPasses > 0) {
        guestCountSelect.innerHTML = '';
        for (let i = 1; i <= Math.min(numPasses, 10); i++) {
          const opt = document.createElement('option');
          opt.value = i;
          opt.textContent = `${i} ${i === 1 ? 'Pase' : 'Pases'}`;
          if (i === numPasses) opt.selected = true;
          guestCountSelect.appendChild(opt);
        }
      }
    }
  }

  applyURLPersonalization();

  // --------------------------------------------------------------------------
  // 7. AGREGAR A CALENDARIO (GOOGLE CALENDAR & DESCARGA .ICS)
  // --------------------------------------------------------------------------
  const calendarButtons = document.querySelectorAll('.add-to-calendar-btn');

  const EVENT_DATA = {
    ceremony: {
      title: 'Boda Valeria & Fernando · Ceremonia Religiosa',
      start: '20271106T203000Z', // 16:30 Bolivia (-4) = 20:30 UTC
      end: '20271106T220000Z',
      location: 'Basílica Menor de San Francisco, La Paz, Bolivia',
      description: 'Ceremonia religiosa de matrimonio de Valeria & Fernando.'
    },
    reception: {
      title: 'Boda Valeria & Fernando · Recepción de Gala',
      start: '20271106T230000Z', // 19:00 Bolivia (-4) = 23:00 UTC
      end: '20271107T080000Z',
      location: 'Castillo de Achumani, Calle 22 de Achumani #450, La Paz, Bolivia',
      description: 'Recepción y fiesta de matrimonio de Valeria & Fernando.'
    }
  };

  calendarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const eventKey = btn.getAttribute('data-event');
      const ev = EVENT_DATA[eventKey] || EVENT_DATA.ceremony;

      // Enlace a Google Calendar
      const gcalUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
        ev.title
      )}&dates=${ev.start}/${ev.end}&location=${encodeURIComponent(
        ev.location
      )}&details=${encodeURIComponent(ev.description)}`;

      // Generar archivo .ics para compatibilidad con Apple Calendar y Outlook
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Valeria & Fernando Wedding//ES',
        'BEGIN:VEVENT',
        `SUMMARY:${ev.title}`,
        `DTSTART:${ev.start}`,
        `DTEND:${ev.end}`,
        `LOCATION:${ev.location}`,
        `DESCRIPTION:${ev.description}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute('download', `${eventKey}-boda-valeria-fernando.ics`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // También abrir Google Calendar en nueva pestaña
      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // --------------------------------------------------------------------------
  // 8. COPIAR CUENTA BANCARIA AL PORTAPAPELES CON NOTIFICACIÓN TOAST
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.btn-copy-account');
  const toastNotification = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimeout = null;

  function showToast(msg) {
    if (!toastNotification) return;
    if (toastMessage) toastMessage.textContent = msg;

    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3200);
  }

  copyButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const accountText = targetEl.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(accountText)
          .then(() => {
            showToast(`Cuenta ${accountText} copiada al portapapeles`);
          })
          .catch(() => {
            fallbackCopy(accountText);
          });
      } else {
        fallbackCopy(accountText);
      }
    });
  });

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(`Cuenta ${text} copiada al portapapeles`);
    } catch (err) {
      showToast('No se pudo copiar automáticamente');
    }
    document.body.removeChild(textArea);
  }

  // --------------------------------------------------------------------------
  // 9. MODAL LIGHTBOX PARA LA GALERÍA FOTOGRÁFICA
  // --------------------------------------------------------------------------
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  let currentGalleryIndex = 0;
  const gallerySources = [];

  galleryItems.forEach((item, idx) => {
    const img = item.querySelector('img');
    if (img) {
      gallerySources.push(img.src);
      item.addEventListener('click', () => {
        openLightbox(idx);
      });
    }
  });

  function openLightbox(index) {
    if (!lightboxModal || !lightboxImg || gallerySources.length === 0) return;
    currentGalleryIndex = index;
    lightboxImg.src = gallerySources[currentGalleryIndex];
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNextImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % gallerySources.length;
    if (lightboxImg) lightboxImg.src = gallerySources[currentGalleryIndex];
  }

  function showPrevImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + gallerySources.length) % gallerySources.length;
    if (lightboxImg) lightboxImg.src = gallerySources[currentGalleryIndex];
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  // --------------------------------------------------------------------------
  // 10. FORMULARIO DE CONFIRMACIÓN RSVP (DIRECTO A WHATSAPP)
  // --------------------------------------------------------------------------
  const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
  const guestPassesGroup = document.getElementById('guest-passes-group');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  attendanceRadios.forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (guestPassesGroup) {
        guestPassesGroup.style.display = e.target.value === 'si' ? 'flex' : 'none';
      }
    });
  });

  if (rsvpSubmitBtn) {
    rsvpSubmitBtn.addEventListener('click', () => {
      const guestNameInput = document.getElementById('guest-name');
      const attendanceInput = document.querySelector('input[name="attendance"]:checked');
      const guestCountSelect = document.getElementById('guest-count');
      const guestSongInput = document.getElementById('guest-song');
      const guestDietInput = document.getElementById('guest-diet');

      const name = guestNameInput ? guestNameInput.value.trim() : '';
      if (!name) {
        showToast('Por favor escribe tu nombre completo');
        if (guestNameInput) guestNameInput.focus();
        return;
      }

      const willAttend = attendanceInput ? attendanceInput.value === 'si' : true;
      const passes = guestCountSelect ? guestCountSelect.value : '1';
      const song = guestSongInput ? guestSongInput.value.trim() : '';
      const diet = guestDietInput ? guestDietInput.value.trim() : '';

      let message = '';
      if (willAttend) {
        message = `¡Hola Valeria y Fernando! ✨\n\nCon mucha alegría confirmo mi asistencia a su boda.\n\n` +
                  `👤 Nombre: ${name}\n` +
                  `🎟️ Pases confirmados: ${passes}\n`;
        if (song) {
          message += `🎵 Canción recomendada: ${song}\n`;
        }
        if (diet) {
          message += `🥗 Restricciones alimentarias: ${diet}\n`;
        }
        message += `\n¡Nos vemos el 06 de Noviembre en La Paz para celebrar! 🥂💍`;
      } else {
        message = `Hola Valeria y Fernando,\n\nLamentablemente no podré acompañarlos físicamente en su boda, ` +
                  `pero les deseo de todo corazón que su matrimonio esté colmado de bendiciones y amor eterno. ❤️\n\n` +
                  `👤 Saludos afectuosos: ${name}`;
      }

      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --------------------------------------------------------------------------
  // 11. BOTÓN VOLVER ARRIBA
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 12. ANIMACIONES DE SCROLL REVEAL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const revealElements = document.querySelectorAll('.scroll-reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // Iniciar Three.js al cargar
  initThreeJS();
});
