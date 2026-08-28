# Standardized Section Blueprint & Data Requirements (`information-structure.md`)

This guide establishes the mandatory section hierarchy, required data fields, protocol copy templates, and structural standards for all static wedding invitation models (`model-{estilo}-{variante}/`).

> **Important Note:** While the examples below use context for Bolivia (primary market), all data fields and copy are fully customizable for any Latin American country.

---

## 0. SEO & Open Graph Tags (Important Fix)
Before the visual sections, ensure the `<head>` contains proper Open Graph tags for social sharing.
**CRITICAL:** The `og:image` property MUST use an absolute HTTPS URL (e.g., `https://tudominio.com/assets/og-image.jpg`) and not a relative path. If you use a relative path, the image preview will fail on WhatsApp and Facebook.

## 1. The Standardized Section Sequence (El Estándar Obligatorio)

Every wedding invitation model must include these **14 standardized sections**, decorated according to the chosen aesthetic theme (Carmesí Gold, Botanical Emerald, Dark Marble, Pastel Lavender, etc.):

```text
[ PANTALLA DE ENTRADA / COVER OVERLAY ]
  └── 0. Cover Screen (Monograma/Título + Fecha Creativa + Botón "Ingresar a mi Invitación")
      (Personalización por URL para saludar al invitado; Al dar clic: Activa música + Transición suave a la invitación)

[ PÁGINA PRINCIPAL / MAIN INVITATION LANDING ]
  ├── 1. Hero Principal (Foto Novios + Nombres en Caligrafía + Fecha & Ciudad)
  ├── 2. Bienvenida & Cuenta Regresiva Inteligente (Mensaje + Días/Horas/Min/Seg o Mensaje de Celebración)
  ├── 3. Bendición de los Padres (Padres de la Novia & Padres del Novio)
  ├── 4. Nuestra Historia (Cita Romántica + Galería de Fotos)
  ├── 5. Eventos: Dónde & Cuándo (Ceremonia Religiosa & Recepción + Botones Maps y Agregar al Calendario)
  ├── 6. Itinerario Cronológico (Línea de tiempo con íconos)
  ├── 7. Código de Vestimenta (Dress Code + Paleta de colores sugerida para invitados)
  ├── 8. Hospedaje Sugerido (Hoteles recomendados + Código de descuento)
  ├── 9. Mesa de Regalos / Lluvia de Sobres (Tiendas departamentales + Cuentas Bancarias Bolivianas / QR)
  ├── 10. Aviso Importante (Evento solo adultos)
  ├── 11. Galería Fotográfica & Hashtag (#BodaNombres)
  ├── 12. Confirmación de Asistencia RSVP (Formulario dinámico directo a WhatsApp)
  └── 13. Pie de Página & Agradecimiento (Monograma & Mensaje de Despedida)
```

---

## 2. Detailed Data Requirements Per Section

### Section 0: Pantalla de Entrada (Cover Screen / Envelope Overlay)
- **URL Personalization**: Soporta parámetros en la URL para saludar directamente al invitado y pre-configurar sus pases.
  - Formato: `?invitado=[nombre]&pases=[1-4]` (Ej: `?invitado=Familia+Gómez&pases=4`)
  - Si existen los parámetros, mostrar dinámicamente: *"Querida Familia Gómez"*.
  - Si no hay parámetros, mostrar el saludo genérico: *"BIENVENIDO A NUESTRA INVITACIÓN"*.
- **Visual Container**: Overlay a pantalla completa (`position: fixed; inset: 0; z-index: 9999;`).
- **Required Elements**:
  - Monograma / Iniciales decoradas con ilustraciones florales o doradas (`M | A` o `V & M`).
  - Saludo dinámico o título ceremonial (como se explicó arriba).
  - Fecha escrita de manera creativa: *"SÁBADO, 29 DE MAYO DE 2027"*.
  - Botón de Entrada: `<button id="enter-btn" class="btn-gold"><i class="fa-solid fa-envelope-open-text"></i> INGRESAR A MI INVITACIÓN</button>`.
- **Interaction Logic**:
  - Al hacer clic en `enter-btn`, el script ejecuta `bgMusic.play()`, añade una clase `.fade-out` al overlay y muestra la página principal.

---

### Section 1: Hero Principal (Nombres & Foto de los Novios)
- **Monograma**: Iniciales decorativas.
- **Nombres Principales**: Tipografía caligráfica destacada (ej., *María Fernanda & Alejandro*).
- **Foto Destacada**: Retrato de los novios con marco orgánico / máscara circular o dorada.
- **Subtítulo**: *"Tenemos el honor de invitarte a celebrar nuestro matrimonio"*.
- **Fecha & Ciudad**: *"15 DE NOVIEMBRE DE 2027 • SANTA CRUZ DE LA SIERRA, BOLIVIA"*.

---

### Section 2: Bienvenida & Cuenta Regresiva Inteligente
- **Mensaje de Bienvenida**:
  > *"Nos llena de felicidad compartir contigo uno de los momentos más importantes de nuestras vidas. Acompáñanos a celebrar el comienzo de nuestra historia para siempre."*
- **Cuenta Regresiva (Smart Countdown)**:
  - 4 cajas interactivas: `DÍAS` | `HORAS` | `MINUTOS` | `SEGUNDOS`.
  - **Estado de Celebración**: Cuando el contador llega a cero (el día de la boda), reemplazar el timer por un banner: *"¡HOY ES NUESTRO GRAN DÍA!"* con animación estilo confetti.
  - **Estado Post-Boda**: Si la fecha ya pasó, mostrar: *"Ya nos casamos ❤️"* seguido de la fecha de la boda.

---

### Section 3: Padres de la Novia & Padres del Novio
- **Título**: `"CON LA BENDICIÓN DE NUESTROS PADRES"`.
- **Padres de la Novia**: Nombre de la madre & nombre del padre.
- **Divisor Central**: Ornamento dorado o ícono de corazón.
- **Padres del Novio**: Nombre de la madre & nombre del padre.

---

### Section 4: Nuestra Historia
- **Frase Poética**:
  > *"Dos caminos se cruzaron por casualidad y descubrieron que estaban destinados a caminar juntos para siempre."*
- **Galería de Historia**: 3 fotos de momentos clave (Primer encuentro, La propuesta, Nuestra aventura).

---

### Section 5: Eventos (Dónde & Cuándo)
Tarjetas individuales con diseño glassmorphism. Cada evento debe incluir opciones de calendario.

1. **Ceremonia Religiosa**:
   - Ícono de Iglesia (`fa-church`).
   - Hora: `17:00 HRS`.
   - Lugar: `Iglesia Catedral`.
   - Dirección: `Plaza 24 de Septiembre, Santa Cruz de la Sierra`.
   - Botón: `"VER UBICACIÓN EN MAPA"` (Abre Google Maps).
   - Botón: `"AGREGAR AL CALENDARIO"` (Genera enlace a Google Calendar y/o descarga de archivo `.ics` para Apple/Outlook).
     - Formato GCal: `https://calendar.google.com/calendar/event?action=TEMPLATE&text=...&dates=...&location=...`

2. **Recepción & Fiesta**:
   - Ícono de Copas (`fa-wine-glass-alt`).
   - Hora: `19:00 HRS`.
   - Lugar: `Hacienda Los Claveles / Salón de Eventos`.
   - Dirección: `Av. Banzer Km 5, Santa Cruz de la Sierra`.
   - Botón: `"VER UBICACIÓN EN MAPA"`.
   - Botón: `"AGREGAR AL CALENDARIO"`.

---

### Section 6: Itinerario de la Boda
Línea de tiempo cronológica con íconos:
- `17:00 HRS` — Ceremonia Religiosa ⛪
- `18:00 HRS` — Sesión Fotográfica 📸
- `19:00 HRS` — Cóctel de Bienvenida 🥂
- `20:30 HRS` — Cena de Gala 🍽️
- `21:30 HRS` — Brindis & Primer Baile 💃
- `22:30 HRS` — Fiesta & DJ 🎶

---

### Section 7: Código de Vestimenta (Dress Code)
- **Estilo**: `Formal Elegante` / `Black Tie` / `Guayabera & Vestido Largo`.
- **Indicaciones**: *"Caballeros: Traje oscuro o Tuxedo. Damas: Vestido largo."*
- **Paleta de Colores Sugerida**:
  - 5 círculos de color mostrando los tonos recomendados para invitados.
  - Nota de cortesía: *"Reservamos el color blanco e ivory exclusivamente para la novia."*

---

### Section 8: Hospedaje Sugerido
- **Tarjetas de Hoteles**: Nombre del Hotel, dirección (ej., en La Paz, Cochabamba, Tarija, o Sucre), teléfono, código de convenio (ej. `BODA-MYA`) y botón `"RESERVAR HOTEL"`.

---

### Section 9: Mesa de Regalos / Lluvia de Sobres
- **Texto**: *"Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos un detalle adicional, ponemos a tu disposición:"*
- **Opciones de Tiendas**: Enlaces a tiendas departamentales.
- **Datos de Transferencia Bancaria (Lluvia de Sobres)**:
  - Banco: *Banco Nacional de Bolivia (BNB) / Banco Mercantil Santa Cruz / Banco BISA / Banco Económico*
  - Titular: *María Fernanda & Alejandro*
  - Cuenta / QR: `100000012345` (Moneda: BOB / Bolivianos)
  - Botón interactivo: `"COPIAR NÚMERO DE CUENTA"` (Copia al portapapeles y muestra una notificación toast).

---

### Section 10: Aviso Importante
- **Insignia**: `"EVENTO SOLO PARA ADULTOS"`.
- **Mensaje**: *"Queremos que disfrutes y te relajes al máximo en nuestra noche. Agradecemos tu comprensión al no asistir con niños."*

---

### Section 11: Galería de Fotos & Hashtag
- **Hashtag Social**: `#BodaMariaYAlejandro`.
- **Galería**: Grid responsivo de 6 imágenes de la pareja con efecto zoom al pasar el cursor (o un Lightbox interactivo al hacer clic).

---

### Section 12: Confirmación de Asistencia (RSVP)
- **URL Personalization (Pre-fill)**: 
  - Al recibir los parámetros `?invitado=[nombre]&pases=[numero]`, el campo de nombre se auto-completa.
  - La cantidad de pases a seleccionar se limita al número de pases indicado.
- **Formulario**:
  - Campo Nombre Completo.
  - Selección de Asistencia (Sí asistiré / No podré asistir).
  - Número de Invitados (1 a max pases).
  - Comentarios o canciones sugeridas.
- **Botón de Acción**: `"CONFIRMAR ASISTENCIA POR WHATSAPP"` (Genera el mensaje al número +591 y abre WhatsApp).

---

### Section 13: Pie de Página & Agradecimiento
- **Mensaje Final**: *"Gracias por ser parte indispensable de nuestras vidas. ¡Nos vemos en la boda!"*
- **Monograma & Año**: `M | A 2027`.
