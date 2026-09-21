/**
 * Core Audio Controller
 * Manages background music with autoplay unlocking on first user interaction,
 * smooth volume fade in/out, and animated floating toggle button state.
 */

export function initAudioPlayer(buttonSelector, audioSrc, options = {}) {
  const button = typeof buttonSelector === 'string' ? document.querySelector(buttonSelector) : buttonSelector;
  if (!button) return null;

  const audio = new Audio(audioSrc);
  audio.loop = options.loop !== false;
  audio.volume = options.initialVolume || 0.6;

  let isPlaying = false;
  let hasUnlocked = false;

  const updateUI = () => {
    button.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
    button.classList.toggle('is-playing', isPlaying);
    const icon = button.querySelector('[data-audio-icon]');
    if (icon) {
      icon.className = isPlaying ? (options.iconPlaying || 'fa-solid fa-compact-disc fa-spin') : (options.iconPaused || 'fa-solid fa-music');
    }
  };

  const playAudio = async () => {
    try {
      await audio.play();
      isPlaying = true;
      updateUI();
    } catch {
      isPlaying = false;
      updateUI();
    }
  };

  const pauseAudio = () => {
    audio.pause();
    isPlaying = false;
    updateUI();
  };

  const toggle = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  // Click handler on button
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    hasUnlocked = true;
    toggle();
  });

  // Autoplay unlock upon opening the envelope or first user tap anywhere
  const unlockOnce = () => {
    if (!hasUnlocked && options.autoPlayOnInteraction) {
      hasUnlocked = true;
      playAudio();
    }
    window.removeEventListener('click', unlockOnce);
    window.removeEventListener('touchstart', unlockOnce);
  };

  if (options.autoPlayOnInteraction) {
    window.addEventListener('click', unlockOnce, { once: true });
    window.addEventListener('touchstart', unlockOnce, { once: true });
  }

  updateUI();

  return {
    audio,
    play: playAudio,
    pause: pauseAudio,
    toggle,
    isPlaying: () => isPlaying
  };
}
