# Integración y QA del portfolio

Cierre: 14 de septiembre de 2026. Rama `codex/fase-6-integracion-qa`.
Base: `5d6951234362d202fe5e37f41de416722be1386a`.

## Fases incorporadas mediante merge

- Fundamentos: `17d7bb9eb2a0493b7185d00f36344a2a2f42154d`.
- Hero y navegación: `b186dc1db06014b6414292052662ec2eeffe4f6c`.
- Experiencia y sistemas: `0f19e94d4d2042a045a0e6eb6008b8c5800f9b82`.
- Proyectos: `1ce9b020f6313666952743fe402f4c05a6191b00`.
- Contenido y terminal: `55aa29acbcc70a5d6a53c045363797fea5976458`.

No hubo conflictos. Esta fase no modifica main ni el workflow de Pages.

## Cambios de integración

- CI independiente para pushes `codex/fase-*` y pull requests: check, tests y build con `/CVWebsite/`.
- Loader limitado a archivos `.css` para las pruebas SSR. El resto de imports se delega al loader siguiente; producción no utiliza este adaptador. No se añaden dependencias.
- Pruebas de IDs únicos, referencias ARIA y enlaces internos, encabezado principal único, menú, terminal y enlaces de proyecto.
- La prueba de traducción busca About por ID. Otra prueba comprueba explícitamente el orden editorial en ES y EN.
- CSS de supporting-sections importado estáticamente en App después del CSS global y editorial; elimina los imports dinámicos de ContentSections y Terminal y su carga tardía. Esta mejora corresponde a fase 5 y requiere coordinar el import de App con fase 2. El loader de tests permite conservar imports CSS estándar de fase 3.

## Validación automatizada final

`npm run check`, `npm test` (15/15), `npm run build` con `BASE_PATH=/CVWebsite/` y `git diff --check`: correctos. Ejecutados con escalación por la incompatibilidad del sandbox Windows con tsx/esbuild. Resultado final: JS 258,60 kB (gzip 80,96 kB), CSS principal 24,76 kB (gzip 5,88 kB), más CSS del caso.

## Navegador real

QA integrada realizada el 10 de septiembre en navegador IAB local, con altura 850 px y anchos comprobados mediante `innerWidth`: 320, 375, 430, 768, 1024 y 1440. Recorrido con ES oscuro y EN claro; muestras adicionales ES claro. El documento no presentó desbordamiento horizontal: scrollWidth 305/360/415/753/1009/1425 respectivamente (barra vertical de 15 px).

Capturas inspeccionadas del hero/header, proyecto, experiencia, sistemas, tecnologías, formación y terminal, repartidas entre esos tamaños. No se afirma una captura de cada sección en todas las combinaciones posibles. Las fases 2 y 5 aportaron además sus recorridos individuales de seis tamaños, que no sustituyen esta revisión integrada.

Interacciones verificadas:

- Menú móvil, Enter y Escape desde botón y enlace; cierre y foco de vuelta al botón. Navegación a proyectos con foco en `heading-projects`.
- Contribución del proyecto con Enter/Espacio, enlace al caso y recarga con hash directo.
- Desplegable de experiencia, selección de etapas de sistemas con Enter/Espacio y transcripción completa.
- Terminal cerrada inicialmente, apertura con teclado, shortcuts, help, experience, clear, WHOAMI con espacios/mayúsculas e historial arriba/abajo. Cambio ES/EN y claro/oscuro.
- About único, formación con fecha de inicio sin final inventado, ausencia de enlaces vacíos de contacto y CV.
- Colores computados finales en claro: CTA blanco sobre rgb(36,89,184); entrada/log terminal rgb(237,239,242), prompt rgb(133,169,255). Inspección visual del panel oscuro dentro de la página clara.

Cierre del 14 de septiembre sobre el build servido por Vite preview en `/CVWebsite/`: CSS principal y `/CVWebsite/project-case.css` cargados; ES→EN y oscuro→claro conservados tras recargar; hash del caso abre contribución; terminal sigue cerrada al cargar; ninguna ancla interna rota; ningún error/aviso de consola observado. No existen enlaces externos publicados que verificar porque los datos sociales están vacíos.

## Límites y datos pendientes

No se certifica accesibilidad: no se probaron lector de pantalla, dispositivo táctil físico ni todos los motores de navegador. La revisión visual y de teclado es manual; CI ejecuta regresiones SSR y build, no un navegador. El estado remoto de GitHub Actions debe comprobarse tras el push.

Email, GitHub, LinkedIn y PDF de CV pendientes de datos reales. El proyecto no aporta métricas verificadas, plataforma ni arquitectura técnica confirmada; el flujo se presenta explícitamente como ilustrativo. No se añadieron datos supuestos. La agrupación de responsabilidades de experiencia depende de índices paralelos ES/EN y debe mantenerse alineada al editar contenido.
