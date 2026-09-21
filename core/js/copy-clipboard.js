/**
 * Core Copy to Clipboard & Toast
 * Copies text (e.g. bank account or CLABE) and displays an elegant floating feedback toast.
 */

export function initCopyButtons(buttonSelector = '[data-copy-target]', options = {}) {
  const buttons = document.querySelectorAll(buttonSelector);

  const showToast = (message) => {
    let toast = document.getElementById('core-copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'core-copy-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #111;
        color: #fff;
        padding: 12px 24px;
        border-radius: 9999px;
        font-family: inherit;
        font-size: 14px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        border: 1px solid rgba(255,255,255,0.15);
        opacity: 0;
        pointer-events: none;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        z-index: 99999;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid fa-check" style="color: #4ade80;"></i> ${message || '¡Copiado al portapapeles!'}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(20px)';
    }, options.duration || 2500);
  };

  buttons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const targetText = btn.getAttribute('data-copy-text') || btn.textContent.trim();
      try {
        await navigator.clipboard.writeText(targetText);
        showToast(options.successMessage || '¡Número de cuenta copiado!');
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = targetText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(options.successMessage || '¡Número de cuenta copiado!');
      }
    });
  });

  return { showToast };
}
