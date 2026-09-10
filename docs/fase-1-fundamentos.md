# Fundamentos visuales

Contrato de estilos en `src/styles.css`. Los componentes pueden consumir estos
tokens desde su CSS local; no necesitan duplicar selectores de tema.

## Colores

- `--bg`: oscuro `#101317`, claro `#F5F6F8`.
- `--surface`: oscuro `#171C23`, claro `#FFFFFF`.
- `--surface-raised`: oscuro `#1E2732`, claro `#EAF0F7`.
- `--text`: oscuro `#EDEFF2`, claro `#171A1F`.
- `--muted`: oscuro `#A1A8B4`, claro `#626B78`.
- `--line`: oscuro `#35404D`, claro `#CAD2DD`; separadores decorativos.
- `--accent`: oscuro `#85A9FF`, claro `#2459B8`.
- `--accent-hover`: oscuro `#A5BFFF`, claro `#19458F`.
- `--on-accent`: oscuro `#101317`, claro `#FFFFFF`; texto de acciones rellenas.
- `--button-text` conserva compatibilidad y referencia `--on-accent`.
- `--focus`: acento del tema; contorno visible de 2px y separación de 3px.
- Se conservan `--soft-text`, `--accent-soft` y `--diagram-line`.

Los acentos verde y violeta que admite el terminal conservan sus variantes
claras/oscuras y tienen ahora un `--accent-hover` correspondiente.

## Tipografía y espacio

- `--font-body`: DM Sans; `--font-heading`: Space Grotesk.
- `--font-mono`: ui-monospace, SFMono-Regular, Consolas, Liberation Mono, monospace.
- `--text-xs/sm/base`: .75/.875/1rem.
- `--text-lead`: clamp(1.125rem, 1.5vw, 1.25rem).
- `--text-h2`: clamp(1.625rem, 3vw, 2rem).
- `--text-h1`: clamp(2.75rem, 6.5vw, 5.5rem).
- `--space-1` a `--space-9`: .25/.5/.75/1/1.5/2/3/4/6rem.
- `--page-gutter`: clamp(1rem, 4.5vw, 4rem).
- `--section-space`: clamp(2.5rem, 6vw, 4.5rem).
- `--content-width`: 82.5rem; `--radius`: .25rem.
- `--motion-fast`: 120ms, para cambios discretos de color/opacidad.

No hay desenfoques, animación de entrada de secciones ni desplazamiento de
botones en hover. `prefers-reduced-motion` elimina transiciones, animaciones y
scroll suave. Las fuentes existentes conservan `display=swap` y sus fallbacks.

## Terminal

El interior del terminal mantiene una paleta oscura estable en ambos temas:

- `--terminal-bg/surface/control`: #101317/#171C23/#1E2732.
- `--terminal-text/muted`: #EDEFF2/#A1A8B4.
- `--terminal-border/accent`: #64758C/#85A9FF.

`.terminal` define `color-scheme: dark`, color de texto explícito y `--focus`
local. Usar estos tokens para barra, comandos, salida, input, shortcuts y foco;
no combinar un fondo terminal con texto o acentos del tema claro. El contenedor
exterior de una sección plegable puede usar la superficie de la página.

## Verificación

Contrastes calculados con luminancia relativa sRGB, sobre colores sólidos:

- CTA e idioma activo claro: 6.57:1; hover CTA: 9.17:1.
- CTA e idioma activo oscuro: 8.09:1; hover CTA: 10.20:1.
- Comando/salida terminal: 16.17:1; prompt: 8.09:1.
- Texto secundario de la barra terminal: 7.15:1.
- Texto muted sobre superficie secundaria: claro 4.70:1, oscuro 6.31:1.
- Foco claro sobre fondo de página: 6.08:1.
- Borde de control terminal sobre su superficie: 3.21:1.

Estos cálculos no sustituyen una inspección visual. La revisión en navegador
a 320, 375, 430, 768, 1024 y 1440px y de las interacciones integradas se coordina
con fase 6 para no interferir con su navegador compartido. Esta fase no afirma
haber realizado esa revisión visual.

No se modifican componentes, contenido, dependencias ni datos de contacto.
Email y CV siguen pendientes de datos reales del titular.
