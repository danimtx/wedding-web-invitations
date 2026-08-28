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

El proyecto está organizado de manera modular:

*   **`templates/`**: Aquí viven todos los diseños completos (ej. `carmesi-gold`, `dark-luxury-1`, `dark-marble-kintsugi`). Cada carpeta es una invitación web 100% independiente con su código (`index.html`, `styles.css`, `main.js`) y sus recursos (`assets/`).
*   **`shared_assets/`**: Es la caja de herramientas global del proyecto de donde sacamos piezas para construir nuevas invitaciones.
    *   **`audio/`**: Banco de canciones de fondo en MP3.
    *   **`icons/`**: Colección de archivos vectoriales e iconos genéricos (SVG).
    *   **`images/`**: Galería de texturas de acuarela, papel, mármol, flores y marcos decorativos.
*   **`scripts/`**: Utilidades y pequeños scripts de ayuda para el desarrollo del proyecto.

## 🛠️ Skill de Desarrollo: `wedding-invitation-builder`

Dentro del repositorio, en la ruta `.agents/skills/wedding-invitation-builder/`, se incluye una **Skill personalizada**. 

Esta skill actúa como el "motor" y la documentación principal del proyecto. Define los estándares arquitectónicos para crear nuevos modelos, incluyendo:
*   **Estructura Base HTML/CSS**: El flujo obligatorio de las secciones (Hero, Padres, Historia, Vestimenta, Hospedaje, etc.).
*   **Paletas de Colores (Design Tokens)**: Guías visuales para diferentes estéticas (Carmesí & Oro, Botanical Olive, Pastel Lavender, Dark Marble).
*   **Componentes Interactivos**: La lógica base en JavaScript para que todas las invitaciones funcionen igual.
*   **Prompts de Generación**: Instrucciones detalladas de Inteligencia Artificial para generar nuevos bordes florales y texturas para futuras invitaciones.

## 🚀 Cómo usar una plantilla

1. Entra a `templates/` y copia la carpeta del diseño que te guste, luego renómbrala para tu nuevo proyecto.
2. Reemplaza las imágenes genéricas dentro de la carpeta `assets/` (como `couple-hero.jpg` o `background.jpg`) con las fotografías reales de los novios.
3. Edita el archivo `index.html` para actualizar los nombres, fechas, ubicaciones y textos.
4. Ajusta el número de teléfono en `main.js` para que el RSVP llegue al destino correcto.
5. Sube tu carpeta a cualquier servicio de hosting estático (GitHub Pages, Netlify, Vercel, etc.) y estará lista para compartirse mediante un enlace.
