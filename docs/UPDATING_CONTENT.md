# Cómo actualizar mi portfolio

Abre `src/content/`. Ahí está toda tu información. Guarda el archivo y comprueba el resultado con `npm run dev`; Vite actualiza la página sin reiniciar. Antes de publicar ejecuta `npm run build`.

Los ejemplos son fragmentos del objeto que ya existe, salvo cuando se indica que debes añadir un objeto al array. Conserva las comas entre objetos. Usa IDs únicos y fechas `AAAA-MM`.

## Cambiar mi puesto actual

En `src/content/profile.ts`, cambia una línea para actualizar el titular de la web y los metadatos:

```ts
headline: 'Senior Software Engineer',
```

Si cambia el puesto de tu trabajo actual, edita `role` en su objeto de `src/content/experience.ts`:

```ts
role: 'Senior Software Engineer',
```

El titular profesional y el puesto de una experiencia son campos distintos: puedes mantener un titular general y puestos específicos. Si quieres conservar una promoción como otra etapa, cierra la entrada anterior y añade una nueva con un ID distinto, aunque la empresa sea la misma.

## Cambiar de empresa

En `src/content/experience.ts`, cierra la entrada anterior:

```ts
current: false,
endDate: '2028-02',
```

Añade dentro del mismo array:

```ts
{
  id: 'nueva-empresa',
  company: 'Nueva Empresa',
  role: 'Software Engineer',
  location: 'España',
  startDate: '2028-03',
  endDate: null,
  current: true,
  description: 'Desarrollo de soluciones de software.',
  responsibilities: ['Desarrollo backend e integraciones.'],
  technologies: ['Java', 'SQL'],
},
```

La nueva empresa aparece arriba y en el resumen actual; la anterior se cierra. Timeline y terminal se actualizan juntas. No hay que modificar JSX.

## Añadir una experiencia

Copia esta plantilla dentro del array `experiences` de `src/content/experience.ts` y sustituye los valores:

```ts
{
  id: 'empresa-id',
  company: 'Empresa',
  role: 'Puesto',
  location: 'España',
  startDate: 'AAAA-MM',
  endDate: null,
  current: true,
  description: '...',
  responsibilities: ['...'],
  technologies: ['...'],
},
```

Sustituye `AAAA-MM` por una fecha real, por ejemplo `'2028-03'`. Las experiencias actuales van primero; después se ordenan por inicio descendente. Para controlar la presentación puedes añadir `order: 1,`. Los objetos con `order` van primero, de menor a mayor; los demás conservan el orden automático. Elimina los `order` si quieres recuperar completamente el orden por fechas.

## Añadir un proyecto

Copia dentro de `projects`, en `src/content/projects.ts`:

```ts
{
  id: 'project-slug',
  title: 'Nombre proyecto',
  shortDescription: '...',
  description: '...',
  responsibilities: ['...'],
  concepts: ['...'],
  technologies: ['...'],
  featured: false,
  visible: true,
  github: null,
  demo: null,
  image: null,
},
```

No añadas `index`: se calcula automáticamente como `01`, `02`, etc. sobre los proyectos visibles. Sin `order`, se respeta el orden del array. Puedes añadir `order: 1,` para colocarlo antes de los proyectos sin orden. `featured: true` añade la marca de destacado; todos los proyectos visibles aparecen en la sección inicial.

Para añadir enlaces, cambia los campos opcionales:

```ts
github: 'https://github.com/tu-usuario/tu-proyecto',
demo: 'https://tu-demo.example.com',
```

Con `null` o una cadena vacía no se renderiza el enlace.

## Ocultar un proyecto

En su objeto de `src/content/projects.ts`:

```ts
visible: false,
```

Desaparece de la sección y de la terminal. No deja huecos en la numeración. Es un borrador de presentación, no almacenamiento privado: no pongas información confidencial en el código.

## Añadir una tecnología

En `src/content/skills.ts`, edita el array de la categoría:

```ts
skills: ['Git', 'Postman', 'Docker'],
```

Para quitar una tecnología, elimina su cadena. Las tecnologías de experiencias y proyectos describen esos trabajos concretos; cámbialas solo cuando corresponda.

## Crear una nueva categoría de tecnologías

Añade a `skillGroups` en `src/content/skills.ts`:

```ts
{ id: 'cloud', title: 'Cloud', skills: ['AWS', 'Azure'] },
```

Se crea una agrupación automáticamente. Una categoría con `skills: []` se oculta.

## Añadir formación

Añade a `education` en `src/content/education.ts`:

```ts
{
  id: 'formacion-id',
  title: 'Nombre de la formación',
  institution: 'Centro educativo',
  location: 'España',
  startDate: '2028-09',
  endDate: null,
  description: null,
},
```

`endDate: null` significa que la fecha final no está confirmada: solo se muestra el inicio. Si está realmente en curso añade `current: true,`. Cuando termine, usa `current: false,` y una fecha final real. Nunca escribas `'...'` como fecha.

## Añadir certificación

En `src/content/certifications.ts`, sustituye el array vacío por:

```ts
export const certifications: Certification[] = [
  {
    name: 'Nombre de la certificación',
    issuer: 'Entidad emisora',
    date: '2028-06',
    credentialUrl: null,
  },
];
```

Conserva el `import type` inicial. La sección aparece automáticamente si `showCertifications` está activado (lo está por defecto). Para una credencial con enlace:

```ts
credentialUrl: 'https://example.com/credencial',
```

## Modificar Sobre mí

En `src/content/profile.ts`:

```ts
shortDescription: 'Mi nueva descripción breve.',
about: [
  'Primer párrafo de mi presentación.',
  'Segundo párrafo de mi presentación.',
],
```

Puedes añadir o eliminar párrafos. El nombre, ubicación y especialización también viven aquí. Los títulos de secciones están en `navigation.ts`; el resto de textos de interfaz está en `site.ts`, dentro de `siteText`.

La versión española es el contenido principal. Para actualizar su versión inglesa, modifica el bloque correspondiente de `src/content/translations.ts`. Los IDs enlazan ambas versiones, por lo que empresa, fechas, enlaces y configuración siguen definidos una sola vez.

## Cambiar GitHub

En `src/content/social.ts`:

```ts
github: 'https://github.com/tu-usuario',
```

## Cambiar LinkedIn

En `src/content/social.ts`:

```ts
linkedin: 'https://www.linkedin.com/in/tu-usuario/',
```

## Cambiar email

En `src/content/social.ts`, sin `mailto:`:

```ts
email: 'tu-correo@example.com',
```

Una cadena vacía (`''`) oculta el enlace. Puedes añadir otra red al mismo objeto, por ejemplo `blog: 'https://example.com',`; se representa automáticamente. El contacto se oculta cuando todos los enlaces están vacíos.

## Sustituir el CV

Guarda tu PDF en `public/cv/CV-Marcos-Gomez.pdf`. Actívalo en `src/content/site.ts`:

```ts
cvPath: '/cv/CV-Marcos-Gomez.pdf',
```

Para actualizarlo después, sustituye el archivo conservando el nombre. Si lo renombras, cambia también `cvPath`. Con `cvPath: null` no se muestra botón. El proyecto inicial no incluye un PDF inventado. La compilación avisa si configuras una ruta que no existe.

## Activar/desactivar secciones

En `src/content/site.ts`, cambia los booleanos:

```ts
showAbout: true,
showExperience: true,
showTerminal: false,
showSystems: true,
showProjects: true,
showSkills: true,
showEducation: true,
showCertifications: true,
showContact: true,
```

`false` oculta la sección y su entrada en el menú. Las secciones sin datos se ocultan aunque la opción sea `true`. Estos flags controlan la presentación: los comandos de la terminal continúan consultando los datos; `visible: false` sí excluye un proyecto de ambos lugares.

Para cambiar el color o las fechas:

```ts
accentColor: 'blue', // También 'green' o 'violet'.
language: 'es',
dateStyle: 'long', // 'short' para abreviar el mes.
theme: 'system', // También 'light' o 'dark' como valor inicial.
```

`language` controla el idioma inicial. El visitante puede cambiar entre español e inglés y entre tema claro y oscuro; sus elecciones se guardan en el navegador. Los textos de interfaz de ambos idiomas están en `siteText`, y las traducciones del contenido profesional están en `translations.ts`.

## Traducir contenido nuevo al inglés

Cuando añadas una experiencia, proyecto, formación o nodo de sistemas, añade en `src/content/translations.ts` una entrada con el mismo `id`. Por ejemplo, para `id: 'nueva-empresa'`:

```ts
experiences: {
  // ...traducciones existentes
  'nueva-empresa': {
    role: 'Software Engineer',
    location: 'Spain',
    description: 'Development of software solutions.',
    responsibilities: ['Backend development and integrations.'],
  },
},
```

La compilación se detiene con un mensaje claro si falta la traducción inglesa de un elemento nuevo.

## Añadir una imagen a un proyecto

Guarda la imagen en `public/projects/password-manager.webp`. En el proyecto de `src/content/projects.ts`:

```ts
image: '/projects/password-manager.webp',
```

No incluyas `public` en la ruta. Con `image: null` el diseño no reserva un hueco. Una imagen que falla al cargar se oculta. La compilación comprueba que las imágenes locales de proyectos visibles existan. La ruta se adapta automáticamente al subdirectorio de GitHub Pages.

## Modificar el diagrama

Añade nodos a `systems` en `src/content/systems.ts`:

```ts
{ id: 'cloud', label: 'Cloud', description: 'Servicios e infraestructura' },
```

Y una conexión en `systemConnections`, usando IDs existentes:

```ts
['erp', 'cloud'],
```

La distribución y las líneas se calculan automáticamente. `central: true` coloca un nodo en el centro. La compilación detecta conexiones a nodos inexistentes.

## Publicar los cambios

Tras configurar GitHub Pages como explica el README:

```sh
npm run build
git add .
git commit -m "Actualizar contenido del portfolio"
git push
```

GitHub Actions valida y publica el contenido automáticamente. Si un dato es inválido, el despliegue se detiene y la web publicada anteriormente se mantiene.
