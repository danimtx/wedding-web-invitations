/**
 * Core Countdown Timer
 * Calculates remaining days, hours, minutes, seconds to a target wedding date
 * and updates DOM elements smoothly.
 */

export function initCountdown(targetDateString, containerSelector, onExpire = null) {
  const container = typeof containerSelector === 'string' ? document.querySelector(containerSelector) : containerSelector;
  if (!container) return null;

  const targetDate = new Date(targetDateString).getTime();
  if (isNaN(targetDate)) {
    console.error(`[Countdown] Invalid date: ${targetDateString}`);
    return null;
  }

  const daysEl = container.querySelector('[data-days]');
  const hoursEl = container.querySelector('[data-hours]');
  const minutesEl = container.querySelector('[data-minutes]');
  const secondsEl = container.querySelector('[data-seconds]');

  const padZero = (num) => String(num).padStart(2, '0');

  const update = () => {
    const now = Date.now();
    const distance = targetDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      clearInterval(interval);
      if (typeof onExpire === 'function') onExpire();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = padZero(days);
    if (hoursEl) hoursEl.textContent = padZero(hours);
    if (minutesEl) minutesEl.textContent = padZero(minutes);
    if (secondsEl) secondsEl.textContent = padZero(seconds);
  };

  update();
  const interval = setInterval(update, 1000);

  return {
    stop: () => clearInterval(interval),
    update
  };
}
