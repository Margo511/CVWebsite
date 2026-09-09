import type { Experience } from '../types/content';

export const experiences: Experience[] = [
  {
    id: 'precognis',
    company: 'Precognis S.L.',
    role: 'ERP / Software Developer',
    location: 'España',
    startDate: '2024-07',
    endDate: null,
    current: true,
    description: 'Desarrollo y personalización de soluciones ERP e integraciones entre sistemas.',
    responsibilities: [
      'Desarrollo y personalización de sistemas ERP.',
      'Desarrollo backend con Java.',
      'Creación y mantenimiento de consultas SQL.',
      'Automatización de procesos empresariales.',
      'Integraciones mediante APIs REST.',
      'Procesamiento y validación de datos.',
      'Diagnóstico y resolución de incidencias.',
      'Análisis de requisitos funcionales y técnicos.',
    ],
    technologies: ['Java', 'SQL', 'REST API', 'JSON', 'Git', 'ERP'],
  },
  {
    id: 'serbatic',
    company: 'Serbatic',
    role: 'Android Developer',
    location: 'Valladolid, España',
    startDate: '2024-03',
    endDate: '2024-05',
    current: false,
    description: 'Desarrollo de aplicaciones Android utilizando tecnologías modernas.',
    responsibilities: [
      'Desarrollo de aplicaciones Android.',
      'Desarrollo de interfaces mediante Jetpack Compose.',
      'Aplicación de principios de Clean Architecture.',
    ],
    technologies: ['Kotlin', 'Jetpack Compose', 'Android', 'Clean Architecture', 'Git'],
  },
] satisfies Experience[];
