# Portfolio de contenido independiente

Portfolio estático con React, TypeScript y Vite. La información editable vive en `src/content/`; los componentes representan esos datos. No requiere servidor, base de datos ni CMS.

## Desarrollo

Requisitos: Node.js 22.12 o posterior y npm.

```sh
npm install
npm run dev
```

Abre la dirección que imprime Vite. Edita y guarda cualquier archivo de `src/content/`: Vite actualiza la web mediante HMR. No necesitas reiniciar el servidor.

```sh
npm run check
npm test
npm run build
npm run preview
```

`build` comprueba TypeScript, valida el contenido y genera `dist/`. Los errores de fechas, IDs, enlaces, conexiones o archivos locales inexistentes detienen el despliegue con un mensaje. No se inventan fechas, redes ni CV: los datos pendientes quedan vacíos y sus controles se ocultan.

## Editar el portfolio

Empieza por [Cómo actualizar mi portfolio](docs/UPDATING_CONTENT.md). Incluye ejemplos y plantillas para cada actualización habitual.

- `src/content/`: perfil, experiencia, proyectos, tecnologías, formación, certificaciones, redes, sistemas, navegación, traducciones y configuración global.
- `src/types/content.ts`: contratos TypeScript.
- `src/utils/`: fechas, orden, enlaces, selección de contenido y comandos de terminal.
- `src/components/`: presentación reutilizable.
- `public/cv/` y `public/projects/`: PDF e imágenes opcionales.

La empresa actual se deriva del array de experiencias. La terminal calcula sus respuestas usando los mismos módulos que las secciones. Los proyectos se filtran antes de numerarlos; `featured` permite seleccionarlos como destacados. Secciones y menú comparten las mismas reglas de visibilidad.

El visitante puede alternar español/inglés y tema claro/oscuro. Ambas preferencias persisten en su navegador. Los campos estructurales se definen una vez; `src/content/translations.ts` contiene únicamente las versiones inglesas de los textos traducibles.

## GitHub Pages

El workflow `.github/workflows/deploy.yml` publica cada push a `main` o `master`. Este proyecto todavía no tiene remoto configurado: para el primer despliegue, crea o elige tu repositorio de GitHub, configura `origin` y selecciona **Settings → Pages → Build and deployment → Source: GitHub Actions**.

```sh
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git add .
git commit -m "Crear portfolio"
git push -u origin HEAD
```

El workflow obtiene automáticamente el prefijo del repositorio mediante `configure-pages`, por lo que JavaScript, imágenes y CV funcionan también en `https://usuario.github.io/repositorio/`. Si cambias la rama de publicación a otra, actualiza el workflow.

Las fuentes se cargan de Google Fonts con alternativas locales. El sitio sigue siendo legible sin conexión a ese servicio.

`visible: false` oculta el proyecto en la interfaz y en la terminal; **no es un control de privacidad**: cualquier contenido incluido en el código o en un repositorio público puede ser consultado. No guardes secretos ni material confidencial en los borradores.
