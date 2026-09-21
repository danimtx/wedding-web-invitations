# Directiva para Agentes · Arquitectura y Creación de Templates v2

Este documento define el estándar obligatorio para diseñar y construir nuevas plantillas de invitaciones de boda en **`templates/v2/`**. Cualquier agente o desarrollador debe apegarse estrictamente a este protocolo.

---

## 🏛️ 1. La Regla de Oro: "Pensar antes de Diseñar"

**Está estrictamente prohibido generar código a ciegas.** Ningún template v2 se construye sin una imagen o moodboard de partida.

El flujo de trabajo consta de 3 fases ordenadas:

```
[FASE 1: INSPIRACIÓN]             [FASE 2: IDENTIDAD & ACTIVOS]       [FASE 3: CONSTRUCCIÓN]
design/references/moodboard.jpg ─► design/design-brief.md         ─► Duplicar _starter-kit
Imagen de referencia obligatoria   Paleta (hex) + Tipografías (GFonts) Configurar wedding.config.js
                                   + SVGs (propios o de core)          + Vestir styles.css
```

---

## 📁 2. El Blueprint Canónico: `templates/v2/_starter-kit/`

La carpeta **`templates/v2/_starter-kit/`** es la plantilla esqueleto maestra (boilerplate oficial). **No es un diseño funcional ni contiene código pre-rellenado**, sino la estructura limpia de carpetas y archivos con comentarios guía que debe clonarse para crear cada invitación.

### Estructura del esqueleto y archivos base:
```text
templates/v2/_starter-kit/ (Template Boilerplate)
├── design/                          # 🎨 Espacio previo (pre-producción)
│   ├── references/                  # Capturas de inspiración, Pinterest, revistas, tarjetas físicas
│   │   └── .gitkeep                 # (Colocar moodboard.jpg al crear el modelo)
│   ├── generated/                   # Recursos visuales o texturas generadas con IA
│   │   └── .gitkeep
│   └── design-brief.md              # ⭐ Ficha en blanco (paleta, fuentes, signature moment)
│
├── assets/                          # Fotos y recursos multimedia (.gitkeep)
├── wedding.config.js                # ⭐ Schema base vacío con comentarios guía
├── index.html                       # Esqueleto HTML limpio con comentarios de las 14 secciones
├── styles.css                       # Boilerplate CSS con imports de core y :root de tokens
└── main.js                          # Módulo JS con comentarios de inicialización de core
```

---

## ⚡ 3. Reuso Inteligente del Motor Central (`core/` y `shared_assets/`)

Para mantener el repositorio limpio y evitar duplicación de código y archivos pesados:

### A. Lógica JavaScript (`../../core/js/`)
**No reimplementes lógica.** Importa directamente desde el core en tu `main.js`:
- `audio-controller.js`: Maneja el botón flotante y desbloquea el autoplay tras la primera interacción del usuario.
- `countdown.js`: Temporizador automático de días, horas, minutos y segundos.
- `rsvp-whatsapp.js`: Genera el mensaje estructurado para enviar por WhatsApp al hacer submit.
- `copy-clipboard.js`: Copia cuentas bancarias / CLABE con toast animado.
- `scroll-observer.js`: Animaciones suaves al hacer scroll (`[data-reveal]`).

### B. Audio Centralizado
Las canciones residen en `../../shared_assets/audio/`. En tu `wedding.config.js`:
```javascript
audio: {
  src: "../../shared_assets/audio/wedding-song.mp3",
  title: "Nombre de la Canción"
}
```
*No copies archivos MP3 de 5 MB dentro de cada template.*

### C. Vectores y Gráficos por Estilo
Consulta **`../../shared_assets/vectors/CATALOG.md`** antes de crear nuevos SVGs:
- `botanic/`: Ramas de olivo, hojas, flores finas.
- `luxury-gold/`: Monogramas, esquinas ornamentales, anillos, copas, iglesias.
- `minimalist/`: Divisores lineales geométricos sutiles.
- `wax-seals/`: Sellos de cera vectoriales.

Solo crea un SVG en `design/generated/` si el modelo requiere un ornamento 100% exclusivo que no existe en la biblioteca.

---

## 📝 4. Ficha de Diseño (`design/design-brief.md`)

Antes de escribir CSS, completa la ficha concisa dentro de la plantilla:

```markdown
# Design Brief · [Nombre del Modelo]

## 1. Intención & Atmósfera Visual
- **Estilo / Vibe**: [Ej. Editorial Vogue / Dark Luxury Kintsugi / Toscana Rústica]
- **Inspiración principal**: references/moodboard.jpg

## 2. Tokens Visuales Clave
- **Paleta de Colores**:
  - Primario (Fondo): #HEX
  - Superficie / Tarjetas: #HEX
  - Acento Principal: #HEX
  - Texto Principal: #HEX
  - Texto Secundario: #HEX
- **Tipografías (Google Fonts)**:
  - Títulos (Display/Serif): [Ej. Cormorant Garamond]
  - Nombres (Script): [Ej. Pinyon Script]
  - Lectura (Sans): [Ej. Montserrat]

## 3. Signature Moment (Interacción Estrella)
- **Momento interactivo**: [Ej. Desatado de cinta / Sello de cera interactivo / Parallax floral]
- **Recursos reutilizados de core**: [Audio y vectores de shared_assets]
```

---

## 🚀 5. Protocolo de Creación Paso a Paso (Checklist para el Agente)

1. **Crear carpeta del modelo**:
   Duplica `templates/v2/_starter-kit/` ➔ `templates/v2/model-[estilo]-[variante]/`.
2. **Colocar la referencia**:
   Guarda la captura o moodboard en `design/references/moodboard.jpg`.
3. **Completar `design/design-brief.md`**:
   Define paleta, fuentes y signature moment.
4. **Configurar datos en `wedding.config.js`**:
   Asigna nombres coherentes al estilo, fecha futura, lugares e información de regalo.
5. **Ajustar tokens en `styles.css`**:
   Importa las Google Fonts elegidas y redefine las variables en `:root`.
6. **Integrar la plantilla en el catálogo (`index.html`)**:
   Registra el nuevo modelo en la tabla y grid de la Colección v2 para que sea previsualizable.
7. **Verificación visual y de accesibilidad**:
   Asegúrate de que los contrastes cumplan WCAG (mínimo 4.5:1 en texto general) y prueba la demo abriendo su `index.html`.
