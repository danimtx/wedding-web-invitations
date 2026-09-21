/**
 * Template v2 Entry Point (Skeleton Boilerplate)
 * Conecta los datos de wedding.config.js con los módulos reutilizables de core/
 */

// 1. Configuración de la Boda
import { weddingConfig } from './wedding.config.js';

// 2. Módulos Reutilizables del Core
import { initAudioPlayer } from '../../core/js/audio-controller.js';
import { initCountdown } from '../../core/js/countdown.js';
import { initRSVP } from '../../core/js/rsvp-whatsapp.js';
import { initCopyButtons } from '../../core/js/copy-clipboard.js';
import { initScrollObserver } from '../../core/js/scroll-observer.js';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializa aquí los módulos que requiera tu diseño:
  //
  // - Reproductor de Música:
  //   initAudioPlayer('#audio-toggle', weddingConfig.audio.src);
  //
  // - Cuenta Regresiva:
  //   initCountdown(weddingConfig.event.date, '#countdown');
  //
  // - Formulario RSVP por WhatsApp:
  //   initRSVP('#rsvp-form', { phone: weddingConfig.rsvp.whatsappPhone });
  //
  // - Botones para copiar cuenta bancaria con Toast:
  //   initCopyButtons('[data-copy-target]');
  //
  // - Animaciones al hacer scroll:
  //   initScrollObserver('[data-reveal]');
});
