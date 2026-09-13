/**
 * L'Édition Nupciale - Main Interactive Engine
 * High-Fashion Editorial Magazine Lookbook
 * Includes Three.js 3D Silk Ribbon Untie, 3D Flip Card, Real-Time Calligraphy RSVP,
 * Audio Frequency Visualizer, and Chapter Scrubber Navigation.
 * 
 * Strict Constraint: Zero em-dashes used anywhere in this file.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. THREE.JS 3D SILK RIBBON UNTIE SIMULATION
  // =========================================================================
  const canvasRibbon = document.getElementById('canvas-ribbon-3d');
  const coverContainer = document.getElementById('magazine-cover-container');
  const gateLeft = document.getElementById('gate-left');
  const gateRight = document.getElementById('gate-right');
  const btnUntie = document.getElementById('btn-untie-ribbon');
  const medallion = document.getElementById('ribbon-medallion');
  const audioElement = document.getElementById('wedding-audio');
  const audioToggleBtn = document.getElementById('btn-toggle-audio');
  const audioIcon = document.getElementById('audio-icon');
  const audioWaveform = document.getElementById('audio-waveform');

  let ribbonScene, ribbonCamera, ribbonRenderer;
  let ribbonLeftMesh, ribbonRightMesh;
  let isUntying = false;
  let untieProgress = 0;
  let isCoverOpened = false;

  function initThreeRibbon() {
    if (!canvasRibbon || typeof THREE === 'undefined') return;

    const width = canvasRibbon.parentElement.clientWidth || window.innerWidth;
    const height = canvasRibbon.parentElement.clientHeight || window.innerHeight;

    ribbonScene = new THREE.Scene();
    ribbonCamera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    ribbonCamera.position.z = 50;

    ribbonRenderer = new THREE.WebGLRenderer({
      canvas: canvasRibbon,
      alpha: true,
      antialias: true
    });
    ribbonRenderer.setSize(width, height);
    ribbonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Warm Editorial Lighting
    const ambientLight = new THREE.AmbientLight(0xfff6e6, 1.2);
    ribbonScene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff0d0, 1.8);
    dirLight1.position.set(20, 30, 40);
    ribbonScene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc59b51, 1.0);
    dirLight2.position.set(-20, -20, 20);
    ribbonScene.add(dirLight2);

    // Silk Material (Champagne Gold with High Specular Sheen)
    const silkMaterial = new THREE.MeshStandardMaterial({
      color: 0xC59B51,
      roughness: 0.3,
      metalness: 0.35,
      side: THREE.DoubleSide
    });

    // Create Left Ribbon Half
    const ribbonGeomLeft = new THREE.PlaneGeometry(35, 4, 32, 4);
    ribbonLeftMesh = new THREE.Mesh(ribbonGeomLeft, silkMaterial);
    ribbonLeftMesh.position.set(-17.5, 0, 0);
    ribbonScene.add(ribbonLeftMesh);

    // Create Right Ribbon Half
    const ribbonGeomRight = new THREE.PlaneGeometry(35, 4, 32, 4);
    ribbonRightMesh = new THREE.Mesh(ribbonGeomRight, silkMaterial.clone());
    ribbonRightMesh.position.set(17.5, 0, 0);
    ribbonScene.add(ribbonRightMesh);

    // Animate Ribbon
    let clock = new THREE.Clock();

    function renderRibbon() {
      requestAnimationFrame(renderRibbon);
      const elapsedTime = clock.getElapsedTime();

      if (!isUntying) {
        // Gentle breathing wave motion on the silk ribbon
        const posLeft = ribbonGeomLeft.attributes.position;
        for (let i = 0; i < posLeft.count; i++) {
          const x = posLeft.getX(i);
          const wave = Math.sin(x * 0.15 + elapsedTime * 2) * 0.8;
          posLeft.setZ(i, wave);
        }
        ribbonGeomLeft.attributes.position.needsUpdate = true;

        const posRight = ribbonGeomRight.attributes.position;
        for (let i = 0; i < posRight.count; i++) {
          const x = posRight.getX(i);
          const wave = Math.sin(x * 0.15 + elapsedTime * 2) * 0.8;
          posRight.setZ(i, wave);
        }
        ribbonGeomRight.attributes.position.needsUpdate = true;

      } else if (untieProgress < 1) {
        // Ribbon unraveling physics
        untieProgress += 0.025;
        const ease = Math.pow(untieProgress, 2);

        ribbonLeftMesh.position.x = -17.5 - ease * 40;
        ribbonLeftMesh.position.y -= ease * 1.5;
        ribbonLeftMesh.rotation.z -= 0.03;
        ribbonLeftMesh.rotation.y += 0.02;

        ribbonRightMesh.position.x = 17.5 + ease * 40;
        ribbonRightMesh.position.y -= ease * 1.5;
        ribbonRightMesh.rotation.z += 0.03;
        ribbonRightMesh.rotation.y -= 0.02;

        silkMaterial.opacity = Math.max(0, 1 - untieProgress);
        silkMaterial.transparent = true;
      }

      ribbonRenderer.render(ribbonScene, ribbonCamera);
    }

    renderRibbon();

    window.addEventListener('resize', () => {
      const newW = canvasRibbon.parentElement.clientWidth || window.innerWidth;
      const newH = canvasRibbon.parentElement.clientHeight || window.innerHeight;
      ribbonCamera.aspect = newW / newH;
      ribbonCamera.updateProjectionMatrix();
      ribbonRenderer.setSize(newW, newH);
    });
  }

  function untieAndOpenMagazine() {
    if (isCoverOpened) return;
    isCoverOpened = true;
    isUntying = true;

    // Trigger Gold Confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#C59B51', '#DFBA73', '#FAF7F2', '#8C672A']
      });
    }

    // Hide Medallion
    if (medallion) {
      medallion.style.transition = 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1), opacity 0.5s ease';
      medallion.style.transform = 'translate(-50%, -50%) scale(1.4)';
      medallion.style.opacity = '0';
    }

    // Gate-fold Split Open
    setTimeout(() => {
      if (gateLeft) gateLeft.style.transform = 'translateX(-100%)';
      if (gateRight) gateRight.style.transform = 'translateX(100%)';
      if (coverContainer) coverContainer.classList.add('is-opened');

      // Start Audio Safely
      startAudioPlayback();
    }, 450);
  }

  if (btnUntie) {
    btnUntie.addEventListener('click', untieAndOpenMagazine);
  }
  if (medallion) {
    medallion.addEventListener('click', untieAndOpenMagazine);
  }
  if (canvasRibbon) {
    canvasRibbon.addEventListener('click', untieAndOpenMagazine);
  }

  initThreeRibbon();


  // =========================================================================
  // 2. AUDIO CONTROLLER & FREQUENCY VISUALIZER
  // =========================================================================
  let isAudioPlaying = false;

  function startAudioPlayback() {
    if (!audioElement) return;
    audioElement.play().then(() => {
      isAudioPlaying = true;
      updateAudioUI();
    }).catch(() => {
      // Autoplay blocked by browser policy until direct button click
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
  // 3. EDITORIAL CHRONOMETER / COUNTDOWN (NOV 14, 2026, 16:30)
  // =========================================================================
  const targetWeddingDate = new Date('2026-11-14T16:30:00-06:00').getTime();
  const elDays = document.getElementById('countdown-days');
  const elHours = document.getElementById('countdown-hours');
  const elMinutes = document.getElementById('countdown-minutes');
  const elSeconds = document.getElementById('countdown-seconds');

  function updateCountdown() {
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

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // =========================================================================
  // 4. INTERACTIVE 3D FLIP CARD (GIFTS & HONEYMOON FUND)
  // =========================================================================
  const cardFlipper = document.getElementById('card-3d-flipper');
  const btnCopyClabe = document.getElementById('btn-copy-clabe');
  const clabeElement = document.getElementById('clabe-number');

  if (cardFlipper) {
    cardFlipper.addEventListener('click', (e) => {
      // Prevent flipping if clicked directly on the copy button
      if (e.target.closest('#btn-copy-clabe')) return;
      cardFlipper.classList.toggle('is-flipped');
    });
  }

  if (btnCopyClabe && clabeElement) {
    btnCopyClabe.addEventListener('click', (e) => {
      e.stopPropagation();
      const clabeText = clabeElement.textContent.replace(/\s+/g, '');
      navigator.clipboard.writeText(clabeText).then(() => {
        showToast('CLABE copiada al portapapeles con éxito');
        btnCopyClabe.innerHTML = '<i class="fa-solid fa-check"></i> ¡CLABE COPIADA!';
        setTimeout(() => {
          btnCopyClabe.innerHTML = '<i class="fa-regular fa-copy"></i> COPIAR CLABE INTERBANCARIA';
        }, 3000);
      }).catch(() => {
        showToast('Error al copiar. Por favor copie manualmente: ' + clabeText);
      });
    });
  }


  // =========================================================================
  // 5. REAL-TIME CALLIGRAPHY RSVP & PASS GENERATOR
  // =========================================================================
  const inputRsvpName = document.getElementById('rsvp-name');
  const calligraphyName = document.getElementById('calligraphy-guest-name');
  const calligraphyPassCount = document.getElementById('calligraphy-pass-count');
  const calligraphyStatus = document.getElementById('calligraphy-guest-status');
  const calligraphyBadge = document.getElementById('calligraphy-status-badge');
  const selectPasses = document.getElementById('rsvp-passes');
  const radioAttendance = document.querySelectorAll('input[name="attendance"]');
  const rsvpForm = document.getElementById('rsvp-form');

  // Real-time Guest Name update
  if (inputRsvpName && calligraphyName) {
    inputRsvpName.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val.length > 0) {
        calligraphyName.textContent = val;
      } else {
        calligraphyName.textContent = 'Distinguido Invitado';
      }
    });
  }

  // Real-time Passes count
  if (selectPasses && calligraphyPassCount) {
    selectPasses.addEventListener('change', (e) => {
      const count = e.target.value;
      calligraphyPassCount.textContent = count === '1' ? '1 Boleto' : count + ' Boletos';
    });
  }

  // Real-time Attendance Choice
  if (radioAttendance.length > 0) {
    radioAttendance.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === 'accepted') {
          if (calligraphyBadge) {
            calligraphyBadge.textContent = 'CONFIRMADO';
            calligraphyBadge.className = 'font-sans text-[10px] tracking-widest text-vogue-gold uppercase font-bold';
          }
          if (calligraphyStatus) {
            calligraphyStatus.textContent = 'Aguardamos con ilusión el honor de celebrar juntos en San Miguel de Allende.';
          }
        } else {
          if (calligraphyBadge) {
            calligraphyBadge.textContent = 'DECLINADO';
            calligraphyBadge.className = 'font-sans text-[10px] tracking-widest text-vogue-muted uppercase font-bold';
          }
          if (calligraphyStatus) {
            calligraphyStatus.textContent = 'Lamentamos su ausencia; su aprecio nos acompaña con cariño en esta celebración.';
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
        showToast('Por favor ingrese su nombre para el registro');
        return;
      }

      // Celebratory Confetti
      if (attendance === 'accepted' && typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#C59B51', '#DFBA73', '#1A1817', '#E2C485']
        });
      }

      showToast('Confirmación recibida. Gracias por responder, ' + guestName);

      // Disable inputs to show completed state
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
        submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> CONFIRMACIÓN REGISTRADA CON HONOR';
      }
    });
  }


  // =========================================================================
  // 6. EDITORIAL CHAPTER SCRUBBER BAR (SCROLLSPY)
  // =========================================================================
  const sections = document.querySelectorAll('.lookbook-section');
  const chapterLinks = document.querySelectorAll('.chapter-link');
  const scrubberBar = document.getElementById('chapter-scrubber-bar');

  function updateActiveChapter() {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      chapterLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentId) {
          link.classList.add('active');

          // Ensure active pill is scrolled into view smoothly on mobile
          if (scrubberBar) {
            const leftPos = link.offsetLeft - scrubberBar.offsetWidth / 2 + link.offsetWidth / 2;
            scrubberBar.scrollTo({ left: leftPos, behavior: 'smooth' });
          }
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveChapter, { passive: true });


  // =========================================================================
  // 7. EDITORIAL GALLERY LIGHTBOX
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
  // 8. CALENDAR EVENT (.ICS) GENERATOR
  // =========================================================================
  window.downloadCalendarEvent = function(type) {
    let title, description, location, startDate, endDate;

    if (type === 'ceremony') {
      title = "Boda Sofía & Leonardo - Ceremonia Religiosa";
      description = "Ceremonia Nupcial de Sofía de la Torre y Leonardo Alba en San Miguel de Allende.";
      location = "Capilla de San Antonio, Calle del Campanario N° 14, Centro Histórico, San Miguel de Allende";
      startDate = "20261114T223000Z"; // 16:30 UTC-6 = 22:30 UTC
      endDate = "20261114T233000Z";
    } else {
      title = "Boda Sofía & Leonardo - Gran Gala & Recepción";
      description = "Recepción de gala, banquete en 4 tiempos y celebración nupcial.";
      location = "Hacienda Las Trinitarias, Valle de Alcocer, San Miguel de Allende";
      startDate = "20261115T003000Z"; // 18:30 UTC-6 = 00:30 UTC (Nov 15)
      endDate = "20261115T080000Z";
    }

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Edition Nupciale//Sofía y Leonardo//ES",
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
    link.setAttribute('download', `boda-sofia-leonardo-${type}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Evento añadido a tu calendario');
  };


  // =========================================================================
  // 9. TOAST NOTIFICATION UTILITY
  // =========================================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-vogue-gold mr-2"></i> ${message}`;
    container.appendChild(toast);

    // Trigger reveal
    setTimeout(() => toast.classList.add('show'), 50);

    // Fade out and remove
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  }

});
