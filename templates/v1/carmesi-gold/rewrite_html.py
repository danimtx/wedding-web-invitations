import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Insert fixed-bg, canvas, and svg defs after <body>
svg_defs = """
  <!-- HIGH COUTURE FIXED BACKGROUND & CANVAS -->
  <div class="fixed-bg-layer"></div>
  <canvas id="ambient-canvas" class="ambient-canvas"></canvas>

  <!-- SVG CLIP-PATHS FOR SILHOUETTES -->
  <svg width="0" height="0" class="svg-defs" style="position:absolute;">
    <defs>
      <clipPath id="clip-gothic-arch" clipPathUnits="objectBoundingBox">
        <path d="M0,1 L0,0.3 C0.1,0.1 0.5,0 0.5,0 C0.5,0 0.9,0.1 1,0.3 L1,1 Z" />
      </clipPath>
      <clipPath id="clip-cameo" clipPathUnits="objectBoundingBox">
        <ellipse cx="0.5" cy="0.5" rx="0.5" ry="0.5" />
      </clipPath>
    </defs>
  </svg>
"""
html = html.replace('<body>', '<body>\n' + svg_defs)

# 2. Replace audio controller with Dynamic Island
audio_old = """  <!-- FLOATING AUDIO CONTROLLER -->
  <div class="audio-control-wrapper" id="audio-control-wrapper">
    <button id="audio-toggle-btn" class="audio-floating-btn" aria-label="Reproducir / Pausar Música">
      <div class="audio-disc-rim"></div>
      <i class="fa-solid fa-music audio-icon-state"></i>
      <div class="audio-waves">
        <span></span><span></span><span></span><span></span>
      </div>
    </button>
    <div class="audio-tooltip">Música: A Thousand Years</div>
  </div>"""

island = """  <!-- DYNAMIC ISLAND (APPLE STYLE) -->
  <nav class="dynamic-island" id="dynamic-island">
    <div class="di-vinyl-wrap"><div class="di-vinyl" id="di-vinyl"></div></div>
    <div class="di-info">
      <span class="di-title">A Thousand Years</span>
      <span class="di-eq" id="di-eq"><i></i><i></i><i></i><i></i></span>
    </div>
    <button id="di-play-btn" class="di-btn" aria-label="Play/Pause"><i class="fa-solid fa-play"></i></button>
    <button id="di-menu-btn" class="di-btn" aria-label="Menu"><i class="fa-solid fa-bars"></i></button>
  </nav>
  <div class="di-dropdown" id="di-dropdown">
    <a href="#section-hero">Inicio</a>
    <a href="#section-countdown">Cuenta Regresiva</a>
    <a href="#section-events">Ubicaciones</a>
    <a href="#section-gifts">Mesa de Regalos</a>
  </div>"""
html = html.replace(audio_old, island)

# 3. Add classes to images and cards
html = html.replace('class="hero-img"', 'class="hero-img clip-shape-arch"')
html = html.replace('class="story-card-img-wrap"', 'class="story-card-img-wrap clip-shape-cameo"')
html = html.replace('class="hotel-card glass-card stagger-child"', 'class="hotel-card glass-card stagger-child tilt-card"')
html = html.replace('class="gift-option-card stagger-child"', 'class="gift-option-card stagger-child tilt-card"')

# 4. Replace straight floral dividers with organic svg dividers
divider_old = '<img src="assets/svg/luxury-floral-divider.svg" alt="" class="decor-divider-svg">'
divider_new = """<!-- Organic SVG Wave Divider -->
          <svg class="organic-divider" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,100 600,-50 1200,80 L1200,120 L0,120 Z" fill="rgba(139,41,66,0.15)"/>
            <path d="M0,50 C400,120 800,20 1200,100 L1200,120 L0,120 Z" fill="rgba(212,175,55,0.05)"/>
          </svg>"""
html = html.replace(divider_old, divider_new)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('index.html rewritten successfully')
