/**
 * L'Écrin Céleste - Main Interactive Engine
 * Haute Horlogerie & Astronomical Three.js Astrolabe Experience
 * Features:
 * - Three.js 3D Astrolabe Entrance Simulation with Winding Crown
 * - Three.js Live 3D Interactive Constellation Sky Dome
 * - Precision Horological Countdown Chronometer
 * - 3D Golden Bullion Card with 1-Click CLABE Copy
 * - Real-Time Constellation RSVP with Live Calligraphy Preview
 * - Astronomical Audio Frequency Visualizer
 * 
 * Strict Constraint: Zero em-dashes used anywhere in this file.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THREE.JS 3D MECHANICAL ASTROLABE SIMULATION
  // =========================================================================
  const canvasAstrolabe = document.getElementById('canvas-astrolabe-3d');
  const entranceOverlay = document.getElementById('astrolabe-entrance');
  const btnWind = document.getElementById('btn-wind-astrolabe');
  const centerPiece = document.getElementById('astrolabe-center-piece');
  const audioElement = document.getElementById('wedding-audio');
  const audioToggleBtn = document.getElementById('btn-toggle-audio');
  const audioIcon = document.getElementById('audio-icon');
  const audioWaveform = document.getElementById('audio-waveform');

  let astrolabeScene, astrolabeCamera, astrolabeRenderer;
  let gearOuter, gearMiddle, gearInner, orbitalSpheresGroup;
  let isUnlocking = false;
  let unlockProgress = 0;
  let isAstrolabeOpened = false;

  function initThreeAstrolabe() {
    if (!canvasAstrolabe || typeof THREE === 'undefined') return;

    const width = canvasAstrolabe.parentElement.clientWidth || 500;
    const height = canvasAstrolabe.parentElement.clientHeight || 500;

    astrolabeScene = new THREE.Scene();
    astrolabeCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    astrolabeCamera.position.z = 70;

    astrolabeRenderer = new THREE.WebGLRenderer({
      canvas: canvasAstrolabe,
      alpha: true,
      antialias: true
    });
    astrolabeRenderer.setSize(width, height);
    astrolabeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Warm Horological Lighting
    const ambientLight = new THREE.AmbientLight(0xfff3d6, 1.2);
    astrolabeScene.add(ambientLight);

    const goldPoint1 = new THREE.PointLight(0xf5dc92, 2.5, 120);
    goldPoint1.position.set(30, 30, 40);
    astrolabeScene.add(goldPoint1);

    const bluePoint = new THREE.PointLight(0x4d7cfe, 1.2, 100);
    bluePoint.position.set(-30, -30, 30);
    astrolabeScene.add(bluePoint);

    // Haute Horlogerie Gold Material
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xE5C158,
      metalness: 0.75,
      roughness: 0.25
    });

    const darkGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0x9A7532,
      metalness: 0.85,
      roughness: 0.3
    });

    // 1. Outer Escapement Gear Ring
    const outerGeom = new THREE.TorusGeometry(26, 0.8, 16, 100);
    gearOuter = new THREE.Mesh(outerGeom, goldMaterial);
    astrolabeScene.add(gearOuter);

    // 2. Middle Astrological Sector Ring
    const middleGeom = new THREE.TorusGeometry(20, 0.6, 16, 80);
    gearMiddle = new THREE.Mesh(middleGeom, darkGoldMaterial);
    astrolabeScene.add(gearMiddle);

    // 3. Inner Horological Ring
    const innerGeom = new THREE.TorusGeometry(14, 0.5, 16, 60);
    gearInner = new THREE.Mesh(innerGeom, goldMaterial);
    astrolabeScene.add(gearInner);

    // 4. Orbital Planetary Spheres
    orbitalSpheresGroup = new THREE.Group();
    const sphereGeom = new THREE.SphereGeometry(1.2, 16, 16);
    
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const sphereMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xF5DC92 : 0xC8D1DC,
        metalness: 0.8,
        roughness: 0.2
      });
      const planet = new THREE.Mesh(sphereGeom, sphereMat);
      planet.position.set(Math.cos(angle) * 20, Math.sin(angle) * 20, 0);
      orbitalSpheresGroup.add(planet);
    }
    astrolabeScene.add(orbitalSpheresGroup);

    // Clock
    const clock = new THREE.Clock();

    function renderAstrolabe() {
      requestAnimationFrame(renderAstrolabe);
      const delta = clock.getDelta();

      if (!isUnlocking) {
        // Continuous Horological Motion
        gearOuter.rotation.z += 0.008;
        gearMiddle.rotation.z -= 0.012;
        gearInner.rotation.z += 0.018;
        orbitalSpheresGroup.rotation.z -= 0.012;

        // Subtle 3D perspective rocking
        const time = clock.getElapsedTime();
        astrolabeScene.rotation.x = Math.sin(time * 0.8) * 0.12;
        astrolabeScene.rotation.y = Math.cos(time * 0.8) * 0.12;
      } else if (unlockProgress < 1) {
        // High-Speed Mechanical Unlocking Spin
        unlockProgress += 0.03;
        const speedMultiplier = 1 + unlockProgress * 15;

        gearOuter.rotation.z += 0.03 * speedMultiplier;
        gearMiddle.rotation.z -= 0.04 * speedMultiplier;
        gearInner.rotation.z += 0.05 * speedMultiplier;
        orbitalSpheresGroup.rotation.z -= 0.04 * speedMultiplier;

        astrolabeCamera.position.z += 0.8;
      }

      astrolabeRenderer.render(astrolabeScene, astrolabeCamera);
    }

    renderAstrolabe();

    window.addEventListener('resize', () => {
      const newW = canvasAstrolabe.parentElement.clientWidth || 500;
      const newH = canvasAstrolabe.parentElement.clientHeight || 500;
      astrolabeCamera.aspect = newW / newH;
      astrolabeCamera.updateProjectionMatrix();
      astrolabeRenderer.setSize(newW, newH);
    });
  }

  function unlockAstrolabe() {
    if (isAstrolabeOpened) return;
    isAstrolabeOpened = true;
    isUnlocking = true;

    // Trigger Golden Cosmic Stardust Confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#E5C158', '#F5DC92', '#0E172A', '#C8D1DC', '#FFF5D6']
      });
    }

    // Expand Center Medallion
    if (centerPiece) {
      centerPiece.style.transition = 'transform 0.7s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.6s ease';
      centerPiece.style.transform = 'translate(-50%, -50%) scale(1.6)';
      centerPiece.style.opacity = '0';
    }

    // Unlock and Fade Overlay
    setTimeout(() => {
      if (entranceOverlay) {
        entranceOverlay.classList.add('is-unlocked');
      }
      startAudioPlayback();
    }, 550);
  }

  if (btnWind) {
    btnWind.addEventListener('click', unlockAstrolabe);
  }
  if (centerPiece) {
    centerPiece.addEventListener('click', unlockAstrolabe);
  }
  if (canvasAstrolabe) {
    canvasAstrolabe.addEventListener('click', unlockAstrolabe);
  }

  initThreeAstrolabe();


  // =========================================================================
  // 2. THREE.JS LIVE 3D CONSTELLATION DOME (#canvas-sky-dome)
  // =========================================================================
  const canvasSky = document.getElementById('canvas-sky-dome');
  let skyScene, skyCamera, skyRenderer, starsGroup;
  let isDraggingSky = false;
  let prevMouseX = 0, prevMouseY = 0;

  function initThreeSkyDome() {
    if (!canvasSky || typeof THREE === 'undefined') return;

    const width = canvasSky.parentElement.clientWidth || 800;
    const height = canvasSky.parentElement.clientHeight || 500;

    skyScene = new THREE.Scene();
    skyCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    skyCamera.position.set(0, 0, 1);

    skyRenderer = new THREE.WebGLRenderer({
      canvas: canvasSky,
      alpha: true,
      antialias: true
    });
    skyRenderer.setSize(width, height);
    skyRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    starsGroup = new THREE.Group();
    skyScene.add(starsGroup);

    // Generate 1200 Background Stars
    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorGold = new THREE.Color(0xE5C158);
    const colorWhite = new THREE.Color(0xFFFFFF);
    const colorBlue = new THREE.Color(0xC8D1DC);

    for (let i = 0; i < starCount; i++) {
      // Uniform Sphere Distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 250;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      // Color Variety
      const rand = Math.random();
      const chosenColor = rand > 0.7 ? colorGold : (rand > 0.4 ? colorWhite : colorBlue);
      starColors[i * 3] = chosenColor.r;
      starColors[i * 3 + 1] = chosenColor.g;
      starColors[i * 3 + 2] = chosenColor.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starField = new THREE.Points(starGeometry, starMaterial);
    starsGroup.add(starField);

    // Couple Binary Stars: Valentina & Maximiliano
    const binaryMat = new THREE.MeshBasicMaterial({ color: 0xFFF5D6 });
    const binaryGeom = new THREE.SphereGeometry(4, 16, 16);

    const starValentina = new THREE.Mesh(binaryGeom, binaryMat);
    starValentina.position.set(-30, 20, -180);
    starsGroup.add(starValentina);

    const starMaximiliano = new THREE.Mesh(binaryGeom, binaryMat);
    starMaximiliano.position.set(30, 20, -180);
    starsGroup.add(starMaximiliano);

    // Constellation Line between them
    const lineMat = new THREE.LineBasicMaterial({ color: 0xE5C158, transparent: true, opacity: 0.7 });
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-30, 20, -180),
      new THREE.Vector3(30, 20, -180)
    ]);
    const binaryLine = new THREE.Line(lineGeom, lineMat);
    starsGroup.add(binaryLine);

    // Animate Sky
    function renderSky() {
      requestAnimationFrame(renderSky);
      if (!isDraggingSky) {
        starsGroup.rotation.y += 0.0008;
      }
      skyRenderer.render(skyScene, skyCamera);
    }

    renderSky();

    // Mouse & Touch Drag Rotation
    canvasSky.addEventListener('mousedown', (e) => {
      isDraggingSky = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      isDraggingSky = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingSky) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      starsGroup.rotation.y += deltaX * 0.004;
      starsGroup.rotation.x += deltaY * 0.004;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    });

    // Touch Support
    canvasSky.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDraggingSky = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDraggingSky = false;
    });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingSky || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      starsGroup.rotation.y += deltaX * 0.004;
      starsGroup.rotation.x += deltaY * 0.004;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('resize', () => {
      const newW = canvasSky.parentElement.clientWidth || 800;
      const newH = canvasSky.parentElement.clientHeight || 500;
      skyCamera.aspect = newW / newH;
      skyCamera.updateProjectionMatrix;
      skyRenderer.setSize(newW, newH);
    });
  }

  initThreeSkyDome();


  // =========================================================================
  // 3. AUDIO CONTROLLER & OSCILLATION FREQUENCY
  // =========================================================================
  let isAudioPlaying = false;

  function startAudioPlayback() {
    if (!audioElement) return;
    audioElement.play().then(() => {
      isAudioPlaying = true;
      updateAudioUI();
    }).catch(() => {
      isAudioPlaying = false;
      updateAudioUI();
    });
  }

  function toggleAudio() {
    if (!audioElement) return;
    if (audioElement.paused) {
      audioElement.play().then(() => {
        isAudioPlaying = true;
        updateAudioUI();
      }).catch(err => {
        console.warn('Audio play error:', err);
      });
    } else {
      audioElement.pause();
      isAudioPlaying = false;
      updateAudioUI();
    }
  }

  function updateAudioUI() {
    if (!audioIcon || !audioWaveform) return;
    if (isAudioPlaying) {
      audioIcon.className = 'fa-solid fa-pause';
      audioWaveform.parentElement.classList.add('is-playing');
    } else {
      audioIcon.className = 'fa-solid fa-play';
      audioWaveform.parentElement.classList.remove('is-playing');
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', toggleAudio);
  }
  if (audioWaveform) {
    audioWaveform.addEventListener('click', toggleAudio);
  }


  // =========================================================================
  // 4. PRECISION HOROLOGY CHRONOMETER (COUNTDOWN - NOV 21, 2026, 16:30)
  // =========================================================================
  const targetWeddingDate = new Date('2026-11-21T16:30:00-06:00').getTime();
  const elDays = document.getElementById('chrono-days');
  const elHours = document.getElementById('chrono-hours');
  const elMinutes = document.getElementById('chrono-minutes');
  const elSeconds = document.getElementById('chrono-seconds');

  function updateChronometer() {
    const now = new Date().getTime();
    const distance = targetWeddingDate - now;

    if (distance <= 0) {
      if (elDays) elDays.textContent = '00';
      if (elHours) elHours.textContent = '00';
      if (elMinutes) elMinutes.textContent = '00';
      if (elSeconds) elSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (elDays) elDays.textContent = String(days).padStart(2, '0');
    if (elHours) elHours.textContent = String(hours).padStart(2, '0');
    if (elMinutes) elMinutes.textContent = String(minutes).padStart(2, '0');
    if (elSeconds) elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  updateChronometer();
  setInterval(updateChronometer, 1000);


  // =========================================================================
  // 5. 3D GOLD BULLION CARD & CLABE COPY (#card-bullion-flipper)
  // =========================================================================
  const cardBullion = document.getElementById('card-bullion-flipper');
  const btnCopyClabe = document.getElementById('btn-copy-clabe');
  const clabeElement = document.getElementById('clabe-number');

  if (cardBullion) {
    cardBullion.addEventListener('click', (e) => {
      if (e.target.closest('#btn-copy-clabe')) return;
      cardBullion.classList.toggle('is-flipped');
    });
  }

  if (btnCopyClabe && clabeElement) {
    btnCopyClabe.addEventListener('click', (e) => {
      e.stopPropagation();
      const clabeText = clabeElement.textContent.replace(/\s+/g, '');
      navigator.clipboard.writeText(clabeText).then(() => {
        showToast('CLABE interbancaria copiada con honor');
        btnCopyClabe.innerHTML = '<i class="fa-solid fa-check"></i> ¡CLABE COPIADA!';
        setTimeout(() => {
          btnCopyClabe.innerHTML = '<i class="fa-regular fa-copy"></i> COPIAR CLABE INTERBANCARIA';
        }, 3000);
      }).catch(() => {
        showToast('Por favor copie manualmente: ' + clabeText);
      });
    });
  }


  // =========================================================================
  // 6. REAL-TIME CONSTELLATION RSVP & PASS GENERATOR
  // =========================================================================
  const inputRsvpName = document.getElementById('rsvp-name');
  const calligraphyName = document.getElementById('calligraphy-guest-name');
  const calligraphyPassCount = document.getElementById('calligraphy-pass-count');
  const calligraphyStatus = document.getElementById('calligraphy-guest-status');
  const calligraphyBadge = document.getElementById('calligraphy-status-badge');
  const selectPasses = document.getElementById('rsvp-passes');
  const radioAttendance = document.querySelectorAll('input[name="attendance"]');
  const rsvpForm = document.getElementById('celestial-rsvp-form');

  // Real-time Guest Name update
  if (inputRsvpName && calligraphyName) {
    inputRsvpName.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      calligraphyName.textContent = val.length > 0 ? val : 'Distinguido Invitado';
    });
  }

  // Real-time Passes count
  if (selectPasses && calligraphyPassCount) {
    selectPasses.addEventListener('change', (e) => {
      const count = e.target.value;
      calligraphyPassCount.textContent = count === '1' ? '1 Pase' : count + ' Pases';
    });
  }

  // Attendance Radio Toggle
  if (radioAttendance.length > 0) {
    radioAttendance.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'accepted') {
          if (calligraphyBadge) {
            calligraphyBadge.textContent = 'CONFIRMADO';
            calligraphyBadge.className = 'font-sans text-[10px] tracking-widest text-celestial-gold uppercase font-bold';
          }
          if (calligraphyStatus) {
            calligraphyStatus.textContent = 'Tu estrella brillará con intensidad en el firmamento de nuestra noche más especial.';
          }
        } else {
          if (calligraphyBadge) {
            calligraphyBadge.textContent = 'DECLINADO';
            calligraphyBadge.className = 'font-sans text-[10px] tracking-widest text-celestial-muted uppercase font-bold';
          }
          if (calligraphyStatus) {
            calligraphyStatus.textContent = 'Sentiremos tu ausencia; tu afecto ilumina nuestro camino con gratitud.';
          }
        }
      });
    });
  }

  // RSVP Form Submission
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const guestName = inputRsvpName ? inputRsvpName.value.trim() : '';
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'accepted';

      if (!guestName) {
        showToast('Por favor ingrese su nombre para el registro astronómico');
        return;
      }

      // Add a new star to the 3D Star Dome in real time!
      if (starsGroup && attendance === 'accepted') {
        const newStarMat = new THREE.MeshBasicMaterial({ color: 0xF5DC92 });
        const newStarGeom = new THREE.SphereGeometry(3.5, 12, 12);
        const newGuestStar = new THREE.Mesh(newStarGeom, newStarMat);
        newGuestStar.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 80, -150);
        starsGroup.add(newGuestStar);
      }

      // Cosmic Stardust Confetti
      if (attendance === 'accepted' && typeof confetti === 'function') {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#E5C158', '#F5DC92', '#0E172A', '#C8D1DC', '#FFF5D6']
        });
      }

      showToast('Estrella encendida con éxito. Gracias por confirmar, ' + guestName);

      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
        submitBtn.innerHTML = '<i class="fa-solid fa-star text-celestial-void mr-2"></i> ESTRELLA REGISTRADA EN EL FIRMAMENTO';
      }
    });
  }


  // =========================================================================
  // 7. BOTTOM ASTROLABE DOCK (SCROLLSPY)
  // =========================================================================
  const sections = document.querySelectorAll('.celestial-section');
  const dockLinks = document.querySelectorAll('.dock-link');
  const dockNav = document.getElementById('celestial-dock');

  function updateActiveDock() {
    let currentId = '';
    const scrollPos = window.scrollY + 220;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      dockLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentId) {
          link.classList.add('active');

          if (dockNav) {
            const leftPos = link.offsetLeft - dockNav.offsetWidth / 2 + link.offsetWidth / 2;
            dockNav.scrollTo({ left: leftPos, behavior: 'smooth' });
          }
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveDock, { passive: true });


  // =========================================================================
  // 8. GALERIE LIGHTBOX
  // =========================================================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || '';
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('flex');
    lightbox.classList.add('hidden');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-src');
      const caption = item.getAttribute('data-caption');
      openLightbox(src, caption);
    });
  });

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener('click', closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });


  // =========================================================================
  // 9. CELESTIAL CALENDAR (.ICS) GENERATOR
  // =========================================================================
  window.downloadCelestialCalendar = function(type) {
    let title, description, location, startDate, endDate;

    if (type === 'ceremony') {
      title = "Boda Valentina & Maximiliano - Ceremonia Religiosa";
      description = "Ceremonia Nupcial de Valentina de la Garza y Maximiliano Silva en la Parroquia de San Miguel.";
      location = "Parroquia de San Miguel Arcángel, Plaza Principal S/N, Centro Histórico, San Miguel de Allende";
      startDate = "20261121T223000Z"; // 16:30 UTC-6 = 22:30 UTC
      endDate = "20261121T233000Z";
    } else {
      title = "Boda Valentina & Maximiliano - Gran Gala Nocturna";
      description = "Recepción de gala bajo las estrellas, banquete imperial y fiesta nupcial.";
      location = "Rancho Las Sabinas, Camino a la Cieneguita Km 4.2, San Miguel de Allende";
      startDate = "20261122T003000Z"; // 18:30 UTC-6 = 00:30 UTC (Nov 22)
      endDate = "20261122T083000Z";
    }

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ecrin Celeste//Valentina y Maximiliano//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `boda-valentina-maximiliano-${type}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Evento añadido a tu calendario');
  };


  // =========================================================================
  // 10. CELESTIAL TOAST UTILITY
  // =========================================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-star text-celestial-gold mr-2"></i> ${message}`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

});
