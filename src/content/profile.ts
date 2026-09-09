import type { Profile } from '../types/content';

export const profile = {
  name: 'Marcos Gómez',
  headline: 'Software Developer',
  specialization: ['ERP', 'Backend', 'Integrations'],
  location: 'España',
  shortDescription: 'Desarrollo software orientado a resolver problemas reales de negocio.',
  about: [
    'Soy desarrollador de software especializado actualmente en soluciones empresariales, desarrollo ERP e integraciones.',
    'Tras comenzar profesionalmente en desarrollo Android, mi carrera evolucionó hacia el backend y los sistemas ERP, trabajando en automatización de procesos, tratamiento de datos e integración entre diferentes plataformas.',
    'Me interesa especialmente comprender cómo funcionan los sistemas, detectar problemas y desarrollar soluciones que simplifiquen procesos reales de negocio.',
  ],
} satisfies Profile;
