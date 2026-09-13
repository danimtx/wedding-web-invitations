/**
 * ============================================================================
 * MODEL PALAZZO DI CRISTALLO · LÓGICA MAESTRA & EXPERIENCIA 3D DE ULTRA-LUJO
 * Three.js Refracción Prismática · Placa Acrílica 3D · Dynamic Island · RSVP
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Configuración Maestra del Evento
  const CONFIG = {
    weddingDate: new Date('2027-10-23T17:00:00-04:00'), // Hora oficial Santa Cruz, Bolivia
    whatsappNumber: '59170000000', // Modificar con el teléfono de los novios
    coupleNames: 'Isabella & Sebastián',
    venue: 'Palacio de Cristal · Gran Orangerie, Santa Cruz',
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
  // 2. THREE.JS 3D WEBGL: CÁUSTICAS PRISMÁTICAS & POLVO DE NÁCAR
  // --------------------------------------------------------------------------
  const prismCanvas = document.getElementById('prism-3d-canvas');
  let scene, camera, renderer;
  let crystals = [];
  let pearlDust = null;
  let animId = null;
  let mouseX = 0, mouseY = 0;

  function initThreeJSCrystal() {
    if (!prismCanvas || typeof THREE === 'undefined') return;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        55,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 65;

      renderer = new THREE.WebGLRenderer({
        canvas: prismCanvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });

      const isMobile = window.innerWidth <= 768;
      renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Luces de Cristal y Prisma
      const spotPrism = new THREE.PointLight(0xfff7ed, 1.4, 150);
      spotPrism.position.set(30, 40, 40);
      scene.add(spotPrism);

      const softSun = new THREE.AmbientLight(0xfcf8f2, 0.85);
      scene.add(softSun);

      // 1. Gemas de Cristal Facetadas Flotantes (Octaedros de Vidrio)
      const crystalGeo = new THREE.OctahedronGeometry(1.6, 0);
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.15,
        metalness: 0.1,
        transparent: true,
        opacity: 0.55
      });
      const crystalMatGold = new THREE.MeshStandardMaterial({
        color: 0xeed5bf,
        roughness: 0.2,
        metalness: 0.7,
        transparent: true,
        opacity: 0.65
      });

      const crystalCount = isMobile ? 15 : 32;
      crystals = [];

      for (let i = 0; i < crystalCount; i++) {
        const mat = i % 4 === 0 ? crystalMatGold : crystalMat;
        const mesh = new THREE.Mesh(crystalGeo, mat);

        mesh.position.x = (Math.random() - 0.5) * 85;
        mesh.position.y = (Math.random() - 0.5) * 80;
        mesh.position.z = (Math.random() - 0.5) * 45;

        const scale = Math.random() * 0.8 + 0.4;
        mesh.scale.set(scale, scale * 1.3, scale);

        mesh.userData = {
          rotX: (Math.random() - 0.5) * 0.015,
          rotY: (Math.random() - 0.5) * 0.02,
          floatSpeed: Math.random() * 0.06 + 0.02,
          floatOffset: Math.random() * Math.PI * 2
        };

        scene.add(mesh);
        crystals.push(mesh);
      }

      // 2. Destellos Prismáticos & Polvo de Nácar
      const pearlCount = isMobile ? 70 : 140;
      const pearlGeo = new THREE.BufferGeometry();
      const pearlPositions = new Float32Array(pearlCount * 3);

      for (let i = 0; i < pearlCount * 3; i += 3) {
        pearlPositions[i] = (Math.random() - 0.5) * 105;
        pearlPositions[i + 1] = (Math.random() - 0.5) * 95;
        pearlPositions[i + 2] = (Math.random() - 0.5) * 50;
      }

      pearlGeo.setAttribute('position', new THREE.BufferAttribute(pearlPositions, 3));

      const pearlMat = new THREE.PointsMaterial({
        size: 2.0,
        color: 0xd4aa85,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });

      pearlDust = new THREE.Points(pearlGeo, pearlMat);
      scene.add(pearlDust);

      // Eventos de Parallax y Redimensión
      window.addEventListener('pointermove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      }, { passive: true });

      window.addEventListener('resize', onWindowResize, { passive: true });

      animateCrystalScene();
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

  function animateCrystalScene() {
    animId = requestAnimationFrame(animateCrystalScene);

    const time = Date.now() * 0.001;

    // Rotación suave de los cristales facetados
    for (let i = 0; i < crystals.length; i++) {
      const c = crystals[i];
      c.rotation.x += c.userData.rotX;
      c.rotation.y += c.userData.rotY;
      c.position.y += Math.sin(time + c.userData.floatOffset) * 0.025;
    }

    if (pearlDust) {
      pearlDust.rotation.y += 0.0008;
      pearlDust.rotation.x += 0.0004;
    }

    // Parallax suave con la cámara
    camera.position.x += (mouseX * 6 - camera.position.x) * 0.03;
    camera.position.y += (mouseY * 4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  // --------------------------------------------------------------------------
  // 3. SECUENCIA CINEMÁTICA: ESTUCHE DE LINO & PLACA DE ACRÍLICO 3D
  // --------------------------------------------------------------------------
  const coverOverlay = document.getElementById('cover-overlay');
  const jewelClaspBtn = document.getElementById('jewel-clasp-btn');
  const enterBtn = document.getElementById('enter-invitation-btn');
  const slipcaseSheath = document.getElementById('slipcase-sheath');
  const acrylicPlate = document.getElementById('acrylic-plate');

  let isUnboxed = false;

  function executeAcrylicUnboxing() {
    if (isUnboxed) return;
    isUnboxed = true;

    // 1. Iniciar música de fondo
    setAudioState(true);

    // 2. Deslizar la placa de acrílico hacia arriba y desplegar el estuche hacia abajo
    if (acrylicPlate) {
      acrylicPlate.classList.add('plate-slide-up');
    }
    if (slipcaseSheath) {
      slipcaseSheath.classList.add('sheath-drop');
    }

    // 3. Desvanecer la pantalla de entrada hacia la invitación principal
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
      }
    }, 1100);
  }

  if (jewelClaspBtn) {
    jewelClaspBtn.addEventListener('click', executeAcrylicUnboxing);
    jewelClaspBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        executeAcrylicUnboxing();
      }
    });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', executeAcrylicUnboxing);
  }

  // --------------------------------------------------------------------------
  // 4. CUENTA REGRESIVA INTELIGENTE & BANNER DE CELEBRACIÓN
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
  // 6. AGREGAR A CALENDARIO (GOOGLE CALENDAR & .ICS)
  // --------------------------------------------------------------------------
  const calendarButtons = document.querySelectorAll('.add-to-calendar-btn');

  const EVENT_DATA = {
    ceremony: {
      title: 'Boda Isabella & Sebastián · Ceremonia Religiosa',
      start: '20271023T210000Z', // 17:00 Santa Cruz (-4) = 21:00 UTC
      end: '20271023T223000Z',
      location: 'Capilla Nuestra Señora de la Encarnación, Equipetrol Norte, Santa Cruz, Bolivia',
      description: 'Ceremonia religiosa de matrimonio de Isabella & Sebastián.'
    },
    reception: {
      title: 'Boda Isabella & Sebastián · Palacio de Cristal',
      start: '20271023T233000Z', // 19:30 Santa Cruz (-4) = 23:30 UTC
      end: '20271024T090000Z',
      location: 'Palacio de Cristal · Gran Orangerie, Urubó, Santa Cruz, Bolivia',
      description: 'Recepción y fiesta de matrimonio de Isabella & Sebastián.'
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
        'PRODID:-//Isabella & Sebastian Wedding//ES',
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
      downloadLink.setAttribute('download', `${eventKey}-boda-isabella-sebastian.ics`);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.open(gcalUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // --------------------------------------------------------------------------
  // 7. COPIAR CUENTA BANCARIA CON NOTIFICACIÓN TOAST DE CRISTAL
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
  const galleryTiles = document.querySelectorAll('.gallery-tile');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  let currentIdx = 0;
  const galleryImages = [];

  galleryTiles.forEach((tile, idx) => {
    const img = tile.querySelector('img');
    if (img) {
      galleryImages.push(img.src);
      tile.addEventListener('click', () => {
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
        message = `¡Hola Isabella y Sebastián! 💎✨\n\nCon mucha felicidad confirmo mi asistencia a su boda en el Palacio de Cristal.\n\n` +
                  `👤 Nombre: ${name}\n` +
                  `🎟️ Pases confirmados: ${passes}\n`;
        if (song) {
          message += `🎵 Canción para la fiesta: ${song}\n`;
        }
        if (diet) {
          message += `🥗 Restricciones alimentarias: ${diet}\n`;
        }
        message += `\n¡Nos vemos el 23 de Octubre en Santa Cruz para brindar! 🥂💍`;
      } else {
        message = `Hola Isabella y Sebastián,\n\nLamentablemente no podré acompañarlos físicamente en su boda, ` +
                  `pero les deseo de corazón que su vida juntos esté colmada de amor, alegría y bendiciones eternas. ❤️\n\n` +
                  `👤 Un abrazo con cariño: ${name}`;
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

  // Iniciar la escena 3D de cristal
  initThreeJSCrystal();
});
