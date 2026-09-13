/**
 * ============================================================================
 * MODEL VILLA BOTANICA · LÓGICA MAESTRA & EXPERIENCIA 3D DE ULTRA-LUJO
 * Three.js Brisa Botánica · Sobre Trifold 3D · Dynamic Island · RSVP WhatsApp
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Configuración Maestra del Evento
  const CONFIG = {
    weddingDate: new Date('2027-09-18T15:30:00-04:00'), // Hora oficial Tarija, Bolivia
    whatsappNumber: '59170000000', // Modificar con el teléfono de los novios
    coupleNames: 'Camila & Mateo',
    venue: 'Viñedos del Valle de la Concepción, Tarija',
    audioVolume: 0.75
  };

  // --------------------------------------------------------------------------
  // 1. GESTIÓN DE AUDIO & DYNAMIC ISLAND FLOTANTE (ESTILO APPLE)
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
            fadeAudioIn(bgMusic, CONFIG.audioVolume, 2200);
            updateIslandUI(true);
          })
          .catch((err) => {
            console.warn('Autoplay bloqueado por navegador:', err);
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
    const increment = targetVol / steps;
    let current = 0;

    const fadeInterval = setInterval(() => {
      current = Math.min(targetVol, current + increment);
      audioEl.volume = current;
      if (current >= targetVol) {
        clearInterval(fadeInterval);
      }
    }, stepTime);
  }

  if (islandPill) {
    islandPill.addEventListener('click', toggleAudio);
  }

  // --------------------------------------------------------------------------
  // 2. THREE.JS 3D WEBGL: BRISA BOTÁNICA (HOJAS DE OLIVO & DESTELLOS SOLARES)
  // --------------------------------------------------------------------------
  const botanicalCanvas = document.getElementById('botanical-3d-canvas');
  let scene, camera, renderer;
  let leaves = [];
  let sunDust = null;
  let animId = null;
  let mouseX = 0, mouseY = 0;

  function initThreeJSBotanical() {
    if (!botanicalCanvas || typeof THREE === 'undefined') return;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 60;

      renderer = new THREE.WebGLRenderer({
        canvas: botanicalCanvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });

      const isMobile = window.innerWidth <= 768;
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Iluminación Solar Toscana
      const sunlight = new THREE.DirectionalLight(0xfff5dd, 1.2);
      sunlight.position.set(20, 40, 30);
      scene.add(sunlight);

      const ambientLight = new THREE.AmbientLight(0xf5eedb, 0.75);
      scene.add(ambientLight);

      // 1. Geometría de Hoja de Olivo Esculpida
      const leafShape = new THREE.Shape();
      leafShape.moveTo(0, 0);
      leafShape.quadraticCurveTo(2.2, 4, 0, 9);
      leafShape.quadraticCurveTo(-2.2, 4, 0, 0);

      const leafGeo = new THREE.ShapeGeometry(leafShape);
      // Doblar ligeramente la hoja para tridimensionalidad
      const pos = leafGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const x = pos.getX(i);
        pos.setZ(i, -Math.sin(y * 0.3) * 0.6 + Math.abs(x) * 0.2);
      }
      leafGeo.computeVertexNormals();

      const leafMatOlive = new THREE.MeshLambertMaterial({
        color: 0x3b543d,
        side: THREE.DoubleSide
      });
      const leafMatSage = new THREE.MeshLambertMaterial({
        color: 0x55755e,
        side: THREE.DoubleSide
      });
      const leafMatGold = new THREE.MeshLambertMaterial({
        color: 0xc5a059,
        side: THREE.DoubleSide
      });

      const leafCount = isMobile ? 18 : 36;
      leaves = [];

      for (let i = 0; i < leafCount; i++) {
        const mat = i % 5 === 0 ? leafMatGold : i % 2 === 0 ? leafMatOlive : leafMatSage;
        const leafMesh = new THREE.Mesh(leafGeo, mat);

        leafMesh.position.x = (Math.random() - 0.5) * 90;
        leafMesh.position.y = (Math.random() - 0.5) * 80;
        leafMesh.position.z = (Math.random() - 0.5) * 40;

        const scale = Math.random() * 0.6 + 0.4;
        leafMesh.scale.set(scale, scale, scale);

        leafMesh.userData = {
          speedY: Math.random() * 0.12 + 0.05,
          speedX: Math.random() * 0.08 + 0.02,
          rotSpeedX: (Math.random() - 0.5) * 0.02,
          rotSpeedY: (Math.random() - 0.5) * 0.03,
          rotSpeedZ: (Math.random() - 0.5) * 0.015,
          swayFactor: Math.random() * 2 + 1,
          swayOffset: Math.random() * Math.PI * 2
        };

        scene.add(leafMesh);
        leaves.push(leafMesh);
      }

      // 2. Destellos Solares y Polvo Dorado (Sun Dust)
      const dustCount = isMobile ? 60 : 120;
      const dustGeo = new THREE.BufferGeometry();
      const dustPositions = new Float32Array(dustCount * 3);

      for (let i = 0; i < dustCount * 3; i += 3) {
        dustPositions[i] = (Math.random() - 0.5) * 110;
        dustPositions[i + 1] = (Math.random() - 0.5) * 100;
        dustPositions[i + 2] = (Math.random() - 0.5) * 50;
      }

      dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));

      const dustMat = new THREE.PointsMaterial({
        size: 1.8,
        color: 0xdeb86a,
        transparent: true,
        opacity: 0.65,
        blending: THREE.AdditiveBlending
      });

      sunDust = new THREE.Points(dustGeo, dustMat);
      scene.add(sunDust);

      // Eventos de Parallax con el cursor
      window.addEventListener('pointermove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      }, { passive: true });

      window.addEventListener('resize', onWindowResize, { passive: true });

      animateBotanicalScene();
    } catch (e) {
      console.warn('WebGL no disponible:', e);
    }
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animateBotanicalScene() {
    animId = requestAnimationFrame(animateBotanicalScene);

    const time = Date.now() * 0.001;

    // Animación de hojas meciéndose en la brisa
    for (let i = 0; i < leaves.length; i++) {
      const leaf = leaves[i];
      const data = leaf.userData;

      leaf.position.y -= data.speedY;
      leaf.position.x += Math.sin(time * data.swayFactor + data.swayOffset) * 0.06;

      leaf.rotation.x += data.rotSpeedX;
      leaf.rotation.y += data.rotSpeedY;
      leaf.rotation.z += Math.sin(time + data.swayOffset) * 0.01;

      // Si baja de la pantalla, reaparece arriba
      if (leaf.position.y < -45) {
        leaf.position.y = 45;
        leaf.position.x = (Math.random() - 0.5) * 90;
      }
    }

    // Movimiento sutil de los destellos solares
    if (sunDust) {
      sunDust.rotation.y += 0.0006;
      sunDust.rotation.x += 0.0003;
    }

    // Parallax suave con la cámara
    camera.position.x += (mouseX * 5 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  // --------------------------------------------------------------------------
  // 3. APERTURA DE SOBRE TRIFOLD 3D & FAJILLA VEGETAL (SIGNATURE MOMENT)
  // --------------------------------------------------------------------------
  const coverOverlay = document.getElementById('cover-overlay');
  const emeraldSealBtn = document.getElementById('emerald-seal-btn');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const bellyBand = document.getElementById('belly-band');
  const flapLeft = document.getElementById('flap-left');
  const flapRight = document.getElementById('flap-right');

  let isEnvelopeOpen = false;

  function executeTrifoldOpening() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    // 1. Activar música de fondo con fundido
    setAudioState(true);

    // 2. Sello se rompe con pulso
    if (emeraldSealBtn) {
      emeraldSealBtn.classList.add('seal-break');
    }

    // 3. Deslizamiento de la fajilla vegetal
    setTimeout(() => {
      if (bellyBand) {
        bellyBand.classList.add('band-slide');
      }
    }, 250);

    // 4. Apertura 3D de solapas laterales (desdoble en 140deg hacia afuera)
    setTimeout(() => {
      if (flapLeft) flapLeft.classList.add('flap-open');
      if (flapRight) flapRight.classList.add('flap-open');
    }, 550);

    // 5. Desvanecimiento suave de la pantalla de bienvenida hacia la invitación principal
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
      }
    }, 1200);
  }

  if (emeraldSealBtn) {
    emeraldSealBtn.addEventListener('click', executeTrifoldOpening);
    emeraldSealBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeTrifoldOpening();
      }
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', executeTrifoldOpening);
  }

  // --------------------------------------------------------------------------
  // 4. CUENTA REGRESIVA INTELIGENTE & ESTADO DE CELEBRACIÓN
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
  // 5. PERSONALIZACIÓN DINÁMICA POR URL (?invitado=...&pases=...)
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
  // 6. AGREGAR A CALENDARIO (GOOGLE CALENDAR & DESCARGA .ICS)
  // --------------------------------------------------------------------------
  const calendarButtons = document.querySelectorAll('.add-to-calendar-btn');

  const EVENT_DATA = {
    ceremony: {
      title: 'Boda Camila & Mateo · Ceremonia Religiosa',
      start: '20270918T193000Z', // 15:30 Tarija (-4) = 19:30 UTC
      end: '20270918T210000Z',
      location: 'Capilla Colonial de los Viñedos, Valle de la Concepción, Tarija, Bolivia',
      description: 'Ceremonia religiosa de matrimonio de Camila & Mateo.'
    },
    reception: {
      title: 'Boda Camila & Mateo · Recepción en los Viñedos',
      start: '20270918T213000Z', // 17:30 Tarija (-4) = 21:30 UTC
      end: '20270919T080000Z',
      location: 'Hacienda & Jardines de la Concepción, Tarija, Bolivia',
      description: 'Recepción y fiesta de matrimonio de Camila & Mateo.'
    }
  };

  calendarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const eventKey = btn.getAttribute('data-event');
      const ev = EVENT_DATA[eventKey] || EVENT_DATA.ceremony;

      const gcalUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
        ev.title
      )}&dates=${ev.start}/${ev.end}&location=${encodeURIComponent(
        ev.location
      )}&details=${encodeURIComponent(ev.description)}`;

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Camila & Mateo Wedding//ES',
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
      downloadLink.setAttribute('download', `${eventKey}-boda-camila-mateo.ics`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // --------------------------------------------------------------------------
  // 7. COPIAR CUENTA BANCARIA CON TOAST DE PAPEL DE SEDA
  // --------------------------------------------------------------------------
  const copyButtons = document.querySelectorAll('.btn-copy-account');
  const toastEl = document.getElementById('toast-notification');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(text) {
    if (!toastEl) return;
    if (toastMsg) toastMsg.textContent = text;

    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
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
            showToast(`Cuenta ${accountText} copiada con éxito`);
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
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      showToast(`Cuenta ${text} copiada`);
    } catch (e) {
      showToast('No se pudo copiar automáticamente');
    }
    document.body.removeChild(ta);
  }

  // --------------------------------------------------------------------------
  // 8. MODAL LIGHTBOX PARA LA GALERÍA FOTOGRÁFICA
  // --------------------------------------------------------------------------
  const galleryCells = document.querySelectorAll('.gallery-cell');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  let currentIdx = 0;
  const galleryImages = [];

  galleryCells.forEach((cell, idx) => {
    const img = cell.querySelector('img');
    if (img) {
      galleryImages.push(img.src);
      cell.addEventListener('click', () => {
        openLightbox(idx);
      });
    }
  });

  function openLightbox(index) {
    if (!lightboxModal || !lightboxImg || galleryImages.length === 0) return;
    currentIdx = index;
    lightboxImg.src = galleryImages[currentIdx];
    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function nextImage() {
    currentIdx = (currentIdx + 1) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentIdx];
  }

  function prevImage() {
    currentIdx = (currentIdx - 1 + galleryImages.length) % galleryImages.length;
    if (lightboxImg) lightboxImg.src = galleryImages[currentIdx];
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // --------------------------------------------------------------------------
  // 9. FORMULARIO RSVP (DIRECTO A WHATSAPP)
  // --------------------------------------------------------------------------
  const rsvpSubmitBtn = document.getElementById('rsvp-submit-btn');
  const guestPassesGroup = document.getElementById('guest-passes-group');
  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

  attendanceRadios.forEach((r) => {
    r.addEventListener('change', (e) => {
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
        showToast('Por favor ingresa tu nombre completo');
        if (guestNameInput) guestNameInput.focus();
        return;
      }

      const willAttend = attendanceInput ? attendanceInput.value === 'si' : true;
      const passes = guestCountSelect ? guestCountSelect.value : '1';
      const song = guestSongInput ? guestSongInput.value.trim() : '';
      const diet = guestDietInput ? guestDietInput.value.trim() : '';

      let message = '';
      if (willAttend) {
        message = `¡Hola Camila y Mateo! 🌿✨\n\nCon mucha emoción confirmo mi asistencia a su boda en el Valle.\n\n` +
                  `👤 Nombre: ${name}\n` +
                  `🎟️ Pases confirmados: ${passes}\n`;
        if (song) {
          message += `🎵 Canción recomendada: ${song}\n`;
        }
        if (diet) {
          message += `🥗 Restricciones alimentarias: ${diet}\n`;
        }
        message += `\n¡Nos vemos el 18 de Septiembre en Tarija para celebrar! 🥂🍇`;
      } else {
        message = `Hola Camila y Mateo,\n\nCon el corazón en la mano les hago saber que no podré acompañarlos ` +
                  `físicamente en su matrimonio en el Valle, pero les envío todo mi cariño y los mejores deseos ` +
                  `para su vida juntos. ❤️\n\n` +
                  `👤 Saludos cordiales: ${name}`;
      }

      const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // --------------------------------------------------------------------------
  // 10. BOTÓN VOLVER ARRIBA
  // --------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // 11. SCROLL REVEAL (INTERSECTION OBSERVER)
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

  // Iniciar la escena 3D botánica
  initThreeJSBotanical();
});
