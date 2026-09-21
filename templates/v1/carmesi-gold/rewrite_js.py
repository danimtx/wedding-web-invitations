import re

with open('main.js', 'r', encoding='utf-8') as f:
    js = f.read()

# 1. Dynamic Island replacing Audio Wrapper
js = js.replace("const audioBtn = document.getElementById('audio-toggle-btn');", "const audioBtn = document.getElementById('di-play-btn');\nconst dynamicIsland = document.getElementById('dynamic-island');\nconst menuBtn = document.getElementById('di-menu-btn');\nconst diDropdown = document.getElementById('di-dropdown');")
js = js.replace("const iconState = document.querySelector('.audio-icon-state');", "const iconState = audioBtn.querySelector('i');")
js = js.replace("audioWrapper.classList.add('is-playing');", "dynamicIsland.classList.add('is-playing');")
js = js.replace("audioWrapper.classList.remove('is-playing');", "dynamicIsland.classList.remove('is-playing');")
js = js.replace("iconState.classList.remove('fa-music');\n      iconState.classList.add('fa-pause');", "iconState.classList.remove('fa-play');\n      iconState.classList.add('fa-pause');")
js = js.replace("iconState.classList.remove('fa-pause');\n      iconState.classList.add('fa-music');", "iconState.classList.remove('fa-pause');\n      iconState.classList.add('fa-play');")

# Add Dynamic Island Menu logic
di_logic = """
  // Dynamic Island Menu
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
    diDropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => diDropdown.classList.remove('show'));
    });
  }
"""
js = js.replace("  // 2. REPRODUCTOR DE AUDIO (STATE)", di_logic + "\n  // 2. REPRODUCTOR DE AUDIO (STATE)")

# 2. Envelope 3D Open Sequence
envelope_logic_old = """  const enterBtn = document.getElementById('enter-invitation-btn');
  const waxSeal = document.getElementById('wax-seal-img');
  
  function openInvitation() {
    // Romper sello
    if (waxSeal) waxSeal.classList.add('seal-break');
    
    // Reproducir música
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        audioWrapper.classList.add('is-playing');
        iconState.classList.remove('fa-music');
        iconState.classList.add('fa-pause');
        let vol = 0;
        const fadeAudio = setInterval(() => {
          if (vol < 0.6) {
            vol += 0.05;
            bgMusic.volume = vol;
          } else {
            clearInterval(fadeAudio);
          }
        }, 200);
      }).catch(e => console.log('Audio autoplay prevented'));
    }

    // Quitar overlay principal después de animación del sello
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
        setTimeout(() => {
          coverOverlay.style.display = 'none';
          document.body.style.overflow = 'auto'; // Permitir scroll
        }, 1100);
      }
    }, 600);
  }"""

envelope_logic_new = """  const enterBtn = document.getElementById('enter-invitation-btn');
  const waxSeal = document.getElementById('wax-seal-img');
  const envelopeScene = document.querySelector('.envelope-scene');
  
  function openInvitation() {
    // 3D Flap Open
    if (envelopeScene) envelopeScene.classList.add('is-open');
    
    // Reproducir música
    if (bgMusic && bgMusic.paused) {
      bgMusic.volume = 0;
      bgMusic.play().then(() => {
        dynamicIsland.classList.add('is-playing');
        iconState.classList.remove('fa-play');
        iconState.classList.add('fa-pause');
        let vol = 0;
        const fadeAudio = setInterval(() => {
          if (vol < 0.6) {
            vol += 0.05;
            bgMusic.volume = vol;
          } else {
            clearInterval(fadeAudio);
          }
        }, 200);
      }).catch(e => console.log('Audio autoplay prevented'));
    }

    // Quitar overlay después de la animación de 1.4s de la solapa
    setTimeout(() => {
      if (coverOverlay) {
        coverOverlay.classList.add('fade-out');
        setTimeout(() => {
          coverOverlay.style.display = 'none';
          document.body.style.overflow = 'auto'; // Permitir scroll
          // Stop heavy particles or logic in envelope if necessary
        }, 1100);
      }
    }, 1200);
  }"""
js = js.replace(envelope_logic_old, envelope_logic_new)

# 3. Add 3D Tilt Physics and Global Ambient Canvas
extra_js = """
  // ==========================================================================
  // 3D TILT PHYSICS (VIP CARDS)
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    });
  });

  // ==========================================================================
  // GLOBAL AMBIENT CANVAS (60FPS PARTICLES)
  // ==========================================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let width, height;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    // Offscreen canvas for particle texture (0 memory allocation in render loop)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(212,175,55,0.8)');
    gradient.addColorStop(0.4, 'rgba(212,175,55,0.3)');
    gradient.addColorStop(1, 'rgba(139,41,66,0)');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 32, 32);

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() * 2 + 1, // size scale
        vx: 0,
        vy: Math.random() * 0.5 + 0.2, // base vertical speed
        life: Math.random() * Math.PI * 2, // for sine wave
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmt: Math.random() * 1.5 + 0.5,
        baseX: Math.random() * width
      });
    }

    function render() {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        // Sway
        p.life += p.swaySpeed;
        p.x = p.baseX + Math.sin(p.life) * p.swayAmt * 10;
        
        // Move up
        p.y -= p.vy;
        
        // Mouse repulsion
        let dx = p.x - mouse.x;
        let dy = p.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          let force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 2;
          p.baseX += (dx / dist) * force * 2;
        }
        
        // Reset top
        if (p.y < -32) {
          p.y = height + 32;
          p.baseX = Math.random() * width;
        }

        ctx.globalAlpha = (Math.sin(p.life) + 1.5) * 0.3; // Pulsing opacity
        ctx.drawImage(pCanvas, p.x - 16 * p.s, p.y - 16 * p.s, 32 * p.s, 32 * p.s);
      }
      
      requestAnimationFrame(render);
    }
    render();
  }
"""

js = js + "\n" + extra_js

with open('main.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('main.js rewritten successfully')
