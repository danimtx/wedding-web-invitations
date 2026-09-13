/**
 * LA SERRE DE CRISTAL / MAIN BOTANICAL ENGINE
 * Model: Jardin Rose (French Glasshouse & Rose Garden)
 * Couple: Isabella Mendoza & Julian Arboleda
 * Zero em-dashes constraint strictly enforced
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. GLOBAL STATE & CONFIGURATION
  // =========================================================================
  const WEDDING_DATE = new Date('2026-12-12T16:30:00-06:00'); // San Miguel de Allende (UTC-6)
  const CLABE_NUMBER = '012180013948201948';

  // DOM Elements Cache
  const entrance = document.getElementById('glasshouse-entrance');
  const doorGate = document.querySelector('.glass-doors-gate');
  const btnOpenEntrance = document.getElementById('btn-open-glasshouse');
  const entranceCard = document.getElementById('entrance-medallion-card');
  const canvasPetals = document.getElementById('canvas-rose-petals');

  const audio = document.getElementById('wedding-audio');
  const btnAudioToggle = document.getElementById('btn-toggle-audio');
  const audioIcon = document.getElementById('audio-icon');
  const roseWaveform = document.getElementById('rose-waveform');

  const countdownDays = document.getElementById('countdown-days');
  const countdownHours = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');

  const velvetBoxContainer = document.getElementById('velvet-box-container');
  const btnCopyClabe = document.getElementById('btn-copy-clabe');

  const rsvpForm = document.getElementById('jardin-rsvp-form');
  const rsvpName = document.getElementById('rsvp-name');
  const rsvpPasses = document.getElementById('rsvp-passes');
  const calligraphyGuestName = document.getElementById('calligraphy-guest-name');
  const calligraphyPassCount = document.getElementById('calligraphy-pass-count');
  const calligraphyStatus = document.getElementById('calligraphy-guest-status');

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
    toast.innerHTML = `<i class="fa-solid fa-leaf text-jardin-gold mr-2"></i> ${message}`;
    toastContainer.appendChild(toast);

    // Trigger reflow & show
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
  // 3. THREE.JS 3D FLOATING ROSE PETAL SIMULATION
  // =========================================================================
  let scene, camera, renderer, petalsGroup;
  let petalMeshes = [];
  let isVortexActive = false;
  let animationFrameId;

  function initPetalSimulation() {
    if (!canvasPetals || typeof THREE === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 25;

    renderer = new THREE.WebGLRenderer({
      canvas: canvasPetals,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient and Directional Rose Light
    const ambientLight = new THREE.AmbientLight(0xfff0f5, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffe4e1, 1.2);
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    // Procedural Rose Petal Geometry using 2D bezier curve shape
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.6, 0.8, 1.2, 1.6, 0.9, 2.4);
    petalShape.bezierCurveTo(0.6, 3.0, -0.6, 3.0, -0.9, 2.4);
    petalShape.bezierCurveTo(-1.2, 1.6, -0.6, 0.8, 0, 0);

    const petalGeometry = new THREE.ShapeGeometry(petalShape, 12);
    petalGeometry.center();

    // Rose Petal Color Palette
    const petalColors = [0xebb3a8, 0xfcdcd4, 0xe2a698, 0xc48477, 0xf7d2cc];
    petalsGroup = new THREE.Group();

    const PETAL_COUNT = 85;
    for (let i = 0; i < PETAL_COUNT; i++) {
      const color = petalColors[Math.floor(Math.random() * petalColors.length)];
      const material = new THREE.MeshStandardMaterial({
        color: color,
        side: THREE.DoubleSide,
        roughness: 0.45,
        metalness: 0.1,
        transparent: true,
        opacity: 0.85
      });

      const mesh = new THREE.Mesh(petalGeometry, material);
      
      // Random Initial Placement
      mesh.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20
      );

      const scale = 0.35 + Math.random() * 0.45;
      mesh.scale.set(scale, scale, scale);

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Custom Kinematics Attributes
      mesh.userData = {
        speedY: 0.015 + Math.random() * 0.025,
        speedX: (Math.random() - 0.5) * 0.01,
        rotSpeedX: (Math.random() - 0.5) * 0.018,
        rotSpeedY: (Math.random() - 0.5) * 0.022,
        rotSpeedZ: (Math.random() - 0.5) * 0.015,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02
      };

      petalMeshes.push(mesh);
      petalsGroup.add(mesh);
    }

    scene.add(petalsGroup);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      for (let i = 0; i < petalMeshes.length; i++) {
        const p = petalMeshes[i];
        const u = p.userData;

        if (isVortexActive) {
          // Petal explosion swirl outwards when doors open
          p.position.x += (p.position.x > 0 ? 0.35 : -0.35) * (1 + Math.random() * 0.5);
          p.position.y += (Math.random() - 0.2) * 0.4;
          p.position.z += (Math.random() - 0.5) * 0.3;
          p.rotation.x += u.rotSpeedX * 5;
          p.rotation.y += u.rotSpeedY * 5;
          p.material.opacity = Math.max(0, p.material.opacity - 0.015);
        } else {
          // Gentle ambient floating fall
          p.position.y -= u.speedY;
          p.userData.swayPhase += u.swaySpeed;
          p.position.x += Math.sin(u.swayPhase) * 0.025 + u.speedX;

          p.rotation.x += u.rotSpeedX;
          p.rotation.y += u.rotSpeedY;
          p.rotation.z += u.rotSpeedZ;

          // Wrap around top if fallen below view
          if (p.position.y < -18) {
            p.position.y = 18;
            p.position.x = (Math.random() - 0.5) * 35;
          }
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      if (!camera || !renderer) return;
      const nw = window.innerWidth;
      const nh = window.innerHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
  }

  // =========================================================================
  // 4. GLASSHOUSE ENTRANCE & GUEST ACCESS
  // =========================================================================
  function enterGlasshouse() {
    if (!entrance || entrance.classList.contains('is-opened')) return;

    // Trigger Petal Vortex
    isVortexActive = true;

    // Open French Double Doors
    if (doorGate) {
      doorGate.classList.add('is-open');
    }

    // Play Audio Automatically upon user gesture
    playAudioSafely();

    // Rose Petal Confetti Burst
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#EBB3A8', '#E2A698', '#FCDCD4', '#FFFFFF', '#8C9A80'],
        shapes: ['circle']
      });
    }

    // Fade out entrance overlay
    setTimeout(() => {
      entrance.classList.add('is-opened');
      showToast('BIENVENIDO A LA SERRE DE CRISTAL');
    }, 700);

    // Remove from layout after animation completes
    setTimeout(() => {
      entrance.style.display = 'none';
      // Cancel Three.js animation frame to release GPU resources
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }, 1600);
  }

  if (btnOpenEntrance) {
    btnOpenEntrance.addEventListener('click', enterGlasshouse);
  }

  // =========================================================================
  // 5. AUDIO CONTROLLER & ROSE WAVEFORM
  // =========================================================================
  let isAudioPlaying = false;

  function updateAudioUI(playing) {
    isAudioPlaying = playing;
    if (playing) {
      if (audioIcon) {
        audioIcon.classList.remove('fa-play');
        audioIcon.classList.add('fa-pause');
      }
      if (roseWaveform) {
        roseWaveform.classList.add('is-playing');
      }
    } else {
      if (audioIcon) {
        audioIcon.classList.remove('fa-pause');
        audioIcon.classList.add('fa-play');
      }
      if (roseWaveform) {
        roseWaveform.classList.remove('is-playing');
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
          // Autoplay was prevented; wait for user interaction
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

  if (roseWaveform) {
    roseWaveform.addEventListener('click', toggleAudio);
  }

  // =========================================================================
  // 6. L'HORLOGE BOTANIQUE (COUNTDOWN TIMER)
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
  // 7. 3D FRENCH VELVET BOX & CLABE CLIPBOARD COPY
  // =========================================================================
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
      showToast('CLABE INTERBANCARIA COPIADA');
    } catch (e) {
      showToast('COPIA MANUAL: ' + text);
    }
    document.body.removeChild(textArea);
  }

  if (btnCopyClabe) {
    btnCopyClabe.addEventListener('click', function (e) {
      e.stopPropagation();
      copyClabeToClipboard();
    });
  }

  if (velvetBoxContainer) {
    velvetBoxContainer.addEventListener('click', function () {
      // Subtle pulse and copy action
      copyClabeToClipboard();
    });
  }

  // =========================================================================
  // 8. REAL-TIME SCRIPT CALLIGRAPHY RSVP
  // =========================================================================
  if (rsvpName && calligraphyGuestName) {
    rsvpName.addEventListener('input', function (e) {
      const val = e.target.value.trim();
      if (val.length > 0) {
        calligraphyGuestName.textContent = val;
      } else {
        calligraphyGuestName.textContent = 'Distinguido Invitado';
      }
    });
  }

  if (rsvpPasses && calligraphyPassCount) {
    rsvpPasses.addEventListener('change', function (e) {
      const count = e.target.value;
      calligraphyPassCount.textContent = count === '1' ? '1 Boleto' : count + ' Boletos';
    });
  }

  const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
  attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function (e) {
      if (!calligraphyStatus) return;
      if (e.target.value === 'accepted') {
        calligraphyStatus.textContent = 'Aguardamos con ilusión el honor de celebrar juntos en San Miguel de Allende.';
        calligraphyStatus.className = 'font-sans text-xs tracking-wider text-jardin-charcoal';
      } else {
        calligraphyStatus.textContent = 'Agradecemos con cariño sus bendiciones y buenos deseos a la distancia.';
        calligraphyStatus.className = 'font-sans text-xs tracking-wider text-jardin-muted italic';
      }
    });
  });

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const guestName = rsvpName ? rsvpName.value.trim() : 'Invitado';
      const attendance = document.querySelector('input[name="attendance"]:checked')?.value || 'accepted';

      if (typeof confetti === 'function' && attendance === 'accepted') {
        confetti({
          particleCount: 110,
          spread: 90,
          origin: { y: 0.7 },
          colors: ['#EBB3A8', '#E2A698', '#FCDCD4', '#FAF7F5', '#A86154']
        });
      }

      showToast(`¡GRACIAS, ${guestName.toUpperCase()}! RESPUESTA REGISTRADA.`);

      // Disable submit button gracefully
      const submitBtn = rsvpForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-check mr-2"></i> CONFIRMACIÓN REGISTRADA';
        submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
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
  // 10. CALENDAR EXPORT (.ICS FILE GENERATOR)
  // =========================================================================
  window.downloadJardinCalendar = function (type) {
    let title, description, location, dtStart, dtEnd;

    if (type === 'ceremony') {
      title = 'Boda Isabella & Julian / Ceremonia Religiosa';
      description = 'Ceremonia religiosa nupcial en la Parroquia de San Miguel Arcángel.';
      location = 'Parroquia de San Miguel Arcángel, San Miguel de Allende, Guanajuato, México';
      dtStart = '20261212T163000';
      dtEnd = '20261212T180000';
    } else {
      title = 'Boda Isabella & Julian / Gala en La Serre de Cristal';
      description = 'Recepción, banquete gastronómico y fiesta nupcial en el Invernadero Las Trinitarias.';
      location = 'Invernadero Las Trinitarias, Camino a la Alborada Km 3.5, San Miguel de Allende, Guanajuato, México';
      dtStart = '20261212T183000';
      dtEnd = '20261213T040000';
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//La Serre de Cristal//Isabella y Julian//ES',
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
    link.setAttribute('download', `Boda-Isabella-Julian-${type}.ics`);
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
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    dockLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateDockActiveState, { passive: true });

  // =========================================================================
  // 12. INITIALIZATION ROUTINE
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initPetalSimulation();
    updateCountdown();
    setInterval(updateCountdown, 1000);
    updateDockActiveState();
  });

})();
