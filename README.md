# Invitaciones Web para Bodas (Wedding Invitations UI)

Este repositorio contiene una colección de **plantillas y modelos de invitaciones web interactivas para bodas**. Cada diseño está pensado como una landing page estática, moderna, totalmente responsiva y altamente personalizable, construida sin frameworks complejos, únicamente con HTML5, CSS3 y JavaScript (Vanilla).

## ✨ Características de las Invitaciones

*   **Diseño Premium y Responsivo:** Interfaces diseñadas con el enfoque "Mobile-First", utilizando técnicas modernas como *Glassmorphism*, sombras suaves y tipografías elegantes (Google Fonts).
*   **Reproductor de Audio:** Música de fondo integrada con botón flotante interactivo.
*   **Cuenta Regresiva (Countdown):** Temporizador dinámico en tiempo real hasta el día del evento.
*   **RSVP por WhatsApp:** Formulario de confirmación de asistencia que genera un mensaje automático y estructurado directo al WhatsApp de los novios.
*   **Lluvia de Sobres / Mesa de Regalos:** Sección con opción interactiva para copiar la cuenta bancaria o CLABE con un solo clic (toast notification).
*   **Itinerario Dinámico y Mapas:** Línea de tiempo del evento y botones con enlaces directos a Google Maps para la ubicación de la ceremonia y recepción.

## 📂 Estructura del Repositorio

El proyecto está organizado de manera modular por generaciones:

*   **`core/`**: Motor central y componentes reutilizables para la arquitectura v2 y v3.
    *   `css/`: `reset.css` y `tokens.css` (escalas de espaciado, sombras y transiciones compartidas).
    *   `js/`: `audio-controller.js`, `countdown.js`, `rsvp-whatsapp.js`, `copy-clipboard.js`, `scroll-observer.js`.
*   **`templates/`**:
    *   **`v1/`**: Las 11 plantillas clásicas monolíticas autosuficientes (`carmesi-gold`, `model-edition-vogue`, `model-ecrin-celeste`, etc.).
    *   **`v2/`**: La nueva generación orientada a configuración.
        *   `_starter-kit/`: Kit inicial para crear nuevos modelos con separación de datos (`wedding.config.js`), tokens de diseño y módulos JS desacoplados.
    *   **`v3/`**: Espacio reservado para futura expansión (WebGL, Three.js shaders interactivos).
*   **`shared_assets/`**: Galería global de canciones MP3, iconos y texturas.
*   **`index.html`**: Dashboard y catálogo interactivo de gestión de plantillas (con vistas Lista, Grid y Kanban, búsqueda instantánea y filtros).

## 🛠️ Skill de Desarrollo: `wedding-invitation-builder`

Dentro del repositorio, en la ruta `.agents/skills/wedding-invitation-builder/`, se incluye la Skill personalizada con los lineamientos de diseño, paletas y estructura obligatoria de 14 secciones.

## 🚀 Cómo crear una nueva plantilla v2

1. Duplica la carpeta `templates/v2/_starter-kit/` y renómbrala a tu nuevo modelo (ej. `templates/v2/model-nombre-estilo/`).
2. Edita `wedding.config.js` para personalizar novios, fechas, lugares, cuenta bancaria y RSVP.
3. Personaliza la paleta en `:root` dentro de `styles.css`.
4. Añade tus imágenes a `assets/`.
5. Abre `index.html` del modelo para probarlo en el navegador.
