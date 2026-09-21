# Catálogo de Recursos Vectoriales (`shared_assets/vectors/`)

Biblioteca central de gráficos SVG organizados por estilo estético para evitar duplicación entre plantillas.

| Archivo | Familia de Estilo | Uso Recomendado |
| :--- | :--- | :--- |
| `botanic/olive-branch-divider.svg` | **Botánico / Rústico Toscana** | Divisor horizontal sutil entre secciones o pie de hero. |
| `luxury-gold/luxury-royal-crest.svg` | **Imperial / Royal Gold** | Escudo monograma en pantalla de entrada (cover) o hero. |
| `luxury-gold/luxury-floral-divider.svg` | **Clásico Romántico** | Separador ornamental bajo los nombres de la pareja. |
| `luxury-gold/luxury-corner-ornament.svg` | **Barroco / Gold Foil** | Esquineros decorativos en tarjetas de ceremonia y fiesta. |
| `luxury-gold/luxury-church-icon.svg` | **Universal** | Icono vectorial para tarjeta de Ceremonia Religiosa. |
| `luxury-gold/luxury-champagne-glasses.svg` | **Universal** | Icono vectorial para tarjeta de Recepción / Brindis. |
| `luxury-gold/luxury-wedding-rings.svg` | **Universal** | Icono para cuenta regresiva o sección de padres. |
| `minimalist/geometric-divider.svg` | **Minimal Luxe / Moderno** | Divisor lineal geométrico discreto. |
| `wax-seals/wax-seal-monogram.svg` | **Editorial / Lacre Artesanal** | Sello interactivo del sobre de bienvenida. |

### Cómo usarlos en una plantilla v2
En `index.html` o `styles.css`:
```html
<img src="../../shared_assets/vectors/luxury-gold/luxury-royal-crest.svg" alt="Monograma" class="w-16 h-16">
```
o incrustar inline si necesitas manipular `fill` o `stroke` con CSS.
