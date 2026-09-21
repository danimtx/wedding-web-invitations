/**
 * Core WhatsApp RSVP Formatter
 * Formats a clean, structured confirmation message and opens WhatsApp chat.
 */

export function initRSVP(formSelector, config = {}) {
  const form = typeof formSelector === 'string' ? document.querySelector(formSelector) : formSelector;
  if (!form) return null;

  const phone = config.phone || '+59170000000';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const guestName = (formData.get('guestName') || formData.get('name') || '').toString().trim();
    const attendance = (formData.get('attendance') || 'yes').toString();
    const guestsCount = formData.get('guestsCount') || formData.get('pases') || '1';
    const message = (formData.get('message') || '').toString().trim();
    const dietary = (formData.get('dietary') || '').toString().trim();

    if (!guestName) {
      alert('Por favor, ingresa tu nombre completo.');
      return;
    }

    const isAttending = attendance === 'yes' || attendance === 'si' || attendance === 'confirmado';

    let text = `💍 *CONFIRMACIÓN DE ASISTENCIA*\n\n`;
    text += `👤 *Invitado:* ${guestName}\n`;
    text += `✨ *Estado:* ${isAttending ? '¡Sí, asistiré con mucho gusto! 🎉' : 'Lamentablemente no podré asistir 🤍'}\n`;
    
    if (isAttending) {
      text += `👥 *Lugares confirmados:* ${guestsCount}\n`;
    }
    
    if (dietary) {
      text += `🥗 *Restricción alimentaria:* ${dietary}\n`;
    }

    if (message) {
      text += `💌 *Mensaje con amor:* "${message}"\n`;
    }

    text += `\n_Enviado desde la invitación digital_`;

    const encoded = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;

    window.open(whatsappUrl, '_blank');
  });

  return form;
}
