/**
 * Core Scroll Observer
 * Adds reveal animations when sections and cards enter the viewport.
 */

export function initScrollObserver(selector = '[data-reveal]', options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return null;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        if (!options.repeat) {
          obs.unobserve(entry.target);
        }
      } else if (options.repeat) {
        entry.target.classList.remove('is-revealed');
      }
    });
  }, {
    root: null,
    threshold: options.threshold || 0.15,
    rootMargin: options.rootMargin || '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));

  return observer;
}
